import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const ProjectCard = ({ p, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        background:"#FFFFFF",
        border:`1px solid ${hovered?"#C4B5FD":"#E2E8F0"}`,
        borderRadius:14, overflow:"hidden",
        opacity:visible?1:0,
        transform:visible?"translateY(0)":"translateY(28px)",
        transition:`opacity .65s cubic-bezier(.22,1,.36,1) ${index*120}ms,transform .65s cubic-bezier(.22,1,.36,1) ${index*120}ms,border-color .2s,box-shadow .2s`,
        boxShadow:hovered?"0 12px 40px rgba(124,58,237,0.1)":"0 2px 8px rgba(15,23,42,0.05)",
      }}
    >
      {/* Top accent */}
      <div style={{
        height:3,
        background:hovered
          ?"linear-gradient(to right,#7C3AED,#0EA5E9)"
          :"linear-gradient(to right,#DDD6FE,#BAE6FD)",
        transition:"background 0.3s",
      }}/>

      <div style={{padding:"28px 32px"}} className="project-card-inner">
        {/* Header row */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
            <span style={{
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:11, fontWeight:700, color:"#94A3B8", letterSpacing:"0.5px",
            }}>0{index+1}</span>
            <span style={{
              fontSize:10.5, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase",
              color:"#7C3AED", background:"#EDE9FE",
              border:"1px solid #DDD6FE",
              padding:"3px 10px", borderRadius:6,
              fontFamily:"'JetBrains Mono',monospace",
            }}>{p.type}</span>
          </div>
          <span style={{
            fontSize:11.5, color:"#94A3B8",
            fontFamily:"'JetBrains Mono',monospace",
            background:"#F8FAFC", border:"1px solid #E2E8F0",
            padding:"3px 10px", borderRadius:6,
          }}>{p.period}</span>
        </div>

        <h3 style={{
          fontFamily:"'Syne',sans-serif",
          fontSize:22, fontWeight:800, color:"#0F172A",
          marginBottom:8, lineHeight:1.2, letterSpacing:"-0.5px",
        }}>{p.title}</h3>

        <p style={{
          fontSize:14, color:"#64748B", marginBottom:20,
          lineHeight:1.8, maxWidth:680,
          fontFamily:"'Plus Jakarta Sans',sans-serif",
        }}>{p.desc}</p>

        {/* Code-style bullet points */}
        <div style={{
          background:"#F8FAFC", border:"1px solid #E2E8F0",
          borderRadius:10, padding:"16px 20px", marginBottom:22,
          borderLeft:"3px solid #7C3AED",
        }}>
          <div style={{
            fontSize:10.5, color:"#94A3B8", marginBottom:10,
            fontFamily:"'JetBrains Mono',monospace", letterSpacing:"1px",
          }}>// key_achievements</div>
          <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:8}}>
            {p.points.map((pt,i)=>(
              <li key={pt} style={{
                fontSize:13, color:"#475569",
                paddingLeft:20, position:"relative", lineHeight:1.7,
                fontFamily:"'Plus Jakarta Sans',sans-serif",
              }}>
                <span style={{
                  position:"absolute",left:0,top:2,
                  color:"#7C3AED",fontWeight:700,fontSize:12,
                  fontFamily:"'JetBrains Mono',monospace",
                }}>›</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div style={{
          display:"flex", justifyContent:"space-between",
          alignItems:"center", flexWrap:"wrap", gap:14,
          paddingTop:18, borderTop:"1px solid #F1F5F9",
        }}>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,alignItems:"center"}}>
            {p.tech.map((t)=>(
              <div key={t.name} style={{
                display:"flex", alignItems:"center", gap:5,
                background:"#F8FAFC", border:"1px solid #E2E8F0",
                borderRadius:6, padding:"4px 10px",
                transition:"all 0.2s",
              }}
                onMouseEnter={(e)=>{e.currentTarget.style.background="#EDE9FE";e.currentTarget.style.borderColor="#C4B5FD";}}
                onMouseLeave={(e)=>{e.currentTarget.style.background="#F8FAFC";e.currentTarget.style.borderColor="#E2E8F0";}}
              >
                <img src={t.icon} alt={t.name} style={{width:14,height:14,objectFit:"contain"}} onError={(e)=>{e.target.style.display="none";}}/>
                <span style={{fontSize:11,color:"#475569",fontWeight:500,fontFamily:"'JetBrains Mono',monospace"}}>{t.name}</span>
              </div>
            ))}
          </div>
          <a href={p.github} target="_blank" rel="noreferrer" style={{
            display:"flex", alignItems:"center", gap:7,
            padding:"8px 16px", borderRadius:8,
            background:hovered?"#0F172A":"transparent",
            border:"1.5px solid #CBD5E1",
            color:hovered?"#F8FAFC":"#475569",
            fontSize:12, fontWeight:600,
            transition:"all 0.2s", textDecoration:"none",
            fontFamily:"'Plus Jakarta Sans',sans-serif",
          }}
            onMouseEnter={(e)=>{e.currentTarget.style.background="#0F172A";e.currentTarget.style.color="#F8FAFC";e.currentTarget.style.borderColor="#0F172A";}}
            onMouseLeave={(e)=>{e.currentTarget.style.background=hovered?"#0F172A":"transparent";e.currentTarget.style.color=hovered?"#F8FAFC":"#475569";e.currentTarget.style.borderColor="#CBD5E1";}}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width:600px){
          .project-card-inner{ padding:20px 18px !important; }
        }
      `}</style>
    </div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const [visible,setVisible] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.06});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="projects" ref={ref} style={{background:"#FFFFFF",borderTop:"1px solid #F1F5F9"}}>
      <div style={{
        fontSize:11,fontWeight:700,letterSpacing:"2.5px",
        textTransform:"uppercase",color:"#7C3AED",marginBottom:10,
        fontFamily:"'JetBrains Mono',monospace",
        opacity:visible?1:0,transition:"opacity .5s",
        display:"flex",alignItems:"center",gap:8,
      }}>
        <span style={{width:18,height:1.5,background:"#7C3AED",display:"inline-block"}}/>
        projects
      </div>
      <h2 style={{
        fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,4vw,44px)",
        fontWeight:800,color:"#0F172A",marginBottom:48,
        letterSpacing:"-1.5px",lineHeight:1.1,
        opacity:visible?1:0,transform:visible?"none":"translateY(16px)",
        transition:"opacity .6s ease .1s,transform .6s ease .1s",
      }}>Projects I've built</h2>
      <div style={{display:"flex",flexDirection:"column",gap:20}}>
        {data.projects.map((p,i)=><ProjectCard key={p.title} p={p} index={i} visible={visible}/>)}
      </div>
    </section>
  );
};

export default Projects;
