import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const CertCard = ({ cert, index, visible }) => {
  const [hovered,setHovered] = useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        background:"#242336",
        border:`1px solid ${hovered?"rgba(147,51,234,0.5)":"rgba(147,51,234,0.12)"}`,
        borderRadius:14,padding:"20px 22px",
        display:"flex",alignItems:"center",gap:18,
        position:"relative",overflow:"hidden",cursor:"default",
        opacity:visible?1:0,
        transform:visible?"scale(1) rotate(0)":"scale(0.62) rotate(-8deg)",
        transition:`opacity .55s cubic-bezier(.22,1,.36,1) ${index*80}ms,transform .55s cubic-bezier(.22,1,.36,1) ${index*80}ms,border-color .3s,box-shadow .3s`,
        boxShadow:hovered?"0 14px 40px rgba(147,51,234,0.14)":"none",
      }}
    >
      <div style={{
        position:"absolute",inset:0,
        background:hovered?"radial-gradient(ellipse at 20% 50%,rgba(147,51,234,0.08),transparent 70%)":"transparent",
        transition:"background 0.4s",pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute",top:10,right:14,
        fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,
        color:"#3E3C5A",letterSpacing:"1px",
      }}>{cert.year}</div>
      <div style={{
        width:46,height:46,borderRadius:12,
        background:hovered?"rgba(147,51,234,0.15)":"rgba(147,51,234,0.07)",
        border:`1px solid ${hovered?"rgba(147,51,234,0.4)":"rgba(147,51,234,0.13)"}`,
        display:"flex",alignItems:"center",justifyContent:"center",
        flexShrink:0,transition:"all 0.3s",
        transform:hovered?"scale(1.1) rotate(-6deg)":"none",
      }}>
        <img src={cert.icon} alt={cert.name}
          style={{width:26,height:26,objectFit:"contain"}}
          onError={(e)=>{e.target.style.display="none";e.target.nextSibling.style.display="block";}}
        />
        <span style={{display:"none",fontSize:14,color:"#9333EA",fontWeight:700}}>{cert.name[0]}</span>
      </div>
      <div style={{minWidth:0,paddingRight:28}}>
        <div style={{fontSize:13.5,fontWeight:600,color:hovered?"#F8F7FF":"#D8D4F0",marginBottom:4,lineHeight:1.4,transition:"color 0.2s"}}>{cert.name}</div>
        <div style={{fontSize:12,color:hovered?"#A855F7":"#5B4D8A",fontWeight:500,transition:"color 0.2s"}}>{cert.issuer}</div>
      </div>
      <div style={{
        position:"absolute",inset:0,borderRadius:14,
        background:"linear-gradient(110deg,transparent 35%,rgba(192,132,252,0.06) 50%,transparent 65%)",
        backgroundSize:"200% 100%",
        backgroundPosition:hovered?"0% center":"200% center",
        transition:"background-position 0.6s ease",pointerEvents:"none",
      }}/>
    </div>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const [visible,setVisible] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="certifications" ref={ref}>
      <p className="section-label" style={{opacity:visible?1:0,transition:"opacity .5s"}}>Credentials</p>
      <h2 className="section-title" style={{opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Training & Certifications</h2>
      <div className="cert-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
        {data.certifications.map((cert,i)=><CertCard key={cert.name} cert={cert} index={i} visible={visible}/>)}
      </div>
    </section>
  );
};

export default Certifications;
