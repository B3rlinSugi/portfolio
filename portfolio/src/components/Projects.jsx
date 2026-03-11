import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const ProjectCard = ({ p, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        background:"#242336",
        border:`1px solid ${hovered?"rgba(147,51,234,0.5)":"rgba(147,51,234,0.14)"}`,
        borderRadius:18,overflow:"hidden",
        opacity:visible?1:0,
        transform:visible?"translateY(0) perspective(800px) rotateX(0)":"translateY(40px) perspective(800px) rotateX(4deg)",
        transition:`opacity .75s cubic-bezier(.22,1,.36,1) ${index*130}ms,transform .75s cubic-bezier(.22,1,.36,1) ${index*130}ms,border-color .3s,box-shadow .3s`,
        boxShadow:hovered?"0 28px 70px rgba(147,51,234,0.14)":"none",
      }}
    >
      <div style={{
        height:3,
        background:hovered?"linear-gradient(to right,#9333EA,#EC4899,#9333EA)":"linear-gradient(to right,rgba(147,51,234,0.3),rgba(236,72,153,0.15))",
        backgroundSize:"200% 100%",
        animation:hovered?"gradient-x 2s ease infinite":"none",
        transition:"background 0.3s",
      }}/>
      <div style={{padding:"28px 32px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:700,color:"rgba(147,51,234,0.4)",letterSpacing:1}}>0{index+1}</span>
            <span style={{
              fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"#9333EA",
              background:"rgba(147,51,234,0.1)",border:"1px solid rgba(147,51,234,0.2)",
              padding:"3px 10px",borderRadius:4,
            }}>{p.type}</span>
          </div>
          <span style={{fontSize:12,color:"#3E3C5A"}}>{p.period}</span>
        </div>
        <h3 style={{fontFamily:"'Inter',sans-serif",fontSize:22,fontWeight:800,color:"#F8F7FF",marginBottom:8,lineHeight:1.2,letterSpacing:"-0.5px"}}>{p.title}</h3>
        <p style={{fontSize:14,color:"#6B6890",marginBottom:18,lineHeight:1.8,maxWidth:680}}>{p.desc}</p>
        <ul style={{listStyle:"none",marginBottom:22,display:"flex",flexDirection:"column",gap:8}}>
          {p.points.map((pt)=>(
            <li key={pt} style={{fontSize:13.5,color:"#8B87A8",paddingLeft:18,position:"relative",lineHeight:1.7}}>
              <span style={{position:"absolute",left:0,top:1,color:"#C084FC",fontWeight:700,fontSize:13}}>›</span>
              {pt}
            </li>
          ))}
        </ul>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14,paddingTop:18,borderTop:"1px solid rgba(147,51,234,0.08)"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
            {p.tech.map((t)=>(
              <div key={t.name} style={{
                display:"flex",alignItems:"center",gap:6,
                background:"rgba(147,51,234,0.07)",
                border:"1px solid rgba(147,51,234,0.15)",
                borderRadius:8,padding:"5px 10px",transition:"all 0.2s",
              }}
                onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(147,51,234,0.14)";e.currentTarget.style.borderColor="rgba(147,51,234,0.35)";}}
                onMouseLeave={(e)=>{e.currentTarget.style.background="rgba(147,51,234,0.07)";e.currentTarget.style.borderColor="rgba(147,51,234,0.15)";}}
              >
                <img src={t.icon} alt={t.name} style={{width:15,height:15,objectFit:"contain"}} onError={(e)=>{e.target.style.display="none";}}/>
                <span style={{fontSize:11,color:"#C084FC",fontWeight:500}}>{t.name}</span>
              </div>
            ))}
          </div>
          <a href={p.github} target="_blank" rel="noreferrer" style={{
            display:"flex",alignItems:"center",gap:8,
            padding:"8px 18px",borderRadius:9,
            background:hovered?"rgba(147,51,234,0.15)":"transparent",
            border:"1.5px solid rgba(147,51,234,0.35)",
            color:"#A855F7",fontSize:12,fontWeight:600,
            transition:"all 0.25s",textDecoration:"none",
          }}
            onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(147,51,234,0.22)";e.currentTarget.style.color="#C084FC";}}
            onMouseLeave={(e)=>{e.currentTarget.style.background=hovered?"rgba(147,51,234,0.15)":"transparent";e.currentTarget.style.color="#A855F7";}}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
      <style>{`@keyframes gradient-x{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>
    </div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const [visible,setVisible] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.08});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="projects" ref={ref}>
      <p className="section-label" style={{opacity:visible?1:0,transition:"opacity .5s"}}>Portfolio</p>
      <h2 className="section-title" style={{opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Projects I've built</h2>
      <div style={{display:"flex",flexDirection:"column",gap:22}}>
        {data.projects.map((p,i)=><ProjectCard key={p.title} p={p} index={i} visible={visible}/>)}
      </div>
    </section>
  );
};

export default Projects;
