"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutVisual() {
  const { scrollY } = useScroll();
  // Max parallax movement is 20px up/down
  const y = useTransform(scrollY, [0, 1500], [0, 20]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      
      {/* Background Organic Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-orange-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Decorative Radar/Grid Lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[450px] h-[450px] rounded-full border border-orange-500/20 border-dashed" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-orange-500/10" />
      </div>

      {/* Portrait Container */}
      <motion.div 
        style={{ y }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[380px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-sm border border-white/60 bg-white/40"
      >
        <Image
          src="/sugi.png?v=2" 
          alt="Berlin Sugiyanto - Portrait"
          fill
          priority
          unoptimized={true}
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover object-top"
          style={{
            // Apply a subtle linear mask to hide the hard bottom edge if any
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
          }}
        />
        
        {/* Soft overlay gradient to blend into the light background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#EAD8F3] via-transparent to-transparent opacity-80 pointer-events-none" />
      </motion.div>

    </div>
  );
}
