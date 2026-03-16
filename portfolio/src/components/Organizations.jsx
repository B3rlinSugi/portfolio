import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const OrgRow = ({ org, index, visible }) => {
  const [hovered,setHovered]=useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        display:"flex",borderRadius:16,overflow:"hidden",
        border:`1px solid ${hovered?"rgba(59,130,246,0.3)":"rgba(59,130,246,0.1)"}`,
        opacity:visible?1:0,
        transform:visible?"translateX(0)":"translateX(-28px)",
        transition:`opacity 0.7s cubic-bezier(.22,1,.36,1) ${index*160}ms,transform 0.7s cubic-bezier(.22,1,.36,1) ${index*160}ms,border-color .25s,box-shadow .25s`,
        boxShadow:hovered?"0 0 48px rgba(29,78,216,0.1),0 16px 48px rgba(0,0,0,0.3)":"0 4px 20px rgba(0,0,0,0.2)",
        minHeight:220,
      }} className="org-row"
    >
      {/* Left index strip */}
      <div style={{
        width:56,flexShrink:0,
        background:hovered?"rgba(29,78,216,0.1)":"rgba(6,14,30,0.6)",
        borderRight:`1px solid ${hovered?"rgba(59,130,246,0.15)":"rgba(59,130,246,0.07)"}`,
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        gap:8,transition:"background 0.2s",
      }}>
        <span style={{
          fontFamily:"'Bricolage Grotesque',sans-serif",
          fontSize:24,fontWeight:800,
          color:hovered?"rgba(59,130,246,0.25)":"rgba(59,130,246,0.1)",
          lineHeight:1,transition:"color 0.2s",
        }}>0{index+1}</span>
        <div style={{width:1.5,height:40,background:hovered?"linear-gradient(to bottom,#1D4ED8,#06B6D4)":"rgba(59,130,246,0.1)",transition:"background 0.2s",borderRadius:2}}/>
      </div>

      {/* Photo */}
      <div style={{flex:"0 0 210px",position:"relative",overflow:"hidden",background:"var(--navy-3)"}} className="org-photo">
        <div style={{position:"absolute",inset:0,zIndex:1,background:"rgba(6,14,30,0.35)",mixBlendMode:"multiply",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,zIndex:2,background:"linear-gradient(to right,transparent 55%,rgba(10,22,40,0.95) 100%)",pointerEvents:"none"}}/>
        <img src={org.photo} alt={org.role} style={{
          width:"100%",height:"100%",objectFit:"cover",display:"block",
          transform:hovered?"scale(1.05)":"scale(1)",
          transition:"transform 0.6s cubic-bezier(.22,1,.36,1)",
        }}
          onError={e=>{e.target.style.display="none";document.getElementById(`ph-${index}`).style.display="flex";}}
        />
        <div id={`ph-${index}`} style={{display:"none",position:"absolute",inset:0,zIndex:3,alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,background:"var(--navy-3)"}}>
          <div style={{width:48,height:48,borderRadius:12,background:"rgba(29,78,216,0.1)",border:"1px solid rgba(59,130,246,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏛️</div>
          <span style={{fontSize:10,color:"var(--muted)",letterSpacing:"1px",fontFamily:"'JetBrains Mono',monospace"}}>/org{index+1}.jpg</span>
        </div>
        {/* Period pill */}
        <div style={{
          position:"absolute",bottom:14,left:14,zIndex:4,
          fontSize:10,color:"var(--white-2)",
          background:"rgba(6,14,30,0.85)",
          backdropFilter:"blur(8px)",
          border:"1px solid rgba(59,130,246,0.2)",
          padding:"4px 12px",borderRadius:100,
          fontFamily:"'JetBrains Mono',monospace",fontWeight:500,
        }}>{org.period}</div>
      </div>

      {/* Content */}
      <div style={{flex:1,padding:"28px 32px",background:"rgba(15,31,56,0.4)",display:"flex",flexDirection:"column",justifyContent:"center"}} className="org-content">
        <div style={{fontSize:11,color:"var(--muted)",fontWeight:500,marginBottom:6,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"0.3px"}}>{org.org}</div>
        <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:20,fontWeight:800,color:"var(--white)",marginBottom:10,lineHeight:1.2,letterSpacing:"-0.5px"}}>{org.role}</h3>
        <p style={{fontSize:13.5,color:"#6B84A8",lineHeight:1.8,marginBottom:18,maxWidth:460,fontFamily:"'Outfit',sans-serif"}}>{org.desc}</p>
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
          fontSize:12,fontWeight:600,
          color:hovered?"var(--white-2)":"var(--muted)",
          textDecoration:"none",padding:"8px 16px",borderRadius:8,
          background:hovered?"rgba(59,130,246,0.1)":"transparent",
          border:`1px solid ${hovered?"rgba(59,130,246,0.25)":"rgba(59,130,246,0.12)"}`,
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
  );
};

const Organizations = () => {
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.05});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="organizations" ref={ref} style={{background:"var(--navy-2)",borderTop:"1px solid rgba(59,130,246,0.07)"}}>
      <p className="s-label" style={{opacity:visible?1:0,transition:"opacity .5s"}}>organizations</p>
      <h2 className="s-title" style={{opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Organisational Journey</h2>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {data.organizations.map((org,i)=><OrgRow key={org.role} org={org} index={i} visible={visible}/>)}
      </div>
      <style>{`
        @media(max-width:900px){.org-photo{flex:0 0 160px !important;}.org-content{padding:20px !important;}}
        @media(max-width:640px){.org-row{flex-direction:column !important;}.org-photo{flex:0 0 160px !important;min-height:160px;}}
      `}</style>
    </section>
  );
};

export default Organizations;
