import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

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

/* ── Glow ring pulse photo ── */
const PhotoGlowRing = ({ started }) => {
  return (
    <div style={{ position: "relative", opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.2s" }}>

      {/* Outer ring 1 — slow rotate */}
      <div style={{
        position: "absolute", inset: -14,
        borderRadius: "50%",
        border: "2px solid transparent",
        background: "linear-gradient(rgba(6,14,30,0),rgba(6,14,30,0)) padding-box, linear-gradient(135deg,#3B82F6,transparent 60%,#06B6D4) border-box",
        animation: "ringRotate1 6s linear infinite",
        pointerEvents: "none",
      }} />

      {/* Outer ring 2 — counter rotate */}
      <div style={{
        position: "absolute", inset: -22,
        borderRadius: "50%",
        border: "1.5px solid transparent",
        background: "linear-gradient(rgba(6,14,30,0),rgba(6,14,30,0)) padding-box, linear-gradient(225deg,#06B6D4,transparent 55%,#8B5CF6) border-box",
        animation: "ringRotate2 9s linear infinite",
        pointerEvents: "none",
      }} />

      {/* Glow pulse behind */}
      <div style={{
        position: "absolute", inset: -8,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(59,130,246,0.18),rgba(6,182,212,0.08) 60%,transparent 80%)",
        animation: "glowPulse 3s ease-in-out infinite",
        pointerEvents: "none",
        filter: "blur(6px)",
      }} />

      {/* Photo circle */}
      <div style={{
        position: "relative", zIndex: 2,
        width: 260, height: 260,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid rgba(59,130,246,0.35)",
        boxShadow: "0 0 0 1px rgba(6,182,212,0.15), 0 24px 60px rgba(0,0,0,0.5)",
      }}>
        <img src="/foto2.jpg" alt="Berlin Sugiyanto"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
        <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "var(--navy-3)", flexDirection: "column" }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 40, color: "var(--blue-3)" }}>BS</span>
        </div>
        {/* Overlay gradient bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top,rgba(6,14,30,0.8),transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", zIndex: 3 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#F0F6FF", fontFamily: "'Outfit',sans-serif" }}>Berlin Sugiyanto</div>
          <div style={{ fontSize: 9.5, color: "var(--cyan)", fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>backend_dev · 2025</div>
        </div>
      </div>

      {/* Floating dot indicators on ring */}
      {[0, 120, 240].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 144;
        const x = 130 + r * Math.cos(rad);
        const y = 130 + r * Math.sin(rad);
        const colors = ["#3B82F6", "#06B6D4", "#8B5CF6"];
        return (
          <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: colors[i], boxShadow: `0 0 10px ${colors[i]}`, left: x - 4, top: y - 4, zIndex: 5, animation: `dotFloat${i} ${2.5 + i * 0.5}s ease-in-out infinite` }} />
        );
      })}

      {/* University badge */}
      <div style={{ position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)", background: "rgba(10,22,40,0.97)", border: "1px solid rgba(59,130,246,0.22)", borderRadius: 12, padding: "9px 16px", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(14px)", whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(0,0,0,0.45)", zIndex: 5, animation: "floatBadge 5s ease-in-out infinite" }}>
        <img src="https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Logo_Universitas_Gunadarma.png/220px-Logo_Universitas_Gunadarma.png" alt="UG" style={{ height: 22, objectFit: "contain", flexShrink: 0 }} onError={e => { e.target.style.display = "none"; }} />
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>Universitas Gunadarma</div>
          <div style={{ fontSize: 9, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>Informatics Eng · GPA 3.63</div>
        </div>
      </div>
    </div>
  );
};

/* ── Skill cards grid ── */
const skillsData = [
  { name: "PHP",        level: "Proficient", pct: 88, color: "#6366F1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
  { name: "Laravel",    level: "Proficient", pct: 82, color: "#EF4444", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
  { name: "Java",       level: "Intermediate", pct: 72, color: "#F59E0B", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "MySQL",      level: "Proficient", pct: 85, color: "#06B6D4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "REST API",   level: "Proficient", pct: 80, color: "#10B981", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Git",        level: "Intermediate", pct: 78, color: "#F97316", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const levelColors = { "Proficient": "#10B981", "Intermediate": "#F59E0B", "Junior": "#6B84A8" };

const SkillCard = ({ skill, index, started }) => {
  const [hovered, setHovered] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setBarWidth(skill.pct), index * 100 + 600);
    return () => clearTimeout(t);
  }, [started]);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 14px 12px",
        background: hovered ? `${skill.color}0D` : "rgba(15,31,56,0.6)",
        border: `1px solid ${hovered ? skill.color + "35" : "rgba(59,130,246,0.1)"}`,
        borderRadius: 12,
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
        transition: `opacity 0.5s ease ${index * 80 + 500}ms, transform 0.5s cubic-bezier(.22,1,.36,1) ${index * 80 + 500}ms, background 0.2s, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hovered ? `0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px ${skill.color}20` : "none",
        cursor: "default",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: hovered ? `${skill.color}18` : "rgba(15,31,56,0.9)", border: `1px solid ${hovered ? skill.color + "30" : "rgba(59,130,246,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
          <img src={skill.icon} alt={skill.name} style={{ width: 18, height: 18, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: hovered ? "var(--white)" : "var(--white-2)", fontFamily: "'Outfit',sans-serif", transition: "color 0.2s" }}>{skill.name}</div>
          <div style={{ fontSize: 9.5, fontWeight: 600, color: levelColors[skill.level] || "#6B84A8", fontFamily: "'JetBrains Mono',monospace" }}>{skill.level}</div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: hovered ? skill.color : "var(--muted)", fontFamily: "'Outfit',sans-serif", transition: "color 0.2s" }}>{skill.pct}%</div>
      </div>
      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(59,130,246,0.1)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: barWidth + "%", background: `linear-gradient(to right,${skill.color},${skill.color}80)`, borderRadius: 4, transition: "width 0.9s cubic-bezier(.22,1,.36,1)", boxShadow: `0 0 6px ${skill.color}60` }} />
      </div>
    </div>
  );
};

