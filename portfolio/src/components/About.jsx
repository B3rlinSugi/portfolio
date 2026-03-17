import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

/* ── Animated counter with spring bounce ── */
function useCounter(target, duration = 1600, started = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    const isFloat = String(target).includes(".");
    const end = parseFloat(target), t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      // Elastic ease-out for that "bounce" feel
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p) * Math.cos((p * 10 - 0.75) * (2 * Math.PI) / 3);
      setV(isFloat ? (e * end).toFixed(2) : Math.round(e * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);
  return v;
}

/* ── Parallax tilt photo ── */
const PhotoTilt = ({ started }) => {
  const wrapRef = useRef(null);
  const rafRef  = useRef(null);
  const [tilt, setTilt]     = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = e => {
    const el = wrapRef.current; if (!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top)  / r.height;
      setTilt({ rx: (y - 0.5) * -18, ry: (x - 0.5) * 18, gx: Math.round(x * 100), gy: Math.round(y * 100) });
    });
  };
  const onLeave = () => { cancelAnimationFrame(rafRef.current); setHovered(false); setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }); };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        perspective: "900px",
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.2s",
        cursor: "default",
      }}
    >
      {/* Outer glow */}
      <div style={{
        position: "absolute", inset: -24,
        background: `radial-gradient(ellipse at ${tilt.gx}% ${tilt.gy}%, rgba(29,78,216,0.25), rgba(6,182,212,0.1) 50%, transparent 70%)`,
        borderRadius: 32, filter: "blur(20px)",
        transition: hovered ? "background 0.12s" : "background 0.5s",
        pointerEvents: "none",
      }} />

      {/* Depth shadow card */}
      <div style={{
        position: "absolute", top: 14, left: 14, right: -14, bottom: -14,
        borderRadius: 22,
        background: "linear-gradient(135deg,rgba(29,78,216,0.12),rgba(6,182,212,0.06))",
        border: "1px solid rgba(59,130,246,0.12)",
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.rx * 0.4}deg) rotateY(${tilt.ry * 0.4}deg) translate(${tilt.ry * 0.4}px, ${-tilt.rx * 0.3}px)`
          : "none",
        transition: hovered ? "transform 0.1s linear" : "transform 0.55s cubic-bezier(.22,1,.36,1)",
      }} />

      {/* Main card */}
      <div style={{
        position: "relative", zIndex: 2,
        borderRadius: 20, overflow: "hidden",
        border: `1.5px solid ${hovered ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.25)"}`,
        boxShadow: hovered
          ? `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.06)`
          : "0 20px 60px rgba(0,0,0,0.45)",
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.03) translateZ(12px)`
          : "perspective(900px) rotateX(0) rotateY(0) scale(1)",
        transition: hovered ? "transform 0.1s linear, box-shadow 0.2s, border-color 0.2s" : "transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.4s, border-color 0.3s",
        willChange: "transform",
      }}>
        {/* Shine layer */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 4, borderRadius: 20, pointerEvents: "none",
          background: hovered
            ? `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.09), transparent 55%)`
            : "transparent",
          transition: hovered ? "background 0.1s" : "background 0.4s",
        }} />

        <img src="/foto2.jpg" alt="Berlin Sugiyanto"
          style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center top", display: "block" }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
        <div style={{ display: "none", width: "100%", aspectRatio: "4/5", alignItems: "center", justifyContent: "center", background: "var(--navy-3)", flexDirection: "column", gap: 10 }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 32, color: "var(--blue-3)" }}>BS</span>
        </div>

        {/* Bottom gradient info */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 18px 16px", background: "linear-gradient(to top,rgba(6,14,30,0.96),transparent)", zIndex: 3 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#F0F6FF", fontFamily: "'Outfit',sans-serif" }}>Berlin Sugiyanto Hutajulu</div>
          <div style={{ fontSize: 10, color: "var(--cyan)", fontFamily: "'JetBrains Mono',monospace", marginTop: 3, letterSpacing: "0.5px" }}>backend_dev · class of 2025</div>
        </div>
      </div>

      {/* University badge */}
      <div style={{
        position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)",
        background: "rgba(10,22,40,0.97)", border: "1px solid rgba(59,130,246,0.22)",
        borderRadius: 12, padding: "10px 18px",
        display: "flex", alignItems: "center", gap: 10,
        backdropFilter: "blur(14px)", whiteSpace: "nowrap",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45)", zIndex: 5,
        animation: "floatBadge 5s ease-in-out infinite",
      }}>
        <img src="https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Logo_Universitas_Gunadarma.png/220px-Logo_Universitas_Gunadarma.png"
          alt="UG" style={{ height: 26, objectFit: "contain", flexShrink: 0 }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>Universitas Gunadarma</div>
          <div style={{ fontSize: 9.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>Informatics Eng · GPA 3.63</div>
        </div>
      </div>
    </div>
  );
};

/* ── Stat card with animated bounce counter ── */
const StatCard = ({ n, l, icon, delay, started }) => {
  const num    = parseFloat(n), suffix = n.replace(/[\d.]/g, "");
  const count  = useCounter(num, 1600, started);
  const [hovered, setHovered] = useState(false);
  const [popped, setPopped]   = useState(false);

  // Trigger pop animation when counter finishes
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => { setPopped(true); setTimeout(() => setPopped(false), 500); }, delay + 1650);
    return () => clearTimeout(t);
  }, [started]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "18px 16px",
        background: hovered ? "rgba(29,78,216,0.12)" : "rgba(15,31,56,0.6)",
        border: `1px solid ${hovered ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.12)"}`,
        borderRadius: 14, position: "relative", overflow: "hidden",
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .55s ease ${delay}ms, transform .55s cubic-bezier(.22,1,.36,1) ${delay}ms, background .2s, border-color .2s, box-shadow .2s`,
        boxShadow: hovered ? "0 0 28px rgba(29,78,216,0.12)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hovered ? "linear-gradient(to right,#1D4ED8,#06B6D4)" : "linear-gradient(to right,rgba(29,78,216,0.2),transparent)", transition: "background 0.3s" }} />
      <div style={{ fontSize: 18, marginBottom: 8 }}>{icon}</div>
      <div style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 32, fontWeight: 800,
        color: "var(--white)", lineHeight: 1, letterSpacing: "-1.5px",
        display: "inline-block",
        animation: popped ? "statPop 0.45s cubic-bezier(.22,1,.36,1)" : "none",
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 9.5, color: hovered ? "var(--cyan)" : "var(--muted)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 6, fontFamily: "'JetBrains Mono',monospace", transition: "color 0.2s" }}>{l}</div>
    </div>
  );
};

/* ── Work type chip ── */
const WorkChip = ({ label, delay, started }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 14px", borderRadius: 9,
        background: hovered ? "rgba(6,182,212,0.12)" : "rgba(6,182,212,0.05)",
        border: `1px solid ${hovered ? "rgba(6,182,212,0.4)" : "rgba(6,182,212,0.15)"}`,
        transform: hovered ? "translateY(-2px)" : started ? "translateY(0)" : "translateY(10px)",
        opacity: started ? 1 : 0,
        transition: `opacity 0.5s ease ${delay}ms, transform 0.4s cubic-bezier(.22,1,.36,1) ${delay}ms, background 0.2s, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hovered ? "0 4px 16px rgba(6,182,212,0.12)" : "none",
        cursor: "default",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cyan)", flexShrink: 0, boxShadow: hovered ? "0 0 8px rgba(6,182,212,0.7)" : "none", transition: "box-shadow 0.2s" }} />
      <span style={{ fontSize: 12.5, fontWeight: 600, color: hovered ? "var(--white)" : "var(--cyan)", fontFamily: "'Outfit',sans-serif", transition: "color 0.2s" }}>{label}</span>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { n: "3.63", l: "GPA / 4.00",   icon: "🎓" },
    { n: "3",    l: "Projects",      icon: "⚙️" },
    { n: "3",    l: "Org Periods",   icon: "🏛️" },
    { n: "5",    l: "Tech Stacks",   icon: "🛠️" },
  ];

  const workTypes = ["Full-time", "Hybrid", "Magang", "Kontrak"];

  return (
    <section id="about" ref={ref} style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(59,130,246,0.07)" }}>
      <p className="s-label" style={{ opacity: started ? 1 : 0, transition: "opacity .5s" }}>about_me</p>
      <h2 className="s-title" style={{ opacity: started ? 1 : 0, transform: started ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>Who I am</h2>

      {/* ══ MAGAZINE LAYOUT ══ */}
      <div className="magazine-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px 1fr", gap: "40px 36px", alignItems: "start" }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            fontSize: 10.5, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase",
            color: "#34D399", background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.2)", padding: "5px 14px", borderRadius: 100,
            fontFamily: "'JetBrains Mono',monospace", width: "fit-content",
            opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.15s",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.6)", animation: "pulse-green 2s infinite" }} />
            Available · Building Backend Systems
          </div>

          {/* Bio */}
          <p style={{
            fontSize: 14.5, lineHeight: 2, color: "#8BA4C8",
            fontFamily: "'Outfit',sans-serif",
            opacity: started ? 1 : 0, transition: "opacity 0.6s ease 0.25s",
            borderLeft: "2px solid rgba(59,130,246,0.2)",
            paddingLeft: 16,
          }}>{data.about}</p>

          {/* Location */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "10px 16px",
            background: "rgba(15,31,56,0.7)", border: "1px solid rgba(59,130,246,0.14)",
            borderRadius: 10, width: "fit-content",
            opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.4s",
          }}>
            <span style={{ fontSize: 15 }}>📍</span>
            <div>
              <div style={{ fontSize: 9.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 1 }}>Location</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>{data.location}</div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "linear-gradient(to right, rgba(59,130,246,0.2), transparent)", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }} />

          {/* Seeking opportunities */}
          <div style={{
            opacity: started ? 1 : 0,
            transform: started ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>Currently seeking</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {workTypes.map((t, i) => (
                <WorkChip key={t} label={t} delay={560 + i * 80} started={started} />
              ))}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'Outfit',sans-serif", marginTop: 10, lineHeight: 1.6 }}>
              Junior Backend Developer — Jabodetabek or remote worldwide.
            </div>
          </div>
        </div>

        {/* ── CENTER COLUMN — Photo ── */}
        <div style={{ paddingTop: 8, paddingBottom: 32 }}>
          <PhotoTilt started={started} />
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Section label */}
          <div style={{
            opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.2s",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>quick stats</div>
            <div style={{ height: 1, background: "linear-gradient(to right, rgba(59,130,246,0.3), transparent)" }} />
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="about-stats">
            {stats.map(({ n, l, icon }, i) => (
              <StatCard key={l} n={n} l={l} icon={icon} delay={550 + i * 120} started={started} />
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "linear-gradient(to right, rgba(59,130,246,0.2), transparent)", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }} />

          {/* Terminal-style info block */}
          <div style={{
            background: "rgba(6,14,30,0.7)", border: "1px solid rgba(59,130,246,0.12)",
            borderRadius: 12, padding: "16px 18px",
            fontFamily: "'JetBrains Mono',monospace",
            opacity: started ? 1 : 0,
            transform: started ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s",
          }}>
            <div style={{ fontSize: 9.5, color: "var(--muted)", marginBottom: 10, letterSpacing: "1px" }}>$ whoami --details</div>
            {[
              ["role",     "Junior Backend Dev"],
              ["lang",     "PHP · Java · JS"],
              ["fw",       "Laravel · Spring"],
              ["db",       "MySQL · PostgreSQL"],
              ["status",   "open_to_hire: true"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 11.5 }}>
                <span style={{ color: "rgba(59,130,246,0.6)", minWidth: 52 }}>{k}</span>
                <span style={{ color: "rgba(59,130,246,0.3)" }}>→</span>
                <span style={{ color: k === "status" ? "#34D399" : "var(--white-2)", fontWeight: k === "status" ? 700 : 400 }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Tech stack micro-icons row */}
          <div style={{
            opacity: started ? 1 : 0,
            transform: started ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.75s, transform 0.6s ease 0.75s",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>tech stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["PHP","Laravel","Java","MySQL","PostgreSQL","REST API","Git","Linux"].map(t => (
                <span key={t} style={{
                  fontSize: 10.5, color: "var(--cyan)",
                  background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.18)",
                  padding: "3px 10px", borderRadius: 100,
                  fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes floatBadge { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-5px)} }
        @keyframes pulse-green { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)} 70%{box-shadow:0 0 0 7px rgba(16,185,129,0)} }
        @keyframes statPop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.18) translateY(-3px); }
          60%  { transform: scale(0.95) translateY(1px); }
          100% { transform: scale(1); }
        }
        @media(max-width:1000px){
          .magazine-grid{ grid-template-columns: 1fr 240px !important; grid-template-rows: auto auto !important; }
          .magazine-grid > :nth-child(1){ grid-column: 1; grid-row: 2; }
          .magazine-grid > :nth-child(2){ grid-column: 1 / -1; grid-row: 1; display:flex; justify-content:center; padding-bottom:40px; }
          .magazine-grid > :nth-child(3){ grid-column: 2; grid-row: 2; }
        }
        @media(max-width:700px){
          .magazine-grid{ grid-template-columns: 1fr !important; }
          .magazine-grid > :nth-child(1){ grid-column: 1; grid-row: 2; }
          .magazine-grid > :nth-child(2){ grid-column: 1; grid-row: 1; }
          .magazine-grid > :nth-child(3){ grid-column: 1; grid-row: 3; }
          .about-stats{ grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
