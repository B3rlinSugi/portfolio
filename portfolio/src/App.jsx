import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./index.css";
import { LangContext } from "./LangContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

import TerminalEgg from "./components/TerminalEgg";
import ProjectDetailModal from "./components/ProjectDetailModal";
import ErrorBoundary from "./components/ErrorBoundary";

const GitHubActivity = lazy(() => import("./components/GitHubActivity"));
const Certifications = lazy(() => import("./components/Certifications"));
const Organizations = lazy(() => import("./components/Organizations"));
const Contact = lazy(() => import("./components/Contact"));

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
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = setTimeout(() => setPhase(1), 200);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (phase !== 1) return;
    if (progress >= 100) {
      const unlockDelay = setTimeout(() => setPhase(2), 600);
      return () => clearTimeout(unlockDelay);
    }
    const step = progress < 30 ? 3 : progress < 70 ? 2 : 1.2;
    const tick = setTimeout(() => {
      setProgress((p) => Math.min(100, Number((p + step).toFixed(1))));
    }, progress < 70 ? 70 : 90);
    return () => clearTimeout(tick);
  }, [phase, progress]);

  useEffect(() => {
    if (phase !== 2) return;
    const exitDelay = setTimeout(() => setPhase(3), 500);
    const done = setTimeout(onDone, 1200); 
    return () => { clearTimeout(exitDelay); clearTimeout(done); };
  }, [phase, onDone]);

  useEffect(() => {
    const safety = setTimeout(onDone, 12000);
    return () => clearTimeout(safety);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#020617",
      overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center",
      opacity: phase === 3 ? 0 : 1,
      pointerEvents: phase === 3 ? "none" : "all",
      transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
    }}>

      {/* Background glow behind editor */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "70vw", height: "70vh",
        background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 60%)",
        pointerEvents: "none", filter: "blur(60px)",
      }} />

      {/* Editor Window */}
      <div style={{
         position: "relative",
         width: "min(680px, 90vw)",
         background: "#0f111a", // Deep material ocean theme
         borderRadius: "14px",
         border: "1px solid rgba(255,255,255,0.06)",
         boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.8)",
         overflow: "hidden",
         transform: phase === 0 ? "translateY(20px) scale(0.95)" : phase === 1 || phase === 2 ? "translateY(0) scale(1)" : "translateY(-40px) scale(1.05)",
         opacity: phase === 0 ? 0 : 1,
         transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}>

        {/* Mac OS Header */}
        <div style={{
           display: "flex", alignItems: "center", padding: "14px 20px",
           background: "#090b10", borderBottom: "1px solid rgba(255,255,255,0.04)",
           gap: "8px"
        }}>
           <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }}></div>
           <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EAB308" }}></div>
           <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22C55E" }}></div>
           <div style={{ flex: 1, textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#64748B", letterSpacing: "1px", pointerEvents: "none" }}>
              boot.json — backend-env
           </div>
        </div>

        {/* Code Content */}
        <div style={{
           padding: "32px",
           fontFamily: "'JetBrains Mono', monospace",
           fontSize: "clamp(13px, 3vw, 15px)",
           lineHeight: 1.7,
           minHeight: "260px",
           color: "#A6ACCD"
        }}>
           <div style={{ color: "#3B82F6", marginBottom: "16px" }}>
              <span style={{ color: "#89DDFF" }}>{'>'}</span> <span style={{ color: "#E2E8F0" }}>npm run init</span>
           </div>
           
           <div style={{ opacity: progress > 5 ? 1 : 0, transition: "opacity 0.2s" }}>
              <span style={{ color: "#C3E88D" }}>✔</span> Mounting backend modules...
           </div>
           <div style={{ opacity: progress > 20 ? 1 : 0, transition: "opacity 0.2s" }}>
              <span style={{ color: "#C3E88D" }}>✔</span> Establishing database connection...
           </div>

           <div style={{ 
               opacity: progress > 40 ? 1 : 0, 
               transition: "opacity 0.4s",
               marginTop: "20px",
               padding: "20px",
               background: "rgba(0,0,0,0.25)",
               borderRadius: "10px",
               border: "1px solid rgba(255,255,255,0.03)"
           }}>
              <span style={{color:"#89DDFF"}}>{"{"}</span><br/>
              {"  "}<span style={{color:"#C3E88D"}}>"developer"</span><span style={{color:"#89DDFF"}}>:</span> <span style={{color:"#F07178"}}>"Berlin Sugiyanto"</span><span style={{color:"#89DDFF"}}>,</span><br/>
              {"  "}<span style={{color:"#C3E88D"}}>"position"</span><span style={{color:"#89DDFF"}}>:</span> <span style={{color:"#F07178"}}>"Junior Backend Developer"</span><span style={{color:"#89DDFF"}}>,</span><br/>
              {"  "}<span style={{color:"#C3E88D"}}>"status"</span><span style={{color:"#89DDFF"}}>:</span> <span style={{color: progress >= 100 ? "#C3E88D" : "#FFCB6B"}}>{progress >= 100 ? '"System Ready"' : '"Initializing..."'}</span><span style={{color:"#89DDFF"}}>,</span><br/>
              {"  "}<span style={{color:"#C3E88D"}}>"progress"</span><span style={{color:"#89DDFF"}}>:</span> <span style={{color:"#F78C6C"}}>{Math.floor(progress)}</span><br/>
              <span style={{color:"#89DDFF"}}>{"}"}</span>
           </div>

           <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#89DDFF" }}>{'>'}</span> {progress >= 100 ? "Boot complete. Launching interface." : "Loading dependencies..."}
              {phase < 3 && <span style={{ width: "8px", height: "18px", background: "#3B82F6", animation: "cliBlink 1s step-end infinite" }} />}
           </div>
        </div>

        {/* Progress Bar inside Window */}
        <div style={{ height: "3px", background: "#090b10", width: "100%" }}>
           <div style={{ height: "100%", background: "linear-gradient(90deg, #1D4ED8, #3B82F6, #06B6D4)", width: `${progress}%`, transition: "width 0.1s linear" }} />
        </div>

      </div>

      <style>{`
        @keyframes cliBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};



const sections = [
  {id:"hero",label:"Home"},{id:"about",label:"About"},{id:"skills",label:"Skills"},
  {id:"projects",label:"Projects"},{id:"github-activity",label:"GitHub"},{id:"certifications",label:"Certifications"},
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
    <button aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ position:"fixed", bottom:28, right:20, zIndex:50, width:42, height:42, borderRadius:11, background:hovered?"linear-gradient(135deg,#1D4ED8,#06B6D4)":"rgba(15,31,56,0.9)", border:`1px solid ${hovered?"transparent":"rgba(59,130,246,0.25)"}`, color:hovered?"#fff":"var(--white-2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", opacity:show?1:0, transform:show?"translateY(0) scale(1)":"translateY(12px) scale(0.85)", transition:"all 0.3s cubic-bezier(.22,1,.36,1)", pointerEvents:show?"all":"none", boxShadow:hovered?"0 0 24px rgba(29,78,216,0.4)":"0 4px 16px rgba(0,0,0,0.3)", backdropFilter:"blur(12px)" }} title="Back to top">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  );
};

const SectionSkeleton = ({ label, minHeight = 460 }) => (
  <div
    aria-hidden="true"
    style={{
      minHeight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "1px solid rgba(59,130,246,0.05)",
      background: "linear-gradient(to bottom, rgba(2,6,23,0.55), rgba(2,6,23,0.2))",
    }}
  >
    <span
      style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 11,
        color: "#334155",
        letterSpacing: "1.4px",
        textTransform: "uppercase",
      }}
    >
      Loading {label}...
    </span>
  </div>
);

const DeferredSection = ({ anchorId, minHeight = 460, children }) => {
  const holderRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const node = holderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "420px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div
      ref={holderRef}
      id={mounted ? undefined : anchorId}
      style={{ minHeight: mounted ? undefined : minHeight }}
    >
      {children(mounted)}
    </div>
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

  // Apply theme to <html> element — theming handled entirely via index.css CSS variables
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
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
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {loading && <Loader onDone={revealApp} />}
      <GradientMesh />
      <main
        id="main-content"
        tabIndex="-1"
        style={{
        background:"transparent", minHeight:"100vh",
        opacity: 1,
        transform: "none",
        transition: "opacity 0.2s ease",
        pointerEvents: loading ? "none" : "auto",
        position:"relative", zIndex:1,
      }}
      >
        <div id="progress-bar" style={{ position:"fixed", top:0, left:0, height:3, background:"linear-gradient(to right,#1D4ED8,#06B6D4)", zIndex:201, width:"0%", transition:"width 0.08s linear", pointerEvents:"none" }} />
        <Navbar lang={lang} setLang={handleSetLang} theme={theme} setTheme={setTheme} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <DeferredSection anchorId="github-activity" minHeight={560}>
          {(mounted) => (
            mounted ? (
              <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton label="GitHub" minHeight={560} />}>
                  <GitHubActivity />
                </Suspense>
              </ErrorBoundary>
            ) : (
              <SectionSkeleton label="GitHub" minHeight={560} />
            )
          )}
        </DeferredSection>

        <DeferredSection anchorId="certifications" minHeight={540}>
          {(mounted) => (
            mounted ? (
              <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton label="Certifications" minHeight={540} />}>
                  <Certifications />
                </Suspense>
              </ErrorBoundary>
            ) : (
              <SectionSkeleton label="Certifications" minHeight={540} />
            )
          )}
        </DeferredSection>

        <DeferredSection anchorId="organizations" minHeight={540}>
          {(mounted) => (
            mounted ? (
              <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton label="Organizations" minHeight={540} />}>
                  <Organizations />
                </Suspense>
              </ErrorBoundary>
            ) : (
              <SectionSkeleton label="Organizations" minHeight={540} />
            )
          )}
        </DeferredSection>

        <DeferredSection anchorId="contact" minHeight={500}>
          {(mounted) => (
            mounted ? (
              <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton label="Contact" minHeight={500} />}>
                  <Contact />
                </Suspense>
              </ErrorBoundary>
            ) : (
              <SectionSkeleton label="Contact" minHeight={500} />
            )
          )}
        </DeferredSection>
        <SectionDots />
        <BackToTop />
        <TerminalEgg />
        <ProjectDetailModal />
      </main>
    </LangContext.Provider>
  );
}

export default App;
