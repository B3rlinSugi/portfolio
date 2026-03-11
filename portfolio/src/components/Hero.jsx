import { data } from "../data/portfolioData";

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <section id="hero" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      position:"relative", maxWidth:1140, margin:"0 auto",
      padding:"120px 48px 80px", overflow:"hidden",
    }}>
      {/* Soft BG blobs */}
      <div style={{position:"absolute",top:"-15%",left:"-8%",width:"55%",height:"70%",
        background:"radial-gradient(ellipse,rgba(147,51,234,0.1) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-5%",right:"-5%",width:"40%",height:"55%",
        background:"radial-gradient(ellipse,rgba(236,72,153,0.07) 0%,transparent 65%)",pointerEvents:"none"}}/>
      {/* Grid */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(147,51,234,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(147,51,234,0.05) 1px,transparent 1px)",
        backgroundSize:"72px 72px",
      }}/>

      <div className="hero-layout" style={{
        display:"flex",alignItems:"center",justifyContent:"space-between",
        gap:80,width:"100%",position:"relative",zIndex:1,
      }}>
        {/* LEFT */}
        <div style={{flex:1}}>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            background:"rgba(16,185,129,0.09)",border:"1px solid rgba(16,185,129,0.28)",
            padding:"5px 15px",borderRadius:100,
            fontSize:11,fontWeight:600,color:"#34D399",
            letterSpacing:"1.5px",textTransform:"uppercase",
            marginBottom:32,width:"fit-content",
          }}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#10B981",
              display:"inline-block",animation:"pulse-dot 2s infinite"}}/>
            Available for Work
          </div>

          <h1 style={{
            fontFamily:"'Inter',sans-serif",
            fontSize:"clamp(50px,6vw,82px)",
            fontWeight:900,lineHeight:0.95,
            marginBottom:22,letterSpacing:"-3.5px",
          }}>
            <span style={{display:"block",color:"#F8F7FF"}}>Berlin</span>
            <span style={{
              display:"block",
              background:"linear-gradient(135deg,#C084FC 0%,#EC4899 55%,#C084FC 100%)",
              backgroundSize:"200% 200%",
              WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent",
              animation:"gradient-x 5s ease infinite",
            }}>Sugiyanto</span>
          </h1>

          <div style={{
            display:"flex",alignItems:"center",gap:12,marginBottom:20,
          }}>
            <div style={{width:40,height:1.5,background:"linear-gradient(to right,#9333EA,transparent)"}}/>
            <p style={{
              fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,
              color:"#C4B5FD",letterSpacing:"2.5px",textTransform:"uppercase",
            }}>{data.title}</p>
          </div>

          <p style={{fontSize:15.5,color:"#B8B4D4",maxWidth:420,lineHeight:1.9,marginBottom:38}}>
            {data.tagline}
          </p>

          <div className="hero-buttons" style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <a href={data.github} target="_blank" rel="noreferrer" className="btn-primary">
              View GitHub →
            </a>
            <button onClick={()=>scrollTo("contact")} className="btn-outline">
              Get in Touch
            </button>
            <a href="/cv.pdf" download="Berlin_Sugiyanto_CV.pdf" style={{
              display:"inline-flex",alignItems:"center",gap:8,
              padding:"12px 22px",borderRadius:10,
              background:"rgba(16,185,129,0.08)",
              border:"1.5px solid rgba(16,185,129,0.35)",
              color:"#34D399",fontSize:14,fontWeight:600,
              textDecoration:"none",transition:"all 0.25s",
              fontFamily:"'Plus Jakarta Sans',sans-serif",
            }}
              onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(16,185,129,0.16)";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(16,185,129,0.2)";}}
              onMouseLeave={(e)=>{e.currentTarget.style.background="rgba(16,185,129,0.08)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{
            display:"flex",gap:0,marginTop:52,
            paddingTop:32,borderTop:"1px solid rgba(147,51,234,0.12)",
          }}>
            {[["3.63","GPA / 4.00"],["3","Projects"],["3yr","Org Exp"]].map(([n,l],i)=>(
              <div key={l} style={{
                flex:1,textAlign:"center",
                borderRight:i<2?"1px solid rgba(147,51,234,0.12)":"none",
                padding:"0 20px",
              }}>
                <div style={{
                  fontFamily:"'Inter',sans-serif",fontSize:30,fontWeight:900,
                  background:"linear-gradient(135deg,#C084FC,#EC4899)",
                  WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent",
                  lineHeight:1,animation:`count-up 0.6s ease ${i*0.15}s both`,
                  letterSpacing:"-1px",
                }}>{n}</div>
                <div style={{
                  fontSize:10,color:"#9B98BC",letterSpacing:"1.5px",
                  textTransform:"uppercase",marginTop:6,
                  fontFamily:"'Inter',sans-serif",fontWeight:600,
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Magnetic 3D + orbiting dots */}
        <div style={{flexShrink:0,position:"relative",width:300,height:300}}>
          {/* Orbit ring */}
          <div style={{
            position:"absolute",inset:-30,borderRadius:"50%",
            border:"1px solid rgba(147,51,234,0.12)",
            pointerEvents:"none",
          }}/>
          {/* 3 orbiting dots */}
          {["orbit","orbit2","orbit3"].map((anim,i)=>(
            <div key={i} style={{
              position:"absolute",top:"50%",left:"50%",
              width:0,height:0,
              animation:`${anim} ${5+i*1.5}s linear infinite`,
              pointerEvents:"none",
            }}>
              <div style={{
                width: i===0?10:i===1?7:5,
                height:i===0?10:i===1?7:5,
                borderRadius:"50%",
                background:i===0?"#9333EA":i===1?"#EC4899":"#C084FC",
                boxShadow:`0 0 ${i===0?14:8}px ${i===0?"#9333EA":i===1?"#EC4899":"#C084FC"}`,
                marginTop:`-${i===0?5:i===1?3.5:2.5}px`,
                marginLeft:`-${i===0?5:i===1?3.5:2.5}px`,
              }}/>
            </div>
          ))}

          {/* Auto breathing 3D — calm, no cursor tracking */}
          <div style={{
            width:"100%",height:"100%",
            animation:"hero-breathe 7s ease-in-out infinite",
            transformStyle:"preserve-3d",
          }}>
            {/* Glow */}
            <div style={{
              position:"absolute",inset:-6,borderRadius:22,
              animation:"card-glow 4s ease-in-out infinite",
              pointerEvents:"none",
            }}/>

            {/* Corner brackets */}
            {[
              {top:-8,left:-8,borderTop:"2.5px solid #9333EA",borderLeft:"2.5px solid #9333EA",borderRadius:"4px 0 0 0"},
              {top:-8,right:-8,borderTop:"2.5px solid #EC4899",borderRight:"2.5px solid #EC4899",borderRadius:"0 4px 0 0"},
              {bottom:-8,left:-8,borderBottom:"2.5px solid #9333EA",borderLeft:"2.5px solid #9333EA",borderRadius:"0 0 0 4px"},
              {bottom:-8,right:-8,borderBottom:"2.5px solid #EC4899",borderRight:"2.5px solid #EC4899",borderRadius:"0 0 4px 0"},
            ].map((s,i)=>(
              <div key={i} style={{position:"absolute",width:22,height:22,pointerEvents:"none",...s}}/>
            ))}

            <div style={{
              width:"100%",height:"100%",borderRadius:20,
              border:"1px solid rgba(147,51,234,0.3)",
              background:"#242336",overflow:"hidden",
            }}>
              <img src="/foto.jpg" alt="Berlin Sugiyanto"
                style={{width:"100%",height:"100%",objectFit:"cover"}}
                onError={(e)=>{
                  e.target.style.display="none";
                  e.target.nextSibling.style.display="flex";
                }}
              />
              <div style={{
                display:"none",flexDirection:"column",alignItems:"center",
                justifyContent:"center",height:"100%",gap:10,
              }}>
                <div style={{
                  width:76,height:76,borderRadius:"50%",
                  background:"rgba(147,51,234,0.12)",
                  border:"2px dashed rgba(147,51,234,0.3)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontFamily:"'Inter',sans-serif",fontWeight:900,
                  fontSize:24,color:"#9333EA",
                }}>BS</div>
                <span style={{fontSize:10,color:"#3E3C5A",letterSpacing:"1.5px",textTransform:"uppercase"}}>
                  foto.jpg → /public
                </span>
              </div>
            </div>

            {/* Scanline */}
            <div style={{position:"absolute",inset:0,borderRadius:20,overflow:"hidden",pointerEvents:"none"}}>
              <div style={{
                position:"absolute",left:0,right:0,height:2,
                background:"linear-gradient(to right,transparent,rgba(147,51,234,0.5),transparent)",
                animation:"scan-line 3.5s linear infinite",
              }}/>
            </div>
          </div>

          {/* Role badge */}
          <div style={{
            position:"absolute",bottom:-22,left:"50%",transform:"translateX(-50%)",
            background:"linear-gradient(135deg,rgba(147,51,234,0.2),rgba(236,72,153,0.12))",
            border:"1px solid rgba(147,51,234,0.3)",
            borderRadius:100,padding:"6px 18px",
            fontSize:11,fontWeight:700,color:"#C084FC",
            whiteSpace:"nowrap",letterSpacing:"0.5px",
            boxShadow:"0 4px 20px rgba(147,51,234,0.2)",
          }}>
            ✦ Backend Developer
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-breathe{
          0%  {transform:translateY(0px)   perspective(900px) rotateX(0deg)  rotateY(0deg)  scale(1)}
          25% {transform:translateY(-10px) perspective(900px) rotateX(3deg)  rotateY(-5deg) scale(1.01)}
          50% {transform:translateY(-16px) perspective(900px) rotateX(0deg)  rotateY(5deg)  scale(1.02)}
          75% {transform:translateY(-8px)  perspective(900px) rotateX(-3deg) rotateY(-3deg) scale(1.01)}
          100%{transform:translateY(0px)   perspective(900px) rotateX(0deg)  rotateY(0deg)  scale(1)}
        }
        @keyframes card-glow{0%,100%{box-shadow:0 0 35px rgba(147,51,234,.25),0 0 70px rgba(147,51,234,.08)}50%{box-shadow:0 0 60px rgba(147,51,234,.5),0 0 120px rgba(236,72,153,.18)}}
        @keyframes orbit{from{transform:rotate(0deg) translateX(155px) rotate(0deg)}to{transform:rotate(360deg) translateX(155px) rotate(-360deg)}}
        @keyframes orbit2{from{transform:rotate(120deg) translateX(155px) rotate(-120deg)}to{transform:rotate(480deg) translateX(155px) rotate(-480deg)}}
        @keyframes orbit3{from{transform:rotate(240deg) translateX(155px) rotate(-240deg)}to{transform:rotate(600deg) translateX(155px) rotate(-600deg)}}
        @keyframes scan-line{0%{top:-4px}100%{top:105%}}
        @keyframes gradient-x{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes count-up{from{opacity:0;transform:translateY(16px) scale(.85)}to{opacity:1;transform:translateY(0) scale(1)}}
      `}</style>
    </section>
  );
};

export default Hero;
