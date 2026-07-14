"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroCinematic() {
  return (
    <section className="relative w-full min-h-screen bg-[#121212] text-[#E0E0E0] overflow-hidden flex items-center justify-center selection:bg-[#D4AF37]/30">
      
      {/* Full Bleed Container */}
      <div className="relative w-full h-full min-h-screen flex items-center justify-center">
        
        {/* Soft Golden Glow Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#D4AF37]/5 rounded-full blur-[100px] md:blur-[150px]" />
        </div>

        {/* Cinematic Window Shadow (Blinds effect) */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none opacity-50 mix-blend-multiply"
          style={{
            background: 'repeating-linear-gradient(-45deg, transparent, transparent 120px, rgba(0,0,0,0.6) 120px, rgba(0,0,0,0.6) 160px)',
            maskImage: 'radial-gradient(ellipse at center, transparent 10%, black 100%)'
          }}
        />
        
        {/* Giant Background Text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute z-10 w-full text-center select-none flex justify-center"
        >
          <h1 className="text-[22vw] leading-none font-black text-[#D4AF37]/30 tracking-tighter uppercase whitespace-nowrap drop-shadow-2xl">
            BACKEND
          </h1>
        </motion.div>

        {/* Floating Typography: Top Left */}
        <div className="absolute top-28 left-8 lg:top-32 lg:left-12 z-30 flex flex-col gap-1 hidden md:flex">
          <h2 className="text-[#D4AF37] font-bold text-xl lg:text-2xl tracking-widest uppercase">Berlin Sugiyanto</h2>
          <p className="text-gray-400 font-light text-xs lg:text-sm tracking-[0.2em] uppercase">Logic & Layers</p>
        </div>

        {/* Floating Typography: Top Right */}
        <div className="absolute top-28 right-8 lg:top-32 lg:right-12 z-30 text-right hidden md:block">
          <p className="text-gray-400 font-light text-xs lg:text-sm tracking-[0.1em]">Design that speaks.</p>
          <p className="text-gray-400 font-light text-xs lg:text-sm tracking-[0.1em]">Systems that scale.</p>
        </div>

        {/* Floating Typography: Bottom Left */}
        <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-30 max-w-sm lg:max-w-xl hidden md:block">
          <p className="text-gray-400/80 text-xs lg:text-sm leading-relaxed font-light">
            Between creativity and logic lies the space where I code. From building robust APIs to shaping digital presence, my work revolves around clarity, structure, and seamless integrations. I help businesses express their data with precision and scalability.
          </p>
        </div>

        {/* Floating Typography: Bottom Right */}
        <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-30 text-right hidden md:block">
          <h3 className="text-[#D4AF37] font-bold text-2xl lg:text-5xl tracking-tighter uppercase">SOFTWARE ENGINEER</h3>
        </div>

        {/* Portrait Subject */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-[90%] md:w-[70%] max-w-[650px] h-[80vh] flex items-end justify-center pointer-events-none mt-20 md:mt-32"
        >
          <div 
            className="absolute inset-0 w-full h-full mix-blend-normal"
            style={{
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
              maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)'
            }}
          >
            <Image 
              src="/berlin.png" 
              alt="Berlin Sugiyanto"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_0_80px_rgba(212,175,55,0.15)]"
            />
          </div>
        </motion.div>

        {/* Mobile View Typography Fallbacks */}
        <div className="absolute bottom-6 w-full px-6 flex flex-col gap-2 z-30 md:hidden items-center text-center">
          <h2 className="text-[#D4AF37] font-bold text-lg tracking-widest uppercase">Berlin Sugiyanto</h2>
          <h3 className="text-white font-bold text-2xl tracking-tighter uppercase">Software Engineer</h3>
          <p className="text-gray-400 text-[10px] leading-relaxed font-light mt-2 max-w-[280px]">
            Building robust APIs, shaping seamless integrations, and writing code with precision.
          </p>
        </div>

      </div>
    </section>
  );
}
