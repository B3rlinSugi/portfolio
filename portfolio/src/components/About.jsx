import { useRef, useState, useEffect } from "react";
import { data } from "../data/portfolioData";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useScroll, useTransform, useSpring } from "framer-motion";

function useCounter(target, duration = 1600, inView = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const isFloat = String(target).includes(".");
    const end = parseFloat(target), t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p) * Math.cos((p * 10 - 0.75) * (2 * Math.PI) / 3);
      setV(isFloat ? (e * end).toFixed(2) : Math.round(e * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return v;
}

const skillsData = [
  { name: "PHP",      color: "#8892BF", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Laravel",  color: "#FF2D20", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "Java",     color: "#F59E0B", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "MySQL",    color: "#00758F", icon: "https://cdn.simpleicons.org/mysql/00758F" },
  { name: "REST API", color: "#10B981", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "Postman",  color: "#FF6C37", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "Git",      color: "#F05032", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Linux",    color: "#FCC624", icon: "https://cdn.simpleicons.org/linux/FCC624" },
];

const stats = [
  { n: "3.63", l: "Cumulative GPA", suffix: "" },
  { n: "4", l: "Shipped Projects", suffix: "" },
  { n: "17", l: "API Endpoints", suffix: "+" },
  { n: "99.9", l: "System Uptime", suffix: "%" },
];

const OSWindow = ({ title, children, className, icon, noPadding = false }) => {
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);
   const [isHovered, setIsHovered] = useState(false);

   function handleMouseMove({ currentTarget, clientX, clientY }) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
   }

   return (
       <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
              position: "relative",
              background: "rgba(10, 15, 28, 0.4)", backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px",
              display: "flex", flexDirection: "column", overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
          }}
          className={`os-window ${className}`}
       >
           {/* Radar Glow Effect */}
           <motion.div
              className="pointer-events-none absolute inset-0"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                 background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.12), transparent 80%)`,
                 zIndex: 0
              }}
           />

           {/* OS Title Bar */}
           <div style={{ position: "relative", zIndex: 1, height: "40px", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
               <div style={{ display: "flex", gap: "8px", width: "60px" }}>
                   <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }}/>
                   <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }}/>
                   <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }}/>
               </div>
               <div style={{ flex: 1, textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#94A3B8", letterSpacing: "0.5px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                   {icon && <span>{icon}</span>}
                   {title}
               </div>
               <div style={{ width: "60px" }} />
           </div>
           
           {/* Window Content */}
           <div style={{ position: "relative", zIndex: 1, flex: 1, overflowY: "auto", overflowX: "hidden", padding: noPadding ? "0" : "32px", display: "flex", flexDirection: "column" }}>
               {children}
           </div>
       </motion.div>
   )
}

const PhotoSlideshow = () => {
  // Optimized slideshow images for faster mobile loading.
  const photos = ["/a-slide.jpg", "/b-slide.jpg", "/c-slide.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
           setCurrentIndex(prev => (prev + 1) % photos.length);
      }, 3500); // Durasi perpindahan antar foto (3.5 detik)
      return () => clearInterval(interval);
  }, []);

  return (
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#0F172A" }}>
          <AnimatePresence mode="popLayout">
              <motion.img
                  key={currentIndex}
                  src={photos[currentIndex]}
                  alt="Berlin Sugiyanto"
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 0.75, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", pointerEvents: "none", display: "block", minHeight: "100%" }}
                  onError={e => { 
                      e.target.style.display="none"; 
                  }}
              />
          </AnimatePresence>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, rgba(10,15,28,0.9) 0%, transparent 100%)", pointerEvents: "none", zIndex: 10 }} />
      </div>
  )
}

const StatItem = ({ n, l, suffix = "" }) => {
  const [inView, setInView] = useState(false);
  const count = useCounter(parseFloat(n), 1200, inView);
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} onViewportEnter={() => setInView(true)} transition={{ duration: 0.5 }}
      style={{ padding: "16px", flex: "1 1 40%" }}
    >
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 48, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-2px", lineHeight: 1 }}>{count}{suffix}</div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#3B82F6", marginTop: 12, textTransform: "uppercase", letterSpacing: "1px" }}>{l}</div>
    </motion.div>
  );
}

const About = () => {
  const workspaceRef = useRef(null);
  const aboutRef = useRef(null);

  // Reveal from center line outward (inverse of Hero's pinch)
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "start 0.4"],
  });
  const { scrollYProgress: aboutExitProgress } = useScroll({
    target: aboutRef,
    offset: ["end end", "end start"],
  });

  const spring = { stiffness: 70, damping: 18, mass: 0.5 };

  const rawClipTop    = useTransform(scrollYProgress, [0, 1], [50,  0]);
  const rawClipBottom = useTransform(scrollYProgress, [0, 1], [50,  0]);
  const rawOpacity    = useTransform(scrollYProgress, [0, 0.4], [0,  1]);
  const rawY          = useTransform(scrollYProgress, [0, 1], [56,  0]);
  const rawTopBlendOp = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const rawTopGlowOp  = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rawTopGlowSc  = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const rawDepthBgY   = useTransform(scrollYProgress, [0, 1], [96, 0]);
  const rawDepthBgSc  = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const rawDepthCtY   = useTransform(scrollYProgress, [0, 1], [72, 0]);
  const rawDepthCtSc  = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const rawStackExitY = useTransform(aboutExitProgress, [0, 0.6, 1], [0, 22, 172]);
  const rawStackExitOp = useTransform(aboutExitProgress, [0, 0.65, 0.92, 1], [1, 1, 0.42, 0.14]);
  const rawStackExitSc = useTransform(aboutExitProgress, [0, 0.62, 1], [1, 1.04, 0.72]);
  const rawStackExitBlur = useTransform(aboutExitProgress, [0, 0.68, 1], [0, 0, 12]);
  const stackSnapClip = useTransform(aboutExitProgress, [0, 0.62, 1], [
    "circle(140% at 50% 86%)",
    "circle(140% at 50% 86%)",
    "circle(11% at 50% 86%)",
  ]);
  const rawMagnetCoreOp = useTransform(aboutExitProgress, [0.45, 0.8, 1], [0, 0.75, 1]);
  const rawMagnetCoreSc = useTransform(aboutExitProgress, [0.45, 1], [0.66, 1.22]);
  const rawMagnetCoreY  = useTransform(aboutExitProgress, [0.45, 1], [26, 0]);

  const clipTop    = useSpring(rawClipTop,    spring);
  const clipBottom = useSpring(rawClipBottom, spring);
  const opacity    = useSpring(rawOpacity,    spring);
  const y          = useSpring(rawY,          spring);
  const topBlendOp = useSpring(rawTopBlendOp, spring);
  const topGlowOp  = useSpring(rawTopGlowOp,  spring);
  const topGlowSc  = useSpring(rawTopGlowSc,  spring);
  const depthBgY   = useSpring(rawDepthBgY,   spring);
  const depthBgSc  = useSpring(rawDepthBgSc,  spring);
  const depthCtY   = useSpring(rawDepthCtY,   spring);
  const depthCtSc  = useSpring(rawDepthCtSc,  spring);
  const stackExitY = useSpring(rawStackExitY, spring);
  const stackExitOp = useSpring(rawStackExitOp, spring);
  const stackExitSc = useSpring(rawStackExitSc, spring);
  const stackExitBlur = useSpring(rawStackExitBlur, spring);
  const stackFilter = useTransform(stackExitBlur, (v) => `blur(${v}px)`);
  const magnetCoreOp = useSpring(rawMagnetCoreOp, spring);
  const magnetCoreSc = useSpring(rawMagnetCoreSc, spring);
  const magnetCoreY  = useSpring(rawMagnetCoreY, spring);

  const stackY = useTransform([depthCtY, stackExitY], ([entryY, exitY]) => entryY + exitY);
  const stackScale = useTransform([depthCtSc, stackExitSc], ([entrySc, exitSc]) => entrySc * exitSc);

  const clipPath = useTransform(
    [clipTop, clipBottom],
    ([t, b]) => `inset(${t}% 0 ${b}% 0)`
  );

  return (
    <motion.section
      id="about"
      ref={aboutRef}
      style={{
        background: "#020617",
        padding: "120px 24px",
        position: "relative",
        overflow: "hidden",
        clipPath,
        opacity,
        y,
        willChange: "clip-path, opacity, transform",
      }}
    >
      {/* Top transition veil: catches the end of Hero and blends into About */}
      <motion.div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "220px",
        background: "linear-gradient(to bottom, rgba(4,9,20,0.88) 0%, rgba(2,6,23,0.45) 42%, rgba(2,6,23,0) 100%)",
        opacity: topBlendOp,
        pointerEvents: "none",
        zIndex: 1,
      }} />
      <motion.div style={{
        position: "absolute",
        top: "-110px",
        left: "6%",
        right: "6%",
        height: "280px",
        background: "radial-gradient(ellipse at center, rgba(59,130,246,0.2) 0%, rgba(6,182,212,0.12) 35%, transparent 72%)",
        filter: "blur(24px)",
        opacity: topGlowOp,
        scale: topGlowSc,
        pointerEvents: "none",
        zIndex: 1,
      }} />
      <motion.div style={{
        position: "absolute",
        left: "50%",
        marginLeft: "-210px",
        bottom: "7vh",
        width: "420px",
        height: "420px",
        background: "radial-gradient(circle, rgba(59,130,246,0.26) 0%, rgba(6,182,212,0.2) 34%, rgba(2,6,23,0.02) 72%, transparent 88%)",
        filter: "blur(34px)",
        opacity: magnetCoreOp,
        scale: magnetCoreSc,
        y: magnetCoreY,
        pointerEvents: "none",
        zIndex: 1,
      }} />
      
      {/* Parallax background layer (moves slower for depth effect) */}
      <motion.div style={{ position: "absolute", inset: 0, zIndex: 0, y: depthBgY, scale: depthBgSc, transformOrigin: "center top", willChange: "transform", pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundSize: "40px 40px", backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)" }} />
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
      </motion.div>

      <motion.div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2, y: stackY, scale: stackScale, opacity: stackExitOp, clipPath: stackSnapClip, filter: stackFilter, transformOrigin: "center top", willChange: "transform, opacity, clip-path, filter" }}>
        
        {/* Workspace Label */}
        <div style={{ textAlign: "center", marginBottom: "40px", pointerEvents: "none" }}>
           <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#3B82F6", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>01. PROFILE</p>
           <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "32px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.5px", marginTop: "8px" }}>Beyond the code.</h2>
           <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#64748B", marginTop: "8px" }}>* Move your cursor to explore</p>
        </div>

        {/* The OS Desktop Bounding Box */}
        <div ref={workspaceRef} className="workspace-canvas" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px", alignContent: "flex-start", minHeight: "80vh" }}>
           
           {/* WIN 1: Profile Photo */}
           <OSWindow boundsRef={workspaceRef} title="viewer.exe - profile.jpg" className="win-1" noPadding>
               <PhotoSlideshow />
           </OSWindow>

           {/* WIN 2: Narrative Text */}
           <OSWindow boundsRef={workspaceRef} title="vscode - about_me.md" className="win-2" icon="📄">
               <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "36px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: "20px" }}>
                 Building resilient backend systems for modern products.
               </h2>
               <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", padding: "6px 16px", borderRadius: "8px", marginBottom: "24px", width: "fit-content" }}>
                   <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px rgba(16,185,129,0.8)" }} />
                   <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#34D399" }}>[STATUS] : Available for remote opportunities</span>
               </div>
               <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "17px", color: "#94A3B8", lineHeight: 1.8, marginBottom: "20px", cursor: "text" }}>
                 {data.about}
               </p>
               <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "17px", color: "#94A3B8", lineHeight: 1.8, cursor: "text" }}>
                 Fresh graduate in Informatics Engineering from <strong style={{ color: "#F8FAFC", fontWeight: 600 }}>Universitas Gunadarma</strong>. I specialize in designing scalable database schemas, building secure APIs, and writing clean backend logic that keeps applications stable, fast, and maintainable.
               </p>
           </OSWindow>

           {/* WIN 3: Key Metrics */}
           <OSWindow boundsRef={workspaceRef} title="terminal - metrics.log" className="win-3" icon=">_">
               <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#34D399", marginBottom: 24 }}>✓ Fetching performance data...</div>
               <div style={{ display: "flex", flexWrap: "wrap", rowGap: "32px" }}>
                   {stats.map(s => <StatItem key={s.l} n={s.n} l={s.l} suffix={s.suffix} />)}
               </div>
           </OSWindow>

           {/* WIN 4: Tech Stack Dashboard */}
           <OSWindow boundsRef={workspaceRef} title="settings - modules.config" className="win-4" icon="⚙️">
               <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#94A3B8", marginBottom: 24 }}>// Active Dependencies</div>
               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "16px" }}>
                   {skillsData.map((s, i) => (
                       <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "20px 16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                           <div style={{ width: 36, height: 36, flexShrink: 0, filter: "brightness(1.5)" }}>
                               <img src={s.icon} alt={`${s.name} icon`} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => e.target.style.display="none"} />
                           </div>
                           <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#E2E8F0", fontWeight: 600 }}>{s.name}</span>
                       </div>
                   ))}
               </div>
           </OSWindow>

        </div>
      </motion.div>

      <style>{`
        /* OS Window Sizing Configuration */
        .win-1 { width: 340px; height: 500px; }
        .win-2 { width: 680px; height: auto; }
        .win-3 { width: 440px; height: auto; }
        .win-4 { width: 580px; height: auto; }

        /* Ensure scrollbars look sleek inside windows */
        .os-content::-webkit-scrollbar { width: 6px; }
        .os-content::-webkit-scrollbar-track { background: transparent; }
        .os-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .os-content::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

        /* Touch / Mobile Graceful Fallback */
        @media (max-width: 900px) {
           .win-1, .win-2, .win-3, .win-4 { width: 100% !important; min-height: auto !important; height: auto !important; }
           .win-1 { height: 400px !important; }
           
           /* Disable jumping to extreme drag levels on small screens */
           .workspace-canvas { display: grid !important; gap: 32px !important; min-height: auto !important; }
        }
      `}</style>
    </motion.section>
  );
};

export default About;
