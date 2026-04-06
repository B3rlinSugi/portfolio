import { useEffect, useRef, useState, useCallback } from "react";
import { data } from "../data/portfolioData";
import { getContactActionLinks } from "../utils/contactActions";

const PROMPT = "visitor@berlinsugi:~$ ";
const OPEN_PREFIX = "__OPEN__:";
const actionLinks = getContactActionLinks(data);

const COMMANDS = {
  help: () => [
    { t: "c", v: "Available commands:" },
    {
      t: "l",
      v: [
        "about",
        "skills",
        "projects",
        "contact",
        "cv",
        "download-cv",
        "email",
        "whatsapp",
        "whoami",
        "secret",
        "clear",
        "exit",
      ],
    },
    { t: "m", v: "Tip: press ` (backtick) to toggle this terminal anytime." },
  ],
  whoami: () => [
    { t: "c", v: "You are a curious visitor. Welcome." },
    { t: "m", v: `This terminal was built by ${data.name}.` },
  ],
  about: () => [
    { t: "c", v: `> ${data.name}` },
    { t: "m", v: data.about },
  ],
  skills: () => [
    { t: "c", v: "Core tech stack:" },
    {
      t: "l",
      v: [
        "PHP 8 / Laravel 11",
        "Java / Spring Boot",
        "MySQL / PostgreSQL",
        "REST API / JWT Auth",
        "Git / Linux / Docker",
      ],
    },
  ],
  projects: () => [
    { t: "c", v: "Recent projects:" },
    {
      t: "l",
      v: [
        "Student Management API (Laravel 11 / JWT / RBAC)",
        "TokoKu E-Commerce (PHP / MySQL / Chart.js)",
        "Cash Flow Manager (bcrypt / PDF export)",
        "Sistem Data Akademik (CRUD / Chart.js)",
      ],
    },
  ],
  contact: () => [
    { t: "c", v: "Reach me at:" },
    {
      t: "l",
      v: [
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        "LinkedIn: linkedin.com/in/berlinsugi",
        "GitHub: github.com/B3rlinSugi",
      ],
    },
    { t: "m", v: `Location: ${data.location} - Remote OK` },
    { t: "m", v: `Tip: use "email" or "whatsapp" for instant contact action.` },
  ],
  cv: () => `${OPEN_PREFIX}/cv.pdf`,
  "download-cv": () => `${OPEN_PREFIX}/cv.pdf`,
  email: () => `${OPEN_PREFIX}${actionLinks.email}`,
  whatsapp: () => `${OPEN_PREFIX}${actionLinks.whatsapp}`,
  secret: () => [
    { t: "c", v: "SECRET UNLOCKED" },
    { t: "m", v: "You found the easter egg. Respect." },
    { t: "m", v: "Fun fact: this terminal was coded from scratch, no library." },
    { t: "m", v: "If you are a recruiter reading this: I go the extra mile." },
  ],
  clear: () => "__CLEAR__",
  exit: () => "__EXIT__",
};

function processCommand(input) {
  const cmd = input.trim().toLowerCase();
  if (!cmd) return [];
  const fn = COMMANDS[cmd];
  if (!fn) {
    return [{ t: "e", v: `Command not found: "${cmd}". Type "help" for available commands.` }];
  }
  return fn();
}

const Line = ({ line }) => {
  if (line.t === "c") {
    return <div style={{ color: "#06B6D4", fontWeight: 700, marginTop: 4 }}>{line.v}</div>;
  }
  if (line.t === "e") {
    return <div style={{ color: "#EF4444" }}>Error: {line.v}</div>;
  }
  if (line.t === "m") {
    return <div style={{ color: "rgba(200,216,240,0.6)", marginTop: 2 }}>{line.v}</div>;
  }
  if (line.t === "l") {
    return (
      <ul style={{ margin: "4px 0", padding: 0, listStyle: "none" }}>
        {line.v.map((item, i) => (
          <li key={i} style={{ color: "#C8D8F0", paddingLeft: 12, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: "#3B82F6" }}>{">"}</span> {item}
          </li>
        ))}
      </ul>
    );
  }
  if (line.t === "i") {
    return (
      <div style={{ color: "#C8D8F0" }}>
        <span style={{ color: "rgba(6,182,212,0.6)" }}>{PROMPT}</span>
        {line.v}
      </div>
    );
  }
  return null;
};

