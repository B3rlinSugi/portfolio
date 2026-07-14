"use client";

import { motion } from "framer-motion";
import { Server, Database, Key, ShieldCheck } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const expertiseData = [
  {
    title: "Backend Development",
    tags: "Laravel, Node.js, PHP",
    icon: Server,
  },
  {
    title: "Database Design",
    tags: "MySQL, PostgreSQL",
    icon: Database,
  },
  {
    title: "API & Integration",
    tags: "REST API, Third Party Services",
    icon: Key,
  },
  {
    title: "Security & Performance",
    tags: "JWT, RBAC, Optimization",
    icon: ShieldCheck,
  }
];

export default function ExpertiseList() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col gap-4 w-full"
    >
      {expertiseData.map((item, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          whileHover={{ y: -6, scale: 1.01 }}
          className="group relative bg-white/40 border border-white/60 hover:border-orange-500/50 rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)] flex items-center gap-5 cursor-default overflow-hidden"
        >
          {/* Subtle Accent Glow inside the card on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Icon Container */}
          <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center group-hover:border-orange-500/30 transition-colors duration-300">
            <item.icon 
              size={20} 
              className="text-orange-500 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" 
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-1 z-10">
            <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-[13px] md:text-[14px] text-gray-600 font-medium">
              {item.tags}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Mini Engineering Stats Layer */}
      <motion.div 
        variants={cardVariants}
        className="mt-6 flex flex-row flex-wrap xl:flex-nowrap items-center justify-between gap-4 w-full bg-white/40 border border-white/60 shadow-sm rounded-2xl p-5"
      >
        {[
          { v: "7+", l: "Projects" },
          { v: "4+", l: "Years" },
          { v: "10+", l: "Tech" },
          { v: "∞", l: "Curiosity" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col flex-1 items-center justify-center border-r border-white/60 last:border-0">
            <span className="text-[20px] md:text-[24px] font-bold text-gray-900 leading-none mb-1">{stat.v}</span>
            <span className="text-[9px] md:text-[10px] text-gray-600 uppercase tracking-[1.5px] text-center">{stat.l}</span>
          </div>
        ))}
      </motion.div>

    </motion.div>
  );
}
