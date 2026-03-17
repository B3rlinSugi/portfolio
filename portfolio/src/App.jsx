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

/* ── Animated gradient mesh background ── */
const GradientMesh = () => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden",
  }}>
    {/* Blob 1 — blue, top-left */}
    <div style={{
      position: "absolute", width: "55vw", height: "55vw",
      top: "-15vw", left: "-15vw",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(29,78,216,0.07) 0%, transparent 65%)",
      animation: "meshBlob1 18s ease-in-out infinite",
      filter: "blur(40px)",
    }} />
    {/* Blob 2 — cyan, top-right */}
    <div style={{
      position: "absolute", width: "45vw", height: "45vw",
      top: "-10vw", right: "-10vw",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)",
      animation: "meshBlob2 22s ease-in-out infinite",
      filter: "blur(50px)",
    }} />
    {/* Blob 3 — purple, center */}
    <div style={{
      position: "absolute", width: "40vw", height: "40vw",
      top: "30vh", left: "30vw",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)",
      animation: "meshBlob3 26s ease-in-out infinite",
      filter: "blur(60px)",
    }} />
    {/* Blob 4 — blue, bottom-left */}
    <div style={{
      position: "absolute", width: "50vw", height: "50vw",
      bottom: "-10vw", left: "-5vw",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(29,78,216,0.06) 0%, transparent 65%)",
      animation: "meshBlob4 20s ease-in-out infinite",
      filter: "blur(45px)",
    }} />
    {/* Blob 5 — cyan, bottom-right */}
    <div style={{
      position: "absolute", width: "40vw", height: "40vw",
      bottom: "-5vw", right: "-5vw",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)",
      animation: "meshBlob5 24s ease-in-out infinite",
      filter: "blur(55px)",
    }} />

    <style>{`
      @keyframes meshBlob1 {
        0%,100% { transform: translate(0,0) scale(1); }
        33%      { transform: translate(4vw,6vh) scale(1.1); }
        66%      { transform: translate(-3vw,3vh) scale(0.95); }
      }
      @keyframes meshBlob2 {
        0%,100% { transform: translate(0,0) scale(1); }
        40%      { transform: translate(-6vw,4vh) scale(1.08); }
        70%      { transform: translate(2vw,-3vh) scale(0.92); }
      }
      @keyframes meshBlob3 {
        0%,100% { transform: translate(0,0) scale(1); }
        30%      { transform: translate(5vw,-5vh) scale(1.15); }
        60%      { transform: translate(-4vw,6vh) scale(0.9); }
      }
      @keyframes meshBlob4 {
        0%,100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(6vw,-4vh) scale(1.12); }
      }
      @keyframes meshBlob5 {
        0%,100% { transform: translate(0,0) scale(1); }
        45%      { transform: translate(-5vw,3vh) scale(1.06); }
        80%      { transform: translate(3vw,-2vh) scale(0.94); }
      }
    `}</style>
  </div>
);

/* ── Loader ── */
const Loader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const steps = ["Initializing...","Loading modules...","Compiling...","Rendering...","Done."];
  useEffect(() => {
    const vals = [12,28,48,66,84,100]; let i = 0;
    const next = () => {
      if (i >= vals.length) { setTimeout(() => { setFadeOut(true); setTimeout(onDone, 550); }, 320); return; }
      setProgress(vals[i]); setStepIdx(Math.min(i, steps.length-1)); i++;
      setTimeout(next, 150 + Math.random()*130);
    };
    setTimeout(next, 150);
  }, []);
  return (
    <div style={{ position:"fixed",inset:0,zIndex:9999,background:"var(--navy)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24,opacity:fadeOut?0:1,transition:"opacity 0.55s cubic-bezier(.22,1,.36,1)",pointerEvents:fadeOut?"none":"all" }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(to right,#1D4ED8,#06B6D4)"}}/>
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:22}}>
        <div style={{width:56,height:56,borderRadius:14,background:"linear-gradient(135deg,#1D4ED8,#06B6D4)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 40px rgba(29,78,216,0.4)",animation:"loader-pulse 1.5s ease-in-out infinite"}}>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:18,color:"#fff"}}>BS</span>
        </div>
        <div style={{width:220}}>
          <div style={{height:2,background:"rgba(59,130,246,0.1)",borderRadius:4,overflow:"hidden",marginBottom:10}}>
            <div style={{height:"100%",borderRadius:4,background:"linear-gradient(to right,#1D4ED8,#06B6D4)",width:progress+"%",transition:"width 0.22s cubic-bezier(.22,1,.36,1)",boxShadow:"0 0 10px rgba(29,78,216,0.6)"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:10.5,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"}}>{steps[stepIdx]}</span>
            <span style={{fontSize:10.5,color:"var(--muted-2)",fontFamily:"'JetBrains Mono',monospace"}}>{progress}%</span>
          </div>
        </div>
      </div>
      <style>{`@keyframes loader-pulse{0%,100%{transform:scale(1);box-shadow:0 0 40px rgba(29,78,216,0.4)}50%{transform:scale(0.96);box-shadow:0 0 20px rgba(29,78,216,0.2)}}`}</style>
    </div>
  );
};

