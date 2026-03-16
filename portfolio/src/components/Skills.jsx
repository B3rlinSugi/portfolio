import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const SkillCard = ({ item, delay, started }) => {
  const [hovered,setHovered]=useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{
      display:"flex",alignItems:"center",gap:12,
      padding:"12px 14px",
      background:hovered?"rgba(29,78,216,0.1)":"rgba(15,31,56,0.5)",
      border:`1px solid ${hovered?"rgba(59,130,246,0.35)":"rgba(59,130,246,0.1)"}`,
      borderRadius:10,cursor:"default",
      opacity:started?1:0,
      transform:started?"translateY(0)":"translateY(14px)",
      transition:`opacity 0.45s ease ${delay}ms,transform 0.45s cubic-bezier(.22,1,.36,1) ${delay}ms,background 0.2s,border-color 0.2s,box-shadow 0.2s`,
      boxShadow:hovered?"0 0 24px rgba(29,78,216,0.12)":"none",
    }}>
      <div style={{
        width:36,height:36,borderRadius:9,
        background:hovered?"rgba(29,78,216,0.2)":"rgba(15,31,56,0.8)",
        border:`1px solid ${hovered?"rgba(59,130,246,0.4)":"rgba(59,130,246,0.1)"}`,
        display:"flex",alignItems:"center",justifyContent:"center",
        flexShrink:0,transition:"all 0.2s",
      }}>
        <img src={item.icon} alt={item.name} style={{width:20,height:20,objectFit:"contain"}}
          onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="block";}}/>
        <span style={{display:"none",fontSize:11,color:"var(--blue-3)",fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{item.name[0]}</span>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <span style={{fontSize:12.5,fontWeight:600,color:hovered?"#F0F6FF":"var(--white-2)",transition:"color 0.2s",fontFamily:"'Outfit',sans-serif"}}>{item.name}</span>
          <span style={{fontSize:10,color:hovered?"var(--cyan)":"var(--muted)",fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{item.level}%</span>
        </div>
        <div style={{height:3,background:"rgba(59,130,246,0.08)",borderRadius:4,overflow:"hidden"}}>
          <div style={{
            height:"100%",borderRadius:4,
            background:hovered?"linear-gradient(to right,#1D4ED8,#06B6D4)":"linear-gradient(to right,#1E3A6E,#1D4ED8)",
            width:started?item.level+"%":"0%",
            transition:`width 1.3s cubic-bezier(.22,1,.36,1) ${delay+100}ms,background 0.2s`,
            boxShadow:hovered?"0 0 8px rgba(6,182,212,0.4)":"none",
          }}/>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const ref=useRef(null);
  const [started,setStarted]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);obs.disconnect();}},{threshold:0.08});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="skills" ref={ref} style={{background:"var(--navy)",borderTop:"1px solid rgba(59,130,246,0.07)"}}>
      <p className="s-label" style={{opacity:started?1:0,transition:"opacity .5s"}}>technical_skills</p>
      <h2 className="s-title" style={{opacity:started?1:0,transform:started?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>What I work with</h2>
      <div style={{display:"flex",flexDirection:"column",gap:34}}>
        {data.skills.map((cat,ci)=>(
          <div key={cat.category}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,opacity:started?1:0,transition:`opacity 0.4s ease ${ci*80}ms`}}>
              <code style={{
                fontSize:10.5,fontWeight:600,color:"var(--cyan)",
                background:"rgba(6,182,212,0.08)",border:"1px solid rgba(6,182,212,0.2)",
                padding:"3px 10px",borderRadius:6,
                fontFamily:"'JetBrains Mono',monospace",letterSpacing:"0.3px",
              }}>{cat.category}</code>
              <div style={{flex:1,height:1,background:"rgba(59,130,246,0.08)"}}/>
              <span style={{fontSize:10,color:"var(--muted-2)",fontFamily:"'JetBrains Mono',monospace"}}>{cat.items.length}x</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(205px,1fr))",gap:8}}>
              {cat.items.map((item,ii)=>(
                <SkillCard key={item.name} item={item} started={started} delay={ci*50+ii*60+80}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
