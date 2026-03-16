import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const OrgCard3D = ({ org, index, visible }) => {
  const cardRef=useRef(null), rafRef=useRef(null);
  const [tilt,setTilt]=useState({rx:0,ry:0,gx:50,gy:50});
  const [hovered,setHovered]=useState(false);

  const onMove=e=>{
    const el=cardRef.current; if(!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current=requestAnimationFrame(()=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      setTilt({rx:(y-0.5)*-10,ry:(x-0.5)*10,gx:Math.round(x*100),gy:Math.round(y*100)});
    });
  };
  const onLeave=()=>{ cancelAnimationFrame(rafRef.current); setHovered(false); setTilt({rx:0,ry:0,gx:50,gy:50}); };

  return (
    <div ref={cardRef}
      onMouseEnter={()=>setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        perspective:"1000px",
        opacity:visible?1:0,
        transform:visible?"translateY(0)":"translateY(32px)",
        transition:`opacity 0.7s cubic-bezier(.22,1,.36,1) ${index*160}ms,transform 0.7s cubic-bezier(.22,1,.36,1) ${index*160}ms`,
      }}
    >
      <div style={{
        borderRadius:20, overflow:"hidden",
        border:`1px solid ${hovered?"rgba(59,130,246,0.3)":"rgba(59,130,246,0.1)"}`,
        background:"rgba(15,31,56,0.5)",
        transform:hovered
          ?`perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.02) translateZ(6px)`
          :"perspective(1000px) rotateX(0) rotateY(0) scale(1)",
        transition:hovered?"transform 0.1s linear,box-shadow 0.2s,border-color 0.2s":"transform 0.55s cubic-bezier(.22,1,.36,1),box-shadow 0.4s,border-color 0.3s",
        boxShadow:hovered?"0 40px 80px rgba(0,0,0,0.4),0 0 0 1px rgba(59,130,246,0.15),inset 0 1px 0 rgba(255,255,255,0.04)":"0 8px 32px rgba(0,0,0,0.25)",
        willChange:"transform",
        display:"grid", gridTemplateColumns:"240px 1fr",
      }} className="org-card-inner"
      >
        {/* Photo panel */}
        <div style={{position:"relative",overflow:"hidden",background:"var(--navy-3)",minHeight:260}}>
          {/* Overlay */}
          <div style={{position:"absolute",inset:0,zIndex:1,background:"rgba(6,14,30,0.3)",mixBlendMode:"multiply",pointerEvents:"none"}}/>
          <div style={{position:"absolute",inset:0,zIndex:2,background:"linear-gradient(to right,transparent 50%,rgba(10,22,40,0.95) 100%)",pointerEvents:"none"}}/>

          {/* Shine on hover */}
          <div style={{
            position:"absolute",inset:0,zIndex:3,pointerEvents:"none",
            background:hovered?`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%,rgba(59,130,246,0.12),transparent 60%)`:"transparent",
            transition:"background 0.1s",
          }}/>

          <img src={org.photo} alt={org.role} style={{
            width:"100%",height:"100%",objectFit:"cover",display:"block",
            transform:hovered?"scale(1.06)":"scale(1)",
            transition:"transform 0.7s cubic-bezier(.22,1,.36,1)",
          }}
            onError={e=>{e.target.style.display="none";document.getElementById(`ph-${index}`).style.display="flex";}}
          />
          <div id={`ph-${index}`} style={{display:"none",position:"absolute",inset:0,zIndex:4,alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,background:"var(--navy-3)"}}>
            <div style={{width:52,height:52,borderRadius:14,background:"rgba(29,78,216,0.1)",border:"1px solid rgba(59,130,246,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🏛️</div>
            <span style={{fontSize:9,color:"var(--muted)",fontFamily:"'JetBrains Mono',monospace"}}>/org{index+1}.jpg</span>
          </div>

          {/* Period pill */}
          <div style={{
            position:"absolute",top:14,left:14,zIndex:5,
            fontSize:10,color:"var(--white-2)",
            background:"rgba(6,14,30,0.85)",backdropFilter:"blur(8px)",
            border:"1px solid rgba(59,130,246,0.2)",
            padding:"4px 12px",borderRadius:100,
            fontFamily:"'JetBrains Mono',monospace",fontWeight:500,
          }}>{org.period}</div>

          {/* Index */}
          <div style={{
            position:"absolute",bottom:14,left:16,zIndex:5,
            fontFamily:"'Outfit',sans-serif",fontSize:48,fontWeight:900,
            color:"rgba(59,130,246,0.12)",lineHeight:1,letterSpacing:"-2px",
          }}>0{index+1}</div>
        </div>

        {/* Content panel */}
        <div style={{
          padding:"28px 28px",
          display:"flex",flexDirection:"column",justifyContent:"center",
          position:"relative",
        }}>
          {/* Top gradient accent */}
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:hovered?"linear-gradient(to right,#1D4ED8,#06B6D4)":"transparent",transition:"background 0.3s"}}/>

          <div style={{fontSize:10.5,color:"var(--muted)",fontWeight:500,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>{org.org}</div>

          <h3 style={{
            fontFamily:"'Outfit',sans-serif",fontSize:19,fontWeight:800,
            color:"var(--white)",marginBottom:10,lineHeight:1.25,letterSpacing:"-0.4px",
          }}>{org.role}</h3>

          <p style={{fontSize:13,color:"#6B84A8",lineHeight:1.8,marginBottom:16,fontFamily:"'Outfit',sans-serif"}}>{org.desc}</p>

          {/* Highlights */}
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
            {org.highlights.map(h=>(
              <span key={h} style={{
                fontSize:10.5,color:"var(--cyan)",
                background:"rgba(6,182,212,0.08)",border:"1px solid rgba(6,182,212,0.2)",
                padding:"4px 12px",borderRadius:100,fontWeight:600,
                fontFamily:"'JetBrains Mono',monospace",
              }}>{h}</span>
            ))}
          </div>

          <a href={org.instagram} target="_blank" rel="noreferrer" style={{
            display:"inline-flex",alignItems:"center",gap:8,
            fontSize:12,fontWeight:600,color:hovered?"var(--white-2)":"var(--muted)",
            textDecoration:"none",padding:"8px 14px",borderRadius:8,
            background:hovered?"rgba(59,130,246,0.1)":"transparent",
            border:`1px solid ${hovered?"rgba(59,130,246,0.25)":"rgba(59,130,246,0.1)"}`,
            transition:"all 0.2s",width:"fit-content",
            fontFamily:"'Outfit',sans-serif",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{color:"#F472B6"}}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            See on Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

const Organizations = () => {
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.04});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="organizations" ref={ref} style={{background:"var(--navy-2)",borderTop:"1px solid rgba(59,130,246,0.07)"}}>
      <p className="s-label" style={{opacity:visible?1:0,transition:"opacity .5s"}}>organizations</p>
      <h2 className="s-title" style={{opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Organisational Journey</h2>
      <div style={{display:"flex",flexDirection:"column",gap:18}}>
        {data.organizations.map((org,i)=><OrgCard3D key={org.role} org={org} index={i} visible={visible}/>)}
      </div>
      <style>{`@media(max-width:768px){.org-card-inner{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
};

export default Organizations;
