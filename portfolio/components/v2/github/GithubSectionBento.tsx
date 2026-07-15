"use client";

import { motion } from "framer-motion";

export default function GithubSectionBento() {
  return (
    <section className="relative py-24 w-full bg-[#121212] flex flex-col items-center justify-center overflow-hidden z-10 px-6">
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#FF6B00] rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            GitHub <span className="text-[#FF6B00]">Activity</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A real-time overview of my open-source contributions, repositories, and coding streak.
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-2 lg:col-span-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-center hover:bg-white/[0.05] transition-colors"
          >
            <img 
              src="https://github-readme-stats-sigma-five.vercel.app/api?username=B3rlinSugi&theme=tokyonight&hide_border=true&bg_color=transparent&title_color=FF6B00&icon_color=FFB000&text_color=8B949E&show_icons=true&count_private=true" 
              alt="GitHub Stats" 
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Card 2: Top Languages */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-center hover:bg-white/[0.05] transition-colors"
          >
            <img 
              src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=B3rlinSugi&layout=compact&theme=tokyonight&hide_border=true&bg_color=transparent&title_color=FF6B00&text_color=8B949E" 
              alt="Top Languages" 
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Card 3: GitHub Streak */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-center hover:bg-white/[0.05] transition-colors"
          >
            <img 
              src="https://streak-stats.demolab.com?user=B3rlinSugi&theme=tokyonight&hide_border=true&background=transparent&ring=FF6B00&fire=FFB000&currStreakLabel=FF6B00" 
              alt="GitHub Streak" 
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Card 4: Contribution Snake (Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 md:col-span-2 lg:col-span-3 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:bg-white/[0.05] transition-colors overflow-hidden"
          >
            <h3 className="text-xl font-medium text-gray-300 mb-6 w-full text-left">Contribution Graph</h3>
            <div className="w-full overflow-x-auto overflow-y-hidden flex justify-center pb-4 scrollbar-hide">
              <img 
                src="https://raw.githubusercontent.com/B3rlinSugi/B3rlinSugi/output/github-contribution-grid-snake-dark.svg" 
                alt="GitHub Contribution Snake Animation" 
                className="max-w-none w-[800px] md:w-full h-auto object-contain"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
