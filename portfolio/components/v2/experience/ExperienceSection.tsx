"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    id: 1,
    year: "Jul 2026 - Present",
    role: "Freelance Full-Stack Developer",
    company: "Skincare Stock",
    description: "Developed a comprehensive web application for managing skincare inventory, sales, and user transactions. Designed the system from scratch, ensuring scalability and a beautiful user interface.",
    achievements: [
      "Built a robust inventory tracking system that minimizes stock discrepancies.",
      "Implemented secure user authentication and role-based access control (RBAC).",
      "Optimized backend queries to ensure lightning-fast load times for transaction history."
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"]
  },
  {
    id: 2,
    year: "May 2026 - Jun 2026",
    role: "Freelance Full-Stack Developer",
    company: "Prime Property",
    description: "Engineered a full-stack property management platform designed to help real estate agencies manage property listings, agent assignments, and client inquiries efficiently.",
    achievements: [
      "Developed advanced search filters for property listings (by location, price, and type).",
      "Created secure agent dashboards for managing client inquiries and property updates.",
      "Streamlined property management processes, significantly increasing lead generation."
    ],
    tech: ["Next.js", "React", "Node.js", "Tailwind CSS", "PostgreSQL"]
  },
  {
    id: 3,
    year: "2023 - 2026",
    role: "Kementerian / Kepala Bidang",
    company: "BEM FTI Universitas Gunadarma",
    description: "Served for three consecutive periods in the Student Executive Board (BEM FTI), progressively taking on higher leadership responsibilities within the Department of Social and Political Affairs.",
    achievements: [
      "2025-2026: Kementerian/Kepala Bidang Sosial & Politik — Directed overarching social initiatives and political advocacy.",
      "2024-2025: Kepala Departemen Sosial Masyarakat — Led a dedicated team to execute impactful community service programs.",
      "2023-2024: Staff Departemen Sosial Masyarakat — Organized and facilitated various student outreach events."
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
            A timeline of my professional journey and freelance projects. Click on any role to expand its details.
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
