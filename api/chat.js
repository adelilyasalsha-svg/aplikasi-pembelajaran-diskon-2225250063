
import {
  buildSystemPrompt,
  DEFAULT_STUDENT_PROFILE,
} from "../server/prompt.js";

const FALLBACK =
  "Coba kita pelan-pelan. Dari soal tersebut, informasi apa yang sudah kamu ketahui?";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function askGemini(messages, systemPrompt, apiKey, model) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            contents: messages,
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

        if (
          [429, 500, 502, 503, 504].includes(response.status) &&
          attempt < maxAttempts
        ) {
          await sleep(1500 * Math.pow(2, attempt - 1));
          continue;
        }

        throw new Error(
          data.error?.message || `Gemini HTTP ${response.status}`
        );
      }

      const reply = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("");

      if (!reply) {
        throw new Error("Jawaban Gemini kosong.");
      }

      return reply;
    } catch (error) {
      const retryable =
        error.name === "AbortError" ||
        error.cause?.code === "ECONNRESET" ||
        error.cause?.code === "ETIMEDOUT";

      if (retryable && attempt < maxAttempts) {
        await sleep(1500 * Math.pow(2, attempt - 1));
        continue;
      }

      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error("Gemini gagal setelah beberapa percobaan.");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method tidak diizinkan.",
    });
  }

  try {
    const {
      phase = 1,
      wrongCount = 0,
      messages = [],
      mode = "belajar",
    } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY;
    const model =
      process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY belum diatur di Vercel.",
      });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "Format pesan tidak valid.",
      });
    }

    // Samakan pengolahan riwayat dengan backend lokal.
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

      // Buang pesan pembuka asisten.
      if (history.length === 0 && role !== "user") {
        continue;
      }

      const lastMessage = history[history.length - 1];

      // Gabungkan pesan dengan peran yang sama.
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

    const systemPrompt = buildSystemPrompt({
      problem: null,
      phase: safePhase,
      hintLevel: safeWrongCount,
      studentProfile: DEFAULT_STUDENT_PROFILE,
      mode,
    });

    const contents = history.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

    const rawReply = await askGemini(
      contents,
      systemPrompt,
      apiKey,
      model
    );

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

    return res.status(200).json({
      reply,
      difficultyDetected:
        result.difficultyDetected === true,
    });
  } catch (error) {
    console.error("Chat API error:", error.message);

    return res.status(502).json({
      error: "Asisten sedang tidak tersedia. Coba lagi sebentar.",
    });
  }
}
