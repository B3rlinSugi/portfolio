"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLaravel, FaPhp } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql, SiMysql } from "react-icons/si";
import { AuroraText } from "@/components/ui/aurora-text";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function HeroContent() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start justify-center w-full"
    >
      
      {/* 1. Availability Badge (Kept from previous spec as it might still be wanted, but wait, the screenshot doesn't have it. I'll remove it to be "sama persis" as requested) */}

      {/* 2. Main Headline */}
      <motion.h1 
        variants={itemVariants}
        className="text-[48px] md:text-[64px] lg:text-[76px] font-bold leading-[1.05] tracking-tight text-gray-900 mb-6"
      >
        I'm <AuroraText>Berlin</AuroraText>,<br/>
        <span className="whitespace-nowrap">Backend Developer</span>
      </motion.h1>

      {/* 3. Short Description */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">
          Clean Code. Scalable Systems. Real Impact.
        </h2>
        <p className="text-lg font-normal text-gray-500 max-w-[480px] leading-relaxed">
          I help businesses build reliable backend systems with clean architecture and modern technologies.
        </p>
      </motion.div>

      {/* 4. CTA Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16 w-full sm:w-auto"
      >
        {/* Primary Button */}
        <button 
          className="h-14 px-8 bg-gradient-to-r from-[#B04AF3] to-[#864DF4] hover:from-[#9D3EE3] hover:to-[#733EE3] text-white rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(139,92,246,0.3)] motion-reduce:hover:translate-y-0 w-full sm:w-auto"
          aria-label="See My Projects"
        >
          See My Projects
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform motion-reduce:group-hover:translate-x-0" />
        </button>

        {/* Secondary Button */}
        <button 
          className="h-14 px-8 bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-white text-gray-800 rounded-full font-semibold text-base shadow-sm transition-all duration-300 flex items-center justify-center gap-3 group hover:-translate-y-1 hover:shadow-md motion-reduce:hover:translate-y-0 w-full sm:w-auto"
          aria-label="Download CV"
        >
          <Download size={18} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
          Download CV
        </button>
      </motion.div>

      {/* 5. Trust Logos */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col gap-5 w-full"
      >
        <span className="text-sm text-gray-500 font-semibold tracking-wide">Trusted by ideas. Proven by code.</span>
        
        <div className="flex items-center gap-4">
          {[
            { Icon: FaPhp, title: "PHP", colorClass: "group-hover:text-[#777BB4]" },
            { Icon: FaLaravel, title: "Laravel", colorClass: "group-hover:text-[#FF2D20]" },
            { Icon: SiMysql, title: "MySQL", colorClass: "group-hover:text-[#4479A1]" },
            { Icon: FaGithub, title: "GitHub", colorClass: "group-hover:text-[#181717]" },
            { Icon: SiNextdotjs, title: "Next.js", colorClass: "group-hover:text-black" },
          ].map((item, idx) => (
            <div key={idx} className="relative group flex justify-center">
              
              {/* Icon Circle */}
              <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer">
                <item.Icon size={22} className={`text-gray-500 transition-colors duration-300 ${item.colorClass}`} />
              </div>

              {/* Custom Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 group-hover:-top-12 transition-all duration-300 pointer-events-none z-50">
                <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg relative">
                  {item.title}
                  {/* Tooltip arrow */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
