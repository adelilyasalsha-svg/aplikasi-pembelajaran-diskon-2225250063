
import {
  buildSystemPrompt,
  DEFAULT_STUDENT_PROFILE,
} from "../server/prompt.js";

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
        error: "Pesan belum tersedia.",
      });
    }

    const hintLevel = Math.min(
      Math.max(Number(wrongCount) || 0, 0),
      3
    );

    const systemPrompt = buildSystemPrompt({
      phase: Number(phase) || 1,
      hintLevel,
      studentProfile: DEFAULT_STUDENT_PROFILE,
      mode,
    });

    const contents = messages.slice(-12).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: String(msg.content || "") }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents,
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return res.status(502).json({
        error: "Gagal menghubungi layanan AI.",
      });
    }

    const rawReply =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("");

    if (!rawReply) {
      return res.status(502).json({
        error: "AI tidak memberikan balasan.",
      });
    }

    const result = JSON.parse(rawReply);

    return res.status(200).json({
      reply: result.reply || "Maaf, coba tanyakan kembali.",
      difficultyDetected:
        Boolean(result.difficultyDetected),
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return res.status(500).json({
      error: "Terjadi kesalahan pada server chatbot.",
    });
  }
}
