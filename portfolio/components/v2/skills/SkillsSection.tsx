"use client";

import { motion } from "framer-motion";

const categorizedIcons = {
  "Languages & Runtimes": [
    { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
    { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" }
  ],
  "Frameworks & Libraries": [
    { name: "Laravel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
    { name: "Spring Boot", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
    { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Framer Motion", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" }
  ],
  "Databases & ORM": [
    { name: "Oracle", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
    { name: "SQL Server", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
    { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    { name: "Supabase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
    { name: "Prisma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
    { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-plain.svg" }
  ],
  "DevOps & Tools": [
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
    { name: "Bash", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
    { name: "Vercel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
    { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
    { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
    { name: "Composer", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/composer/composer-original.svg" },
    { name: "ESLint", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg" }
  ]
};

const otherSkills = [
  "SDLC", "System Analysis & Design", "REST API", "MVC Pattern", "Object-Oriented Programming (OOP)", "Clean Code", 
  "JWT / NextAuth", "RBAC / bcrypt", "Zustand", "Eloquent ORM", "Migrations", 
  "Chart.js", "PDF Gen", "Maven", "PDO"
];

const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 20 } }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative w-full min-h-screen bg-[#121212] text-gray-300 py-20 overflow-hidden border-t border-white/5 flex flex-col justify-center">
      
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-[95%] md:w-[90%] xl:w-[85%] max-w-[1400px] mx-auto flex flex-col h-full justify-center">
        
        {/* Header Layout (More compact) */}
        <div className="text-center md:text-left mb-10 md:mb-12">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-blue-500 mb-2 font-bold uppercase">EXPERTISE</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            TECH STACK.
          </h2>
          <p className="text-gray-400 max-w-2xl text-xs md:text-sm font-medium leading-relaxed">
            An overview of the programming languages, frameworks, databases, and tools I use to build robust, scalable, and high-performance applications.
          </p>
        </div>

        {/* Categorized Shelves (Compact 2x2 Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-12">
          {Object.entries(categorizedIcons).map(([category, icons], shelfIdx) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: shelfIdx * 0.1 }}
              className="flex flex-col"
            >
              
              {/* Shelf Title / Divider */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter whitespace-nowrap">
                  {category}
                </h3>
                {/* Thick Wooden/Metal Shelf Line */}
                <div className="w-full h-1 bg-white/10 rounded-full" />
              </div>

              {/* Shelf Grid (Compact Icons) */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="w-full flex flex-wrap gap-3 md:gap-4 justify-start"
              >
                {icons.map((icon, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#1A1A1A] rounded-[22%] sm:rounded-[25%] shadow-[0_3px_8px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col items-center justify-center p-2.5 sm:p-3 md:p-4 transition-shadow hover:shadow-[0_12px_24px_rgba(0,0,0,0.8)] cursor-pointer"
                  >
                    {/* Inner highlight for a subtle "glass/plastic" feel */}
                    <div className="absolute inset-0 rounded-[22%] sm:rounded-[25%] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    
                    <img 
                      src={icon.url} 
                      alt={icon.name} 
                      className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110" 
                    />

                    {/* Tooltip that appears above the icon */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap pointer-events-none z-50">
                      {icon.name}
                      {/* Tooltip triangle */}
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          ))}
        </div>

        {/* Other Skills & Concepts (Text Badges) */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Other Skills & Concepts</h3>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {otherSkills.map((skill, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-xs md:text-sm font-semibold tracking-wide hover:bg-white/10 hover:text-white transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
