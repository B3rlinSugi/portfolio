import { data } from "../data/portfolioData";
import { useEffect, useRef, useState } from "react";

const Particles = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth, H = canvas.height = canvas.offsetHeight;
    const dots = Array.from({length:45},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.25,vy:(Math.random()-0.5)*0.25,r:Math.random()*1.2+0.4,a:Math.random()*0.25+0.05}));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      dots.forEach(d=>{d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>W)d.vx*=-1;if(d.y<0||d.y>H)d.vy*=-1;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle=`rgba(59,130,246,${d.a})`;ctx.fill();});
      for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){const dx=dots[i].x-dots[j].x,dy=dots[i].y-dots[j].y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<100){ctx.beginPath();ctx.moveTo(dots[i].x,dots[i].y);ctx.lineTo(dots[j].x,dots[j].y);ctx.strokeStyle=`rgba(59,130,246,${0.05*(1-dist/100)})`;ctx.lineWidth=0.6;ctx.stroke();}}
      raf=requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>{W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;};
    window.addEventListener("resize",onResize);
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onResize);};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
};

/* ── Morph Border Photo ── */
const PhotoMorph = () => {
  return (
    <div style={{position:"relative",width:220,height:220,margin:"0 auto",flexShrink:0}}>

      {/* Animated morph border ring 1 */}
      <div style={{
        position:"absolute",inset:-8,
        borderRadius:"60% 40% 55% 45% / 50% 60% 40% 50%",
        background:"linear-gradient(135deg,#1D4ED8,#06B6D4,#3B82F6,#8B5CF6)",
        animation:"morphBorder1 7s ease-in-out infinite",
        zIndex:0,
      }}/>

      {/* Ring 2 — counter rotate */}
      <div style={{
        position:"absolute",inset:-4,
        borderRadius:"40% 60% 45% 55% / 60% 40% 60% 40%",
        background:"linear-gradient(225deg,rgba(6,182,212,0.5),rgba(29,78,216,0.3),transparent)",
        animation:"morphBorder2 5s ease-in-out infinite",
        zIndex:1,
      }}/>

      {/* Photo container — morph clip */}
      <div style={{
        position:"relative",zIndex:2,
        width:"100%",height:"100%",
        borderRadius:"60% 40% 55% 45% / 50% 60% 40% 50%",
        overflow:"hidden",
        animation:"morphBorder1 7s ease-in-out infinite",
        boxShadow:"0 0 60px rgba(29,78,216,0.35), 0 0 120px rgba(6,182,212,0.15)",
      }}>
        {/* Scan line */}
        <div style={{
          position:"absolute",left:0,right:0,height:2,zIndex:5,
          background:"linear-gradient(to right,transparent,rgba(6,182,212,0.7),transparent)",
          animation:"scanLine 3.5s linear infinite",
          pointerEvents:"none",
        }}/>

        <img src="/foto.jpg" alt="Berlin Sugiyanto"
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}
          onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
        />
        <div style={{display:"none",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,background:"var(--navy-3)"}}>
          <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:32,color:"var(--blue-3)"}}>BS</span>
        </div>
      </div>

      {/* Floating badge — Open to Work */}
      <div style={{
        position:"absolute",top:-10,right:-20,zIndex:6,
        background:"linear-gradient(135deg,#1D4ED8,#06B6D4)",
        borderRadius:10,padding:"6px 12px",
        fontSize:10,fontWeight:700,color:"#fff",
        fontFamily:"'JetBrains Mono',monospace",
        boxShadow:"0 4px 20px rgba(29,78,216,0.5)",
        border:"2px solid rgba(6,14,30,0.9)",
        animation:"badgeFloat 4s ease-in-out infinite",
        display:"flex",alignItems:"center",gap:6,
        whiteSpace:"nowrap",
      }}>
        <span style={{width:5,height:5,borderRadius:"50%",background:"#fff",boxShadow:"0 0 6px #fff"}}/>
        Open to Work
      </div>

      {/* Stack badge bottom */}
      <div style={{
        position:"absolute",bottom:-12,left:"50%",transform:"translateX(-50%)",zIndex:6,
        background:"rgba(10,22,40,0.95)",
        border:"1px solid rgba(59,130,246,0.25)",
        borderRadius:10,padding:"7px 14px",
        display:"flex",alignItems:"center",gap:8,
        backdropFilter:"blur(10px)",
        boxShadow:"0 4px 20px rgba(0,0,0,0.4)",
        animation:"badgeFloat2 4.5s ease-in-out infinite",
        whiteSpace:"nowrap",
      }}>
        <div style={{width:6,height:6,borderRadius:"50%",background:"#22C55E",boxShadow:"0 0 8px rgba(34,197,94,0.7)",flexShrink:0}}/>
        <span style={{fontSize:10.5,fontWeight:600,color:"var(--white-2)",fontFamily:"'JetBrains Mono',monospace"}}>PHP · MySQL · Laravel</span>
      </div>
    </div>
  );
};

