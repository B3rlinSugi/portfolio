import { useCallback, useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./index.css";
import { LangContext } from "./LangContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

import Certifications from "./components/Certifications";
import Organizations from "./components/Organizations";
import Contact from "./components/Contact";
import GitHubActivity from "./components/GitHubActivity";
import GitHubStats from "./components/GitHubStats";

import TerminalEgg from "./components/TerminalEgg";
import ProjectDetailModal from "./components/ProjectDetailModal";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.1,
    normalizeDepth: 2,
  });
}

const GradientMesh = () => (
  <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
    <div style={{ position:"absolute", width:"55vw", height:"55vw", top:"-15vw", left:"-15vw", borderRadius:"50%", background:"radial-gradient(circle,rgba(29,78,216,0.07) 0%,transparent 65%)", animation:"meshBlob1 18s ease-in-out infinite", filter:"blur(40px)" }} />
    <div style={{ position:"absolute", width:"45vw", height:"45vw", top:"-10vw", right:"-10vw", borderRadius:"50%", background:"radial-gradient(circle,rgba(6,182,212,0.05) 0%,transparent 65%)", animation:"meshBlob2 22s ease-in-out infinite", filter:"blur(50px)" }} />
    <div style={{ position:"absolute", width:"40vw", height:"40vw", top:"30vh", left:"30vw", borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.04) 0%,transparent 65%)", animation:"meshBlob3 26s ease-in-out infinite", filter:"blur(60px)" }} />
    <div style={{ position:"absolute", width:"50vw", height:"50vw", bottom:"-10vw", left:"-5vw", borderRadius:"50%", background:"radial-gradient(circle,rgba(29,78,216,0.06) 0%,transparent 65%)", animation:"meshBlob4 20s ease-in-out infinite", filter:"blur(45px)" }} />
    <div style={{ position:"absolute", width:"40vw", height:"40vw", bottom:"-5vw", right:"-5vw", borderRadius:"50%", background:"radial-gradient(circle,rgba(6,182,212,0.05) 0%,transparent 65%)", animation:"meshBlob5 24s ease-in-out infinite", filter:"blur(55px)" }} />
    <style>{`
      @keyframes meshBlob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(4vw,6vh) scale(1.1)}66%{transform:translate(-3vw,3vh) scale(0.95)}}
      @keyframes meshBlob2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-6vw,4vh) scale(1.08)}70%{transform:translate(2vw,-3vh) scale(0.92)}}
      @keyframes meshBlob3{0%,100%{transform:translate(0,0) scale(1)}30%{transform:translate(5vw,-5vh) scale(1.15)}60%{transform:translate(-4vw,6vh) scale(0.9)}}
      @keyframes meshBlob4{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(6vw,-4vh) scale(1.12)}}
      @keyframes meshBlob5{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(-5vw,3vh) scale(1.06)}80%{transform:translate(3vw,-2vh) scale(0.94)}}
    `}</style>
  </div>
);

