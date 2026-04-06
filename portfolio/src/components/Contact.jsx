import { useEffect, useRef, useState, useContext } from "react";
import { LangContext } from "../LangContext";
import { i18n } from "../i18n";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CRED_TOKENS = [
  { id: "t1", fromX: -540, toX: -170, delay: 0.02, color: "#3B82F6", label: "CERT" },
  { id: "t2", fromX: -430, toX: -118, delay: 0.06, color: "#06B6D4", label: "ISSUER" },
  { id: "t3", fromX: -308, toX: -56, delay: 0.1, color: "#8B5CF6", label: "VERIFIED" },
  { id: "t4", fromX: -176, toX: 8, delay: 0.14, color: "#10B981", label: "BADGE" },
  { id: "t5", fromX: -34, toX: 74, delay: 0.18, color: "#22D3EE", label: "TRUST" },
  { id: "t6", fromX: 116, toX: 138, delay: 0.22, color: "#3B82F6", label: "CONNECT" },
];

const CONTACT_BEACONS = [
  { id: "b1", x: -172, y: 188, delay: 0.48, color: "#3B82F6" },
  { id: "b2", x: -92, y: 202, delay: 0.56, color: "#06B6D4" },
  { id: "b3", x: -12, y: 194, delay: 0.62, color: "#8B5CF6" },
  { id: "b4", x: 68, y: 204, delay: 0.68, color: "#10B981" },
  { id: "b5", x: 146, y: 190, delay: 0.74, color: "#22D3EE" },
];

