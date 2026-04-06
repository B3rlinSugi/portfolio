import { useState, useContext, useRef, useEffect } from "react";
import { LangContext } from "../LangContext";
import { i18n } from "../i18n";
import { data } from "../data/portfolioData";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const YEAR_COLORS = {
  "2022": { a: "#3B82F6", b: "#1D4ED8" },
  "2023": { a: "#06B6D4", b: "#0891B2" },
  "2024": { a: "#8B5CF6", b: "#7C3AED" },
  "2025": { a: "#10B981", b: "#059669" },
};
const DEFAULT_COLOR = { a: "#3B82F6", b: "#1D4ED8" };

const DATA_SHARDS = [
  { id: "d1", fromX: -620, fromY: -116, toX: -292, toY: 236, width: 176, color: "#3B82F6", delay: 0.02, duration: 0.9, rotate: 22 },
  { id: "d2", fromX: -512, fromY: -96, toX: -232, toY: 252, width: 162, color: "#06B6D4", delay: 0.06, duration: 0.86, rotate: 19 },
  { id: "d3", fromX: -398, fromY: -110, toX: -164, toY: 236, width: 152, color: "#38BDF8", delay: 0.11, duration: 0.82, rotate: 16 },
  { id: "d4", fromX: -260, fromY: -104, toX: -84, toY: 248, width: 144, color: "#22D3EE", delay: 0.16, duration: 0.78, rotate: 13 },
  { id: "d5", fromX: -102, fromY: -114, toX: -16, toY: 258, width: 138, color: "#8B5CF6", delay: 0.2, duration: 0.75, rotate: 10 },
  { id: "d6", fromX: 82, fromY: -106, toX: 66, toY: 244, width: 144, color: "#10B981", delay: 0.15, duration: 0.8, rotate: 8 },
  { id: "d7", fromX: 238, fromY: -120, toX: 134, toY: 258, width: 154, color: "#22D3EE", delay: 0.19, duration: 0.84, rotate: 6 },
  { id: "d8", fromX: 392, fromY: -112, toX: 206, toY: 238, width: 168, color: "#3B82F6", delay: 0.23, duration: 0.88, rotate: 4 },
  { id: "d9", fromX: 554, fromY: -130, toX: 276, toY: 252, width: 182, color: "#06B6D4", delay: 0.27, duration: 0.92, rotate: 2 },
];

const FORGE_SPARKS = [
  { id: "f1", x: -210, y: 252, delay: 0.48, color: "#3B82F6" },
  { id: "f2", x: -128, y: 266, delay: 0.54, color: "#06B6D4" },
  { id: "f3", x: -42, y: 258, delay: 0.6, color: "#38BDF8" },
  { id: "f4", x: 46, y: 268, delay: 0.64, color: "#8B5CF6" },
  { id: "f5", x: 132, y: 258, delay: 0.69, color: "#10B981" },
  { id: "f6", x: 216, y: 246, delay: 0.74, color: "#22D3EE" },
];

