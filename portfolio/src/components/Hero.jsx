import { data } from "../data/portfolioData";
import { useEffect, useRef, useState } from "react";

const Particles = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const dots = Array.from({length:50},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-0.5)*0.28, vy:(Math.random()-0.5)*0.28,
      r:Math.random()*1.3+0.4, a:Math.random()*0.3+0.05,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      dots.forEach(d=>{
        d.x+=d.vx; d.y+=d.vy;
        if(d.x<0||d.x>W) d.vx*=-1;
        if(d.y<0||d.y>H) d.vy*=-1;
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(59,130,246,${d.a})`; ctx.fill();
      });
      for(let i=0;i<dots.length;i++) for(let j=i+1;j<dots.length;j++){
        const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<110){ ctx.beginPath(); ctx.moveTo(dots[i].x,dots[i].y); ctx.lineTo(dots[j].x,dots[j].y);
          ctx.strokeStyle=`rgba(59,130,246,${0.055*(1-dist/110)})`; ctx.lineWidth=0.7; ctx.stroke(); }
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>{ W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; };
    window.addEventListener("resize",onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",onResize); };
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
};

/* 3D photo card with mouse tilt */
const PhotoCard3D = () => {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [tilt, setTilt] = useState({rx:0,ry:0,gx:50,gy:50});
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const el = cardRef.current; if(!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(()=>{
      const rect = el.getBoundingClientRect();
      const x = (e.clientX-rect.left)/rect.width;
      const y = (e.clientY-rect.top)/rect.height;
      setTilt({ rx:(y-0.5)*-18, ry:(x-0.5)*18, gx:Math.round(x*100), gy:Math.round(y*100) });
    });
  };
  const onLeave = () => { cancelAnimationFrame(rafRef.current); setHovered(false); setTilt({rx:0,ry:0,gx:50,gy:50}); };

  return (
    <div ref={cardRef} onMouseEnter={()=>setHovered(true)} onMouseMove={onMouseMove} onMouseLeave={onLeave}
      style={{ perspective:"900px", width:"100%", maxWidth:340, margin:"0 auto" }}
    >
      {/* Outer glow */}
      <div style={{
        position:"absolute", inset:-20, borderRadius:28,
        background:`radial-gradient(ellipse at ${tilt.gx}% ${tilt.gy}%, rgba(29,78,216,0.35), transparent 65%)`,
        transition:hovered?"none":"all 0.6s ease",
        pointerEvents:"none", zIndex:0,
        filter:"blur(16px)",
      }}/>

      {/* Card */}
      <div style={{
        position:"relative", zIndex:1,
        borderRadius:24,
        overflow:"hidden",
        border:"1px solid rgba(59,130,246,0.3)",
        boxShadow: hovered
          ? `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)`
          : `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.1)`,
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.03) translateZ(12px)`
          : `perspective(900px) rotateX(0) rotateY(0) scale(1) translateZ(0)`,
        transition: hovered
          ? "transform 0.08s linear, box-shadow 0.2s"
          : "transform 0.55s cubic-bezier(.22,1,.36,1), box-shadow 0.4s",
        willChange:"transform",
        animation: !hovered ? "heroFloat 6s ease-in-out infinite" : "none",
      }}>
        {/* Shine */}
        <div style={{
          position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
          background: hovered
            ? `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.1) 0%, transparent 55%)`
            : "linear-gradient(135deg,rgba(255,255,255,0.05),transparent 60%)",
          transition:"background 0.1s",
        }}/>

        {/* Photo */}
        <img src="/foto.jpg" alt="Berlin Sugiyanto"
          style={{width:"100%",aspectRatio:"3/4",objectFit:"cover",objectPosition:"center top",display:"block"}}
          onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
        />
        <div style={{display:"none",width:"100%",aspectRatio:"3/4",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12,background:"var(--navy-3)"}}>
          <div style={{width:72,height:72,borderRadius:16,background:"rgba(29,78,216,0.15)",border:"1px solid rgba(59,130,246,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Clash Display',sans-serif",fontWeight:700,fontSize:24,color:"var(--blue-3)"}}>BS</div>
          <span style={{fontSize:10,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px"}}>foto.jpg</span>
        </div>

        {/* Bottom bar overlay */}
        <div style={{
          position:"absolute",bottom:0,left:0,right:0,zIndex:3,
          padding:"20px 18px 16px",
          background:"linear-gradient(to top,rgba(6,14,30,0.95) 0%,rgba(6,14,30,0.6) 60%,transparent 100%)",
        }}>
          <div style={{fontSize:13,fontWeight:700,color:"#F0F6FF",fontFamily:"'Outfit',sans-serif"}}>Berlin Sugiyanto</div>
          <div style={{fontSize:10,color:"var(--cyan)",fontFamily:"'JetBrains Mono',monospace",marginTop:2,letterSpacing:"0.5px"}}>Junior Backend Developer</div>
        </div>

        {/* Corner brackets */}
        {[
          {top:10,left:10,borderTop:"2px solid rgba(6,182,212,0.6)",borderLeft:"2px solid rgba(6,182,212,0.6)",borderRadius:"4px 0 0 0"},
          {top:10,right:10,borderTop:"2px solid rgba(6,182,212,0.6)",borderRight:"2px solid rgba(6,182,212,0.6)",borderRadius:"0 4px 0 0"},
          {bottom:10,left:10,borderBottom:"2px solid rgba(6,182,212,0.6)",borderLeft:"2px solid rgba(6,182,212,0.6)",borderRadius:"0 0 0 4px"},
          {bottom:10,right:10,borderBottom:"2px solid rgba(6,182,212,0.6)",borderRight:"2px solid rgba(6,182,212,0.6)",borderRadius:"0 0 4px 0"},
        ].map((s,i)=>(
          <div key={i} style={{position:"absolute",width:18,height:18,pointerEvents:"none",zIndex:4,...s}}/>
        ))}
      </div>

      {/* Floating badge */}
      <div style={{
        position:"absolute", top:-12, right:-12, zIndex:5,
        background:"linear-gradient(135deg,#1D4ED8,#06B6D4)",
        borderRadius:10, padding:"6px 12px",
        fontSize:10.5, fontWeight:700, color:"#fff",
        fontFamily:"'JetBrains Mono',monospace",
        boxShadow:"0 4px 16px rgba(29,78,216,0.5)",
        border:"2px solid rgba(6,14,30,0.8)",
        animation:"badgePop 3s ease-in-out infinite",
      }}>✦ Available</div>
    </div>
  );
};

