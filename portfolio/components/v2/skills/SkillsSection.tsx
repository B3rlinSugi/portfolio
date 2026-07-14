"use client";

import { motion } from "framer-motion";

const categorizedIcons = {
  "Core Backend": [
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
    { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" }
  ],
  "Frontend UI": [
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" }
  ],
  "Data Storage": [
    { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" }
  ],
  "DevOps & Tools": [
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
    { name: "Ubuntu", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-plain.svg" },
    { name: "Nginx", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
    { name: "Bash", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
    { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" }
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
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
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-gray-500 mb-2 font-bold">THE ARSENAL</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Bookshelf.
          </h2>
          <p className="text-gray-400 max-w-2xl text-xs md:text-sm font-medium leading-relaxed">
            A comprehensive collection of the frameworks, languages, and tools that power my engineering workflow, neatly categorized on their respective shelves.
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

      </div>
    </section>
  );
}