const TerminalEgg = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([
    { t: "c", v: "Berlin's Portfolio Terminal v1.0.0" },
    { t: "m", v: 'Type "help" for available commands. Press ` to close.' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const keyBuffer = useRef("");
  const keyTimer = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "`") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }

      if (!open && e.key.length === 1) {
        keyBuffer.current += e.key.toLowerCase();
        if (keyBuffer.current.includes("berlin")) {
          keyBuffer.current = "";
          setOpen(true);
          setInput("");
        }
        clearTimeout(keyTimer.current);
        keyTimer.current = setTimeout(() => {
          keyBuffer.current = "";
        }, 2000);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(keyTimer.current);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const submit = useCallback(() => {
    if (!input.trim()) return;
    const cmd = input.trim();
    const echo = { t: "i", v: cmd };
    const result = processCommand(cmd);

    if (result === "__EXIT__") {
      setOpen(false);
      setInput("");
      return;
    }
    if (result === "__CLEAR__") {
      setLines([{ t: "c", v: "Terminal cleared." }]);
      setInput("");
      return;
    }

    if (typeof result === "string" && result.startsWith(OPEN_PREFIX)) {
      const targetUrl = result.slice(OPEN_PREFIX.length);
      if (targetUrl) {
        if (targetUrl.startsWith("mailto:")) {
          window.location.href = targetUrl;
        } else {
          window.open(targetUrl, "_blank", "noopener,noreferrer");
        }
      }
      setLines((prev) => [...prev, echo, { t: "m", v: `Opening ${targetUrl} ...` }]);
      setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
      setHistIdx(-1);
      setInput("");
      return;
    }

    setLines((prev) => [...prev, echo, ...result]);
    setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
    setHistIdx(-1);
    setInput("");
  }, [input]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] || "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
    if (e.key === "Escape") setOpen(false);
  };

  if (!open) {
    return (
      <div
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Open terminal panel"
        title="Open Terminal (press ` or type 'berlin')"
        style={{
          position: "fixed",
          bottom: 80,
          left: 20,
          zIndex: 100,
          width: 36,
          height: 36,
          borderRadius: 9,
          background: "rgba(15,31,56,0.9)",
          border: "1px solid rgba(59,130,246,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#06B6D4",
          backdropFilter: "blur(12px)",
          transition: "all 0.2s ease",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(6,182,212,0.12)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(15,31,56,0.9)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 500,
        width: "min(520px, calc(100vw - 40px))",
        borderRadius: 14,
        overflow: "hidden",
        background: "rgba(4,10,22,0.97)",
        border: "1px solid rgba(59,130,246,0.25)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(6,182,212,0.1)",
        backdropFilter: "blur(20px)",
        animation: "termSlideUp 0.3s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid rgba(59,130,246,0.1)",
          background: "rgba(15,31,56,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#EF4444", "#F59E0B", "#10B981"].map((c, i) => (
              <div
                key={i}
                onClick={i === 0 ? () => setOpen(false) : undefined}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c,
                  cursor: i === 0 ? "pointer" : "default",
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: 11,
              color: "rgba(6,182,212,0.7)",
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            berlin@portfolio ~ bash
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close terminal panel"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(200,216,240,0.35)",
            padding: 4,
            display: "flex",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div
        style={{
          height: 260,
          overflowY: "auto",
          padding: "12px 16px",
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 12,
          lineHeight: 1.7,
          color: "#C8D8F0",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <Line key={i} line={line} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          borderTop: "1px solid rgba(59,130,246,0.08)",
          background: "rgba(6,14,30,0.5)",
        }}
      >
        <span
          style={{
            color: "rgba(6,182,212,0.6)",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11.5,
            flexShrink: 0,
          }}
        >
          {PROMPT}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type a command..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#F0F6FF",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 12,
            caretColor: "#06B6D4",
          }}
        />
      </div>

      <style>{`
        @keyframes termSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default TerminalEgg;
