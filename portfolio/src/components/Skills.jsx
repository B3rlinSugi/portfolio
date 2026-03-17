import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const categoryColors = {
  "Languages":              { color: "#3B82F6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.25)"  },
  "Frameworks & Libraries": { color: "#06B6D4", bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.25)"   },
  "Database":               { color: "#8B5CF6", bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.25)"  },
  "API & Security":         { color: "#10B981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)"  },
  "Tools":                  { color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)"  },
};

const SkillPill = ({ item, color, bg, border, index, open }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 9,
        padding: "9px 16px", borderRadius: 100,
        background: hovered ? bg : "rgba(15,31,56,0.6)",
        border: `1px solid ${hovered ? border : "rgba(59,130,246,0.1)"}`,
        cursor: "default",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0) scale(1)" : "translateY(12px) scale(0.9)",
        transition: `opacity 0.4s cubic-bezier(.22,1,.36,1) ${index * 60}ms, transform 0.45s cubic-bezier(.34,1.56,.64,1) ${index * 60}ms, background 0.2s, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hovered ? `0 0 20px ${bg}, 0 4px 12px rgba(0,0,0,0.2)` : "none",
      }}
    >
      <div style={{ width: 26, height: 26, borderRadius: 8, background: hovered ? bg : "rgba(15,31,56,0.9)", border: `1px solid ${hovered ? border : "rgba(59,130,246,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s", transform: hovered ? "rotate(-5deg) scale(1.1)" : "none" }}>
        <img src={item.icon} alt={item.name} style={{ width: 15, height: 15, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
        <span style={{ display: "none", fontSize: 9, color, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{item.name[0]}</span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: hovered ? "var(--white)" : "var(--white-2)", fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap", transition: "color 0.2s" }}>{item.name}</span>
    </div>
  );
};

const AccordionItem = ({ category, visible, defaultOpen = false, delay = 0 }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [headerHovered, setHeaderHovered] = useState(false);
  const { color, bg, border } = categoryColors[category.category] || { color: "#3B82F6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" };

  useEffect(() => { if (visible && defaultOpen) setOpen(true); }, [visible]);

  return (
    <div style={{
      border: `1px solid ${open ? border : headerHovered ? border + "80" : "rgba(59,130,246,0.1)"}`,
      borderRadius: 16, overflow: "hidden",
      background: open ? bg : headerHovered ? `${bg}60` : "rgba(15,31,56,0.4)",
      transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
      boxShadow: open
        ? `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px ${color}15, 0 0 40px ${color}08`
        : headerHovered ? `0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px ${color}10` : "none",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition2: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", gap: 12 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Animated dot */}
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: open ? `0 0 12px ${color}, 0 0 24px ${color}50` : headerHovered ? `0 0 8px ${color}80` : "none", flexShrink: 0, transition: "box-shadow 0.3s", animation: open ? `dotPulse${category.category.replace(/\s/g, '')} 2s ease-in-out infinite` : "none" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: open ? "var(--white)" : headerHovered ? "var(--white-2)" : "var(--white-2)", fontFamily: "'Outfit',sans-serif", transition: "color 0.2s" }}>{category.category}</span>
          <span style={{ fontSize: 10.5, color, background: bg, border: `1px solid ${border}`, padding: "2px 8px", borderRadius: 100, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{category.items.length} skills</span>
        </div>

        {/* Shimmer chevron button */}
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: open ? bg : "rgba(15,31,56,0.8)",
          border: `1px solid ${open ? border : "rgba(59,130,246,0.1)"}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "all 0.3s",
          boxShadow: headerHovered ? `0 0 14px ${color}30` : "none",
          position: "relative", overflow: "hidden",
        }}>
          {/* Shimmer on hover */}
          {headerHovered && (
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg,transparent,${color}30,transparent)`, backgroundSize: "200% 100%", animation: "shimmerBtn 1.2s linear infinite", borderRadius: "50%" }} />
          )}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.38s cubic-bezier(.22,1,.36,1)", position: "relative", zIndex: 1 }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Collapsible content */}
      <div style={{ maxHeight: open ? 500 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ padding: "4px 22px 22px", display: "flex", flexWrap: "wrap", gap: 8 }}>
          {category.items.map((item, i) => (
            <SkillPill key={item.name} item={item} color={color} bg={bg} border={border} index={i} open={open} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} style={{ background: "var(--navy)", borderTop: "1px solid rgba(59,130,246,0.07)" }}>
      {/* JSX tag label */}
      <p className="s-label" style={{ opacity: started ? 1 : 0, transition: "opacity .5s", fontFamily: "'JetBrains Mono',monospace" }}>
        <span style={{ color: "rgba(6,182,212,0.5)" }}>&lt;</span>
        skills
        <span style={{ color: "rgba(6,182,212,0.5)" }}> /&gt;</span>
      </p>
      <h2 className="s-title" style={{ opacity: started ? 1 : 0, transform: started ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>What I work with</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.skills.map((cat, i) => (
          <div key={cat.category} style={{
            opacity: started ? 1 : 0,
            transform: started ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.55s ease ${i * 100 + 200}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${i * 100 + 200}ms`,
          }}>
            <AccordionItem category={cat} visible={started} defaultOpen={i === 0} delay={i * 100 + 200} />
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", marginTop: 20, opacity: started ? 0.6 : 0, transition: "opacity 0.6s ease 0.8s", letterSpacing: "0.5px" }}>
        click any category to expand · hover skills to inspect
      </p>

      <style>{`
        @keyframes shimmerBtn{0%{background-position:200% 0}100%{background-position:-200% 0}}
      `}</style>
    </section>
  );
};

export default Skills;