const Loader = ({ onDone }) => {
  const [phase, setPhase] = useState(0); // 0:boot, 1:animating, 2:unlock, 3:exit
  const [progress, setProgress] = useState(0);
  const [activeLine, setActiveLine] = useState(0);

  const lines = [
    { id: "name", text: "Berlin Sugiyanto", size: "clamp(38px, 6.8vw, 84px)", color: "#F8E6CF" },
    { id: "portfolio", text: "Web Portfolio", size: "clamp(26px, 4.2vw, 48px)", color: "#F97316" },
    { id: "backend", text: "Backend Developer", size: "clamp(22px, 3.5vw, 38px)", color: "#FB923C" },
  ];

  useEffect(() => {
    const start = setTimeout(() => setPhase(1), 150);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (phase !== 1) return;

    if (progress >= 100) {
      const unlockDelay = setTimeout(() => setPhase(2), 420);
      return () => clearTimeout(unlockDelay);
    }

    const step = progress < 45 ? 3.1 : progress < 84 ? 1.55 : 0.8;
    const tick = setTimeout(() => {
      setProgress((p) => Math.min(100, Number((p + step).toFixed(1))));
    }, progress < 82 ? 108 : 126);

    return () => clearTimeout(tick);
  }, [phase, progress]);

  useEffect(() => {
    if (phase !== 1) return;
    const rotate = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % lines.length);
    }, 1450);
    return () => clearInterval(rotate);
  }, [phase, lines.length]);

  useEffect(() => {
    if (phase !== 2) return;
    const exitDelay = setTimeout(() => setPhase(3), 420);
    const done = setTimeout(onDone, 980);
    return () => {
      clearTimeout(exitDelay);
      clearTimeout(done);
    };
  }, [phase, onDone]);

  // Failsafe: prevent blank screen if animation timing gets interrupted.
  useEffect(() => {
    const safety = setTimeout(onDone, 12000);
    return () => clearTimeout(safety);
  }, [onDone]);

  const statusText =
    phase === 0
      ? "Preparing typography sequence..."
      : phase === 1
        ? progress < 34
          ? "Rendering identity line..."
          : progress < 68
            ? "Constructing portfolio headline..."
            : "Activating backend signature..."
        : phase === 2
          ? "Sequence complete. Entering website..."
          : "Transfer complete.";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background:
          "radial-gradient(circle at 20% 18%, #3b1f0f 0%, #1e120b 42%, #080707 100%)",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        opacity: phase === 3 ? 0 : 1,
        transition: "opacity 0.72s ease",
        willChange: "opacity",
        pointerEvents: phase === 3 ? "none" : "all",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(251,146,60,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,146,60,0.08) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          opacity: 0.16,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "66vw",
          height: "66vw",
          minWidth: 360,
          minHeight: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(245,158,11,0.1) 44%, transparent 72%)",
          filter: "blur(22px)",
          animation: "mlWarmAura 10s ease-in-out infinite",
        }}
      />

      <div
        style={{
          width: "min(940px, calc(100% - 28px))",
          position: "relative",
          zIndex: 3,
          textAlign: "left",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: "2.6px",
            color: "#FDBA74",
            textTransform: "uppercase",
            textAlign: "left",
          }}
        >
          Moving Letters Rebuild
        </p>

        <div
          style={{
            margin: "18px 0 22px",
            width: "100%",
            padding: "30px 24px 28px",
            borderRadius: 20,
            border: "1px solid rgba(251,146,60,0.35)",
            background:
              "linear-gradient(180deg, rgba(36,22,12,0.86) 0%, rgba(12,8,6,0.96) 100%)",
            boxShadow:
              "0 24px 58px rgba(0,0,0,0.45), inset 0 0 20px rgba(249,115,22,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {lines.map((line, rowIdx) => {
              const isActive = rowIdx === activeLine;
              const baseDelay = 180 + rowIdx * 180;
              return (
                <div
                  key={line.id}
                  style={{
                    position: "relative",
                    paddingLeft: 22,
                    borderLeft: `3px solid ${isActive ? "#F97316" : "rgba(251,146,60,0.35)"}`,
                    transition: "border-color 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: -3,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: "linear-gradient(180deg, #F97316 0%, #FB923C 100%)",
                      transformOrigin: "0 50%",
                      opacity: isActive ? 1 : 0.35,
                      animation: isActive
                        ? "mlLinePulse 0.9s ease-in-out infinite"
                        : "none",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: line.size,
                      letterSpacing: "-0.8px",
                      lineHeight: 1.02,
                      color: line.color,
                      textShadow: isActive
                        ? "0 0 14px rgba(249,115,22,0.4)"
                        : "0 0 8px rgba(30,20,10,0.4)",
                      wordBreak: "break-word",
                    }}
                  >
                    {line.text.split("").map((char, i) => (
                      <span
                        key={`${line.id}-${i}-${char === " " ? "space" : char}`}
                        style={{
                          display: "inline-block",
                          opacity: 0,
                          transform: "translateX(36px)",
                          animation: "mlLetterInWarm 0.52s ease forwards",
                          animationDelay: `${baseDelay + i * 24}ms`,
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p
          style={{
            margin: "0 0 8px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: "1.8px",
            color: "#FDBA74",
            textTransform: "uppercase",
          }}
        >
          berlin sugiyanto / web portfolio / backend developer
        </p>
        <p
          style={{
            margin: "0 0 18px",
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: "rgba(254,215,170,0.9)",
            letterSpacing: "0.15px",
          }}
        >
          {statusText}
        </p>

        <div
          style={{
            width: "min(620px, 96%)",
            height: 10,
            borderRadius: 999,
            border: "1px solid rgba(251,146,60,0.35)",
            background: "rgba(28,18,11,0.72)",
            overflow: "hidden",
            boxShadow: "inset 0 0 12px rgba(0,0,0,0.46)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, #F97316 0%, #FB923C 48%, #FCD34D 100%)",
              boxShadow: "0 0 16px rgba(249,115,22,0.52)",
              transition: "width 0.15s linear",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.38) 52%, transparent 100%)",
                animation: "mlBarShineWarm 1.5s linear infinite",
              }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 8,
            width: "min(620px, 96%)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#FED7AA",
            letterSpacing: "1.2px",
            textAlign: "center",
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>

      <style>{`
        @keyframes mlWarmAura {
          0%,100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.08) rotate(5deg); opacity: 1; }
        }
        @keyframes mlLinePulse {
          0%,100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.56; transform: scaleY(0.75); }
        }
        @keyframes mlLetterInWarm {
          from { opacity: 0; transform: translateX(36px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes mlBarShineWarm {
          from { transform: translateX(-110%); }
          to { transform: translateX(160%); }
        }
      `}</style>
    </div>
  );
};

const sections = [
  {id:"hero",label:"Home"},{id:"about",label:"About"},{id:"skills",label:"Skills"},
  {id:"projects",label:"Projects"},{id:"github-activity",label:"GitHub"},{id:"operational-readiness",label:"Ops"},{id:"openapi-viewer",label:"API Docs"},{id:"certifications",label:"Certifications"},
  {id:"organizations",label:"Organizations"},{id:"contact",label:"Contact"},
];

const SectionDots = () => {
  const [active,setActive] = useState("hero");
  const [show,setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY>80);
      for(let i=sections.length-1;i>=0;i--){const el=document.getElementById(sections[i].id);if(el&&window.scrollY>=el.offsetTop-160){setActive(sections[i].id);break;}}
    };
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);
  const go = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return (
    <div style={{ position:"fixed", right:20, top:"50%", transform:"translateY(-50%)", zIndex:50, display:"flex", flexDirection:"column", gap:9, opacity:show?1:0, transition:"opacity 0.4s ease", pointerEvents:show?"all":"none" }}>
      {sections.map(s=>{const isActive=active===s.id;return(
        <button key={s.id} onClick={()=>go(s.id)} title={s.label} style={{ width:isActive?7:5, height:isActive?22:5, borderRadius:isActive?4:"50%", background:isActive?"linear-gradient(to bottom,#1D4ED8,#06B6D4)":"rgba(59,130,246,0.2)", border:"none", cursor:"pointer", padding:0, transition:"all 0.3s cubic-bezier(.22,1,.36,1)", boxShadow:isActive?"0 0 10px rgba(29,78,216,0.5)":"none", outline:"none" }} />
      );})}
    </div>
  );
};

const BackToTop = () => {
  const [show,setShow] = useState(false);
  const [hovered,setHovered] = useState(false);
  useEffect(()=>{const onScroll=()=>setShow(window.scrollY>400);window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll);},[]);
  return (
    <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ position:"fixed", bottom:28, right:20, zIndex:50, width:42, height:42, borderRadius:11, background:hovered?"linear-gradient(135deg,#1D4ED8,#06B6D4)":"rgba(15,31,56,0.9)", border:`1px solid ${hovered?"transparent":"rgba(59,130,246,0.25)"}`, color:hovered?"#fff":"var(--white-2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", opacity:show?1:0, transform:show?"translateY(0) scale(1)":"translateY(12px) scale(0.85)", transition:"all 0.3s cubic-bezier(.22,1,.36,1)", pointerEvents:show?"all":"none", boxShadow:hovered?"0 0 24px rgba(29,78,216,0.4)":"0 4px 16px rgba(0,0,0,0.3)", backdropFilter:"blur(12px)" }} title="Back to top">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  const revealApp = useCallback(() => {
    setLoading(false);
  }, []);

  // ── Lang state ──
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("portfolio-lang") || "en";
  });

  // ── Theme state — auto detect OS preference ──
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  // Apply theme to <html> element
  useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);

  const styleId = "light-mode-overrides";
  let el = document.getElementById(styleId);
  if (!el) {
    el = document.createElement("style");
    el.id = styleId;
    document.head.appendChild(el);
  }

  if (theme === "light") {
    el.textContent = `
      section { background: #F0F4FF !important; }
      #about, #projects, #certifications, #organizations, #github-activity { background: #E8EEFF !important; }
      [style*="rgba(15,31,56"], [style*="rgba(6,14,30"], [style*="rgba(10,22,40"], [style*="rgba(4,10,22"] {
        background: rgba(255,255,255,0.88) !important;
        color: #0A1628 !important;
        border-color: rgba(29,78,216,0.15) !important;
      }
      [style*="color: #6B84A8"], [style*="color:#6B84A8"],
      [style*="color: #8BA4C8"], [style*="color:#8BA4C8"],
      [style*="color: var(--muted)"] { color: #2D4A8A !important; }
      [style*="color: var(--white)"], [style*="color:var(--white)"] { color: #0A1628 !important; }
      [style*="color: var(--white-2)"], [style*="color:var(--white-2)"] { color: #1E3A6E !important; }
      .s-title { color: #0A1628 !important; }
    `;
  } else {
    el.textContent = "";
  }
}, [theme]);

  useEffect(() => {
    if (!loading) return;
    // Failsafe release to avoid persistent blank screen on interrupted loader lifecycle.
    const safety = setTimeout(revealApp, 13000);
    return () => clearTimeout(safety);
  }, [loading, revealApp]);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("portfolio-lang", newLang);
  };

  useEffect(() => {
    if (loading) return;
    const bar = document.getElementById("progress-bar");
    const onScroll = () => { const total = document.body.scrollHeight-window.innerHeight; if(bar&&total>0) bar.style.width=(window.scrollY/total*100)+"%"; };
    window.addEventListener("scroll", onScroll, {passive:true});
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  return (
    <LangContext.Provider value={lang}>
      {loading && <Loader onDone={revealApp} />}
      <GradientMesh />
      <div style={{
        background:"transparent", minHeight:"100vh",
        opacity: 1,
        transform: "none",
        transition: "opacity 0.2s ease",
        pointerEvents: loading ? "none" : "auto",
        position:"relative", zIndex:1,
      }}>
        <div id="progress-bar" style={{ position:"fixed", top:0, left:0, height:3, background:"linear-gradient(to right,#1D4ED8,#06B6D4)", zIndex:201, width:"0%", transition:"width 0.08s linear", pointerEvents:"none" }} />
        <Navbar lang={lang} setLang={handleSetLang} theme={theme} setTheme={setTheme} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubActivity />
        <GitHubStats />

        <Certifications />
        <Organizations />
        <Contact />
        <SectionDots />
        <BackToTop />
        <TerminalEgg />
        <ProjectDetailModal />
      </div>
    </LangContext.Provider>
  );
}

export default App;
