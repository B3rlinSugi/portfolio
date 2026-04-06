"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { data } from "../data/portfolioData";
import { getContactActionLinks } from "../utils/contactActions";

const navDots = [
  {id:"about",         color:"#3B82F6"},
  {id:"skills",        color:"#06B6D4"},
  {id:"projects",      color:"#8B5CF6"},
  {id:"certifications",color:"#10B981"},
  {id:"organizations", color:"#F59E0B"},
  {id:"contact",       color:"#EF4444"},
];

const actionLinks = getContactActionLinks(data);

const socials = [
  {href:actionLinks.github || "https://github.com/B3rlinSugi", title:"GitHub", color:"#C8D8F0", glow:"200,216,240", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>},
  {href:actionLinks.linkedin || "https://linkedin.com/in/berlinsugi", title:"LinkedIn", color:"#0A66C2", glow:"10,102,194", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
  {href:actionLinks.instagram || data.instagram, title:"Instagram", color:"#E1306C", glow:"225,48,108", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.2 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>},
  {href:actionLinks.whatsapp || "https://wa.me/6281294500613", title:"WhatsApp", color:"#25D366", glow:"37,211,102", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>},
  {href:actionLinks.email || "mailto:berlinsugiyanto23@gmail.com", title:"Email", color:"#EA4335", glow:"234,67,53", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/></svg>}
];

function useJKTTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: "Asia/Jakarta", hour12: true, hour: 'numeric', minute: '2-digit' }).replace(' AM', 'AM').replace(' PM', 'PM'));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000); 
    return () => clearInterval(interval);
  }, []);
  return time;
}

const ThemeToggle = ({ theme, setTheme }) => {
  const isDark = theme === "dark";
  return (
    <motion.button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.1, color: "#FFF", background: "rgba(255,255,255,0.1)" }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{ display:"flex", alignItems:"center", justifyContent:"center", width:32, height:32, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)", borderRadius: "100px", color:"#8B9BB4", cursor:"pointer", transition: "all 0.2s" }}
    >
      {isDark ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> 
      : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>}
    </motion.button>
  );
};

