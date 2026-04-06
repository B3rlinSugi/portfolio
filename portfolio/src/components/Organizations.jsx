import { useEffect, useRef, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { data } from "../data/portfolioData";
import { LangContext } from "../LangContext";
import { i18n } from "../i18n";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

const ACCENTS = ["#3B82F6", "#06B6D4", "#8B5CF6"];
const GATE_SWEEP = ["#3B82F6", "#06B6D4", "#8B5CF6", "#10B981"];

// Slight rotation per polaroid — feels natural like scattered photos
const ROTATIONS = [-5, 1.5, -2.5];
const LIFTS    = [-8, -12, -6]; // vertical drift on hover

// ─── EXPANDED DETAIL OVERLAY ──────────────────────────────────────────────────
const DetailOverlay = ({ org, ac, onClose }) => createPortal(
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}
  >
    <motion.div
      initial={{ scale: 0.75, rotate: ROTATIONS[0], opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0.75, rotate: ROTATIONS[0], opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onClick={e => e.stopPropagation()}
      style={{
        background: "#F5F0E8",
        borderRadius: 4,
        padding: "20px 20px 28px",
        maxWidth: 560, width: "100%",
        boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.15)",
      }}
    >
      {/* Photo */}
      <div style={{ borderRadius: 2, overflow: "hidden", marginBottom: 20, height: 260, background: "#000" }}>
        <img src={org.photo} alt={org.role} loading="lazy" decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            const fallback = org.photoFallback || org.photo;
            if (e.currentTarget.dataset.fallbackApplied !== "1" && fallback !== org.photo) {
              e.currentTarget.dataset.fallbackApplied = "1";
              e.currentTarget.src = fallback;
              return;
            }
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Period */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: ac, letterSpacing: "1px", marginBottom: 6 }}>{org.period}</div>

      {/* Role in handwriting font */}
      <div style={{ fontFamily: "'Caveat',cursive", fontSize: 26, fontWeight: 700, color: "#1E293B", lineHeight: 1.2, marginBottom: 6 }}>{org.role}</div>

      {/* Org */}
      <div style={{ fontFamily: "'Caveat',cursive", fontSize: 16, color: "#64748B", marginBottom: 16 }}>{org.org}</div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(0,0,0,0.08)", marginBottom: 16 }} />

      {/* Description */}
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#475569", lineHeight: 1.75, marginBottom: 18 }}>{org.desc}</p>

      {/* Highlights */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {org.highlights.map(h => (
          <span key={h} style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 600,
            color: ac, background: `${ac}15`, border: `1px solid ${ac}30`,
            padding: "4px 10px", borderRadius: 100,
          }}>{h}</span>
        ))}
      </div>

      {/* Close hint */}
      <div style={{ textAlign: "center", marginTop: 20, fontFamily: "'Caveat',cursive", fontSize: 14, color: "#94A3B8" }}>
        click anywhere to close
      </div>
    </motion.div>
  </motion.div>,
  document.body
);

