"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [startZoom, setStartZoom] = useState(false);

  // Prevent scroll via wheel, touch, and keyboard
  const preventScroll = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const preventKeyScroll = useCallback((e: KeyboardEvent) => {
    const scrollKeys = ["ArrowDown", "ArrowUp", "Space", "PageDown", "PageUp", "Home", "End"];
    if (scrollKeys.includes(e.key) || scrollKeys.includes(e.code)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  useEffect(() => {
    // Prevent browser auto-scroll restoration on refresh
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Force scroll to top
    window.scrollTo(0, 0);

    // Lock body overflow
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Block all scroll events during splash
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeyScroll, { passive: false });
    
    // Timeline:
    // 0s - 2.0s: Hold the massive text
    // 2.0s - 4.8s: Zoom massively into the letter and fade out
    // 5.0s: Unmount and unlock scroll
    
    const timers = [
      setTimeout(() => setStartZoom(true), 2000),
      setTimeout(() => {
        setShowSplash(false);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", preventKeyScroll);
      }, 5000)
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
    };
  }, [preventScroll, preventKeyScroll]);

  if (!showSplash) return null;

  return (
    // mix-blend-multiply makes the black background solid, but the white text acts as a transparent window to the page beneath it!
    <motion.div 
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden bg-black"
      style={{ mixBlendMode: "multiply" }}
      animate={startZoom ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1.0, delay: 1.8, ease: "easeIn" }} // Fade out the entire mask near the end of the zoom
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <motion.div
        className="text-white font-black tracking-tighter flex items-center justify-center whitespace-nowrap"
        style={{ 
          fontSize: "25vw", // Very massive text
          lineHeight: 0.8,
          // Transform origin pointing roughly to the center of the letter 'R' in "BERLIN"
          // so when it scales, it zooms directly through the letter's shape.
          transformOrigin: "40% 50%" 
        }}
        initial={{ scale: 1 }}
        animate={
          startZoom 
            ? { scale: 120 } // Massive scale multiplier
            : { scale: 1 }
        }
        transition={{ 
          duration: 2.8, 
          ease: [0.5, 0, 0.2, 1], // Slower, smoother cinematic ease
        }}
      >
        BERLIN
      </motion.div>
    </motion.div>
  );
};