// ─── 3D TILT CARD ─────────────────────────────────────────────────────────────
const PlayerCard = ({ visible }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 }); // 0-1 normalized
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouse({ x, y });
    setTilt({
      x: (y - 0.5) * -18,  // tilt up/down
      y: (x - 0.5) * 18,   // tilt left/right
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setMouse({ x: 0.5, y: 0.5 });
    setHovered(false);
  };

  const STATS = [
    { label: "PROJECTS",  value: "05", color: "#3B82F6" },
    { label: "GPA",       value: "3.63", color: "#06B6D4" },
    { label: "CERTS",     value: "06",  color: "#8B5CF6" },
    { label: "ORGS",      value: "03",  color: "#F59E0B" },
  ];

  const SKILLS = [
    { name: "PHP",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
    { name: "Laravel",   icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
    { name: "Java",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain.svg" },
    { name: "MySQL",     icon: "https://cdn.simpleicons.org/mysql/00758F" },
    { name: "Git",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "Spring",   icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
  ];
  const BADGES = [
    { label: "BACKEND", color: "#3B82F6", glow: "59,130,246" },
    { label: "OPEN TO WORK", color: "#10B981", glow: "16,185,129" },
    { label: "2026", color: "#8B5CF6", glow: "139,92,246" },
  ];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 340,
        perspective: "1000px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div style={{
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
        transition: hovered ? "transform 0.08s linear" : "transform 0.6s cubic-bezier(.22,1,.36,1)",
        boxShadow: hovered
          ? "0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(59,130,246,0.2), 0 0 0 1px rgba(255,255,255,0.1)"
          : "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        background: "linear-gradient(160deg,#0D1B3E 0%,#060E1E 60%,#0A1628 100%)",
        transformStyle: "preserve-3d",
      }}>

        {/* ── HOLOGRAPHIC SHIMMER (follows mouse) ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
          borderRadius: 24,
          background: `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%,
            rgba(255,255,255,0.12) 0%,
            rgba(59,130,246,0.08) 20%,
            rgba(139,92,246,0.05) 40%,
            transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }} />

        {/* ── Holographic color sweep ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 9, pointerEvents: "none",
          borderRadius: 24,
          background: `linear-gradient(
            ${105 + mouse.x * 60}deg,
            rgba(59,130,246,0.08) 0%,
            rgba(6,182,212,0.06) 30%,
            rgba(139,92,246,0.07) 60%,
            rgba(236,72,153,0.05) 100%)`,
          opacity: hovered ? 0.9 : 0.4,
          transition: "opacity 0.3s",
        }} />

        {/* ── CARD HEADER (banner area) ── */}
        <div style={{
          height: 110,
          background: "linear-gradient(135deg,#064E3B 0%,#0D766A 35%,#1E3A5F 70%,#0F172A 100%)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Pattern overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize: "20px 20px",
          }} />
          {/* Glare sweep */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(45deg,transparent 30%,rgba(255,255,255,0.08) 50%,transparent 70%)",
            transform: `translateX(${(mouse.x - 0.5) * 80}px)`,
            transition: hovered ? "transform 0.05s" : "transform 0.5s",
          }} />
          {/* Rarity badge top-right */}
          <div style={{
            position: "absolute", top: 12, right: 14,
            fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
            fontWeight: 800, letterSpacing: "2px",
            color: "#10B981", padding: "3px 10px",
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 6,
          }}>◆ FEATURED</div>
          {/* Card number */}
          <div style={{
            position: "absolute", top: 12, left: 14,
            fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
            color: "rgba(255,255,255,0.3)", letterSpacing: "1px",
          }}>#001 / 001</div>
        </div>

        {/* ── AVATAR (overlaps header) ── */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            border: "3px solid #020617",
            marginTop: -40, zIndex: 5, position: "relative",
            background: "linear-gradient(135deg,#064E3B,#0D766A)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5), 0 0 0 2px rgba(16,185,129,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", flexDirection: "column", gap: 0,
          }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 16, color: "#10B981", letterSpacing: "1px", lineHeight: 1 }}>BSH</span>
            <div style={{ width: 24, height: 1.5, background: "rgba(16,185,129,0.4)", borderRadius: 1, margin: "3px 0" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7, color: "rgba(16,185,129,0.6)", letterSpacing: "1.5px" }}>DEV</span>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 60%)" }} />
          </div>
        </div>

        {/* ── CARD BODY ── */}
        <div style={{ padding: "12px 24px 24px" }}>
          {/* Name + title */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 18, color: "#F8FAFC", letterSpacing: "-0.5px" }}>Berlin Sugiyanto H.</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#3B82F6", letterSpacing: "1.5px", marginTop: 3 }}>JUNIOR BACKEND DEVELOPER</div>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 18 }}>
            {BADGES.map(b => (
              <span key={b.label} style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fontWeight: 700,
                letterSpacing: "1px", color: b.color,
                background: `rgba(${b.glow},0.1)`,
                border: `1px solid rgba(${b.glow},0.3)`,
                padding: "3px 8px", borderRadius: 4,
              }}>{b.label}</span>
            ))}
          </div>

          {/* Stats grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: 8, marginBottom: 18,
            background: "rgba(0,0,0,0.3)",
            borderRadius: 12, padding: "14px 8px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 18, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7, color: "#334155", marginTop: 3, letterSpacing: "1px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tech logo icons with hover animation */}
          <div style={{ display: "flex", gap: 10, marginBottom: 18, justifyContent: "center", flexWrap: "wrap" }}>
            {SKILLS.map(sk => (
              <div key={sk.name} title={sk.name} style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
                cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.25) rotate(-5deg)";
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1) rotate(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
              >
                <img src={sk.icon} alt={sk.name} style={{ width: 20, height: 20, objectFit: "contain" }} />
              </div>
            ))}
          </div>

          {/* Location + availability bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 12px",
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.12)",
            borderRadius: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981", animation: "cardPulse 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#10B981" }}>AVAILABLE NOW</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#334155" }}>LOC: Bekasi, ID</span>
          </div>
        </div>

        {/* Bottom edge shine */}
        <div style={{
          position: "absolute", bottom: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(to right,transparent,rgba(255,255,255,0.1),transparent)",
        }} />
      </div>
    </motion.div>
  );
};

