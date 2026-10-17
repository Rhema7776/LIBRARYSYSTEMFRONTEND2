import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const GREETING =
  "Hi! I can find books, check copies, borrow for you, show your loans and fines, and answer library questions.";

const styles = {
  button: {
    position: "fixed", right: 16, bottom: 16, zIndex: 1000, border: "none", borderRadius: 28,
    padding: "12px 18px", background: "#1f4e79", color: "#fff", fontSize: 15, cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  panel: {
    position: "fixed", right: 16, bottom: 16, zIndex: 1000, width: "min(380px, calc(100vw - 32px))",
    height: "min(520px, calc(100vh - 32px))", background: "#fff", borderRadius: 12, display: "flex",
    flexDirection: "column", boxShadow: "0 4px 20px rgba(0,0,0,0.35)", overflow: "hidden", color: "#222",
  },
  header: {
    background: "#1f4e79", color: "#fff", padding: "10px 14px", display: "flex",
    justifyContent: "space-between", alignItems: "center", fontWeight: 600,
  },
  close: { background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" },
  log: { flex: 1, overflowY: "auto", padding: 12, background: "#f4f6f8" },
  form: { display: "flex", gap: 8, padding: 10, borderTop: "1px solid #ddd", background: "#fff" },
  input: { flex: 1, padding: "9px 10px", fontSize: 15, border: "1px solid #bbb", borderRadius: 6 },
  send: {
    padding: "9px 14px", border: "none", borderRadius: 6, background: "#1f4e79", color: "#fff", cursor: "pointer",
  },
  notice: {
    margin: "6px 0", padding: "6px 10px", background: "#fff3cd", border: "1px solid #ffe08a",
    borderRadius: 6, fontSize: 13,
  },
};

const bubble = (role) => ({
  maxWidth: "85%", margin: "6px 0", padding: "8px 11px", borderRadius: 10, fontSize: 14,
  lineHeight: 1.35, whiteSpace: "pre-wrap", wordBreak: "break-word",
  marginLeft: role === "user" ? "auto" : 0,
  background: role === "user" ? "#1f4e79" : "#fff",
  color: role === "user" ? "#fff" : "#222",
  border: role === "user" ? "none" : "1px solid #dde",
});

export default function ChatBox() {
  const { isLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: GREETING }]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current && endRef.current.scrollIntoView) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Start fresh when someone logs out, so the next person never sees the last chat.
  useEffect(() => {
    if (!isLoggedIn) {
      setMessages([{ role: "assistant", text: GREETING }]);
      setConversationId(null);
      setOpen(false);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  const add = (role, msg, extra = {}) => setMessages((m) => [...m, { role, text: msg, ...extra }]);

  const send = async (e) => {
    e.preventDefault();
    const message = text.trim();
    if (!message || busy) return;
    setText("");
    add("user", message);
    setBusy(true);
    try {
      const res = await api.post("/assistant/chat/", {
        message,
        ...(conversationId ? { conversation_id: conversationId } : {}),
      });
      setConversationId(res.data.conversation_id);
      add("assistant", res.data.reply, { escalated: res.data.escalated });
    } catch (err) {
      const status = err.response && err.response.status;
      if (status === 429) add("assistant", "You're sending messages too quickly. Please wait a moment.");
      else if (status === 503) add("assistant", (err.response.data && err.response.data.error) || "The assistant is unavailable right now.");
      else if (status === 404) { setConversationId(null); add("assistant", "That chat expired. Please ask again."); }
      else add("assistant", (err.response && err.response.data && err.response.data.error) || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button style={styles.button} onClick={() => setOpen(true)} aria-label="Open library assistant">
        Ask the library assistant
      </button>
    );
  }

  return (
    <div style={styles.panel} role="dialog" aria-label="Library assistant">
      <div style={styles.header}>
        <span>Library assistant</span>
        <button style={styles.close} onClick={() => setOpen(false)} aria-label="Close">×</button>
      </div>
      <div style={styles.log}>
        {messages.map((m, i) => (
          <div key={i}>
            <div style={bubble(m.role)}>{m.text}</div>
            {m.escalated && <div style={styles.notice}>A librarian has been notified.</div>}
          </div>
        ))}
        {busy && <div style={bubble("assistant")}>Thinking...</div>}
        <div ref={endRef} />
      </div>
      <form style={styles.form} onSubmit={send}>
        <input
          style={styles.input} value={text} onChange={(e) => setText(e.target.value)}
          placeholder="Type your question" maxLength={1000} disabled={busy} aria-label="Message"
        />
        <button style={styles.send} type="submit" disabled={busy || !text.trim()}>Send</button>
      </form>
    </div>
  );
}