const Metric = ({n,l,i}) => {
  const [v,setV]=useState(0);
  const end=parseFloat(n); const suffix=n.replace(/[\d.]/g,""); const isFloat=n.includes(".");
  useEffect(()=>{
    const t=setTimeout(()=>{
      const t0=performance.now();
      const tick=now=>{
        const p=Math.min((now-t0)/1200,1); const e=1-Math.pow(1-p,3);
        setV(isFloat?(e*end).toFixed(2):Math.floor(e*end));
        if(p<1) requestAnimationFrame(tick);
      }; requestAnimationFrame(tick);
    },400+i*150);
    return ()=>clearTimeout(t);
  },[]);
  return (
    <div style={{
      padding:"16px 18px", borderRadius:12,
      background:"rgba(15,31,56,0.7)",
      border:"1px solid rgba(59,130,246,0.15)",
      position:"relative",overflow:"hidden",
      animation:`fadeUp 0.6s cubic-bezier(.22,1,.36,1) ${0.5+i*0.1}s both`,
    }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(to right,#1D4ED8,#06B6D4)"}}/>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,color:"#F0F6FF",lineHeight:1,letterSpacing:"-1px"}}>{v}{suffix}</div>
      <div style={{fontSize:9.5,color:"#6B84A8",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:5,fontFamily:"'JetBrains Mono',monospace"}}>{l}</div>
    </div>
  );
};

const Hero = () => {
  const go = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <section id="hero" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      background:"var(--navy)", position:"relative",
      padding:0, maxWidth:"none", overflow:"hidden",
    }}>
      <Particles/>
      <div style={{position:"absolute",top:"-20%",left:"-10%",width:"55%",height:"70%",background:"radial-gradient(ellipse,rgba(29,78,216,0.1),transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-10%",right:"0%",width:"40%",height:"55%",background:"radial-gradient(ellipse,rgba(6,182,212,0.07),transparent 65%)",pointerEvents:"none"}}/>

      <div style={{
        maxWidth:1200, margin:"0 auto", padding:"100px 64px 80px",
        display:"grid", gridTemplateColumns:"1.1fr 0.9fr",
        gap:72, alignItems:"center", width:"100%", position:"relative", zIndex:1,
      }} className="hero-grid">

        {/* LEFT */}
        <div style={{animation:"fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.1s both"}}>

          {/* New badge — cleaner, no "available_for_work" text */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:10,
            background:"rgba(6,182,212,0.07)",
            border:"1px solid rgba(6,182,212,0.22)",
            padding:"7px 18px", borderRadius:100,
            marginBottom:28,
          }}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#06B6D4",boxShadow:"0 0 8px rgba(6,182,212,0.8)",animation:"pulse-dot 2s infinite",flexShrink:0}}/>
            <span style={{fontSize:11,fontWeight:600,color:"var(--cyan)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px"}}>Open to Work</span>
            <span style={{width:1,height:12,background:"rgba(6,182,212,0.3)"}}/>
            <span style={{fontSize:11,color:"#6B84A8",fontFamily:"'Outfit',sans-serif"}}>Junior Backend Developer</span>
          </div>

          {/* Name — new font style */}
          <h1 style={{
            fontFamily:"'Outfit',sans-serif",
            fontSize:"clamp(44px,5.5vw,76px)",
            fontWeight:800, lineHeight:1.0,
            marginBottom:20, letterSpacing:"-2px",
          }}>
            <span style={{display:"block",color:"var(--white)",fontWeight:300,fontSize:"0.55em",letterSpacing:"4px",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",marginBottom:4,color:"#6B84A8"}}>Hi, I'm</span>
            <span style={{display:"block",color:"var(--white)"}}>Berlin</span>
            <span style={{
              display:"block",
              background:"linear-gradient(135deg,#3B82F6 0%,#06B6D4 50%,#38BDF8 100%)",
              WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent",
              backgroundSize:"200%",animation:"gradShift 4s ease infinite",
            }}>Sugiyanto.</span>
          </h1>

          <p style={{
            fontSize:15, color:"#8BA4C8", maxWidth:420, lineHeight:1.9,
            marginBottom:32, fontFamily:"'Outfit',sans-serif",
          }}>{data.tagline}</p>

          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:44}} className="hero-btns">
            <a href={data.github} target="_blank" rel="noreferrer" className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <button onClick={()=>go("contact")} className="btn-outline">Get in Touch</button>
            <a href="/cv.pdf" download style={{
              display:"inline-flex",alignItems:"center",gap:7,padding:"11px 20px",borderRadius:8,
              background:"rgba(6,182,212,0.07)",color:"var(--cyan)",fontSize:13.5,fontWeight:600,
              textDecoration:"none",border:"1px solid rgba(6,182,212,0.25)",fontFamily:"'Outfit',sans-serif",transition:"all 0.2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(6,182,212,0.14)";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(6,182,212,0.07)";e.currentTarget.style.transform="none";}}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}} className="hero-metrics">
            {[["3.63","GPA / 4.00"],["3+","Projects"],["3yr","Org Exp"]].map(([n,l],i)=>(
              <Metric key={l} n={n} l={l} i={i}/>
            ))}
          </div>
        </div>

        {/* RIGHT — 3D Photo */}
        <div style={{position:"relative",display:"flex",justifyContent:"center",animation:"fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.25s both"}} className="hero-photo-wrap">
          <PhotoCard3D/>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(6,182,212,.5)}70%{box-shadow:0 0 0 9px rgba(6,182,212,0)}}
        @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
        @keyframes heroFloat{0%,100%{transform:translateY(0) perspective(900px) rotateX(2deg) rotateY(-3deg)}50%{transform:translateY(-14px) perspective(900px) rotateX(-2deg) rotateY(3deg)}}
        @keyframes badgePop{0%,100%{transform:scale(1) rotate(-2deg)}50%{transform:scale(1.05) rotate(1deg)}}
        @media(max-width:960px){
          .hero-grid{grid-template-columns:1fr !important;gap:48px !important;padding:88px 32px 64px !important;}
          .hero-photo-wrap{max-width:320px;margin:0 auto;}
        }
        @media(max-width:560px){
          .hero-btns{flex-direction:column;}
          .hero-btns a,.hero-btns button{justify-content:center;}
          .hero-metrics{grid-template-columns:repeat(3,1fr)!important;}
        }
      `}</style>
    </section>
  );
};

export default Hero;