const Metric = ({n,l,i}) => {
  const [v,setV]=useState(0);
  const end=parseFloat(n),suffix=n.replace(/[\d.]/g,""),isFloat=n.includes(".");
  useEffect(()=>{
    const t=setTimeout(()=>{
      const t0=performance.now();
      const tick=now=>{const p=Math.min((now-t0)/1200,1),e=1-Math.pow(1-p,3);setV(isFloat?(e*end).toFixed(2):Math.floor(e*end));if(p<1)requestAnimationFrame(tick);};
      requestAnimationFrame(tick);
    },600+i*150);
    return ()=>clearTimeout(t);
  },[]);
  return (
    <div style={{
      padding:"14px 20px",borderRadius:12,
      background:"rgba(15,31,56,0.7)",border:"1px solid rgba(59,130,246,0.15)",
      position:"relative",overflow:"hidden",
      animation:`fadeUp 0.6s cubic-bezier(.22,1,.36,1) ${0.7+i*0.1}s both`,
      minWidth:100,
    }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(to right,#1D4ED8,#06B6D4)"}}/>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:26,fontWeight:800,color:"#F0F6FF",lineHeight:1,letterSpacing:"-1px"}}>{v}{suffix}</div>
      <div style={{fontSize:9,color:"#6B84A8",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:5,fontFamily:"'JetBrains Mono',monospace"}}>{l}</div>
    </div>
  );
};

const Hero = () => {
  const go = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <section id="hero" style={{
      minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      background:"var(--navy)",position:"relative",
      padding:0,maxWidth:"none",overflow:"hidden",
    }}>
      <Particles/>

      {/* Ambient glows */}
      <div style={{position:"absolute",top:"-15%",left:"10%",width:"40%",height:"60%",background:"radial-gradient(ellipse,rgba(29,78,216,0.12),transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-10%",right:"10%",width:"35%",height:"50%",background:"radial-gradient(ellipse,rgba(6,182,212,0.07),transparent 65%)",pointerEvents:"none"}}/>

      {/* ── Centered Layout ── */}
      <div style={{
        maxWidth:780,margin:"0 auto",padding:"100px 32px 80px",
        display:"flex",flexDirection:"column",alignItems:"center",
        textAlign:"center",position:"relative",zIndex:1,width:"100%",
      }}>

        {/* Status badge */}
        <div style={{
          display:"inline-flex",alignItems:"center",gap:10,
          background:"rgba(6,182,212,0.06)",border:"1px solid rgba(6,182,212,0.2)",
          padding:"7px 18px",borderRadius:100,marginBottom:36,
          animation:"fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.05s both",
        }}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#06B6D4",boxShadow:"0 0 8px rgba(6,182,212,0.8)",animation:"pulse-dot 2s infinite",flexShrink:0}}/>
          <span style={{fontSize:11,fontWeight:600,color:"var(--cyan)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px"}}>Open to Work</span>
          <span style={{width:1,height:12,background:"rgba(6,182,212,0.3)"}}/>
          <span style={{fontSize:11,color:"#6B84A8",fontFamily:"'Outfit',sans-serif"}}>Junior Backend Developer</span>
        </div>

        {/* ── Photo morph ── */}
        <div style={{animation:"fadeUp 0.65s cubic-bezier(.22,1,.36,1) 0.15s both",marginBottom:48}}>
          <PhotoMorph/>
        </div>

        {/* ── Name ── */}
        <div style={{animation:"fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.25s both",marginBottom:16}}>
          <h1 style={{
            fontFamily:"'Outfit',sans-serif",
            fontWeight:900,
            lineHeight:0.88,
            letterSpacing:"-4px",
            margin:0,
          }}>
            <span style={{
              display:"block",
              fontSize:"clamp(64px,10vw,120px)",
              color:"var(--white)",
            }}>Berlin</span>
            <span style={{
              display:"block",
              fontSize:"clamp(64px,10vw,120px)",
              background:"linear-gradient(135deg,#3B82F6,#06B6D4 50%,#38BDF8)",
              WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent",
              backgroundSize:"200%",animation:"gradShift 4s ease infinite",
            }}>Sugiyanto</span>
          </h1>
          <div style={{
            fontSize:"clamp(11px,1.2vw,15px)",
            color:"var(--muted)",fontWeight:400,letterSpacing:"5px",
            textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",
            marginTop:16,
          }}>Backend Developer</div>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize:15,color:"#8BA4C8",maxWidth:480,lineHeight:1.9,
          marginBottom:36,fontFamily:"'Outfit',sans-serif",
          animation:"fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.35s both",
        }}>{data.tagline}</p>

        {/* CTA Buttons */}
        <div style={{
          display:"flex",gap:12,flexWrap:"wrap",marginBottom:48,justifyContent:"center",
          animation:"fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.42s both",
        }} className="hero-btns">
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

        {/* Metrics */}
        <div style={{
          display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",
          animation:"fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.5s both",
        }} className="hero-metrics">
          {[["3.63","GPA / 4.00"],["3+","Projects"],["3yr","Org Exp"]].map(([n,l],i)=>(
            <Metric key={l} n={n} l={l} i={i}/>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(6,182,212,.5)}70%{box-shadow:0 0 0 9px rgba(6,182,212,0)}}
        @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes scanLine{0%{top:-2px}100%{top:101%}}

        /* Morph border animations */
        @keyframes morphBorder1 {
          0%   { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
          20%  { border-radius: 40% 60% 35% 65% / 65% 35% 70% 30%; }
          40%  { border-radius: 55% 45% 60% 40% / 40% 60% 50% 50%; }
          60%  { border-radius: 45% 55% 40% 60% / 55% 45% 35% 65%; }
          80%  { border-radius: 65% 35% 50% 50% / 35% 65% 55% 45%; }
          100% { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
        }
        @keyframes morphBorder2 {
          0%   { border-radius: 40% 60% 45% 55% / 60% 40% 60% 40%; transform: rotate(0deg); }
          33%  { border-radius: 55% 45% 60% 40% / 40% 60% 45% 55%; transform: rotate(-8deg); }
          66%  { border-radius: 45% 55% 35% 65% / 55% 45% 65% 35%; transform: rotate(5deg); }
          100% { border-radius: 40% 60% 45% 55% / 60% 40% 60% 40%; transform: rotate(0deg); }
        }

        @keyframes badgeFloat{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-6px) rotate(1deg)}}
        @keyframes badgeFloat2{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-5px)}}

        @media(max-width:560px){
          .hero-btns{flex-direction:column;align-items:center;}
          .hero-btns a,.hero-btns button{justify-content:center;width:100%;max-width:280px;}
        }
      `}</style>
    </section>
  );
};

export default Hero;