// ─── CONTACT BUTTONS ──────────────────────────────────────────────────────────
const ContactButtons = ({ visible }) => {
  const BTNS = [
    { label: "WhatsApp", href: "https://wa.me/6281294500613", color: "#34D399", glow: "52,211,153",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
    { label: "Email", href: "mailto:berlinsugiyanto23@gmail.com", color: "#FCD34D", glow: "252,211,77",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/></svg> },
    { label: "LinkedIn", href: "https://linkedin.com/in/berlinsugi", color: "#38BDF8", glow: "56,189,248",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { label: "GitHub", href: "https://github.com/B3rlinSugi", color: "#C8D8F0", glow: "200,216,240",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 340 }}>
      {BTNS.map((btn, i) => (
        <motion.a
          key={btn.label}
          href={btn.href}
          target={btn.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "13px 18px", borderRadius: 12,
            background: "rgba(5,10,22,0.7)",
            border: `1px solid rgba(${btn.glow},0.18)`,
            textDecoration: "none", cursor: "pointer",
            color: btn.color,
            boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
            transition: "all 0.2s",
          }}
          whileHover={{
            background: `rgba(${btn.glow},0.08)`,
            borderColor: `rgba(${btn.glow},0.4)`,
            boxShadow: `0 0 20px rgba(${btn.glow},0.2), 0 4px 12px rgba(0,0,0,0.3)`,
            x: 4,
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: `rgba(${btn.glow},0.1)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{btn.icon}</div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: btn.color, letterSpacing: "1.5px", marginBottom: 2 }}>CONNECT VIA</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}>{btn.label}</div>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: "auto", color: btn.color, opacity: 0.6 }}>
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </motion.a>
      ))}
    </div>
  );
};

// ─── MAIN ──────────────────────────────────────────────────────────────────────
const Contact = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const lang = useContext(LangContext);
  const t = i18n[lang].contact;
  const { scrollYProgress: contactProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.34"],
  });

  const contactSpring = { stiffness: 112, damping: 23, mass: 0.52 };
  const rawSectionY = useTransform(contactProgress, [0, 1], [88, 0]);
  const rawSectionOpacity = useTransform(contactProgress, [0, 0.38, 1], [0, 0.84, 1]);
  const rawSectionScale = useTransform(contactProgress, [0, 1], [0.965, 1]);
  const rawHeaderY = useTransform(contactProgress, [0, 1], [40, 0]);
  const rawHeaderOpacity = useTransform(contactProgress, [0, 0.46, 1], [0, 0.9, 1]);
  const rawLayoutY = useTransform(contactProgress, [0, 1], [50, 0]);
  const rawLayoutOpacity = useTransform(contactProgress, [0, 0.46, 1], [0, 0.92, 1]);
  const rawOverlayOpacity = useTransform(contactProgress, [0, 0.24, 0.66, 1], [1, 0.9, 0.22, 0]);
  const rawOverlayY = useTransform(contactProgress, [0, 1], [-24, 0]);
  const rawOverlayScale = useTransform(contactProgress, [0, 0.34, 1], [1.08, 1.02, 1]);
  const rawCoreOpacity = useTransform(contactProgress, [0, 0.2, 0.72], [0.95, 0.56, 0]);

  const sectionY = useSpring(rawSectionY, contactSpring);
  const sectionOpacity = useSpring(rawSectionOpacity, contactSpring);
  const sectionScale = useSpring(rawSectionScale, contactSpring);
  const headerY = useSpring(rawHeaderY, contactSpring);
  const headerOpacity = useSpring(rawHeaderOpacity, contactSpring);
  const layoutY = useSpring(rawLayoutY, contactSpring);
  const layoutOpacity = useSpring(rawLayoutOpacity, contactSpring);
  const overlayOpacity = useSpring(rawOverlayOpacity, contactSpring);
  const overlayY = useSpring(rawOverlayY, contactSpring);
  const overlayScale = useSpring(rawOverlayScale, contactSpring);
  const coreOpacity = useSpring(rawCoreOpacity, contactSpring);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "#020617",
        padding: "100px 0 80px",
        borderTop: "1px solid rgba(59,130,246,0.07)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* bg grid */}
      <div style={{ position: "absolute", inset: 0, backgroundSize: "40px 40px", backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.015) 1px,transparent 1px)", pointerEvents: "none" }} />
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "30%", left: "40%", width: 600, height: 500, background: "radial-gradient(ellipse,rgba(59,130,246,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

      <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, opacity: overlayOpacity, y: overlayY, scale: overlayScale, overflow: "hidden" }}>
        <motion.div style={{ position: "absolute", left: "50%", top: -48, marginLeft: -210, width: 420, height: 420, opacity: coreOpacity, background: "radial-gradient(circle, rgba(56,189,248,0.42) 0%, rgba(59,130,246,0.2) 34%, rgba(2,6,23,0.04) 70%, transparent 86%)", filter: "blur(32px)" }} />
        <div style={{ position: "absolute", left: "50%", top: -18, transform: "translateX(-50%)", width: "min(1080px, calc(100% - 24px))", height: 420, background: "radial-gradient(ellipse at center, rgba(56,189,248,0.3) 0%, rgba(59,130,246,0.12) 36%, rgba(2,6,23,0) 78%)" }} />

        {CRED_TOKENS.map((token) => (
          <motion.div
            key={token.id}
            initial={{ opacity: 0, x: token.fromX, y: -92, scale: 0.52, rotate: -16 }}
            animate={visible ? { opacity: [0, 1, 0.2, 0], x: [token.fromX, token.toX], y: [-92, 132, 246, 282], scale: [0.52, 1.16, 0.9, 0.8], rotate: [-16, 2, 7] } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: token.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: "50%", top: 0, width: 156, height: 20, transformOrigin: "0% 50%" }}
          >
            <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, borderRadius: 999, transform: "translateY(-50%)", background: `linear-gradient(to right, ${token.color}, rgba(56,189,248,0))`, boxShadow: `0 0 14px ${token.color}, 0 0 24px ${token.color}66` }} />
            <div style={{ position: "absolute", right: -1, top: "50%", width: 7, height: 7, borderRadius: "50%", transform: "translateY(-50%)", background: token.color, boxShadow: `0 0 12px ${token.color}` }} />
            <div style={{ position: "absolute", left: 5, top: -8, fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: "1.2px", color: token.color, textShadow: `0 0 10px ${token.color}` }}>{token.label}</div>
          </motion.div>
        ))}

        {CONTACT_BEACONS.map((beacon) => (
          <motion.div
            key={beacon.id}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={visible ? { opacity: [0, 1, 0], scale: [0.2, 1.26, 2.35] } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: beacon.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: "50%", top: 0, x: beacon.x, y: beacon.y, width: 16, height: 16, borderRadius: "50%", border: `2px solid ${beacon.color}`, boxShadow: `0 0 12px ${beacon.color}` }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.72 }}
          animate={visible ? { opacity: [0, 1, 0.24, 0], scale: [0.72, 1.1, 1.34, 1.56], rotate: [0, 26, 44] } : { opacity: 0 }}
          transition={{ duration: 1.34, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", left: "50%", top: 152, width: 250, height: 250, marginLeft: -125, borderRadius: "50%", border: "1px solid rgba(56,189,248,0.42)", boxShadow: "0 0 34px rgba(56,189,248,0.34)" }}
        />
      </motion.div>

      <motion.div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 3, y: sectionY, opacity: sectionOpacity, scale: sectionScale, transformOrigin: "center top", willChange: "transform, opacity" }}>

        {/* HEADER */}
        <motion.div style={{ textAlign: "center", marginBottom: 56, y: headerY, opacity: headerOpacity, transformOrigin: "center top", willChange: "transform, opacity" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.34, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#38BDF8", letterSpacing: "1.6px", margin: "0 0 12px" }}
          >CERTIFICATION SIGNAL VERIFIED - OPENING CONTACT CHANNEL</motion.p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#3B82F6", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, margin: "0 0 8px" }}>07. {t.label.toUpperCase()}</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 32, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.5px", margin: "8px 0 8px" }}>{t.headline}</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#64748B", margin: 0 }}>{t.sub}</p>
        </motion.div>

        {/* LAYOUT: Card + Buttons */}
        <motion.div style={{ display: "flex", gap: 40, alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap", y: layoutY, opacity: layoutOpacity, willChange: "transform, opacity" }}>
          <PlayerCard visible={visible} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: "0 0 340px" }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#334155", letterSpacing: "1.5px", marginBottom: 16 }}
            >SELECT CHANNEL TO CONNECT</motion.p>
            <ContactButtons visible={visible} />
            {/* Availability chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}
            >
              {["Full-time","Hybrid","Internship","Contract","Remote"].map(c => (
                <span key={c} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 600, color: "#334155", border: "1px solid rgba(255,255,255,0.06)", padding: "4px 12px", borderRadius: 100 }}>{c}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          style={{ textAlign: "center", marginTop: 52, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#1E293B" }}
        >
          <span style={{ color: "#334155" }}>{t.built} </span>
          <span style={{ color: "#3B82F6", fontWeight: 700 }}>React</span>
          <span style={{ color: "#334155" }}> + Vite | {t.by} | 2026</span>
        </motion.div>
      </motion.div>

      <style>{`@keyframes cardPulse{0%,100%{box-shadow:0 0 6px #10B981}50%{box-shadow:0 0 16px #10B981,0 0 28px rgba(16,185,129,0.4)}}`}</style>
    </section>
  );
};

export default Contact;
