import { useEffect, useRef, useState, useContext } from "react";
import { LangContext, i18n } from "./Navbar";
import { data } from "../data/portfolioData";

const OrgSection = ({ org, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);

  const accentColors = ["#3B82F6", "#06B6D4", "#8B5CF6"];
  const ac = accentColors[index % accentColors.length];

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setCurtainDone(true), index * 250 + 300);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div style={{
      position: "relative", borderRadius: 20, overflow: "hidden",
      height: 280,
      opacity: visible ? 1 : 0,
      transition: `opacity 0.5s ease ${index * 200}ms`,
    }}>
      {/* ── Background photo — fixed sizing ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={org.photo} alt={org.role}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(.22,1,.36,1)",
            filter: "brightness(0.38) saturate(0.75)",
          }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(6,14,30,0.93) 0%,rgba(6,14,30,0.6) 55%,rgba(6,14,30,0.2) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 15% 50%,${ac}12,transparent 55%)` }} />
      </div>

      {/* Curtain reveal */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "var(--navy)", transformOrigin: "left center", transform: curtainDone ? "scaleX(0)" : "scaleX(1)", transition: curtainDone ? `transform 0.85s cubic-bezier(.77,0,.18,1) ${index * 100}ms` : "none", pointerEvents: "none" }} />

      {/* Content */}
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", zIndex: 2, padding: "32px 44px", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right,${ac},${ac}50,transparent)` }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12, width: "fit-content" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: ac, boxShadow: `0 0 8px ${ac}` }} />
          <span style={{ fontSize: 10.5, color: ac, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{org.period}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 800, color: `${ac}60`, letterSpacing: "-0.5px" }}>0{index + 1}</span>
          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono',monospace" }}>{org.org}</span>
        </div>

        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 800, color: "#FFFFFF", marginBottom: 10, lineHeight: 1.2, letterSpacing: "-0.5px", maxWidth: 500 }}>{org.role}</h3>
        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 16, maxWidth: 480, fontFamily: "'Outfit',sans-serif" }}>{org.desc}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {org.highlights.map(h => (
            <span key={h} style={{ fontSize: 10.5, color: ac, background: `${ac}12`, border: `1px solid ${ac}30`, padding: "4px 12px", borderRadius: 100, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>{h}</span>
          ))}
        </div>

        <a href={org.instagram} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, color: hovered ? "var(--white)" : "rgba(255,255,255,0.6)", textDecoration: "none", padding: "8px 16px", borderRadius: 9, background: hovered ? `${ac}18` : "rgba(255,255,255,0.05)", border: `1px solid ${hovered ? ac + "35" : "rgba(255,255,255,0.1)"}`, transition: "all 0.2s", width: "fit-content", fontFamily: "'Outfit',sans-serif", backdropFilter: "blur(8px)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#F472B6" }}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          See on Instagram
        </a>
      </div>
    </div>
  );
};

const Organizations = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const lang = useContext(LangContext);
  const t = i18n[lang].organizations;
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="organizations" ref={ref} style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(59,130,246,0.07)" }}>
      {/* JSX tag label */}
      <p className="s-label" style={{ opacity: visible ? 1 : 0, transition: "opacity .5s", fontFamily: "'JetBrains Mono',monospace" }}>
        <span style={{ color: "rgba(6,182,212,0.5)" }}>&lt;</span>
        {t.label}
        <span style={{ color: "rgba(6,182,212,0.5)" }}> /&gt;</span>
      </p>
      <h2 className="s-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>{t.title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.organizations.map((org, i) => (
          <OrgSection key={org.role} org={org} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
};

export default Organizations;
