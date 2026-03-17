import { data } from "../data/portfolioData";
import { useEffect, useRef, useState } from "react";

const Metric = ({ n, l, i }) => {
  const [v, setV] = useState(0);
  const end = parseFloat(n), suffix = n.replace(/[\d.]/g, ""), isFloat = n.includes(".");
  useEffect(() => {
    const t = setTimeout(() => {
      const t0 = performance.now();
      const tick = now => { const p = Math.min((now - t0) / 1200, 1), e = 1 - Math.pow(1 - p, 3); setV(isFloat ? (e * end).toFixed(2) : Math.floor(e * end)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, 800 + i * 150);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      padding: "14px 22px", borderRadius: 12,
      background: "rgba(6,14,30,0.55)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(16px)",
      position: "relative", overflow: "hidden",
      animation: `fadeUp 0.6s cubic-bezier(.22,1,.36,1) ${0.7 + i * 0.1}s both`,
      minWidth: 110, textAlign: "center",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right,#1D4ED8,#06B6D4)" }} />
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 800, color: "#F0F6FF", lineHeight: 1, letterSpacing: "-1px" }}>{v}{suffix}</div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 5, fontFamily: "'JetBrains Mono',monospace" }}>{l}</div>
    </div>
  );
};

const Hero = () => {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "flex-end",
      position: "relative", padding: 0, maxWidth: "none", overflow: "hidden",
    }}>
      {/* ── Fullscreen background photo ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src="/foto.jpg" alt="bg" onLoad={() => setLoaded(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block",
            opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease",
            filter: "brightness(0.42) saturate(0.75)",
          }}
          onError={e => { e.target.style.display = "none"; }}
        />
        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,14,30,0.25) 0%, rgba(6,14,30,0.05) 30%, rgba(6,14,30,0.55) 65%, rgba(6,14,30,0.98) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 35%, rgba(6,14,30,0.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "55%", height: "55%", background: "radial-gradient(ellipse at bottom left, rgba(29,78,216,0.18), transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "40%", height: "45%", background: "radial-gradient(ellipse at bottom right, rgba(6,182,212,0.1), transparent 65%)", pointerEvents: "none" }} />
      </div>

      {/* ── Content bottom-center ── */}
      <div style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: 900,
        margin: "0 auto", padding: "0 48px 80px",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      }} className="hero-content">

        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.25)",
          padding: "7px 18px", borderRadius: 100, marginBottom: 24,
          backdropFilter: "blur(12px)",
          animation: "fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.2s both",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#06B6D4", boxShadow: "0 0 8px rgba(6,182,212,0.8)", animation: "pulse-dot 2s infinite", flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--cyan)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px" }}>Open to Work</span>
          <span style={{ width: 1, height: 12, background: "rgba(6,182,212,0.3)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "'Outfit',sans-serif" }}>Junior Backend Developer</span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Outfit',sans-serif", fontWeight: 900, lineHeight: 0.88,
          letterSpacing: "-4px", margin: "0 0 16px",
          animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.3s both",
        }}>
          <span style={{ display: "block", fontSize: "clamp(60px,9.5vw,114px)", color: "#FFFFFF", textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}>Berlin</span>
          <span style={{
            display: "block", fontSize: "clamp(60px,9.5vw,114px)",
            background: "linear-gradient(135deg,#3B82F6,#06B6D4 50%,#38BDF8)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            backgroundSize: "200%", animation: "gradShift 4s ease infinite",
            filter: "drop-shadow(0 0 30px rgba(6,182,212,0.3))",
          }}>Sugiyanto</span>
        </h1>

        <div style={{
          fontSize: "clamp(11px,1.1vw,14px)", color: "rgba(255,255,255,0.4)",
          fontWeight: 400, letterSpacing: "5px", textTransform: "uppercase",
          fontFamily: "'JetBrains Mono',monospace", marginBottom: 20,
          animation: "fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.4s both",
        }}>Backend Developer</div>

        <p style={{
          fontSize: 15, color: "rgba(255,255,255,0.52)", maxWidth: 460, lineHeight: 1.9, marginBottom: 36,
          fontFamily: "'Outfit',sans-serif",
          animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.45s both",
        }}>{data.tagline}</p>

        {/* CTA */}
        <div style={{
          display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44, justifyContent: "center",
          animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.52s both",
        }} className="hero-btns">
          <a href={data.github} target="_blank" rel="noreferrer" className="btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            GitHub
          </a>
          <button onClick={() => go("contact")} className="btn-outline">Get in Touch</button>
          <a href="/cv.pdf" download style={{
            display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 20px", borderRadius: 8,
            background: "rgba(6,182,212,0.08)", color: "var(--cyan)", fontSize: 13.5, fontWeight: 600,
            textDecoration: "none", border: "1px solid rgba(6,182,212,0.25)", fontFamily: "'Outfit',sans-serif",
            backdropFilter: "blur(8px)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.16)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,182,212,0.08)"; e.currentTarget.style.transform = "none"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Download CV
          </a>
        </div>

        {/* Metrics */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.6s both" }}>
          {[["3.63", "GPA / 4.00"], ["3+", "Projects"], ["3yr", "Org Exp"]].map(([n, l], i) => (
            <Metric key={l} n={n} l={l} i={i} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "fadeUp 0.6s ease 1.3s both", opacity: 0.45 }}>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", textTransform: "uppercase" }}>scroll</span>
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom,rgba(6,182,212,0.7),transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(6,182,212,.5)}70%{box-shadow:0 0 0 9px rgba(6,182,212,0)}}
        @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes scrollPulse{0%,100%{opacity:0.4}50%{opacity:1}}
        @media(max-width:600px){
          .hero-content{padding:0 24px 56px !important;}
          .hero-btns{flex-direction:column;align-items:center;}
          .hero-btns a,.hero-btns button{justify-content:center;width:100%;max-width:280px;}
        }
      `}</style>
    </section>
  );
};

export default Hero;
