import { data } from "../data/portfolioData";
import { useEffect, useState } from "react";

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = `const developer = {\n  name: "Berlin Sugiyanto",\n  role: "Backend Developer",\n  stack: ["PHP","Java","MySQL"],\n  available: true\n};`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) { setTyped(fullText.slice(0, i)); i++; }
      else clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const c = setInterval(() => setShowCursor(p=>!p), 530);
    return () => clearInterval(c);
  }, []);

  const formatCode = (text) => {
    return text.split("\n").map((line, i) => {
      let formatted = line
        .replace(/(const|true|false)/g, '<span style="color:#7C3AED;font-weight:600">$1</span>')
        .replace(/(".*?")/g, '<span style="color:#059669">$1</span>')
        .replace(/(\[.*?\])/g, (m) => m.replace(/(".*?")/g, '<span style="color:#059669">$1</span>'))
        .replace(/(name|role|stack|available):/g, '<span style="color:#0EA5E9">$1</span>:');
      return `<span style="color:#94A3B8;margin-right:16px;user-select:none;font-size:11px">${String(i+1).padStart(2,"0")}</span>${formatted}`;
    }).join("\n");
  };

  return (
    <section id="hero" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      background:"#F8FAFC",
      position:"relative",
      padding:"80px 0 0",
      overflow:"hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(#E2E8F0 1px,transparent 1px),linear-gradient(90deg,#E2E8F0 1px,transparent 1px)",
        backgroundSize:"40px 40px",
        opacity:0.5,
      }}/>
      {/* Top accent bar */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:3,
        background:"linear-gradient(to right,#7C3AED,#0EA5E9,#059669)",
      }}/>

      <div style={{
        maxWidth:1200, margin:"0 auto", padding:"0 48px",
        display:"grid", gridTemplateColumns:"1fr 1fr",
        gap:80, alignItems:"center", width:"100%", position:"relative", zIndex:1,
      }} className="hero-grid">

        {/* LEFT */}
        <div>
          {/* Status badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"#F0FDF4", border:"1px solid #86EFAC",
            padding:"5px 14px", borderRadius:100,
            fontSize:11.5, fontWeight:600, color:"#16A34A",
            letterSpacing:"0.5px", marginBottom:28,
            fontFamily:"'JetBrains Mono',monospace",
          }}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#22C55E",display:"inline-block",animation:"pulse-dot 2s infinite"}}/>
            available_for_work: true
          </div>

          <h1 style={{
            fontFamily:"'Syne','Plus Jakarta Sans',sans-serif",
            fontSize:"clamp(40px,5vw,68px)",
            fontWeight:800, lineHeight:1.05,
            marginBottom:18, letterSpacing:"-2px", color:"#0F172A",
          }}>
            Berlin<br/>
            <span style={{
              background:"linear-gradient(135deg,#7C3AED,#0EA5E9)",
              WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent",
            }}>Sugiyanto</span>
          </h1>

          <div style={{
            display:"flex", alignItems:"center", gap:10, marginBottom:16,
          }}>
            <div style={{
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:13, fontWeight:600, color:"#475569",
              background:"#F1F5F9", border:"1px solid #E2E8F0",
              padding:"4px 12px", borderRadius:6,
            }}>// {data.title}</div>
          </div>

          <p style={{
            fontSize:15, color:"#64748B", maxWidth:440, lineHeight:1.85,
            marginBottom:32, fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
          }}>{data.tagline}</p>

          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:40}} className="hero-btns">
            <a href={data.github} target="_blank" rel="noreferrer" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"11px 22px", borderRadius:8,
              background:"#0F172A", color:"#F8FAFC",
              fontSize:13.5, fontWeight:600, textDecoration:"none",
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              transition:"all 0.2s",
              boxShadow:"0 2px 8px rgba(15,23,42,0.15)",
            }}
              onMouseEnter={(e)=>{e.currentTarget.style.background="#1E293B";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={(e)=>{e.currentTarget.style.background="#0F172A";e.currentTarget.style.transform="none";}}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <button onClick={()=>scrollTo("contact")} style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"11px 22px", borderRadius:8,
              background:"transparent", color:"#0F172A",
              fontSize:13.5, fontWeight:600, cursor:"pointer",
              border:"1.5px solid #CBD5E1",
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              transition:"all 0.2s",
            }}
              onMouseEnter={(e)=>{e.currentTarget.style.borderColor="#0F172A";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={(e)=>{e.currentTarget.style.borderColor="#CBD5E1";e.currentTarget.style.transform="none";}}
            >Get in Touch</button>
            <a href="/cv.pdf" download="Berlin_Sugiyanto_CV.pdf" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"11px 22px", borderRadius:8,
              background:"#F0FDF4", color:"#16A34A",
              fontSize:13.5, fontWeight:600, textDecoration:"none",
              border:"1.5px solid #86EFAC",
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              transition:"all 0.2s",
            }}
              onMouseEnter={(e)=>{e.currentTarget.style.background="#DCFCE7";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={(e)=>{e.currentTarget.style.background="#F0FDF4";e.currentTarget.style.transform="none";}}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              CV
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display:"flex", gap:0, paddingTop:24,
            borderTop:"1px solid #E2E8F0",
          }} className="hero-stats-row">
            {[["3.63","GPA / 4.00"],["3+","Projects"],["3yr","Org Exp"]].map(([n,l],i)=>(
              <div key={l} style={{
                flex:1, textAlign:"center",
                borderRight:i<2?"1px solid #E2E8F0":"none",
                padding:"0 16px",
              }}>
                <div style={{
                  fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800,
                  color:"#0F172A", lineHeight:1, letterSpacing:"-1px",
                }}>{n}</div>
                <div style={{
                  fontSize:10, color:"#94A3B8", letterSpacing:"1.2px",
                  textTransform:"uppercase", marginTop:5,
                  fontFamily:"'JetBrains Mono',monospace",
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — terminal code block */}
        <div style={{ position:"relative" }} className="hero-terminal-wrap">
          {/* Terminal window */}
          <div style={{
            background:"#0F172A",
            borderRadius:14,
            overflow:"hidden",
            boxShadow:"0 24px 60px rgba(15,23,42,0.18),0 8px 24px rgba(15,23,42,0.08)",
            border:"1px solid #1E293B",
          }}>
            {/* Title bar */}
            <div style={{
              display:"flex", alignItems:"center", gap:8,
              padding:"12px 16px",
              background:"#1E293B",
              borderBottom:"1px solid #334155",
            }}>
              <span style={{width:11,height:11,borderRadius:"50%",background:"#EF4444"}}/>
              <span style={{width:11,height:11,borderRadius:"50%",background:"#F59E0B"}}/>
              <span style={{width:11,height:11,borderRadius:"50%",background:"#22C55E"}}/>
              <span style={{
                marginLeft:12, fontSize:11.5, color:"#64748B",
                fontFamily:"'JetBrains Mono',monospace",
              }}>~/portfolio/src/developer.ts</span>
            </div>
            {/* Code area */}
            <div style={{
              padding:"24px 24px 28px",
              fontFamily:"'JetBrains Mono','Fira Code',monospace",
              fontSize:13.5, lineHeight:1.9,
              color:"#E2E8F0",
              minHeight:240,
            }}>
              <pre style={{margin:0,whiteSpace:"pre-wrap",wordBreak:"break-word"}}
                dangerouslySetInnerHTML={{__html: formatCode(typed) + (showCursor ? '<span style="background:#7C3AED;color:transparent">|</span>' : '')}}
              />
            </div>
            {/* Bottom bar */}
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"8px 16px",
              background:"#7C3AED",
            }}>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.85)",fontFamily:"'JetBrains Mono',monospace"}}>NORMAL</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontFamily:"'JetBrains Mono',monospace"}}>TypeScript · UTF-8</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontFamily:"'JetBrains Mono',monospace"}}>Ln {typed.split("\n").length}, Col {typed.split("\n").pop().length}</span>
            </div>
          </div>

          {/* Stack badges floating */}
          <div style={{
            position:"absolute", top:-16, right:-16,
            display:"flex", flexDirection:"column", gap:8,
          }} className="hero-badges">
            {[
              {label:"PHP 8", color:"#7C3AED", bg:"#F5F3FF"},
              {label:"MySQL", color:"#0EA5E9", bg:"#F0F9FF"},
              {label:"Laravel", color:"#EF4444", bg:"#FEF2F2"},
            ].map(({label,color,bg})=>(
              <div key={label} style={{
                background:bg, border:`1px solid ${color}30`,
                borderRadius:8, padding:"5px 12px",
                fontSize:11.5, fontWeight:700, color,
                fontFamily:"'JetBrains Mono',monospace",
                boxShadow:"0 2px 8px rgba(0,0,0,0.06)",
                whiteSpace:"nowrap",
              }}>{label}</div>
            ))}
          </div>

          {/* Location badge */}
          <div style={{
            position:"absolute", bottom:-16, left:0,
            background:"#FFFFFF", border:"1px solid #E2E8F0",
            borderRadius:10, padding:"10px 16px",
            display:"flex", alignItems:"center", gap:8,
            boxShadow:"0 4px 16px rgba(15,23,42,0.08)",
          }} className="hero-location">
            <span style={{fontSize:16}}>📍</span>
            <div>
              <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'JetBrains Mono',monospace"}}>location</div>
              <div style={{fontSize:12.5,fontWeight:600,color:"#0F172A",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{data.location}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)}70%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}
        @media (max-width:900px){
          .hero-grid{ grid-template-columns:1fr !important; gap:40px !important; padding:0 24px !important; }
          .hero-terminal-wrap{ margin-top:20px; }
          .hero-badges{ display:none !important; }
          .hero-location{ position:relative !important; bottom:auto !important; left:auto !important; margin-top:16px; display:inline-flex !important; }
        }
        @media (max-width:480px){
          .hero-btns{ flex-direction:column; }
          .hero-btns a, .hero-btns button{ justify-content:center; }
          .hero-stats-row > div{ padding:0 8px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
