import { useEffect, useRef, useState, useContext } from "react";
import { LangContext } from "../LangContext";
import { i18n } from "../i18n";
import { data } from "../data/portfolioData";

const yearAccents = { "2022": "#3B82F6", "2023": "#06B6D4", "2024": "#8B5CF6", "2025": "#10B981" };

const TimelineCard = ({ cert, index, side, visible, color }) => {
  const [hovered, setHovered] = useState(false);
  const isLeft = side === "left";

  return (
    <div style={{
      display: "flex",
      justifyContent: isLeft ? "flex-end" : "flex-start",
      paddingRight: isLeft ? "calc(50% + 24px)" : 0,
      paddingLeft: isLeft ? 0 : "calc(50% + 24px)",
      marginBottom: 16,
    }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%", maxWidth: 340,
          borderRadius: 14, overflow: "hidden",
          background: hovered ? `linear-gradient(135deg,${color}10,rgba(15,31,56,0.85))` : "rgba(15,31,56,0.65)",
          border: `1px solid ${hovered ? color + "40" : "rgba(59,130,246,0.12)"}`,
          padding: "16px 18px", position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(0) scale(1)"
            : isLeft ? "translateX(-40px) scale(0.95)" : "translateX(40px) scale(0.95)",
          transition: `opacity 0.55s ease ${index * 120}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${index * 120}ms, background 0.25s, border-color 0.25s, box-shadow 0.25s`,
          boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${color}20` : "0 4px 16px rgba(0,0,0,0.15)",
          cursor: "default",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: hovered ? `linear-gradient(to right,${color},${color}80)` : "transparent", transition: "background 0.3s", borderRadius: "14px 14px 0 0" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: hovered ? `${color}18` : "rgba(15,31,56,0.9)", border: `1px solid ${hovered ? color + "35" : "rgba(59,130,246,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", boxShadow: hovered ? `0 6px 16px ${color}25` : "none" }}>
            <img src={cert.icon} alt={cert.name} style={{ width: 24, height: 24, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
            <span style={{ display: "none", fontSize: 12, color, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{cert.name[0]}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: hovered ? "var(--white)" : "var(--white-2)", marginBottom: 3, lineHeight: 1.35, transition: "color 0.2s", fontFamily: "'Outfit',sans-serif" }}>{cert.name}</div>
            <div style={{ fontSize: 10, color: hovered ? color : "var(--muted)", transition: "color 0.2s", fontFamily: "'JetBrains Mono',monospace" }}>{cert.issuer}</div>
          </div>
        </div>

        {/* Connector arrow */}
        <div style={{
          position: "absolute", top: "50%", transform: "translateY(-50%)",
          [isLeft ? "right" : "left"]: -8,
          width: 0, height: 0,
          borderTop: "8px solid transparent",
          borderBottom: "8px solid transparent",
          [isLeft ? "borderLeft" : "borderRight"]: `8px solid ${hovered ? color + "40" : "rgba(59,130,246,0.12)"}`,
          transition: "border-color 0.25s",
        }} />
      </div>
    </div>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const lang = useContext(LangContext);
  const t = i18n[lang].certifications;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) {
        setLineHeight(0);
        setTimeout(() => {
          let h = 0;
          const interval = setInterval(() => {
            h += 3; setLineHeight(h);
            if (h >= 100) clearInterval(interval);
          }, 16);
        }, 300);
      } else {
        setLineHeight(0);
      }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const years = [...new Set(data.certifications.map(c => c.year))].sort();
  const grouped = years.reduce((acc, year) => {
    acc[year] = data.certifications.filter(c => c.year === year);
    return acc;
  }, {});

  let globalIndex = 0;

  return (
    <section id="certifications" ref={ref} style={{ background:"var(--navy)", borderTop:"1px solid rgba(59,130,246,0.07)" }}>
      <p className="s-label" style={{ opacity:visible?1:0, transition:"opacity .5s", fontFamily:"'JetBrains Mono',monospace" }}>
        <span style={{ color:"rgba(6,182,212,0.5)" }}>&lt;</span>
        {t.label}
        <span style={{ color:"rgba(6,182,212,0.5)" }}> /&gt;</span>
      </p>
      <h2 className="s-title" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(16px)", transition:"opacity .6s ease .1s,transform .6s ease .1s" }}>{t.title}</h2>

      <div style={{ position:"relative", maxWidth:800, margin:"0 auto" }}>
        <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:2, background:"rgba(59,130,246,0.08)", transform:"translateX(-50%)", zIndex:0 }}>
          <div style={{ width:"100%", background:"linear-gradient(to bottom,#1D4ED8,#06B6D4,#8B5CF6)", height:lineHeight+"%", transition:"height 0.05s linear", borderRadius:2, boxShadow:"0 0 10px rgba(29,78,216,0.5)" }} />
        </div>

        {years.map((year, yi) => {
          const color = yearAccents[year] || "#3B82F6";
          const certs = grouped[year];
          return (
            <div key={year} style={{ marginBottom: 32 }}>
              {/* Year marker */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", zIndex: 2, marginBottom: 20,
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease ${yi * 150}ms`,
              }}>
                <div style={{
                  background: `linear-gradient(135deg,${color},${color}80)`,
                  padding: "6px 20px", borderRadius: 100,
                  fontSize: 13, fontWeight: 700, color: "#fff",
                  fontFamily: "'JetBrains Mono',monospace",
                  boxShadow: `0 0 20px ${color}50, 0 0 40px ${color}20`,
                  border: `1px solid ${color}60`,
                  position: "relative",
                }}>
                  {year}
                  {/* Pulse dot */}
                  <div style={{ position: "absolute", inset: -4, borderRadius: 100, animation: `yearPulse 2s ease-in-out infinite ${yi * 0.5}s`, border: `1px solid ${color}30`, pointerEvents: "none" }} />
                </div>
              </div>

              {/* Cards alternating left/right */}
              {certs.map((cert) => {
                const idx = globalIndex++;
                const side = idx % 2 === 0 ? "left" : "right";
                return (
                  <div key={cert.name} style={{ position: "relative", zIndex: 1 }}>
                    {/* Center dot */}
                    <div style={{
                      position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)",
                      width: 12, height: 12, borderRadius: "50%",
                      background: color,
                      border: `2px solid var(--navy)`,
                      boxShadow: `0 0 10px ${color}`,
                      zIndex: 3,
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.4s ease ${idx * 120 + 200}ms`,
                      animation: `dotPulseTimeline 2.5s ease-in-out infinite ${idx * 0.3}s`,
                    }} />
                    <TimelineCard cert={cert} index={idx} side={side} visible={visible} color={color} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Total count */}
      <div style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", opacity: visible ? 0.6 : 0, transition: "opacity 0.5s ease 0.5s" }}>
        {data.certifications.length} {t.total}
      </div>

      <style>{`
        @keyframes yearPulse{0%,100%{opacity:0;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes dotPulseTimeline{0%,100%{box-shadow:0 0 6px var(--c,#3B82F6)}50%{box-shadow:0 0 16px var(--c,#3B82F6),0 0 32px var(--c,#3B82F6)50}}
        @media(max-width:600px){
          .timeline-card{max-width:100% !important;padding-right:0 !important;padding-left:0 !important;}
        }
      `}</style>
    </section>
  );
};

export default Certifications;
