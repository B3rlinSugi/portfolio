"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageContext";

// Experience Data (Reverse Chronological Order)
const experiences = [
  {
    year: "2025 - 2026",
    role: "Ministry of Social and Political Affairs",
    organization: "Student Executive Board, Faculty of Industrial Technology",
    igHandle: "@ug_bemfti",
    igLink: "https://www.instagram.com/p/DEP-qA8TEB2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    year: "2024 - 2025",
    role: "Head of Social and Community Department",
    organization: "Student Executive Board, Faculty of Industrial Technology",
    igHandle: "@ug_bemfti",
    igLink: "https://www.instagram.com/p/C1gEnw6LmQD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    year: "2023 - 2024",
    role: "Staff of Social and Community Department",
    organization: "Student Executive Board, Faculty of Industrial Technology",
    igHandle: "@ug_bemfti",
    igLink: "https://www.instagram.com/p/CoEGtdoydKl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  }
];

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative py-32 bg-white dark:bg-[#050505] overflow-hidden border-t border-neutral-200 dark:border-white/5 min-h-screen flex items-center transition-colors duration-500">
      
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Content & Timeline (50%) */}
          <div className="w-full lg:w-1/2 flex flex-col">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-sm font-bold text-[#FF6B00] tracking-[0.2em] uppercase mb-4">
                {t('experience_title')}
              </h2>
              <h3 
                className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-[1.2] mb-6 transition-colors"
                dangerouslySetInnerHTML={{ __html: t('experience_headline') }}
              />
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-md transition-colors">
                {t('experience_subheadline')}
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative pl-4 md:pl-0">
              {/* Vertical Line */}
              <div className="absolute left-[27px] md:left-[31px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-[#FF6B00]/50 to-transparent hidden md:block" />
              
              <div className="flex flex-col gap-10">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative flex flex-col md:flex-row gap-6 md:gap-8 group"
                  >
                    {/* Icon / Marker */}
                    <div className="hidden md:flex flex-col items-center z-10">
                      <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 flex items-center justify-center group-hover:border-[#FF6B00]/50 dark:group-hover:border-[#FF6B00]/50 group-hover:bg-[#FF6B00]/10 transition-all duration-300">
                        <Calendar className="w-6 h-6 text-[#FF6B00]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="md:hidden flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-[#FF6B00]" />
                        <span className="text-[#FF6B00] font-bold tracking-wider">{exp.year}</span>
                      </div>
                      <h4 className="hidden md:block text-[#FF6B00] font-bold tracking-wider mb-2">{exp.year}</h4>
                      
                      <h5 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 transition-colors">{exp.role}</h5>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 transition-colors">{exp.organization}</p>
                      
                      <a 
                        href={exp.igLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-300 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded"
                      >
                        <SiInstagram className="w-4 h-4" />
                        {exp.igHandle}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Instagram Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16"
            >
              <a 
                href="https://www.instagram.com/berlinsgynt_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border border-neutral-200 dark:border-white/10 hover:border-[#FF6B00]/50 bg-neutral-100 dark:bg-white/[0.02] hover:bg-[#FF6B00]/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center">
                  <SiInstagram className="w-5 h-5 text-white" />
                </div>
                <span className="text-neutral-800 dark:text-white font-semibold transition-colors">Follow My Journey</span>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all" />
              </a>
            </motion.div>

          </div>

          {/* Right Side: Photo Collage (50%) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center mt-12 lg:mt-0">
            <div className="relative w-full max-w-[500px] aspect-[4/5]">
              
              {/* Image 3 (Bottom) */}
              <motion.div 
                initial={{ opacity: 0, rotate: -5, y: 50 }}
                whileInView={{ opacity: 1, rotate: -2, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-0 right-0 w-[85%] aspect-video rounded-xl border-4 border-white dark:border-[#111] overflow-hidden shadow-2xl z-10 bg-white dark:bg-[#111] transition-colors duration-500"
              >
                <Image src="/exp-3.png" alt="Experience 2023-2024" fill className="object-cover" />
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#FF6B00] text-white text-xs font-bold rounded-md">
                  2023 - 2024
                </div>
              </motion.div>

              {/* Image 2 (Middle) */}
              <motion.div 
                initial={{ opacity: 0, rotate: 5, x: -50 }}
                whileInView={{ opacity: 1, rotate: 3, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-1/2 left-0 -translate-y-1/2 w-[85%] aspect-video rounded-xl border-4 border-white dark:border-[#111] overflow-hidden shadow-2xl z-20 bg-white dark:bg-[#111] transition-colors duration-500"
              >
                <Image src="/exp-2.png" alt="Experience 2024-2025" fill className="object-cover" />
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#FF6B00] text-white text-xs font-bold rounded-md">
                  2024 - 2025
                </div>
              </motion.div>

              {/* Image 1 (Top) */}
              <motion.div 
                initial={{ opacity: 0, rotate: -8, y: -50 }}
                whileInView={{ opacity: 1, rotate: -4, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute top-0 right-4 w-[85%] aspect-video rounded-xl border-4 border-white dark:border-[#111] overflow-hidden shadow-2xl z-30 bg-white dark:bg-[#111] transition-colors duration-500"
              >
                <Image src="/exp-1.png" alt="Experience 2025-2026" fill className="object-cover" />
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#FF6B00] text-white text-xs font-bold rounded-md">
                  2025 - 2026
                </div>
              </motion.div>

              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-[#FF6B00]/10 blur-[80px] -z-10 rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
