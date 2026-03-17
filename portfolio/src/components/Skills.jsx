import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

/* ─────────────────────────────────────────────
   Orbit System
   - Ring 0 (innermost): Languages        — 4 items, fast
   - Ring 1             : Frameworks       — 5 items, medium
   - Ring 2             : Database + API   — 5 items, slow
   - Ring 3 (outermost) : Tools            — 6 items, very slow
───────────────────────────────────────────── */

const RING_CONFIG = [
  { radiusFactor: 0.18, duration: 18, color: "#3B82F6", label: "Languages"           },
  { radiusFactor: 0.30, duration: 28, color: "#06B6D4", label: "Frameworks"          },
  { radiusFactor: 0.42, duration: 40, color: "#8B5CF6", label: "API & DB"            },
  { radiusFactor: 0.54, duration: 55, color: "#10B981", label: "Tools"               },
];

/* Single orbiting node */
const OrbitNode = ({ item, angle, radius, ringColor, paused, started, nodeIndex, totalNodes }) => {
  const [hovered, setHovered] = useState(false);
  const animDuration = RING_CONFIG.find(r => r.color === ringColor)?.duration ?? 30;

  /* position on circle */
  const rad    = (angle * Math.PI) / 180;
  const cx     = radius * Math.cos(rad);
  const cy     = radius * Math.sin(rad);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: "50%", top: "50%",
        width: hovered ? 88 : 72,
        height: hovered ? 88 : 72,
        marginLeft: hovered ? -44 : -36,
        marginTop:  hovered ? -44 : -36,
        transform: `translate(${cx}px, ${cy}px)`,
        transition: "width 0.25s, height 0.25s, margin 0.25s",
        zIndex: hovered ? 20 : 5,
      }}
    >
      <div style={{
        width: "100%", height: "100%",
        borderRadius: "50%",
        background: hovered
          ? `radial-gradient(circle at 35% 35%, ${ringColor}30, rgba(6,14,30,0.95))`
          : "rgba(10,22,40,0.92)",
        border: `1.5px solid ${hovered ? ringColor : ringColor + "40"}`,
        boxShadow: hovered
          ? `0 0 24px ${ringColor}60, 0 0 48px ${ringColor}20, inset 0 1px 0 rgba(255,255,255,0.06)`
          : `0 0 8px ${ringColor}20`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 4, cursor: "default",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        backdropFilter: "blur(12px)",
        /* Counter-rotate so icon always faces up */
        animation: paused ? "none" : `counter-spin-${animDuration} ${animDuration}s linear infinite`,
      }}>
        <img
          src={item.icon}
          alt={item.name}
          style={{
            width: hovered ? 28 : 22,
            height: hovered ? 28 : 22,
            objectFit: "contain",
            transition: "width 0.25s, height 0.25s",
            filter: hovered ? `drop-shadow(0 0 6px ${ringColor})` : "none",
          }}
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <span style={{ display: "none", fontSize: 11, fontWeight: 800, color: ringColor, fontFamily: "'JetBrains Mono',monospace" }}>
          {item.name[0]}
        </span>

        {/* Label — only on hover */}
        <span style={{
          fontSize: 8.5,
          fontWeight: 700,
          color: hovered ? ringColor : "transparent",
          fontFamily: "'JetBrains Mono',monospace",
          letterSpacing: "0.3px",
          whiteSpace: "nowrap",
          transition: "color 0.2s",
          maxWidth: 72,
          textAlign: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>{item.name}</span>
      </div>
    </div>
  );
};

