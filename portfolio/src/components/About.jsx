import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

function useCounter(target, duration=1400, started=false) {
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!started) return;
    const isFloat=String(target).includes(".");
    const end=parseFloat(target);
    const t0=performance.now();
    const tick=now=>{
      const p=Math.min((now-t0)/duration,1),e=1-Math.pow(1-p,3);
      setV(isFloat?(e*end).toFixed(2):Math.floor(e*end));
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },[started,target]);
  return v;
}

/* 3D tilt photo */
const Photo3D = ({ started }) => {
  const ref=useRef(null), rafRef=useRef(null);
  const [tilt,setTilt]=useState({rx:0,ry:0,gx:50,gy:50});
  const [hovered,setHovered]=useState(false);

  const onMove=e=>{
    const el=ref.current; if(!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current=requestAnimationFrame(()=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      setTilt({rx:(y-0.5)*-16, ry:(x-0.5)*16, gx:Math.round(x*100), gy:Math.round(y*100)});
    });
  };
  const onLeave=()=>{ cancelAnimationFrame(rafRef.current); setHovered(false); setTilt({rx:0,ry:0,gx:50,gy:50}); };

  return (
    <div ref={ref} onMouseEnter={()=>setHovered(true)} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        perspective:"900px", position:"relative",
        opacity:started?1:0, transition:"opacity 0.7s ease 0.2s",
      }}
    >
      {/* Glow */}
      <div style={{
        position:"absolute",inset:-24,borderRadius:28,
        background:`radial-gradient(ellipse at ${tilt.gx}% ${tilt.gy}%,rgba(29,78,216,0.3),transparent 65%)`,
        transition:hovered?"none":"all 0.6s",filter:"blur(20px)",pointerEvents:"none",
      }}/>

      <div style={{
        borderRadius:22, overflow:"hidden",
        border:"1px solid rgba(59,130,246,0.25)",
        transform:hovered
          ?`perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.03) translateZ(10px)`
          :"perspective(900px) rotateX(0) rotateY(0) scale(1)",
        transition:hovered?"transform 0.08s linear":"transform 0.55s cubic-bezier(.22,1,.36,1)",
        boxShadow:hovered?"0 40px 80px rgba(0,0,0,0.55),0 0 0 1px rgba(59,130,246,0.2)":"0 20px 60px rgba(0,0,0,0.5)",
        animation:!hovered?"aboutFloat 7s ease-in-out infinite":"none",
        willChange:"transform",
        position:"relative",
      }}>
        {/* Shine */}
        <div style={{
          position:"absolute",inset:0,zIndex:2,pointerEvents:"none",
          background:hovered
            ?`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%,rgba(255,255,255,0.08),transparent 55%)`
            :"linear-gradient(135deg,rgba(255,255,255,0.04),transparent 60%)",
          transition:"background 0.1s",
        }}/>
        <img src="/foto2.jpg" alt="Berlin Sugiyanto"
          style={{width:"100%",aspectRatio:"3/4",objectFit:"cover",objectPosition:"center top",display:"block"}}
          onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
        />
        <div style={{display:"none",width:"100%",aspectRatio:"3/4",alignItems:"center",justifyContent:"center",background:"var(--navy-3)",flexDirection:"column",gap:10}}>
          <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:32,color:"var(--blue-3)"}}>BS</span>
          <span style={{fontSize:9,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"}}>foto2.jpg</span>
        </div>

        {/* Bottom gradient overlay */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:3,padding:"18px 16px 14px",background:"linear-gradient(to top,rgba(6,14,30,0.92),transparent)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#F0F6FF",fontFamily:"'Outfit',sans-serif"}}>Berlin Sugiyanto Hutajulu</div>
          <div style={{fontSize:10,color:"var(--cyan)",fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>backend_dev · 2025</div>
        </div>

        {/* Corner brackets */}
        {[
          {top:8,left:8,borderTop:"2px solid rgba(6,182,212,0.5)",borderLeft:"2px solid rgba(6,182,212,0.5)",borderRadius:"3px 0 0 0"},
          {top:8,right:8,borderTop:"2px solid rgba(6,182,212,0.5)",borderRight:"2px solid rgba(6,182,212,0.5)",borderRadius:"0 3px 0 0"},
          {bottom:8,left:8,borderBottom:"2px solid rgba(6,182,212,0.5)",borderLeft:"2px solid rgba(6,182,212,0.5)",borderRadius:"0 0 0 3px"},
          {bottom:8,right:8,borderBottom:"2px solid rgba(6,182,212,0.5)",borderRight:"2px solid rgba(6,182,212,0.5)",borderRadius:"0 0 3px 0"},
        ].map((s,i)=>(
          <div key={i} style={{position:"absolute",width:16,height:16,zIndex:4,pointerEvents:"none",...s}}/>
        ))}
      </div>

      {/* University badge — floating */}
      <div style={{
        position:"absolute", bottom:-16, left:"50%", transform:"translateX(-50%)",
        background:"rgba(10,22,40,0.95)",
        border:"1px solid rgba(59,130,246,0.2)",
        borderRadius:12, padding:"10px 18px",
        display:"flex",alignItems:"center",gap:10,
        backdropFilter:"blur(12px)",
        whiteSpace:"nowrap",
        boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
        zIndex:5,
      }}>
        <img src="https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Logo_Universitas_Gunadarma.png/220px-Logo_Universitas_Gunadarma.png"
          alt="UG" style={{height:26,objectFit:"contain"}}
          onError={e=>{e.target.style.display="none";}}
        />
        <div>
          <div style={{fontSize:11,fontWeight:600,color:"var(--white-2)",fontFamily:"'Outfit',sans-serif"}}>Universitas Gunadarma</div>
          <div style={{fontSize:9.5,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"}}>Informatics Eng · GPA 3.63</div>
        </div>
      </div>
    </div>
  );
};

/* Redesigned stat card — big number, icon accent */
const StatCard = ({ n, l, icon, delay, started }) => {
  const num=parseFloat(n), suffix=n.replace(/[\d.]/g,"");
  const count=useCounter(num,1400,started);
  const [hovered,setHovered]=useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{
      padding:"22px 20px",
      background:hovered?"rgba(29,78,216,0.1)":"rgba(15,31,56,0.6)",
      border:`1px solid ${hovered?"rgba(59,130,246,0.35)":"rgba(59,130,246,0.12)"}`,
      borderRadius:16, position:"relative", overflow:"hidden",
      opacity:started?1:0,
      transform:started?"translateY(0) scale(1)":"translateY(20px) scale(0.95)",
      transition:`opacity .55s ease ${delay}ms,transform .55s cubic-bezier(.22,1,.36,1) ${delay}ms,background .2s,border-color .2s,box-shadow .2s`,
      boxShadow:hovered?"0 0 32px rgba(29,78,216,0.12)":"none",
      cursor:"default",
    }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:hovered?"linear-gradient(to right,#1D4ED8,#06B6D4)":"linear-gradient(to right,rgba(29,78,216,0.3),rgba(6,182,212,0.2))",transition:"background 0.3s"}}/>
      <div style={{fontSize:10,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace",marginBottom:8,letterSpacing:"1px"}}>{icon}</div>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:36,fontWeight:800,color:"var(--white)",lineHeight:1,letterSpacing:"-1.5px"}}>{count}{suffix}</div>
      <div style={{fontSize:10,color:hovered?"var(--cyan)":"var(--muted)",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:6,fontFamily:"'JetBrains Mono',monospace",transition:"color 0.2s"}}>{l}</div>
    </div>
  );
};

const About = () => {
  const ref=useRef(null);
  const [started,setStarted]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);obs.disconnect();}},{threshold:0.08});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  const stats=[
    {n:"3.63",l:"GPA / 4.00",icon:"🎓"},
    {n:"3",l:"Projects",icon:"⚙️"},
    {n:"3",l:"Org Periods",icon:"🏛️"},
    {n:"5",l:"Tech Stacks",icon:"🛠️"},
  ];

  return (
    <section id="about" ref={ref} style={{background:"var(--navy-2)",borderTop:"1px solid rgba(59,130,246,0.07)"}}>
      <p className="s-label" style={{opacity:started?1:0,transition:"opacity .5s"}}>about_me</p>
      <h2 className="s-title" style={{opacity:started?1:0,transform:started?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Who I am</h2>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1.55fr",gap:64,alignItems:"start"}} className="about-grid">

        {/* LEFT — 3D photo */}
        <div style={{paddingBottom:20}}>
          <Photo3D started={started}/>
        </div>

        {/* RIGHT */}
        <div>
          {/* Status pill */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:7,marginBottom:20,
            fontSize:10.5,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",
            color:"#34D399",background:"rgba(16,185,129,0.08)",
            border:"1px solid rgba(16,185,129,0.2)",
            padding:"5px 14px",borderRadius:100,
            fontFamily:"'JetBrains Mono',monospace",
            opacity:started?1:0,transition:"opacity 0.5s ease 0.15s",
          }}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 6px rgba(16,185,129,0.6)"}}/>
            Fresh Graduate · Backend Specialist
          </div>

          {/* Bio */}
          <p style={{
            fontSize:15,lineHeight:1.95,color:"#8BA4C8",marginBottom:22,
            fontFamily:"'Outfit',sans-serif",
            opacity:started?1:0,transition:"opacity 0.6s ease 0.25s",
          }}>{data.about}</p>

          {/* Location */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:10,marginBottom:20,
            fontSize:12.5,padding:"8px 14px",
            background:"rgba(15,31,56,0.7)",border:"1px solid rgba(59,130,246,0.14)",
            borderRadius:8,fontFamily:"'JetBrains Mono',monospace",
            opacity:started?1:0,transition:"opacity 0.5s ease 0.4s",
          }}>
            <span style={{color:"var(--cyan)"}}>$</span>
            <span style={{color:"var(--muted)"}}>location =</span>
            <span style={{color:"#34D399"}}>"{data.location}"</span>
          </div>

          {/* Open to work */}
          <div style={{
            padding:"16px 20px",marginBottom:28,
            background:"rgba(29,78,216,0.06)",
            border:"1px solid rgba(29,78,216,0.18)",
            borderLeft:"3px solid var(--blue-2)",
            borderRadius:"0 10px 10px 0",
            opacity:started?1:0,
            transform:started?"translateX(0)":"translateX(-16px)",
            transition:"opacity 0.6s ease 0.5s,transform 0.6s ease 0.5s",
          }}>
            <span style={{color:"var(--cyan)",fontWeight:600,fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:"2px",textTransform:"uppercase",display:"block",marginBottom:6}}>// open_to_opportunities</span>
            <span style={{fontSize:14,color:"#8BA4C8",lineHeight:1.8,fontFamily:"'Outfit',sans-serif"}}>
              Junior Backend Developer roles — full-time, contract, or remote.<br/>
              <span style={{color:"#34D399",fontWeight:600,fontFamily:"'JetBrains Mono',monospace"}}>available: true</span>
            </span>
          </div>

          {/* Stats — redesigned */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}} className="about-stats">
            {stats.map(({n,l,icon},i)=>(
              <StatCard key={l} n={n} l={l} icon={icon} delay={550+i*100} started={started}/>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes aboutFloat{0%,100%{transform:translateY(0) perspective(900px) rotateX(2deg) rotateY(-4deg)}50%{transform:translateY(-12px) perspective(900px) rotateX(-2deg) rotateY(4deg)}}
        @media(max-width:900px){.about-grid{grid-template-columns:1fr !important;gap:56px !important;}}
        @media(max-width:480px){.about-stats{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </section>
  );
};

export default About;