const StatCard = ({ n, l, icon, delay, started }) => {
  const num = parseFloat(n), suffix = n.replace(/[\d.]/g, "");
  const count = useCounter(num, 1600, started);
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ padding: "18px 16px", background: hovered ? "rgba(29,78,216,0.12)" : "rgba(15,31,56,0.6)", border: `1px solid ${hovered ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.12)"}`, borderRadius: 14, position: "relative", overflow: "hidden", opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(20px)", transition: `opacity .55s ease ${delay}ms,transform .55s cubic-bezier(.22,1,.36,1) ${delay}ms,background .2s,border-color .2s`, cursor: "default" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hovered ? "linear-gradient(to right,#1D4ED8,#06B6D4)" : "linear-gradient(to right,rgba(29,78,216,0.2),transparent)", transition: "background 0.3s" }} />
      <div style={{ fontSize: 18, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 32, fontWeight: 800, color: "var(--white)", lineHeight: 1, letterSpacing: "-1.5px" }}>{count}{suffix}</div>
      <div style={{ fontSize: 9.5, color: hovered ? "var(--cyan)" : "var(--muted)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 6, fontFamily: "'JetBrains Mono',monospace", transition: "color 0.2s" }}>{l}</div>
    </div>
  );
};

const WorkChip = ({ label, delay, started }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 9, background: hovered ? "rgba(6,182,212,0.12)" : "rgba(6,182,212,0.05)", border: `1px solid ${hovered ? "rgba(6,182,212,0.4)" : "rgba(6,182,212,0.15)"}`, transform: hovered ? "translateY(-2px)" : started ? "translateY(0)" : "translateY(10px)", opacity: started ? 1 : 0, transition: `opacity 0.5s ease ${delay}ms,transform 0.4s cubic-bezier(.22,1,.36,1) ${delay}ms,background 0.2s`, cursor: "default" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cyan)", flexShrink: 0 }} />
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
    { n: "3.63", l: "GPA / 4.00", icon: "🎓" },
    { n: "3",    l: "Projects",    icon: "⚙️" },
    { n: "3",    l: "Org Periods", icon: "🏛️" },
    { n: "5",    l: "Tech Stacks", icon: "🛠️" },
  ];

  return (
    <section id="about" ref={ref} style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(59,130,246,0.07)" }}>
      <p className="s-label" style={{ opacity: started ? 1 : 0, transition: "opacity .5s" }}>about_me</p>
      <h2 className="s-title" style={{ opacity: started ? 1 : 0, transform: started ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>Who I am</h2>

      <div className="magazine-grid" style={{ display: "grid", gridTemplateColumns: "1fr 300px 1fr", gap: "40px 36px", alignItems: "start" }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10.5, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#34D399", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", padding: "5px 14px", borderRadius: 100, fontFamily: "'JetBrains Mono',monospace", width: "fit-content", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.15s" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.6)", animation: "pulse-green 2s infinite" }} />
            Available · Building Backend Systems
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 2, color: "#8BA4C8", fontFamily: "'Outfit',sans-serif", opacity: started ? 1 : 0, transition: "opacity 0.6s ease 0.25s", borderLeft: "2px solid rgba(59,130,246,0.2)", paddingLeft: 16 }}>{data.about}</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "rgba(15,31,56,0.7)", border: "1px solid rgba(59,130,246,0.14)", borderRadius: 10, width: "fit-content", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.4s" }}>
            <span style={{ fontSize: 15 }}>📍</span>
            <div>
              <div style={{ fontSize: 9.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 1 }}>Location</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>{data.location}</div>
            </div>
          </div>
          <div style={{ height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.2),transparent)", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }} />
          <div style={{ opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.5s,transform 0.6s ease 0.5s" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>Currently seeking</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Full-time","Hybrid","Magang","Kontrak"].map((t, i) => <WorkChip key={t} label={t} delay={560 + i * 80} started={started} />)}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'Outfit',sans-serif", marginTop: 10, lineHeight: 1.6 }}>Junior Backend Developer — Jabodetabek or remote worldwide.</div>
          </div>
        </div>

        {/* CENTER — Glow ring photo */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 8, paddingBottom: 40 }}>
          <PhotoGlowRing started={started} />
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>quick stats</div>
            <div style={{ height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.3),transparent)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="about-stats">
            {stats.map(({ n, l, icon }, i) => <StatCard key={l} n={n} l={l} icon={icon} delay={550 + i * 120} started={started} />)}
          </div>
          <div style={{ height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.2),transparent)", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }} />

          {/* ── Skill cards grid ── */}
          <div style={{ opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.65s,transform 0.6s ease 0.65s" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>skill level</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {skillsData.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} started={started} />)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ringRotate1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes ringRotate2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes glowPulse{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes floatBadge{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-5px)}}
        @keyframes pulse-green{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)}70%{box-shadow:0 0 0 7px rgba(16,185,129,0)}}
        @keyframes dotFloat0{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes dotFloat1{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes dotFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @media(max-width:1000px){
          .magazine-grid{grid-template-columns:1fr 260px !important;}
          .magazine-grid>:nth-child(1){grid-column:1;grid-row:2;}
          .magazine-grid>:nth-child(2){grid-column:1/-1;grid-row:1;padding-bottom:40px;}
          .magazine-grid>:nth-child(3){grid-column:2;grid-row:2;}
        }
        @media(max-width:700px){
          .magazine-grid{grid-template-columns:1fr !important;}
          .magazine-grid>:nth-child(1){grid-column:1;grid-row:2;}
          .magazine-grid>:nth-child(2){grid-column:1;grid-row:1;}
          .magazine-grid>:nth-child(3){grid-column:1;grid-row:3;}
          .about-stats{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
    </section>
  );
};

export default About;
