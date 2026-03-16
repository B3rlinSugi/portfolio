import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const CertCard = ({ cert, index, visible }) => {
  const [hovered,setHovered]=useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{
      background:hovered?"rgba(29,78,216,0.08)":"rgba(15,31,56,0.5)",
      border:`1px solid ${hovered?"rgba(59,130,246,0.3)":"rgba(59,130,246,0.1)"}`,
      borderRadius:12,padding:"16px 18px",
      display:"flex",alignItems:"center",gap:14,
      position:"relative",overflow:"hidden",cursor:"default",
      opacity:visible?1:0,
      transform:visible?"translateY(0)":"translateY(16px)",
      transition:`opacity .5s cubic-bezier(.22,1,.36,1) ${index*70}ms,transform .5s cubic-bezier(.22,1,.36,1) ${index*70}ms,background .2s,border-color .2s,box-shadow .2s`,
      boxShadow:hovered?"0 0 28px rgba(29,78,216,0.1)":"none",
    }}>
      {/* Top accent */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:hovered?"linear-gradient(to right,#1D4ED8,#06B6D4)":"transparent",transition:"background 0.3s"}}/>

      <div style={{
        position:"absolute",top:10,right:14,
        fontSize:10,fontWeight:700,color:"rgba(59,130,246,0.2)",
        fontFamily:"'JetBrains Mono',monospace",
      }}>{cert.year}</div>

      <div style={{
        width:42,height:42,borderRadius:10,
        background:hovered?"rgba(29,78,216,0.18)":"rgba(15,31,56,0.8)",
        border:`1px solid ${hovered?"rgba(59,130,246,0.35)":"rgba(59,130,246,0.1)"}`,
        display:"flex",alignItems:"center",justifyContent:"center",
        flexShrink:0,transition:"all 0.2s",
      }}>
        <img src={cert.icon} alt={cert.name} style={{width:24,height:24,objectFit:"contain"}}
          onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="block";}}/>
        <span style={{display:"none",fontSize:12,color:"var(--blue-3)",fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{cert.name[0]}</span>
      </div>

      <div style={{minWidth:0,paddingRight:40,flex:1}}>
        <div style={{fontSize:13,fontWeight:600,color:hovered?"var(--white)":"var(--white-2)",marginBottom:4,lineHeight:1.4,transition:"color 0.2s",fontFamily:"'Outfit',sans-serif"}}>{cert.name}</div>
        <div style={{fontSize:11,color:hovered?"var(--cyan)":"var(--muted)",fontWeight:500,transition:"color 0.2s",fontFamily:"'JetBrains Mono',monospace"}}>{cert.issuer}</div>
      </div>
    </div>
  );
};

const Certifications = () => {
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.08});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="certifications" ref={ref} style={{background:"var(--navy)",borderTop:"1px solid rgba(59,130,246,0.07)"}}>
      <p className="s-label" style={{opacity:visible?1:0,transition:"opacity .5s"}}>credentials</p>
      <h2 className="s-title" style={{opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Training & Certifications</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>
        {data.certifications.map((cert,i)=><CertCard key={cert.name} cert={cert} index={i} visible={visible}/>)}
      </div>
    </section>
  );
};

export default Certifications;
