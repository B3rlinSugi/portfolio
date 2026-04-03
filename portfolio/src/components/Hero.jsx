import { data } from "../data/portfolioData";
import { useEffect, useRef, useState, useContext } from "react";
import { LangContext } from "../LangContext";
import { i18n } from "../i18n";
import { useScrollAnimation } from "../useScrollAnimation";

/* ── Aurora Background ── */
const AuroraBackground = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
    {/* Aurora waves */}
    <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "80%", height: "70%", background: "radial-gradient(ellipse, rgba(29,78,216,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)", animation: "aurora1 12s ease-in-out infinite", filter: "blur(40px)", borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%" }} />
    <div style={{ position: "absolute", top: "10%", right: "-15%", width: "65%", height: "60%", background: "radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)", animation: "aurora2 15s ease-in-out infinite", filter: "blur(50px)", borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%" }} />
    <div style={{ position: "absolute", bottom: "0%", left: "20%", width: "70%", height: "50%", background: "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, rgba(29,78,216,0.07) 50%, transparent 70%)", animation: "aurora3 18s ease-in-out infinite", filter: "blur(60px)", borderRadius: "50% 50% 60% 40% / 40% 50% 50% 60%" }} />
    <div style={{ position: "absolute", top: "40%", left: "30%", width: "50%", height: "40%", background: "radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)", animation: "aurora4 20s ease-in-out infinite", filter: "blur(55px)" }} />

    {/* Subtle grid */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse at center,black 20%,transparent 80%)" }} />

    <style>{`
      @keyframes aurora1{0%,100%{transform:translate(0,0) scale(1) rotate(0deg)}33%{transform:translate(5%,8%) scale(1.1) rotate(5deg)}66%{transform:translate(-3%,4%) scale(0.95) rotate(-3deg)}}
      @keyframes aurora2{0%,100%{transform:translate(0,0) scale(1) rotate(0deg)}40%{transform:translate(-6%,5%) scale(1.08) rotate(-4deg)}70%{transform:translate(3%,-3%) scale(0.92) rotate(6deg)}}
      @keyframes aurora3{0%,100%{transform:translate(0,0) scale(1)}30%{transform:translate(4%,-6%) scale(1.12)}60%{transform:translate(-5%,4%) scale(0.9)}}
      @keyframes aurora4{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-4%,5%) scale(1.15)}}
    `}</style>
  </div>
);

/* ── Floating Photo with Glow Ring ── */
const HologramPhoto = ({ visible }) => {
  return (
    <div style={{ position:"relative", width:320, height:320, flexShrink:0, opacity:visible?1:0, transition:"opacity 0.8s ease 0.5s" }}>
      {/* Outer rotating rings */}
      <div style={{ position:"absolute", inset:-24, borderRadius:"50%", border:"1px solid rgba(6,182,212,0.3)", animation:"holoRing1 3s linear infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:-40, borderRadius:"50%", border:"1px dashed rgba(59,130,246,0.2)", animation:"holoRing2 5s linear infinite reverse", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:-56, borderRadius:"50%", border:"1px solid rgba(139,92,246,0.15)", animation:"holoRing1 8s linear infinite", pointerEvents:"none" }} />
      {/* Rotating beam */}
      <div style={{ position:"absolute", inset:-24, borderRadius:"50%", background:"conic-gradient(from 0deg,transparent 0deg,rgba(6,182,212,0.4) 20deg,transparent 40deg)", animation:"holoBeam 2.5s linear infinite", pointerEvents:"none", filter:"blur(2px)" }} />
      {/* Photo */}
      <div style={{ width:320, height:320, borderRadius:"50%", overflow:"hidden", border:"2px solid rgba(6,182,212,0.5)", boxShadow:"0 0 30px rgba(6,182,212,0.3),0 0 60px rgba(29,78,216,0.2),inset 0 0 30px rgba(6,182,212,0.05)", position:"relative", zIndex:2 }}>
        <img src="/foto.jpg" alt="Berlin Sugiyanto" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}
          onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} />
        <div style={{ display:"none", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", background:"var(--navy-3)" }}>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:52, color:"var(--blue-3)" }}>BS</span>
        </div>
        {/* Scanlines */}
        <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(6,182,212,0.025) 3px,rgba(6,182,212,0.025) 4px)", borderRadius:"50%", pointerEvents:"none", zIndex:3 }} />
        {/* Color shift */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"linear-gradient(135deg,rgba(6,182,212,0.08) 0%,transparent 50%,rgba(59,130,246,0.06) 100%)", animation:"holoShift 4s ease-in-out infinite", pointerEvents:"none", zIndex:4 }} />
        {/* Flicker */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"rgba(6,182,212,0.04)", animation:"holoFlicker 6s ease-in-out infinite", pointerEvents:"none", zIndex:5 }} />
      </div>
      {/* Corner dots */}
      {[0,90,180,270].map((deg,i)=>{
        const rad=(deg*Math.PI)/180, r=172;
        const x=160+r*Math.cos(rad), y=160+r*Math.sin(rad);
        const colors=["#06B6D4","#3B82F6","#8B5CF6","#06B6D4"];
        return <div key={i} style={{ position:"absolute", width:10, height:10, borderRadius:"50%", background:colors[i], boxShadow:`0 0 14px ${colors[i]},0 0 28px ${colors[i]}50`, left:x-5, top:y-5, zIndex:6, animation:`dotFloat${i%3} ${2+i*0.4}s ease-in-out infinite` }} />;
      })}
      <style>{`
        @keyframes holoRing1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes holoRing2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes holoBeam{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes holoShift{0%,100%{opacity:0.6}50%{opacity:1}}
        @keyframes holoFlicker{0%,100%{opacity:1}92%{opacity:1}93%{opacity:0.6}94%{opacity:1}96%{opacity:0.7}97%{opacity:1}}
        @keyframes dotFloat0{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes dotFloat1{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes dotFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      `}</style>
    </div>
  );
};

