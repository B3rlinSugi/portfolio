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
  const [step, setStep] = useState(0);
  const steps_label = ["Initializing...","Loading modules...","Building UI...","Almost ready...","Done."];

  useEffect(() => {
    const steps = [18, 38, 58, 76, 92, 100];
    let i = 0;
    const next = () => {
      if (i >= steps.length) {
        setTimeout(() => { setFadeOut(true); setTimeout(onDone, 500); }, 300);
        return;
      }
      setProgress(steps[i]);
      setStep(Math.min(i, steps_label.length-1));
      i++;
      setTimeout(next, 160 + Math.random() * 120);
    };
    const t = setTimeout(next, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"#F8FAFC",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:24,
      opacity: fadeOut ? 0 : 1,
      transition:"opacity 0.5s ease",
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      {/* Grid bg */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(#E2E8F0 1px,transparent 1px),linear-gradient(90deg,#E2E8F0 1px,transparent 1px)",
        backgroundSize:"40px 40px", opacity:0.5,
      }}/>
      {/* Accent */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(to right,#7C3AED,#0EA5E9,#059669)"}}/>

      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:20}}>
        {/* Logo */}
        <div style={{
          width:52, height:52, borderRadius:12,
          background:"#0F172A",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 8px 24px rgba(15,23,42,0.12)",
          animation:"loader-pulse 1.5s ease-in-out infinite",
        }}>
          <span style={{
            fontFamily:"'JetBrains Mono',monospace",
            fontWeight:700, fontSize:18, color:"#F8FAFC",
          }}>BS</span>
        </div>

        {/* Progress */}
        <div style={{width:200}}>
          <div style={{height:2, background:"#E2E8F0", borderRadius:4, overflow:"hidden"}}>
            <div style={{
              height:"100%", borderRadius:4,
              background:"linear-gradient(to right,#7C3AED,#0EA5E9)",
              width:progress+"%",
              transition:"width 0.22s cubic-bezier(.22,1,.36,1)",
            }}/>
          </div>
          <div style={{
            display:"flex", justifyContent:"space-between", marginTop:8,
          }}>
            <span style={{
              fontSize:10.5, color:"#64748B",
              fontFamily:"'JetBrains Mono',monospace",
            }}>{steps_label[step]}</span>
            <span style={{
              fontSize:10.5, color:"#94A3B8",
              fontFamily:"'JetBrains Mono',monospace",
            }}>{progress}%</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes loader-pulse{0%,100%{transform:scale(1)}50%{transform:scale(0.96)}}`}</style>
    </div>
  );
};

/* ── Section Progress Dots ── */
const sections = [
  { id:"hero",           label:"Home" },
  { id:"about",          label:"About" },
  { id:"skills",         label:"Skills" },
  { id:"projects",       label:"Projects" },
  { id:"certifications", label:"Certs" },
  { id:"organizations",  label:"Orgs" },
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
      position:"fixed", right:20, top:"50%", transform:"translateY(-50%)",
      zIndex:50, display:"flex", flexDirection:"column", gap:8,
      opacity:show?1:0, transition:"opacity 0.4s ease",
      pointerEvents:show?"all":"none",
    }}>
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button key={s.id} onClick={() => scrollTo(s.id)}
            title={s.label}
            style={{
              width:isActive?8:5,
              height:isActive?22:5,
              borderRadius:isActive?4:"50%",
              background:isActive?"#7C3AED":"#CBD5E1",
              border:"none", cursor:"pointer", padding:0,
              transition:"all 0.3s cubic-bezier(.22,1,.36,1)",
              boxShadow:isActive?"0 0 8px rgba(124,58,237,0.4)":"none",
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
        position:"fixed", bottom:28, right:20, zIndex:50,
        width:40, height:40, borderRadius:10,
        background:hovered?"#0F172A":"#FFFFFF",
        border:`1px solid ${hovered?"#0F172A":"#E2E8F0"}`,
        color:hovered?"#F8FAFC":"#475569",
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        opacity:show?1:0,
        transform:show?"translateY(0) scale(1)":"translateY(12px) scale(0.85)",
        transition:"all 0.3s cubic-bezier(.22,1,.36,1)",
        pointerEvents:show?"all":"none",
        boxShadow:hovered?"0 4px 16px rgba(15,23,42,0.15)":"0 2px 8px rgba(15,23,42,0.08)",
      }}
      title="Back to top"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
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
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div style={{
        background:"#F8FAFC", minHeight:"100vh",
        opacity:loading?0:1,
        transition:"opacity 0.5s ease 0.1s",
      }}>
        <div id="progress-bar" style={{
          position:"fixed", top:0, left:0, height:3,
          background:"linear-gradient(to right,#7C3AED,#0EA5E9)",
          zIndex:200, transition:"width 0.1s linear",
          width:"0%",
        }}/>
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
