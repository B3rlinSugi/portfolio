import { useEffect, useRef, useState, useContext } from "react";
import { data } from "../data/portfolioData";
import { LangContext, i18n } from "./Navbar";

function useCounter(target, duration = 1600, started = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    const isFloat = String(target).includes(".");
    const end = parseFloat(target), t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p) * Math.cos((p * 10 - 0.75) * (2 * Math.PI) / 3);
      setV(isFloat ? (e * end).toFixed(2) : Math.round(e * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);
  return v;
}

/* ── Neon Border Trace Card ── */
const NeonBorderCard = ({ started }) => {
  return (
    <div style={{
      position: "relative",
      opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.2s",
    }}>
      {/* Neon border trace SVG */}
      <svg style={{ position: "absolute", inset: -2, width: "calc(100% + 4px)", height: "calc(100% + 4px)", borderRadius: 22, pointerEvents: "none", zIndex: 3 }} viewBox="0 0 264 324">
        <rect x="1" y="1" width="262" height="322" rx="20" fill="none" stroke="url(#neonGrad)" strokeWidth="2"
          strokeDasharray="1172" strokeDashoffset="1172"
          style={{ animation: started ? "neonTrace 3s ease-in-out infinite 0.5s" : "none" }} />
        <defs>
          <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Card */}
      <div style={{
        width: 260, height: 320, borderRadius: 20, overflow: "hidden", position: "relative",
        border: "1px solid rgba(59,130,246,0.25)",
        boxShadow: "0 0 20px rgba(6,182,212,0.15), 0 0 40px rgba(29,78,216,0.1), 0 20px 50px rgba(0,0,0,0.4)",
      }}>
        <img src="/foto2.jpg" alt="Berlin Sugiyanto"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
        <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "var(--navy-3)", flexDirection: "column" }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 44, color: "var(--blue-3)" }}>BS</span>
        </div>
        {/* Shine */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 50%,rgba(6,182,212,0.04) 100%)", pointerEvents: "none" }} />
        {/* Bottom gradient */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top,rgba(6,14,30,0.92),transparent)", zIndex: 2 }} />
        {/* Top accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: "linear-gradient(to right,#1D4ED8,#06B6D4)", zIndex: 3 }} />
        {/* Name overlay */}
        <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, textAlign: "center", zIndex: 3 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#F0F6FF", fontFamily: "'Outfit',sans-serif" }}>Berlin Sugiyanto</div>
          <div style={{ fontSize: 9.5, color: "var(--cyan)", fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>backend_dev · 2025</div>
        </div>
      </div>

      {/* University badge — below card, not overlapping name */}
      <div style={{ position: "absolute", bottom: -26, left: "50%", transform: "translateX(-50%)", background: "rgba(10,22,40,0.97)", border: "1px solid rgba(59,130,246,0.22)", borderRadius: 12, padding: "9px 16px", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(14px)", whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(0,0,0,0.45)", zIndex: 5, animation: "floatBadge 5s ease-in-out infinite" }}>
        <img src="https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Logo_Universitas_Gunadarma.png/220px-Logo_Universitas_Gunadarma.png" alt="UG" style={{ height: 22, objectFit: "contain", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>Universitas Gunadarma</div>
          <div style={{ fontSize: 9, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>Informatics Eng · GPA 3.63</div>
        </div>
      </div>

      <style>{`
        @keyframes neonTrace {
          0%   { stroke-dashoffset: 1172; opacity: 1; }
          60%  { stroke-dashoffset: 0;    opacity: 1; }
          85%  { stroke-dashoffset: 0;    opacity: 0.3; }
          100% { stroke-dashoffset: 1172; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

/* ── Stat Card with glow ── */
const StatCard = ({ n, l, icon, color, delay, started }) => {
  const suffix = n.replace(/[\d.]/g, "");
  const count = useCounter(parseFloat(n), 1600, started);
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "16px 14px", borderRadius: 14, position: "relative", overflow: "hidden",
        background: hovered ? `${color}10` : "rgba(15,31,56,0.7)",
        border: `1px solid ${hovered ? color + "40" : "rgba(59,130,246,0.12)"}`,
        opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${delay}ms, background 0.25s, border-color 0.25s, box-shadow 0.25s`,
        boxShadow: hovered ? `0 8px 30px ${color}20, 0 0 0 1px ${color}15` : "none",
        cursor: "default", textAlign: "center",
      }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: hovered ? `linear-gradient(to right,${color},${color}80)` : "transparent", transition: "background 0.3s" }} />
      <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontFamily: "'Syne','Outfit',sans-serif", fontSize: 28, fontWeight: 800, color: "var(--white)", lineHeight: 1, letterSpacing: "-1.5px", textShadow: hovered ? `0 0 20px ${color}` : "none", transition: "text-shadow 0.3s" }}>{count}{suffix}</div>
      <div style={{ fontSize: 9.5, color: hovered ? color : "var(--muted)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 6, fontFamily: "'JetBrains Mono',monospace", transition: "color 0.2s" }}>{l}</div>
    </div>
  );
};

const CircularSkill = ({ skill, index, started }) => {
  const [animated, setAnimated] = useState(false);
  const r = 26, circ = 2 * Math.PI * r;
  const dash = animated ? circ * (1 - skill.pct / 100) : circ;

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setAnimated(true), index * 120 + 400);
    return () => clearTimeout(t);
  }, [started]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      opacity: started ? 1 : 0, transform: started ? "scale(1)" : "scale(0.8)",
      transition: `opacity 0.5s ease ${index * 100 + 300}ms, transform 0.5s cubic-bezier(.22,1,.36,1) ${index * 100 + 300}ms`,
    }}>
      <div style={{ position: "relative", width: 72, height: 72 }}>
        <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="5" />
          <circle cx="36" cy="36" r={r} fill="none" stroke={skill.color} strokeWidth="5"
            strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)", filter: `drop-shadow(0 0 5px ${skill.color})` }}
          />
        </svg>
        {/* Larger icon in center */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,31,56,0.6)", borderRadius: "50%", margin: 14 }}>
          <img src={skill.icon} alt={skill.name} style={{ width: 26, height: 26, objectFit: "contain" }}
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
          <span style={{ display: "none", fontSize: 11, color: skill.color, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{skill.name[0]}</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>{skill.name}</div>
        <div style={{ fontSize: 9.5, color: skill.color, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{skill.pct}%</div>
      </div>
    </div>
  );
};

const skillsData = [
  { name: "PHP",      pct: 88, color: "#6366F1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
  { name: "Laravel",  pct: 82, color: "#EF4444", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
  { name: "Java",     pct: 72, color: "#F59E0B", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "MySQL",    pct: 85, color: "#06B6D4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "REST API", pct: 80, color: "#10B981", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Git",      pct: 78, color: "#F97316", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const seekingItems = [
  { label: "Full-time", color: "#3B82F6" },
  { label: "Hybrid",    color: "#06B6D4" },
  { label: "Magang",    color: "#8B5CF6" },
  { label: "Kontrak",   color: "#10B981" },
];

const About = () => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const lang = useContext(LangContext);
  const t = i18n[lang].about;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { n: "3.63", l: t.stats.gpa,     icon: "🎓", color: "#3B82F6" },
    { n: "3",    l: t.stats.projects, icon: "⚙️",  color: "#06B6D4" },
    { n: "3",    l: t.stats.org,      icon: "🏛️", color: "#8B5CF6" },
    { n: "5",    l: t.stats.stacks,   icon: "🛠️", color: "#10B981" },
  ];

  return (
    <section id="about" ref={ref} style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(59,130,246,0.07)" }}>
      <p className="s-label" style={{ opacity: started ? 1 : 0, transition: "opacity .5s", fontFamily: "'JetBrains Mono',monospace" }}>
        <span style={{ color: "rgba(6,182,212,0.5)" }}>&lt;</span>
        {t.label}
        <span style={{ color: "rgba(6,182,212,0.5)" }}> /&gt;</span>
      </p>
      <h2 className="s-title" style={{ opacity: started ? 1 : 0, transform: started ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>
        {t.title} <span style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{t.highlight}</span>
      </h2>

      <div className="magazine-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px 1fr", gap: "40px 36px", alignItems: "start" }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.15s" }}>
            <p style={{ fontSize: 14.5, lineHeight: 2, color: "#8BA4C8", fontFamily: "'Outfit',sans-serif", borderLeft: "2px solid rgba(59,130,246,0.2)", paddingLeft: 16, margin: 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginRight: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", padding: "1px 10px", borderRadius: 100, fontSize: 11, color: "#34D399", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, verticalAlign: "middle" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.8)", animation: "pulse-green 2s infinite", display: "inline-block" }} />
                {t.available}
              </span>
              {data.about}
            </p>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 18px", background: "rgba(15,31,56,0.7)", border: "1px solid rgba(59,130,246,0.14)", borderRadius: 12, width: "fit-content", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.4s", animation: started ? "locationPulse 4s ease-in-out infinite 1s" : "none" }}>
            <div style={{ position: "relative" }}>
              <span style={{ fontSize: 20 }}>📍</span>
              <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: "rgba(239,68,68,0.15)", animation: "pinPulse 2s ease-in-out infinite", pointerEvents: "none" }} />
            </div>
            <div>
              <div style={{ fontSize: 9.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 2 }}>{t.location_label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>{data.location}</div>
            </div>
            <div style={{ width: 1, height: 28, background: "rgba(59,130,246,0.15)", margin: "0 4px" }} />
            <div style={{ fontSize: 10, color: "var(--cyan)", fontFamily: "'JetBrains Mono',monospace" }}>{t.remote}</div>
          </div>

          <div style={{ height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.2),transparent)", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }} />

          <div style={{ opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.5s,transform 0.6s ease 0.5s" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>{t.seeking_title}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {seekingItems.map((item, i) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 100, background: `${item.color}10`, border: `1px solid ${item.color}35`, opacity: started ? 1 : 0, transform: started ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)", transition: `opacity 0.5s ease ${600 + i * 80}ms, transform 0.5s cubic-bezier(.34,1.56,.64,1) ${600 + i * 80}ms`, cursor: "default" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, boxShadow: `0 0 8px ${item.color}`, flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: item.color, fontFamily: "'Outfit',sans-serif" }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'Outfit',sans-serif", marginTop: 10, lineHeight: 1.6 }}>{t.seeking_sub}</div>
          </div>
        </div>

        {/* CENTER — Neon Border Card */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 8, paddingBottom: 52 }}>
          <NeonBorderCard started={started} />
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>{t.quick_stats}</div>
            <div style={{ height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.3),transparent)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {stats.map(({ n, l, icon, color }, i) => <StatCard key={l} n={n} l={l} icon={icon} color={color} delay={550 + i * 120} started={started} />)}
          </div>
          <div style={{ height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.2),transparent)", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }} />
          <div style={{ opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.65s,transform 0.6s ease 0.65s" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>{t.skill_label}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {skillsData.map((skill, i) => <CircularSkill key={skill.name} skill={skill} index={i} started={started} />)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatBadge{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-5px)}}
        @keyframes pulse-green{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)}70%{box-shadow:0 0 0 7px rgba(16,185,129,0)}}
        @keyframes pinPulse{0%,100%{opacity:0;transform:scale(1)}50%{opacity:1;transform:scale(1.6)}}
        @keyframes locationPulse{0%,100%{box-shadow:none}50%{box-shadow:0 0 20px rgba(59,130,246,0.1)}}
        @media(max-width:1000px){
          .magazine-grid{grid-template-columns:1fr 240px !important;}
          .magazine-grid>:nth-child(1){grid-column:1;grid-row:2;}
          .magazine-grid>:nth-child(2){grid-column:1/-1;grid-row:1;padding-bottom:50px;}
          .magazine-grid>:nth-child(3){grid-column:2;grid-row:2;}
        }
        @media(max-width:700px){
          .magazine-grid{grid-template-columns:1fr !important;}
          .magazine-grid>:nth-child(1){grid-column:1;grid-row:2;}
          .magazine-grid>:nth-child(2){grid-column:1;grid-row:1;}
          .magazine-grid>:nth-child(3){grid-column:1;grid-row:3;}
        }
      `}</style>
    </section>
  );
};

export default About;
