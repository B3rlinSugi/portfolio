import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

function useCounter(target, duration=1400, started=false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const isFloat = String(target).includes(".");
    const end = parseFloat(target);
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now-t0)/duration,1);
      const e = 1-Math.pow(1-p,3);
      setCount(isFloat?(e*end).toFixed(2):Math.floor(e*end));
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },[started,target]);
  return count;
}

const StatBox = ({ n, l, delay, started }) => {
  const num = parseFloat(n);
  const suffix = n.replace(/[\d.]/g,"");
  const count = useCounter(num, 1400, started);
  return (
    <div style={{
      textAlign:"center", padding:"20px 12px",
      background:"#FFFFFF",
      border:"1px solid #E2E8F0",
      borderRadius:10,
      opacity:started?1:0,
      transform:started?"translateY(0)":"translateY(16px)",
      transition:`opacity .5s ease ${delay}ms,transform .5s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      boxShadow:"0 2px 8px rgba(15,23,42,0.04)",
    }}>
      <span style={{
        fontFamily:"'Syne',sans-serif", fontSize:30, fontWeight:800,
        lineHeight:1, display:"block", letterSpacing:"-1px",
        color:"#0F172A",
      }}>{count}{suffix}</span>
      <span style={{
        fontSize:9.5, color:"#94A3B8", marginTop:6, display:"block",
        letterSpacing:"1.5px", textTransform:"uppercase",
        fontFamily:"'JetBrains Mono',monospace", fontWeight:600,
      }}>{l}</span>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting){setStarted(true);obs.disconnect();} },
      {threshold:0.1}
    );
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  const stats = [["3.63","GPA / 4.00"],["3","Projects"],["3","Org Periods"],["5+","Stacks"]];

  return (
    <section id="about" ref={ref} style={{
      background:"#FFFFFF",
      borderTop:"1px solid #F1F5F9",
    }}>
      <div style={{
        fontSize:11, fontWeight:700, letterSpacing:"2.5px",
        textTransform:"uppercase", color:"#7C3AED", marginBottom:10,
        fontFamily:"'JetBrains Mono',monospace",
        opacity:started?1:0, transition:"opacity .5s",
        display:"flex", alignItems:"center", gap:8,
      }}>
        <span style={{width:18,height:1.5,background:"#7C3AED",display:"inline-block"}}/>
        about_me
      </div>
      <h2 style={{
        fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,4vw,44px)",
        fontWeight:800, color:"#0F172A", marginBottom:48,
        letterSpacing:"-1.5px", lineHeight:1.1,
        opacity:started?1:0, transform:started?"none":"translateY(16px)",
        transition:"opacity .6s ease .1s,transform .6s ease .1s",
      }}>Who I am</h2>

      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1.6fr",
        gap:60, alignItems:"start",
      }} className="about-grid">

        {/* LEFT — photo card */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{
            borderRadius:14, overflow:"hidden",
            border:"1px solid #E2E8F0",
            background:"#F8FAFC",
            aspectRatio:"4/5",
            opacity:started?1:0,
            transition:"opacity 0.6s ease 0.2s",
            boxShadow:"0 8px 32px rgba(15,23,42,0.08)",
            position:"relative",
          }}>
            <img src="/foto2.jpg" alt="Berlin Sugiyanto"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}
              onError={(e)=>{
                e.target.style.display="none";
                e.target.nextSibling.style.display="flex";
              }}
            />
            <div style={{
              display:"none",width:"100%",height:"100%",
              alignItems:"center",justifyContent:"center",
              flexDirection:"column",gap:8,
              background:"#F1F5F9",
            }}>
              <span style={{
                fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:36,color:"#0F172A",
                background:"#E2E8F0",width:80,height:80,borderRadius:12,
                display:"flex",alignItems:"center",justifyContent:"center",
              }}>BS</span>
              <span style={{fontSize:10,color:"#94A3B8",letterSpacing:"1.5px",fontFamily:"'JetBrains Mono',monospace"}}>foto2.jpg</span>
            </div>
            {/* Corner badge */}
            <div style={{
              position:"absolute", bottom:12, left:12, right:12,
              background:"rgba(15,23,42,0.85)",
              backdropFilter:"blur(8px)",
              borderRadius:8, padding:"8px 12px",
              display:"flex", alignItems:"center", justifyContent:"space-between",
            }}>
              <div>
                <div style={{fontSize:11.5,fontWeight:700,color:"#F8FAFC",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Berlin Sugiyanto</div>
                <div style={{fontSize:10,color:"#94A3B8",fontFamily:"'JetBrains Mono',monospace",marginTop:1}}>backend dev · 2025</div>
              </div>
              <div style={{
                width:8,height:8,borderRadius:"50%",
                background:"#22C55E",
                boxShadow:"0 0 8px rgba(34,197,94,0.6)",
              }}/>
            </div>
          </div>

          {/* University badge */}
          <div style={{
            display:"flex", alignItems:"center", gap:12,
            background:"#F8FAFC", border:"1px solid #E2E8F0",
            borderRadius:10, padding:"12px 16px",
            opacity:started?1:0, transition:"opacity 0.6s ease 0.5s",
          }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Logo_Universitas_Gunadarma.png/220px-Logo_Universitas_Gunadarma.png"
              alt="Universitas Gunadarma"
              style={{height:32,objectFit:"contain"}}
              onError={(e)=>{
                e.target.style.display="none";
                e.target.nextSibling.style.display="flex";
              }}
            />
            <div style={{
              display:"none",width:32,height:32,
              background:"#EEF2FF",borderRadius:6,
              alignItems:"center",justifyContent:"center",
              fontWeight:800,color:"#7C3AED",fontSize:12,
              fontFamily:"'Syne',sans-serif",
            }}>UG</div>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#0F172A",fontFamily:"'Plus Jakarta Sans',sans-serif",lineHeight:1.3}}>Universitas Gunadarma</div>
              <div style={{fontSize:10.5,color:"#64748B",marginTop:2,fontFamily:"'JetBrains Mono',monospace"}}>Informatics Eng · GPA 3.63</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:6,
            fontSize:11, fontWeight:700, letterSpacing:"1.5px",
            textTransform:"uppercase", color:"#059669",
            background:"#F0FDF4", border:"1px solid #86EFAC",
            padding:"4px 12px", borderRadius:100, marginBottom:20,
            fontFamily:"'JetBrains Mono',monospace",
            opacity:started?1:0, transition:"opacity 0.5s ease 0.15s",
          }}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#22C55E"}}/>
            Fresh Graduate · Backend Specialist
          </div>

          <p style={{
            fontSize:15, lineHeight:1.95, color:"#475569", marginBottom:24,
            fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
            opacity:started?1:0,
            transition:"opacity 0.6s ease 0.25s",
          }}>{data.about}</p>

          {/* Location row */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            fontSize:13, color:"#475569", padding:"8px 14px",
            background:"#F8FAFC", border:"1px solid #E2E8F0",
            borderRadius:8, marginBottom:22,
            fontFamily:"'JetBrains Mono',monospace",
            opacity:started?1:0, transition:"opacity 0.5s ease 0.4s",
          }}>
            <span style={{color:"#7C3AED"}}>$</span>
            <span style={{color:"#94A3B8"}}>location</span>
            <span style={{color:"#0F172A",fontWeight:600}}>"{data.location}"</span>
          </div>

          {/* Open to work block */}
          <div style={{
            padding:"16px 20px",
            background:"#F8FAFC",
            border:"1px solid #E2E8F0",
            borderLeft:"3px solid #7C3AED",
            borderRadius:"0 10px 10px 0",
            marginBottom:30,
            opacity:started?1:0,
            transform:started?"translateX(0)":"translateX(-16px)",
            transition:"opacity 0.6s ease 0.5s,transform 0.6s ease 0.5s",
          }}>
            <span style={{
              color:"#7C3AED", fontWeight:700,
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:10, letterSpacing:"2px", textTransform:"uppercase",
              display:"block", marginBottom:6,
            }}>// open_to</span>
            <span style={{fontSize:14,color:"#475569",lineHeight:1.8,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              Junior Backend Developer roles — full-time, contract, or remote.<br/>
              <span style={{color:"#059669",fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>available: true</span>
            </span>
          </div>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}} className="stats-grid">
            {stats.map(([n,l],i)=>(
              <StatBox key={l} n={n} l={l} delay={550+i*100} started={started}/>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:900px){
          .about-grid{ grid-template-columns:1fr !important; gap:32px !important; }
        }
        @media (max-width:480px){
          .stats-grid{ grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
