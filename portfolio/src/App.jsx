import { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Organizations from "./components/Organizations";
import Contact from "./components/Contact";

/* ── Loading Screen ── */
const Loader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const steps = [15, 35, 55, 72, 88, 100];
    let i = 0;
    const next = () => {
      if (i >= steps.length) {
        setTimeout(() => { setFadeOut(true); setTimeout(onDone, 600); }, 300);
        return;
      }
      setProgress(steps[i++]);
      setTimeout(next, 180 + Math.random() * 140);
    };
    const t = setTimeout(next, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"#1C1B2E",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:28,
      opacity: fadeOut ? 0 : 1,
      transition:"opacity 0.6s cubic-bezier(.22,1,.36,1)",
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      <div style={{position:"absolute",top:"20%",left:"30%",width:300,height:300,
        background:"radial-gradient(circle,rgba(147,51,234,0.12),transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"20%",right:"25%",width:240,height:240,
        background:"radial-gradient(circle,rgba(236,72,153,0.08),transparent 65%)",pointerEvents:"none"}}/>

      <div style={{
        fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:52,
        background:"linear-gradient(135deg,#C084FC,#EC4899)",
        WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent",
        letterSpacing:"-2px", lineHeight:1,
        animation:"loader-pulse 1.5s ease-in-out infinite",
      }}>BS</div>

      <div style={{width:200, position:"relative"}}>
        <div style={{height:2, background:"rgba(147,51,234,0.12)", borderRadius:4, overflow:"hidden"}}>
          <div style={{
            height:"100%", borderRadius:4,
            background:"linear-gradient(to right,#9333EA,#EC4899)",
            width: progress + "%",
            transition:"width 0.25s cubic-bezier(.22,1,.36,1)",
            boxShadow:"0 0 10px rgba(147,51,234,0.6)",
          }}/>
        </div>
        <div style={{
          textAlign:"center", marginTop:12,
          fontFamily:"'Inter',sans-serif", fontSize:11,
          color:"#4A4870", letterSpacing:"2px",
        }}>{progress}%</div>
      </div>

      <style>{`@keyframes loader-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(0.95)}}`}</style>
    </div>
  );
};

/* ── Section Progress Dots ── */
const sections = [
  { id:"hero",           label:"Home" },
  { id:"about",          label:"About" },
  { id:"skills",         label:"Skills" },
  { id:"projects",       label:"Projects" },
  { id:"certifications", label:"Certifications" },
  { id:"organizations",  label:"Organizations" },
  { id:"contact",        label:"Contact" },
];

const SectionDots = () => {
  const [active, setActive] = useState("hero");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 80);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActive(sections[i].id); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <div style={{
      position:"fixed", right:24, top:"50%", transform:"translateY(-50%)",
      zIndex:50, display:"flex", flexDirection:"column", gap:10,
      opacity: show ? 1 : 0, transition:"opacity 0.4s ease",
      pointerEvents: show ? "all" : "none",
    }}>
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button key={s.id} onClick={() => scrollTo(s.id)}
            title={s.label}
            style={{
              width: isActive ? 8 : 6,
              height: isActive ? 24 : 6,
              borderRadius: isActive ? 4 : "50%",
              background: isActive
                ? "linear-gradient(to bottom,#9333EA,#EC4899)"
                : "rgba(147,51,234,0.25)",
              border:"none", cursor:"pointer", padding:0,
              transition:"all 0.35s cubic-bezier(.22,1,.36,1)",
              boxShadow: isActive ? "0 0 10px rgba(147,51,234,0.5)" : "none",
              outline:"none",
            }}
          />
        );
      })}
    </div>
  );
};

/* ── Back To Top ── */
const BackToTop = () => {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:"fixed", bottom:32, right:24, zIndex:50,
        width:44, height:44, borderRadius:12,
        background: hovered
          ? "linear-gradient(135deg,#9333EA,#EC4899)"
          : "rgba(36,35,54,0.95)",
        border:`1px solid ${hovered ? "transparent" : "rgba(147,51,234,0.35)"}`,
        color: hovered ? "#fff" : "#A855F7",
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
        transition:"all 0.35s cubic-bezier(.22,1,.36,1)",
        pointerEvents: show ? "all" : "none",
        boxShadow: hovered ? "0 8px 28px rgba(147,51,234,0.4)" : "0 4px 16px rgba(0,0,0,0.3)",
        backdropFilter:"blur(12px)",
      }}
      title="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
};

/* ── App ── */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    const bar = document.getElementById("progress-bar");
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      if (bar && total > 0) bar.style.width = (window.scrollY / total * 100) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [loading]);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div style={{
        background:"#1C1B2E", minHeight:"100vh",
        opacity: loading ? 0 : 1,
        transition:"opacity 0.5s ease 0.1s",
      }}>
        <div id="progress-bar" />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Organizations />
        <Contact />
        <SectionDots />
        <BackToTop />
      </div>
    </>
  );
}

export default App;
