import { useEffect, useRef, useState, useContext } from "react";
import { data } from "../data/portfolioData";
import { LangContext } from "../LangContext";
import { i18n } from "../i18n";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useScrollAnimation } from "../useScrollAnimation";

const LEARNING_COLOR = { color: "#A78BFA", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)" };

// ==========================================
// 1. MAC OS DOCK ITEM COMPONENT (Option 4)
// ==========================================
const DockItem = ({ item, mouseX }) => {
  let ref = useRef(null);

  // Measure the distance from the mouse to the exact center of this specific icon
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate width/scale based on distance. 
  // Native width: 50px. Max width when hovered: 85px. Falloff range: 130px
  let widthSync = useTransform(distance, [-130, 0, 130], [50, 85, 50]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 15 });

  // Calculate tooltip pop-up properties
  let opacitySync = useTransform(distance, [-40, 0, 40], [0, 1, 0]);
  let opacity = useSpring(opacitySync, { mass: 0.1, stiffness: 200, damping: 20 });
  let ySync = useTransform(distance, [-40, 0, 40], [5, -5, 5]);
  let y = useSpring(ySync, { mass: 0.1, stiffness: 200, damping: 20 });

  return (
    <motion.div ref={ref} style={{ width, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
      
      {/* Name Tooltip (Only visible when magnified) */}
      <motion.div 
        style={{ 
            opacity, y, position: "absolute", bottom: "100%", marginBottom: "16px", padding: "6px 12px", 
            background: "rgba(15, 23, 42, 0.9)", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, 
            borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", whiteSpace: "nowrap", 
            pointerEvents: "none", boxShadow: "0 10px 20px rgba(0,0,0,0.4)", zIndex: 50, fontFamily: "'Inter', sans-serif" 
        }}
      >
        {item.name}
      </motion.div>

      {/* Dock Application Icon Box */}
      <motion.div 
        style={{ 
            width, height: width, borderRadius: "22%", 
            background: "linear-gradient(to bottom, rgba(30,41,59,0.95), rgba(15,23,42,0.95))", 
            border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", 
            boxShadow: "0 12px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)", transformOrigin: "bottom" 
        }}
      >
         <img src={item.icon} alt={item.name} style={{ width: "60%", height: "60%", objectFit: "contain", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }} onError={e=>e.target.style.display="none"} />
      </motion.div>

    </motion.div>
  )
}

// ==========================================
// 2. MAC OS DOCK RACK (Option 4)
// ==========================================
const MacOSDock = ({ category, index, snapProgress }) => {
  let mouseX = useMotionValue(Infinity);
  const dockSpring = { stiffness: 110, damping: 22, mass: 0.45 };
  const rawDockY = useTransform(snapProgress, [0, 1], [-142 + index * 10, 0]);
  const rawDockOpacity = useTransform(snapProgress, [0, 0.42, 1], [0, 0.82, 1]);
  const rawDockScale = useTransform(snapProgress, [0, 0.52, 1], [0.5, 1.14, 1]);
  const rawDockBlur = useTransform(snapProgress, [0, 1], [8, 0]);
  const dockY = useSpring(rawDockY, dockSpring);
  const dockOpacity = useSpring(rawDockOpacity, dockSpring);
  const dockScale = useSpring(rawDockScale, dockSpring);
  const dockBlur = useSpring(rawDockBlur, dockSpring);
  const dockFilter = useTransform(dockBlur, (v) => `blur(${v}px)`);

  return (
    <motion.div 
      style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", width: "100%", y: dockY, opacity: dockOpacity, scale: dockScale, filter: dockFilter, transformOrigin: "50% -120px", willChange: "transform, opacity, filter" }}
    >
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "14px", fontWeight: 700, color: "#94A3B8", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>{category.category}</span>
        
        {/* Outer scrolling area to prevent clipping tooltips on small screens */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", overflowX: "auto", overflowY: "visible", padding: "40px 20px 20px 20px", marginTop: "-40px" }} className="dock-rack">
            <div 
               onMouseMove={(e) => mouseX.set(e.clientX)} // Use clientX instead of pageX for perfect viewport mapping
               onMouseLeave={() => mouseX.set(Infinity)}
               style={{ 
                   display: "inline-flex", alignItems: "center", gap: "16px", padding: "16px 28px", 
                   background: "rgba(255,255,255,0.03)", borderRadius: "34px", border: "1px solid rgba(255,255,255,0.06)", 
                   borderBottom: "1px solid rgba(255,255,255,0.1)", // strong bottom edge
                   backdropFilter: "blur(24px)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)", overflow: "visible",
                   margin: "0 auto"
               }}
            >
                {category.items.map(item => <DockItem key={item.name} item={item} mouseX={mouseX} />)}
            </div>
        </div>
    </motion.div>
  )
}

// ==========================================
// 3. LEARNING SECTION (RETAINED)
// ==========================================
const LearningSection = ({ visible }) => {
  const [hovered, setHovered] = useState(false);
  const { color, bg, border } = LEARNING_COLOR;

  if (!data.learning || data.learning.length === 0) return null;

  return (
    <div style={{
      border: `1px solid ${hovered ? border : "rgba(167,139,250,0.15)"}`, borderRadius: "24px", overflow: "hidden",
      background: hovered ? bg : "rgba(15,31,56,0.4)", transition: "all 0.4s ease",
      boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px ${color}15` : "0 20px 40px rgba(0,0,0,0.4)",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
    }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: 2, background: `repeating-linear-gradient(90deg,${color} 0,${color} 8px,transparent 8px,transparent 16px)`, opacity: 0.4 }} />
      <div style={{ padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, animation: "learningPulse 2s ease-in-out infinite", flexShrink: 0 }} />
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--white-2)", fontFamily: "'Outfit',sans-serif" }}>Currently Learning</span>
        </div>
        <span style={{ fontSize: 10.5, color, background: `${color}12`, border: `1px solid ${color}25`, padding: "4px 12px", borderRadius: 100, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{data.learning.length} in progress</span>
      </div>
      
      <div style={{ padding: "0 32px 24px", display: "flex", flexWrap: "wrap", gap: 12 }}>
        {data.learning.map((item) => (
             <div key={item.name} style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 100, background: "rgba(0,0,0,0.3)", border: `1px solid rgba(167,139,250,0.1)` }}>
                 <img src={item.icon} alt={item.name} style={{ width: 18, height: 18, objectFit: "contain", filter: "grayscale(30%)" }} onError={e => e.target.style.display = "none"} />
                 <span style={{ fontSize: 14, fontWeight: 500, color: "var(--white-2)", fontFamily: "'Inter',sans-serif" }}>{item.name}</span>
             </div>
        ))}
      </div>
    </div>
  );
};


// ==========================================
// 4. MAIN EXPORT COMPONENT
// ==========================================
const Skills = () => {
  const [scrollRef, isScrollVisible] = useScrollAnimation();
  const lang = useContext(LangContext);
  const t = i18n[lang].skills;
  const { scrollYProgress: skillsStackProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "start 0.35"],
  });

  const spring = { stiffness: 105, damping: 24, mass: 0.5 };
  const rawSectionY = useTransform(skillsStackProgress, [0, 1], [-136, 0]);
  const rawSectionOpacity = useTransform(skillsStackProgress, [0, 0.34, 1], [0, 0.84, 1]);
  const rawSectionScale = useTransform(skillsStackProgress, [0, 0.48, 1], [0.58, 1.08, 1]);
  const rawSectionBlur = useTransform(skillsStackProgress, [0, 1], [11, 0]);
  const rawBgY = useTransform(skillsStackProgress, [0, 1], [-72, 0]);
  const rawBgOpacity = useTransform(skillsStackProgress, [0, 1], [0.18, 1]);
  const rawHeaderY = useTransform(skillsStackProgress, [0, 1], [-116, 0]);
  const rawHeaderOpacity = useTransform(skillsStackProgress, [0, 0.46, 1], [0, 0.9, 1]);
  const rawHeaderScale = useTransform(skillsStackProgress, [0, 0.52, 1], [0.7, 1.08, 1]);
  const rawLearningY = useTransform(skillsStackProgress, [0, 0.72, 1], [-132, -58, 0]);
  const rawLearningOpacity = useTransform(skillsStackProgress, [0, 0.72, 1], [0, 0.32, 1]);
  const rawSnapCoreOpacity = useTransform(skillsStackProgress, [0, 0.2, 0.72], [0.92, 0.72, 0]);
  const rawSnapCoreScale = useTransform(skillsStackProgress, [0, 0.35, 1], [0.42, 1.22, 1.62]);
  const rawSnapCoreY = useTransform(skillsStackProgress, [0, 1], [-24, 32]);

  const sectionY = useSpring(rawSectionY, spring);
  const sectionOpacity = useSpring(rawSectionOpacity, spring);
  const sectionScale = useSpring(rawSectionScale, spring);
  const sectionBlur = useSpring(rawSectionBlur, spring);
  const sectionFilter = useTransform(sectionBlur, (v) => `blur(${v}px)`);
  const bgY = useSpring(rawBgY, spring);
  const bgOpacity = useSpring(rawBgOpacity, spring);
  const headerY = useSpring(rawHeaderY, spring);
  const headerOpacity = useSpring(rawHeaderOpacity, spring);
  const headerScale = useSpring(rawHeaderScale, spring);
  const learningY = useSpring(rawLearningY, spring);
  const learningOpacity = useSpring(rawLearningOpacity, spring);
  const snapCoreOpacity = useSpring(rawSnapCoreOpacity, spring);
  const snapCoreScale = useSpring(rawSnapCoreScale, spring);
  const snapCoreY = useSpring(rawSnapCoreY, spring);

  return (
    <section id="skills" ref={scrollRef} style={{ background: "#020617", padding: "120px 0", position: "relative", overflow: "hidden" }}>
        
        {/* Abstract OS Desktop Background Patterns */}
        <motion.div style={{ position: "absolute", inset: 0, y: bgY, opacity: bgOpacity, pointerEvents: "none", zIndex: 0, willChange: "transform, opacity" }}>
            <div style={{ position: "absolute", inset: 0, backgroundSize: "40px 40px", backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)" }} />
            <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)" }} />
        </motion.div>
        <motion.div style={{
            position: "absolute",
            left: "50%",
            marginLeft: "-220px",
            top: "-180px",
            width: "440px",
            height: "440px",
            background: "radial-gradient(circle, rgba(59,130,246,0.38) 0%, rgba(6,182,212,0.2) 35%, rgba(2,6,23,0.04) 72%, transparent 90%)",
            filter: "blur(34px)",
            opacity: snapCoreOpacity,
            scale: snapCoreScale,
            y: snapCoreY,
            pointerEvents: "none",
            zIndex: 1,
            willChange: "transform, opacity",
        }} />
        
        <motion.div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10, y: sectionY, opacity: sectionOpacity, scale: sectionScale, filter: sectionFilter, transformOrigin: "50% -120px", willChange: "transform, opacity, filter" }}>
            {/* Header Block */}
            <motion.div style={{ textAlign: "center", marginBottom: "40px", y: headerY, opacity: headerOpacity, scale: headerScale, transformOrigin: "50% -120px", willChange: "transform, opacity" }}>
               <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#3B82F6", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>
                  02. TECHNOLOGY STACK
               </p>
               <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "40px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-1px", marginTop: "12px", marginBottom: "16px" }}>The Engineering Arsenal.</h2>
               <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#64748B", marginTop: "16px" }}>* Interactive Rack modules. Drag cursor along the docks.</p>
            </motion.div>

            {/* MacOS Animated Docks */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {data.skills.map((category, index) => (
                    <MacOSDock key={category.category} category={category} index={index} snapProgress={skillsStackProgress} />
                ))}
            </div>

            {/* Learning Section */}
            <motion.div style={{ marginTop: "100px", y: learningY, opacity: learningOpacity, willChange: "transform, opacity" }}>
                <LearningSection visible={isScrollVisible} />
            </motion.div>
        </motion.div>

        {/* Global styles overriding scrollbar for docks so mobile doesn't look ugly */}
        <style>{`
            .dock-rack::-webkit-scrollbar { display: none; }
            .dock-rack { -ms-overflow-style: none; scrollbar-width: none; }
            @keyframes learningPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        `}</style>
    </section>
  );
};

export default Skills;
