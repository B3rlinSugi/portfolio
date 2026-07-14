"use client";

import HeroContent from "./hero/HeroContent";
import HeroVisual from "./hero/HeroVisual";

export default function Hero() {
  return (
    <section 
      aria-label="Introduction"
      className="relative w-full min-h-screen bg-gradient-to-r from-[#F5EAF8] via-[#EFE0F3] to-[#EAD8F3] overflow-hidden flex items-center justify-center pt-32 pb-12 lg:py-0"
    >
      
      {/* Soft Premium Gradients (Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft light background shape on the right (from mockup) */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#D4BBE6] to-transparent opacity-80" />
        <div className="absolute -top-[10%] right-[-10%] w-[800px] h-[800px] bg-fuchsia-300 rounded-full blur-[150px] opacity-30 mix-blend-multiply motion-reduce:hidden" />
      </div>

      {/* Grid Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-full flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 lg:min-h-screen">
        
        {/* Left Side: Content (7 Columns / ~58%) */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full order-2 lg:order-1 mt-8 lg:mt-24 pb-20 lg:pb-0 relative z-20">
          <HeroContent />
        </div>

        {/* Right Side: Visual (5 Columns / ~42%) */}
        <div className="lg:col-span-5 relative flex items-end justify-center h-[50vh] lg:h-full order-1 lg:order-2 z-10 pointer-events-none lg:pointer-events-auto">
          <HeroVisual />
        </div>

      </div>
    </section>
  );
}
