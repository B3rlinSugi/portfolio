"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "stats", label: "Overview Stats" },
  { id: "languages", label: "Top Languages" },
  { id: "streak", label: "Coding Streak" },
  { id: "graph", label: "Contribution Graph" },
];

export default function GithubSectionTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <section className="relative py-20 w-full bg-[#121212] flex flex-col items-center justify-center overflow-hidden z-10 px-6">
      
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B00] rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white tracking-tight"
          >
            GitHub <span className="text-[#FF6B00]">Activity</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-gray-400 max-w-xl mx-auto text-base"
          >
            A real-time snapshot of my open-source contributions and metrics.
          </motion.p>
        </div>

        {/* The Tabs Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-8 flex flex-col items-center"
        >
          
          {/* Tabs Menu */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 bg-black/40 p-2 rounded-2xl border border-white/5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-sm md:text-base font-medium rounded-xl transition-colors ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGithubTab"
                      className="absolute inset-0 bg-[#FF6B00] rounded-xl z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Area */}
          <div className="w-full min-h-[250px] md:min-h-[350px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              
              {activeTab === "stats" && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center"
                >
                  <img 
                    src="https://github-readme-stats-sigma-five.vercel.app/api?username=B3rlinSugi&theme=tokyonight&hide_border=true&bg_color=transparent&title_color=FF6B00&icon_color=FFB000&text_color=8B949E&show_icons=true&count_private=true" 
                    alt="GitHub Stats" 
                    className="max-w-[500px] w-full h-auto object-contain"
                  />
                </motion.div>
              )}

              {activeTab === "languages" && (
                <motion.div
                  key="languages"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center"
                >
                  <img 
                    src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=B3rlinSugi&layout=compact&theme=tokyonight&hide_border=true&bg_color=transparent&title_color=FF6B00&text_color=8B949E" 
                    alt="Top Languages" 
                    className="max-w-[400px] w-full h-auto object-contain"
                  />
                </motion.div>
              )}

              {activeTab === "streak" && (
                <motion.div
                  key="streak"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center"
                >
                  <img 
                    src="https://streak-stats.demolab.com?user=B3rlinSugi&theme=tokyonight&hide_border=true&background=transparent&ring=FF6B00&fire=FFB000&currStreakLabel=FF6B00" 
                    alt="GitHub Streak" 
                    className="max-w-[500px] w-full h-auto object-contain"
                  />
                </motion.div>
              )}

              {activeTab === "graph" && (
                <motion.div
                  key="graph"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center overflow-x-auto scrollbar-hide"
                >
                  <img 
                    src="https://raw.githubusercontent.com/B3rlinSugi/B3rlinSugi/output/github-contribution-grid-snake-dark.svg" 
                    alt="GitHub Contribution Snake Animation" 
                    className="min-w-[800px] w-full h-auto object-contain"
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
