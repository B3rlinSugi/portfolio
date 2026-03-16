import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const CertCard = ({ cert, index, visible }) => {
  const [hovered,setHovered] = useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        background:hovered?"#F5F3FF":"#FFFFFF",
        border:`1px solid ${hovered?"#C4B5FD":"#E2E8F0"}`,
        borderRadius:10, padding:"16px 20px",
        display:"flex", alignItems:"center", gap:14,
        position:"relative", overflow:"hidden", cursor:"default",
        opacity:visible?1:0,
        transform:visible?"translateY(0)":"translateY(16px)",
        transition:`opacity .5s cubic-bezier(.22,1,.36,1) ${index*70}ms,transform .5s cubic-bezier(.22,1,.36,1) ${index*70}ms,background .2s,border-color .2s,box-shadow .2s`,
        boxShadow:hovered?"0 6px 20px rgba(124,58,237,0.08)":"0 1px 4px rgba(15,23,42,0.04)",
      }}
    >
      {/* Index number */}
      <div style={{
        position:"absolute", top:10, right:14,
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:10, fontWeight:700, color:"#E2E8F0",
        letterSpacing:"0.5px",
      }}>{String(index+1).padStart(2,"0")}</div>

      {/* Year badge */}
      <div style={{
        position:"absolute", top:10, right:36,
        fontSize:10, color:hovered?"#7C3AED":"#94A3B8",
        fontFamily:"'JetBrains Mono',monospace", fontWeight:600,
        transition:"color 0.2s",
      }}>{cert.year}</div>

      {/* Icon */}
      <div style={{
        width:44, height:44, borderRadius:10,
        background:hovered?"#EDE9FE":"#F8FAFC",
        border:`1px solid ${hovered?"#C4B5FD":"#E2E8F0"}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0,
        transition:"all 0.2s",
      }}>
        <img src={cert.icon} alt={cert.name}
          style={{width:24,height:24,objectFit:"contain"}}
          onError={(e)=>{e.target.style.display="none";e.target.nextSibling.style.display="block";}}
        />
        <span style={{display:"none",fontSize:13,color:"#7C3AED",fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{cert.name[0]}</span>
      </div>

      <div style={{minWidth:0,paddingRight:50,flex:1}}>
        <div style={{
          fontSize:13.5, fontWeight:600,
          color:hovered?"#0F172A":"#1E293B",
          marginBottom:4, lineHeight:1.4,
          transition:"color 0.2s",
          fontFamily:"'Plus Jakarta Sans',sans-serif",
        }}>{cert.name}</div>
        <div style={{
          fontSize:11.5, color:hovered?"#7C3AED":"#64748B",
          fontWeight:500, transition:"color 0.2s",
          fontFamily:"'JetBrains Mono',monospace",
        }}>{cert.issuer}</div>
      </div>
    </div>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const [visible,setVisible] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.08});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="certifications" ref={ref} style={{background:"#F8FAFC",borderTop:"1px solid #F1F5F9"}}>
      <div style={{
        fontSize:11,fontWeight:700,letterSpacing:"2.5px",
        textTransform:"uppercase",color:"#7C3AED",marginBottom:10,
        fontFamily:"'JetBrains Mono',monospace",
        opacity:visible?1:0,transition:"opacity .5s",
        display:"flex",alignItems:"center",gap:8,
      }}>
        <span style={{width:18,height:1.5,background:"#7C3AED",display:"inline-block"}}/>
        credentials
      </div>
      <h2 style={{
        fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,4vw,44px)",
        fontWeight:800,color:"#0F172A",marginBottom:48,
        letterSpacing:"-1.5px",lineHeight:1.1,
        opacity:visible?1:0,transform:visible?"none":"translateY(16px)",
        transition:"opacity .6s ease .1s,transform .6s ease .1s",
      }}>Training & Certifications</h2>
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
        gap:10,
      }}>
        {data.certifications.map((cert,i)=>(
          <CertCard key={cert.name} cert={cert} index={i} visible={visible}/>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
