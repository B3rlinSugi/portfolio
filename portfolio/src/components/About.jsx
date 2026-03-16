import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

function useCounter(target, duration=1400, started=false) {
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!started)return;
    const isFloat=String(target).includes(".");
    const end=parseFloat(target),t0=performance.now();
    const tick=now=>{const p=Math.min((now-t0)/duration,1),e=1-Math.pow(1-p,3);setV(isFloat?(e*end).toFixed(2):Math.floor(e*end));if(p<1)requestAnimationFrame(tick);};
    requestAnimationFrame(tick);
  },[started,target]);
  return v;
}

/* Photo with parallax depth layers on scroll/mouse — NO tilt, uses CSS animation only */
const PhotoParallax = ({ started }) => {
  return (
    <div style={{
      position:"relative",
      opacity:started?1:0,
      transition:"opacity 0.7s ease 0.2s",
    }}>
      {/* Background glow layer */}
      <div style={{
        position:"absolute",inset:-32,
        background:"radial-gradient(ellipse at 40% 60%,rgba(29,78,216,0.2),rgba(6,182,212,0.08) 50%,transparent 70%)",
        borderRadius:32,filter:"blur(24px)",
        animation:"photoGlow 6s ease-in-out infinite",
        pointerEvents:"none",
      }}/>

      {/* Shadow card behind */}
      <div style={{
        position:"absolute",top:16,left:16,right:-16,bottom:-16,
        borderRadius:22,
        background:"linear-gradient(135deg,rgba(29,78,216,0.15),rgba(6,182,212,0.08))",
        border:"1px solid rgba(59,130,246,0.15)",
        animation:"shadowCard 6s ease-in-out infinite",
      }}/>

      {/* Main photo */}
      <div style={{
        position:"relative",zIndex:2,
        borderRadius:20,overflow:"hidden",
        border:"1.5px solid rgba(59,130,246,0.3)",
        boxShadow:"0 24px 64px rgba(0,0,0,0.5),0 0 0 1px rgba(59,130,246,0.1)",
        animation:"mainCard 5s ease-in-out infinite",
      }}>
        <img src="/foto2.jpg" alt="Berlin Sugiyanto"
          style={{width:"100%",aspectRatio:"4/5",objectFit:"cover",objectPosition:"center top",display:"block"}}
          onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
        />
        <div style={{display:"none",width:"100%",aspectRatio:"4/5",alignItems:"center",justifyContent:"center",background:"var(--navy-3)",flexDirection:"column",gap:10}}>
          <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:32,color:"var(--blue-3)"}}>BS</span>
        </div>

        {/* Gradient bottom */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 14px",background:"linear-gradient(to top,rgba(6,14,30,0.92),transparent)",zIndex:2}}>
          <div style={{fontSize:13,fontWeight:700,color:"#F0F6FF",fontFamily:"'Outfit',sans-serif"}}>Berlin Sugiyanto Hutajulu</div>
          <div style={{fontSize:10,color:"var(--cyan)",fontFamily:"'JetBrains Mono',monospace",marginTop:2,letterSpacing:"0.5px"}}>backend_dev · class of 2025</div>
        </div>
      </div>

      {/* University floating card */}
      <div style={{
        position:"absolute",bottom:-18,left:"50%",transform:"translateX(-50%)",
        background:"rgba(10,22,40,0.95)",border:"1px solid rgba(59,130,246,0.2)",
        borderRadius:12,padding:"10px 18px",
        display:"flex",alignItems:"center",gap:10,
        backdropFilter:"blur(12px)",
        whiteSpace:"nowrap",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
        zIndex:5,animation:"floatBadge 5s ease-in-out infinite",
      }}>
        <img src="https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Logo_Universitas_Gunadarma.png/220px-Logo_Universitas_Gunadarma.png"
          alt="UG" style={{height:26,objectFit:"contain",flexShrink:0}}
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

const StatCard = ({ n, l, icon, delay, started }) => {
  const num=parseFloat(n),suffix=n.replace(/[\d.]/g,"");
  const count=useCounter(num,1400,started);
  const [hovered,setHovered]=useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{
      padding:"20px 18px",
      background:hovered?"rgba(29,78,216,0.1)":"rgba(15,31,56,0.6)",
      border:`1px solid ${hovered?"rgba(59,130,246,0.35)":"rgba(59,130,246,0.12)"}`,
      borderRadius:14,position:"relative",overflow:"hidden",
      opacity:started?1:0,
      transform:started?"translateY(0)":"translateY(20px)",
      transition:`opacity .55s ease ${delay}ms,transform .55s cubic-bezier(.22,1,.36,1) ${delay}ms,background .2s,border-color .2s,box-shadow .2s`,
      boxShadow:hovered?"0 0 28px rgba(29,78,216,0.1)":"none",
      cursor:"default",
    }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:hovered?"linear-gradient(to right,#1D4ED8,#06B6D4)":"linear-gradient(to right,rgba(29,78,216,0.2),transparent)",transition:"background 0.3s"}}/>
      <div style={{fontSize:18,marginBottom:8}}>{icon}</div>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:34,fontWeight:800,color:"var(--white)",lineHeight:1,letterSpacing:"-1.5px"}}>{count}{suffix}</div>
      <div style={{fontSize:9.5,color:hovered?"var(--cyan)":"var(--muted)",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:6,fontFamily:"'JetBrains Mono',monospace",transition:"color 0.2s"}}>{l}</div>
    </div>
  );
};

