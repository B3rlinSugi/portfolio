"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function GithubSectionCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 w-full bg-[#121212] flex flex-col items-center justify-center overflow-hidden z-10 px-4 md:px-8">
      
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B00] rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div className="text-left">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white tracking-tight"
            >
              GitHub <span className="text-[#FF6B00]">Activity</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-gray-400 max-w-xl text-base"
            >
              Swipe through my real-time open-source metrics and contributions.
            </motion.p>
          </div>

          {/* Navigation Buttons (Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex gap-3"
          >
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-full"
        >
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4 px-2 -mx-2 items-center"
            style={{ scrollBehavior: 'smooth' }}
          >
            
            {/* Card 1: Stats */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[450px] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4 w-full text-left">Overview</h3>
              <img 
                src="https://github-readme-stats-sigma-five.vercel.app/api?username=B3rlinSugi&theme=tokyonight&hide_border=true&bg_color=transparent&title_color=FF6B00&icon_color=FFB000&text_color=8B949E&show_icons=true&count_private=true" 
                alt="GitHub Stats" 
                className="w-full h-auto object-contain"
                draggable={false}
              />
            </div>

            {/* Card 2: Languages */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[450px] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4 w-full text-left">Languages</h3>
              <img 
                src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=B3rlinSugi&layout=compact&theme=tokyonight&hide_border=true&bg_color=transparent&title_color=FF6B00&text_color=8B949E" 
                alt="Top Languages" 
                className="w-full h-auto object-contain"
                draggable={false}
              />
            </div>

            {/* Card 3: Streak */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[450px] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4 w-full text-left">Streak</h3>
              <img 
                src="https://streak-stats.demolab.com?user=B3rlinSugi&theme=tokyonight&hide_border=true&background=transparent&ring=FF6B00&fire=FFB000&currStreakLabel=FF6B00" 
                alt="GitHub Streak" 
                className="w-full h-auto object-contain"
                draggable={false}
              />
            </div>

            {/* Card 4: Snake Graph (Wider) */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[800px] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4 w-full text-left">Contribution Graph</h3>
              <div className="w-full overflow-x-auto scrollbar-hide">
                <img 
                  src="https://raw.githubusercontent.com/B3rlinSugi/B3rlinSugi/output/github-contribution-grid-snake-dark.svg" 
                  alt="GitHub Contribution Snake Animation" 
                  className="min-w-[700px] w-full h-auto object-contain"
                  draggable={false}
                />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
