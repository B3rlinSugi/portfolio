import { useState, useContext, useEffect, useCallback, useRef } from "react";
import { LangContext } from "../LangContext";
import { i18n } from "../i18n";
import { data } from "../data/portfolioData";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

const ACCENTS = [
  { a: "#3B82F6", b: "#06B6D4" },
  { a: "#8B5CF6", b: "#3B82F6" },
  { a: "#06B6D4", b: "#10B981" },
  { a: "#10B981", b: "#06B6D4" },
  { a: "#F59E0B", b: "#EF4444" },
];

const CLAIM_META = {
  "production-ready": {
    label: "Production Ready",
    chip: "PRODUCTION READY",
    color: "#10B981",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.35)",
    text: "#A7F3D0",
  },
  "portfolio-demo": {
    label: "Portfolio Demo",
    chip: "PORTFOLIO DEMO",
    color: "#22D3EE",
    bg: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.35)",
    text: "#CFFAFE",
  },
  "learning-project": {
    label: "Learning Project",
    chip: "LEARNING PROJECT",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.35)",
    text: "#FDE68A",
  },
};

const getProjectClaim = (project) => {
  const key = project?.claimLevel || "portfolio-demo";
  return CLAIM_META[key] || CLAIM_META["portfolio-demo"];
};

const normalizePoint = (point) => {
  if (typeof point === "string") {
    return {
      problem: "Backend challenge",
      action: point,
      result: "",
    };
  }

  if (!point || typeof point !== "object") {
    return {
      problem: "Backend challenge",
      action: "",
      result: "",
    };
  }

  return {
    problem: point.challenge || point.label || "Backend challenge",
    action: point.solution || point.detail || "",
    result: point.result || "",
  };
};

// ─── HIGHLIGHT BLOCK with spotlight ──────────────────────────────────────────
const HighlightBlock = ({ point, index, accent }) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const parsed = normalizePoint(point);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      style={{
        position: "relative", overflow: "hidden", padding: "14px 18px", borderRadius: 10,
        background: hovered ? `${accent}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? accent + "30" : "rgba(255,255,255,0.05)"}`,
        transition: "border 0.3s, background 0.3s", cursor: "default"
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", pointerEvents: "none", borderRadius: "50%",
          width: 260, height: 260,
          top: mousePos.y - 130, left: mousePos.x - 130,
          background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 10 }}>
        <div style={{ width: 20, height: 20, borderRadius: 6, background: `${accent}18`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: accent, fontFamily: "'JetBrains Mono',monospace", flexShrink: 0, marginTop: 2 }}>{index + 1}</div>
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: accent, letterSpacing: "0.6px", textTransform: "uppercase" }}>
              Problem
            </div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#E2E8F0", lineHeight: 1.6, margin: 0 }}>
              {parsed.problem}
            </p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: accent, letterSpacing: "0.6px", textTransform: "uppercase", marginTop: 2 }}>
              Action
            </div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
              {parsed.action || "Implemented backend logic and delivery flow for this case."}
            </p>
            {parsed.result && (
              <>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: accent, letterSpacing: "0.6px", textTransform: "uppercase", marginTop: 2 }}>
                  Result
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#A7F3D0", lineHeight: 1.6, margin: 0 }}>
                  {parsed.result}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── NAV BUTTON ───────────────────────────────────────────────────────────────
