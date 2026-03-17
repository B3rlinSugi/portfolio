import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const accentColors = ["#3B82F6","#06B6D4","#8B5CF6","#10B981","#F59E0B","#EF4444"];

const CertCard = ({ cert, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const ac = accentColors[index % accentColors.length];

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 14, overflow: "hidden",
        background: hovered ? `linear-gradient(135deg,${ac}10,rgba(15,31,56,0.85))` : "rgba(15,31,56,0.65)",
        border: `1px solid ${hovered ? ac + "40" : "rgba(59,130,246,0.12)"}`,
        padding: "20px 18px",
        position: "relative",
        /* Flip reveal: start rotated, flip in */
        opacity: visible ? 1 : 0,
        transform: visible ? "rotateY(0deg) scale(1)" : "rotateY(-90deg) scale(0.9)",
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${index * 100}ms, background 0.25s, border-color 0.25s, box-shadow 0.25s`,
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.3),0 0 0 1px ${ac}20` : "0 4px 16px rgba(0,0,0,0.15)",
        cursor: "default",
        perspective: "600px",
        transformOrigin: "left center",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: hovered ? `linear-gradient(to right,${ac},${ac}80)` : "transparent", transition: "background 0.3s", borderRadius: "14px 14px 0 0" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, flexShrink: 0, background: hovered ? `${ac}18` : "rgba(15,31,56,0.9)", border: `1px solid ${hovered ? ac + "35" : "rgba(59,130,246,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", boxShadow: hovered ? `0 6px 16px ${ac}25` : "none" }}>
          <img src={cert.icon} alt={cert.name} style={{ width: 26, height: 26, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
          <span style={{ display: "none", fontSize: 13, color: ac, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{cert.name[0]}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: hovered ? "var(--white)" : "var(--white-2)", marginBottom: 3, lineHeight: 1.35, transition: "color 0.2s", fontFamily: "'Outfit',sans-serif" }}>{cert.name}</div>
          <div style={{ fontSize: 10.5, color: hovered ? ac : "var(--muted)", transition: "color 0.2s", fontFamily: "'JetBrains Mono',monospace" }}>{cert.issuer}</div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: hovered ? ac : "var(--muted-2)", background: hovered ? `${ac}12` : "rgba(15,31,56,0.8)", border: `1px solid ${hovered ? ac + "25" : "rgba(59,130,246,0.08)"}`, padding: "3px 8px", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", flexShrink: 0, transition: "all 0.2s" }}>{cert.year}</div>
      </div>
    </div>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const years = [...new Set(data.certifications.map(c => c.year))].sort();
  const [activeYear, setActiveYear] = useState(years[0]);
  const [tabVisible, setTabVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Re-trigger flip when tab changes
  const handleTabChange = (year) => {
    setTabVisible(false);
    setActiveYear(year);
    setTimeout(() => setTabVisible(true), 80);
  };

  useEffect(() => { if (visible) setTimeout(() => setTabVisible(true), 300); }, [visible]);

  const filtered = data.certifications.filter(c => c.year === activeYear);
  const yearColors = { [years[0]]: "#3B82F6", [years[1]]: "#06B6D4", [years[2]]: "#8B5CF6", [years[3]]: "#10B981" };

  return (
    <section id="certifications" ref={ref} style={{ background: "var(--navy)", borderTop: "1px solid rgba(59,130,246,0.07)" }}>
      <p className="s-label" style={{ opacity: visible ? 1 : 0, transition: "opacity .5s" }}>credentials</p>
      <h2 className="s-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>Training & Certifications</h2>

      {/* ── Year tabs ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap", opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
        {years.map(year => {
          const isActive = activeYear === year;
          const color = yearColors[year] || "#3B82F6";
          const count = data.certifications.filter(c => c.year === year).length;
          return (
            <button key={year} onClick={() => handleTabChange(year)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer",
                background: isActive ? `${color}18` : "rgba(15,31,56,0.5)",
                outline: `1px solid ${isActive ? color + "40" : "rgba(59,130,246,0.1)"}`,
                transform: isActive ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
                boxShadow: isActive ? `0 8px 24px rgba(0,0,0,0.2),0 0 0 1px ${color}20` : "none",
              }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: isActive ? `0 0 10px ${color}` : "none", transition: "box-shadow 0.3s" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: isActive ? "var(--white)" : "var(--white-2)", fontFamily: "'Outfit',sans-serif", transition: "color 0.2s" }}>{year}</span>
              <span style={{ fontSize: 10.5, color: isActive ? color : "var(--muted)", background: isActive ? `${color}15` : "rgba(15,31,56,0.6)", border: `1px solid ${isActive ? color + "25" : "rgba(59,130,246,0.08)"}`, padding: "1px 7px", borderRadius: 100, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, transition: "all 0.2s" }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── Cert cards for active year ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12 }}>
        {filtered.map((cert, i) => (
          <CertCard key={cert.name} cert={cert} index={i} visible={tabVisible} />
        ))}
      </div>

      {/* Count indicator */}
      <div style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", opacity: visible ? 0.6 : 0, transition: "opacity 0.5s ease 0.5s" }}>
        {filtered.length} certification{filtered.length !== 1 ? "s" : ""} in {activeYear}
      </div>
    </section>
  );
};

export default Certifications;
