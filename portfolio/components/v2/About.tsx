"use client";

import AboutContent from "./about/AboutContent";
import AboutVisual from "./about/AboutVisual";
import ExpertiseList from "./about/ExpertiseList";
import EngineeringStats from "./about/EngineeringStats";

export default function About() {
  return (
    <section 
      id="about" 
      aria-label="About Me"
      className="relative w-full min-h-screen bg-gradient-to-r from-[#F5EAF8] via-[#EFE0F3] to-[#EAD8F3] text-gray-900 overflow-hidden py-20 lg:py-32 selection:bg-orange-500/30"
    >
      {/* Background Soft Gradients to match Hero */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#D4BBE6] to-transparent opacity-80" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-300 rounded-full blur-[120px] opacity-20 mix-blend-multiply motion-reduce:hidden" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Two-Column Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (5 columns on desktop) */}
          <div className="w-full lg:col-span-5 flex flex-col h-full justify-center">
            <AboutContent />
          </div>

          {/* Right Column (7 columns on desktop) */}
          <div className="w-full lg:col-span-7 flex flex-col xl:flex-row items-center gap-12 lg:gap-16 relative h-full">
            
            {/* Portrait (Takes up left part of the right column) */}
            <div className="w-full xl:w-5/12 flex justify-center xl:justify-start">
              <AboutVisual />
            </div>

            {/* Expertise Cards (Takes up right part of the right column) */}
            <div className="w-full xl:w-7/12 flex justify-center xl:justify-end">
              <ExpertiseList />
            </div>
            
          </div>
          
        </div>

      </div>
    </section>
  );
}
