"use client";

import { motion } from "framer-motion";

export default function GithubSectionNative() {
  return (
    <section className="relative py-24 w-full bg-[#121212] flex flex-col items-center justify-center z-10 px-4 md:px-8">
      <div className="max-w-[1000px] w-full mx-auto relative z-10">
        
        {/* Title */}
        <div className="mb-10 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 flex items-center gap-3">
            <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true" fill="currentColor">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            GitHub Contributions
          </h2>
          <p className="mt-2 text-gray-400">
            A native, data-first view of my open-source activity.
          </p>
        </div>

        {/* The GitHub Native Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Top Bar (Fake GitHub Navbar) */}
          <div className="border-b border-[#30363d] bg-[#161b22] px-6 py-4 flex items-center gap-4 text-sm font-semibold text-gray-300 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <span className="flex items-center gap-2 border-b-2 border-[#f78166] pb-4 -mb-4 text-gray-100">
              <svg className="fill-current text-gray-400" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
              Overview
            </span>
            <span className="flex items-center gap-2 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors">
              <svg className="fill-current text-gray-400" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
              Repositories
            </span>
            <span className="flex items-center gap-2 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors">
              <svg className="fill-current text-gray-400" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5A1.75 1.75 0 0110.25 16h-8.5A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0zM7 14.25v-1h-1.5v1h1.5zM4 4h3v-1H4v1zm0 2h3v-1H4v1zm0 2h3v-1H4v1zm4-4h1v-1H8v1zm0 2h1v-1H8v1zm0 2h1v-1H8v1z"></path></svg>
              Projects
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            
            {/* Top Row: Stats & Languages */}
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <div className="flex-1 flex justify-center bg-transparent">
                <img 
                  src="https://github-readme-stats-sigma-five.vercel.app/api?username=B3rlinSugi&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=FF6B00&icon_color=FFB000&text_color=c9d1d9&show_icons=true&count_private=true" 
                  alt="GitHub Stats" 
                  className="w-full max-w-[450px] object-contain border border-[#30363d] rounded-lg"
                />
              </div>
              <div className="flex-1 flex justify-center bg-transparent">
                <img 
                  src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=B3rlinSugi&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=FF6B00&text_color=c9d1d9" 
                  alt="Top Languages" 
                  className="w-full max-w-[450px] object-contain border border-[#30363d] rounded-lg"
                />
              </div>
            </div>

            {/* Middle Row: Streak */}
            <div className="flex justify-center">
              <img 
                src="https://streak-stats.demolab.com?user=B3rlinSugi&theme=tokyonight&hide_border=true&background=0d1117&ring=FF6B00&fire=FFB000&currStreakLabel=FF6B00&sideLabels=c9d1d9&sideNums=c9d1d9&dates=8B949E" 
                alt="GitHub Streak" 
                className="w-full max-w-[450px] md:max-w-none md:w-auto h-auto object-contain border border-[#30363d] rounded-lg p-2"
              />
            </div>

            {/* Bottom Row: Contribution Snake */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 px-2">Contributions in the last year</h3>
              <div className="w-full border border-[#30363d] rounded-lg p-4 bg-[#0d1117] flex justify-center overflow-x-auto scrollbar-hide">
                <img 
                  src="https://raw.githubusercontent.com/B3rlinSugi/B3rlinSugi/output/github-contribution-grid-snake-dark.svg" 
                  alt="GitHub Contribution Snake Animation" 
                  className="min-w-[800px] w-full max-w-4xl h-auto object-contain"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
