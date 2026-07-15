"use client";

import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function ContactSectionMinimalist() {
  return (
    <footer 
      id="contact" 
      className="w-full bg-[#121212] pt-40 pb-12 px-6 md:px-16 font-sans text-gray-400 selection:bg-gray-800 selection:text-white relative z-20"
    >
      
      {/* Garis Pemisah Super Tipis & Elegan */}
      <div className="w-full max-w-7xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">
        
        {/* Kolom Kiri: Branding & Pesan Singkat */}
        <div className="flex flex-col gap-8 max-w-md">
           
           {/* Indikator Status */}
           <div className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-500">
                System Online
              </span>
           </div>
           
           {/* Branding */}
            <div>
              <h2 className="text-xl md:text-2xl font-light text-white tracking-widest uppercase mb-2">
                 Berlin Sugiyanto
              </h2>
              <p className="text-sm font-light tracking-wider text-gray-500">
                Full-Stack Software Engineer
              </p>
           </div>

           <p className="text-sm leading-relaxed text-gray-500 font-light max-w-sm">
             Designing and building scalable applications, from robust backend architectures to engaging user interfaces. Open for discussions on system architecture, clean code, and new opportunities.
           </p>

        </div>

        {/* Kolom Kanan: Tautan (Links) yang sangat rapi */}
        <div className="flex flex-wrap md:flex-nowrap gap-12 md:gap-20 text-xs tracking-[0.2em] uppercase font-medium">
           
           {/* Grup Tautan 1 */}
           <div className="flex flex-col gap-5">
              <span className="text-gray-600 mb-2 font-bold">Connect</span>
              <a 
                href={`mailto:${portfolioData.email}`} 
                className="group flex items-center gap-1 hover:text-white transition-colors duration-300"
              >
                Email
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
              <a 
                href={portfolioData.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-1 hover:text-white transition-colors duration-300"
              >
                LinkedIn
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
              <a 
                href={portfolioData.discord} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-1 hover:text-white transition-colors duration-300"
              >
                Discord
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
           </div>

           {/* Grup Tautan 2 */}
           <div className="flex flex-col gap-5">
              <span className="text-gray-600 mb-2 font-bold">Explore</span>
              <a 
                href={portfolioData.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-1 hover:text-white transition-colors duration-300"
              >
                GitHub
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
           </div>

           {/* Grup Info 3 */}
           <div className="flex flex-col gap-5">
              <span className="text-gray-600 mb-2 font-bold">Location</span>
              <span className="text-gray-400">{portfolioData.location || "Bekasi, ID"}</span>
              <span className="text-gray-600 mt-auto pt-5 border-t border-white/5 w-max">
                © {new Date().getFullYear()}
              </span>
           </div>

        </div>

      </div>
    </footer>
  );
}
