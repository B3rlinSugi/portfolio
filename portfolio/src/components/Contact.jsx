import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const contactItems = [
  { label:"WhatsApp", value:"+62 812-9450-0613", href:"https://wa.me/6281294500613?text=Hi%20Berlin%2C%20I%20found%20your%20portfolio%20and%20I'm%20interested%20to%20connect!", desc:"Ping me directly", color:"#34D399", border:"rgba(52,211,153,0.3)", bg:"rgba(52,211,153,0.07)",
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { label:"Email", value:"berlinsugiyanto23@gmail.com", href:"mailto:berlinsugiyanto23@gmail.com", desc:"Fastest way to reach me", color:"#FCD34D", border:"rgba(252,211,77,0.3)", bg:"rgba(252,211,77,0.07)",
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/></svg> },
  { label:"LinkedIn", value:"linkedin.com/in/berlinsugi", href:"https://linkedin.com/in/berlinsugi", desc:"Let's connect professionally", color:"#38BDF8", border:"rgba(56,189,248,0.3)", bg:"rgba(56,189,248,0.07)",
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label:"GitHub", value:"github.com/B3rlinSugi", href:"https://github.com/B3rlinSugi", desc:"Browse my repositories", color:"#C8D8F0", border:"rgba(200,216,240,0.2)", bg:"rgba(200,216,240,0.04)",
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> },
];

const ContactCard3D = ({ item, index, visible }) => {
  const cardRef=useRef(null), rafRef=useRef(null);
  const [tilt,setTilt]=useState({rx:0,ry:0,gx:50,gy:50});
  const [hovered,setHovered]=useState(false);

  const onMove=e=>{
    const el=cardRef.current; if(!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current=requestAnimationFrame(()=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      setTilt({rx:(y-0.5)*-12,ry:(x-0.5)*12,gx:Math.round(x*100),gy:Math.round(y*100)});
    });
  };
  const onLeave=()=>{ cancelAnimationFrame(rafRef.current); setHovered(false); setTilt({rx:0,ry:0,gx:50,gy:50}); };

  return (
    <div ref={cardRef}
      onMouseEnter={()=>setHovered(true)} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        perspective:"600px",
        opacity:visible?1:0,
        transform:visible?"translateX(0)":"translateX(-24px)",
        transition:`opacity .55s ease ${100+index*110}ms,transform .55s cubic-bezier(.22,1,.36,1) ${100+index*110}ms`,
      }}
    >
      <a href={item.href} target={item.href.startsWith("mailto")?undefined:"_blank"} rel="noreferrer"
        style={{
          display:"flex",alignItems:"center",gap:14,
          padding:"16px 18px",borderRadius:14,
          background:hovered?item.bg:"rgba(15,31,56,0.5)",
          border:`1px solid ${hovered?item.border:"rgba(59,130,246,0.1)"}`,
          textDecoration:"none",cursor:"pointer",
          transform:hovered
            ?`perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.03) translateZ(6px)`
            :"perspective(600px) rotateX(0) rotateY(0) scale(1)",
          transition:hovered?"transform 0.08s linear,box-shadow 0.2s,background 0.2s,border-color 0.2s":"transform 0.5s cubic-bezier(.22,1,.36,1),box-shadow 0.35s,background 0.25s,border-color 0.25s",
          boxShadow:hovered?`0 16px 40px rgba(0,0,0,0.3),0 0 0 1px ${item.color}20,inset 0 1px 0 rgba(255,255,255,0.04)`:"0 2px 8px rgba(0,0,0,0.15)",
          willChange:"transform",
          position:"relative",overflow:"hidden",
        }}
      >
        {/* Shine */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",borderRadius:14,
          background:hovered?`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%,rgba(255,255,255,0.06),transparent 55%)`:"transparent",
          transition:"background 0.1s",
        }}/>

        <div style={{
          width:44,height:44,borderRadius:12,flexShrink:0,
          background:hovered?item.bg:"rgba(15,31,56,0.8)",
          border:`1px solid ${hovered?item.border:"rgba(59,130,246,0.1)"}`,
          display:"flex",alignItems:"center",justifyContent:"center",
          color:item.color,transition:"all 0.2s",
          transform:hovered?`rotateY(${tilt.ry*0.4}deg) scale(1.1)`:"none",
          zIndex:1,
        }}>{item.icon}</div>

        <div style={{flex:1,minWidth:0,zIndex:1}}>
          <div style={{fontSize:9.5,color:"var(--muted)",letterSpacing:"2px",textTransform:"uppercase",fontWeight:600,marginBottom:2,fontFamily:"'JetBrains Mono',monospace"}}>{item.label}</div>
          <div style={{fontSize:13,color:hovered?"var(--white)":"var(--white-2)",fontWeight:500,transition:"color .2s",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:"'Outfit',sans-serif"}}>{item.value}</div>
          <div style={{fontSize:11,color:"var(--muted)",marginTop:1,fontFamily:"'Outfit',sans-serif"}}>{item.desc}</div>
        </div>

        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{color:item.color,opacity:hovered?1:0,transform:hovered?"translateX(0)":"translateX(-8px)",transition:"all .25s",flexShrink:0,zIndex:1}}>
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </a>
    </div>
  );
};

