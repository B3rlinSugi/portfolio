"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactSectionExpanding() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const panels = [
    {
      id: 0,
      title: "EMAIL",
      icon: <Mail className="w-10 h-10 md:w-14 md:h-14" />,
      desc: "Start a conversation",
      link: `mailto:${portfolioData.email}`,
      bg: "bg-[#050505]",
      hoverBg: "hover:bg-[#111111]",
      brandColor: "text-emerald-400"
    },
    {
      id: 1,
      title: "GITHUB",
      icon: <FaGithub className="w-10 h-10 md:w-14 md:h-14" />,
      desc: "Explore the codebase",
      link: portfolioData.github,
      bg: "bg-[#0a0a0a]",
      hoverBg: "hover:bg-[#151515]",
      brandColor: "text-white"
    },
    {
      id: 2,
      title: "LINKEDIN",
      icon: <FaLinkedin className="w-10 h-10 md:w-14 md:h-14" />,
      desc: "Professional network",
      link: portfolioData.linkedin,
      bg: "bg-[#0f0f0f]",
      hoverBg: "hover:bg-[#0077b5]/10", // Subtle LinkedIn blue tint
      brandColor: "text-[#0077b5]"
    }
  ];

  return (
    <section 
      id="contact" 
      className="w-full h-screen min-h-[600px] flex flex-col md:flex-row bg-black overflow-hidden font-sans border-t border-white/10"
    >
       {panels.map((panel, idx) => {
         const isHovered = hoveredIndex === idx;
         // Jika tidak ada yang di-hover, biarkan mereka flex-1.
         // Jika ada yang di-hover, yang di-hover jadi flex-grow lebih besar, sisanya mengecil.
         const flexClass = hoveredIndex === null 
            ? "flex-1" 
            : isHovered 
                ? "flex-[3] md:flex-[4]" 
                : "flex-[0.5] md:flex-[0.5]";

         return (
           <a
             key={panel.id}
             href={panel.link}
             target={idx > 0 ? "_blank" : undefined}
             rel={idx > 0 ? "noopener noreferrer" : undefined}
             onMouseEnter={() => setHoveredIndex(idx)}
             onMouseLeave={() => setHoveredIndex(null)}
             className={`relative group ${panel.bg} ${panel.hoverBg} border-b md:border-b-0 md:border-r border-white/5 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center overflow-hidden cursor-pointer ${flexClass}`}
           >
              {/* Garis Accent Top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10 group-hover:bg-white/50 transition-colors duration-500" />

              {/* === STATE 1: COLLAPSED (atau DEFAULT saat tidak ada hover) === */}
              <div 
                className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center transition-opacity duration-500
                  ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
              >
                 <div className={`text-gray-600 transition-colors duration-500 group-hover:${panel.brandColor.split(' ')[0]} mb-4 md:mb-0`}>
                   {panel.icon}
                 </div>
                 
                 {/* Teks Vertikal di Desktop, Teks Horizontal di Mobile */}
                 <span 
                   className="md:hidden mt-2 text-xl font-bold tracking-widest text-gray-700"
                 >
                   {panel.title}
                 </span>
                 <span 
                   className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold tracking-widest text-gray-700/50 rotate-180 pointer-events-none whitespace-nowrap" 
                   style={{ writingMode: 'vertical-rl' }}
                 >
                   {panel.title}
                 </span>
              </div>

              {/* === STATE 2: EXPANDED (Muncul perlahan saat di-hover) === */}
              <div 
                className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 transition-all duration-[800ms]
                  ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}
                `}
              >
                 <div className={`mb-6 ${panel.brandColor} drop-shadow-[0_0_15px_currentColor]`}>
                   {panel.icon}
                 </div>
                 
                 <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight uppercase">
                   {panel.title}
                 </h2>
                 
                 <p className="text-gray-400 text-lg md:text-2xl mb-8 font-light max-w-xs">
                   {panel.desc}
                 </p>
                 
                 <div className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                   CONNECT <ArrowUpRight className="w-4 h-4" />
                 </div>
              </div>
           </a>
         )
       })}
    </section>
  );
}
