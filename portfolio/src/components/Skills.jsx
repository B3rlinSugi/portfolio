import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

/* Single skill pill */
const SkillPill = ({ item }) => {
  const [hovered,setHovered]=useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        display:"inline-flex", alignItems:"center", gap:10,
        padding:"10px 18px",
        background:hovered?"rgba(29,78,216,0.15)":"rgba(15,31,56,0.7)",
        border:`1px solid ${hovered?"rgba(59,130,246,0.4)":"rgba(59,130,246,0.14)"}`,
        borderRadius:100,
        flexShrink:0,
        cursor:"default",
        transition:"background 0.2s,border-color 0.2s,box-shadow 0.2s,transform 0.2s",
        boxShadow:hovered?"0 0 20px rgba(29,78,216,0.15)":"none",
        transform:hovered?"scale(1.05)":"scale(1)",
      }}
    >
      <div style={{
        width:26,height:26,borderRadius:8,
        background:hovered?"rgba(29,78,216,0.2)":"rgba(15,31,56,0.9)",
        border:`1px solid ${hovered?"rgba(59,130,246,0.35)":"rgba(59,130,246,0.12)"}`,
        display:"flex",alignItems:"center",justifyContent:"center",
        flexShrink:0,transition:"all 0.2s",
      }}>
        <img src={item.icon} alt={item.name} style={{width:16,height:16,objectFit:"contain"}}
          onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="block";}}/>
        <span style={{display:"none",fontSize:9,color:"var(--blue-3)",fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{item.name[0]}</span>
      </div>
      <span style={{
        fontSize:13,fontWeight:600,
        color:hovered?"var(--white)":"var(--white-2)",
        fontFamily:"'Outfit',sans-serif",
        whiteSpace:"nowrap",
        transition:"color 0.2s",
      }}>{item.name}</span>
    </div>
  );
};

/* Infinite marquee row */
const MarqueeRow = ({ items, reverse=false, speed=28 }) => {
  const doubled = [...items,...items,...items];
  return (
    <div style={{overflow:"hidden",width:"100%",position:"relative"}}>
      {/* Fade edges */}
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:80,background:"linear-gradient(to right,var(--navy),transparent)",zIndex:2,pointerEvents:"none"}}/>
      <div style={{position:"absolute",right:0,top:0,bottom:0,width:80,background:"linear-gradient(to left,var(--navy),transparent)",zIndex:2,pointerEvents:"none"}}/>
      <div style={{
        display:"flex",gap:10,
        animation:`${reverse?"marquee-rev":"marquee"} ${speed}s linear infinite`,
        width:"max-content",
      }}>
        {doubled.map((item,i)=>(
          <SkillPill key={`${item.name}-${i}`} item={item}/>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const ref=useRef(null);
  const [started,setStarted]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);obs.disconnect();}},{threshold:0.06});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  // Flatten all skills into rows, split by category for visual variety
  const allItems = data.skills.flatMap(c=>c.items);
  // Row 1: Languages + API & Security
  const row1 = [...(data.skills.find(c=>c.category==="Languages")?.items||[]), ...(data.skills.find(c=>c.category==="API & Security")?.items||[])];
  // Row 2: Frameworks & Libraries + Tools
  const row2 = [...(data.skills.find(c=>c.category==="Frameworks & Libraries")?.items||[]), ...(data.skills.find(c=>c.category==="Tools")?.items||[])];
  // Row 3: Database + all mixed
  const row3 = [...(data.skills.find(c=>c.category==="Database")?.items||[]), ...row1.slice(0,4)];

  return (
    <section id="skills" ref={ref} style={{background:"var(--navy)",borderTop:"1px solid rgba(59,130,246,0.07)",overflow:"hidden"}}>
      <p className="s-label" style={{opacity:started?1:0,transition:"opacity .5s"}}>technical_skills</p>
      <h2 className="s-title" style={{opacity:started?1:0,transform:started?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>What I work with</h2>

      {/* Category labels */}
      <div style={{
        display:"flex",flexWrap:"wrap",gap:8,marginBottom:40,
        opacity:started?1:0,transition:"opacity 0.6s ease 0.3s",
      }}>
        {data.skills.map(cat=>(
          <span key={cat.category} style={{
            fontSize:11,fontWeight:600,color:"var(--cyan)",
            background:"rgba(6,182,212,0.07)",border:"1px solid rgba(6,182,212,0.18)",
            padding:"4px 14px",borderRadius:100,
            fontFamily:"'JetBrains Mono',monospace",
          }}>{cat.category} <span style={{color:"var(--muted-2)",marginLeft:4}}>{cat.items.length}x</span></span>
        ))}
      </div>

      {/* Marquee rows */}
      <div style={{
        display:"flex",flexDirection:"column",gap:14,
        opacity:started?1:0,transition:"opacity 0.7s ease 0.4s",
        margin:"0 -64px",
      }} className="marquee-container">
        <MarqueeRow items={row1} reverse={false} speed={32}/>
        <MarqueeRow items={row2} reverse={true} speed={26}/>
        <MarqueeRow items={row3} reverse={false} speed={36}/>
      </div>

      <style>{`
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(calc(-100%/3))}}
        @keyframes marquee-rev{from{transform:translateX(calc(-100%/3))}to{transform:translateX(0)}}
        .marquee-container > div > div:hover { animation-play-state: paused !important; }
        @media(max-width:900px){ .marquee-container{ margin:0 -28px !important; } }
        @media(max-width:480px){ .marquee-container{ margin:0 -18px !important; } }
      `}</style>
    </section>
  );
};

export default Skills;
