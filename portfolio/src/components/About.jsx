import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

function useCounter(target, duration=1600, started=false) {
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
  const count = useCounter(num, 1600, started);
  return (
    <div style={{
      textAlign:"center",padding:"22px 16px",
      background:"#242336",
      border:"1px solid rgba(147,51,234,0.15)",
      borderRadius:13,
      opacity:started?1:0,
      transform:started?"translateY(0) scale(1)":"translateY(20px) scale(0.9)",
      transition:`opacity .55s ease ${delay}ms,transform .55s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      position:"relative",overflow:"hidden",
    }}>
      <div style={{
        position:"absolute",inset:0,
        background:"linear-gradient(135deg,rgba(147,51,234,0.05),transparent)",
        pointerEvents:"none",
      }}/>
      <span style={{
        fontFamily:"'Inter',sans-serif",fontSize:34,fontWeight:900,
        lineHeight:1,display:"block",letterSpacing:"-1.5px",
        background:"linear-gradient(135deg,#C084FC,#EC4899)",
        WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent",
      }}>{count}{suffix}</span>
      <span style={{
        fontSize:9,color:"#9B97C0",marginTop:7,display:"block",
        letterSpacing:"1.8px",textTransform:"uppercase",
        fontFamily:"'Inter',sans-serif",fontWeight:700,
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
      {threshold:0.15}
    );
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  const stats = [["3.63","GPA / 4.00"],["3","Projects"],["3","Org Periods"],["5+","Stacks"]];

  return (
    <section id="about" ref={ref} className="fade-in">
      <p className="section-label">About Me</p>
      <h2 className="section-title">Who I am</h2>

      <div className="about-grid" style={{
        display:"grid",gridTemplateColumns:"1fr 1.5fr",
        gap:60,alignItems:"start",
      }}>
        {/* LEFT — tilted 3D card with continuous slow rotate animation */}
        <div style={{display:"flex",flexDirection:"column",gap:20,alignItems:"center"}}>

          {/* 3D card scene */}
          <div style={{
            position:"relative",
            width:240,height:290,
            perspective:"900px",
          }}>
            {/* Shadow behind */}
            <div style={{
              position:"absolute",bottom:-18,left:"10%",right:"10%",height:30,
              background:"rgba(147,51,234,0.35)",
              filter:"blur(18px)",borderRadius:"50%",
              animation:"about-shadow 6s ease-in-out infinite",
              pointerEvents:"none",
            }}/>

            {/* The card itself */}
            <div style={{
              width:"100%",height:"100%",
              borderRadius:20,
              overflow:"hidden",
              border:"1.5px solid rgba(147,51,234,0.4)",
              background:"#242336",
              animation: started ? "about-card-3d 7s ease-in-out infinite" : "none",
              transformStyle:"preserve-3d",
              boxShadow:"0 24px 60px rgba(147,51,234,0.25),0 8px 24px rgba(0,0,0,0.4)",
              opacity:started?1:0,
              transition:"opacity 0.8s ease 0.2s",
            }}>
              <img src="/foto2.jpg" alt="Berlin Sugiyanto"
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}
                onError={(e)=>{
                  e.target.style.display="none";
                  e.target.nextSibling.style.display="flex";
                }}
              />
              <div style={{
                display:"none",width:"100%",height:"100%",
                alignItems:"center",justifyContent:"center",
                flexDirection:"column",gap:8,
              }}>
                <span style={{fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:28,color:"#9333EA"}}>BS</span>
                <span style={{fontSize:9,color:"#9B97C0",letterSpacing:"1.5px"}}>foto2.jpg</span>
              </div>

              {/* Shine overlay */}
              <div style={{
                position:"absolute",inset:0,
                background:"linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 50%,rgba(147,51,234,0.04) 100%)",
                pointerEvents:"none",
              }}/>
            </div>

            {/* Floating accent badge */}
            <div style={{
              position:"absolute",top:-14,right:-14,
              width:44,height:44,borderRadius:"50%",
              background:"linear-gradient(135deg,#9333EA,#EC4899)",
              boxShadow:"0 0 22px rgba(147,51,234,0.7)",
              border:"3px solid #1C1B2E",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:18,
              animation:"about-badge-spin 8s linear infinite",
            }}>✦</div>
          </div>

          {/* University logo */}
          <div style={{
            display:"flex",alignItems:"center",gap:12,
            background:"#242336",
            border:"1px solid rgba(147,51,234,0.15)",
            borderRadius:12,padding:"12px 18px",width:"100%",maxWidth:260,
            opacity:started?1:0,
            transition:"opacity 0.6s ease 0.5s",
          }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Logo_Universitas_Gunadarma.png/220px-Logo_Universitas_Gunadarma.png"
              alt="Universitas Gunadarma"
              style={{height:34,objectFit:"contain"}}
              onError={(e)=>{
                e.target.style.display="none";
                e.target.nextSibling.style.display="flex";
              }}
            />
            <div style={{
              display:"none",width:34,height:34,
              background:"rgba(147,51,234,0.15)",borderRadius:8,
              alignItems:"center",justifyContent:"center",
              fontWeight:700,color:"#9333EA",fontSize:13,
            }}>UG</div>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#C084FC",lineHeight:1.3}}>Universitas Gunadarma</div>
              <div style={{fontSize:10,color:"#9B97C0",marginTop:2}}>Informatics Engineering · GPA 3.63</div>
            </div>
          </div>
        </div>

        {/* RIGHT — bio + stats */}
        <div>
          <div style={{
            fontSize:11,fontWeight:700,letterSpacing:"3px",
            textTransform:"uppercase",color:"#C084FC",marginBottom:18,
            opacity:started?1:0,transition:"opacity 0.5s ease 0.15s",
          }}>▸ Fresh Graduate · Backend Specialist</div>

          {/* Bio with clip-path reveal — different from Hero */}
          <p style={{
            fontSize:15.5,lineHeight:2,color:"#B8B4D4",marginBottom:26,
            opacity:started?1:0,
            clipPath: started?"inset(0 0% 0 0)":"inset(0 100% 0 0)",
            transition:"opacity 0.4s ease 0.2s, clip-path 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s",
          }}>{data.about}</p>

          {/* Location */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            fontSize:13,color:"#B8B4D4",padding:"9px 16px",
            background:"#242336",border:"1px solid rgba(147,51,234,0.14)",
            borderRadius:8,marginBottom:24,
            opacity:started?1:0,transition:"opacity 0.5s ease 0.4s",
          }}>
            <span style={{color:"#9333EA",fontSize:15}}>◎</span>
            {data.location}
          </div>

          {/* Open To */}
          <div style={{
            padding:"18px 22px",
            background:"rgba(147,51,234,0.06)",
            border:"1px solid rgba(147,51,234,0.2)",
            borderRadius:12,marginBottom:32,
            position:"relative",overflow:"hidden",
            opacity:started?1:0,
            transform:started?"translateX(0)":"translateX(-16px)",
            transition:"opacity 0.6s ease 0.5s,transform 0.6s ease 0.5s",
          }}>
            <div style={{
              position:"absolute",left:0,top:0,bottom:0,width:3,
              background:"linear-gradient(to bottom,#9333EA,#EC4899)",
              borderRadius:"3px 0 0 3px",
            }}/>
            <span style={{
              color:"#A855F7",fontWeight:700,fontFamily:"'Inter',sans-serif",
              fontSize:10,letterSpacing:"2.5px",textTransform:"uppercase",
              display:"block",marginBottom:7,
            }}>✦ Open To</span>
            <span style={{fontSize:14,color:"#B8B4D4",lineHeight:1.8}}>
              Junior Backend Developer roles — full-time, contract, or remote.<br/>
              <span style={{color:"#A855F7",fontWeight:700}}>Available immediately.</span>
            </span>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            {stats.map(([n,l],i)=>(
              <StatBox key={l} n={n} l={l} delay={550+i*100} started={started}/>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes about-card-3d{
          0%  {transform:perspective(900px) rotateY(-8deg) rotateX(4deg)  translateY(0px)}
          25% {transform:perspective(900px) rotateY(6deg)  rotateX(-3deg) translateY(-10px)}
          50% {transform:perspective(900px) rotateY(10deg) rotateX(2deg)  translateY(-16px)}
          75% {transform:perspective(900px) rotateY(-4deg) rotateX(-4deg) translateY(-8px)}
          100%{transform:perspective(900px) rotateY(-8deg) rotateX(4deg)  translateY(0px)}
        }
        @keyframes about-shadow{
          0%,100%{transform:scaleX(1);opacity:.6}
          50%{transform:scaleX(0.75);opacity:.3}
        }
        @keyframes about-badge-spin{
          from{transform:rotate(0deg)} to{transform:rotate(360deg)}
        }
      `}</style>
    </section>
  );
};

export default About;
