import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const SkillCard = ({ item, delay, started }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        display:"flex", alignItems:"center", gap:12,
        padding:"12px 14px",
        background:hovered?"#F5F3FF":"#FFFFFF",
        border:`1px solid ${hovered?"#C4B5FD":"#E2E8F0"}`,
        borderRadius:10,
        cursor:"default",
        opacity:started?1:0,
        transform:started?"translateY(0)":"translateY(12px)",
        transition:`opacity 0.45s ease ${delay}ms,transform 0.45s cubic-bezier(.22,1,.36,1) ${delay}ms,background 0.2s,border-color 0.2s`,
        boxShadow:hovered?"0 4px 16px rgba(124,58,237,0.08)":"0 1px 4px rgba(15,23,42,0.04)",
      }}
    >
      <div style={{
        width:36, height:36, borderRadius:8,
        background:hovered?"#EDE9FE":"#F8FAFC",
        border:`1px solid ${hovered?"#C4B5FD":"#E2E8F0"}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0,
        transition:"all 0.2s",
      }}>
        <img src={item.icon} alt={item.name}
          style={{width:20,height:20,objectFit:"contain"}}
          onError={(e)=>{e.target.style.display="none";e.target.nextSibling.style.display="block";}}
        />
        <span style={{display:"none",fontSize:11,color:"#7C3AED",fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{item.name[0]}</span>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6,
        }}>
          <span style={{fontSize:13,fontWeight:600,color:hovered?"#4C1D95":"#1E293B",transition:"color 0.2s",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{item.name}</span>
          <span style={{fontSize:10.5,color:hovered?"#7C3AED":"#94A3B8",fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{item.level}%</span>
        </div>
        <div style={{height:3,background:"#F1F5F9",borderRadius:4,overflow:"hidden"}}>
          <div style={{
            height:"100%", borderRadius:4,
            background:hovered?"linear-gradient(to right,#7C3AED,#0EA5E9)":"linear-gradient(to right,#C4B5FD,#93C5FD)",
            width:started?item.level+"%":"0%",
            transition:`width 1.3s cubic-bezier(.22,1,.36,1) ${delay+100}ms, background 0.2s`,
          }}/>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const [started,setStarted] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);obs.disconnect();}},{threshold:0.08});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <section id="skills" ref={ref} style={{background:"#F8FAFC",borderTop:"1px solid #F1F5F9"}}>
      <div style={{
        fontSize:11, fontWeight:700, letterSpacing:"2.5px",
        textTransform:"uppercase", color:"#7C3AED", marginBottom:10,
        fontFamily:"'JetBrains Mono',monospace",
        opacity:started?1:0, transition:"opacity .5s",
        display:"flex", alignItems:"center", gap:8,
      }}>
        <span style={{width:18,height:1.5,background:"#7C3AED",display:"inline-block"}}/>
        technical_skills
      </div>
      <h2 style={{
        fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,4vw,44px)",
        fontWeight:800, color:"#0F172A", marginBottom:48,
        letterSpacing:"-1.5px", lineHeight:1.1,
        opacity:started?1:0, transform:started?"none":"translateY(16px)",
        transition:"opacity .6s ease .1s,transform .6s ease .1s",
      }}>What I work with</h2>

      <div style={{display:"flex",flexDirection:"column",gap:36}}>
        {data.skills.map((cat,ci)=>(
          <div key={cat.category}>
            {/* Category header */}
            <div style={{
              display:"flex", alignItems:"center", gap:10, marginBottom:14,
              opacity:started?1:0, transition:`opacity 0.4s ease ${ci*80}ms`,
            }}>
              <code style={{
                fontSize:11, fontWeight:700, letterSpacing:"0.5px",
                color:"#7C3AED", background:"#EDE9FE",
                border:"1px solid #DDD6FE",
                padding:"3px 10px", borderRadius:6,
                fontFamily:"'JetBrains Mono',monospace",
              }}>{cat.category}</code>
              <div style={{flex:1,height:1,background:"#E2E8F0"}}/>
              <span style={{fontSize:11,color:"#CBD5E1",fontFamily:"'JetBrains Mono',monospace"}}>{cat.items.length} items</span>
            </div>

            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",
              gap:8,
            }}>
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
