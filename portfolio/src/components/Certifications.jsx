import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const CertCard3D = ({ cert, index, visible }) => {
  const cardRef=useRef(null), rafRef=useRef(null);
  const [tilt,setTilt]=useState({rx:0,ry:0,gx:50,gy:50});
  const [hovered,setHovered]=useState(false);

  const onMove=e=>{
    const el=cardRef.current; if(!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current=requestAnimationFrame(()=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      setTilt({rx:(y-0.5)*-14,ry:(x-0.5)*14,gx:Math.round(x*100),gy:Math.round(y*100)});
    });
  };
  const onLeave=()=>{ cancelAnimationFrame(rafRef.current); setHovered(false); setTilt({rx:0,ry:0,gx:50,gy:50}); };

  const accentColors=["#3B82F6","#06B6D4","#8B5CF6","#10B981","#F59E0B","#EF4444"];
  const ac=accentColors[index%accentColors.length];

  return (
    <div ref={cardRef}
      onMouseEnter={()=>setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        perspective:"700px",
        opacity:visible?1:0,
        transform:visible?"scale(1)":"scale(0.88)",
        transition:`opacity .55s cubic-bezier(.22,1,.36,1) ${index*70}ms,transform .55s cubic-bezier(.22,1,.36,1) ${index*70}ms`,
      }}
    >
      <div style={{
        borderRadius:16, overflow:"hidden",
        background:hovered?`linear-gradient(135deg,${ac}10,rgba(15,31,56,0.8))`:"rgba(15,31,56,0.6)",
        border:`1px solid ${hovered?ac+"40":"rgba(59,130,246,0.12)"}`,
        padding:"22px 20px",
        transform:hovered
          ?`perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.04) translateZ(8px)`
          :"perspective(700px) rotateX(0) rotateY(0) scale(1)",
        transition:hovered?"transform 0.08s linear,box-shadow 0.2s,background 0.2s,border-color 0.2s":"transform 0.5s cubic-bezier(.22,1,.36,1),box-shadow 0.35s,background 0.3s,border-color 0.3s",
        boxShadow:hovered?`0 24px 48px rgba(0,0,0,0.35),0 0 0 1px ${ac}20,inset 0 1px 0 rgba(255,255,255,0.05)`:"0 4px 16px rgba(0,0,0,0.2)",
        willChange:"transform",
        position:"relative",
        cursor:"default",
      }}>
        {/* Top accent */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:2.5,background:hovered?`linear-gradient(to right,${ac},${ac}80)`:"transparent",transition:"background 0.3s",borderRadius:"16px 16px 0 0"}}/>

        {/* Shine */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",borderRadius:16,
          background:hovered?`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%,rgba(255,255,255,0.06),transparent 55%)`:"transparent",
          transition:"background 0.1s",
        }}/>

        <div style={{display:"flex",alignItems:"center",gap:14,position:"relative",zIndex:1}}>
          {/* Icon with 3D effect */}
          <div style={{
            width:48,height:48,borderRadius:13,flexShrink:0,
            background:hovered?`${ac}18`:"rgba(15,31,56,0.9)",
            border:`1px solid ${hovered?ac+"35":"rgba(59,130,246,0.12)"}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            transition:"all 0.2s",
            transform:hovered?`rotateY(${tilt.ry*0.5}deg) scale(1.08)`:"none",
            boxShadow:hovered?`0 6px 16px ${ac}20`:"none",
          }}>
            <img src={cert.icon} alt={cert.name} style={{width:26,height:26,objectFit:"contain"}}
              onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="block";}}/>
            <span style={{display:"none",fontSize:13,color:ac,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{cert.name[0]}</span>
          </div>

          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,color:hovered?"var(--white)":"var(--white-2)",marginBottom:3,lineHeight:1.35,transition:"color 0.2s",fontFamily:"'Outfit',sans-serif"}}>{cert.name}</div>
            <div style={{fontSize:10.5,color:hovered?ac:"var(--muted)",transition:"color 0.2s",fontFamily:"'JetBrains Mono',monospace"}}>{cert.issuer}</div>
          </div>

          {/* Year badge */}
          <div style={{
            fontSize:11,fontWeight:700,color:hovered?ac:"var(--muted-2)",
            background:hovered?`${ac}12`:"rgba(15,31,56,0.8)",
            border:`1px solid ${hovered?ac+"25":"rgba(59,130,246,0.08)"}`,
            padding:"3px 8px",borderRadius:6,
            fontFamily:"'JetBrains Mono',monospace",
            flexShrink:0,transition:"all 0.2s",
          }}>{cert.year}</div>
        </div>
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
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
        {data.certifications.map((cert,i)=><CertCard3D key={cert.name} cert={cert} index={i} visible={visible}/>)}
      </div>
    </section>
  );
};

export default Certifications;
