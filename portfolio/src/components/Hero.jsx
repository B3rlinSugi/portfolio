import { data } from "../data/portfolioData";
import { useState, useContext, useRef } from "react";
import { LangContext } from "../LangContext";
import { i18n } from "../i18n";
import { useScrollAnimation } from "../useScrollAnimation";
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform, useSpring } from "framer-motion";
import { getContactActionLinks } from "../utils/contactActions";

/* ── Deep Smooth Aurora Background ── */
const AuroraBackground = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: "0%", left: "10%", width: "80%", height: "80%", background: "radial-gradient(ellipse, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)", animation: "aurora1 18s ease-in-out infinite", filter: "blur(60px)", borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%" }} />
    <div style={{ position: "absolute", top: "10%", right: "10%", width: "70%", height: "70%", background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.04) 50%, transparent 70%)", animation: "aurora2 22s ease-in-out infinite", filter: "blur(70px)", borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse at center,black 20%,transparent 80%)" }} />
    <style>{`
      @keyframes aurora1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-2%,4%) scale(1.05)}66%{transform:translate(3%,-2%) scale(0.98)}}
      @keyframes aurora2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(5%,-3%) scale(1.04)}70%{transform:translate(-3%,2%) scale(0.96)}}
    `}</style>
  </div>
);

/* ── The Cinematic Dock Card (TikTok Style) ── */
const BentoPhoto = () => {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spotlight effect (Cahaya mengikuti kursor)
  const spotlightBackground = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 80%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      style={{ position:"relative", width: "100%", height: "100%", minHeight: "460px", display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", justifyContent: "center", zIndex: 10 }}
    >
      <motion.div
         onMouseMove={handleMouseMove}
         onMouseEnter={() => setHovered(true)} 
         onMouseLeave={() => setHovered(false)}
         whileHover={{ y: -5, scale: 1.02 }}
         transition={{ type: "spring", stiffness: 300, damping: 20 }}
         style={{ 
            width: "100%", height: "100%", minHeight: "500px",
            background: "#0F172A",
            borderRadius: "24px",
            position: "relative", zIndex: 2, 
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)"
         }}
      >
        {/* Full Image Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
           <img src="/foto.jpg" alt="Berlin Sugiyanto" loading="eager" decoding="async" fetchPriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "contrast(1.05) brightness(0.9)" }} onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}} />
           <div style={{ display:"none", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", background:"#1E293B" }}>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:50, color:"#94A3B8" }}>BS</span>
           </div>
        </div>

        {/* Gradient overlays to make text readable */}
        {/* Top gradient for Name */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)", zIndex: 1 }} />
        {/* Bottom gradient for the Dock */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)", zIndex: 1 }} />

        {/* ── Spotlight (Cahaya Interaktif) ── */}
        <motion.div 
           style={{ position: "absolute", inset: 0, zIndex: 2, background: spotlightBackground, opacity: hovered ? 1 : 0, pointerEvents: "none" }} 
           transition={{ opacity: { duration: 0.3 } }}
        />

        {/* Content Wrapper */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px 24px" }}>
            
            {/* Top Text (Name & Title) */}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <h3 style={{ margin: "0", fontFamily: "'Outfit', sans-serif", fontSize: "clamp(28px, 2.5vw, 32px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.5px", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                    Berlin Sugiyanto
                </h3>
                <p style={{ margin: "4px 0 0 0", fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
                    {data.title}
                </p>
            </div>

            {/* Bottom Floating Dock */}
            <div style={{ 
               width: "100%", maxWidth: "300px", margin: "0 auto",
               background: "rgba(10, 10, 10, 0.75)",
               backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
               border: "1px solid rgba(255,255,255,0.08)",
               borderRadius: "16px",
               padding: "12px 16px",
               display: "flex", alignItems: "center", justifyContent: "space-between",
               boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}>
                {/* Left: Avatar & Info */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* Small Avatar */}
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#1E293B", flexShrink: 0 }}>
                        <img src="/foto.jpg" alt="Avatar" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    {/* Handle & Status */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: "#F8FAFC", letterSpacing: "-0.2px" }}>@babehber_</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: "#94A3B8" }}>Online</span>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Button */}
                <motion.button 
                   whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.15)" }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                   style={{ 
                      padding: "10px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px",
                      color: "#F8FAFC", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "background 0.2s"
                   }}
                >
                    Contact Me
                </motion.button>
            </div>

        </div>
      </motion.div>
    </div>
  );
};

