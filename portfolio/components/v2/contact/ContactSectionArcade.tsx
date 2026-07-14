"use client";

import { portfolioData } from "@/data/portfolio";

export default function ContactSectionArcade() {
  return (
    <section 
      id="contact" 
      className="relative w-full min-h-[90vh] bg-black flex flex-col items-center justify-center font-mono uppercase text-[#39ff14] overflow-hidden selection:bg-[#ff00ff] selection:text-white"
    >
      
      {/* 
        CRT Scanline & Flicker Overlay 
        Menciptakan efek visual seperti layar TV tabung atau mesin dingdong jadul
      */}
      <div 
        className="absolute inset-0 z-40 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 3px)"
        }}
      />
      
      {/* Vignette / TV Tube Shadow Effect */}
      <div className="absolute inset-0 z-30 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center px-4 md:px-12 py-12">
        
        {/* Arcade Score Header */}
        <div className="w-full flex justify-between text-xs md:text-lg mb-16 text-[#ff00ff] font-bold tracking-widest px-4">
           <div className="text-left">
             <p className="mb-2">1UP</p>
             <p className="animate-[pulse_1.5s_ease-in-out_infinite]">999900</p>
           </div>
           <div className="text-center hidden md:block">
             <p className="mb-2">LEVEL</p>
             <p>99</p>
           </div>
           <div className="text-right">
             <p className="mb-2">HIGH SCORE</p>
             <p>999900</p>
           </div>
        </div>

        {/* Massive 8-Bit Title */}
        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-bold mb-10 text-[#00ffff] drop-shadow-[4px_4px_0_rgba(255,0,255,0.7)] leading-tight tracking-tighter">
           INSERT COIN
           <br />
           <span className="text-[#39ff14] drop-shadow-[4px_4px_0_rgba(0,255,255,0.7)]">TO CONNECT</span>
        </h2>

        {/* Blinking Call to Action */}
        <p className="mb-16 text-lg md:text-2xl animate-[pulse_1s_ease-in-out_infinite] text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)] font-bold tracking-widest">
           &gt; PUSH ANY BUTTON &lt;
        </p>

        {/* 8-Bit Buttons Array */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full justify-center items-center mt-4">
           
           {/* Email Button (Green) */}
           <a 
            href={`mailto:${portfolioData.email}`} 
            className="relative group w-full md:w-auto"
           >
              {/* Retro Block Shadow */}
              <div className="absolute inset-0 bg-[#39ff14]/40 translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-150" />
              
              {/* Button Body */}
              <div className="relative border-4 border-[#39ff14] bg-black px-10 py-5 text-xl md:text-2xl font-bold text-[#39ff14] hover:bg-[#39ff14] hover:text-black transition-colors duration-150 group-hover:translate-x-2 group-hover:translate-y-2">
                 EMAIL
              </div>
           </a>

           {/* GitHub Button (Pink) */}
           <a 
            href={portfolioData.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group w-full md:w-auto"
           >
              <div className="absolute inset-0 bg-[#ff00ff]/40 translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-150" />
              
              <div className="relative border-4 border-[#ff00ff] bg-black px-10 py-5 text-xl md:text-2xl font-bold text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black transition-colors duration-150 group-hover:translate-x-2 group-hover:translate-y-2">
                 GITHUB
              </div>
           </a>

           {/* LinkedIn Button (Cyan) */}
           <a 
            href={portfolioData.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group w-full md:w-auto"
           >
              <div className="absolute inset-0 bg-[#00ffff]/40 translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-150" />
              
              <div className="relative border-4 border-[#00ffff] bg-black px-10 py-5 text-xl md:text-2xl font-bold text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-colors duration-150 group-hover:translate-x-2 group-hover:translate-y-2">
                 LINKEDIN
              </div>
           </a>

        </div>

        {/* Arcade Footer / Credits */}
        <div className="mt-32 text-xs md:text-sm text-gray-500 font-bold tracking-widest flex flex-col md:flex-row justify-between w-full px-8">
           <p>SYSTEM REVISION: 2026.1</p>
           <p className="mt-4 md:mt-0 text-[#ff00ff] animate-pulse">CREDITS: 99</p>
        </div>

      </div>
    </section>
  );
}
