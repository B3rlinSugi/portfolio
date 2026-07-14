"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Komponen Reusable untuk Baris Marquee
const MarqueeRow = ({ 
  text, 
  direction = "left", 
  duration = 20,
  isOutlined = false
}: {
  text: string;
  direction?: "left" | "right";
  duration?: number;
  isOutlined?: boolean;
}) => {
  return (
    <div className="w-full overflow-hidden flex whitespace-nowrap py-2 md:py-4 border-y border-white/10 group-hover:bg-white transition-colors duration-500">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      >
        {/* Set 1 */}
        <div className="flex items-center">
          <span 
            className={`text-[12vw] leading-none font-black uppercase px-4 md:px-8 group-hover:text-black transition-colors duration-500 ${isOutlined ? 'text-transparent' : 'text-white'}`}
            style={isOutlined ? { WebkitTextStroke: '2px currentColor' } : {}}
          >
            {text}
          </span>
          <span className="text-[8vw] text-[#ccff00]">✦</span>
          <span 
            className={`text-[12vw] leading-none font-black uppercase px-4 md:px-8 group-hover:text-black transition-colors duration-500 ${!isOutlined ? 'text-transparent' : 'text-white'}`}
            style={!isOutlined ? { WebkitTextStroke: '2px currentColor' } : {}}
          >
            {text}
          </span>
          <span className="text-[8vw] text-[#ccff00]">✦</span>
        </div>
        
        {/* Set 2 (Duplicate for seamless loop) */}
        <div className="flex items-center">
          <span 
            className={`text-[12vw] leading-none font-black uppercase px-4 md:px-8 group-hover:text-black transition-colors duration-500 ${isOutlined ? 'text-transparent' : 'text-white'}`}
            style={isOutlined ? { WebkitTextStroke: '2px currentColor' } : {}}
          >
            {text}
          </span>
          <span className="text-[8vw] text-[#ccff00]">✦</span>
          <span 
            className={`text-[12vw] leading-none font-black uppercase px-4 md:px-8 group-hover:text-black transition-colors duration-500 ${!isOutlined ? 'text-transparent' : 'text-white'}`}
            style={!isOutlined ? { WebkitTextStroke: '2px currentColor' } : {}}
          >
            {text}
          </span>
          <span className="text-[8vw] text-[#ccff00]">✦</span>
        </div>
      </motion.div>
    </div>
  );
};

export default function ContactSectionMarquee() {
  return (
    <section id="contact" className="w-full bg-[#050505] min-h-screen py-24 flex flex-col justify-center overflow-hidden font-sans selection:bg-[#ccff00] selection:text-black relative">
      
      <div className="text-center mb-10 px-4">
         <p className="text-[#ccff00] font-bold tracking-[0.3em] uppercase text-sm md:text-base">
            Don't be a stranger
         </p>
      </div>

      {/* Giant Clickable Marquee Area */}
      <a 
        href={`mailto:${portfolioData.email}`} 
        className="group relative block w-full cursor-pointer"
        title="Click to send an email"
      >
        <div className="flex flex-col transform -rotate-2 scale-105 my-10">
          <MarqueeRow text="LET'S BUILD SOMETHING" direction="left" duration={25} />
          <MarqueeRow text="DROP ME A MESSAGE" direction="right" duration={30} isOutlined={true} />
          <MarqueeRow text="START A PROJECT" direction="left" duration={20} />
        </div>
        
        {/* Hover Overlay Text */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
           <div className="bg-[#ccff00] text-black px-8 py-4 rounded-full text-2xl font-black uppercase tracking-widest flex items-center gap-4 shadow-[0_0_50px_rgba(204,255,0,0.5)] transform scale-50 group-hover:scale-100 transition-transform duration-500">
              Send Email <ArrowRight className="w-8 h-8" />
           </div>
        </div>
      </a>

      {/* Footer / Social Links */}
      <div className="mt-20 px-8 md:px-16 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-12">
         
         <div className="flex items-center gap-6">
            <a 
              href={portfolioData.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-[#ccff00] hover:text-black hover:scale-110 transition-all duration-300"
            >
               <FaGithub className="w-7 h-7" />
            </a>
            <a 
              href={portfolioData.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-[#ccff00] hover:text-black hover:scale-110 transition-all duration-300"
            >
               <FaLinkedin className="w-7 h-7" />
            </a>
         </div>

         <div className="text-center md:text-right">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{portfolioData.email}</h3>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Jakarta, Indonesia</p>
         </div>

      </div>

    </section>
  );
}