/* ── Main Hero Component ── */
const Hero = () => {
  const [scrollRef, isScrollVisible] = useScrollAnimation();
  const lang = useContext(LangContext);
  const t = i18n[lang].hero;
  const actionLinks = getContactActionLinks(data);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Pinch + Line Reveal scroll tracking
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // How much scroll progress until fully pinched (0 → 1)
  const rawClipTop    = useTransform(scrollYProgress, [0.3, 0.75], [0,   50]);
  const rawClipBottom = useTransform(scrollYProgress, [0.3, 0.75], [0,   50]);
  const rawOpacity    = useTransform(scrollYProgress, [0.25, 0.65], [1,   0]);
  const rawScale      = useTransform(scrollYProgress, [0,    0.5],  [1, 0.96]);
  const rawLineOp     = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const rawLineScale  = useTransform(scrollYProgress, [0.55, 0.68], [0,   1]);
  const rawDepthBgY   = useTransform(scrollYProgress, [0, 1], [0, 92]);
  const rawDepthBgSc  = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const rawDepthFgY   = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const rawDepthFgSc  = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const rawBridgeOpacity = useTransform(scrollYProgress, [0.45, 0.78], [0, 1]);
  const rawBridgeY       = useTransform(scrollYProgress, [0.45, 0.78], [28, 0]);
  const rawBridgeGlowOp  = useTransform(scrollYProgress, [0.5, 0.82], [0, 1]);
  const rawBridgeGlowSc  = useTransform(scrollYProgress, [0.5, 0.82], [0.92, 1]);

  // Spring-smoothed values for buttery feel
  const spring = { stiffness: 80, damping: 20, mass: 0.5 };
  const clipTop    = useSpring(rawClipTop,    spring);
  const clipBottom = useSpring(rawClipBottom, spring);
  const opacity    = useSpring(rawOpacity,    spring);
  const scale      = useSpring(rawScale,      spring);
  const lineOp     = useSpring(rawLineOp,     spring);
  const lineScale  = useSpring(rawLineScale,  spring);
  const depthBgY   = useSpring(rawDepthBgY,   spring);
  const depthBgSc  = useSpring(rawDepthBgSc,  spring);
  const depthFgY   = useSpring(rawDepthFgY,   spring);
  const depthFgSc  = useSpring(rawDepthFgSc,  spring);
  const bridgeOpacity = useSpring(rawBridgeOpacity, spring);
  const bridgeY       = useSpring(rawBridgeY, spring);
  const bridgeGlowOp  = useSpring(rawBridgeGlowOp, spring);
  const bridgeGlowSc  = useSpring(rawBridgeGlowSc, spring);

  // clip-path as a motion string: pinch from top & bottom toward center
  const clipPath = useTransform(
    [clipTop, clipBottom],
    ([t, b]) => `inset(${t}% 0 ${b}% 0)`
  );

  return (
    <div ref={heroRef} style={{ position: "relative" }}>
      {/* ── Pinch line that appears at center as Hero collapses ── */}
      <motion.div style={{
        position: "sticky",
        top: "50vh",
        left: 0, right: 0,
        height: 1,
        background: "linear-gradient(to right, transparent, rgba(59,130,246,0.9) 20%, rgba(6,182,212,0.9) 50%, rgba(59,130,246,0.9) 80%, transparent)",
        zIndex: 20,
        pointerEvents: "none",
        opacity: lineOp,
        scaleX: lineScale,
        transformOrigin: "center",
        boxShadow: "0 0 12px rgba(59,130,246,0.6)",
        marginTop: "-1px",
      }} />

      {/* ── Hero content that gets pinched ── */}
      <motion.section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", padding: 0, maxWidth: "none",
          overflow: "hidden", background: "#040914",
          clipPath, opacity, scale,
          willChange: "clip-path, opacity, transform",
        }}
      >
      <motion.div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        y: depthBgY,
        scale: depthBgSc,
        transformOrigin: "center top",
        willChange: "transform",
      }}>
        <AuroraBackground />
      </motion.div>

      {/* Scroll bridge: softly blends Hero into About as user scrolls down */}
      <motion.div style={{
        position: "absolute",
        left: 0, right: 0, bottom: 0,
        height: "24vh",
        minHeight: "120px",
        background: "linear-gradient(to bottom, rgba(4,9,20,0) 0%, rgba(2,6,23,0.88) 68%, rgba(2,6,23,1) 100%)",
        opacity: bridgeOpacity,
        y: bridgeY,
        pointerEvents: "none",
        zIndex: 1,
      }} />
      <motion.div style={{
        position: "absolute",
        left: "7%", right: "7%",
        bottom: "8vh",
        height: "24vh",
        minHeight: "130px",
        background: "radial-gradient(ellipse at center, rgba(59,130,246,0.16) 0%, rgba(6,182,212,0.1) 35%, transparent 75%)",
        filter: "blur(18px)",
        opacity: bridgeGlowOp,
        scale: bridgeGlowSc,
        pointerEvents: "none",
        zIndex: 1,
      }} />

      <motion.div ref={scrollRef} style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "130px 24px 80px", width: "100%", y: depthFgY, scale: depthFgSc, transformOrigin: "center top", willChange: "transform" }}>

        {/* ── Main Hero Two-Column Layout ── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "48px", width: "100%", marginTop: "80px" }}>
           
           {/* Left Content (Text) */}
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             animate={isScrollVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "left" }}
           >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)", padding: "8px 20px", borderRadius: 100, backdropFilter: "blur(10px)", marginBottom: "28px", width: "fit-content" }}>
                 <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#06B6D4", boxShadow: "0 0 10px rgba(6,182,212,0.8)", flexShrink: 0 }} />
                 <span style={{ fontSize: 11, fontWeight: 700, color: "#06B6D4", fontFamily: "'Inter', sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>{t.badge}</span>
              </div>

              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "16px", letterSpacing: "-1px" }}>
                 Berlin 
                 <br />
                 Sugiyanto
              </h1>
              
              <p style={{ color: "#94A3B8", maxWidth: "520px", marginBottom: "40px", lineHeight: 1.8, fontWeight: 500, fontSize: "16px", fontFamily: "'Inter', sans-serif" }}>
                 <strong style={{ color: "#FFFFFF", fontWeight: 700, marginRight: "6px" }}>{t.role}.</strong> {t.tagline}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                  <motion.a 
                     href={data.github} target="_blank" rel="noreferrer"
                     whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)" }} 
                     whileTap={{ scale: 0.95 }}
                     style={{ padding: "12px 24px", display: "inline-flex", alignItems: "center", gap: "10px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", fontWeight: 600, fontSize: "14px", textDecoration: "none", cursor: "pointer", transition: "all 0.2s", fontFamily: "'Inter', sans-serif" }}
                  >
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                     {t.github} 
                  </motion.a>
                  
                  <motion.button 
                     onClick={() => go("contact")} 
                     whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)" }} 
                     whileTap={{ scale: 0.95 }}
                     style={{ padding: "12px 24px", display: "inline-flex", alignItems: "center", gap: "10px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", fontWeight: 600, fontSize: "14px", textDecoration: "none", cursor: "pointer", transition: "all 0.2s", fontFamily: "'Inter', sans-serif" }}
                  >
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                     {t.touch}
                  </motion.button>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                      <motion.a 
                         href="/cv.pdf" download
                     whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)" }} 
                     whileTap={{ scale: 0.95 }}
                     style={{ padding: "12px 24px", display: "inline-flex", alignItems: "center", gap: "10px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", fontWeight: 600, fontSize: "14px", textDecoration: "none", cursor: "pointer", transition: "all 0.2s", fontFamily: "'Inter', sans-serif" }}
                  >
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                     {t.cv}
                  </motion.a>

                  <div style={{ width: "2px", height: "24px", background: "rgba(255,255,255,0.1)", margin: "0 8px" }} />

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <motion.a href={data.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile" title="GitHub"
                        whileHover={{ scale: 1.2, color: "#FFFFFF", background: "rgba(255,255,255,0.08)" }} 
                        whileTap={{ scale: 0.9 }} 
                        style={{ color: "#8B9BB4", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                         <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      </motion.a>
                      
                      <motion.a href={data.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" title="LinkedIn"
                        whileHover={{ scale: 1.2, color: "#0A66C2", background: "rgba(255,255,255,0.08)" }} 
                        whileTap={{ scale: 0.9 }} 
                        style={{ color: "#8B9BB4", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                         <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </motion.a>
                      
                      <motion.a href={data.instagram} target="_blank" rel="noreferrer" aria-label="Open Instagram profile" title="Instagram"
                        whileHover={{ scale: 1.2, color: "#E1306C", background: "rgba(255,255,255,0.08)" }} 
                        whileTap={{ scale: 0.9 }} 
                        style={{ color: "#8B9BB4", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                         <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.2 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </motion.a>
                      
                      <motion.a href={actionLinks.whatsapp || data.whatsapp} target="_blank" rel="noreferrer" aria-label="Open WhatsApp chat" title="WhatsApp"
                        whileHover={{ scale: 1.2, color: "#25D366", background: "rgba(255,255,255,0.08)" }} 
                        whileTap={{ scale: 0.9 }} 
                        style={{ color: "#8B9BB4", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                         <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </motion.a>
                  </div>
              </div>
          </div>
           </motion.div>

           {/* Right Content (Card) */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={isScrollVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
             transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
             style={{ flex: "0 0 400px", maxWidth: "100%", position: "relative" }}
           >
              <BentoPhoto />
           </motion.div>
        </div>
      </motion.div>

      </motion.section>
    </div>
  );
};

export default Hero;
