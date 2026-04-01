import { useEffect, useState } from "react";
import { data } from "../data/portfolioData";

const accents = [
  { a: "#3B82F6", b: "#06B6D4" },
  { a: "#8B5CF6", b: "#3B82F6" },
  { a: "#06B6D4", b: "#10B981" },
  { a: "#F59E0B", b: "#EF4444" },
];

const CSRBlock = ({ point, index, a }) => {
  const rows = [
    { label: "Challenge", icon: "⚠", color: "#F59E0B", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.15)", text: point.challenge },
    { label: "Solution",  icon: "⚙", color: a,         bg: `${a}06`,               border: `${a}18`,                text: point.solution  },
    { label: "Result",    icon: "✓", color: "#10B981",  bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.15)", text: point.result    },
  ];

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Point number header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, background: `${a}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, color: a, fontFamily: "'JetBrains Mono',monospace" }}>{index + 1}</div>
        <div style={{ height: 1, flex: 1, background: `${a}15` }} />
      </div>

      {/* Challenge → Solution → Result rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingLeft: 4 }}>
        {rows.map(row => (
          <div key={row.label} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 14px", borderRadius: 9, background: row.bg, border: `1px solid ${row.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, paddingTop: 1 }}>
              <span style={{ fontSize: 11, color: row.color }}>{row.icon}</span>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: row.color, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px", textTransform: "uppercase", minWidth: 56 }}>{row.label}</span>
            </div>
            <div style={{ width: 1, background: `${row.color}25`, alignSelf: "stretch", flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#8BA4C8", lineHeight: 1.7, fontFamily: "'Outfit',sans-serif", margin: 0 }}>{row.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectDetailModal = () => {
  const [project, setProject] = useState(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const open = (title) => {
    const p = data.projects.find(p => p.title === title);
    if (!p) return;
    setProject(p);
    setVisible(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setProject(null);
      document.body.style.overflow = "";
    }, 280);
  };

  useEffect(() => {
    window.__openProject = open;
    return () => { delete window.__openProject; };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible || !project) return null;

  const idx = data.projects.findIndex(p => p.title === project.title);
  const { a, b } = accents[idx % accents.length];

  // Detect if points use new CSR format or legacy string format
  const isCSR = project.points.length > 0 && typeof project.points[0] === "object";

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 800,
        background: "rgba(4,10,22,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: closing ? "modalFadeOut 0.28s ease forwards" : "modalFadeIn 0.3s ease",
      }}
    >
      <div style={{
        width: "100%", maxWidth: 720,
        maxHeight: "90vh", overflowY: "auto",
        borderRadius: 20,
        background: "rgba(8,18,36,0.98)",
        border: `1px solid ${a}40`,
        boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${a}20`,
        animation: closing ? "modalSlideOut 0.28s cubic-bezier(.22,1,.36,1) forwards" : "modalSlideIn 0.35s cubic-bezier(.22,1,.36,1)",
      }}>
        {/* Gradient top bar */}
        <div style={{ height: 3, background: `linear-gradient(to right,${a},${b})`, flexShrink: 0, borderRadius: "20px 20px 0 0" }} />

        {/* Header */}
        <div style={{ padding: "24px 28px 0", position: "relative" }}>
          <button onClick={close}
            style={{ position: "absolute", top: 20, right: 20, width: 32, height: 32, borderRadius: "50%", background: "rgba(200,216,240,0.07)", border: "1px solid rgba(200,216,240,0.12)", color: "rgba(200,216,240,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,216,240,0.07)"; e.currentTarget.style.color = "rgba(200,216,240,0.5)"; e.currentTarget.style.borderColor = "rgba(200,216,240,0.12)"; }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: a, background: `${a}10`, border: `1px solid ${a}25`, padding: "3px 10px", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace" }}>{project.type}</span>
            <span style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", background: "rgba(15,31,56,0.8)", border: "1px solid rgba(59,130,246,0.1)", padding: "3px 10px", borderRadius: 6 }}>{project.period}</span>
          </div>

          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 800, color: "#F0F6FF", margin: "0 0 12px", letterSpacing: "-0.5px", paddingRight: 40 }}>{project.title}</h2>
          <p style={{ fontSize: 14, color: "#6B84A8", lineHeight: 1.8, fontFamily: "'Outfit',sans-serif", margin: "0 0 24px" }}>{project.desc}</p>
        </div>

        {/* Legend (only for CSR format) */}
        {isCSR && (
          <div style={{ padding: "0 28px 16px" }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { icon: "⚠", label: "Challenge", color: "#F59E0B" },
                { icon: "⚙", label: "Solution",  color: a },
                { icon: "✓", label: "Result",    color: "#10B981" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, color: item.color, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Points — CSR or legacy */}
        <div style={{ padding: "0 28px 20px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>
            {isCSR ? "CHALLENGE → SOLUTION → RESULT" : "KEY ACHIEVEMENTS"}
          </div>

          {isCSR ? (
            project.points.map((pt, i) => (
              <CSRBlock key={i} point={pt} index={i} a={a} />
            ))
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {project.points.map((pt, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderRadius: 10, background: `${a}06`, border: `1px solid ${a}12` }}>
                  <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, background: `${a}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, color: a, fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>{i + 1}</div>
                  <p style={{ fontSize: 13.5, color: "#8BA4C8", lineHeight: 1.75, fontFamily: "'Outfit',sans-serif", margin: 0 }}>{pt}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech Stack */}
        <div style={{ padding: "0 28px 20px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>TECH STACK</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tech.map(t => (
              <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(6,14,30,0.7)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 9, padding: "7px 14px" }}>
                <img src={t.icon} alt={t.name} style={{ width: 20, height: 20, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
                <span style={{ fontSize: 12, color: "var(--white-2)", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px 28px", borderTop: `1px solid ${a}15`, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href={project.github} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", flex: 1, minWidth: 140, alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: `${a}18`, border: `1px solid ${a}40`, color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${a}28`; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${a}18`; e.currentTarget.style.transform = "none"; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            View on GitHub
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", flex: 1, minWidth: 140, alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 24px", borderRadius: 10, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06B6D4", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.18)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,182,212,0.1)"; e.currentTarget.style.transform = "none"; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
          <button onClick={close}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px 20px", borderRadius: 10, background: "rgba(200,216,240,0.05)", border: "1px solid rgba(200,216,240,0.12)", color: "rgba(200,216,240,0.5)", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit',sans-serif", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,216,240,0.1)"; e.currentTarget.style.color = "#C8D8F0"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,216,240,0.05)"; e.currentTarget.style.color = "rgba(200,216,240,0.5)"; }}>
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn  { from{opacity:0}  to{opacity:1} }
        @keyframes modalFadeOut { from{opacity:1}  to{opacity:0} }
        @keyframes modalSlideIn { from{opacity:0;transform:translateY(20px) scale(0.96)} to{opacity:1;transform:none} }
        @keyframes modalSlideOut{ from{opacity:1;transform:none} to{opacity:0;transform:translateY(16px) scale(0.97)} }
      `}</style>
    </div>
  );
};

export default ProjectDetailModal;