const sections = [
  {id:"hero",label:"Home"},{id:"about",label:"About"},{id:"skills",label:"Skills"},
  {id:"projects",label:"Projects"},{id:"certifications",label:"Certifications"},
  {id:"organizations",label:"Organizations"},{id:"contact",label:"Contact"},
];

const SectionDots = () => {
  const [active,setActive]=useState("hero");
  const [show,setShow]=useState(false);
  useEffect(()=>{
    const onScroll=()=>{
      setShow(window.scrollY>80);
      for(let i=sections.length-1;i>=0;i--){const el=document.getElementById(sections[i].id);if(el&&window.scrollY>=el.offsetTop-160){setActive(sections[i].id);break;}}
    };
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return (
    <div style={{position:"fixed",right:20,top:"50%",transform:"translateY(-50%)",zIndex:50,display:"flex",flexDirection:"column",gap:9,opacity:show?1:0,transition:"opacity 0.4s ease",pointerEvents:show?"all":"none"}}>
      {sections.map(s=>{const isActive=active===s.id;return(
        <button key={s.id} onClick={()=>go(s.id)} title={s.label} style={{width:isActive?7:5,height:isActive?22:5,borderRadius:isActive?4:"50%",background:isActive?"linear-gradient(to bottom,#1D4ED8,#06B6D4)":"rgba(59,130,246,0.2)",border:"none",cursor:"pointer",padding:0,transition:"all 0.3s cubic-bezier(.22,1,.36,1)",boxShadow:isActive?"0 0 10px rgba(29,78,216,0.5)":"none",outline:"none"}}/>
      );})}
    </div>
  );
};

const BackToTop = () => {
  const [show,setShow]=useState(false);
  const [hovered,setHovered]=useState(false);
  useEffect(()=>{const onScroll=()=>setShow(window.scrollY>400);window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll);},[]);
  return (
    <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{position:"fixed",bottom:28,right:20,zIndex:50,width:42,height:42,borderRadius:11,background:hovered?"linear-gradient(135deg,#1D4ED8,#06B6D4)":"rgba(15,31,56,0.9)",border:`1px solid ${hovered?"transparent":"rgba(59,130,246,0.25)"}`,color:hovered?"#fff":"var(--white-2)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:show?1:0,transform:show?"translateY(0) scale(1)":"translateY(12px) scale(0.85)",transition:"all 0.3s cubic-bezier(.22,1,.36,1)",pointerEvents:show?"all":"none",boxShadow:hovered?"0 0 24px rgba(29,78,216,0.4)":"0 4px 16px rgba(0,0,0,0.3)",backdropFilter:"blur(12px)"}} title="Back to top">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) return;
    const bar = document.getElementById("progress-bar");
    const onScroll = () => { const total = document.body.scrollHeight - window.innerHeight; if (bar && total > 0) bar.style.width = (window.scrollY / total * 100) + "%"; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}

      {/* ── Global animated gradient mesh ── */}
      <GradientMesh />

      <div style={{ background: "transparent", minHeight: "100vh", opacity: loading ? 0 : 1, transition: "opacity 0.5s ease 0.1s", position: "relative", zIndex: 1 }}>
        <div id="progress-bar" style={{ position:"fixed",top:0,left:0,height:3,background:"linear-gradient(to right,#1D4ED8,#06B6D4)",zIndex:201,width:"0%",transition:"width 0.08s linear",pointerEvents:"none" }} />
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
