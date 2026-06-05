"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageContext";
import { 
  SiTypescript, SiNextdotjs, SiReact, SiTailwindcss, SiNodedotjs,
  SiPhp, SiMysql, SiJavascript, SiHtml5, SiCss, SiBootstrap,
  SiLaravel, SiJsonwebtokens, SiPostman, SiSpringboot, SiSpring,
  SiApachemaven, SiChartdotjs, SiPostgresql, SiPrisma, SiFramer, 
  SiGreensock, SiComposer, SiXampp, SiVercel
} from "react-icons/si";
import { FaJava, FaGithub } from "react-icons/fa";

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
  const color = techColorMap[iconName] || "#FF6B00";

  if (!Icon) {
    const LucideIcon = (LucideIcons as any)[iconName];
    if (LucideIcon) return <LucideIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" style={{ color }} />;
    return <LucideIcons.Code className="w-5 h-5 text-neutral-400" />;
  }
  
  return <Icon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" style={{ color }} />;
};

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t } = useLanguage();

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-neutral-900/50 dark:bg-black/80 backdrop-blur-sm transition-colors"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0A0A0A] border border-neutral-200 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl pointer-events-auto transition-colors"
            >
              
              {/* Header with Image */}
              <div className="relative h-48 sm:h-64 lg:h-80 w-full flex-shrink-0 bg-neutral-100 dark:bg-black overflow-hidden group transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0A0A0A] to-transparent z-10 transition-colors" />
                {project.image ? (
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill
                    className="object-cover object-top opacity-80 dark:opacity-60 group-hover:opacity-100 dark:group-hover:opacity-80 transition-opacity duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200 dark:bg-neutral-900 transition-colors" />
                )}
                
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/50 dark:bg-black/50 border border-neutral-300 dark:border-white/10 flex items-center justify-center text-neutral-900 dark:text-white hover:bg-red-500 hover:text-white dark:hover:bg-red-500/80 hover:border-red-500 transition-all backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 z-20 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/30 text-[#FF6B00] mb-3 backdrop-blur-sm">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {project.category === "APIs & Backends" ? t('projects_api') : t('projects_web')}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Body Content - Scrollable */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-8 flex flex-col gap-8">
                
                {/* Description */}
                <div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2 transition-colors">
                    <LucideIcons.Info className="w-5 h-5 text-[#FF6B00]" />
                    {t('projects_project_overview')}
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed text-sm sm:text-base transition-colors">
                    {project.description}
                  </p>
                </div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                      <LucideIcons.ListChecks className="w-5 h-5 text-[#FF6B00]" />
                      {t('projects_key_features')}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05] p-3 rounded-xl transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-neutral-700 dark:text-neutral-300 transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                    <LucideIcons.Cpu className="w-5 h-5 text-[#FF6B00]" />
                    {t('projects_tech_used')}
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.tech.map((t: any) => (
                      <div key={t.name} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors">
                        <TechIcon iconName={t.icon} />
                        <span className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition-colors">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="flex-shrink-0 border-t border-neutral-200 dark:border-white/10 p-6 bg-neutral-100/80 dark:bg-black/50 backdrop-blur-md flex flex-wrap gap-4 items-center justify-end transition-colors">
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-white/[0.05] hover:bg-neutral-100 dark:hover:bg-white/[0.1] text-neutral-900 dark:text-white font-bold transition-all border border-neutral-300 dark:border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                  >
                    <FaGithub className="w-5 h-5" />
                    {t('projects_source_code')}
                  </a>
                )}
                {(project.demo || project.github) && (
                  <a 
                    href={project.demo || project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#ff8533] text-white font-bold transition-all shadow-lg shadow-[#FF6B00]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                  >
                    {t('projects_visit_live')}
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                )}
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
