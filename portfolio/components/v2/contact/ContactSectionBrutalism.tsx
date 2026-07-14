"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function ContactSectionBrutalism() {
  return (
    <section id="contact" className="w-full min-h-screen bg-[#050505] text-[#f4f4f0] py-24 px-4 md:px-12 flex flex-col justify-between uppercase font-sans selection:bg-[#ccff00] selection:text-[#050505]">
      
      {/* Top / Title Area */}
      <div className="mb-24 md:mb-32">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-4 h-4 bg-[#ccff00] rounded-full animate-pulse" />
          <p className="text-lg md:text-2xl font-bold tracking-widest text-gray-400">
            [ CONTACT MODULE ]
          </p>
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[4rem] md:text-[8rem] lg:text-[11rem] font-black leading-[0.85] tracking-tighter cursor-default"
        >
          LET'S BUILD
          <br />
          <span 
            className="text-transparent hover:text-[#ccff00] transition-colors duration-300" 
            style={{ WebkitTextStroke: '2px #f4f4f0' }}
          >
            SOMETHING.
          </span>
        </motion.h2>
      </div>

      {/* Massive Links Area */}
      <div className="flex flex-col gap-8 md:gap-12 w-full">
        
        {/* Email Link */}
        <motion.a 
          href={`mailto:${portfolioData.email}`}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group relative flex items-center justify-between w-full md:w-max border-b-4 border-transparent hover:border-[#ccff00] pb-2 transition-all duration-300"
        >
          <span className="text-5xl md:text-[7rem] font-black tracking-tighter group-hover:text-[#ccff00] transition-colors duration-300 flex items-center gap-4 md:gap-8">
            EMAIL
            <ArrowUpRight className="w-10 h-10 md:w-20 md:h-20 opacity-0 group-hover:opacity-100 transform -translate-x-10 group-hover:translate-x-0 transition-all duration-500" />
          </span>
        </motion.a>

        {/* GitHub Link */}
        <motion.a 
          href={portfolioData.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative flex items-center justify-between w-full md:w-max border-b-4 border-transparent hover:border-[#ccff00] pb-2 transition-all duration-300"
        >
          <span className="text-5xl md:text-[7rem] font-black tracking-tighter group-hover:text-[#ccff00] transition-colors duration-300 flex items-center gap-4 md:gap-8">
            GITHUB
            <ArrowUpRight className="w-10 h-10 md:w-20 md:h-20 opacity-0 group-hover:opacity-100 transform -translate-x-10 group-hover:translate-x-0 transition-all duration-500" />
          </span>
        </motion.a>

        {/* LinkedIn Link */}
        <motion.a 
          href={portfolioData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group relative flex items-center justify-between w-full md:w-max border-b-4 border-transparent hover:border-[#ccff00] pb-2 transition-all duration-300"
        >
          <span className="text-5xl md:text-[7rem] font-black tracking-tighter group-hover:text-[#ccff00] transition-colors duration-300 flex items-center gap-4 md:gap-8">
            LINKEDIN
            <ArrowUpRight className="w-10 h-10 md:w-20 md:h-20 opacity-0 group-hover:opacity-100 transform -translate-x-10 group-hover:translate-x-0 transition-all duration-500" />
          </span>
        </motion.a>

      </div>

      {/* Footer Area */}
      <div className="mt-32 flex flex-col md:flex-row justify-between items-start md:items-end border-t-2 border-white/20 pt-10 text-sm md:text-xl font-bold tracking-widest gap-4">
        <p className="text-gray-400">© 2026 BERLIN SUGIYANTO.</p>
        <p className="text-gray-400">OPERATING FROM JAKARTA, ID.</p>
        <p className="text-gray-400">STATUS: <span className="text-[#ccff00]">ONLINE</span></p>
      </div>

    </section>
  );
}
