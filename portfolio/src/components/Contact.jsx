import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

/* ── Typewriter hook ── */
function useTypewriter(text, speed = 38, started = false, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!started) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [started, text, delay]);
  return { displayed, done };
}

/* Blinking cursor */
const Cursor = ({ visible }) => (
  <span style={{
    display: "inline-block", width: 2, height: "1em",
    background: "#06B6D4", marginLeft: 2, verticalAlign: "middle",
    animation: "blink 1s step-end infinite",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.2s",
  }} />
);

/* ── Contact items ── */
const contactItems = [
  {
    label: "WhatsApp",
    value: "+62 812-9450-0613",
    href: "https://wa.me/6281294500613?text=Hi%20Berlin%2C%20I%20found%20your%20portfolio!",
    desc: "Ping me directly",
    color: "#34D399",
    glow: "rgba(52,211,153,0.35)",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.25)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "berlinsugiyanto23@gmail.com",
    href: "mailto:berlinsugiyanto23@gmail.com",
    desc: "Fastest way to reach me",
    color: "#FCD34D",
    glow: "rgba(252,211,77,0.35)",
    bg: "rgba(252,211,77,0.07)",
    border: "rgba(252,211,77,0.25)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/berlinsugi",
    href: "https://linkedin.com/in/berlinsugi",
    desc: "Let's connect professionally",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.35)",
    bg: "rgba(56,189,248,0.07)",
    border: "rgba(56,189,248,0.25)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/B3rlinSugi",
    href: "https://github.com/B3rlinSugi",
    desc: "Browse my repositories",
    color: "#C8D8F0",
    glow: "rgba(200,216,240,0.25)",
    bg: "rgba(200,216,240,0.05)",
    border: "rgba(200,216,240,0.18)",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

