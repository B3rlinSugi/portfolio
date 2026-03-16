import { data } from "../data/portfolioData";
import { useEffect, useRef, useState } from "react";

/* ── Particle canvas ── */
const Particles = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const dots = Array.from({length:55},()=>({
      x: Math.random()*W, y: Math.random()*H,
      vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3,
      r: Math.random()*1.4+0.4,
      a: Math.random()*0.35+0.06,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      dots.forEach(d=>{
        d.x+=d.vx; d.y+=d.vy;
        if(d.x<0||d.x>W) d.vx*=-1;
        if(d.y<0||d.y>H) d.vy*=-1;
        ctx.beginPath();
        ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(59,130,246,${d.a})`;
        ctx.fill();
      });
      // lines between nearby dots
      for(let i=0;i<dots.length;i++){
        for(let j=i+1;j<dots.length;j++){
          const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<120){
            ctx.beginPath();
            ctx.moveTo(dots[i].x,dots[i].y);
            ctx.lineTo(dots[j].x,dots[j].y);
            ctx.strokeStyle=`rgba(59,130,246,${0.06*(1-dist/120)})`;
            ctx.lineWidth=0.8;
            ctx.stroke();
          }
        }
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>{
      W=canvas.width=canvas.offsetWidth;
      H=canvas.height=canvas.offsetHeight;
    };
    window.addEventListener("resize",onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",onResize); };
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
};

/* ── Typing animation ── */
const CodeLine = ({lineNum,text}) => {
  const tokens=[];
  let s=text;
  while(s.length>0){
    const kw=s.match(/^(const|true|false)\b/);
    if(kw){tokens.push({t:kw[0],c:"#818CF8",w:"600"});s=s.slice(kw[0].length);continue;}
    const key=s.match(/^(name|role|stack|available)(?=:)/);
    if(key){tokens.push({t:key[0],c:"#38BDF8",w:"500"});s=s.slice(key[0].length);continue;}
    if(s[0]==='"'){const e=s.indexOf('"',1);if(e!==-1){tokens.push({t:s.slice(0,e+1),c:"#34D399",w:"400"});s=s.slice(e+1);continue;}}
    if(/^[{}\[\]:,;]/.test(s)){tokens.push({t:s[0],c:"#475569",w:"400"});s=s.slice(1);continue;}
    const w=s.match(/^\w+/);
    if(w){tokens.push({t:w[0],c:"#CBD5E1",w:"400"});s=s.slice(w[0].length);continue;}
    tokens.push({t:s[0],c:"#64748B",w:"400"});s=s.slice(1);
  }
  return (
    <div style={{display:"flex",alignItems:"baseline",lineHeight:1.9}}>
      <span style={{color:"#334155",marginRight:18,userSelect:"none",fontSize:10.5,minWidth:16,textAlign:"right",flexShrink:0,fontFamily:"'JetBrains Mono',monospace"}}>{String(lineNum).padStart(2,"0")}</span>
      <span style={{fontSize:12.5,fontFamily:"'JetBrains Mono',monospace"}}>
        {tokens.map((t,i)=><span key={i} style={{color:t.c,fontWeight:t.w}}>{t.t}</span>)}
      </span>
    </div>
  );
};

/* ── Metric card ── */
const Metric = ({n,l,i}) => {
  const [v,setV]=useState(0);
  const end=parseFloat(n);
  const suffix=n.replace(/[\d.]/g,"");
  const isFloat=n.includes(".");
  useEffect(()=>{
    const t=setTimeout(()=>{
      const t0=performance.now();
      const tick=now=>{
        const p=Math.min((now-t0)/1200,1);
        const e=1-Math.pow(1-p,3);
        setV(isFloat?(e*end).toFixed(2):Math.floor(e*end));
        if(p<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },300+i*150);
    return ()=>clearTimeout(t);
  },[]);
  return (
    <div style={{
      padding:"18px 20px",
      background:"rgba(15,31,56,0.6)",
      border:"1px solid rgba(59,130,246,0.15)",
      borderRadius:12,
      position:"relative",overflow:"hidden",
      animation:`fadeUp 0.6s cubic-bezier(.22,1,.36,1) ${0.4+i*0.1}s both`,
    }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(to right,#1D4ED8,#06B6D4)"}}/>
      <div style={{
        fontFamily:"'Bricolage Grotesque',sans-serif",
        fontSize:32,fontWeight:800,
        color:"#F0F6FF",lineHeight:1,letterSpacing:"-1.5px",
      }}>{v}{suffix}</div>
      <div style={{fontSize:10,color:"#6B84A8",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:6,fontFamily:"'JetBrains Mono',monospace"}}>{l}</div>
    </div>
  );
};

const Hero = () => {
  const go=(id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  const [typed,setTyped]=useState("");
  const [cur,setCur]=useState(true);
  const full=`const developer = {\n  name: "Berlin Sugiyanto",\n  role: "Backend Developer",\n  stack: ["PHP","Java","MySQL"],\n  available: true\n};`;

  useEffect(()=>{
    let i=0;
    const iv=setInterval(()=>{
      if(i<=full.length){setTyped(full.slice(0,i));i++;}
      else clearInterval(iv);
    },24);
    return ()=>clearInterval(iv);
  },[]);
  useEffect(()=>{const c=setInterval(()=>setCur(p=>!p),530);return ()=>clearInterval(c);},[]);

  const lines=typed.split("\n");

  return (
    <section id="hero" style={{
      minHeight:"100vh",display:"flex",alignItems:"center",
      background:"var(--navy)",position:"relative",
      padding:0,maxWidth:"none",overflow:"hidden",
    }}>
      {/* Animated particles */}
      <Particles/>

      {/* Radial glows */}
      <div style={{position:"absolute",top:"-20%",left:"-10%",width:"60%",height:"70%",background:"radial-gradient(ellipse,rgba(29,78,216,0.12) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-10%",right:"-5%",width:"45%",height:"60%",background:"radial-gradient(ellipse,rgba(6,182,212,0.07) 0%,transparent 65%)",pointerEvents:"none"}}/>

      {/* Horizontal grid lines */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px)",
        backgroundSize:"100% 64px",
      }}/>

      <div style={{
        maxWidth:1200,margin:"0 auto",padding:"100px 64px 80px",
        display:"grid",gridTemplateColumns:"1.05fr 0.95fr",
        gap:64,alignItems:"center",width:"100%",position:"relative",zIndex:1,
      }} className="hero-grid">

        {/* LEFT */}
        <div style={{animation:"fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.1s both"}}>
          {/* Badge */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.25)",
            padding:"5px 14px",borderRadius:100,
            fontSize:11,fontWeight:600,color:"#34D399",
            letterSpacing:"0.8px",marginBottom:28,
            fontFamily:"'JetBrains Mono',monospace",
          }}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#10B981",animation:"pulse-dot 2s infinite",flexShrink:0}}/>
            available_for_work · true
          </div>

          <h1 style={{
            fontFamily:"'Bricolage Grotesque',sans-serif",
            fontSize:"clamp(42px,5.5vw,74px)",
            fontWeight:800,lineHeight:0.96,
            marginBottom:20,letterSpacing:"-2.5px",
          }}>
            <span style={{display:"block",color:"var(--white)"}}>Berlin</span>
            <span style={{
              display:"block",
              background:"linear-gradient(135deg,#3B82F6 0%,#06B6D4 60%,#818CF8 100%)",
              WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent",
              backgroundSize:"200% 200%",animation:"gradShift 5s ease infinite",
            }}>Sugiyanto</span>
          </h1>

          <div style={{
            display:"inline-flex",alignItems:"center",gap:10,marginBottom:18,
          }}>
            <div style={{width:28,height:1.5,background:"linear-gradient(to right,#1D4ED8,transparent)"}}/>
            <span style={{
              fontSize:12,fontWeight:600,color:"var(--cyan)",
              letterSpacing:"2px",textTransform:"uppercase",
              fontFamily:"'JetBrains Mono',monospace",
            }}>{data.title}</span>
          </div>

          <p style={{
            fontSize:15,color:"#8BA4C8",maxWidth:420,lineHeight:1.9,
            marginBottom:34,fontFamily:"'Outfit',sans-serif",
          }}>{data.tagline}</p>

          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:44}} className="hero-btns">
            <a href={data.github} target="_blank" rel="noreferrer" className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <button onClick={()=>go("contact")} className="btn-outline">Get in Touch</button>
            <a href="/cv.pdf" download="Berlin_Sugiyanto_CV.pdf" style={{
              display:"inline-flex",alignItems:"center",gap:7,
              padding:"11px 20px",borderRadius:8,
              background:"rgba(6,182,212,0.07)",color:"var(--cyan)",
              fontSize:13.5,fontWeight:600,textDecoration:"none",
              border:"1px solid rgba(6,182,212,0.25)",
              fontFamily:"'Outfit',sans-serif",transition:"all 0.2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(6,182,212,0.14)";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(6,182,212,0.07)";e.currentTarget.style.transform="none";}}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>

          {/* Metrics */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}} className="hero-metrics">
            {[["3.63","GPA / 4.00"],["3+","Projects"],["3yr","Org Exp"]].map(([n,l],i)=>(
              <Metric key={l} n={n} l={l} i={i}/>
            ))}
          </div>
        </div>

        {/* RIGHT — terminal */}
        <div style={{position:"relative",animation:"fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.25s both"}} className="hero-terminal-wrap">
          {/* Glow behind terminal */}
          <div style={{
            position:"absolute",top:"50%",left:"50%",
            transform:"translate(-50%,-50%)",
            width:"90%",height:"80%",
            background:"radial-gradient(ellipse,rgba(29,78,216,0.18),transparent 65%)",
            pointerEvents:"none",zIndex:0,
          }}/>

          {/* Stack pills */}
          <div style={{display:"flex",gap:7,marginBottom:12,justifyContent:"flex-end"}} className="hero-badges">
            {[
              {l:"PHP 8",c:"#818CF8",bg:"rgba(129,140,248,0.08)"},
              {l:"MySQL",c:"#38BDF8",bg:"rgba(56,189,248,0.08)"},
              {l:"Laravel",c:"#FB7185",bg:"rgba(251,113,133,0.08)"},
            ].map(({l,c,bg})=>(
              <div key={l} style={{
                background:bg,border:`1px solid ${c}30`,
                borderRadius:7,padding:"4px 12px",
                fontSize:11,fontWeight:600,color:c,
                fontFamily:"'JetBrains Mono',monospace",
              }}>{l}</div>
            ))}
          </div>

          {/* Terminal window */}
          <div style={{
            background:"rgba(6,14,30,0.92)",
            borderRadius:14,overflow:"hidden",
            border:"1px solid rgba(59,130,246,0.2)",
            boxShadow:"0 32px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(59,130,246,0.06),inset 0 1px 0 rgba(255,255,255,0.04)",
            position:"relative",zIndex:1,
          }}>
            {/* Titlebar */}
            <div style={{
              display:"flex",alignItems:"center",gap:7,
              padding:"11px 16px",background:"rgba(15,31,56,0.8)",
              borderBottom:"1px solid rgba(59,130,246,0.1)",
            }}>
              {["#EF4444","#F59E0B","#22C55E"].map((c,i)=>(
                <span key={i} style={{width:10,height:10,borderRadius:"50%",background:c,flexShrink:0}}/>
              ))}
              <span style={{marginLeft:10,fontSize:11,color:"#3D5478",fontFamily:"'JetBrains Mono',monospace"}}>
                ~/portfolio/developer.ts
              </span>
              <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"rgba(59,130,246,0.3)",animation:"blink 2s step-end infinite"}}/>
                <span style={{fontSize:9.5,color:"#3D5478",fontFamily:"'JetBrains Mono',monospace"}}>TypeScript</span>
              </div>
            </div>

            {/* Code */}
            <div style={{padding:"20px 20px 22px"}}>
              {lines.map((line,i)=>(
                <div key={i} style={{display:"flex",alignItems:"baseline"}}>
                  <CodeLine lineNum={i+1} text={line}/>
                  {i===lines.length-1&&(
                    <span style={{
                      display:"inline-block",width:7,height:"0.85em",
                      background:cur?"#818CF8":"transparent",
                      marginLeft:1,verticalAlign:"text-bottom",flexShrink:0,
                    }}/>
                  )}
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div style={{
              display:"flex",justifyContent:"space-between",alignItems:"center",
              padding:"7px 16px",
              background:"linear-gradient(to right,#1D4ED8,#0369A1)",
            }}>
              <span style={{fontSize:10.5,color:"rgba(255,255,255,0.9)",fontFamily:"'JetBrains Mono',monospace"}}>● NORMAL</span>
              <span style={{fontSize:10.5,color:"rgba(255,255,255,0.6)",fontFamily:"'JetBrains Mono',monospace"}}>UTF-8 · TypeScript</span>
              <span style={{fontSize:10.5,color:"rgba(255,255,255,0.6)",fontFamily:"'JetBrains Mono',monospace"}}>
                {lines.length}:{lines[lines.length-1]?.length??0}
              </span>
            </div>
          </div>

          {/* Location card */}
          <div style={{
            marginTop:12,
            background:"rgba(15,31,56,0.7)",
            border:"1px solid rgba(59,130,246,0.14)",
            borderRadius:10,padding:"10px 16px",
            display:"inline-flex",alignItems:"center",gap:10,
            backdropFilter:"blur(8px)",
          }}>
            <div style={{
              width:28,height:28,borderRadius:7,
              background:"rgba(29,78,216,0.15)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:14,
            }}>📍</div>
            <div>
              <div style={{fontSize:9.5,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace",marginBottom:1}}>LOCATION</div>
              <div style={{fontSize:12,fontWeight:600,color:"var(--white-2)",fontFamily:"'Outfit',sans-serif"}}>{data.location}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)}70%{box-shadow:0 0 0 9px rgba(16,185,129,0)}}
        @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
        @media (max-width:960px){
          .hero-grid{grid-template-columns:1fr !important;gap:40px !important;padding:88px 32px 64px !important;}
          .hero-badges{flex-wrap:wrap;}
        }
        @media (max-width:560px){
          .hero-btns{flex-direction:column;}
          .hero-btns a,.hero-btns button{justify-content:center;}
          .hero-metrics{grid-template-columns:repeat(3,1fr)!important;}
        }
      `}</style>
    </section>
  );
};

export default Hero;