/* 3D availability card */
const AvailCard = ({ visible }) => {
  const cardRef=useRef(null), rafRef=useRef(null);
  const [tilt,setTilt]=useState({rx:0,ry:0,gx:50,gy:50});
  const [hovered,setHovered]=useState(false);

  const onMove=e=>{
    const el=cardRef.current; if(!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current=requestAnimationFrame(()=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      setTilt({rx:(y-0.5)*-8,ry:(x-0.5)*8,gx:Math.round(x*100),gy:Math.round(y*100)});
    });
  };
  const onLeave=()=>{ cancelAnimationFrame(rafRef.current); setHovered(false); setTilt({rx:0,ry:0,gx:50,gy:50}); };

  return (
    <div ref={cardRef} onMouseEnter={()=>setHovered(true)} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        perspective:"800px",
        opacity:visible?1:0,
        transform:visible?"translateY(0)":"translateY(24px)",
        transition:"opacity .7s ease .4s,transform .7s cubic-bezier(.22,1,.36,1) .4s",
      }}
    >
      <div style={{
        background:"rgba(15,31,56,0.6)",
        border:"1px solid rgba(59,130,246,0.18)",
        borderRadius:20,padding:"28px 24px",
        position:"relative",overflow:"hidden",
        transform:hovered
          ?`perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.02) translateZ(8px)`
          :"perspective(800px) rotateX(0) rotateY(0) scale(1)",
        transition:hovered?"transform 0.1s linear,box-shadow 0.2s":"transform 0.55s cubic-bezier(.22,1,.36,1),box-shadow 0.4s",
        boxShadow:hovered?"0 40px 80px rgba(0,0,0,0.4),0 0 0 1px rgba(59,130,246,0.2),inset 0 1px 0 rgba(255,255,255,0.05)":"0 12px 48px rgba(0,0,0,0.3)",
        willChange:"transform",
      }}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(to right,#1D4ED8,#06B6D4)"}}/>
        <div style={{position:"absolute",top:"-40%",right:"-20%",width:"65%",height:"65%",background:"radial-gradient(circle,rgba(29,78,216,0.1),transparent 65%)",pointerEvents:"none"}}/>

        {/* Shine */}
        <div style={{
          position:"absolute",inset:0,borderRadius:20,pointerEvents:"none",
          background:hovered?`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%,rgba(255,255,255,0.06),transparent 55%)`:"transparent",
          transition:"background 0.1s",
        }}/>

        <div style={{position:"relative",zIndex:1}}>
          <div style={{
            background:"rgba(6,14,30,0.6)",border:"1px solid rgba(59,130,246,0.12)",
            borderRadius:9,padding:"10px 14px",marginBottom:20,
            fontFamily:"'JetBrains Mono',monospace",
          }}>
            <div style={{fontSize:10,color:"var(--muted)",marginBottom:4}}>$ status --check</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 8px rgba(16,185,129,0.5)",animation:"pulse-dot 2s infinite",flexShrink:0}}/>
              <span style={{fontSize:11.5,color:"#34D399",fontWeight:600}}>open_to_opportunities: true</span>
            </div>
          </div>

          <h3 style={{fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:800,color:"var(--white)",marginBottom:10,lineHeight:1.2,letterSpacing:"-0.5px"}}>
            Ready to contribute<br/>
            <span style={{color:"var(--cyan)"}}>from day one</span>
          </h3>

          <p style={{fontSize:13.5,color:"#6B84A8",lineHeight:1.8,marginBottom:20,fontFamily:"'Outfit',sans-serif"}}>
            Based in <span style={{color:"var(--white-2)",fontWeight:600}}>Bekasi, West Java</span>.<br/>
            On-site (Jabodetabek) · Remote worldwide.
          </p>

          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:24}}>
            {["Full-time","Contract","Remote","Hybrid"].map(t=>(
              <span key={t} style={{
                fontSize:11.5,color:"var(--cyan)",background:"rgba(6,182,212,0.07)",
                border:"1px solid rgba(6,182,212,0.22)",padding:"5px 14px",borderRadius:100,
                fontWeight:600,fontFamily:"'JetBrains Mono',monospace",
              }}>{t}</span>
            ))}
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <a href={"mailto:"+data.email} className="btn-primary" style={{textAlign:"center",justifyContent:"center"}}>Send Email ✉</a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="btn-outline" style={{textAlign:"center",justifyContent:"center"}}>Connect on LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.06});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="contact" ref={ref} style={{background:"var(--navy)",borderTop:"1px solid rgba(59,130,246,0.07)",paddingBottom:80}}>
      <p className="s-label" style={{opacity:visible?1:0,transition:"opacity .5s"}}>contact</p>
      <h2 className="s-title" style={{opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Let's work together</h2>
      <div style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:32,alignItems:"start"}} className="contact-grid">
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <p style={{fontSize:15,color:"#6B84A8",lineHeight:1.9,marginBottom:16,maxWidth:420,fontFamily:"'Outfit',sans-serif",opacity:visible?1:0,transform:visible?"none":"translateY(10px)",transition:"opacity .6s ease .15s,transform .6s ease .15s"}}>
            Actively seeking <span style={{color:"var(--blue-3)",fontWeight:700}}>Junior Backend Developer</span> roles. Open to full-time, contract, and remote work.
          </p>
          {contactItems.map((item,i)=><ContactCard3D key={item.label} item={item} index={i} visible={visible}/>)}
        </div>
        <AvailCard visible={visible}/>
      </div>
      <div style={{marginTop:64,paddingTop:24,borderTop:"1px solid rgba(59,130,246,0.07)",fontSize:11.5,color:"var(--muted)",textAlign:"center",fontFamily:"'JetBrains Mono',monospace"}}>
        built with <span style={{color:"var(--blue-3)",fontWeight:700}}>React</span> by Berlin Sugiyanto Hutajulu · 2026
      </div>
      <style>{`
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)}70%{box-shadow:0 0 0 9px rgba(16,185,129,0)}}
        @media(max-width:900px){.contact-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </section>
  );
};

export default Contact;
