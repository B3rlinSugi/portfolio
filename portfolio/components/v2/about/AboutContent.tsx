"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Quote } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const quoteVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function AboutContent() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col items-start justify-center w-full h-full lg:pr-8"
    >
      
      {/* 1. Section Label */}
      <motion.div variants={itemVariants} className="mb-4">
        <span className="text-[12px] uppercase font-bold text-orange-500 tracking-[3px]">
          ABOUT ME
        </span>
      </motion.div>

      {/* 2. Main Heading */}
      <motion.h2 
        variants={itemVariants}
        className="text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.15] tracking-tight text-gray-900 mb-6"
      >
        Building the <span className="text-orange-500">engine</span> <br className="hidden md:block"/>
        behind <span className="text-orange-500">digital</span> <br className="hidden md:block"/>
        experiences.
      </motion.h2>

      {/* 3. Description */}
      <motion.div variants={itemVariants} className="mb-12">
        <p className="text-[18px] font-normal text-gray-600 max-w-[480px] leading-[1.7]">
          I'm Berlin, a backend developer who enjoys solving problems, building systems, and creating impact through technology.
        </p>
      </motion.div>

      {/* 4. Personal Quote (Glassmorphism) */}
      <motion.div 
        variants={quoteVariants}
        className="relative bg-white/40 backdrop-blur-md border border-white/60 p-6 md:p-8 rounded-3xl mb-12 max-w-[420px] group hover:border-gray-200 transition-colors duration-500"
      >
        <Quote className="w-8 h-8 text-orange-500/40 mb-4 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500" />
        <p className="text-[16px] md:text-[18px] italic font-medium text-gray-700 leading-relaxed">
          "Good systems start with clean structure and honest engineering."
        </p>
      </motion.div>

      {/* 5. CTA Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
      >
        {/* Primary Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-[15px] transition-colors duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] w-full sm:w-auto"
        >
          View Projects
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Secondary Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-14 px-8 bg-transparent border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold text-[15px] transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto"
        >
          <Download size={18} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
          Download CV
        </motion.button>
      </motion.div>

    </motion.div>
  );
}
