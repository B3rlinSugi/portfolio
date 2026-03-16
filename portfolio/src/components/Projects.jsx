import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const ProjectCard = ({ p, index, visible }) => {
  const [hovered,setHovered]=useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{
      background:"rgba(15,31,56,0.5)",
      border:`1px solid ${hovered?"rgba(59,130,246,0.35)":"rgba(59,130,246,0.1)"}`,
      borderRadius:16,overflow:"hidden",
      opacity:visible?1:0,
      transform:visible?"translateY(0)":"translateY(28px)",
      transition:`opacity .65s cubic-bezier(.22,1,.36,1) ${index*120}ms,transform .65s cubic-bezier(.22,1,.36,1) ${index*120}ms,border-color .25s,box-shadow .25s`,
      boxShadow:hovered?"0 0 48px rgba(29,78,216,0.12),0 20px 60px rgba(0,0,0,0.3)":"0 4px 24px rgba(0,0,0,0.2)",
    }}>
      {/* Top bar */}
      <div style={{
        height:3,
        background:hovered?"linear-gradient(to right,#1D4ED8,#06B6D4)":"linear-gradient(to right,rgba(29,78,216,0.3),rgba(6,182,212,0.15))",
        transition:"background 0.35s",
      }}/>

      <div style={{padding:"28px 32px"}} className="project-inner">
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:600,color:"rgba(59,130,246,0.35)",letterSpacing:"0.5px"}}>0{index+1}</span>
            <span style={{
              fontSize:10,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",
              color:"var(--cyan)",background:"rgba(6,182,212,0.08)",
              border:"1px solid rgba(6,182,212,0.2)",
              padding:"3px 10px",borderRadius:5,
              fontFamily:"'JetBrains Mono',monospace",
            }}>{p.type}</span>
          </div>
          <span style={{
            fontSize:11,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace",
            background:"rgba(15,31,56,0.8)",border:"1px solid rgba(59,130,246,0.1)",
            padding:"3px 10px",borderRadius:6,
          }}>{p.period}</span>
        </div>

        <h3 style={{
          fontFamily:"'Bricolage Grotesque',sans-serif",
          fontSize:22,fontWeight:800,color:"var(--white)",
          marginBottom:8,lineHeight:1.2,letterSpacing:"-0.5px",
        }}>{p.title}</h3>

        <p style={{fontSize:14,color:"#6B84A8",marginBottom:20,lineHeight:1.8,fontFamily:"'Outfit',sans-serif"}}>{p.desc}</p>

        {/* Achievements */}
        <div style={{
          background:"rgba(6,14,30,0.5)",border:"1px solid rgba(59,130,246,0.1)",
          borderLeft:"3px solid var(--blue-2)",
          borderRadius:"0 10px 10px 0",padding:"14px 18px",marginBottom:22,
        }}>
          <div style={{fontSize:10,color:"var(--muted)",marginBottom:10,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"1px"}}>// key_achievements</div>
          <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
            {p.points.map(pt=>(
              <li key={pt} style={{fontSize:13,color:"#8BA4C8",paddingLeft:18,position:"relative",lineHeight:1.7,fontFamily:"'Outfit',sans-serif"}}>
                <span style={{position:"absolute",left:0,top:2,color:"var(--cyan)",fontWeight:700,fontSize:12,fontFamily:"'JetBrains Mono',monospace"}}>›</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,paddingTop:18,borderTop:"1px solid rgba(59,130,246,0.07)"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {p.tech.map(t=>(
              <div key={t.name} style={{
                display:"flex",alignItems:"center",gap:5,
                background:"rgba(15,31,56,0.8)",border:"1px solid rgba(59,130,246,0.12)",
                borderRadius:7,padding:"4px 10px",transition:"all 0.2s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(29,78,216,0.15)";e.currentTarget.style.borderColor="rgba(59,130,246,0.3)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(15,31,56,0.8)";e.currentTarget.style.borderColor="rgba(59,130,246,0.12)";}}
              >
                <img src={t.icon} alt={t.name} style={{width:13,height:13,objectFit:"contain"}} onError={e=>{e.target.style.display="none";}}/>
                <span style={{fontSize:11,color:"var(--white-2)",fontWeight:500,fontFamily:"'JetBrains Mono',monospace"}}>{t.name}</span>
              </div>
            ))}
          </div>
          <a href={p.github} target="_blank" rel="noreferrer" style={{
            display:"flex",alignItems:"center",gap:7,
            padding:"8px 16px",borderRadius:8,
            background:hovered?"rgba(29,78,216,0.18)":"transparent",
            border:"1px solid rgba(59,130,246,0.25)",
            color:hovered?"#F0F6FF":"var(--white-2)",
            fontSize:12,fontWeight:600,transition:"all 0.2s",textDecoration:"none",
            fontFamily:"'Outfit',sans-serif",
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(29,78,216,0.22)";e.currentTarget.style.borderColor="rgba(59,130,246,0.45)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=hovered?"rgba(29,78,216,0.18)":"transparent";e.currentTarget.style.borderColor="rgba(59,130,246,0.25)";}}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
      <style>{`@media(max-width:600px){.project-inner{padding:20px 18px !important;}}`}</style>
    </div>
  );
};

const Projects = () => {
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.06});
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
    </section>
  );
};

export default Projects;
