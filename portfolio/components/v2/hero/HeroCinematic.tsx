"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaPhp, FaLaravel, FaJava, FaReact } from "react-icons/fa";
import { SiSpringboot, SiMysql, SiTypescript } from "react-icons/si";

export default function HeroCinematic() {
  return (
    <section className="relative w-full min-h-screen bg-[#121212] text-[#E0E0E0] overflow-hidden flex items-center justify-center selection:bg-white/20">
      
      {/* Full Bleed Container */}
      <div className="relative w-full h-full min-h-screen flex items-center justify-center">
        
        {/* Soft Glow Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white/5 rounded-full blur-[100px] md:blur-[150px]" />
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
          className="absolute z-10 w-full text-center select-none flex flex-col justify-center items-center"
        >
          <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase whitespace-nowrap drop-shadow-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-white/5 text-transparent bg-clip-text">
            FULL-STACK<br/>WEB DEVELOPER
          </h1>
        </motion.div>

        {/* Floating Typography: Top Left */}
        <div className="absolute top-28 left-8 lg:top-32 lg:left-12 z-30 flex flex-col gap-1 hidden md:flex">
          <h2 className="text-white font-bold text-xl lg:text-2xl tracking-widest uppercase">Berlin Sugiyanto</h2>
          <p className="text-gray-400 font-light text-xs lg:text-sm tracking-[0.2em]">WEB SYSTEMS & APIs</p>
        </div>

        {/* Floating Typography: Top Right */}
        <div className="absolute top-28 right-8 lg:top-32 lg:right-12 z-30 text-right hidden md:block">
          <p className="text-gray-400 font-light text-xs lg:text-sm tracking-[0.1em] uppercase">Logic that connects.</p>
          <p className="text-gray-400 font-light text-xs lg:text-sm tracking-[0.1em] uppercase">Systems that scale.</p>
        </div>

        {/* Floating Typography: Bottom Left (Tech Stack Logos) */}
        <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-30 hidden md:block">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4 font-bold">Core Stack</p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="group relative">
              <FaPhp className="w-8 h-8 text-gray-400 hover:text-[#777BB4] transition-colors cursor-pointer" />
            </div>
            <div className="group relative">
              <FaLaravel className="w-8 h-8 text-gray-400 hover:text-[#FF2D20] transition-colors cursor-pointer" />
            </div>
            <div className="group relative">
              <FaJava className="w-8 h-8 text-gray-400 hover:text-[#007396] transition-colors cursor-pointer" />
            </div>
            <div className="group relative">
              <SiSpringboot className="w-8 h-8 text-gray-400 hover:text-[#6DB33F] transition-colors cursor-pointer" />
            </div>
            <div className="group relative">
              <SiMysql className="w-8 h-8 text-gray-400 hover:text-[#4479A1] transition-colors cursor-pointer" />
            </div>
            <div className="group relative">
              <SiTypescript className="w-7 h-7 text-gray-400 hover:text-[#3178C6] transition-colors cursor-pointer" />
            </div>
            <div className="group relative">
              <FaReact className="w-8 h-8 text-gray-400 hover:text-[#61DAFB] transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Floating Typography: Bottom Right */}
        <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-30 text-right hidden md:block">
          <h3 className="font-bold text-2xl lg:text-5xl tracking-tighter uppercase bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-sm">SOFTWARE ENGINEER</h3>
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
              className="object-contain object-bottom drop-shadow-[0_0_80px_rgba(255,255,255,0.08)]"
            />
          </div>
        </motion.div>

        {/* Mobile View Typography Fallbacks */}
        <div className="absolute bottom-6 w-full px-6 flex flex-col gap-3 z-30 md:hidden items-center text-center">
          <h2 className="text-white font-bold text-lg tracking-widest uppercase">Berlin Sugiyanto</h2>
          <h3 className="font-bold text-2xl tracking-tighter uppercase bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Software Engineer</h3>
          <div className="flex flex-wrap justify-center gap-3 mt-1">
            <FaPhp className="w-5 h-5 text-gray-400" />
            <FaLaravel className="w-5 h-5 text-gray-400" />
            <SiSpringboot className="w-5 h-5 text-gray-400" />
            <SiMysql className="w-5 h-5 text-gray-400" />
            <FaReact className="w-5 h-5 text-gray-400" />
          </div>
        </div>

      </div>
    </section>
  );
}
