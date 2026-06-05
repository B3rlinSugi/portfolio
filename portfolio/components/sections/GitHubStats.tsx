"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight, GitBranch, Activity } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useLanguage } from "@/components/providers/LanguageContext";
import { useTheme } from "next-themes";

const ImageWithFallback = ({ src, alt, className, errorMsg }: { src: string, alt: string, className: string, errorMsg: string }) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <>
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-[#0a0a0a] animate-pulse rounded-2xl z-10 transition-colors">
          <div className="w-10 h-10 border-4 border-neutral-300 dark:border-white/10 border-t-[#FF6B00] rounded-full animate-spin"></div>
        </div>
      )}
      
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-500 p-4 text-center z-10 transition-colors">
          <span className="text-2xl mb-2">😴</span>
          <span className="text-xs" dangerouslySetInnerHTML={{ __html: errorMsg }} />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`${className} ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
    </>
  );
};

export default function GitHubStats() {
  const { t } = useLanguage();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const username = "B3rlinSugi";

  // Determine actual theme for the stats API
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = !mounted || currentTheme !== "light"; // Default to dark before mounted

  const titleColor = "FF6B00";
  const iconColor = "FF6B00";
  const ringColor = "FF6B00";
  
  // Light Mode Colors
  const lightTextColor = "333333";
  const lightBgColor = "f8fafc"; // neutral-50
  
  // Dark Mode Colors
  const darkTextColor = "a0a0a0";
  const darkBgColor = "0a0a0a"; // #0a0a0a

  const textColor = isDark ? darkTextColor : lightTextColor;
  const bgColor = isDark ? darkBgColor : lightBgColor;

  return (
    <section id="github" className="relative py-32 bg-white dark:bg-[#050505] overflow-hidden border-t border-neutral-200 dark:border-white/5 transition-colors duration-500">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#FF6B00]/10 dark:bg-[#FF6B00]/[0.03] rounded-full blur-[150px] pointer-events-none transition-colors" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#FF6B00] uppercase mb-4">
            {t('github_title')}
          </h2>
          <h3 
            className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tighter leading-[1.1] text-center mb-4 transition-colors"
            dangerouslySetInnerHTML={{ __html: t('github_headline') }}
          />
          <p className="text-neutral-600 dark:text-neutral-400 text-base text-center max-w-lg transition-colors">
            {t('github_subheadline')}
          </p>
        </motion.div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* GitHub Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/[0.06] p-1 overflow-hidden hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/20 transition-all shadow-sm dark:shadow-none flex items-center justify-center min-h-[195px] relative"
          >
            {mounted && (
              <ImageWithFallback
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=${titleColor}&text_color=${textColor}&icon_color=${iconColor}&bg_color=${bgColor}&ring_color=${ringColor}`}
                alt="GitHub Stats"
                className="w-full h-auto relative z-20 transition-opacity duration-300"
                errorMsg={t('github_error')}
              />
            )}
          </motion.div>

          {/* Top Languages Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/[0.06] p-1 overflow-hidden hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/20 transition-all shadow-sm dark:shadow-none flex items-center justify-center min-h-[195px] relative"
          >
            {mounted && (
              <ImageWithFallback
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=${titleColor}&text_color=${textColor}&bg_color=${bgColor}&langs_count=8`}
                alt="Top Languages"
                className="w-full h-auto relative z-20 transition-opacity duration-300"
                errorMsg={t('github_error')}
              />
            )}
          </motion.div>

          {/* Streak Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/[0.06] p-1 overflow-hidden hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/20 transition-all shadow-sm dark:shadow-none flex items-center justify-center min-h-[195px] relative"
          >
            {mounted && (
              <ImageWithFallback
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&hide_border=true&title_color=${titleColor}&text_color=${textColor}&sideNums=${textColor}&sideLabels=${textColor}&dates=${textColor}&ring=${ringColor}&fire=${iconColor}&currStreakLabel=${iconColor}&background=${bgColor}`}
                alt="GitHub Streak"
                className="w-full h-auto relative z-20 transition-opacity duration-300"
                errorMsg={t('github_error')}
              />
            )}
          </motion.div>

        </div>

        {/* View Profile Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-neutral-200 dark:border-white/10 hover:border-[#FF6B00]/50 bg-neutral-50 dark:bg-white/[0.02] hover:bg-[#FF6B00]/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
          >
            <FaGithub className="w-5 h-5 text-neutral-800 dark:text-white transition-colors" />
            <span className="text-neutral-800 dark:text-white font-semibold transition-colors">View GitHub Profile</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#FF6B00] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
