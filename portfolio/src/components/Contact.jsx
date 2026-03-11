import { useEffect, useRef, useState } from "react";
import { data } from "../data/portfolioData";

const contactItems = [
  { label:"Email", value:"berlinsugiyanto23@gmail.com", href:"mailto:berlinsugiyanto23@gmail.com",
    desc:"Fastest way to reach me", color:"#F59E0B",
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/></svg> },
  { label:"LinkedIn", value:"linkedin.com/in/berlinsugi", href:"https://linkedin.com/in/berlinsugi",
    desc:"Let's connect professionally", color:"#60A5FA",
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label:"GitHub", value:"github.com/B3rlinSugi", href:"https://github.com/B3rlinSugi",
    desc:"Browse my repositories", color:"#A78BFA",
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> },
];

const ContactItem = ({ item, index, visible }) => {
  const [hovered,setHovered] = useState(false);
  return (
    <a href={item.href} target={item.href.startsWith("mailto")?undefined:"_blank"} rel="noreferrer"
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        display:"flex",alignItems:"center",gap:16,
        padding:"18px 22px",borderRadius:14,
        background:hovered?`${item.color}12`:"#242336",
        border:`1px solid ${hovered?item.color+"40":"rgba(147,51,234,0.12)"}`,
        textDecoration:"none",cursor:"pointer",
        position:"relative",overflow:"hidden",
        opacity:visible?1:0,
        transform:visible?"translateX(0)":"translateX(-28px)",
        transition:`opacity .6s ease ${150+index*120}ms,transform .6s cubic-bezier(.22,1,.36,1) ${150+index*120}ms,background .25s,border-color .25s,box-shadow .25s`,
        boxShadow:hovered?`0 12px 36px ${item.color}18`:"none",
      }}
    >
      <div style={{
        width:46,height:46,borderRadius:12,
        background:hovered?`${item.color}16`:"rgba(147,51,234,0.06)",
        border:`1.5px solid ${hovered?item.color+"40":"rgba(147,51,234,0.12)"}`,
        display:"flex",alignItems:"center",justifyContent:"center",
        flexShrink:0,color:hovered?item.color:"#6D5FA0",
        transition:"all 0.25s",
        transform:hovered?"scale(1.08) rotate(-5deg)":"none",
      }}>{item.icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:10,color:"#9B97C0",letterSpacing:"2px",textTransform:"uppercase",fontWeight:600,marginBottom:3,fontFamily:"'Inter',sans-serif"}}>{item.label}</div>
        <div style={{fontSize:13.5,color:hovered?"#F8F7FF":"#D8D4F0",fontWeight:500,transition:"color .2s",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.value}</div>
        <div style={{fontSize:11.5,color:"#8B87A8",marginTop:2}}>{item.desc}</div>
      </div>
      <div style={{fontSize:16,color:"#8B87A8",opacity:hovered?1:0,transform:hovered?"translateX(0)":"translateX(-8px)",transition:"all .25s",flexShrink:0}}>→</div>
    </a>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const [visible,setVisible] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section id="contact" ref={ref} style={{paddingBottom:120}}>
      <p className="section-label" style={{opacity:visible?1:0,transition:"opacity .5s"}}>Contact</p>
      <h2 className="section-title" style={{opacity:visible?1:0,transform:visible?"none":"translateY(16px)",transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>Let's work together</h2>
      <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:28,alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <p style={{fontSize:15.5,color:"#B8B4D4",lineHeight:1.9,marginBottom:20,maxWidth:420,opacity:visible?1:0,transform:visible?"none":"translateY(12px)",transition:"opacity .6s ease .15s,transform .6s ease .15s"}}>
            I'm actively seeking <span style={{color:"#A855F7",fontWeight:700}}>Junior Backend Developer</span> roles. Open to full-time, contract, and remote work.
          </p>
          {contactItems.map((item,i)=><ContactItem key={item.label} item={item} index={i} visible={visible}/>)}
        </div>
        <div style={{
          background:"linear-gradient(135deg,#242336,#2D2B44)",
          border:"1px solid rgba(147,51,234,0.2)",
          borderRadius:20,padding:"32px 28px",
          position:"relative",overflow:"hidden",
          opacity:visible?1:0,
          transform:visible?"translateY(0) scale(1)":"translateY(32px) scale(0.95)",
          transition:"opacity .75s ease .4s,transform .75s cubic-bezier(.22,1,.36,1) .4s",
        }}>
          <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,background:"radial-gradient(circle,rgba(147,51,234,0.1),transparent 65%)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:-40,left:-40,width:160,height:160,background:"radial-gradient(circle,rgba(236,72,153,0.07),transparent 65%)",pointerEvents:"none"}}/>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:22}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 12px rgba(16,185,129,0.6)",animation:"pulse-dot 2s infinite"}}/>
            <span style={{fontSize:13,color:"#34D399",fontWeight:600}}>Open to Opportunities</span>
          </div>
          <h3 style={{fontFamily:"'Inter',sans-serif",fontSize:24,fontWeight:800,color:"#F8F7FF",marginBottom:12,lineHeight:1.25,letterSpacing:"-0.5px"}}>
            Ready to contribute<br/>
            <span style={{background:"linear-gradient(135deg,#C084FC,#EC4899)",WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent"}}>from day one</span>
          </h3>
          <p style={{fontSize:13.5,color:"#B8B4D4",lineHeight:1.85,marginBottom:22}}>
            Based in <span style={{color:"#D8D4F0"}}>Bekasi, West Java</span>.<br/>Available on-site (Jabodetabek) and remote worldwide.
          </p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:26}}>
            {["Full-time","Contract","Remote","Hybrid"].map((t)=>(
              <span key={t} style={{fontSize:11,color:"#A855F7",background:"rgba(147,51,234,0.1)",border:"1px solid rgba(147,51,234,0.22)",padding:"4px 12px",borderRadius:100,fontWeight:600}}>{t}</span>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <a href={"mailto:"+data.email} className="btn-primary" style={{textAlign:"center"}}>Send Email ✉</a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="btn-outline" style={{textAlign:"center"}}>Connect on LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={{marginTop:80,paddingTop:24,borderTop:"1px solid rgba(147,51,234,0.07)",fontSize:12,color:"#6B6890",textAlign:"center"}}>
        Built with <span style={{background:"linear-gradient(135deg,#9333EA,#EC4899)",WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent",fontWeight:700}}>React</span> by Berlin Sugiyanto Hutajulu — 2026
      </div>
      <style>{`@keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.6)}70%{box-shadow:0 0 0 10px rgba(16,185,129,0)}}`}</style>
    </section>
  );
};

export default Contact;