const FloatingPhoto = ({ visible }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = e => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({ x: ((e.clientY - cy) / (rect.height / 2)) * 6, y: -((e.clientX - cx) / (rect.width / 2)) * 6 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{
        position: "relative", width: 300, height: 300, flexShrink: 0,
        opacity: visible ? 1 : 0,
        animation: visible ? "photoFloat 5s ease-in-out infinite" : "none",
        transition: "opacity 0.8s ease 0.5s",
      }}
    >
      {/* Outer rotating ring 1 */}
      <div style={{ position: "absolute", inset: -20, borderRadius: "50%", border: "1.5px solid transparent", background: "linear-gradient(rgba(6,14,30,0),rgba(6,14,30,0)) padding-box, linear-gradient(135deg,#3B82F6,transparent 50%,#06B6D4) border-box", animation: "ringRotate1 7s linear infinite", pointerEvents: "none" }} />
      {/* Outer rotating ring 2 */}
      <div style={{ position: "absolute", inset: -30, borderRadius: "50%", border: "1px solid transparent", background: "linear-gradient(rgba(6,14,30,0),rgba(6,14,30,0)) padding-box, linear-gradient(225deg,#8B5CF6,transparent 55%,#06B6D4) border-box", animation: "ringRotate2 11s linear infinite", pointerEvents: "none" }} />
      {/* Glow pulse */}
      <div style={{ position: "absolute", inset: -12, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.22),rgba(6,182,212,0.1) 55%,transparent 75%)", animation: "glowPulse 3.5s ease-in-out infinite", filter: "blur(8px)", pointerEvents: "none" }} />

      {/* Photo container */}
      <div style={{
        width: 300, height: 300, borderRadius: "50%", overflow: "hidden",
        border: "3px solid rgba(59,130,246,0.4)",
        boxShadow: "0 0 0 1px rgba(6,182,212,0.15), 0 30px 70px rgba(0,0,0,0.6)",
        position: "relative", zIndex: 2,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.3s ease",
      }}>
        <img src="/foto2.jpg" alt="Berlin Sugiyanto"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
        <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "var(--navy-3)", flexDirection: "column" }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 52, color: "var(--blue-3)" }}>BS</span>
        </div>
        {/* Shine overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(6,182,212,0.04) 100%)", borderRadius: "50%", pointerEvents: "none" }} />
      </div>

      {/* Floating dots on ring */}
      {[0, 120, 240].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 160;
        const x = 150 + r * Math.cos(rad);
        const y = 150 + r * Math.sin(rad);
        const colors = ["#3B82F6", "#06B6D4", "#8B5CF6"];
        return <div key={i} style={{ position: "absolute", width: 9, height: 9, borderRadius: "50%", background: colors[i], boxShadow: `0 0 12px ${colors[i]}`, left: x - 4.5, top: y - 4.5, zIndex: 5, animation: `dotFloat${i} ${2.5 + i * 0.6}s ease-in-out infinite` }} />;
      })}

      <style>{`
        @keyframes photoFloat{0%,100%{transform:translateY(0px)}50%{transform:translateY(-14px)}}
        @keyframes ringRotate1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes ringRotate2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes glowPulse{0%,100%{opacity:0.55;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes dotFloat0{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes dotFloat1{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes dotFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      `}</style>
    </div>
  );
};