/* One orbit ring with all its nodes */
const OrbitRing = ({ items, ringIndex, orbitRadius, color, duration, paused, started }) => {
  const angleStep = 360 / items.length;

  return (
    <>
      {/* Ring track */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        marginLeft: -orbitRadius,
        marginTop: -orbitRadius,
        borderRadius: "50%",
        border: `1px solid ${color}18`,
        boxShadow: `0 0 0 1px ${color}08`,
        pointerEvents: "none",
        opacity: started ? 1 : 0,
        transition: `opacity 0.6s ease ${ringIndex * 150 + 400}ms`,
      }} />

      {/* Nodes wrapper — spins */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        width: 0, height: 0,
        animation: paused ? "none" : `orbit-spin-${duration} ${duration}s linear infinite`,
        opacity: started ? 1 : 0,
        transition: `opacity 0.7s ease ${ringIndex * 150 + 500}ms`,
      }}>
        {items.map((item, i) => (
          <OrbitNode
            key={item.name}
            item={item}
            angle={angleStep * i}
            radius={orbitRadius}
            ringColor={color}
            paused={paused}
            started={started}
            nodeIndex={i}
            totalNodes={items.length}
          />
        ))}
      </div>
    </>
  );
};

/* Center core */
const CoreSphere = ({ paused, setPaused }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setPaused(p => !p)}
      style={{
        position: "absolute",
        left: "50%", top: "50%",
        width: 90, height: 90,
        marginLeft: -45, marginTop: -45,
        zIndex: 10, cursor: "pointer",
      }}
    >
      {/* Outer pulse ring */}
      <div style={{
        position: "absolute", inset: -14,
        borderRadius: "50%",
        border: "1px solid rgba(59,130,246,0.2)",
        animation: "corePulse 3s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: -28,
        borderRadius: "50%",
        border: "1px solid rgba(59,130,246,0.08)",
        animation: "corePulse 3s ease-in-out infinite 0.5s",
        pointerEvents: "none",
      }} />

      {/* Core */}
      <div style={{
        width: "100%", height: "100%",
        borderRadius: "50%",
        background: hovered
          ? "radial-gradient(circle at 35% 30%, rgba(59,130,246,0.5), rgba(6,182,212,0.3) 50%, rgba(6,14,30,0.95))"
          : "radial-gradient(circle at 35% 30%, rgba(29,78,216,0.4), rgba(6,14,30,0.95))",
        border: `2px solid ${hovered ? "rgba(59,130,246,0.7)" : "rgba(59,130,246,0.35)"}`,
        boxShadow: hovered
          ? "0 0 40px rgba(29,78,216,0.5), 0 0 80px rgba(6,182,212,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 0 20px rgba(29,78,216,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 3,
        transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
      }}>
        <span style={{
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 900, fontSize: 16,
          color: "#F0F6FF",
          letterSpacing: "-0.5px",
          lineHeight: 1,
        }}>BS</span>
        <span style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 7.5, fontWeight: 600,
          color: paused ? "#34D399" : "var(--cyan)",
          letterSpacing: "0.5px",
          transition: "color 0.2s",
        }}>{paused ? "▶ resume" : "⏸ pause"}</span>
      </div>
    </div>
  );
};

/* ── CSS keyframe generator for each duration ── */
const generateOrbitKeyframes = (durations) =>
  durations.map(d => `
    @keyframes orbit-spin-${d} {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes counter-spin-${d} {
      from { transform: rotate(0deg); }
      to   { transform: rotate(-360deg); }
    }
  `).join("\n");

