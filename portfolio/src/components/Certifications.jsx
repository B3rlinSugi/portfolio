import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const accentColors = ["#3B82F6","#06B6D4","#8B5CF6","#10B981","#F59E0B","#EF4444"];

const CertCard = ({ cert, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const [swept, setSwept] = useState(false);
  const ac = accentColors[index % accentColors.length];

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSwept(true), index * 120 + 300);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 220, maxWidth: 260, flex: "0 0 220px",
        borderRadius: 14, overflow: "hidden",
        background: hovered ? `linear-gradient(135deg, ${ac}10, rgba(15,31,56,0.85))` : "rgba(15,31,56,0.65)",
        border: `1px solid ${hovered ? ac + "40" : "rgba(59,130,246,0.12)"}`,
        padding: "20px 18px",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
        transition: `opacity 0.55s ease ${index * 100}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${index * 100}ms, background 0.25s, border-color 0.25s, box-shadow 0.25s`,
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${ac}20` : "0 4px 16px rgba(0,0,0,0.15)",
        cursor: "default",
      }}
    >
      {/* Top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: hovered ? `linear-gradient(to right,${ac},${ac}80)` : "transparent", transition: "background 0.3s", borderRadius: "14px 14px 0 0" }} />

      {/* ── Glow sweep animation ── */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 14, pointerEvents: "none", zIndex: 3, overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, bottom: 0, width: "60%",
          background: `linear-gradient(to right, transparent, ${ac}25, transparent)`,
          transform: swept ? "translateX(300%)" : "translateX(-150%)",
          transition: swept ? `transform 0.8s cubic-bezier(.22,1,.36,1) ${index * 120}ms` : "none",
        }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: hovered ? `${ac}18` : "rgba(15,31,56,0.9)", border: `1px solid ${hovered ? ac + "35" : "rgba(59,130,246,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", boxShadow: hovered ? `0 6px 16px ${ac}25` : "none" }}>
          <img src={cert.icon} alt={cert.name} style={{ width: 24, height: 24, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
          <span style={{ display: "none", fontSize: 12, color: ac, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{cert.name[0]}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: hovered ? "var(--white)" : "var(--white-2)", marginBottom: 3, lineHeight: 1.35, transition: "color 0.2s", fontFamily: "'Outfit',sans-serif" }}>{cert.name}</div>
          <div style={{ fontSize: 10, color: hovered ? ac : "var(--muted)", transition: "color 0.2s", fontFamily: "'JetBrains Mono',monospace" }}>{cert.issuer}</div>
        </div>
      </div>

      {/* Year badge */}
      <div style={{ position: "absolute", top: 14, right: 14, fontSize: 11, fontWeight: 700, color: hovered ? ac : "var(--muted-2)", background: hovered ? `${ac}12` : "rgba(15,31,56,0.8)", border: `1px solid ${hovered ? ac + "25" : "rgba(59,130,246,0.08)"}`, padding: "2px 8px", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", transition: "all 0.2s", zIndex: 2 }}>{cert.year}</div>
    </div>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const updateScroll = () => {
    const el = scrollRef.current; if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    const el = scrollRef.current; if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  /* Group certs by year for timeline */
  const years = [...new Set(data.certifications.map(c => c.year))].sort();

  return (
    <section id="certifications" ref={ref} style={{ background: "var(--navy)", borderTop: "1px solid rgba(59,130,246,0.07)", overflow: "hidden" }}>
      <p className="s-label" style={{ opacity: visible ? 1 : 0, transition: "opacity .5s" }}>credentials</p>
      <h2 className="s-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>Training & Certifications</h2>

      {/* ── Timeline header ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 0, marginBottom: 32, position: "relative",
        opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s",
      }}>
        {years.map((year, yi) => (
          <div key={year} style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: accentColors[yi % accentColors.length], boxShadow: `0 0 10px ${accentColors[yi % accentColors.length]}` }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: accentColors[yi % accentColors.length], fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{year}</span>
            </div>
            {yi < years.length - 1 && (
              <div style={{ height: 1, width: 60, background: "linear-gradient(to right,rgba(59,130,246,0.3),rgba(59,130,246,0.1))", margin: "0 0 18px" }} />
            )}
          </div>
        ))}
        {/* Continue line */}
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.1),transparent)", margin: "0 0 18px 0" }} />
      </div>

      {/* ── Horizontal scroll container ── */}
      <div style={{ position: "relative" }}>
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right,var(--navy),transparent)", zIndex: 2, pointerEvents: "none", opacity: canScrollLeft ? 1 : 0, transition: "opacity 0.3s" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left,var(--navy),transparent)", zIndex: 2, pointerEvents: "none", opacity: canScrollRight ? 1 : 0, transition: "opacity 0.3s" }} />

        <div
          ref={scrollRef}
          onScroll={updateScroll}
          style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "none", msOverflowStyle: "none", cursor: "grab" }}
        >
          {data.certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} visible={visible} />
          ))}
        </div>
      </div>

      {/* Scroll buttons */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20, opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }}>
        {[{ dir: -1, label: "←" }, { dir: 1, label: "→" }].map(({ dir, label }) => (
          <button key={dir} onClick={() => scroll(dir)} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(15,31,56,0.8)", border: "1px solid rgba(59,130,246,0.2)", color: "var(--white-2)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(29,78,216,0.2)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(15,31,56,0.8)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)"; }}
          >{label}</button>
        ))}
      </div>

      <style>{`::-webkit-scrollbar{display:none}`}</style>
    </section>
  );
};

export default Certifications;
