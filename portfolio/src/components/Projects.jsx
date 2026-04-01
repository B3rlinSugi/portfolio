import { useEffect, useRef, useState, useContext } from "react";
import { LangContext } from "../LangContext";
import { i18n } from "../i18n";
import { data } from "../data/portfolioData";

const accents = [
  { a: "#3B82F6", b: "#06B6D4" },
  { a: "#8B5CF6", b: "#3B82F6" },
  { a: "#06B6D4", b: "#10B981" },
];

// Compact CSR row for the project card preview
const CSRPreviewRow = ({ point, index, a }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "10px 14px", borderRadius: 9, background: `${a}06`, border: `1px solid ${a}12` }}>
    {/* Point number + Challenge label */}
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, background: `${a}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: a, fontFamily: "'JetBrains Mono',monospace" }}>{index + 1}</span>
      <span style={{ fontSize: 9, fontWeight: 700, color: "#F59E0B", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.8px" }}>⚠ CHALLENGE</span>
    </div>
    <p style={{ fontSize: 12.5, color: "#8BA4C8", lineHeight: 1.6, fontFamily: "'Outfit',sans-serif", margin: "0 0 0 24px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
      {point.challenge}
    </p>
    {/* Solution teaser */}
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 24 }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: a, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.8px" }}>⚙ SOLUTION →</span>
      <span style={{ fontSize: 11.5, color: "rgba(139,164,200,0.6)", fontFamily: "'Outfit',sans-serif", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {point.solution}
      </span>
    </div>
  </div>
);

const Projects = () => {
  const ref = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [active, setActive]     = useState(0);
  const [revealed, setRevealed] = useState(false);
  const lang = useContext(LangContext);
  const t = i18n[lang].projects;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setVisible(e.isIntersecting); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRevealed(false);
    const timer = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => { if (visible) { setTimeout(() => setRevealed(true), 400); } }, [visible]);

  const p = data.projects[active];
  const { a, b } = accents[active % accents.length];

  // Detect CSR format
  const isCSR = p.points.length > 0 && typeof p.points[0] === "object";

  return (
    <section id="projects" ref={ref} style={{ background:"var(--navy-2)", borderTop:"1px solid rgba(59,130,246,0.07)" }}>
      <p className="s-label" style={{ opacity:visible?1:0, transition:"opacity .5s", fontFamily:"'JetBrains Mono',monospace" }}>
        <span style={{ color:"rgba(6,182,212,0.5)" }}>&lt;</span>
        {t.label}
        <span style={{ color:"rgba(6,182,212,0.5)" }}> /&gt;</span>
      </p>
      <h2 className="s-title" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(16px)", transition:"opacity .6s ease .1s,transform .6s ease .1s" }}>{t.title}</h2>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }} className="split-panel">

        {/* ── LEFT: project list ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-24px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(.22,1,.36,1) 0.2s" }}>
          {data.projects.map((proj, i) => {
            const { a: ac } = accents[i % accents.length];
            const isActive = active === i;
            return (
              <button key={proj.title} onClick={() => setActive(i)}
                style={{
                  display: "flex", flexDirection: "column", gap: 4, textAlign: "left",
                  padding: "16px 18px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: isActive ? `${ac}12` : "rgba(15,31,56,0.4)",
                  borderLeft: `3px solid ${isActive ? ac : "transparent"}`,
                  outline: `1px solid ${isActive ? ac + "30" : "rgba(59,130,246,0.08)"}`,
                  transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
                  transform: isActive ? "translateX(4px)" : "translateX(0)",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(59,130,246,0.06)"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "rgba(15,31,56,0.4)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: `linear-gradient(135deg,${ac},${accents[i % accents.length].b})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff", fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: isActive ? "var(--white)" : "var(--white-2)", fontFamily: "'Outfit',sans-serif", transition: "color 0.2s" }}>{proj.title}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: isActive ? ac : "var(--muted)", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, transition: "color 0.2s" }}>{proj.type}</span>
                  <span style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>{proj.period}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── RIGHT: active detail ── */}
        <div style={{
          borderRadius: 16, overflow: "hidden",
          background: "rgba(15,31,56,0.5)",
          border: `1px solid ${a}30`,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
          filter: revealed ? "blur(0px)" : "blur(6px)",
          transition: "opacity 0.45s cubic-bezier(.22,1,.36,1), transform 0.45s cubic-bezier(.22,1,.36,1), filter 0.45s ease",
          boxShadow: `0 24px 56px rgba(0,0,0,0.35), 0 0 0 1px ${a}15`,
        }}>
          <div style={{ height: 3, background: `linear-gradient(to right,${a},${b})` }} />

          <div style={{ padding: "24px 28px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: a, background: `${a}10`, border: `1px solid ${a}25`, padding: "3px 10px", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace" }}>{p.type}</span>
                </div>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, color: "var(--white)", margin: 0, letterSpacing: "-0.5px" }}>{p.title}</h3>
              </div>
              <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", background: "rgba(15,31,56,0.8)", border: "1px solid rgba(59,130,246,0.1)", padding: "4px 12px", borderRadius: 8, whiteSpace: "nowrap" }}>{p.period}</span>
            </div>

            <p style={{ fontSize: 14, color: "#6B84A8", marginBottom: 20, lineHeight: 1.8, fontFamily: "'Outfit',sans-serif" }}>{p.desc}</p>

            {/* Points — CSR compact preview or legacy */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
              {isCSR ? (
                p.points.map((pt, i) => (
                  <CSRPreviewRow key={i} point={pt} index={i} a={a} />
                ))
              ) : (
                p.points.map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 14px", borderRadius: 9, background: `${a}06`, border: `1px solid ${a}12` }}>
                    <span style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: `${a}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, color: a, fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>{i + 1}</span>
                    <p style={{ fontSize: 13, color: "#8BA4C8", lineHeight: 1.65, fontFamily: "'Outfit',sans-serif", margin: 0 }}>{pt}</p>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, paddingTop: 16, borderTop: `1px solid ${a}15` }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tech.map(t => (
                  <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(6,14,30,0.7)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 8, padding: "5px 11px" }}>
                    <img src={t.icon} alt={t.name}
                      style={{ width: 18, height: 18, objectFit: "contain", flexShrink: 0 }}
                      onError={e => { e.target.style.display = "none"; }}
                    />
                    <span style={{ fontSize: 10.5, color: "var(--white-2)", fontFamily: "'JetBrains Mono',monospace" }}>{t.name}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, background: `${a}10`, border: `1px solid ${a}30`, color: a, fontSize: 12.5, fontWeight: 600, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${a}22`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${a}10`; e.currentTarget.style.transform = "none"; }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Live Demo
                  </a>
                )}
                {p.postman && (
                  <a href={p.postman} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, background: `${a}10`, border: `1px solid ${a}30`, color: a, fontSize: 12.5, fontWeight: 600, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${a}22`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${a}10`; e.currentTarget.style.transform = "none"; }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    API Docs
                  </a>
                )}
                <button
                  onClick={() => window.__openProject?.(p.title)}
                  style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, background: `${a}10`, border: `1px solid ${a}30`, color: a, fontSize: 12.5, fontWeight: 600, fontFamily: "'Outfit',sans-serif", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${a}22`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${a}10`; e.currentTarget.style.transform = "none"; }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Full Details
                </button>
                <a href={p.github} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, background: `${a}18`, border: `1px solid ${a}40`, color: "var(--white)", fontSize: 12.5, fontWeight: 600, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${a}28`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${a}18`; }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:700px){.split-panel{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
};

export default Projects;
