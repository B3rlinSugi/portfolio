"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  thumbnail: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  demoLink?: string;
  githubLink?: string;
};

const projectsData: Project[] = [
  {
    id: "prime-property",
    title: "Prime Property",
    thumbnail: "/projects/prime-property.png", 
    problem: "Real estate agencies lack a centralized system to manage property listings, agent assignments, and client inquiries efficiently.",
    solution: "Developed a comprehensive full-stack platform for property management with advanced search filters, agent dashboards, and secure inquiry handling.",
    impact: "Streamlined property management processes, increasing listing visibility and lead generation for property agents.",
    techStack: ["React", "Next.js", "TailwindCSS", "Node.js", "PostgreSQL"],
    demoLink: "https://prime-property-sigma.vercel.app/",
    githubLink: "https://github.com/B3rlinSugi",
  },
  {
    id: "tokoku",
    title: "Tokoku E-Commerce",
    thumbnail: "/projects/tokoku.png",
    problem: "Small businesses need a reliable and scalable e-commerce platform to manage products, carts, and user transactions securely.",
    solution: "Built a fully functional e-commerce web app featuring a shopping cart, product catalog, user authentication, and secure checkout flow.",
    impact: "Provides a seamless shopping experience with robust backend architecture capable of handling concurrent user sessions.",
    techStack: ["Laravel", "PHP", "MySQL", "TailwindCSS"],
    demoLink: "https://tokoku-ecommerce.vercel.app/",
    githubLink: "https://github.com/B3rlinSugi/tokoku-ecommerce",
  },
  {
    id: "hl-finance",
    title: "HL Finance",
    thumbnail: "/projects/hl-finance.png",
    problem: "Managing personal or business finances requires an intuitive interface to track income, expenses, and generate reports.",
    solution: "Created a financial dashboard application for tracking transactions, visualizing cash flow, and managing budgets with secure login.",
    impact: "Empowers users to maintain financial health through clear data visualization and streamlined transaction logging.",
    techStack: ["React", "TypeScript", "TailwindCSS"],
    demoLink: "https://hl-finance-app-six.vercel.app/login",
    githubLink: "https://github.com/B3rlinSugi",
  },
  {
    id: "student-api",
    title: "Student Management API",
    thumbnail: "/projects/student-api.png",
    problem: "Educational institutions require a secure and efficient backend system to handle student records, enrollments, and roles.",
    solution: "Developed a robust RESTful API using Laravel featuring JWT authentication, Role-Based Access Control (RBAC), and soft delete functionality.",
    impact: "Ensures secure and scalable data management for student information systems with strict access controls.",
    techStack: ["PHP", "Laravel", "MySQL", "JWT", "REST API"],
    githubLink: "https://github.com/B3rlinSugi/student-management-api",
  },
  {
    id: "springboot-api",
    title: "Spring Boot Student API",
    thumbnail: "/projects/springboot-api.png",
    problem: "Need for a high-performance, enterprise-grade backend service for managing student data and academic records.",
    solution: "Architected a scalable backend service using Java and Spring Boot, implementing solid domain-driven design principles.",
    impact: "Provides a highly reliable and performant API layer suitable for enterprise-scale educational applications.",
    techStack: ["Java", "Spring Boot", "Hibernate", "PostgreSQL"],
    githubLink: "https://github.com/B3rlinSugi/springboot-student-api",
  },
  {
    id: "cash-flow",
    title: "Cash Flow Management",
    thumbnail: "/projects/cash-flow.png",
    problem: "Tracking daily cash inflows and outflows is tedious and prone to human error without a dedicated system.",
    solution: "Built a web-based cash flow tracking system to record transactions, categorize expenses, and monitor financial health.",
    impact: "Simplifies financial tracking for small businesses and individuals, reducing accounting errors.",
    techStack: ["PHP", "MySQL", "Bootstrap"],
    githubLink: "https://github.com/B3rlinSugi/cash-flow",
  },
  {
    id: "crud-akademik",
    title: "CRUD Akademik",
    thumbnail: "/projects/crud-akademik.png",
    problem: "Basic academic data management requires a simple, lightweight system for fast data entry and retrieval.",
    solution: "Developed a core CRUD application for managing academic data, focusing on clean code and fundamental database operations.",
    impact: "Serves as a reliable foundational module for academic data processing and rapid prototyping.",
    techStack: ["PHP", "MySQL", "HTML/CSS"],
    githubLink: "https://github.com/B3rlinSugi/crud-akademik",
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
            Selected Works
          </h2>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto">
            A curated collection of web applications, robust APIs, and digital solutions I have built.
          </p>
        </div>

        {/* Projects List (Alternating Case Studies) */}
        <div className="flex flex-col gap-24 mt-12">
          {projectsData.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={project.id}
                className={`flex flex-col gap-8 md:gap-16 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                
                {/* Image Container */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full md:w-[55%] relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#1A1A1A] border border-white/10 shadow-2xl group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40">
                    <span className="bg-white text-black font-bold px-6 py-3 rounded-full text-sm">View Full Details</span>
                  </div>
                </motion.div>

                {/* Text Container */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-full md:w-[45%] flex flex-col justify-center"
                >
                  <span className="text-blue-500 font-mono font-bold tracking-widest text-sm mb-4">
                    PROJECT 0{idx + 1}
                  </span>
                  
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                    {project.problem}
                  </p>
                  
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl mb-8">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <span className="font-bold text-white block mb-1">Solution:</span>
                      {project.solution}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-[#1A1A1A] border border-white/10 text-gray-300 rounded-md text-xs font-bold uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons Directly on Page */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-bold py-3 md:py-4 rounded-xl transition-all shadow-md">
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-transparent hover:bg-white/10 border border-white/20 text-white font-bold py-3 md:py-4 rounded-xl transition-all shadow-md">
                        View Code
                      </a>
                    )}
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Premium Split-Screen Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Content Container */}
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-6xl max-h-[95vh] flex flex-col lg:flex-row bg-[#111111] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            >
              
              {/* Close Button (Floating) */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-red-400 bg-black/50 hover:bg-black/80 border border-white/10 rounded-full p-3 transition-all z-50 backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Side: Cinematic Image */}
              <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full bg-black">
                <Image 
                  src={selectedProject.thumbnail} 
                  alt={selectedProject.title} 
                  fill 
                  className="object-cover opacity-90"
                />
                {/* Gradient overlay to blend with the right side */}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111111] via-transparent to-transparent opacity-80" />
              </div>

              {/* Right Side: Scrollable Content */}
              <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar max-h-[60vh] lg:max-h-[95vh]">
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
                  {selectedProject.title}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Narrative Sections */}
                <div className="space-y-8 mb-12">
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 border-b border-white/10 pb-2 flex items-center gap-2">
                      <span className="text-red-500">■</span> The Challenge
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 border-b border-white/10 pb-2 flex items-center gap-2">
                      <span className="text-emerald-500">■</span> The Solution
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {selectedProject.solution}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 border-b border-white/10 pb-2 flex items-center gap-2">
                      <span className="text-blue-500">■</span> The Impact
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {selectedProject.impact}
                    </p>
                  </div>

                </div>

                {/* Action Buttons (Sticky at bottom if needed, or just at end of flow) */}
                <div className="flex flex-col sm:flex-row gap-4 w-full mt-auto pt-8 border-t border-white/5">
                  {selectedProject.demoLink && (
                    <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-white hover:bg-gray-200 text-black font-bold text-lg py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                      Live Preview
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-transparent hover:bg-white/10 border border-white/20 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                      Source Code
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </a>
                  )}
                </div>

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