/* ── Neon Glow Metric ── */
const NeonMetric = ({ n, l, i }) => {
  const [v, setV] = useState(0);
  const [glowing, setGlowing] = useState(false);
  const end = parseFloat(n), suffix = n.replace(/[\d.]/g, ""), isFloat = n.includes(".");
  const colors = ["#3B82F6", "#06B6D4", "#8B5CF6"];
  const color = colors[i % colors.length];

  useEffect(() => {
    const t = setTimeout(() => {
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
        setV(isFloat ? (e * end).toFixed(2) : Math.floor(e * end));
        if (p < 1) requestAnimationFrame(tick);
        else { setGlowing(true); setTimeout(() => setGlowing(false), 800); }
      };
      requestAnimationFrame(tick);
    }, 900 + i * 180);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      padding: "16px 24px", borderRadius: 14,
      background: "rgba(15,31,56,0.7)",
      border: `1px solid ${glowing ? color + "60" : "rgba(59,130,246,0.15)"}`,
      position: "relative", overflow: "hidden",
      animation: `fadeUp 0.6s cubic-bezier(.22,1,.36,1) ${0.7 + i * 0.1}s both`,
      minWidth: 110, textAlign: "center",
      boxShadow: glowing ? `0 0 30px ${color}30, 0 0 60px ${color}10` : "none",
      transition: "border-color 0.4s, box-shadow 0.4s",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${color},${color}80)` }} />
      {/* Neon pulse overlay */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at center,${color}08,transparent 70%)`, animation: `neonPulse${i} 2.5s ease-in-out infinite ${i * 0.4}s`, pointerEvents: "none" }} />
      <div style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 30, fontWeight: 700, color: "#F0F6FF", lineHeight: 1, letterSpacing: "-1px", textShadow: glowing ? `0 0 20px ${color}` : "none", transition: "text-shadow 0.4s", position: "relative" }}>{v}{suffix}</div>
      <div style={{ fontSize: 9, color: "#6B84A8", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 6, fontFamily: "'JetBrains Mono',monospace" }}>{l}</div>
      <style>{`
        @keyframes neonPulse${i}{0%,100%{opacity:0.4}50%{opacity:0.9}}
      `}</style>
    </div>
  );
};

