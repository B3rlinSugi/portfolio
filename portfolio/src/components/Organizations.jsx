import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const OrgRow = ({ org, index, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:"flex",
        borderRadius:14,
        overflow:"hidden",
        border:`1px solid ${hovered?"#C4B5FD":"#E2E8F0"}`,
        opacity:visible?1:0,
        transform:visible?"translateX(0)":"translateX(-24px)",
        transition:`
          opacity 0.65s cubic-bezier(.22,1,.36,1) ${index*150}ms,
          transform 0.65s cubic-bezier(.22,1,.36,1) ${index*150}ms,
          border-color 0.2s, box-shadow 0.2s
        `,
        boxShadow:hovered?"0 12px 36px rgba(124,58,237,0.08)":"0 2px 8px rgba(15,23,42,0.04)",
        background:"#FFFFFF",
        minHeight:220,
      }}
      className="org-row"
    >
      {/* Left accent + index */}
      <div style={{
        width:64, flexShrink:0,
        background:hovered?"#EDE9FE":"#F8FAFC",
        borderRight:`1px solid ${hovered?"#DDD6FE":"#F1F5F9"}`,
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        gap:8, padding:"20px 0",
        transition:"background 0.2s,border-color 0.2s",
      }}>
        <span style={{
          fontFamily:"'Syne',sans-serif",
          fontSize:28, fontWeight:800,
          color:hovered?"#DDD6FE":"#E2E8F0",
          lineHeight:1, transition:"color 0.2s",
        }}>0{index+1}</span>
        <div style={{
          width:2, flex:1, maxHeight:60,
          background:hovered?"linear-gradient(to bottom,#7C3AED,#C4B5FD)":"#E2E8F0",
          borderRadius:2, transition:"background 0.2s",
        }}/>
      </div>

      {/* Photo */}
      <div style={{
        flex:"0 0 220px", position:"relative", overflow:"hidden",
        background:"#F1F5F9",
      }} className="org-photo">
        <img src={org.photo} alt={org.role}
          style={{
            width:"100%", height:"100%", objectFit:"cover", display:"block",
            transform:hovered?"scale(1.04)":"scale(1)",
            transition:"transform 0.6s cubic-bezier(.22,1,.36,1)",
          }}
          onError={(e)=>{
            e.target.style.display="none";
            document.getElementById(`ph-${index}`).style.display="flex";
          }}
        />
        <div id={`ph-${index}`} style={{
          display:"none", position:"absolute", inset:0,
          alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8,
          background:"#F1F5F9",
        }}>
          <div style={{
            width:52,height:52,borderRadius:12,
            background:"#EDE9FE",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
          }}>🏛️</div>
          <span style={{fontSize:10,color:"#94A3B8",letterSpacing:"1px",fontFamily:"'JetBrains Mono',monospace"}}>/org{index+1}.jpg</span>
        </div>
        {/* Period pill */}
        <div style={{
          position:"absolute", bottom:12, left:12,
          fontSize:10.5, color:"#F8FAFC",
          background:"rgba(15,23,42,0.8)",
          backdropFilter:"blur(8px)",
          border:"1px solid rgba(255,255,255,0.1)",
          padding:"4px 12px", borderRadius:100,
          fontFamily:"'JetBrains Mono',monospace",
          fontWeight:500,
        }}>{org.period}</div>
      </div>

      {/* Content */}
      <div style={{
        flex:1, padding:"28px 32px",
        display:"flex", flexDirection:"column", justifyContent:"center",
      }} className="org-content">
        <div style={{
          fontSize:11, color:"#64748B", fontWeight:500,
          marginBottom:6, fontFamily:"'JetBrains Mono',monospace",
          letterSpacing:"0.3px",
        }}>{org.org}</div>

        <h3 style={{
          fontFamily:"'Syne',sans-serif",
          fontSize:20, fontWeight:800,
          color:"#0F172A", marginBottom:10, lineHeight:1.2,
          letterSpacing:"-0.5px",
        }}>{org.role}</h3>

        <p style={{
          fontSize:13.5, color:"#64748B", lineHeight:1.8, marginBottom:18,
          maxWidth:480, fontFamily:"'Plus Jakarta Sans',sans-serif",
        }}>{org.desc}</p>

        {/* Highlights */}
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
          {org.highlights.map((h)=>(
            <span key={h} style={{
              fontSize:11, color:"#7C3AED",
              background:"#EDE9FE",
              border:"1px solid #DDD6FE",
              padding:"4px 12px", borderRadius:100,
              fontWeight:600,
              fontFamily:"'JetBrains Mono',monospace",
            }}>{h}</span>
          ))}
        </div>

        {/* Instagram CTA */}
        <a href={org.instagram} target="_blank" rel="noreferrer" style={{
          display:"inline-flex", alignItems:"center", gap:8,
          fontSize:12, fontWeight:600,
          color:hovered?"#0F172A":"#475569",
          textDecoration:"none",
          padding:"8px 16px", borderRadius:8,
          background:hovered?"#F8FAFC":"transparent",
          border:`1.5px solid ${hovered?"#CBD5E1":"#E2E8F0"}`,
          transition:"all 0.2s",
          width:"fit-content",
          fontFamily:"'Plus Jakarta Sans',sans-serif",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{color:"#E1306C"}}>
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
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.05});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="organizations" ref={ref} style={{background:"#FFFFFF",borderTop:"1px solid #F1F5F9"}}>
      <div style={{
        fontSize:11,fontWeight:700,letterSpacing:"2.5px",
        textTransform:"uppercase",color:"#7C3AED",marginBottom:10,
        fontFamily:"'JetBrains Mono',monospace",
        opacity:visible?1:0,transition:"opacity .5s",
        display:"flex",alignItems:"center",gap:8,
      }}>
        <span style={{width:18,height:1.5,background:"#7C3AED",display:"inline-block"}}/>
        organizations
      </div>
      <h2 style={{
        fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,4vw,44px)",
        fontWeight:800,color:"#0F172A",marginBottom:48,
        letterSpacing:"-1.5px",lineHeight:1.1,
        opacity:visible?1:0,transform:visible?"none":"translateY(16px)",
        transition:"opacity .6s ease .1s,transform .6s ease .1s",
      }}>Organisational Journey</h2>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {data.organizations.map((org,i)=>(
          <OrgRow key={org.role} org={org} index={i} visible={visible}/>
        ))}
      </div>
      <style>{`
        @media (max-width:900px){
          .org-photo{ flex: 0 0 160px !important; }
          .org-content{ padding: 20px 20px !important; }
        }
        @media (max-width:640px){
          .org-row{ flex-direction: column !important; }
          .org-row > div:first-child{ width:100% !important; flex-direction:row !important; height:48px; border-right:none !important; border-bottom:1px solid #F1F5F9; }
          .org-photo{ flex: 0 0 180px !important; }
        }
      `}</style>
    </section>
  );
};

export default Organizations;
