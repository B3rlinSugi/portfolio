import { useEffect, useState } from "react";
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

/* ── Blur-to-Sharp Loader — cinematic, slow ── */
const Loader = ({ onDone }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [line1, setLine1] = useState(false);
  const [line2, setLine2] = useState(false);
  const [sub, setSub] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLine1(true), 500);
    const t2 = setTimeout(() => setLine2(true), 1200);
    const t3 = setTimeout(() => setSub(true), 2000);
    const t4 = setTimeout(() => setProgressVisible(true), 2400);
    const t5 = setTimeout(() => {
      let p = 0;
      const steps = [6,9,8,11,7,10,9,12,8,10,11];
      let si = 0;
      const pi = setInterval(() => {
        p += steps[si % steps.length]; si++;
        if (p >= 100) {
          p = 100; clearInterval(pi);
          setTimeout(() => { setFadeOut(true); setTimeout(onDone, 700); }, 700);
        }
        setProgress(Math.min(p, 100));
      }, 230);
    }, 2400);
    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout);
  }, []);

  const blurStyle = (visible) => ({
    opacity: visible ? 1 : 0,
    filter: visible ? "blur(0px)" : "blur(32px)",
    transform: visible ? "scale(1) translateY(0)" : "scale(1.05) translateY(10px)",
    transition: "opacity 1.4s cubic-bezier(.22,1,.36,1), filter 1.4s cubic-bezier(.22,1,.36,1), transform 1.4s cubic-bezier(.22,1,.36,1)",
  });

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, background:"var(--navy)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", opacity:fadeOut?0:1, transition:"opacity 0.8s cubic-bezier(.22,1,.36,1)", pointerEvents:fadeOut?"none":"all", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.02) 2px,rgba(0,0,0,0.02) 4px)", pointerEvents:"none", zIndex:1 }} />
      <div style={{ position:"absolute", top:"15%", left:"10%", width:"45vw", height:"45vw", background:"radial-gradient(circle,rgba(29,78,216,0.15),transparent 65%)", filter:"blur(70px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"15%", right:"10%", width:"40vw", height:"40vw", background:"radial-gradient(circle,rgba(6,182,212,0.1),transparent 65%)", filter:"blur(70px)", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
        <h1 style={{ fontFamily:"'Clash Display','Syne',sans-serif", fontSize:"clamp(56px,11vw,118px)", fontWeight:700, color:"#FFFFFF", letterSpacing:"-3px", margin:0, lineHeight:1, ...blurStyle(line1), textShadow: line1?"0 0 60px rgba(255,255,255,0.08)":"none" }}>Berlin</h1>
        <h1 style={{ fontFamily:"'Clash Display','Syne',sans-serif", fontSize:"clamp(56px,11vw,118px)", fontWeight:700, background:"linear-gradient(135deg,#3B82F6,#06B6D4 55%,#38BDF8)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent", backgroundSize:"200%", letterSpacing:"-3px", margin:0, lineHeight:1, ...blurStyle(line2), animation:line2?"gradShiftLoader 4s ease infinite":"none" }}>Sugiyanto</h1>
        <div style={{ fontSize:11, letterSpacing:"6px", textTransform:"uppercase", fontFamily:"'JetBrains Mono',monospace", color:"#06B6D4", marginTop:20, ...blurStyle(sub), transition:"opacity 1s ease, filter 1s ease, transform 1s ease" }}>Backend Developer</div>
        <div style={{ width:280, marginTop:28, opacity:progressVisible?1:0, transition:"opacity 0.6s ease" }}>
          <div style={{ height:1.5, background:"rgba(59,130,246,0.12)", borderRadius:4, overflow:"hidden", marginBottom:8 }}>
            <div style={{ height:"100%", borderRadius:4, background:"linear-gradient(to right,#1D4ED8,#06B6D4)", width:progress+"%", transition:"width 0.25s cubic-bezier(.22,1,.36,1)", boxShadow:"0 0 14px rgba(6,182,212,0.7)" }} />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontSize:9.5, color:"var(--muted)", fontFamily:"'JetBrains Mono',monospace" }}>{progress<100?"> loading_portfolio...":"> ready."}</span>
            <span style={{ fontSize:9.5, color:"var(--muted-2)", fontFamily:"'JetBrains Mono',monospace" }}>{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>
      <style>{`@keyframes gradShiftLoader{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>
    </div>
  );
};

const sections = [
  {id:"hero",label:"Home"},{id:"about",label:"About"},{id:"skills",label:"Skills"},
  {id:"projects",label:"Projects"},{id:"certifications",label:"Certifications"},
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
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (loading) return;
    const bar = document.getElementById("progress-bar");
    const onScroll = () => { const total = document.body.scrollHeight-window.innerHeight; if(bar&&total>0) bar.style.width=(window.scrollY/total*100)+"%"; };
    window.addEventListener("scroll", onScroll, {passive:true});
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  return (
    <LangContext.Provider value={lang}>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <GradientMesh />
      <div style={{ background:"transparent", minHeight:"100vh", opacity:loading?0:1, transition:"opacity 0.5s ease 0.1s", position:"relative", zIndex:1 }}>
        <div id="progress-bar" style={{ position:"fixed", top:0, left:0, height:3, background:"linear-gradient(to right,#1D4ED8,#06B6D4)", zIndex:201, width:"0%", transition:"width 0.08s linear", pointerEvents:"none" }} />
        <Navbar lang={lang} setLang={setLang} />
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
    </LangContext.Provider>
  );
}

export default App;
