import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const ProjectCard = ({ p, index, visible }) => {
  const [hovered,setHovered]=useState(false);
  const colors = [
    {a:"#3B82F6",b:"#06B6D4"},
    {a:"#8B5CF6",b:"#3B82F6"},
    {a:"#06B6D4",b:"#10B981"},
  ];
  const {a,b} = colors[index % colors.length];

  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        borderRadius:20, overflow:"hidden",
        border:`1px solid ${hovered?"rgba(59,130,246,0.3)":"rgba(59,130,246,0.1)"}`,
        opacity:visible?1:0,
        transform:visible?"translateY(0)":"translateY(32px)",
        transition:`opacity .65s cubic-bezier(.22,1,.36,1) ${index*130}ms,transform .65s cubic-bezier(.22,1,.36,1) ${index*130}ms,border-color .25s,box-shadow .25s`,
        boxShadow:hovered?`0 0 60px rgba(29,78,216,0.1),0 24px 64px rgba(0,0,0,0.35)`:"0 4px 24px rgba(0,0,0,0.2)",
        background:"rgba(15,31,56,0.5)",
        display:"grid", gridTemplateColumns:"1fr 1fr",
      }} className="project-card"
    >
      {/* LEFT — visual panel */}
      <div style={{
        position:"relative", overflow:"hidden",
        background:`linear-gradient(135deg,${a}14,${b}0a)`,
        borderRight:"1px solid rgba(59,130,246,0.1)",
        minHeight:280,
        display:"flex",flexDirection:"column",justifyContent:"space-between",
        padding:"32px 28px",
      }}>
        {/* Big number */}
        <div style={{
          fontFamily:"'Outfit',sans-serif",
          fontSize:80, fontWeight:900,
          color:`${a}18`,
          lineHeight:1, letterSpacing:"-4px",
          userSelect:"none",
          position:"absolute",bottom:-8,left:20,
          transition:"color 0.3s",
        }}>{String(index+1).padStart(2,"0")}</div>

        {/* Top section */}
        <div>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:6,marginBottom:16,
            fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",
            color:a,background:`${a}12`,border:`1px solid ${a}30`,
            padding:"4px 12px",borderRadius:6,fontFamily:"'JetBrains Mono',monospace",
          }}>{p.type}</div>

          <h3 style={{
            fontFamily:"'Outfit',sans-serif",
            fontSize:22,fontWeight:800,color:"var(--white)",
            lineHeight:1.2,letterSpacing:"-0.5px",marginBottom:12,
          }}>{p.title}</h3>

          <p style={{fontSize:13.5,color:"#6B84A8",lineHeight:1.75,fontFamily:"'Outfit',sans-serif"}}>{p.desc}</p>
        </div>

        {/* Bottom — tech stack */}
        <div style={{display:"flex",flexWrap:"wrap",gap:6,position:"relative",zIndex:1}}>
          {p.tech.map(t=>(
            <div key={t.name} style={{
              display:"flex",alignItems:"center",gap:5,
              background:"rgba(6,14,30,0.7)",border:"1px solid rgba(59,130,246,0.15)",
              borderRadius:8,padding:"4px 10px",
            }}>
              <img src={t.icon} alt={t.name} style={{width:12,height:12,objectFit:"contain"}} onError={e=>{e.target.style.display="none";}}/>
              <span style={{fontSize:10.5,color:"var(--white-2)",fontFamily:"'JetBrains Mono',monospace"}}>{t.name}</span>
            </div>
          ))}
        </div>

        {/* Gradient accent */}
        <div style={{
          position:"absolute",top:0,left:0,right:0,height:3,
          background:`linear-gradient(to right,${a},${b})`,
        }}/>
      </div>

      {/* RIGHT — achievements as visual tags/chips */}
      <div style={{padding:"32px 28px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <div>
          <div style={{
            fontSize:10,color:"var(--muted)",marginBottom:18,
            fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1.5px",
            display:"flex",alignItems:"center",gap:8,
          }}>
            <span style={{width:14,height:1,background:"var(--muted-2)"}}/>
            KEY ACHIEVEMENTS
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {p.points.map((pt,i)=>(
              <div key={i} style={{
                display:"flex",gap:12,alignItems:"flex-start",
                padding:"12px 14px",
                background:"rgba(6,14,30,0.5)",
                border:"1px solid rgba(59,130,246,0.08)",
                borderRadius:10,
                transition:"border-color 0.2s,background 0.2s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`${a}30`;e.currentTarget.style.background=`${a}08`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(59,130,246,0.08)";e.currentTarget.style.background="rgba(6,14,30,0.5)";}}
              >
                <div style={{
                  width:22,height:22,borderRadius:6,flexShrink:0,marginTop:1,
                  background:`${a}15`,border:`1px solid ${a}25`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:10,fontWeight:700,color:a,fontFamily:"'JetBrains Mono',monospace",
                }}>{i+1}</div>
                <p style={{fontSize:12.5,color:"#8BA4C8",lineHeight:1.7,fontFamily:"'Outfit',sans-serif",margin:0}}>{pt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display:"flex",alignItems:"center",justifyContent:"space-between",
          paddingTop:18,borderTop:"1px solid rgba(59,130,246,0.08)",marginTop:18,
        }}>
          <span style={{fontSize:11,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"}}>{p.period}</span>
          <a href={p.github} target="_blank" rel="noreferrer" style={{
            display:"flex",alignItems:"center",gap:7,
            padding:"8px 16px",borderRadius:8,
            background:hovered?`${a}18`:"transparent",
            border:`1px solid ${hovered?a+"40":"rgba(59,130,246,0.2)"}`,
            color:hovered?"var(--white)":"var(--white-2)",
            fontSize:12,fontWeight:600,transition:"all 0.2s",textDecoration:"none",
            fontFamily:"'Outfit',sans-serif",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background=`${a}20`;e.currentTarget.style.borderColor=`${a}50`;e.currentTarget.style.color="var(--white)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=hovered?`${a}18`:"transparent";e.currentTarget.style.borderColor=hovered?`${a}40`:"rgba(59,130,246,0.2)";e.currentTarget.style.color=hovered?"var(--white)":"var(--white-2)";}}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.05});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="projects" ref={ref} style={{background:"var(--navy-2)",borderTop:"1px solid rgba(59,130,246,0.07)"}}>
      <p className="s-label" style={{opacity:visible?1:0,transition:"opacity .5s"}}>projects</p>
      <h2 className="s-title" style={{opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Projects I've built</h2>
      <div style={{display:"flex",flexDirection:"column",gap:20}}>
        {data.projects.map((p,i)=><ProjectCard key={p.title} p={p} index={i} visible={visible}/>)}
      </div>
      <style>{`@media(max-width:768px){.project-card{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
};

export default Projects;
