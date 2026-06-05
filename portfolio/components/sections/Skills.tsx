"use client";

import { motion } from "framer-motion";
import { 
  SiPhp, SiLaravel, SiNextdotjs, SiReact, SiTypescript, SiMysql, 
  SiPostgresql, SiGit, SiPostman, SiNodedotjs, SiHtml5, 
  SiBootstrap, SiFramer, SiGreensock
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { 
  Database, ShieldCheck, Lock, CheckCircle2, 
  FileText, Code, Settings, Server, Wrench, Star, Layout
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";

// Top Icon Cloud Data
const mainSkills = [
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", lightColor: "#000000" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" }
];

// Bottom Categories Data
const skillCategories = [
  {
    title: "Backend",
    icon: Code,
    skills: ["Laravel", "PHP 8 (MVC)", "Java / Spring", "Node.js", "REST API", "PDO"]
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap 5"]
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "Prisma ORM", "Eloquent", "JPA / Hibernate", "Migrations"]
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    skills: ["Git / GitHub", "Vercel", "Postman", "ESLint", "Composer / Maven"]
  },
  {
    title: "Other Skills",
    icon: Star,
    skills: ["OOP", "Clean Code", "JWT / NextAuth", "RBAC / bcrypt", "Chart.js", "PDF Gen"]
  }
];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative py-32 bg-white dark:bg-[#050505] overflow-hidden border-t border-neutral-200 dark:border-white/5 min-h-screen flex items-center transition-colors duration-500">
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF6B00]/10 dark:bg-[#FF6B00]/5 rounded-full blur-[120px] pointer-events-none transition-colors" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ff4500]/10 dark:bg-[#ff4500]/5 rounded-full blur-[100px] pointer-events-none transition-colors" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Section: Title & Icon Cloud */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          
          {/* Left: Title Text */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold text-[#FF6B00] tracking-[0.2em] uppercase mb-4">
                Tech Stack
              </h2>
              <h3 
                className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-[1.2] mb-6 transition-colors"
                dangerouslySetInnerHTML={{ __html: t('skills_headline') }}
              />
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-md transition-colors">
                {t('skills_subheadline')}
              </p>
            </motion.div>
          </div>

          {/* Right: Icon Tags Cloud */}
          <div className="w-full lg:w-[60%] flex flex-wrap justify-center lg:justify-end gap-4">
            {mainSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/40 hover:bg-white dark:hover:bg-white/[0.05] transition-all cursor-default backdrop-blur-sm group shadow-sm dark:shadow-none"
                >
                  <Icon 
                    className={`w-7 h-7 transition-transform group-hover:scale-110 ${skill.name === 'Next.js' ? 'text-black dark:text-white' : ''}`} 
                    style={skill.name !== 'Next.js' ? { color: skill.color } : {}} 
                  />
                  <span className="text-neutral-800 dark:text-white font-semibold text-lg transition-colors">{skill.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                className="bg-neutral-50 dark:bg-[#0a0a0a] rounded-3xl border border-neutral-200 dark:border-white/10 p-6 hover:border-[#FF6B00]/40 dark:hover:border-[#FF6B00]/30 transition-colors group relative overflow-hidden shadow-sm dark:shadow-none"
              >
                {/* Card Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center border border-[#FF6B00]/20 shrink-0">
                    <Icon className="w-4 h-4 text-[#FF6B00]" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight transition-colors">{category.title}</h4>
                </div>

                {/* Skills List */}
                <ul className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] mt-2 shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium text-sm leading-relaxed transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
