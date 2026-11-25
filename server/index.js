
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";


import {
  buildSystemPrompt,
  DEFAULT_STUDENT_PROFILE,
} from "./prompt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const {
  GEMINI_API_KEY,
  GEMINI_MODEL = "gemini-2.5-flash",
  PORT = 3001,
  ALLOWED_ORIGINS = "",
} = process.env;

if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY belum diisi di server/.env");
  process.exit(1);
}

const app = express();

app.use(express.json({ limit: "20kb" }));

app.use(
  cors({
    origin: ALLOWED_ORIGINS.split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  })
);

app.use(
  "/api/",
  rateLimit({
    windowMs: 60_000,
    max: 20,
  })
);

const FALLBACK =
  "Coba kita pelan-pelan. Dari soal tersebut, informasi apa yang sudah kamu ketahui?";


async function askGemini(messages) {
  const systemMessage = messages.find(
    (message) => message.role === "system"
  );

  const history = messages
    .filter((message) => message.role !== "system")
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 25000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: systemMessage?.content || "",
              },
            ],
          },
          contents: history,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 450,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", response.status, data);
      throw new Error(`Gemini ${response.status}`);
    }

    return (
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("") || ""
    );
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Waktu tunggu Gemini habis (25 detik).");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}


app.post("/api/chat", async (req, res) => {
  try {
    const {
      phase = 1,
      wrongCount = 0,
      messages = [],
      mode = "belajar",
    } = req.body ?? {};

    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.length > 30
    ) {
      return res.status(400).json({
        error: "Format pesan tidak valid.",
      });
    }

    const history = messages
      .filter(
        (message) =>
          ["user", "assistant"].includes(message?.role) &&
          typeof message.content === "string"
      )
      .map((message) => ({
        role: message.role,
        content: message.content.slice(0, 1000),
      }));

    if (history.length === 0) {
      return res.status(400).json({
        error: "Pesan siswa tidak ditemukan.",
      });
    }

    const safePhase = Math.min(
      Math.max(Number(phase) || 1, 1),
      3
    );

    const safeWrongCount = Math.min(
      Math.max(Number(wrongCount) || 0, 0),
      3
    );

    const system = buildSystemPrompt({
      problem: null,
      phase: safePhase,
      hintLevel: safeWrongCount,
      studentProfile: DEFAULT_STUDENT_PROFILE,
      mode,
    });

    const rawReply = await askGemini([
      {
        role: "system",
        content: system,
      },
      ...history,
    ]);

    let result;

    try {
  result = JSON.parse(rawReply);
} catch (error) {
  console.error("Gagal membaca JSON Gemini:", rawReply);

  result = {
    reply: FALLBACK,
    difficultyDetected: false,
  };
}
    const reply =
      typeof result.reply === "string" &&
      result.reply.trim()
        ? result.reply.trim()
        : FALLBACK;

    res.json({
      reply,
      difficultyDetected:
        result.difficultyDetected === true,
    });
  } catch (error) {
    console.error("Kesalahan chatbot:", error.message);

    res.status(502).json({
      error: "Asisten sedang tidak tersedia. Coba lagi sebentar.",
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
