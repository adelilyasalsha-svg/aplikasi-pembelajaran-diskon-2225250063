
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
    origin: ALLOWED_ORIGINS
      ? ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
      : true,
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

// Jeda sebelum mencoba ulang
const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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

  if (!history.length || history[0].role !== "user") {
    throw new Error("Riwayat percakapan tidak valid.");
  }

  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 30000);

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
              parts: [{ text: systemMessage?.content || "" }],
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
        const status = response.status;

        console.error(
          `Gemini API error (percobaan ${attempt}/${maxAttempts}):`,
          status,
          data
        );

        // Ulangi jika server Gemini sedang sibuk
        if (
          [429, 500, 502, 503, 504].includes(status) &&
          attempt < maxAttempts
        ) {
          const delay = 1500 * Math.pow(2, attempt - 1);

          console.log(
            `Mencoba kembali dalam ${delay / 1000} detik...`
          );

          await sleep(delay);
          continue;
        }

        throw new Error(
          data.error?.message || `Gemini HTTP ${status}`
        );
      }

      const reply = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("");

      if (!reply) {
        console.error("Jawaban Gemini kosong:", data);
        throw new Error("Jawaban Gemini kosong.");
      }

      return reply;
    } catch (error) {
      const retryable =
        error.name === "AbortError" ||
        error.cause?.code === "ECONNRESET" ||
        error.cause?.code === "ETIMEDOUT";

      if (retryable && attempt < maxAttempts) {
        const delay = 1500 * Math.pow(2, attempt - 1);

        console.log(
          `Koneksi bermasalah. Mencoba kembali dalam ${delay / 1000} detik...`
        );

        await sleep(delay);
        continue;
      }

      if (error.name === "AbortError") {
        throw new Error("Waktu tunggu Gemini habis.");
      }

      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error("Gemini gagal setelah beberapa percobaan.");
}

app.post("/api/chat", async (req, res) => {
  try {
    const {
      phase = 1,
      wrongCount = 0,
      messages = [],
      mode = "belajar",
    } = req.body ?? {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "Format pesan tidak valid.",
      });
    }

    const history = [];

    for (const message of messages) {
      if (
        !["user", "assistant"].includes(message?.role) ||
        typeof message.content !== "string"
      ) {
        continue;
      }

      const content = message.content.trim().slice(0, 1000);

      if (!content) continue;

      const role = message.role;

      if (history.length === 0 && role !== "user") {
        continue;
      }

      const lastMessage = history[history.length - 1];

      if (lastMessage && lastMessage.role === role) {
        lastMessage.content += "\n" + content;
      } else {
        history.push({ role, content });
      }
    }

    if (
      history.length === 0 ||
      history[history.length - 1].role !== "user"
    ) {
      return res.status(400).json({
        error: "Pesan terakhir harus berasal dari siswa.",
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
    } catch {
      console.error("Format JSON Gemini tidak valid:", rawReply);

      result = {
        reply: rawReply,
        difficultyDetected: false,
      };
    }

    const reply =
      typeof result.reply === "string" && result.reply.trim()
        ? result.reply.trim()
        : FALLBACK;

    return res.json({
      reply,
      difficultyDetected: result.difficultyDetected === true,
    });
  } catch (error) {
    console.error("Kesalahan chatbot:", error.message);

    return res.status(502).json({
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
