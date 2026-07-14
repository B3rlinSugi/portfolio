"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    id: 1,
    year: "2024 - Present",
    role: "Senior Software Engineer",
    company: "TechCorp Global",
    description: "Memimpin tim frontend dalam migrasi arsitektur dari monolith ke micro-frontends. Meningkatkan performa aplikasi secara keseluruhan hingga 40% dan mengurangi waktu muat halaman.",
    achievements: [
      "Mengurangi waktu muat awal (TTI) dari 4.2s menjadi 1.1s.",
      "Mengimplementasikan CI/CD pipelines dengan GitHub Actions yang mempercepat rilis hingga 3x lipat.",
      "Membimbing 3 junior developer hingga dipromosikan."
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 2,
    year: "2022 - 2024",
    role: "Fullstack Web Developer",
    company: "StartupXYZ",
    description: "Mengembangkan RESTful API yang melayani lebih dari 100.000 pengguna aktif bulanan. Merancang dan mengoptimalkan skema database relasional untuk menekan biaya server.",
    achievements: [
      "Menurunkan biaya server AWS sebesar $500/bulan dengan optimalisasi kueri PostgreSQL.",
      "Membangun fitur real-time chat menggunakan WebSockets dan Redis.",
      "Integrasi dengan sistem pembayaran pihak ketiga (Payment Gateway)."
    ],
    tech: ["Node.js", "Express", "PostgreSQL", "Docker", "Redis"]
  },
  {
    id: 3,
    year: "2021 - 2022",
    role: "Junior Web Developer",
    company: "Creative Agency",
    description: "Membangun puluhan halaman pendaratan (landing pages) interaktif untuk klien korporat. Bekerja sama erat dengan tim UI/UX untuk memastikan desain yang pixel-perfect.",
    achievements: [
      "Menyelesaikan 15+ proyek website klien tepat waktu dengan tingkat kepuasan 98%.",
      "Membuat sistem komponen UI yang dapat digunakan ulang, memotong waktu desain sebesar 30%.",
      "Mengimplementasikan praktik SEO terbaik (Skor Lighthouse 95+)."
    ],
    tech: ["HTML/CSS", "JavaScript", "Figma", "WordPress"]
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
            <p className="font-mono text-sm tracking-[0.2em] text-gray-500 mb-4 font-bold">CHAPTER II</p>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter text-white leading-none">
              History.
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm md:text-base font-medium leading-relaxed pb-2">
            A minimalist archive of my professional footprint. Click on any role to expand its details.
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
