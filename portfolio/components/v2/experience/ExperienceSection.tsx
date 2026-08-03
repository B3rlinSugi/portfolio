"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";

const experiences = [
  {
    id: 1,
    year: "Jul 2026 - Present",
    role: "Freelance Full-Stack Developer",
    company: "HL Finance Management",
    description: "Built and delivered a sales & receivables management platform end-to-end as the sole developer using Next.js, TypeScript, and Supabase (PostgreSQL). The platform provides a comprehensive dashboard for tracking daily transactions, automated tier-based customer management, and sales target visualizations.",
    achievements: [
      "Designed an automated Gold/Silver/Bronze customer tier system that assigns discount levels based on configurable purchase thresholds.",
      "Implemented an interactive financial dashboard covering revenue, receivables, and profit analytics with server-side pagination.",
      "Built Edge-based authentication proxy with Zustand state management for maximum security and performance."
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Zustand", "Framer Motion", "Tailwind CSS"],
    demo: "https://hl-finance-app-six.vercel.app/",
    github: "https://github.com/B3rlinSugi/hl-finance-app"
  },
  {
    id: 2,
    year: "Jun 2026 - Jul 2026",
    role: "Freelance Full-Stack Developer",
    company: "Prime Property",
    description: "Delivered and deployed a full-stack property listing platform currently used by the client to manage property listings, customer-facing search, and brochure-generation workflows. Built with Next.js 16, TypeScript, PostgreSQL, and Prisma ORM.",
    achievements: [
      "Implemented multi-criteria property search and filtering by location, price, and property type.",
      "Built authentication and RBAC, audit logging for critical CRUD operations, and soft-delete recovery for reliable data management.",
      "Developed a mortgage (KPR) payment calculator and automated PDF brochure generation from property data."
    ],
    tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma ORM", "Auth.js", "GSAP", "Framer Motion"],
    demo: "https://prime-property-sigma.vercel.app/",
    github: "https://github.com/B3rlinSugi/prime-property"
  },
  {
    id: 3,
    year: "2022 - 2026",
    role: "Minister / Head of Department",
    company: "BEM FTI Universitas Gunadarma",
    description: "Served for three consecutive periods in the Student Executive Board (BEM FTI), progressively taking on higher leadership responsibilities within the Department of Social and Political Affairs.",
    achievements: [
      "2025-2026: Minister of Social & Political Affairs — Led two departments comprising 15+ members with 100% program completion rate.",
      "2024-2025: Head of Social Community Department — Directed and coordinated staff in planning and executing community social programs.",
      "2023-2024: Staff of Social Community Department — Organized and facilitated various student outreach events and cross-departmental initiatives."
    ],
    tech: ["Leadership", "Project Management", "Public Speaking", "Event Organizing"]
  }
];

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number | null>(1); // Open the first one by default

  const toggleAccordion = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="relative w-full min-h-[90vh] bg-[#121212] text-gray-300 py-24 md:py-32 overflow-hidden border-t border-white/5 flex flex-col justify-center">
      
      <div className="relative z-10 w-[95%] md:w-[90%] xl:w-[80%] max-w-[1200px] mx-auto flex flex-col h-full justify-center">
        
        {/* Intro Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <p className="font-mono text-sm tracking-[0.2em] text-blue-500 mb-4 font-bold uppercase">CAREER</p>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter text-white leading-none">
              EXPERIENCE.
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm md:text-base font-medium leading-relaxed pb-2">
            From freelance client projects to organizational leadership — every experience sharpens my ability to deliver scalable software.
          </p>
        </div>

        {/* Accordion List */}
        <div className="w-full flex flex-col border-t border-white/10">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div key={exp.id} className="w-full border-b border-white/10">
                
                {/* Accordion Header (Clickable) */}
                <button
                  onClick={() => toggleAccordion(exp.id)}
                  className="w-full py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between text-left group transition-colors duration-300 hover:bg-white/5"
                >
                  <div className="flex flex-col gap-2 transform transition-transform duration-500 group-hover:translate-x-4">
                    <h3 className={`text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter transition-colors duration-300 ${isExpanded ? 'text-white' : 'text-gray-400'}`}>
                      {exp.company}
                    </h3>
                    <p className="text-lg md:text-2xl font-bold text-gray-400">
                      {exp.role}
                    </p>
                  </div>
                  
                  <div className="mt-6 md:mt-0 flex items-center gap-6 transform transition-transform duration-500 group-hover:-translate-x-4">
                    <span className="font-mono text-sm md:text-base font-bold text-gray-400 tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/5">
                      {exp.year}
                    </span>
                    
                    {/* Plus / Minus Icon */}
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center relative transition-colors duration-300 group-hover:border-white">
                      <div className="w-3 h-[2px] bg-white absolute" />
                      <div className={`w-3 h-[2px] bg-white absolute transition-transform duration-300 ${isExpanded ? 'rotate-0 opacity-0' : 'rotate-90'}`} />
                    </div>
                  </div>
                </button>

                {/* Accordion Content (Expandable) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }} // Custom springy ease
                      className="overflow-hidden"
                    >
                      <div className="w-full flex flex-col lg:flex-row gap-12 pb-12 pt-4 px-4 md:px-8">
                        
                        {/* Description */}
                        <div className="w-full lg:w-5/12">
                          <h5 className="text-xs font-mono tracking-widest text-gray-500 font-bold uppercase mb-4">
                            The Role
                          </h5>
                          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium">
                            {exp.description}
                          </p>
                          
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mt-8">
                            {exp.tech.map((t, i) => (
                              <span key={i} className="px-4 py-1.5 bg-white/10 text-gray-300 border border-white/10 rounded-md text-xs font-bold tracking-wide">
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Links (Live Demo & GitHub) */}
                          {(exp.demo || exp.github) && (
                            <div className="flex items-center gap-4 mt-6">
                              {exp.demo && (
                                <a 
                                  href={exp.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-bold hover:bg-blue-500/20 transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Live Demo
                                </a>
                              )}
                              {exp.github && (
                                <a 
                                  href={exp.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm font-bold hover:bg-white/10 transition-colors"
                                >
                                  <SiGithub className="w-4 h-4" />
                                  Source Code
                                </a>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Divider on Desktop */}
                        <div className="hidden lg:block w-[1px] bg-white/10" />

                        {/* Achievements */}
                        <div className="w-full lg:w-6/12">
                          <h5 className="text-xs font-mono tracking-widest text-gray-500 font-bold uppercase mb-4">
                            Key Achievements
                          </h5>
                          <ul className="space-y-4">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start group/item">
                                <span className="mr-4 text-gray-400 text-xl leading-none mt-0.5 transition-transform group-hover/item:translate-x-1">→</span>
                                <span className="text-gray-400 text-base font-medium leading-relaxed">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