const About = () => {
  const ref=useRef(null);
  const [started,setStarted]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);obs.disconnect();}},{threshold:0.08});
    if(ref.current)obs.observe(ref.current);
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

      <div style={{display:"grid",gridTemplateColumns:"1fr 1.55fr",gap:72,alignItems:"start"}} className="about-grid">

        {/* LEFT */}
        <div style={{paddingBottom:24}}>
          <PhotoParallax started={started}/>
        </div>

        {/* RIGHT */}
        <div>
          {/* Status */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:7,marginBottom:20,
            fontSize:10.5,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",
            color:"#34D399",background:"rgba(16,185,129,0.08)",
            border:"1px solid rgba(16,185,129,0.2)",padding:"5px 14px",borderRadius:100,
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

          {/* Location — clean, no $ symbol */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:10,marginBottom:22,
            padding:"9px 16px",
            background:"rgba(15,31,56,0.7)",border:"1px solid rgba(59,130,246,0.14)",
            borderRadius:10,
            opacity:started?1:0,transition:"opacity 0.5s ease 0.4s",
          }}>
            <span style={{fontSize:15}}>📍</span>
            <div>
              <div style={{fontSize:9.5,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px",textTransform:"uppercase",marginBottom:1}}>Location</div>
              <div style={{fontSize:13,fontWeight:600,color:"var(--white-2)",fontFamily:"'Outfit',sans-serif"}}>{data.location}</div>
            </div>
          </div>

          {/* Open to work — redesigned, no "available: true" */}
          <div style={{
            padding:"20px 22px",marginBottom:28,
            background:"rgba(15,31,56,0.5)",
            border:"1px solid rgba(59,130,246,0.15)",
            borderRadius:14,
            display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,
            opacity:started?1:0,
            transform:started?"translateY(0)":"translateY(12px)",
            transition:"opacity 0.6s ease 0.5s,transform 0.6s ease 0.5s",
          }}>
            <div style={{gridColumn:"1/-1",marginBottom:4}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--white-2)",fontFamily:"'Outfit',sans-serif",marginBottom:4}}>Currently seeking opportunities</div>
              <div style={{fontSize:13,color:"var(--muted)",fontFamily:"'Outfit',sans-serif",lineHeight:1.6}}>Junior Backend Developer roles in Jabodetabek or remote worldwide.</div>
            </div>
            {["Full-time","Contract","Remote","Hybrid"].map(t=>(
              <div key={t} style={{
                display:"flex",alignItems:"center",gap:8,
                padding:"8px 12px",borderRadius:8,
                background:"rgba(6,182,212,0.06)",border:"1px solid rgba(6,182,212,0.15)",
              }}>
                <span style={{width:5,height:5,borderRadius:"50%",background:"var(--cyan)",flexShrink:0}}/>
                <span style={{fontSize:12,fontWeight:600,color:"var(--cyan)",fontFamily:"'Outfit',sans-serif"}}>{t}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}} className="about-stats">
            {stats.map(({n,l,icon},i)=>(
              <StatCard key={l} n={n} l={l} icon={icon} delay={550+i*100} started={started}/>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes photoGlow{0%,100%{opacity:0.7;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        @keyframes shadowCard{0%,100%{transform:translate(0,0)}50%{transform:translate(4px,8px)}}
        @keyframes mainCard{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes floatBadge{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-5px)}}
        @media(max-width:900px){.about-grid{grid-template-columns:1fr !important;gap:60px !important;}}
        @media(max-width:480px){.about-stats{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </section>
  );
};

export default About;