/* ── Scan Highlight Title ── */
const ScanTitle = ({ text, visible }) => (
  <div style={{
    fontSize: "clamp(11px,1.1vw,13px)", color: "var(--muted)", fontWeight: 400,
    letterSpacing: "6px", textTransform: "uppercase",
    fontFamily: "'JetBrains Mono',monospace", marginBottom: 22,
    animation: "fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.3s both",
    position: "relative", display: "inline-block", overflow: "hidden",
  }}>
    {text}
    {/* Scan light */}
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      background: "linear-gradient(90deg,transparent 0%,rgba(6,182,212,0.4) 50%,transparent 100%)",
      backgroundSize: "200% 100%",
      animation: visible ? "scanLight 2.5s ease-in-out infinite 1s" : "none",
      pointerEvents: "none",
    }} />
    <style>{`@keyframes scanLight{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
  </div>
);

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [scrollRef, isScrollVisible] = useScrollAnimation();
  const lang = useContext(LangContext);
  const t = i18n[lang].hero;
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 0, maxWidth: "none", overflow: "hidden", background: "var(--navy)" }}>
      <AuroraBackground />

      {/* ── Content ── */}
      <div ref={scrollRef} className={`reveal ${isScrollVisible ? 'visible' : ''} hero-layout`} style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "100px 48px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60, width: "100%" }}>

        {/* LEFT: text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {/* Status badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)", padding: "7px 18px", borderRadius: 100, marginBottom: 32, animation: "fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.1s both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#06B6D4", boxShadow: "0 0 8px rgba(6,182,212,0.8)", animation: "pulse-dot 2s infinite", flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--cyan)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px" }}>{t.badge}</span>
            <span style={{ width: 1, height: 12, background: "rgba(6,182,212,0.3)" }} />
            <span style={{ fontSize: 11, color: "#6B84A8", fontFamily: "'Outfit',sans-serif" }}>{t.role}</span>
          </div>

          {/* Name with Clash Display */}
          <h1 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-3px", margin: "0 0 18px", animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.2s both" }}>
            <span style={{ display: "block", fontSize: "clamp(58px,8.5vw,108px)", color: "#FFFFFF" }}>Berlin</span>
            <span style={{
              display: "block", fontSize: "clamp(58px,8.5vw,108px)",
              background: "linear-gradient(135deg,#3B82F6,#06B6D4 50%,#38BDF8)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
              backgroundSize: "200%", animation: "gradShift 4s ease infinite",
            }}>Sugiyanto</span>
          </h1>

          <ScanTitle text={t.dev_role} visible={visible} />

          <p style={{ fontSize: 15, color: "#8BA4C8", maxWidth: 420, lineHeight: 1.9, marginBottom: 36, fontFamily: "'Outfit',sans-serif", animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.35s both" }}>
            {t.tagline}
          </p>

          {/* Available for roles badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", padding: "10px 16px", borderRadius: 8, marginBottom: 32, animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.38s both" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.8)", flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#34D399", fontFamily: "'Outfit',sans-serif" }}>Available for full-time backend roles</span>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48, animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.42s both" }} className="hero-btns">
            <a href={data.github} target="_blank" rel="noreferrer" className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              {t.github}
            </a>
            <button onClick={() => go("contact")} className="btn-outline">{t.touch}</button>
            <a href="/cv.pdf" download style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 20px", borderRadius: 8, background: "rgba(6,182,212,0.07)", color: "var(--cyan)", fontSize: 13.5, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(6,182,212,0.25)", fontFamily: "'Outfit',sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.14)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,182,212,0.07)"; e.currentTarget.style.transform = "none"; }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              {t.cv}
            </a>
          </div>

          {/* Neon Metrics */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.5s both" }}>
            {[["3.63", t.gpa], ["4+", t.projects], ["3yr", t.org]].map(([n, l], i) => <NeonMetric key={n} n={n} l={l} i={i} />)}
          </div>
        </div>

        {/* RIGHT: hologram photo */}
        <div className="hero-photo" style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <HologramPhoto visible={visible} />
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "fadeUp 0.6s ease 1.2s both", opacity: 0.45 }}>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase" }}>{t.scroll}</span>
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom,rgba(6,182,212,0.7),transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700&display=swap');
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(6,182,212,.5)}70%{box-shadow:0 0 0 9px rgba(6,182,212,0)}}
        @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes scrollPulse{0%,100%{opacity:0.4}50%{opacity:1}}
        @media(max-width:900px){
          .hero-layout{flex-direction:column !important;align-items:center !important;text-align:center !important;padding:88px 24px 60px !important;}
          .hero-layout>div:first-child{align-items:center !important;}
          .hero-btns{flex-direction:column;align-items:center;}
          .hero-btns a,.hero-btns button{justify-content:center;width:100%;max-width:280px;}
          .hero-photo{order:-1;}
        }
      `}</style>
    </section>
  );
};

export default Hero;
