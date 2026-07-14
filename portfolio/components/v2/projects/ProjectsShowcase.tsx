"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  thumbnail: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
};

// Dummy Data
const projectsData: Project[] = [
  {
    id: "safeari",
    title: "Safeari",
    thumbnail: "/safeari.jpg", 
    problem: "Parents need technical knowledge to protect children online using DNS filtering, creating barriers to digital safety.",
    solution: "Built a web-based platform that simplifies NextDNS management with automated threat blocking, real-time analytics, device management, and customizable filtering rules for non-technical users.",
    impact: "Production application with active users enabling parents to protect their children online without technical expertise.",
    techStack: ["React", "TypeScript", "Tailwind", "Django", "PostgreSQL", "Supabase", "Redis"],
  },
  {
    id: "payment-api",
    title: "Multi-Provider Payment API",
    thumbnail: "/payment.jpg",
    problem: "Integrating multiple payment gateways (M-Pesa, Paystack, cards) requires maintaining separate codebases and handling diverse error states.",
    solution: "Containerized payment infrastructure unifying all providers into a single, predictable API interface with built-in retry mechanisms and webhooks.",
    impact: "Reduced deployment time from weeks to 3 hours. Handled high-volume transaction loads for real clients securely.",
    techStack: ["NodeJS", "Express", "TypeScript", "Docker", "Redis", "PostgreSQL"],
  },
  {
    id: "gititdone",
    title: "GitItDone",
    thumbnail: "/git.jpg",
    problem: "Developers spend too much time on repetitive Git workflows and standardizing commit messages across large teams.",
    solution: "Python CLI that automates repetitive Git workflows, enforces conventional commits, and handles automatic version bumping.",
    impact: "Open-sourced tool resulting in 70% faster commits for teams. Adopted by multiple development agencies.",
    techStack: ["Python", "Click", "Git", "GitHub Actions"],
  }
];

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; }
  }, [selectedProject]);

  return (
    <section id="projects" className="relative w-full min-h-screen bg-[#121212] text-gray-300 py-24 md:py-32 overflow-hidden border-t border-white/5">
      
      {/* Grid Paper Pattern (Match About section) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* --- Abstract Orbs (Monochrome) --- */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-white/5 rounded-full blur-[120px] md:blur-[180px] pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-gray-500/5 rounded-full blur-[120px] md:blur-[180px] pointer-events-none translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-white/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      {/* Container */}
      <div className="relative z-10 w-[90%] md:w-[85%] xl:w-[75%] max-w-[1400px] mx-auto pt-10 pb-20">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-sm">
            Visionary Projects
          </h2>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto">
            A glimpse into the robust systems and beautiful interfaces I've built.
          </p>
        </div>

        {/* Projects Grid (Glassmorphism Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
              className="group flex flex-col w-full bg-[#1A1A1A] hover:bg-[#222222] border border-white/10 hover:border-white/30 backdrop-blur-2xl rounded-[2rem] p-4 transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              
              {/* Image Area - Floating inside the glass */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-600 font-bold tracking-widest">{project.title}</span>
                </div>
                <Image 
                  src={project.thumbnail} 
                  alt={project.title} 
                  fill 
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out mix-blend-multiply"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Content Area */}
              <div className="flex flex-col px-2 flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6">
                  {project.solution}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-500 rounded-full text-xs font-medium">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full">
                  <button className="flex-1 bg-white hover:bg-gray-200 text-black font-bold text-sm py-3 rounded-xl transition-all shadow-sm">
                    Live Demo
                  </button>
                  <button className="flex-1 bg-transparent hover:bg-white/10 border border-white/20 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-sm">
                    Details
                  </button>
                </div>

              </div>
              
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Content */}
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] border border-white/10 text-gray-300 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] custom-scrollbar"
              onClick={(e) => e.stopPropagation()} 
            >
              
              {/* Abstract Modal Orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-500/5 rounded-full blur-[80px] pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full p-2 transition-all z-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10">{selectedProject.title}</h2>

                {/* Problem */}
                <div className="mb-8 p-6 bg-black/20 border border-white/5 rounded-2xl">
                  <h3 className="text-gray-300 font-bold text-lg mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" /> 
                    The Problem
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-8 p-6 bg-black/20 border border-white/5 rounded-2xl">
                  <h3 className="text-gray-300 font-bold text-lg mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" /> 
                    The Solution
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>

                {/* Impact */}
                <div className="mb-10 p-6 bg-black/20 border border-white/5 rounded-2xl">
                  <h3 className="text-gray-300 font-bold text-lg mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> 
                    The Impact
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-10">
                  <h3 className="text-white font-bold text-lg mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-5 py-2 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-white hover:bg-gray-200 text-black font-bold text-lg py-4 rounded-2xl transition-all shadow-lg">
                  Launch Live Project
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />

    </section>
  );
}
