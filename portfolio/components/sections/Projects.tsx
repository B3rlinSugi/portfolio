"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Info } from "lucide-react";
import * as LucideIcons from "lucide-react";
import ProjectModal from "@/components/ProjectModal";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageContext";

// Import tech stack icons
import { 
  SiTypescript, SiNextdotjs, SiReact, SiTailwindcss, SiNodedotjs,
  SiPhp, SiMysql, SiJavascript, SiHtml5, SiCss, SiBootstrap,
  SiLaravel, SiJsonwebtokens, SiPostman, SiSpringboot, SiSpring,
  SiApachemaven, SiChartdotjs, SiPostgresql, SiPrisma, SiFramer, 
  SiGreensock, SiComposer, SiXampp, SiVercel
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const iconMap: Record<string, any> = {
  SiTypescript, SiNextdotjs, SiReact, SiTailwindcss, SiNodedotjs,
  SiPhp, SiMysql, SiJavascript, SiHtml5, SiCss, SiBootstrap,
  SiLaravel, SiJsonwebtokens, SiPostman, SiSpringboot, SiSpring,
  SiApachemaven, SiChartdotjs, FaJava, SiPostgresql, SiPrisma, 
  SiFramer, SiGreensock, SiComposer, SiXampp, SiVercel
};

const techColorMap: Record<string, string> = {
  SiTypescript: "#3178C6", SiNextdotjs: "#FFFFFF", SiReact: "#61DAFB", 
  SiTailwindcss: "#06B6D4", SiNodedotjs: "#339933", SiPhp: "#777BB4", 
  SiMysql: "#4479A1", SiJavascript: "#F7DF1E", SiHtml5: "#E34F26", 
  SiCss: "#1572B6", SiBootstrap: "#7952B3", SiLaravel: "#FF2D20", 
  SiJsonwebtokens: "#FFFFFF", SiPostman: "#FF6C37", SiSpringboot: "#6DB33F", 
  SiSpring: "#6DB33F", SiApachemaven: "#C71A22", SiChartdotjs: "#FF6384", 
  FaJava: "#007396", SiPostgresql: "#4169E1", SiPrisma: "#FFFFFF", 
  SiFramer: "#0055FF", SiGreensock: "#88CE02", SiComposer: "#885630", 
  SiXampp: "#FB7A24", SiVercel: "#FFFFFF"
};

const TechIcon = ({ iconName }: { iconName: string }) => {
  const Icon = iconMap[iconName];
  const color = techColorMap[iconName] || "#FF6B00"; // Fallback to theme orange

  if (!Icon) {
    const LucideIcon = (LucideIcons as any)[iconName];
    if (LucideIcon) return <LucideIcon className="w-6 h-6 text-neutral-500 dark:text-neutral-300 transition-colors" style={{ color: color }} />;
    return <LucideIcons.Code className="w-6 h-6 text-neutral-400" />;
  }
  
  return (
    <div className="group-hover/tech:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-neutral-600 dark:text-neutral-300 transition-colors" style={{ color: color }} />
    </div>
  );
};

export default function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const categories = [
    "All Projects",
    "APIs & Backends",
    "Web Applications",
  ];

  // Extract unique technologies for filtering based on active category
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    
    const categoryProjects = activeCategory === "All Projects" 
      ? portfolioData.projects 
      : portfolioData.projects.filter(p => p.category === activeCategory);

    categoryProjects.forEach(p => {
      p.tech.forEach(t => techSet.add(t.name));
    });
    
    return Array.from(techSet).sort();
  }, [activeCategory]);

  // Filter projects by category and then by tech
  const filteredProjects = useMemo(() => {
    let result = portfolioData.projects;
    
    // 1. Filter by category
    if (activeCategory !== "All Projects") {
      result = result.filter(p => p.category === activeCategory);
    }
    
    // 2. Filter by tech tag
    if (activeTechFilter) {
      result = result.filter(p => p.tech.some(t => t.name === activeTechFilter));
    }
    
    return result;
  }, [activeCategory, activeTechFilter]);

  // Reset to first slide when category or tech filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [activeCategory, activeTechFilter]);

  const nextSlide = () => {
    if (filteredProjects.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    if (filteredProjects.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const renderIcon = (iconName: string) => {
    // @ts-ignore
    const IconComponent = LucideIcons[iconName] || LucideIcons.Folder;
    return <IconComponent className="w-6 h-6" />;
  };

  const activeProject = filteredProjects[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <>
    <section id="projects" className="relative py-32 md:py-40 bg-neutral-50 dark:bg-[#050505] overflow-hidden min-h-screen flex flex-col border-t border-neutral-200 dark:border-white/5 transition-colors duration-500">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex-1 flex flex-col">
        
        {/* Header & Category Tabs */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-sm font-bold tracking-widest text-[#FF6B00] uppercase mb-4">
            FEATURED WORK
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tighter leading-[1.1] text-center mb-10 transition-colors">
            Explore by <span className="text-[#FF6B00]">category.</span>
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 border-b border-neutral-300 dark:border-white/5 pb-4 w-full max-w-3xl transition-colors">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveTechFilter(null); // Reset tech filter on category change
                  }}
                  className={`relative px-4 py-2 text-sm md:text-base font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-lg ${
                    isActive ? "text-[#FF6B00]" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {category === "All Projects" ? t('projects_all') : 
                   category === "APIs & Backends" ? t('projects_api') : 
                   t('projects_web')}
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategoryTab"
                      className="absolute left-0 right-0 -bottom-[17px] h-0.5 bg-[#FF6B00]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Tech Filtering */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTechFilter(null)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
              activeTechFilter === null 
                ? "bg-[#FF6B00] text-white border-[#FF6B00]" 
                : "bg-white dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:border-[#FF6B00]/50"
            }`}
          >
            All Tech
          </button>
          {allTechnologies.map(tech => (
            <button
              key={tech}
              onClick={() => setActiveTechFilter(tech)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                activeTechFilter === tech 
                  ? "bg-[#FF6B00] text-white border-[#FF6B00]" 
                  : "bg-white dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:border-[#FF6B00]/50"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <p className="text-neutral-500 dark:text-neutral-400">No projects found with the selected filter.</p>
          </div>
        ) : (
          <div className="relative flex-1 min-h-[500px] flex items-center justify-center">
            
            {/* Navigation Arrows (Left/Right) - Desktop */}
            {filteredProjects.length > 1 && (
              <div className="hidden lg:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 justify-between z-20 pointer-events-none px-4">
                <button 
                  onClick={prevSlide}
                  className="w-14 h-14 rounded-full bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-800 dark:text-white hover:bg-[#FF6B00] dark:hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-all duration-300 pointer-events-auto transform hover:scale-110 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-14 h-14 rounded-full bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-800 dark:text-white hover:bg-[#FF6B00] dark:hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-all duration-300 pointer-events-auto transform hover:scale-110 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}

            <div className="w-full max-w-6xl mx-auto relative overflow-visible">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {activeProject && (
                  <motion.div
                    key={activeProject.title}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full relative rounded-[2rem] border border-neutral-200 dark:border-white/5 overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/50 group bg-white dark:bg-[#0a0a0a] transition-colors"
                  >
                    
                    {/* Full Background Image */}
                    <div className="absolute inset-0 z-0">
                      {activeProject.image ? (
                        <Image 
                          src={activeProject.image}
                          alt={activeProject.title}
                          fill
                          className="object-cover object-top opacity-10 dark:opacity-30 group-hover:opacity-20 dark:group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                        />
                      ) : null}
                      {/* Multi-layer gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/95 dark:to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/30 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/60 dark:to-[#0a0a0a]/30" />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/[0.05] to-transparent" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 flex flex-col lg:flex-row min-h-[550px]">
                      
                      {/* Project Details (Full Width) */}
                      <div className="w-full p-8 md:p-12 lg:p-16 flex flex-col justify-center max-w-4xl">
                      
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] w-max mb-8 backdrop-blur-sm">
                          {renderIcon(activeProject.icon || "Folder")}
                          <span className="text-sm font-bold tracking-wide uppercase">
                            {activeProject.category === "APIs & Backends" ? t('projects_api') : t('projects_web')}
                          </span>
                        </div>

                        <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.1] mb-6 transition-colors">
                          {activeProject.title}
                        </h4>
                        
                        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 max-w-2xl transition-colors">
                          {activeProject.description}
                        </p>

                        {/* Features List */}
                        {activeProject.features && (
                          <div className="mb-10">
                            <h5 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4 transition-colors">{t('projects_key_features')}</h5>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {activeProject.features.map((feature: string, i: number) => (
                                <li key={i} className="flex items-center gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
                                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tech Stack Icons */}
                        <div className="flex flex-wrap gap-3 mb-10">
                          {activeProject.tech.map((t: any) => (
                            <div 
                              key={t.name}
                              className="group/tech relative flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-100 dark:bg-white/[0.05] border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-200 dark:hover:bg-white/[0.15] hover:border-[#FF6B00]/30 transition-all duration-300 backdrop-blur-sm"
                            >
                              <TechIcon iconName={t.icon} />
                              <div className="absolute -top-10 scale-0 group-hover/tech:scale-100 transition-transform origin-bottom bg-[#222] text-white text-xs font-bold py-1 px-3 rounded shadow-lg pointer-events-none whitespace-nowrap z-50">
                                {t.name}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mt-auto">
                          <button 
                            onClick={() => setSelectedProject(activeProject)}
                            className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#ff4500] text-white font-semibold px-8 py-3.5 rounded-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,107,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                          >
                            <Info className="w-4 h-4" />
                            {t('projects_view_details')}
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            {filteredProjects.length > 1 && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                      currentIndex === index 
                        ? "w-8 bg-[#FF6B00]" 
                        : "w-2 bg-neutral-300 dark:bg-white/20 hover:bg-neutral-400 dark:hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>

    <ProjectModal 
      project={selectedProject} 
      isOpen={!!selectedProject} 
      onClose={() => setSelectedProject(null)} 
    />
    </>
  );
}