const Skills = () => {
  const ref           = useRef(null);
  const containerRef  = useRef(null);
  const [started, setStarted] = useState(false);
  const [paused,  setPaused]  = useState(false);
  const [size,    setSize]    = useState(640);

  /* Responsive orbit size */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      setSize(Math.min(Math.max(w * 0.88, 300), 680));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* IntersectionObserver trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Gather skill items per ring */
  const getItems = (cat) => data.skills.find(c => c.category === cat)?.items || [];
  const ring0Items = getItems("Languages");
  const ring1Items = getItems("Frameworks & Libraries");
  const ring2Items = [...getItems("Database"), ...getItems("API & Security")];
  const ring3Items = getItems("Tools");

  const ringItems = [ring0Items, ring1Items, ring2Items, ring3Items];
  const durations = RING_CONFIG.map(r => r.duration);

  /* All skills flat list for bottom legend */
  const allSkills = data.skills.flatMap(c => c.items);

  return (
    <section id="skills" ref={ref} style={{ background: "var(--navy)", borderTop: "1px solid rgba(59,130,246,0.07)", overflow: "hidden" }}>
      <p className="s-label" style={{ opacity: started ? 1 : 0, transition: "opacity .5s" }}>technical_skills</p>
      <h2 className="s-title" style={{ opacity: started ? 1 : 0, transform: started ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>
        What I work with
      </h2>

      {/* Ring legend */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48,
        opacity: started ? 1 : 0, transition: "opacity 0.6s ease 0.3s",
      }}>
        {RING_CONFIG.map((ring, i) => (
          <div key={ring.label} style={{
            display: "flex", alignItems: "center", gap: 7,
            fontSize: 11, fontWeight: 600,
            color: ring.color,
            background: `${ring.color}0D`,
            border: `1px solid ${ring.color}30`,
            padding: "4px 14px", borderRadius: 100,
            fontFamily: "'JetBrains Mono',monospace",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ring.color, boxShadow: `0 0 6px ${ring.color}` }} />
            Ring {i + 1} · {ring.label}
            <span style={{ color: `${ring.color}70`, marginLeft: 2 }}>{ringItems[i].length}x</span>
          </div>
        ))}
      </div>

      {/* ── Orbit system ── */}
      <div ref={containerRef} style={{
        width: "100%",
        display: "flex", justifyContent: "center",
        opacity: started ? 1 : 0,
        transition: "opacity 0.8s ease 0.5s",
      }}>
        <div style={{
          position: "relative",
          width: size,
          height: size,
        }}>
          {/* Ambient glow behind system */}
          <div style={{
            position: "absolute", inset: "15%",
            background: "radial-gradient(circle, rgba(29,78,216,0.08), rgba(6,182,212,0.04) 50%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }} />

          {/* Orbit rings */}
          {RING_CONFIG.map((ring, i) => (
            <OrbitRing
              key={ring.label}
              items={ringItems[i]}
              ringIndex={i}
              orbitRadius={size * ring.radiusFactor}
              color={ring.color}
              duration={ring.duration}
              paused={paused}
              started={started}
            />
          ))}

          {/* Core */}
          <CoreSphere paused={paused} setPaused={setPaused} />
        </div>
      </div>

      {/* Pause hint */}
      <p style={{
        textAlign: "center",
        fontSize: 11,
        color: "var(--muted)",
        fontFamily: "'JetBrains Mono',monospace",
        marginTop: 24,
        opacity: started ? 0.6 : 0,
        transition: "opacity 0.6s ease 1s",
        letterSpacing: "0.5px",
      }}>
        click center to {paused ? "resume" : "pause"} · hover nodes to inspect
      </p>

      {/* Responsive: flat pill list fallback on mobile */}
      <div className="skills-mobile-fallback" style={{ display: "none", flexWrap: "wrap", gap: 8, marginTop: 32, justifyContent: "center" }}>
        {allSkills.map(item => (
          <div key={item.name} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 14px",
            background: "rgba(15,31,56,0.7)", border: "1px solid rgba(59,130,246,0.14)",
            borderRadius: 100,
          }}>
            <img src={item.icon} alt={item.name} style={{ width: 14, height: 14, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>{item.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        /* Orbit spin keyframes per unique duration */
        ${generateOrbitKeyframes(durations)}

        @keyframes corePulse {
          0%,100% { transform: scale(1);    opacity: 0.6; }
          50%      { transform: scale(1.12); opacity: 1;   }
        }

        /* Pause all orbit animations when .orbit-paused */
        .orbit-paused * { animation-play-state: paused !important; }

        @media(max-width:600px) {
          .skills-mobile-fallback { display: flex !important; }
        }
      `}</style>
    </section>
  );
};

export default Skills;
