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
      const p=Math.min((now-t0)/duration,1);
      const e=1-Math.pow(1-p,3);
      setV(isFloat?(e*end).toFixed(2):Math.floor(e*end));
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },[started,target]);
  return v;
}

const Stat = ({n,l,delay,started}) => {
  const num=parseFloat(n);
  const suffix=n.replace(/[\d.]/g,"");
  const count=useCounter(num,1400,started);
  return (
    <div style={{
      textAlign:"center",padding:"20px 12px",
      background:"rgba(15,31,56,0.6)",
      border:"1px solid rgba(59,130,246,0.14)",
      borderRadius:12,
      position:"relative",overflow:"hidden",
      opacity:started?1:0,
      transform:started?"translateY(0)":"translateY(18px)",
      transition:`opacity .55s ease ${delay}ms,transform .55s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(to right,#1D4ED8,#06B6D4)"}}/>
      <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:30,fontWeight:800,color:"#F0F6FF",lineHeight:1,letterSpacing:"-1px"}}>{count}{suffix}</div>
      <div style={{fontSize:9.5,color:"#6B84A8",marginTop:6,letterSpacing:"1.5px",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace"}}>{l}</div>
    </div>
  );
};

const About = () => {
  const ref=useRef(null);
  const [started,setStarted]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);obs.disconnect();}},{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  const stats=[["3.63","GPA / 4.00"],["3","Projects"],["3","Org Periods"],["5+","Tech Stacks"]];

  return (
    <section id="about" ref={ref} style={{background:"var(--navy-2)",borderTop:"1px solid rgba(59,130,246,0.07)"}}>
      <p className="s-label" style={{opacity:started?1:0,transition:"opacity .5s"}}>about_me</p>
      <h2 className="s-title" style={{opacity:started?1:0,transform:started?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Who I am</h2>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:56,alignItems:"start"}} className="about-grid">

        {/* Photo card */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{
            borderRadius:16,overflow:"hidden",
            border:"1px solid rgba(59,130,246,0.18)",
            aspectRatio:"4/5",
            position:"relative",
            opacity:started?1:0,
            transition:"opacity 0.7s ease 0.2s",
            boxShadow:"0 24px 64px rgba(0,0,0,0.4)",
          }}>
            {/* Shimmer overlay */}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(29,78,216,0.08),transparent 50%,rgba(6,182,212,0.05))",zIndex:1,pointerEvents:"none"}}/>
            <img src="/foto2.jpg" alt="Berlin Sugiyanto"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}
              onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
            />
            <div style={{display:"none",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,background:"var(--navy-3)"}}>
              <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:36,color:"var(--blue-3)",background:"var(--navy-4)",width:80,height:80,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center"}}>BS</span>
              <span style={{fontSize:10,color:"var(--muted)",letterSpacing:"1.5px",fontFamily:"'JetBrains Mono',monospace"}}>foto2.jpg</span>
            </div>
            {/* Bottom info bar */}
            <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:2,padding:"16px",background:"linear-gradient(to top,rgba(6,14,30,0.9),transparent)"}}>
              <div style={{fontSize:13,fontWeight:700,color:"#F0F6FF",fontFamily:"'Outfit',sans-serif"}}>Berlin Sugiyanto Hutajulu</div>
              <div style={{fontSize:10,color:"var(--cyan)",fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>backend_dev · class of 2025</div>
            </div>
          </div>

          {/* University */}
          <div style={{
            display:"flex",alignItems:"center",gap:12,
            background:"rgba(15,31,56,0.6)",border:"1px solid rgba(59,130,246,0.14)",
            borderRadius:12,padding:"12px 16px",
            opacity:started?1:0,transition:"opacity 0.6s ease 0.5s",
          }}>
            <img src="https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Logo_Universitas_Gunadarma.png/220px-Logo_Universitas_Gunadarma.png"
              alt="Gunadarma" style={{height:30,objectFit:"contain",flexShrink:0}}
              onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
            />
            <div style={{display:"none",width:30,height:30,background:"rgba(29,78,216,0.15)",borderRadius:7,alignItems:"center",justifyContent:"center",fontWeight:800,color:"var(--blue-3)",fontSize:11,fontFamily:"'JetBrains Mono',monospace"}}>UG</div>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"var(--white-2)",fontFamily:"'Outfit',sans-serif",lineHeight:1.3}}>Universitas Gunadarma</div>
              <div style={{fontSize:10,color:"var(--muted)",marginTop:2,fontFamily:"'JetBrains Mono',monospace"}}>Informatics Eng · GPA 3.63</div>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:7,
            fontSize:10.5,fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",
            color:"#34D399",background:"rgba(16,185,129,0.08)",
            border:"1px solid rgba(16,185,129,0.2)",
            padding:"4px 12px",borderRadius:100,marginBottom:20,
            fontFamily:"'JetBrains Mono',monospace",
            opacity:started?1:0,transition:"opacity 0.5s ease 0.15s",
          }}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#10B981"}}/>
            Fresh Graduate · Backend Specialist
          </div>

          <p style={{
            fontSize:15,lineHeight:2,color:"#8BA4C8",marginBottom:24,
            fontFamily:"'Outfit',sans-serif",
            opacity:started?1:0,transition:"opacity 0.6s ease 0.25s",
          }}>{data.about}</p>

          {/* Location — terminal style */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:10,
            fontSize:12.5,color:"var(--white-2)",padding:"8px 14px",
            background:"rgba(15,31,56,0.6)",border:"1px solid rgba(59,130,246,0.14)",
            borderRadius:8,marginBottom:22,
            fontFamily:"'JetBrains Mono',monospace",
            opacity:started?1:0,transition:"opacity 0.5s ease 0.4s",
          }}>
            <span style={{color:"var(--cyan)"}}>$</span>
            <span style={{color:"var(--muted)"}}>location =</span>
            <span style={{color:"#34D399"}}>"{data.location}"</span>
          </div>

          {/* Open to work */}
          <div style={{
            padding:"16px 20px",
            background:"rgba(29,78,216,0.06)",
            border:"1px solid rgba(29,78,216,0.18)",
            borderLeft:"3px solid var(--blue-2)",
            borderRadius:"0 10px 10px 0",
            marginBottom:30,
            opacity:started?1:0,
            transform:started?"translateX(0)":"translateX(-16px)",
            transition:"opacity 0.6s ease 0.5s,transform 0.6s ease 0.5s",
          }}>
            <span style={{color:"var(--cyan)",fontWeight:600,fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:"2px",textTransform:"uppercase",display:"block",marginBottom:7}}>
              // open_to_opportunities
            </span>
            <span style={{fontSize:14,color:"#8BA4C8",lineHeight:1.8,fontFamily:"'Outfit',sans-serif"}}>
              Junior Backend Developer roles — full-time, contract, or remote.<br/>
              <span style={{color:"#34D399",fontWeight:600,fontFamily:"'JetBrains Mono',monospace"}}>available: true</span>
            </span>
          </div>

          {/* Stats grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}} className="stats-grid">
            {stats.map(([n,l],i)=><Stat key={l} n={n} l={l} delay={550+i*100} started={started}/>)}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.about-grid{grid-template-columns:1fr !important;gap:32px !important;}}
        @media(max-width:480px){.stats-grid{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </section>
  );
};

export default About;
