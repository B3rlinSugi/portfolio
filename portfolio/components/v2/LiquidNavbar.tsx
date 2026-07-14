"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  MotionValue,
  useMotionValueEvent,
  AnimatePresence
} from "framer-motion";
import { 
  Home, User, Briefcase, Code2, Star, Award, Mail 
} from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: Star },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

const sectionColors: Record<string, string> = {
  home: "rgba(23, 23, 23, 0.6)",
  about: "rgba(30, 41, 59, 0.6)",
  projects: "rgba(12, 74, 110, 0.6)",
  skills: "rgba(66, 32, 6, 0.6)",
  experience: "rgba(63, 10, 10, 0.6)",
  certificates: "rgba(6, 78, 59, 0.6)",
  contact: "rgba(49, 10, 78, 0.6)",
};

// 1. Liquid Cursor Component
function LiquidCursor({ isHovering }: { isHovering: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      style={{ x: smoothX, y: smoothY }}
      animate={{
        opacity: isHovering ? 1 : 0,
        scale: isHovering ? 1 : 0.5,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-12 h-12 -ml-6 -mt-6 bg-white/15 border border-white/30 shadow-[0_4px_24px_rgba(255,255,255,0.1)]"
        animate={isHovering ? {
          borderTopLeftRadius: ["24px", "16px", "24px", "24px"],
          borderTopRightRadius: ["16px", "24px", "18px", "16px"],
          borderBottomRightRadius: ["24px", "16px", "24px", "24px"],
          borderBottomLeftRadius: ["18px", "24px", "16px", "18px"],
          scaleX: [1, 1.1, 0.9, 1],
          scaleY: [1, 0.9, 1.1, 1],
        } : { borderRadius: "24px" }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// 2. Elastic Dock Item Component
function MagneticItem({ 
  children, 
  isActive, 
  onClick, 
  onMouseEnter,
  globalMouseX,
  globalMouseY,
  isSidebar
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  globalMouseX: MotionValue<number>;
  globalMouseY: MotionValue<number>;
  isSidebar: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Magnetic Pull
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150, mass: 0.1 });
  const springY = useSpring(y, { damping: 15, stiffness: 150, mass: 0.1 });

  // Elastic Dock Scale (Calculates distance based on axis)
  const [dockScaleValue, setDockScaleValue] = useState(1);
  
  useEffect(() => {
    let unsubscribeX: () => void;
    let unsubscribeY: () => void;

    const updateScale = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = globalMouseX.get();
      const mouseY = globalMouseY.get();

      // Euclidean distance for a more natural circular dock area around the item
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
      
      if (distance > 120) {
        setDockScaleValue(1);
      } else {
        setDockScaleValue(1 + ((120 - distance) / 120) * 0.15); // Max scale 1.15
      }
    };

    unsubscribeX = globalMouseX.on("change", updateScale);
    unsubscribeY = globalMouseY.on("change", updateScale);
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [globalMouseX, globalMouseY]);

  const smoothDockScale = useSpring(dockScaleValue, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      layout
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{ x: springX, y: springY, scale: smoothDockScale }}
      className={`relative flex items-center justify-center gap-2 rounded-full transition-colors duration-300 z-10 group
        ${isSidebar ? "w-12 h-12" : "px-3 py-2 min-w-[100px]"}
        ${isActive ? "text-white" : "text-white/50 hover:text-white/90"}
      `}
    >
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-white/[0.03] rounded-full blur-[2px]" />
      </div>
      {children}
    </motion.button>
  );
}

export default function LiquidNavbar() {
  const [activeTab, setActiveTab] = useState(navItems[0].id);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Global Mouse tracking for Rotation and Dock effect
  const globalMouseX = useMotionValue(0);
  const globalMouseY = useMotionValue(0);
  
  useEffect(() => {
    setIsClient(true);
    globalMouseX.set(window.innerWidth / 2);
    globalMouseY.set(window.innerHeight / 2);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleGlobalMouseMove = (e: MouseEvent) => {
      globalMouseX.set(e.clientX);
      globalMouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [globalMouseX, globalMouseY]);

  // Scroll Behavior
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Switch to sidebar if scrolled past 150px (and not on mobile)
    if (latest > 150 && !isScrolled) setIsScrolled(true);
    if (latest <= 150 && isScrolled) setIsScrolled(false);
  });

  // Calculate if we should render as sidebar
  const renderAsSidebar = isScrolled && !isMobile;

  // Navbar Global Rotation (Only when horizontal)
  const rotateY = useTransform(globalMouseX, (x) => {
    if (!isClient || renderAsSidebar) return 0;
    const progress = x / window.innerWidth;
    return -2 + progress * 4; 
  });
  const smoothRotateY = useSpring(rotateY, { damping: 30, stiffness: 100 });

  // Ambient Reflection (Local to navbar)
  const localMouseX = useTransform(globalMouseX, (val) => {
    if (!navRef.current) return 0;
    const rect = navRef.current.getBoundingClientRect();
    return val - rect.left;
  });
  const localMouseY = useTransform(globalMouseY, (val) => {
    if (!navRef.current) return 0;
    const rect = navRef.current.getBoundingClientRect();
    return val - rect.top;
  });

  const ambientX = useTransform(localMouseX, v => v - 150);
  const ambientY = useTransform(localMouseY, v => v - 150);

  const renderNavItems = (isSidebar: boolean) => (
    navItems.map((item) => (
      <MagneticItem
        key={item.id}
        isActive={activeTab === item.id}
        onClick={() => setActiveTab(item.id)}
        onMouseEnter={() => setHoveredTab(item.id)}
        globalMouseX={globalMouseX}
        globalMouseY={globalMouseY}
        isSidebar={isSidebar}
      >
        <span className="relative z-20 flex items-center justify-center gap-2">
          <motion.div
            className="group-hover:text-cyan-400 transition-colors duration-300 flex items-center justify-center"
            variants={{
              initial: { rotate: 0, scale: 1 },
              hover: { rotate: 5, scale: 1.1 }
            }}
            initial="initial"
            whileHover="hover"
          >
            <item.icon size={isSidebar ? 20 : 16} strokeWidth={2.5} />
          </motion.div>
          
          {!isSidebar && (
            <motion.span 
              className="font-medium text-xs whitespace-nowrap"
              variants={{
                initial: { y: 0 },
                hover: { y: -2 }
              }}
              initial="initial"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {item.label}
            </motion.span>
          )}
        </span>

        {activeTab === item.id && (
          <motion.div
            layoutId={`active-indicator-${isSidebar ? 'side' : 'top'}`}
            transition={{ type: "spring", stiffness: 250, damping: 24, mass: 0.8 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <motion.div
              className="absolute inset-[-2px] bg-gradient-to-r from-indigo-600/90 to-cyan-500/90"
              animate={{
                borderTopLeftRadius: ["24px", "16px", "24px", "24px"],
                borderTopRightRadius: ["16px", "24px", "18px", "16px"],
                borderBottomRightRadius: ["24px", "16px", "24px", "24px"],
                borderBottomLeftRadius: ["18px", "24px", "16px", "18px"],
                scaleX: [1, 1.03, 0.97, 1],
                scaleY: [1, 0.95, 1.04, 1],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 4px 24px rgba(6, 182, 212, 0.4)" }}
            />
          </motion.div>
        )}
        
        {hoveredTab === item.id && activeTab !== item.id && (
          <motion.div
            layoutId={`hover-indicator-${isSidebar ? 'side' : 'top'}`}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute inset-0 bg-white/[0.05] rounded-[24px] z-0 pointer-events-none"
          />
        )}
      </MagneticItem>
    ))
  );

  return (
    <>
      <LiquidCursor isHovering={isHoveringNav} />

      <AnimatePresence mode="wait">
        {!renderAsSidebar ? (
          <motion.nav
            key="top-nav"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            ref={navRef}
            style={{ rotateY: smoothRotateY }}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => {
              setIsHoveringNav(false);
              setHoveredTab(null);
            }}
            className="fixed top-4 left-1/2 -translate-x-1/2 w-max z-50 flex items-center justify-center perspective-1000"
          >
            <motion.div
              className="flex items-center gap-2 px-2 py-1.5 md:py-2 rounded-[40px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] relative"
              animate={{ 
                backgroundColor: sectionColors[activeTab],
                backdropFilter: "blur(30px)"
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-[40px] p-[1px] pointer-events-none overflow-hidden" style={{
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude"
              }}>
                <motion.div 
                  className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(6,182,212,0.3)_30%,rgba(99,102,241,0.5)_50%,rgba(6,182,212,0.3)_70%,transparent_100%)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <AnimatePresence>
                {isHoveringNav && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute w-[300px] h-[300px] bg-white/[0.06] rounded-full blur-[40px] pointer-events-none z-0"
                    style={{ x: ambientX, y: ambientY }}
                  />
                )}
              </AnimatePresence>

              <div className="flex-shrink-0 z-20 pl-4 pr-2">
                <span className="text-white font-bold tracking-tight flex items-center justify-center text-[18px]">
                  Berlin.
                </span>
              </div>

              <div className="flex relative z-20 flex-row items-center gap-1 pr-2">
                {renderNavItems(false)}
              </div>
            </motion.div>
          </motion.nav>
        ) : (
          <motion.nav
            key="side-nav"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            ref={navRef}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => {
              setIsHoveringNav(false);
              setHoveredTab(null);
            }}
            className="fixed top-1/2 left-6 -translate-y-1/2 w-auto h-auto z-50 flex items-center justify-center"
          >
            <motion.div
              className="flex flex-col items-center p-3 rounded-[40px] gap-2 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] relative"
              animate={{ 
                backgroundColor: sectionColors[activeTab],
                backdropFilter: "blur(40px)"
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-[40px] p-[1px] pointer-events-none overflow-hidden" style={{
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude"
              }}>
                <motion.div 
                  className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(6,182,212,0.3)_30%,rgba(99,102,241,0.5)_50%,rgba(6,182,212,0.3)_70%,transparent_100%)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="flex-shrink-0 z-20 mb-4 mt-2">
                <span className="text-white font-bold tracking-tight flex items-center justify-center text-[14px]">
                  B.
                </span>
              </div>

              <div className="flex relative z-20 flex-col gap-2">
                {renderNavItems(true)}
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