/* ── Big contact card ── */
const BigContactCard = ({ item, index, visible, prevDone, onDone }) => {
  const [hovered, setHovered] = useState(false);
  const totalDelay = 900 + index * 60;
  const { displayed, done } = useTypewriter(item.value, 32, prevDone, 120);

  useEffect(() => { if (done) onDone(); }, [done]);

  return (
    <a
      href={item.href}
      target={item.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 20,
        padding: "20px 28px", borderRadius: 16,
        background: hovered ? item.bg : "rgba(10,20,38,0.6)",
        border: `1px solid ${hovered ? item.border : "rgba(59,130,246,0.1)"}`,
        textDecoration: "none", cursor: "pointer",
        transform: hovered ? "translateY(-3px) scale(1.01)" : visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.55s ease ${totalDelay}ms, transform 0.4s cubic-bezier(.22,1,.36,1), background 0.2s, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hovered ? `0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px ${item.color}18, inset 0 1px 0 rgba(255,255,255,0.04)` : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Shine */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16, pointerEvents: "none",
        background: hovered ? `radial-gradient(circle at 20% 50%, ${item.bg}, transparent 65%)` : "transparent",
        transition: "background 0.25s",
      }} />

      {/* Big icon */}
      <div style={{
        width: 58, height: 58, borderRadius: 16, flexShrink: 0,
        background: hovered ? item.bg : "rgba(15,31,56,0.9)",
        border: `1px solid ${hovered ? item.border : "rgba(59,130,246,0.1)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: item.color,
        boxShadow: hovered ? `0 0 24px ${item.glow}, 0 0 48px ${item.glow}` : "none",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)",
        zIndex: 1,
      }}>{item.icon}</div>

      {/* Text */}
      <div style={{ flex: 1, zIndex: 1 }}>
        <div style={{
          fontSize: 9.5, color: "var(--muted)", letterSpacing: "2px",
          textTransform: "uppercase", fontWeight: 600, marginBottom: 4,
          fontFamily: "'JetBrains Mono',monospace",
        }}>{item.label}</div>
        <div style={{
          fontSize: 15.5, fontWeight: 700,
          color: hovered ? item.color : "var(--white)",
          fontFamily: "'Outfit',sans-serif",
          transition: "color 0.2s",
          minHeight: 24,
        }}>
          {displayed}
          <Cursor visible={!done && prevDone} />
        </div>
        <div style={{
          fontSize: 11.5, color: "var(--muted)",
          fontFamily: "'Outfit',sans-serif", marginTop: 2,
        }}>{item.desc}</div>
      </div>

      {/* Arrow */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        style={{
          color: item.color, flexShrink: 0, zIndex: 1,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0) rotate(-45deg)" : "translateX(-8px) rotate(-45deg)",
          transition: "all 0.25s",
        }}>
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </a>
  );
};

/* ── Typewriter headline ── */
const TypewriterHeadline = ({ started }) => {
  const line1 = useTypewriter("Let's work", 55, started, 100);
  const line2 = useTypewriter("together.", 55, line1.done, 80);
  const sub   = useTypewriter("Actively seeking Junior Backend Developer roles.", 28, line2.done, 60);

  return (
    <div style={{ marginBottom: 52, textAlign: "center" }}>
      <h2 style={{
        fontFamily: "'Outfit',sans-serif",
        fontWeight: 900, lineHeight: 1.0,
        letterSpacing: "-3px", margin: 0,
        fontSize: "clamp(42px,5.5vw,72px)",
      }}>
        <span style={{ color: "var(--white)", display: "block", minHeight: "1.1em" }}>
          {line1.displayed}
          <Cursor visible={!line1.done} />
        </span>
        <span style={{
          display: "block", minHeight: "1.1em",
          background: "linear-gradient(135deg,#3B82F6,#06B6D4)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        }}>
          {line2.displayed}
          <Cursor visible={line1.done && !line2.done} />
        </span>
      </h2>
      <p style={{
        marginTop: 20, fontSize: 15, color: "#6B84A8",
        fontFamily: "'Outfit',sans-serif", minHeight: 24,
        maxWidth: 480, margin: "20px auto 0",
      }}>
        {sub.displayed}
        <Cursor visible={line2.done && !sub.done} />
      </p>
    </div>
  );
};

/* ── Status terminal bar ── */
const StatusBar = ({ visible }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 10,
    background: "rgba(6,14,30,0.7)", border: "1px solid rgba(59,130,246,0.15)",
    borderRadius: 10, padding: "10px 18px", marginBottom: 40,
    fontFamily: "'JetBrains Mono',monospace",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.5s ease 0.2s",
  }}>
    <span style={{ fontSize: 10, color: "var(--muted)" }}>$</span>
    <span style={{ fontSize: 11, color: "var(--muted)" }}>status</span>
    <span style={{ fontSize: 11, color: "rgba(59,130,246,0.4)" }}>--check</span>
    <span style={{ width: 1, height: 14, background: "rgba(59,130,246,0.2)" }} />
    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.6)", animation: "pulse-dot 2s infinite" }} />
    <span style={{ fontSize: 11.5, color: "#34D399", fontWeight: 600 }}>open_to_opportunities: true</span>
  </div>
);

const Contact = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Chain typewriter per card — each starts after previous finishes */
  const [cardsDone, setCardsDone] = useState([false, false, false, false]);
  const markDone = (i) => setCardsDone(prev => { const n = [...prev]; n[i] = true; return n; });

  /* prevDone[i] = true means card i can start typing */
  const canType = (i) => i === 0 ? visible : cardsDone[i - 1];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} style={{
      background: "var(--navy)", borderTop: "1px solid rgba(59,130,246,0.07)",
      paddingBottom: 80,
    }}>
      {/* Ambient glows */}
      <div style={{ position: "absolute", top: "5%", left: "20%", width: "30%", height: "40%", background: "radial-gradient(circle,rgba(29,78,216,0.06),transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "15%", width: "25%", height: "35%", background: "radial-gradient(circle,rgba(6,182,212,0.05),transparent 65%)", pointerEvents: "none" }} />

      <p className="s-label" style={{ opacity: visible ? 1 : 0, transition: "opacity .5s", textAlign: "center" }}>contact</p>

      {/* ── Centered hero layout ── */}
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>

        <TypewriterHeadline started={visible} />

        <StatusBar visible={visible} />

        {/* ── Contact cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {contactItems.map((item, i) => (
            <BigContactCard
              key={item.label}
              item={item}
              index={i}
              visible={visible}
              prevDone={canType(i)}
              onDone={() => markDone(i)}
            />
          ))}
        </div>

        {/* ── CTA buttons ── */}
        <div style={{
          display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
          opacity: cardsDone[2] ? 1 : 0,
          transform: cardsDone[2] ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(.22,1,.36,1)",
          marginBottom: 48,
        }}>
          <a href={`mailto:${data.email}`} className="btn-primary" style={{ justifyContent: "center", minWidth: 200 }}>
            Send Email ✉
          </a>
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="btn-outline" style={{ justifyContent: "center", minWidth: 200 }}>
            Connect on LinkedIn
          </a>
        </div>

        {/* ── Work types ── */}
        <div style={{
          display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 48,
          opacity: cardsDone[3] ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          {["Full-time", "Hybrid", "Magang", "Kontrak", "Remote"].map((t, i) => (
            <span key={t} style={{
              fontSize: 11.5, color: "var(--cyan)",
              background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.22)",
              padding: "5px 16px", borderRadius: 100,
              fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
              animation: `fadeUp 0.5s ease ${i * 80}ms both`,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 32, paddingTop: 24,
        borderTop: "1px solid rgba(59,130,246,0.07)",
        fontSize: 11.5, color: "var(--muted)",
        textAlign: "center", fontFamily: "'JetBrains Mono',monospace",
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 1.5s",
      }}>
        built with <span style={{ color: "var(--blue-3)", fontWeight: 700 }}>React</span> by Berlin Sugiyanto Hutajulu · 2026
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)} 70%{box-shadow:0 0 0 8px rgba(16,185,129,0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @media(max-width:600px){
          section#contact { position: relative; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
