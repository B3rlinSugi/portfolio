import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const ProjectCard = ({ p, index, visible }) => {
  const cardRef = useRef(null), rafRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = e => {
    const el = cardRef.current; if (!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      setTilt({ rx: (y - 0.5) * -8, ry: (x - 0.5) * 8, gx: Math.round(x * 100), gy: Math.round(y * 100) });
    });
  };
  const onLeave = () => { cancelAnimationFrame(rafRef.current); setHovered(false); setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }); };

  const accents = [{ a: "#3B82F6", b: "#06B6D4" }, { a: "#8B5CF6", b: "#3B82F6" }, { a: "#06B6D4", b: "#10B981" }];
  const { a, b } = accents[index % accents.length];

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${index * 150}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${index * 150}ms`,
      }}
    >
      <div style={{
        borderRadius: 16, overflow: "hidden",
        background: "rgba(15,31,56,0.5)",
        border: `1px solid ${hovered ? a + "40" : "rgba(59,130,246,0.1)"}`,
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.015) translateZ(6px)`
          : "perspective(900px) rotateX(0) rotateY(0) scale(1)",
        transition: hovered
          ? "transform 0.09s linear, box-shadow 0.2s, border-color 0.2s"
          : "transform 0.55s cubic-bezier(.22,1,.36,1), box-shadow 0.4s, border-color 0.3s",
        boxShadow: hovered
          ? `0 28px 56px rgba(0,0,0,0.4), 0 0 0 1px ${a}20, inset 0 1px 0 rgba(255,255,255,0.04)`
          : "0 4px 20px rgba(0,0,0,0.2)",
        willChange: "transform",
      }}>
        <div style={{ height: 3, background: `linear-gradient(to right,${a},${b})`, opacity: hovered ? 1 : 0.45, transition: "opacity 0.3s" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 16, pointerEvents: "none", zIndex: 0, background: hovered ? `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.05), transparent 55%)` : "transparent", transition: "background 0.1s" }} />

        <div style={{ padding: "22px 26px", position: "relative", zIndex: 1 }} className="proj-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${a},${b})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", fontFamily: "'JetBrains Mono',monospace", flexShrink: 0, boxShadow: `0 0 12px ${a}40` }}>{index + 1}</div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: a, background: `${a}10`, border: `1px solid ${a}25`, padding: "3px 10px", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace" }}>{p.type}</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", background: "rgba(15,31,56,0.8)", border: "1px solid rgba(59,130,246,0.1)", padding: "3px 10px", borderRadius: 6 }}>{p.period}</span>
          </div>

          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, color: "var(--white)", marginBottom: 6, lineHeight: 1.2, letterSpacing: "-0.4px" }}>{p.title}</h3>
          <p style={{ fontSize: 13.5, color: "#6B84A8", marginBottom: 16, lineHeight: 1.75, fontFamily: "'Outfit',sans-serif" }}>{p.desc}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
            {p.points.map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", borderRadius: 9, background: hovered ? `${a}06` : "rgba(6,14,30,0.4)", border: `1px solid ${hovered ? a + "15" : "rgba(59,130,246,0.07)"}`, transition: "all 0.2s" }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: `${a}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, color: a, fontFamily: "'JetBrains Mono',monospace", marginTop: 1 }}>{i + 1}</span>
                <p style={{ fontSize: 12.5, color: "#8BA4C8", lineHeight: 1.65, fontFamily: "'Outfit',sans-serif", margin: 0 }}>{pt}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, paddingTop: 14, borderTop: `1px solid ${a}15` }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {p.tech.map(t => (
                <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(6,14,30,0.6)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 7, padding: "4px 9px" }}>
                  <img src={t.icon} alt={t.name} style={{ width: 12, height: 12, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
                  <span style={{ fontSize: 10.5, color: "var(--white-2)", fontFamily: "'JetBrains Mono',monospace" }}>{t.name}</span>
                </div>
              ))}
            </div>
            <a href={p.github} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 8, background: hovered ? `${a}18` : "transparent", border: `1px solid ${hovered ? a + "45" : "rgba(59,130,246,0.2)"}`, color: hovered ? "var(--white)" : "var(--white-2)", fontSize: 12, fontWeight: 600, transition: "all 0.2s", textDecoration: "none", fontFamily: "'Outfit',sans-serif" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:560px){.proj-inner{padding:18px 16px !important;}}`}</style>
    </div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id="projects" ref={ref} style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(59,130,246,0.07)" }}>
      <p className="s-label" style={{ opacity: visible ? 1 : 0, transition: "opacity .5s" }}>projects</p>
      <h2 className="s-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>Projects I've built</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {data.projects.map((p, i) => <ProjectCard key={p.title} p={p} index={i} visible={visible} />)}
      </div>
    </section>
  );
};

export default Projects;