// ─── SINGLE POLAROID ──────────────────────────────────────────────────────────
const Polaroid = ({ org, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ac = ACCENTS[index % ACCENTS.length];
  const baseRotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: baseRotation }}
        animate={visible
          ? { opacity: 1, y: 0, rotate: hovered ? 0 : baseRotation }
          : { opacity: 0, y: 40 }}
        transition={{
          opacity: { duration: 0.5, delay: index * 0.15 },
          y:       { duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] },
          rotate:  { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(true)}
        style={{ cursor: "pointer", zIndex: hovered ? 10 : index + 1, position: "relative" }}
        whileHover={{ y: LIFTS[index % LIFTS.length], scale: 1.04 }}
      >
        {/* Polaroid frame */}
        <div style={{
          background: "#F5F0E8",
          borderRadius: 3,
          padding: "14px 14px 52px",
          boxShadow: hovered
            ? `0 32px 60px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.15)`
            : `0 16px 40px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.2)`,
          transition: "box-shadow 0.35s",
          position: "relative",
        }}>
          {/* Tape at top */}
          <div style={{
            position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
            width: 60, height: 22, borderRadius: 2,
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.6)",
            opacity: 0.8,
          }} />

          {/* Photo area */}
          <div style={{ borderRadius: 1, overflow: "hidden", height: 240, background: "#1E293B", position: "relative" }}>
            <img src={org.photo} alt={org.role} loading="lazy" decoding="async"
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.7s cubic-bezier(.22,1,.36,1)",
              }}
              onError={(e) => {
                const fallback = org.photoFallback || org.photo;
                if (e.currentTarget.dataset.fallbackApplied !== "1" && fallback !== org.photo) {
                  e.currentTarget.dataset.fallbackApplied = "1";
                  e.currentTarget.src = fallback;
                  return;
                }
                e.currentTarget.style.display = "none";
              }}
            />
            {/* Color wash on hover */}
            <div style={{
              position: "absolute", inset: 0,
              background: `${ac}15`,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s",
              pointerEvents: "none",
            }} />
          </div>

          {/* Handwritten label */}
          <div style={{ padding: "10px 4px 0", textAlign: "center" }}>
            <div style={{
              fontFamily: "'Caveat',cursive",
              fontSize: 19, fontWeight: 700,
              color: "#1E293B", lineHeight: 1.2,
              marginBottom: 2,
            }}>{org.role}</div>
            <div style={{
              fontFamily: "'Caveat',cursive",
              fontSize: 14, color: "#94A3B8",
            }}>{org.period}</div>
          </div>

          {/* "Tap to view" hint */}
          <div style={{
            position: "absolute", bottom: 8, right: 10,
            fontFamily: "'Caveat',cursive", fontSize: 11, color: "#94A3B8",
            opacity: hovered ? 1 : 0, transition: "opacity 0.25s",
          }}>↗ tap to view</div>
        </div>

        {/* Accent dot below */}
        <div style={{
          position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)",
          width: 6, height: 6, borderRadius: "50%",
          background: ac, opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s",
          boxShadow: `0 0 8px ${ac}`,
        }} />
      </motion.div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <DetailOverlay org={org} ac={ac} onClose={() => setExpanded(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Organizations = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const lang = useContext(LangContext);
  const t = i18n[lang].organizations;
  const { scrollYProgress: gateProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.34"],
  });

  const gateSpring = { stiffness: 118, damping: 24, mass: 0.52 };
  const rawSectionY = useTransform(gateProgress, [0, 1], [84, 0]);
  const rawSectionOpacity = useTransform(gateProgress, [0, 0.38, 1], [0, 0.82, 1]);
  const rawSectionScale = useTransform(gateProgress, [0, 1], [0.964, 1]);
  const rawHeaderY = useTransform(gateProgress, [0, 1], [40, 0]);
  const rawHeaderOpacity = useTransform(gateProgress, [0, 0.44, 1], [0, 0.9, 1]);
  const rawGalleryY = useTransform(gateProgress, [0, 1], [48, 0]);
  const rawGalleryOpacity = useTransform(gateProgress, [0, 0.46, 1], [0, 0.92, 1]);
  const rawGateOpacity = useTransform(gateProgress, [0, 0.28, 0.66, 1], [1, 0.92, 0.22, 0]);
  const rawGateLeftX = useTransform(gateProgress, [0, 1], [0, -260]);
  const rawGateRightX = useTransform(gateProgress, [0, 1], [0, 260]);
  const rawGateLightOpacity = useTransform(gateProgress, [0, 0.2, 0.55, 1], [0.92, 0.72, 0.16, 0]);
  const rawGateCoreOpacity = useTransform(gateProgress, [0, 0.24, 0.7], [0.95, 0.52, 0]);
  const rawTimelineOpacity = useTransform(gateProgress, [0.12, 0.48, 1], [0, 0.88, 1]);
  const rawTimelineScaleX = useTransform(gateProgress, [0.14, 0.62, 1], [0.08, 1, 1]);
  const rawTimelineSweepX = useTransform(gateProgress, [0.18, 0.86], ["-16%", "116%"]);

  const sectionY = useSpring(rawSectionY, gateSpring);
  const sectionOpacity = useSpring(rawSectionOpacity, gateSpring);
  const sectionScale = useSpring(rawSectionScale, gateSpring);
  const headerY = useSpring(rawHeaderY, gateSpring);
  const headerOpacity = useSpring(rawHeaderOpacity, gateSpring);
  const galleryY = useSpring(rawGalleryY, gateSpring);
  const galleryOpacity = useSpring(rawGalleryOpacity, gateSpring);
  const gateOpacity = useSpring(rawGateOpacity, gateSpring);
  const gateLeftX = useSpring(rawGateLeftX, gateSpring);
  const gateRightX = useSpring(rawGateRightX, gateSpring);
  const gateLightOpacity = useSpring(rawGateLightOpacity, gateSpring);
  const gateCoreOpacity = useSpring(rawGateCoreOpacity, gateSpring);
  const timelineOpacity = useSpring(rawTimelineOpacity, gateSpring);
  const timelineScaleX = useSpring(rawTimelineScaleX, gateSpring);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="organizations"
      ref={ref}
      style={{
        background: "#020617",
        padding: "100px 0 120px",
        borderTop: "1px solid rgba(59,130,246,0.07)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Load Caveat font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap"
      />

      {/* bg grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundSize: "40px 40px",
        backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.015) 1px,transparent 1px)",
        pointerEvents: "none",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translateX(-50%)",
        width: 800, height: 500,
        background: "radial-gradient(ellipse,rgba(59,130,246,0.06) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, opacity: gateOpacity, overflow: "hidden" }}>
        <motion.div style={{ position: "absolute", inset: 0, opacity: gateLightOpacity, background: "linear-gradient(to bottom, rgba(56,189,248,0.32) 0%, rgba(59,130,246,0.08) 44%, transparent 82%)" }} />
        <motion.div style={{ position: "absolute", left: "50%", top: 0, x: gateLeftX, width: "50%", height: "100%", background: "linear-gradient(to right, rgba(15,23,42,0.96) 0%, rgba(2,6,23,0.82) 72%, rgba(2,6,23,0.2) 100%)", borderRight: "1px solid rgba(56,189,248,0.32)", boxShadow: "20px 0 50px rgba(2,6,23,0.56)" }} />
        <motion.div style={{ position: "absolute", right: "50%", top: 0, x: gateRightX, width: "50%", height: "100%", background: "linear-gradient(to left, rgba(15,23,42,0.96) 0%, rgba(2,6,23,0.82) 72%, rgba(2,6,23,0.2) 100%)", borderLeft: "1px solid rgba(56,189,248,0.32)", boxShadow: "-20px 0 50px rgba(2,6,23,0.56)" }} />
        <motion.div style={{ position: "absolute", left: "50%", top: "44%", marginLeft: -170, width: 340, height: 340, opacity: gateCoreOpacity, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.48) 0%, rgba(14,165,233,0.22) 34%, rgba(2,6,23,0.06) 72%, transparent 86%)", filter: "blur(36px)" }} />
      </motion.div>

      <motion.div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 3, y: sectionY, opacity: sectionOpacity, scale: sectionScale, transformOrigin: "center top", willChange: "transform, opacity" }}>

        {/* Header */}
        <motion.div style={{ textAlign: "center", marginBottom: 80, y: headerY, opacity: headerOpacity, transformOrigin: "center top", willChange: "transform, opacity" }}>
          <p style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
            color: "#3B82F6", letterSpacing: "2px", textTransform: "uppercase",
            fontWeight: 600, margin: "0 0 8px",
          }}>06. {t.label.toUpperCase()}</p>
          <h2 style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 32,
            fontWeight: 700, color: "#FFFFFF",
            letterSpacing: "-0.5px", margin: "8px 0 8px",
          }}>{t.title}.</h2>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: 13,
            color: "#64748B", margin: 0,
          }}>Vault gate opened | org timeline unlocked. Click a photo to explore.</p>
        </motion.div>

        {/* Polaroid gallery */}
        <motion.div style={{
          position: "relative",
          background: "rgba(0,0,0,0.25)",
          borderRadius: 28,
          padding: "60px 40px 80px",
          border: "1px solid rgba(255,255,255,0.04)",
          y: galleryY,
          opacity: galleryOpacity,
          willChange: "transform, opacity",
        }}>
          {/* Table texture line */}
          <div style={{ position: "absolute", top: 20, left: 40, right: 40, height: "1px", background: "rgba(255,255,255,0.03)" }} />

          {/* Org timeline rail */}
          <motion.div style={{ position: "relative", margin: "12px 0 36px", opacity: timelineOpacity, willChange: "transform, opacity" }}>
            <div style={{ position: "relative", height: 4, borderRadius: 999, background: "rgba(148,163,184,0.2)", overflow: "hidden" }}>
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  background: "linear-gradient(to right, rgba(59,130,246,0.95), rgba(6,182,212,0.95), rgba(139,92,246,0.95), rgba(16,185,129,0.95))",
                  scaleX: timelineScaleX,
                  transformOrigin: "left center",
                }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  top: -7,
                  left: rawTimelineSweepX,
                  width: 120,
                  height: 18,
                  borderRadius: 999,
                  background: "radial-gradient(ellipse at center, rgba(255,255,255,0.82) 0%, rgba(125,211,252,0.32) 42%, transparent 72%)",
                  filter: "blur(2px)",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, gap: 12, flexWrap: "wrap" }}>
              {data.organizations.map((org, i) => (
                <motion.div
                  key={`${org.role}-timeline`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.34, delay: 0.24 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: GATE_SWEEP[i % GATE_SWEEP.length], boxShadow: `0 0 10px ${GATE_SWEEP[i % GATE_SWEEP.length]}` }} />
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#64748B", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{org.period}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Polaroids grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            alignItems: "center",
            justifyItems: "center",
          }} className="polaroid-grid">
            {data.organizations.map((org, i) => (
              <Polaroid key={org.role} org={org} index={i} visible={visible} />
            ))}
          </div>

          {/* Bottom hint */}
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <span style={{
              fontFamily: "'Caveat',cursive", fontSize: 15,
              color: "#334155", letterSpacing: "0.5px",
            }}>* hover to lift | click to read more *</span>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');
        @media(max-width:768px){
          .polaroid-grid{ grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media(max-width:1024px) and (min-width:769px){
          .polaroid-grid{ grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Organizations;