// Fitur Baru Tingkat Tinggi: Magnetic Button
// Tombol akan tertarik ke arah kursor saat didekati (seperti kursor cerdas ala iPadOS)
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Faktor 0.3 adalah kekuatan tarikan magnet, semakin kecil semakin subtle
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div 
       ref={ref} 
       onMouseMove={handleMouse} 
       onMouseLeave={reset} 
       animate={{ x: position.x, y: position.y }}
       transition={{ type: "spring", stiffness: 300, damping: 15, mass: 0.5 }}
       style={{ display: "inline-flex", cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
};

export default function Navbar({ lang, setLang, theme, setTheme }) {
  const [active, setActive] = useState("hero");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const jktTime = useJKTTime();

  useEffect(() => {
    document.body.style.paddingLeft = "0";
    document.body.style.overflow = "unset";
    const ids = ["hero", ...navDots.map(l=>l.id)];
    const onScroll = () => {
      for(let i=ids.length-1; i>=0; i--){
        const el = document.getElementById(ids[i]);
        if(el && window.scrollY >= el.offsetTop - 300){ setActive(ids[i]); break; }
      }
    };
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  }, []);

  const go = id => { 
     document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); 
     setMenuOpen(false); 
  };

  return (
    <>
      <div className="hide-on-mobile" style={{ position: "fixed", top: 24, left: 0, right: 0, zIndex: 300, pointerEvents: "none", display: "flex", justifyContent: "center" }}>
         <motion.div 
           initial={{ y: -50, opacity: 0 }} 
           animate={{ y: 0, opacity: 1 }} 
           transition={{ type: "spring", stiffness: 400, damping: 25 }}
           style={{ 
              pointerEvents: "auto", display: "flex", alignItems: "stretch", 
              padding: "6px", borderRadius: "100px", 
              background: "rgba(10,20,40,0.6)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)",
           }}
         >
           {/* 1. BRANDING / LOGO PILL WITH PERMANENT "AVAILABLE FOR WORK" PULSE */}
           <motion.button 
             onClick={()=>go("hero")} whileHover={{ background: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.95 }} 
             aria-label="Scroll to hero section"
             style={{ padding: "0 16px 0 20px", display: "flex", alignItems: "center", borderRadius: "100px", cursor: "pointer", background: "none", border: "none", gap: 8, transition: "background 0.2s", overflow: "hidden", whiteSpace: "nowrap" }}
           >
             <div style={{ position: "relative", width: 8, height: 8, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 2 }}>
                <div style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#10B981", zIndex: 2 }} />
                <motion.div initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 3, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "#10B981", zIndex: 1 }} />
             </div>
             <motion.span layout style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:15, color:"#FFF", letterSpacing:"-0.2px" }}>
               Berlin.
             </motion.span>
             <motion.span layout style={{ fontSize: 11, color: "#10B981", fontFamily: "'Inter', sans-serif", fontWeight: 600, paddingLeft: 4 }}>
                Available for Work
             </motion.span>
           </motion.button>
           
           <div style={{ width:1, background:"rgba(255,255,255,0.1)", margin:"8px 12px", borderRadius:2 }}/>
           
           {/* 2. NAVIGATION LINKS (CENTER ZONE) */}
           <div style={{ display: "flex", alignItems: "center", gap: 2 }} onMouseLeave={()=>setHoveredLink(null)}>
              {navDots.map(link=>{
                const isActive = active === link.id;
                const isHov = hoveredLink === link.id;
                return (
                  <div key={link.id} style={{ position: "relative" }}>
                    {isHov && (
                      <motion.div layoutId="commandHoverInfo" transition={{ type: "spring", stiffness: 400, damping: 30 }} style={{ position: "absolute", inset: 0, borderRadius: 100, background: "rgba(255,255,255,0.08)", zIndex: 0 }} />
                    )}
                    <motion.a href={"#"+link.id} onClick={e=>{e.preventDefault();go(link.id);}} onMouseEnter={()=>setHoveredLink(link.id)} whileTap={{ scale: 0.95 }} style={{ position: "relative", zIndex: 10, display:"flex", alignItems:"center", gap: 8, padding:"10px 16px", borderRadius: "100px", height: "100%", color: isActive ? "#FFF" : isHov ? "#E2E8F0" : "#8B9BB4", textDecoration:"none", fontFamily:"'Inter', sans-serif", fontSize: 13, fontWeight: isActive ? 700 : 500, transition: "color 0.2s" }} >
                      {isActive && <motion.div layoutId="commandActive" style={{ position: "absolute", inset: 0, borderRadius: 100, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}/>}
                      {isActive ? (
                         <span style={{ width: 6, height: 6, borderRadius: "50%", background: link.color, transition: "0.3s" }} />
                      ) : (
                         <span style={{ width: 6, height: 6, borderRadius: "50%", background: "transparent", transition: "0.3s" }} />
                      )}
                      {link.id.charAt(0).toUpperCase() + link.id.slice(1)}
                    </motion.a>
                  </div>
                );
              })}
           </div>

           <div style={{ width:1, background:"rgba(255,255,255,0.1)", margin:"8px 12px 8px 16px", borderRadius:2 }}/>
           
           {/* 3. UTILITIES AND CORE ACTIONS (RIGHT WING) */}
           <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 6 }}>
              {socials.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.title} title={s.title} whileHover={{ scale: 1.2, color: s.color, background: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.9 }} style={{ color: "#8B9BB4", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s" }}>
                   {s.icon}
                </motion.a>
              ))}
              
              <div style={{ width:1, height:16, background:"rgba(255,255,255,0.1)", margin:"0 4px", borderRadius:2 }}/>
              
              <ThemeToggle theme={theme} setTheme={setTheme} />
              
              {/* Jam Lokal Real-time */}
              <div style={{ display: "flex", alignItems: "center", padding: "0 12px", background:"rgba(255,255,255,0.03)", borderRadius: "100px", border:"1px solid rgba(255,255,255,0.05)", height: 32, gap: 6 }}>
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B9BB4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                 <span style={{ fontSize: 11, fontWeight: 600, color: "#8B9BB4", fontFamily: "'JetBrains Mono', monospace" }}>JKT {jktTime}</span>
              </div>
              
              <div style={{ marginLeft: 6 }}>
                  <MagneticButton>
                    <motion.a href="/cv.pdf" download whileHover={{ scale: 1.05, boxShadow: "0 8px 20px -5px rgba(6,182,212,0.6)" }} whileTap={{ scale: 0.95 }} style={{ padding:"8px 20px", display: "flex", alignItems: "center", gap: 8, borderRadius: "100px", background:"linear-gradient(135deg, #06B6D4, #3B82F6)", color:"#FFF", fontSize:12, fontWeight:700, fontFamily:"'Inter',sans-serif", textDecoration:"none", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}>
                      CV
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </motion.a>
                  </MagneticButton>
              </div>
           </div>
         </motion.div>
      </div>

      {/* ── MOBILE NAVBAR ── */}
      <div className="show-on-mobile" style={{
         position:"fixed", top:0, left:0, right:0, zIndex:200, height:70, padding:"0 24px",
         display:"none", alignItems:"center", justifyContent:"space-between",
         backdropFilter:"blur(24px)", background:"rgba(6,14,30,0.85)", borderBottom:"1px solid rgba(255,255,255,0.05)"
      }}>
         <button onClick={()=>go("hero")} aria-label="Scroll to hero section" style={{background:"none",border:"none",padding:0}}>
            <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:18,color:"#FFF"}}>Berlin.</span>
         </button>
         <button onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} style={{background:"none",border:"none",padding:10,display:"flex",flexDirection:"column",gap:5}}>
            {[0,1,2].map(i=><span key={i} style={{width:24,height:2.5,background:"#FFF",transition:"0.4s",transform:menuOpen&&i===0?"rotate(45deg) translateY(7px)":menuOpen&&i===2?"rotate(-45deg) translateY(-7px)":"none",opacity:menuOpen&&i===1?0:1, borderRadius: 2}}/>)}
         </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="show-on-mobile flex flex-col"
            style={{position:"fixed", top:80, left:16, right:16, zIndex:199, background:"rgba(10,20,40,0.95)", backdropFilter:"blur(30px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius: "24px", overflow:"hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)"}}
          >
            <div style={{padding:"24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
              {navDots.map(link=>(
                <a key={link.id} href={"#"+link.id} onClick={e=>{e.preventDefault();go(link.id);}}
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"16px",background:active===link.id?"rgba(59,130,246,0.15)":"rgba(255,255,255,0.03)",border:active===link.id?"1px solid rgba(59,130,246,0.3)":"1px solid rgba(255,255,255,0.05)",borderRadius:"16px",color:active===link.id?"#FFF":"#94A3B8",fontSize:13,fontWeight:600,letterSpacing:"1px",textTransform:"uppercase",textDecoration:"none",fontFamily:"'Inter',sans-serif", textAlign:"center"}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:active===link.id?link.color:"rgba(107,132,168,0.3)",boxShadow:active===link.id?`0 0 12px ${link.color}`:"none"}}/>
                  {link.id}
                </a>
              ))}
            </div>
            <div style={{padding:"0 24px 24px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
               <div style={{display: "flex", gap: 12}}>
                  {socials.map((s,i)=><a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.title} title={s.title} style={{color:"#8B9BB4",textDecoration:"none"}}>{s.icon}</a>)}
               </div>
               <div style={{display: "flex", gap: 12, alignItems: "center"}}>
                 <span style={{ fontSize: 11, fontWeight: 600, color: "#8B9BB4", fontFamily: "'JetBrains Mono', monospace" }}>{jktTime}</span>
                 <ThemeToggle theme={theme} setTheme={setTheme} />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Avoid overlapping layout */
        body { padding-left: 0 !important; }
        /* The width has slightly widened, so hide earlier if needed */
        @media(max-width:1300px){.hide-on-mobile{display:none !important;} .show-on-mobile{display:flex !important;}}
        @media(min-width:1301px){.hide-on-mobile{display:flex !important;} .show-on-mobile{display:none !important;}}
      `}</style>
    </>
  );
}
