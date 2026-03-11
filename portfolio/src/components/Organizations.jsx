import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const OrgRow = ({ org, index, visible }) => {
  const isEven = index % 2 === 0;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="org-alt"
      style={{
        display:"flex",
        flexDirection: isEven ? "row" : "row-reverse",
        gap:0,
        borderRadius:20,
        overflow:"hidden",
        border:`1px solid ${hovered?"rgba(147,51,234,0.45)":"rgba(147,51,234,0.14)"}`,
        opacity: visible?1:0,
        transform: visible
          ? "translateX(0)"
          : `translateX(${isEven?"-50px":"50px"})`,
        transition:`
          opacity 0.8s cubic-bezier(.22,1,.36,1) ${index*180}ms,
          transform 0.8s cubic-bezier(.22,1,.36,1) ${index*180}ms,
          border-color 0.3s, box-shadow 0.3s
        `,
        boxShadow: hovered?"0 28px 70px rgba(147,51,234,0.14)":"none",
        minHeight:280,
      }}
    >
      {/* Photo side — 45% width */}
      <div style={{
        position:"relative", flex:"0 0 42%", overflow:"hidden",
        background:"#1C1B2E",
      }}>
        {/* Purple tint to unify watermarks */}
        <div style={{
          position:"absolute",inset:0,zIndex:1,
          background:"rgba(28,27,46,0.4)",
          mixBlendMode:"multiply",pointerEvents:"none",
        }}/>
        {/* Gradient fade towards content */}
        <div style={{
          position:"absolute",inset:0,zIndex:2,
          background: isEven
            ? "linear-gradient(to right,transparent 60%,rgba(36,35,54,0.95) 100%)"
            : "linear-gradient(to left,transparent 60%,rgba(36,35,54,0.95) 100%)",
          pointerEvents:"none",
        }}/>

        <img src={org.photo} alt={org.role}
          style={{
            width:"100%",height:"100%",objectFit:"cover",display:"block",
            transform:hovered?"scale(1.06)":"scale(1)",
            transition:"transform 0.7s cubic-bezier(.22,1,.36,1)",
          }}
          onError={(e)=>{
            e.target.style.display="none";
            document.getElementById(`ph-${index}`).style.display="flex";
          }}
        />
        <div id={`ph-${index}`} style={{
          display:"none",position:"absolute",inset:0,zIndex:3,
          alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10,
        }}>
          <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(147,51,234,0.1)",
            border:"2px dashed rgba(147,51,234,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🏛️</div>
          <span style={{fontSize:11,color:"#3E3C5A",letterSpacing:"1.5px",textTransform:"uppercase"}}>/org{index+1}.jpg</span>
        </div>

        {/* Period pill */}
        <div style={{
          position:"absolute",top:18,
          [isEven?"left":"right"]:18,
          zIndex:4,
          fontSize:11,color:"#D8D4F0",
          background:"rgba(28,27,46,0.85)",
          border:"1px solid rgba(147,51,234,0.25)",
          backdropFilter:"blur(10px)",
          padding:"5px 14px",borderRadius:100,
          letterSpacing:"0.3px",fontWeight:500,
        }}>{org.period}</div>

        {/* Number */}
        <div style={{
          position:"absolute",bottom:18,
          [isEven?"left":"right"]:18,
          zIndex:4,
          fontFamily:"'Inter',sans-serif",
          fontSize:42,fontWeight:900,
          color:"rgba(147,51,234,0.15)",letterSpacing:"-2px",
          lineHeight:1,
        }}>0{index+1}</div>
      </div>

      {/* Content side — 58% */}
      <div style={{
        flex:1,padding:"36px 40px",
        background:"#242336",
        display:"flex",flexDirection:"column",justifyContent:"center",
      }}>
        <div style={{
          fontSize:12,color:"#6D5FA0",fontWeight:500,
          marginBottom:6,letterSpacing:"0.3px",
        }}>{org.org}</div>

        <h3 style={{
          fontFamily:"'Inter',sans-serif",
          fontSize:22,fontWeight:800,
          color:"#F8F7FF",marginBottom:12,lineHeight:1.2,
          letterSpacing:"-0.5px",
        }}>{org.role}</h3>

        <p style={{
          fontSize:14,color:"#6B6890",lineHeight:1.85,marginBottom:20,
          maxWidth:480,
        }}>{org.desc}</p>

        {/* Highlights */}
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:22}}>
          {org.highlights.map((h)=>(
            <span key={h} style={{
              fontSize:11,color:"#A855F7",
              background:"rgba(147,51,234,0.09)",
              border:"1px solid rgba(147,51,234,0.2)",
              padding:"4px 12px",borderRadius:100,fontWeight:600,
            }}>{h}</span>
          ))}
        </div>

        {/* Instagram CTA */}
        <a href={org.instagram} target="_blank" rel="noreferrer" style={{
          display:"inline-flex",alignItems:"center",gap:9,
          fontSize:12,fontWeight:700,
          color:hovered?"#F472B6":"#A855F7",
          textDecoration:"none",
          padding:"10px 18px",borderRadius:10,
          background:hovered?"rgba(236,72,153,0.12)":"rgba(147,51,234,0.08)",
          border:`1.5px solid ${hovered?"rgba(236,72,153,0.35)":"rgba(147,51,234,0.2)"}`,
          transition:"all 0.25s",
          width:"fit-content",
          letterSpacing:"0.3px",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          See on Instagram
        </a>
      </div>
    </div>
  );
};

const Organizations = () => {
  const ref = useRef(null);
  const [visible,setVisible] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.06});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="organizations" ref={ref}>
      <p className="section-label" style={{opacity:visible?1:0,transition:"opacity .5s"}}>Experience</p>
      <h2 className="section-title" style={{opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>
        Organisational Journey
      </h2>
      <div style={{display:"flex",flexDirection:"column",gap:20}}>
        {data.organizations.map((org,i)=>(
          <OrgRow key={org.role} org={org} index={i} visible={visible}/>
        ))}
      </div>
    </section>
  );
};

export default Organizations;
