import { data } from "../data/portfolioData";
import { useEffect, useState } from "react";

const CodeLine = ({ lineNum, text }) => {
  const tokens = [];
  let s = text;

  while (s.length > 0) {
    const kwMatch = s.match(/^(const|true|false)\b/);
    if (kwMatch) {
      tokens.push({ t: kwMatch[0], c: "#A78BFA", w: "600" });
      s = s.slice(kwMatch[0].length);
      continue;
    }
    const keyMatch = s.match(/^(name|role|stack|available)(?=:)/);
    if (keyMatch) {
      tokens.push({ t: keyMatch[0], c: "#38BDF8", w: "500" });
      s = s.slice(keyMatch[0].length);
      continue;
    }
    if (s[0] === '"') {
      const end = s.indexOf('"', 1);
      if (end !== -1) {
        tokens.push({ t: s.slice(0, end + 1), c: "#34D399", w: "400" });
        s = s.slice(end + 1);
        continue;
      }
    }
    if (/^[{}\[\]:,;=]/.test(s)) {
      tokens.push({ t: s[0], c: "#64748B", w: "400" });
      s = s.slice(1);
      continue;
    }
    const wordMatch = s.match(/^\w+/);
    if (wordMatch) {
      tokens.push({ t: wordMatch[0], c: "#E2E8F0", w: "400" });
      s = s.slice(wordMatch[0].length);
      continue;
    }
    tokens.push({ t: s[0], c: "#94A3B8", w: "400" });
    s = s.slice(1);
  }

  return (
    <div style={{ display:"flex", alignItems:"baseline", lineHeight:1.9, fontFamily:"'JetBrains Mono','Fira Code',monospace" }}>
      <span style={{
        color:"#334155", marginRight:20, userSelect:"none",
        fontSize:11, minWidth:16, textAlign:"right", flexShrink:0,
      }}>{String(lineNum).padStart(2,"0")}</span>
      <span style={{ fontSize:13 }}>
        {tokens.map((tok, i) => (
          <span key={i} style={{ color:tok.c, fontWeight:tok.w }}>{tok.t}</span>
        ))}
      </span>
    </div>
  );
};

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
    }, 26);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const c = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(c);
  }, []);

  const lines = typed.split("\n");

  return (
    <section id="hero" style={{
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      background:"#F8FAFC",
      position:"relative",
      overflow:"hidden",
      padding:0,
      maxWidth:"none",
    }}>
      {/* Grid bg */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(#E2E8F0 1px,transparent 1px),linear-gradient(90deg,#E2E8F0 1px,transparent 1px)",
        backgroundSize:"40px 40px", opacity:0.5,
      }}/>
      {/* Top accent */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(to right,#7C3AED,#0EA5E9,#059669)",zIndex:2}}/>

      {/* Inner content wrapper */}
      <div style={{
        maxWidth:1140,
        margin:"0 auto",
        padding:"100px 48px 72px",
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:56,
        alignItems:"center",
        width:"100%",
        position:"relative",
        zIndex:1,
      }} className="hero-grid">

        {/* LEFT */}
        <div style={{ minWidth:0 }}>
          {/* Status badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"#F0FDF4", border:"1px solid #86EFAC",
            padding:"5px 14px", borderRadius:100,
            fontSize:11, fontWeight:600, color:"#16A34A",
            letterSpacing:"0.5px", marginBottom:24,
            fontFamily:"'JetBrains Mono',monospace",
          }}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#22C55E",animation:"pulse-dot 2s infinite",display:"inline-block",flexShrink:0}}/>
            available_for_work: true
          </div>

          <h1 style={{
            fontFamily:"'Syne',sans-serif",
            fontSize:"clamp(36px,4.5vw,62px)",
            fontWeight:800, lineHeight:1.0,
            marginBottom:16, letterSpacing:"-2px", color:"#0F172A",
          }}>
            Berlin<br/>
            <span style={{
              background:"linear-gradient(135deg,#7C3AED,#0EA5E9)",
              WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent",
            }}>Sugiyanto</span>
          </h1>

          <div style={{ marginBottom:14 }}>
            <span style={{
              display:"inline-block",
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:12.5, fontWeight:600, color:"#475569",
              background:"#F1F5F9", border:"1px solid #E2E8F0",
              padding:"4px 12px", borderRadius:6,
            }}>// {data.title}</span>
          </div>

          <p style={{
            fontSize:14.5, color:"#64748B", maxWidth:400, lineHeight:1.85,
            marginBottom:28,
            fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
          }}>{data.tagline}</p>

          {/* Buttons */}
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:32}} className="hero-btns">
            <a href={data.github} target="_blank" rel="noreferrer" style={{
              display:"inline-flex",alignItems:"center",gap:7,
              padding:"10px 20px",borderRadius:8,
              background:"#0F172A",color:"#F8FAFC",
              fontSize:13,fontWeight:600,textDecoration:"none",
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              transition:"all 0.2s",
              boxShadow:"0 2px 8px rgba(15,23,42,0.15)",
            }}
              onMouseEnter={(e)=>{e.currentTarget.style.background="#1E293B";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={(e)=>{e.currentTarget.style.background="#0F172A";e.currentTarget.style.transform="none";}}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <button onClick={()=>scrollTo("contact")} style={{
              display:"inline-flex",alignItems:"center",gap:7,
              padding:"10px 20px",borderRadius:8,
              background:"transparent",color:"#0F172A",
              fontSize:13,fontWeight:600,cursor:"pointer",
              border:"1.5px solid #CBD5E1",
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              transition:"all 0.2s",
            }}
              onMouseEnter={(e)=>{e.currentTarget.style.borderColor="#0F172A";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={(e)=>{e.currentTarget.style.borderColor="#CBD5E1";e.currentTarget.style.transform="none";}}
            >Get in Touch</button>
            <a href="/cv.pdf" download="Berlin_Sugiyanto_CV.pdf" style={{
              display:"inline-flex",alignItems:"center",gap:7,
              padding:"10px 20px",borderRadius:8,
              background:"#F0FDF4",color:"#16A34A",
              fontSize:13,fontWeight:600,textDecoration:"none",
              border:"1.5px solid #86EFAC",
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              transition:"all 0.2s",
            }}
              onMouseEnter={(e)=>{e.currentTarget.style.background="#DCFCE7";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={(e)=>{e.currentTarget.style.background="#F0FDF4";e.currentTarget.style.transform="none";}}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              CV
            </a>
          </div>

          {/* Stats — tight, right below buttons */}
          <div style={{
            display:"flex", gap:0,
            paddingTop:20, borderTop:"1px solid #E2E8F0",
          }} className="hero-stats-row">
            {[["3.63","GPA / 4.00"],["3+","Projects"],["3yr","Org Exp"]].map(([n,l],i)=>(
              <div key={l} style={{
                flex:1, textAlign:"center",
                borderRight:i<2?"1px solid #E2E8F0":"none",
                padding:"0 14px",
              }}>
                <div style={{
                  fontFamily:"'Syne',sans-serif", fontSize:26,
                  fontWeight:800, color:"#0F172A", lineHeight:1, letterSpacing:"-1px",
                }}>{n}</div>
                <div style={{
                  fontSize:9.5, color:"#94A3B8", letterSpacing:"1.2px",
                  textTransform:"uppercase", marginTop:5,
                  fontFamily:"'JetBrains Mono',monospace",
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — terminal, constrained size */}
        <div style={{ position:"relative", minWidth:0 }} className="hero-terminal-wrap">
          {/* Stack badges — inside the column, not absolute outside */}
          <div style={{
            display:"flex", gap:6, marginBottom:12, justifyContent:"flex-end",
          }} className="hero-badges">
            {[
              {label:"PHP 8", color:"#7C3AED", bg:"#F5F3FF"},
              {label:"MySQL", color:"#0284C7", bg:"#F0F9FF"},
              {label:"Laravel", color:"#DC2626", bg:"#FEF2F2"},
            ].map(({label,color,bg})=>(
              <div key={label} style={{
                background:bg, border:`1px solid ${color}30`,
                borderRadius:7, padding:"4px 11px",
                fontSize:11, fontWeight:700, color,
                fontFamily:"'JetBrains Mono',monospace",
                boxShadow:"0 1px 4px rgba(0,0,0,0.05)",
              }}>{label}</div>
            ))}
          </div>

          {/* Terminal window */}
          <div style={{
            background:"#0F172A",
            borderRadius:12,
            overflow:"hidden",
            boxShadow:"0 20px 50px rgba(15,23,42,0.16),0 6px 20px rgba(15,23,42,0.08)",
            border:"1px solid #1E293B",
          }}>
            {/* Title bar */}
            <div style={{
              display:"flex",alignItems:"center",gap:7,
              padding:"11px 16px",
              background:"#1E293B",
              borderBottom:"1px solid #334155",
            }}>
              <span style={{width:10,height:10,borderRadius:"50%",background:"#EF4444",flexShrink:0}}/>
              <span style={{width:10,height:10,borderRadius:"50%",background:"#F59E0B",flexShrink:0}}/>
              <span style={{width:10,height:10,borderRadius:"50%",background:"#22C55E",flexShrink:0}}/>
              <span style={{
                marginLeft:10, fontSize:11, color:"#64748B",
                fontFamily:"'JetBrains Mono',monospace",
                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
              }}>~/portfolio/src/developer.ts</span>
            </div>

            {/* Code */}
            <div style={{ padding:"20px 20px 22px" }}>
              {lines.map((line, i) => (
                <div key={i} style={{display:"flex",alignItems:"baseline"}}>
                  <CodeLine lineNum={i+1} text={line}/>
                  {i === lines.length - 1 && (
                    <span style={{
                      display:"inline-block", width:7, height:"0.85em",
                      background:showCursor?"#7C3AED":"transparent",
                      marginLeft:1, verticalAlign:"text-bottom",
                      flexShrink:0,
                    }}/>
                  )}
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"7px 16px", background:"#7C3AED",
            }}>
              <span style={{fontSize:10.5,color:"rgba(255,255,255,0.9)",fontFamily:"'JetBrains Mono',monospace"}}>NORMAL</span>
              <span style={{fontSize:10.5,color:"rgba(255,255,255,0.65)",fontFamily:"'JetBrains Mono',monospace"}}>TypeScript · UTF-8</span>
              <span style={{fontSize:10.5,color:"rgba(255,255,255,0.65)",fontFamily:"'JetBrains Mono',monospace"}}>
                Ln {lines.length}, Col {lines[lines.length-1]?.length ?? 0}
              </span>
            </div>
          </div>

          {/* Location badge — below terminal */}
          <div style={{
            marginTop:12,
            background:"#FFFFFF", border:"1px solid #E2E8F0",
            borderRadius:10, padding:"10px 16px",
            display:"inline-flex", alignItems:"center", gap:10,
            boxShadow:"0 2px 10px rgba(15,23,42,0.06)",
          }}>
            <span style={{fontSize:15}}>📍</span>
            <div>
              <div style={{fontSize:10,color:"#94A3B8",fontFamily:"'JetBrains Mono',monospace",marginBottom:1}}>location</div>
              <div style={{fontSize:12,fontWeight:600,color:"#0F172A",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{data.location}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot{
          0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)}
          70%{box-shadow:0 0 0 8px rgba(34,197,94,0)}
        }
        @media (max-width:960px){
          .hero-grid{
            grid-template-columns:1fr !important;
            gap:36px !important;
            padding:80px 32px 56px !important;
          }
          .hero-terminal-wrap{ width:100%; }
        }
        @media (max-width:600px){
          .hero-grid{ padding:72px 20px 48px !important; }
          .hero-btns{ flex-direction:column; }
          .hero-btns a,.hero-btns button{ justify-content:center; text-align:center; }
          .hero-stats-row > div{ padding:0 8px !important; }
          .hero-badges{ flex-wrap:wrap; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
