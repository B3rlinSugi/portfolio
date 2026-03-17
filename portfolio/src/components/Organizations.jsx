import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const OrgCard = ({ org, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0; // even = slide from left, odd = slide from right

  const accentColors = ["#3B82F6", "#06B6D4", "#8B5CF6"];
  const ac = accentColors[index % accentColors.length];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 48px 1fr",
      alignItems: "start",
      gap: 0,
      position: "relative",
    }}>

      {/* ── LEFT SIDE ── */}
      <div style={{
        paddingRight: 32,
        paddingBottom: 8,
        display: "flex",
        justifyContent: "flex-end",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : isLeft ? "translateX(-56px)" : "translateX(0)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${index * 180}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 180}ms`,
      }}>
        {isLeft ? (
          <OrgCardBody org={org} index={index} hovered={hovered} setHovered={setHovered} ac={ac} side="left" />
        ) : (
          /* Period label on right card's left side */
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingTop: 18,
          }}>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: ac,
              fontFamily: "'JetBrains Mono',monospace",
              letterSpacing: "0.5px",
              background: `${ac}10`,
              border: `1px solid ${ac}25`,
              padding: "4px 12px",
              borderRadius: 100,
              whiteSpace: "nowrap",
            }}>{org.period}</span>
          </div>
        )}
      </div>

      {/* ── TIMELINE CENTER ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Dot */}
        <div style={{
          width: 16, height: 16,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${ac}, ${ac}80)`,
          border: `3px solid var(--navy)`,
          boxShadow: `0 0 0 2px ${ac}, 0 0 16px ${ac}60`,
          marginTop: 22,
          flexShrink: 0,
          zIndex: 3,
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0)",
          transition: `opacity 0.5s ease ${index * 180 + 100}ms, transform 0.5s cubic-bezier(.34,1.56,.64,1) ${index * 180 + 100}ms`,
        }} />
        {/* Vertical line — extends down */}
        <div style={{
          width: 2,
          flex: 1,
          minHeight: 60,
          background: `linear-gradient(to bottom, ${ac}50, rgba(59,130,246,0.08))`,
          marginTop: 4,
          opacity: visible ? 1 : 0,
          transition: `opacity 0.6s ease ${index * 180 + 200}ms`,
        }} />
      </div>

      {/* ── RIGHT SIDE ── */}
      <div style={{
        paddingLeft: 32,
        paddingBottom: 8,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : !isLeft ? "translateX(56px)" : "translateX(0)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${index * 180}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 180}ms`,
      }}>
        {!isLeft ? (
          <OrgCardBody org={org} index={index} hovered={hovered} setHovered={setHovered} ac={ac} side="right" />
        ) : (
          /* Period label on left card's right side */
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            paddingTop: 18,
          }}>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: ac,
              fontFamily: "'JetBrains Mono',monospace",
              letterSpacing: "0.5px",
              background: `${ac}10`,
              border: `1px solid ${ac}25`,
              padding: "4px 12px",
              borderRadius: 100,
              whiteSpace: "nowrap",
            }}>{org.period}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* Card body shared between left/right */
const OrgCardBody = ({ org, index, hovered, setHovered, ac, side }) => {
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${hovered ? ac + "45" : "rgba(59,130,246,0.13)"}`,
        background: hovered
          ? `linear-gradient(135deg, ${ac}0A, rgba(15,31,56,0.85))`
          : "rgba(15,31,56,0.65)",
        boxShadow: hovered
          ? `0 24px 56px rgba(0,0,0,0.4), 0 0 0 1px ${ac}20`
          : "0 6px 24px rgba(0,0,0,0.25)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s, transform 0.35s cubic-bezier(.22,1,.36,1)",
        position: "relative",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2.5,
        background: hovered
          ? `linear-gradient(to right, ${ac}, ${ac}80)`
          : "transparent",
        transition: "background 0.3s",
        borderRadius: "18px 18px 0 0",
      }} />

      {/* Photo */}
      <div style={{ position: "relative", overflow: "hidden", height: 180, background: "var(--navy-3)" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(6,14,30,0.2)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to bottom, transparent 40%, rgba(15,31,56,0.95) 100%)", pointerEvents: "none" }} />
        <img src={org.photo} alt={org.role}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
          }}
          onError={e => { e.target.style.display = "none"; }}
        />
        {/* Period overlay on photo */}
        <div style={{
          position: "absolute", bottom: 10, left: 12, zIndex: 4,
          fontSize: 10, color: "var(--white-2)",
          background: "rgba(6,14,30,0.88)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(59,130,246,0.2)",
          padding: "3px 10px", borderRadius: 100,
          fontFamily: "'JetBrains Mono',monospace",
        }}>{org.period}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px" }}>
        {/* Index + org */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 800,
            color: `${ac}50`, letterSpacing: "-0.5px",
          }}>0{index + 1}</span>
          <span style={{ width: 1, height: 12, background: "rgba(59,130,246,0.2)" }} />
          <span style={{ fontSize: 10.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.3px" }}>{org.org}</span>
        </div>

        <h3 style={{
          fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 800,
          color: "var(--white)", marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.3px",
        }}>{org.role}</h3>

        <p style={{
          fontSize: 12.5, color: "#6B84A8", lineHeight: 1.75, marginBottom: 12,
          fontFamily: "'Outfit',sans-serif",
        }}>{org.desc}</p>

        {/* Highlights */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
          {org.highlights.map(h => (
            <span key={h} style={{
              fontSize: 10, color: ac,
              background: `${ac}0D`, border: `1px solid ${ac}25`,
              padding: "3px 10px", borderRadius: 100,
              fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
            }}>{h}</span>
          ))}
        </div>

        <a href={org.instagram} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          fontSize: 11.5, fontWeight: 600,
          color: hovered ? "var(--white-2)" : "var(--muted)",
          textDecoration: "none", padding: "6px 14px", borderRadius: 8,
          background: hovered ? `${ac}12` : "transparent",
          border: `1px solid ${hovered ? ac + "30" : "rgba(59,130,246,0.1)"}`,
          transition: "all 0.2s", width: "fit-content",
          fontFamily: "'Outfit',sans-serif",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#F472B6" }}>
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
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="organizations" ref={ref} style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(59,130,246,0.07)" }}>
      <p className="s-label" style={{ opacity: visible ? 1 : 0, transition: "opacity .5s" }}>organizations</p>
      <h2 className="s-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>
        Organisational Journey
      </h2>

      {/* Timeline wrapper */}
      <div style={{ position: "relative", maxWidth: 960, margin: "0 auto" }}>

        {/* Center line — full height */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: 0, bottom: 0,
          width: 2,
          marginLeft: -1,
          background: "linear-gradient(to bottom, rgba(59,130,246,0.04), rgba(59,130,246,0.2) 15%, rgba(59,130,246,0.2) 85%, rgba(59,130,246,0.04))",
          pointerEvents: "none",
          zIndex: 0,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.2s",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {data.organizations.map((org, i) => (
            <OrgCard key={org.role} org={org} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:700px){
          /* Collapse to single column on mobile */
          .org-timeline-grid { grid-template-columns: 24px 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Organizations;
