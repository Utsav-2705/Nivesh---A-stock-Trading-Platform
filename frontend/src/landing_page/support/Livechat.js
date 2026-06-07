// LiveChat.jsx
import { useState, useRef, useEffect } from "react";
import "./Livechat.css";

const BOT_REPLY = "Thanks for contacting Nivesh Support. We will help you shortly 🚀";

const BotAvatar = () => (
  <div className="avatar bot-avatar">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const TypingIndicator = () => (
  <div className="message-row bot-row">
    <BotAvatar />
    <div className="bubble bot-bubble typing-bubble">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  </div>
);

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function Livechat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Welcome to Nivesh Support 📈 How can we assist your trading journey today?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), sender: "user", text, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: BOT_REPLY, time: new Date() },
      ]);
    }, 800);

    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-page">
      {/* Ambient background grid */}
      <div className="bg-grid" aria-hidden="true" />

      <div className={`chat-widget ${isOpen ? "open" : "closed"}`}>
        {/* Header */}
        <header className="chat-header">
          <div className="header-left">
            <div className="header-logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="16 7 22 7 22 13"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="header-info">
              <span className="brand-name">NIVESH</span>
              <span className="header-sub">
                <span className="status-dot" /> Live Support
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button
              className="icon-btn"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Minimize chat" : "Open chat"}
            >
              {isOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <line x1="5" y1="12" x2="19" y2="12"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polyline points="18 15 12 9 6 15"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Collapsible body */}
        <div className="chat-body-wrapper">
          {/* Messages area */}
          <div className="messages-area" role="log" aria-live="polite">
            <div className="date-divider"><span>Today</span></div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}
              >
                {msg.sender === "bot" && <BotAvatar />}
                <div className="bubble-group">
                  <div className={`bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
                    {msg.text}
                  </div>
                  <span className={`timestamp ${msg.sender === "user" ? "ts-right" : "ts-left"}`}>
                    {formatTime(msg.time)}
                  </span>
                </div>
                {msg.sender === "user" && (
                  <div className="avatar user-avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="quick-prompts">
            {["Track my order", "Account issue", "Market hours"].map((q) => (
              <button
                key={q}
                className="quick-chip"
                onClick={() => {
                  setInput(q);
                  inputRef.current?.focus();
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input bar */}
          <div className="input-bar">
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              maxLength={400}
              aria-label="Chat message input"
            />
            <button
              className={`send-btn ${input.trim() ? "active" : ""}`}
              onClick={sendMessage}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <line x1="22" y1="2" x2="11" y2="13"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"
                  stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <p className="powered-by">Secured by Nivesh · End-to-end encrypted</p>
        </div>
      </div>
    </div>
  );
}
