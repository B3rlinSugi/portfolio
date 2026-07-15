"use client";

import { motion } from "framer-motion";

export default function GithubSectionGrid() {
  return (
    <section className="relative py-20 w-full bg-[#121212] flex flex-col items-center justify-center overflow-hidden z-10 px-4">
      
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF6B00] blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            GitHub <span className="text-[#FF6B00]">Activity</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-gray-400 max-w-xl mx-auto text-sm md:text-base"
          >
            A dense, comprehensive dashboard of my open-source contributions.
          </motion.p>
        </div>

        {/* Dense Grid Dashboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          
          {/* Top Row: Stats, Languages, Streak */}
          <div className="col-span-1 flex justify-center bg-black/40 border border-white/5 rounded-xl p-3">
            <img 
              src="https://github-readme-stats-sigma-five.vercel.app/api?username=B3rlinSugi&theme=tokyonight&hide_border=true&bg_color=transparent&title_color=FF6B00&icon_color=FFB000&text_color=8B949E&show_icons=true&count_private=true" 
              alt="GitHub Stats" 
              className="w-full h-full max-h-[160px] object-contain"
            />
          </div>

          <div className="col-span-1 flex justify-center bg-black/40 border border-white/5 rounded-xl p-3">
            <img 
              src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=B3rlinSugi&layout=compact&theme=tokyonight&hide_border=true&bg_color=transparent&title_color=FF6B00&text_color=8B949E" 
              alt="Top Languages" 
              className="w-full h-full max-h-[160px] object-contain"
            />
          </div>

          <div className="col-span-1 flex justify-center bg-black/40 border border-white/5 rounded-xl p-3">
            <img 
              src="https://streak-stats.demolab.com?user=B3rlinSugi&theme=tokyonight&hide_border=true&background=transparent&ring=FF6B00&fire=FFB000&currStreakLabel=FF6B00" 
              alt="GitHub Streak" 
              className="w-full h-full max-h-[160px] object-contain"
            />
          </div>

          {/* Bottom Row: Contribution Snake */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center bg-black/40 border border-white/5 rounded-xl p-4 overflow-hidden">
            <div className="w-full overflow-x-auto scrollbar-hide flex justify-center">
              <img 
                src="https://raw.githubusercontent.com/B3rlinSugi/B3rlinSugi/output/github-contribution-grid-snake-dark.svg" 
                alt="GitHub Contribution Snake Animation" 
                className="min-w-[700px] w-full max-h-[180px] object-contain"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