const NavBtn = ({ onClick, disabled, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44, borderRadius: "50%", border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        background: hovered && !disabled ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
        outline: `1px solid ${hovered && !disabled ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.06)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: disabled ? "#1E293B" : "#94A3B8",
        transition: "all 0.2s", flexShrink: 0
      }}
    >
      {children}
    </button>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
const buildProjectSignals = (project) => {
  const pointsText = (project.points || []).map((pt) => {
    if (typeof pt === "string") return pt;
    return [pt.label, pt.detail, pt.challenge, pt.solution, pt.result].filter(Boolean).join(" ");
  });
  const techText = (project.tech || []).map((tech) => tech.name || "");
  const haystack = [project.title, project.type, project.desc, ...pointsText, ...techText]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const hasAuth = /\bjwt\b|rbac|role[- ]based|auth|bcrypt|password/.test(haystack);
  const hasRelationalDb = /mysql|postgres|sql|relational|innodb|database/.test(haystack);
  const hasApiDocs = Boolean(project.postman || project.apiDocs || project.openApi);
  const hasCodeProof = Array.isArray(project.codeProofs) && project.codeProofs.some((item) => item?.url);
  const hasHealth = Boolean(project.healthCheck);
  const hasErrorControl =
    Boolean(project.metrics?.errorRate) ||
    hasHealth ||
    /\berror\b|exception|validation|monitor|sentry/.test(haystack);

  return [
    { label: "Auth", ok: hasAuth },
    { label: "Relational DB", ok: hasRelationalDb },
    { label: "API Docs", ok: hasApiDocs },
    { label: "Code Proof", ok: hasCodeProof },
    { label: "Health Check", ok: hasHealth },
    { label: "Error Control", ok: hasErrorControl },
  ];
};

const Projects = () => {
  const projectsRef = useRef(null);
  const [page, setPage] = useState(0);
  const lang = useContext(LangContext);
  const t = i18n[lang].projects;
  const projects = data.projects || [];
  const { scrollYProgress: morphProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "start 0.32"],
  });

  const goTo = useCallback((next) => {
    setPage(next);
  }, []);

  const prev = useCallback(() => { if (page > 0) goTo(page - 1); }, [page, goTo]);
  const next = useCallback(() => { if (page < projects.length - 1) goTo(page + 1); }, [page, projects.length, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const proj = projects[page];
  const { a, b } = ACCENTS[page % ACCENTS.length];
  const points = Array.isArray(proj?.points) ? proj.points : [];
  const parsedPoints = points.map((pt) => normalizePoint(pt));
  const leadPoint = parsedPoints[0] || null;
  const apiDocsUrl = proj?.apiDocs || proj?.postman || null;
  const openApiUrl = proj?.openApi || null;
  const healthUrl = proj?.healthCheck || null;
  const codeProofs = Array.isArray(proj?.codeProofs)
    ? proj.codeProofs.filter((item) => item?.label && item?.url)
    : [];
  const primaryCodeProof = codeProofs[0] || null;
  const backendSignals = proj ? buildProjectSignals(proj) : [];
  const claim = getProjectClaim(proj);

  if (!proj) return null;

  // Fade+blur transition — no position shift at all
  const variants = {
    enter: { opacity: 0, filter: "blur(8px)", scale: 0.98 },
    center: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(8px)", scale: 0.98 },
  };
  const tagVariants = {
    enter: { opacity: 0, y: 10, filter: "blur(4px)" },
    center: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.32,
        delay: 0.18 + i * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const morphSpring = { stiffness: 92, damping: 24, mass: 0.55 };
  const rawSectionY = useTransform(morphProgress, [0, 1], [40, 0]);
  const rawSectionOpacity = useTransform(morphProgress, [0, 0.4, 1], [0, 0.88, 1]);
  const rawSectionScale = useTransform(morphProgress, [0, 1], [0.992, 1]);
  const rawBlueprintOpacity = useTransform(morphProgress, [0, 0.65, 1], [0.55, 0.22, 0.04]);
  const rawBlueprintMarksOpacity = useTransform(morphProgress, [0, 0.72, 1], [0.55, 0.2, 0]);
  const rawBlueprintY = useTransform(morphProgress, [0, 1], [8, 0]);
  const blueprintGridSize = useTransform(morphProgress, [0, 1], ["32px 32px", "40px 40px"]);
  const rawHeaderY = useTransform(morphProgress, [0, 1], [24, 0]);
  const rawHeaderOpacity = useTransform(morphProgress, [0, 0.45, 1], [0, 0.9, 1]);
  const rawHeaderScale = useTransform(morphProgress, [0, 0.5, 1], [0.98, 1.01, 1]);
  const rawCardY = useTransform(morphProgress, [0, 1], [30, 0]);
  const rawCardOpacity = useTransform(morphProgress, [0, 0.46, 1], [0, 0.9, 1]);
  const rawCardRotateX = useTransform(morphProgress, [0, 1], [3.5, 0]);
  const rawCardScale = useTransform(morphProgress, [0, 0.58, 1], [0.98, 1.01, 1]);
  const cardShadow = useTransform(morphProgress, [0, 1], [
    "0 8px 18px rgba(0,0,0,0.2)",
    "0 24px 52px rgba(0,0,0,0.42)",
  ]);

  const sectionY = useSpring(rawSectionY, morphSpring);
  const sectionOpacity = useSpring(rawSectionOpacity, morphSpring);
  const sectionScale = useSpring(rawSectionScale, morphSpring);
  const blueprintOpacity = useSpring(rawBlueprintOpacity, morphSpring);
  const blueprintMarksOpacity = useSpring(rawBlueprintMarksOpacity, morphSpring);
  const blueprintY = useSpring(rawBlueprintY, morphSpring);
  const headerY = useSpring(rawHeaderY, morphSpring);
  const headerOpacity = useSpring(rawHeaderOpacity, morphSpring);
  const headerScale = useSpring(rawHeaderScale, morphSpring);
  const cardY = useSpring(rawCardY, morphSpring);
  const cardOpacity = useSpring(rawCardOpacity, morphSpring);
  const cardRotateX = useSpring(rawCardRotateX, morphSpring);
  const cardScale = useSpring(rawCardScale, morphSpring);

  return (
    <section id="projects" ref={projectsRef} style={{ background: "#020617", padding: "100px 0", borderTop: "1px solid rgba(59,130,246,0.07)", position: "relative", overflow: "hidden" }}>
      {/* Bg ambient glow — shifts color per slide */}
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: `radial-gradient(ellipse, ${a}07 0%, transparent 65%)`, pointerEvents: "none", transition: "background 0.8s ease" }} />
      {/* Bg grid */}
      <div style={{ position: "absolute", inset: 0, backgroundSize: "40px 40px", backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.015) 1px,transparent 1px)", pointerEvents: "none" }} />
      {/* Blueprint morph overlay (Skills -> Projects transition) */}
      <motion.div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 2, opacity: blueprintOpacity, y: blueprintY }}>
        <motion.div style={{
          position: "absolute",
          inset: 0,
          backgroundSize: blueprintGridSize,
          backgroundImage: "linear-gradient(to right, rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.12) 1px, transparent 1px)",
        }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 24%, rgba(56,189,248,0.12) 0%, transparent 58%)" }} />
        <motion.div style={{ position: "absolute", left: "50%", top: 78, width: "min(860px, calc(100% - 48px))", height: 220, transform: "translateX(-50%)", opacity: blueprintMarksOpacity }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(56,189,248,0.36) 14%, rgba(6,182,212,0.36) 50%, rgba(56,189,248,0.36) 86%, transparent)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(56,189,248,0.24) 18%, rgba(56,189,248,0.24) 82%, transparent)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(56,189,248,0.22) 12%, rgba(56,189,248,0.22) 88%, transparent)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(56,189,248,0.22) 12%, rgba(56,189,248,0.22) 88%, transparent)" }} />
          <div style={{ position: "absolute", top: -14, left: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "1.8px", color: "rgba(56,189,248,0.54)", textTransform: "uppercase" }}>Blueprint Morph</div>
          <div style={{ position: "absolute", top: -14, right: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "1.4px", color: "rgba(56,189,248,0.46)" }}>03 / PROJECTS</div>
        </motion.div>
      </motion.div>

      <motion.div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 3, y: sectionY, opacity: sectionOpacity, scale: sectionScale, transformOrigin: "center top", willChange: "transform, opacity" }}>

        {/* Header — centered, matching About/Skills style */}
        <motion.div style={{ textAlign: "center", marginBottom: 40, y: headerY, opacity: headerOpacity, scale: headerScale, transformOrigin: "center top", willChange: "transform, opacity" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#3B82F6", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, margin: "0 0 8px" }}>03. {t.label.toUpperCase()}</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 32, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.5px", margin: "8px 0 8px" }}>{t.title}.</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#64748B", margin: 0 }}>← → keyboard · {String(page + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
        </motion.div>

        {/* ── CARD SHELL — fixed height, no shift ── */}
        <div style={{ perspective: 1200 }}>
        <motion.div style={{
          background: "rgba(5,10,22,0.75)",
          border: `1px solid ${a}20`,
          borderRadius: 20, overflow: "hidden",
          transition: "border-color 0.6s ease",
          y: cardY,
          opacity: cardOpacity,
          rotateX: cardRotateX,
          scale: cardScale,
          boxShadow: cardShadow,
          transformOrigin: "center top",
          willChange: "transform, opacity, box-shadow",
        }}>
          {/* Top accent stripe */}
          <div style={{ height: 3, background: `linear-gradient(to right,${a},${b})`, transition: "background 0.6s ease" }} />

          {/* Content area — FIXED height, position:relative, overflow:hidden */}
          <motion.div style={{ position: "relative", overflow: "hidden", minHeight: 520 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={proj.title}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                /* ─── THIS IS THE KEY: absolute fill so layout never shifts ─── */
                style={{ position: "absolute", inset: 0, padding: "28px 36px", overflowY: "auto" }}
              >
                {/* FIXED 2-col grid inside the absolutely positioned container */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start", height: "100%" }} className="slide-cols">

                  {/* ── LEFT COLUMN ── */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, color: a, background: `${a}10`, border: `1px solid ${a}25`, padding: "3px 10px", borderRadius: 6 }}>{proj.type}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#475569" }}>{proj.period}</span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 9.5,
                          fontWeight: 700,
                          letterSpacing: "0.6px",
                          color: claim.text,
                          background: claim.bg,
                          border: `1px solid ${claim.border}`,
                          padding: "3px 10px",
                          borderRadius: 6,
                          textTransform: "uppercase",
                        }}
                      >
                        {claim.chip}
                      </span>
                    </div>

                    {/* Gradient title */}
                    <h2 style={{
                      fontFamily: "'Outfit',sans-serif", fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800,
                      background: `linear-gradient(135deg,#F8FAFC 0%,${a} 100%)`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      backgroundClip: "text", margin: "0 0 16px", letterSpacing: "-0.8px", lineHeight: 1.15
                    }}>{proj.title}</h2>

                    {/* Pull quote */}
                    <div style={{ borderLeft: `3px solid ${a}`, paddingLeft: 14, marginBottom: 18 }}>
                      <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, fontStyle: "italic", color: "#64748B", lineHeight: 1.7, margin: 0 }}>
                        "{leadPoint?.problem || "Building this shaped how I think about backend architecture."}"
                      </p>
                    </div>

                    {/* Description */}
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#64748B", lineHeight: 1.8, marginBottom: 20 }}>{proj.desc}</p>

                    {proj.claimNote && (
                      <div
                        style={{
                          marginBottom: 20,
                          padding: "10px 12px",
                          borderRadius: 10,
                          background: claim.bg,
                          border: `1px solid ${claim.border}`,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            fontSize: 9.5,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: claim.color,
                            marginBottom: 5,
                          }}
                        >
                          Claim Scope
                        </div>
                        <p style={{ margin: 0, fontFamily: "'Inter',sans-serif", fontSize: 12.5, color: "#CBD5E1", lineHeight: 1.6 }}>
                          {proj.claimNote}
                        </p>
                      </div>
                    )}

                    {/* Backend proof strip */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.04)" }} />
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#334155", letterSpacing: "2px" }}>BACKEND PROOF</span>
                        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.04)" }} />
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {backendSignals.map((signal) => (
                          <div
                            key={`${proj.title}-${signal.label}`}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 7,
                              padding: "6px 10px",
                              borderRadius: 8,
                              background: signal.ok ? "rgba(16,185,129,0.1)" : "rgba(100,116,139,0.1)",
                              border: signal.ok ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(100,116,139,0.3)",
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: signal.ok ? "#10B981" : "#64748B",
                              }}
                            />
                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: signal.ok ? "#A7F3D0" : "#94A3B8" }}>
                              {signal.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics 2x2 grid */}
                    {proj.metrics != null && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                        {proj.metrics.endpoints != null && (
                          <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "11px 14px" }}>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#475569", letterSpacing: "1px", marginBottom: 3 }}>ENDPOINTS</div>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 800, color: "#F8FAFC" }}>{proj.metrics.endpoints}</div>
                          </div>
                        )}
                        {proj.metrics.avgLatency != null && (
                          <div style={{ background: `${a}10`, border: `1px solid ${a}25`, borderRadius: 10, padding: "11px 14px" }}>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#475569", letterSpacing: "1px", marginBottom: 3 }}>LATENCY</div>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 800, color: a }}>{proj.metrics.avgLatency}</div>
                          </div>
                        )}
                        {proj.metrics.errorRate != null && (
                          <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, padding: "11px 14px" }}>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#475569", letterSpacing: "1px", marginBottom: 3 }}>ERROR RATE</div>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 800, color: "#10B981" }}>{proj.metrics.errorRate}</div>
                          </div>
                        )}
                        {proj.metrics.deployFrequency != null && (
                          <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "11px 14px" }}>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#475569", letterSpacing: "1px", marginBottom: 3 }}>DEPLOY</div>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#F8FAFC" }}>{proj.metrics.deployFrequency}</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {apiDocsUrl && <a href={apiDocsUrl} target="_blank" rel="noreferrer" style={{ padding: "8px 16px", borderRadius: 9, background: `${a}10`, border: `1px solid ${a}30`, color: a, fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>API Docs</a>}
                      {openApiUrl && <a href={openApiUrl} target="_blank" rel="noreferrer" style={{ padding: "8px 16px", borderRadius: 9, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#22D3EE", fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>OpenAPI</a>}
                      {primaryCodeProof && <a href={primaryCodeProof.url} target="_blank" rel="noreferrer" style={{ padding: "8px 16px", borderRadius: 9, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", color: "#C4B5FD", fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>Code Proof</a>}
                      {healthUrl && <a href={healthUrl} target="_blank" rel="noreferrer" style={{ padding: "8px 16px", borderRadius: 9, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34D399", fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>Health</a>}
                      {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" style={{ padding: "8px 16px", borderRadius: 9, background: `${a}10`, border: `1px solid ${a}30`, color: a, fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>Demo</a>}
                      <a href={proj.github} target="_blank" rel="noreferrer" style={{ padding: "8px 16px", borderRadius: 9, background: `${a}18`, border: `1px solid ${a}40`, color: "#F8FAFC", fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>GitHub</a>
                    </div>
                  </div>

                  {/* ── RIGHT COLUMN ── */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Engineering notes */}
                    {points.length > 0 && (
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.04)" }} />
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#334155", letterSpacing: "2px" }}>ENGINEERING NOTES</span>
                          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.04)" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {parsedPoints.map((pt, i) => <HighlightBlock key={i} point={pt} index={i} accent={a} />)}
                        </div>
                      </div>
                    )}

                    {codeProofs.length > 0 && (
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.04)" }} />
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#334155", letterSpacing: "2px" }}>DEEP CODE LINKS</span>
                          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.04)" }} />
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {codeProofs.map((item) => (
                            <a
                              key={`${proj.title}-${item.label}`}
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "6px 10px",
                                borderRadius: 8,
                                background: "rgba(139,92,246,0.1)",
                                border: "1px solid rgba(139,92,246,0.28)",
                                color: "#DDD6FE",
                                textDecoration: "none",
                                fontFamily: "'JetBrains Mono',monospace",
                                fontSize: 10.5,
                                fontWeight: 600,
                              }}
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech stack */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.04)" }} />
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#334155", letterSpacing: "2px" }}>BUILT WITH</span>
                        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.04)" }} />
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {(proj.tech || []).map((tech, i) => (
                          <motion.div key={`${proj.title}-${tech.name}`} custom={i} variants={tagVariants} initial="enter" animate="center" style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "6px 12px" }}>
                            <img src={tech.icon} alt={tech.name} loading="lazy" decoding="async" style={{ width: 16, height: 16, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>{tech.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Bottom nav bar ── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.25)" }}>
            <NavBtn onClick={prev} disabled={page === 0}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
            </NavBtn>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {projects.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{
                  width: i === page ? 28 : 7, height: 7, borderRadius: 4, border: "none", cursor: "pointer", padding: 0,
                  background: i === page ? a : "rgba(255,255,255,0.1)",
                  transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
                  boxShadow: i === page ? `0 0 8px ${a}80` : "none",
                }} />
              ))}
            </div>

            <NavBtn onClick={next} disabled={page === projects.length - 1}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
            </NavBtn>
          </div>
        </motion.div>
        </div>

        <p style={{ textAlign: "center", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#334155", marginTop: 14 }}>
          ★ Hover engineering notes to spotlight · Use ← → keys or buttons to navigate
        </p>
      </motion.div>

      <style>{`
        @media(max-width: 768px) {
          .slide-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Projects;


