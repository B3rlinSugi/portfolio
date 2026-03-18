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

/* ── 3D Tilt Photo Card ── */
const TiltPhotoCard = ({ started }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = e => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({ x: ((e.clientY - cy) / (rect.height / 2)) * 10, y: -((e.clientX - cx) / (rect.width / 2)) * 10 });
  };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={() => setHovered(true)}
      style={{
        perspective: "800px", cursor: "default",
        opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.2s",
      }}
    >
      <div style={{
        width: 260, height: 320, borderRadius: 20, overflow: "hidden", position: "relative",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
        transition: "transform 0.3s ease",
        border: "1px solid rgba(59,130,246,0.3)",
        boxShadow: hovered
          ? "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(6,182,212,0.2), 0 0 40px rgba(59,130,246,0.15)"
          : "0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.15)",
      }}>
        <img src="/foto2.jpg" alt="Berlin Sugiyanto"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
        <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "var(--navy-3)", flexDirection: "column" }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 44, color: "var(--blue-3)" }}>BS</span>
        </div>

        {/* Shine effect */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(255,255,255,${hovered ? 0.08 : 0.03}) 0%, transparent 50%, rgba(6,182,212,${hovered ? 0.06 : 0.02}) 100%)`, transition: "background 0.3s", pointerEvents: "none" }} />
        {/* Bottom gradient */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top,rgba(6,14,30,0.9),transparent)", zIndex: 2 }} />
        {/* Name overlay */}
        <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", zIndex: 3 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#F0F6FF", fontFamily: "'Outfit',sans-serif" }}>Berlin Sugiyanto</div>
          <div style={{ fontSize: 9.5, color: "var(--cyan)", fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>backend_dev · 2025</div>
        </div>

        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: "linear-gradient(to right,#1D4ED8,#06B6D4)", zIndex: 3 }} />
      </div>

      {/* University badge — moved lower to avoid overlap */}
      <div style={{ position: "absolute", bottom: -42, left: "50%", transform: "translateX(-50%)", background: "rgba(10,22,40,0.97)", border: "1px solid rgba(59,130,246,0.22)", borderRadius: 12, padding: "9px 16px", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(14px)", whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(0,0,0,0.45)", zIndex: 5, animation: "floatBadge 5s ease-in-out infinite" }}>
        <img src="https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Logo_Universitas_Gunadarma.png/220px-Logo_Universitas_Gunadarma.png" alt="UG" style={{ height: 22, objectFit: "contain", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>Universitas Gunadarma</div>
          <div style={{ fontSize: 9, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace" }}>Informatics Eng · GPA 3.63</div>
        </div>
      </div>
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

/* ── Skill Icon — clean grid, no percentage, bright icons ── */
const SkillIcon = ({ skill, index, started }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
        opacity: started ? 1 : 0,
        transform: started ? "scale(1) translateY(0)" : "scale(0.85) translateY(10px)",
        transition: `opacity 0.45s ease ${index * 80 + 300}ms, transform 0.45s cubic-bezier(.34,1.56,.64,1) ${index * 80 + 300}ms`,
        cursor: "default",
      }}>
      <div style={{
        width: 60, height: 60, borderRadius: 14,
        background: hovered ? `${skill.color}18` : "rgba(15,31,56,0.5)",
        border: `1px solid ${hovered ? skill.color + "50" : "rgba(59,130,246,0.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        boxShadow: hovered ? `0 0 24px ${skill.color}40, 0 6px 20px rgba(0,0,0,0.2)` : "none",
        transform: hovered ? "translateY(-4px) scale(1.08)" : "none",
      }}>
        <img src={skill.icon} alt={skill.name}
          style={{
            width: 36, height: 36, objectFit: "contain",
            filter: hovered
              ? `drop-shadow(0 0 8px ${skill.color}) brightness(1.5) saturate(1.3)`
              : "brightness(1.8) saturate(1.3) contrast(1.1)",
            transition: "filter 0.25s ease",
          }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
        />
        <span style={{ display: "none", fontSize: 14, color: skill.color, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{skill.name[0]}</span>
      </div>
      <span style={{ fontSize: 10.5, fontWeight: 600, color: hovered ? "var(--white)" : "var(--white-2)", fontFamily: "'Outfit',sans-serif", transition: "color 0.2s", textAlign: "center" }}>{skill.name}</span>
    </div>
  );
};

const skillsData = [
  { name: "PHP",      color: "#8892BF", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Laravel",  color: "#FF2D20", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "Java",     color: "#F59E0B", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "MySQL",    color: "#00758F", icon: "https://cdn.simpleicons.org/mysql/00758F" },
  { name: "REST API", color: "#10B981", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "Git",      color: "#F05032", icon: "https://cdn.simpleicons.org/git/F05032" },
];

const seekingItems = [
  { label: "Full-time", color: "#3B82F6" },
  { label: "Hybrid",    color: "#06B6D4" },
  { label: "Internship",    color: "#8B5CF6" },
  { label: "Kontrak",   color: "#10B981" },
];

const About = () => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { setStarted(e.isIntersecting); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { n: "3.63", l: "GPA / 4.00", icon: "🎓", color: "#3B82F6" },
    { n: "4",    l: "Projects",    icon: "⚙️",  color: "#06B6D4" },
    { n: "3",    l: "Org Periods", icon: "🏛️", color: "#8B5CF6" },
    { n: "5",    l: "Tech Stacks", icon: "🛠️", color: "#10B981" },
  ];

  return (
    <section id="about" ref={ref} style={{ background: "var(--navy-2)", borderTop: "1px solid rgba(59,130,246,0.07)" }}>

      {/* JSX tag label */}
      <p className="s-label" style={{ opacity: started ? 1 : 0, transition: "opacity .5s", fontFamily: "'JetBrains Mono',monospace" }}>
        <span style={{ color: "rgba(6,182,212,0.5)" }}>&lt;</span>
        about
        <span style={{ color: "rgba(6,182,212,0.5)" }}> /&gt;</span>
      </p>
      <h2 className="s-title" style={{ opacity: started ? 1 : 0, transform: started ? "none" : "translateY(16px)", transition: "opacity .6s ease .1s,transform .6s ease .1s" }}>
        The Dev Behind the <span style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Code</span>
      </h2>

      <div className="magazine-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px 1fr", gap: "40px 36px", alignItems: "start" }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Inline status — menyatu dengan bio */}
          <div style={{ opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.15s" }}>
            <p style={{ fontSize: 14.5, lineHeight: 2, color: "#8BA4C8", fontFamily: "'Outfit',sans-serif", borderLeft: "2px solid rgba(59,130,246,0.2)", paddingLeft: 16, margin: 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginRight: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", padding: "1px 10px", borderRadius: 100, fontSize: 11, color: "#34D399", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, verticalAlign: "middle" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.8)", animation: "pulse-green 2s infinite", display: "inline-block" }} />
                available
              </span>
              {data.about}
            </p>
          </div>

          {/* Location card */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 18px",
            background: "rgba(15,31,56,0.7)", border: "1px solid rgba(59,130,246,0.14)",
            borderRadius: 12, width: "fit-content",
            opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.4s",
            animation: started ? "locationPulse 4s ease-in-out infinite 1s" : "none",
          }}>
            <div style={{ position: "relative" }}>
              <span style={{ fontSize: 20 }}>📍</span>
              <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: "rgba(239,68,68,0.15)", animation: "pinPulse 2s ease-in-out infinite", pointerEvents: "none" }} />
            </div>
            <div>
              <div style={{ fontSize: 9.5, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 2 }}>Location</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>{data.location}</div>
            </div>
            <div style={{ width: 1, height: 28, background: "rgba(59,130,246,0.15)", margin: "0 4px" }} />
            <div style={{ fontSize: 10, color: "var(--cyan)", fontFamily: "'JetBrains Mono',monospace" }}>Remote OK</div>
          </div>

          <div style={{ height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.2),transparent)", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }} />

          {/* Currently seeking */}
          <div style={{ opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.5s,transform 0.6s ease 0.5s" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>Currently seeking</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {seekingItems.map((item, i) => (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 100,
                  background: `${item.color}10`, border: `1px solid ${item.color}35`,
                  opacity: started ? 1 : 0,
                  transform: started ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)",
                  transition: `opacity 0.5s ease ${600 + i * 80}ms, transform 0.5s cubic-bezier(.34,1.56,.64,1) ${600 + i * 80}ms`,
                  cursor: "default",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, boxShadow: `0 0 8px ${item.color}`, flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: item.color, fontFamily: "'Outfit',sans-serif" }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'Outfit',sans-serif", marginTop: 10, lineHeight: 1.6 }}>Junior Backend Developer — Jabodetabek or remote worldwide.</div>
          </div>
        </div>

        {/* CENTER — 3D Tilt Photo */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 8, paddingBottom: 48 }}>
          <TiltPhotoCard started={started} />
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Quick stats */}
          <div style={{ opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>quick stats</div>
            <div style={{ height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.3),transparent)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {stats.map(({ n, l, icon, color }, i) => <StatCard key={l} n={n} l={l} icon={icon} color={color} delay={550 + i * 120} started={started} />)}
          </div>

          <div style={{ height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.2),transparent)", opacity: started ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }} />

          {/* Circular skill rings */}
          <div style={{ opacity: started ? 1 : 0, transform: started ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.65s,transform 0.6s ease 0.65s" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>skill level</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {skillsData.map((skill, i) => <SkillIcon key={skill.name} skill={skill} index={i} started={started} />)}
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