// ─── VAULT CARD ───────────────────────────────────────────────────────────────
const VaultCard = ({ cert, index, visible, dimmed }) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const { a, b } = YEAR_COLORS[cert.year] || DEFAULT_COLOR;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -9, y: dx * 9 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 34, scale: 0.82, rotateX: -14 }}
      animate={{
        opacity: visible ? (dimmed ? 0.18 : 1) : 0,
        y: visible ? 0 : 34,
        scale: visible ? (dimmed ? 0.95 : [0.82, 1.06, 1]) : 0.82,
        rotateX: visible ? (dimmed ? -4 : [-14, 4, 0]) : -14,
        filter: dimmed ? "blur(1.5px) grayscale(0.4)" : "blur(0px) grayscale(0)",
      }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: visible ? index * 0.07 : 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: "default",
        perspective: 600,
        transform: hovered
          ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.04)`
          : "perspective(600px) rotateX(0) rotateY(0) translateY(0) scale(1)",
        transition: hovered ? "transform 0.1s ease" : "transform 0.45s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div style={{
        position: "relative", borderRadius: 18, overflow: "hidden",
        background: hovered ? "rgba(10,20,42,0.98)" : "rgba(5,10,22,0.72)",
        border: `1px solid ${hovered ? a + "50" : "rgba(255,255,255,0.07)"}`,
        padding: "28px 20px 24px",
        boxShadow: hovered
          ? `0 28px 56px rgba(0,0,0,0.65), 0 0 0 1px ${a}20, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.3s",
      }}>
        {/* Top gradient bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(to right, ${a}, ${b})`,
          opacity: hovered ? 1 : 0.35, transition: "opacity 0.3s",
        }} />

        {/* Ambient glow behind icon */}
        {hovered && (
          <div style={{
            position: "absolute", top: "28%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 90, height: 90, borderRadius: "50%",
            background: `radial-gradient(circle, ${a}28 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
        )}

        {/* Year badge */}
        <div style={{
          position: "absolute", top: 13, right: 13,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700,
          color: a, background: `${a}12`, border: `1px solid ${a}28`,
          padding: "3px 8px", borderRadius: 6,
        }}>{cert.year}</div>

        {/* Icon */}
        <div style={{
          width: 68, height: 68, borderRadius: 18, margin: "0 auto 18px",
          background: hovered ? `${a}15` : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? a + "40" : "rgba(255,255,255,0.07)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s",
          boxShadow: hovered ? `0 8px 24px ${a}30` : "none",
        }}>
          <img src={cert.icon} alt={cert.name} loading="lazy" decoding="async"
            style={{ width: 38, height: 38, objectFit: "contain" }}
            onError={e => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Name */}
        <div style={{
          fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 700,
          color: hovered ? "#F8FAFC" : "#94A3B8",
          textAlign: "center", lineHeight: 1.45, marginBottom: 8,
          transition: "color 0.2s",
        }}>{cert.name}</div>

        {/* Issuer */}
        <div style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
          color: hovered ? a : "#475569",
          textAlign: "center", transition: "color 0.3s",
        }}>{cert.issuer}</div>

        {/* Verified badge */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          marginTop: 16,
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", animation: "vPulse 2s infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#10B981", letterSpacing: "1.5px" }}>VERIFIED</span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── YEAR FILTER TAB ─────────────────────────────────────────────────────────
const YearTab = ({ year, count, isActive, onClick }) => {
  const { a } = YEAR_COLORS[year] || DEFAULT_COLOR;
  return (
    <button onClick={onClick} style={{
      position: "relative", padding: "8px 20px", borderRadius: 10,
      border: "none", cursor: "pointer",
      background: isActive ? `${a}15` : "rgba(255,255,255,0.03)",
      outline: `1px solid ${isActive ? a + "45" : "rgba(255,255,255,0.06)"}`,
      transition: "all 0.25s",
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700,
        color: isActive ? a : "#475569", transition: "color 0.25s",
      }}>{year}</span>
      <span style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
        color: isActive ? `${a}90` : "#334155", marginLeft: 6,
      }}>({count})</span>
      {isActive && (
        <div style={{
          position: "absolute", bottom: 0, left: "20%", right: "20%",
          height: 2, background: `linear-gradient(to right,${a},${a}60)`,
          borderRadius: 2, boxShadow: `0 0 6px ${a}`,
        }} />
      )}
    </button>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Certifications = () => {
  const [activeYear, setActiveYear] = useState("ALL");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const lang = useContext(LangContext);
  const t = i18n[lang].certifications;
  const certs = data.certifications || [];
  const years = [...new Set(certs.map(c => c.year))].sort();
  const { scrollYProgress: forgeProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.34"],
  });

  const forgeSpring = { stiffness: 110, damping: 22, mass: 0.54 };
  const rawSectionY = useTransform(forgeProgress, [0, 1], [96, 0]);
  const rawSectionOpacity = useTransform(forgeProgress, [0, 0.38, 1], [0, 0.82, 1]);
  const rawSectionScale = useTransform(forgeProgress, [0, 1], [0.96, 1]);
  const rawOverlayOpacity = useTransform(forgeProgress, [0, 0.25, 0.65, 1], [1, 0.9, 0.2, 0]);
  const rawOverlayY = useTransform(forgeProgress, [0, 1], [-26, 0]);
  const rawOverlayScale = useTransform(forgeProgress, [0, 0.4, 1], [1.08, 1.02, 1]);
  const rawCoreOpacity = useTransform(forgeProgress, [0, 0.2, 0.72], [0.96, 0.72, 0]);
  const rawCoreScale = useTransform(forgeProgress, [0, 0.34, 1], [0.5, 1.22, 1.72]);
  const rawHeaderY = useTransform(forgeProgress, [0, 1], [44, 0]);
  const rawHeaderOpacity = useTransform(forgeProgress, [0, 0.46, 1], [0, 0.9, 1]);
  const rawTabsY = useTransform(forgeProgress, [0, 1], [28, 0]);
  const rawTabsOpacity = useTransform(forgeProgress, [0, 0.44, 1], [0, 0.88, 1]);
  const rawGridY = useTransform(forgeProgress, [0, 1], [40, 0]);
  const rawGridOpacity = useTransform(forgeProgress, [0, 0.44, 1], [0, 0.9, 1]);

  const sectionY = useSpring(rawSectionY, forgeSpring);
  const sectionOpacity = useSpring(rawSectionOpacity, forgeSpring);
  const sectionScale = useSpring(rawSectionScale, forgeSpring);
  const overlayOpacity = useSpring(rawOverlayOpacity, forgeSpring);
  const overlayY = useSpring(rawOverlayY, forgeSpring);
  const overlayScale = useSpring(rawOverlayScale, forgeSpring);
  const coreOpacity = useSpring(rawCoreOpacity, forgeSpring);
  const coreScale = useSpring(rawCoreScale, forgeSpring);
  const headerY = useSpring(rawHeaderY, forgeSpring);
  const headerOpacity = useSpring(rawHeaderOpacity, forgeSpring);
  const tabsY = useSpring(rawTabsY, forgeSpring);
  const tabsOpacity = useSpring(rawTabsOpacity, forgeSpring);
  const gridY = useSpring(rawGridY, forgeSpring);
  const gridOpacity = useSpring(rawGridOpacity, forgeSpring);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const countByYear = years.reduce((acc, y) => {
    acc[y] = certs.filter(c => c.year === y).length;
    return acc;
  }, {});

  const showing = activeYear === "ALL" ? certs.length : countByYear[activeYear] || 0;

  return (
    <section
      id="certifications"
      ref={ref}
      style={{
        background: "#020617", padding: "100px 0",
        borderTop: "1px solid rgba(59,130,246,0.07)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* bg grid */}
      <div style={{
        position: "absolute", inset: 0, backgroundSize: "40px 40px",
        backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.015) 1px,transparent 1px)",
        pointerEvents: "none",
      }} />

      <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, opacity: overlayOpacity, y: overlayY, scale: overlayScale, overflow: "hidden" }}>
        <motion.div style={{ position: "absolute", left: "50%", top: -56, marginLeft: -250, width: 500, height: 500, opacity: coreOpacity, scale: coreScale, background: "radial-gradient(circle, rgba(56,189,248,0.44) 0%, rgba(14,165,233,0.2) 36%, rgba(2,6,23,0.06) 72%, transparent 88%)", filter: "blur(34px)" }} />
        <div style={{ position: "absolute", left: "50%", top: -36, transform: "translateX(-50%)", width: "min(1080px, calc(100% - 24px))", height: 430, background: "radial-gradient(ellipse at center, rgba(56,189,248,0.32) 0%, rgba(99,102,241,0.14) 34%, rgba(2,6,23,0) 78%)" }} />

        {DATA_SHARDS.map((shard) => (
          <motion.div
            key={shard.id}
            initial={{ opacity: 0, x: shard.fromX, y: shard.fromY, rotate: shard.rotate - 22, scale: 0.5 }}
            animate={visible ? { opacity: [0, 1, 0], x: [shard.fromX, shard.toX], y: [shard.fromY, shard.toY], rotate: [shard.rotate - 22, shard.rotate], scale: [0.5, 1.18, 0.7] } : { opacity: 0 }}
            transition={{ duration: shard.duration, delay: shard.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: "50%", top: -30, width: shard.width, height: 2, transformOrigin: "0% 50%" }}
          >
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: `linear-gradient(to right, ${shard.color}, rgba(56,189,248,0))`, boxShadow: `0 0 16px ${shard.color}, 0 0 26px ${shard.color}66` }} />
            <div style={{ position: "absolute", right: -2, top: "50%", width: 7, height: 7, borderRadius: "50%", transform: "translateY(-50%)", background: shard.color, boxShadow: `0 0 14px ${shard.color}` }} />
          </motion.div>
        ))}

        {FORGE_SPARKS.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={visible ? { opacity: [0, 1, 0], scale: [0.2, 1.24, 2.4] } : { opacity: 0 }}
            transition={{ duration: 0.58, delay: spark.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", left: "50%", top: 0, x: spark.x, y: spark.y, width: 16, height: 16, borderRadius: "50%", border: `2px solid ${spark.color}`, boxShadow: `0 0 12px ${spark.color}` }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={visible ? { opacity: [0, 1, 0.24, 0], scale: [0.7, 1.08, 1.3, 1.5], rotate: [0, 24, 42] } : { opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", left: "50%", top: 164, width: 240, height: 240, marginLeft: -120, borderRadius: "50%", border: "1px solid rgba(56,189,248,0.4)", boxShadow: "0 0 32px rgba(56,189,248,0.3)" }}
        />
      </motion.div>

      <motion.div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 3, y: sectionY, opacity: sectionOpacity, scale: sectionScale, transformOrigin: "center top", willChange: "transform, opacity" }}>

        {/* Header — centered, matching About/Skills style */}
        <motion.div style={{ textAlign: "center", marginBottom: 40, y: headerY, opacity: headerOpacity, transformOrigin: "center top", willChange: "transform, opacity" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#3B82F6", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, margin: "0 0 8px" }}>05. {t.label.toUpperCase()}</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 32, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.5px", margin: "8px 0 8px" }}>{t.title}.</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#64748B", margin: 0 }}>{showing} credentials unlocked | badge forge online</p>
        </motion.div>

        {/* Year filter tabs */}
        <motion.div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap", alignItems: "center", y: tabsY, opacity: tabsOpacity, willChange: "transform, opacity" }}>
          {/* ALL tab */}
          <button
            onClick={() => setActiveYear("ALL")}
            style={{
              padding: "8px 20px", borderRadius: 10, border: "none", cursor: "pointer",
              background: activeYear === "ALL" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
              outline: `1px solid ${activeYear === "ALL" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"}`,
              transition: "all 0.25s", position: "relative",
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, color: activeYear === "ALL" ? "#F8FAFC" : "#475569" }}>ALL</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: activeYear === "ALL" ? "#94A3B8" : "#334155", marginLeft: 6 }}>({certs.length})</span>
            {activeYear === "ALL" && (
              <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
            )}
          </button>

          {years.map(y => (
            <YearTab
              key={y} year={y}
              count={countByYear[y]}
              isActive={activeYear === y}
              onClick={() => setActiveYear(activeYear === y ? "ALL" : y)}
            />
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))",
          gap: 16,
          y: gridY,
          opacity: gridOpacity,
          willChange: "transform, opacity",
        }}>
          {certs.map((cert, i) => (
            <VaultCard
              key={cert.name}
              cert={cert}
              index={i}
              visible={visible}
              dimmed={activeYear !== "ALL" && cert.year !== activeYear}
            />
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div style={{
          textAlign: "center", marginTop: 40,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#1E293B",
          opacity: visible ? 1 : 0,
        }}>
          -- {certs.length} {t.total} --
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes vPulse {
          0%,100%{transform:scale(1);opacity:0.9}
          50%{transform:scale(2.2);opacity:0}
        }
      `}</style>
    </section>
  );
};

export default Certifications;
