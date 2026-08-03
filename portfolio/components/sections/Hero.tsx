"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      
      {/* Background Large Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-40 dark:opacity-100">
        <h1 
          className="font-bold font-sans text-[16vw] md:text-[14vw] leading-[0.85] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.1)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.1)]" 
        >
          FULL-STACK
        </h1>
        <h1 
          className="font-bold font-sans text-[16vw] md:text-[12vw] leading-[0.85] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.1)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.1)]" 
        >
          WEB DEVELOPER
        </h1>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Text) */}
          <div className="lg:col-span-6 relative z-20">
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 mb-8 backdrop-blur-md transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors">
                {t('hero_available')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 2.7 }}
              className="text-[3rem] md:text-[4.5rem] lg:text-[4.8rem] font-bold tracking-tighter leading-[1.05] text-neutral-900 dark:text-white transition-colors"
              dangerouslySetInnerHTML={{ __html: t('hero_headline') }}
            />
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.9, ease: "easeOut" }}
              className="mt-8 text-lg text-neutral-600 dark:text-neutral-400 max-w-[480px] leading-relaxed transition-colors"
              dangerouslySetInnerHTML={{ __html: t('hero_subheadline') }}
            />

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.1, ease: "easeOut" }}
              className="flex flex-row gap-4 mt-10"
            >
              <a 
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,107,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050505]"
              >
                {t('hero_view_projects')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="/cv.pdf"
                download
                className="flex items-center gap-2 border border-neutral-300 dark:border-white/10 hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/5 text-neutral-800 dark:text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#050505]"
              >
                <Download className="w-4 h-4" />
                {t('hero_download_cv')}
              </a>
            </motion.div>
          </div>

          {/* Right Column (Portrait) */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0 flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 3.3 }}
              className="relative w-[110%] -ml-[5%] md:w-full max-w-[600px] aspect-[4/5] z-10"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
              }}
            >
              <Image
                src="/foto.png"
                alt={portfolioData.name}
                fill
                className="object-cover object-top filter dark:brightness-100 brightness-95"
                priority
                quality={100}
                unoptimized={true}
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
