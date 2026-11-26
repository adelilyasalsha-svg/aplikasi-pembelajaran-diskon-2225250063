
import { useState, useRef, useEffect } from "react";

const API = import.meta.env.DEV
  ? "http://localhost:3001"
  : "";

const FASE = {
  1: "Pahami masalah",
  2: "Bangun konsep",
  3: "Terapkan dan periksa",
};

export default function AsistenBelajar({ mode = "belajar" }) {
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      content:
        "Halo! Selamat datang di Asisten Belajar Diskon. Kamu bisa bertanya tentang konsep diskon, rumus, contoh soal, perhitungan, atau mengirim soal dari guru. Yuk, kita pelajari bersama!",
    },
  ]);

  const [input, setInput] = useState("");
  const [phase, setPhase] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [msgs, loading]);

  async function sendMessage(message) {
    const text = message.trim();

    if (!text || loading) return;

    const next = [
      ...msgs,
      { role: "user", content: text },
    ];

    setMsgs(next);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phase,
          wrongCount: 0,
          messages: next.slice(-12),
          mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Terjadi kesalahan.");
      }

      setMsgs([
        ...next,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      setError(err.message || "Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  function send(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function nextPhase() {
    setPhase((current) => Math.min(current + 1, 3));
  }

  return (
    <section className="assistant-chat" aria-label="Asisten Belajar">

      <div className="assistant-header">
        <div className="assistant-icon">🤖</div>
        <div>
          <h3 className="assistant-title">
            Asisten Belajar Diskon
          </h3>
          <p className="assistant-subtitle">
            Teman belajar untuk memahami materi diskon
          </p>
        </div>
      </div>

      <div className="assistant-phase">
        <span>Tahap Pembelajaran</span>
        <strong>{FASE[phase]}</strong>
      </div>

      <div
        className="assistant-log"
        role="log"
        aria-live="polite"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "18px",
          textAlign: "left",
        }}
      >
        {msgs.map((message, index) => {
          const isUser = message.role === "user";

          return (
            <div
              key={index}
              className={`assistant-message ${
                isUser ? "assistant-user" : "assistant-bot"
              }`}
              style={{
                alignSelf: isUser ? "flex-end" : "flex-start",
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
                maxWidth: "78%",
                padding: "12px 16px",
                borderRadius: "18px",
                backgroundColor: isUser ? "#7541b8" : "#f0e9fc",
                color: isUser ? "#ffffff" : "#514366",
                textAlign: "left",
                boxSizing: "border-box",
                overflowWrap: "anywhere",
              }}
            >
              <span
                className="assistant-sender"
                style={{
                  display: "block",
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  marginBottom: "6px",
                  color: isUser ? "#ffffff" : "#7652a5",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                }}
              >
                {isUser ? "Kamu" : "Asisten"}
              </span>

              <p
                style={{
                  margin: 0,
                  color: "inherit",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  textAlign: "left",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                }}
              >
                {message.content}
              </p>
            </div>
          );
        })}

        {loading && (
          <div
            className="assistant-message assistant-bot"
            style={{
              alignSelf: "flex-start",
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              maxWidth: "78%",
              padding: "12px 16px",
              borderRadius: "18px",
              backgroundColor: "#f0e9fc",
              color: "#514366",
              textAlign: "left",
            }}
          >
            <span
              style={{
                marginBottom: "6px",
                color: "#7652a5",
                fontWeight: 700,
              }}
            >
              Asisten
            </span>
            <p style={{ margin: 0 }}>
              Sedang berpikir...
            </p>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {error && (
        <p className="assistant-error" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={send} className="assistant-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan sesuatu tentang materi diskon..."
          className="assistant-input"
          maxLength={1000}
          disabled={loading}
        />

        <button
          type="submit"
          className="assistant-send"
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Kirim"}
        </button>
      </form>

      <div className="assistant-controls">
        <button
          type="button"
          className="assistant-next"
          onClick={nextPhase}
          disabled={loading || phase >= 3}
        >
          Lanjut Tahap Berikutnya →
        </button>
      </div>

    </section>
  );
}
