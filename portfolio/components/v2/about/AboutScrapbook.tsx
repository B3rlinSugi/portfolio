"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutScrapbook() {
  return (
    <section 
      className="relative w-full min-h-screen bg-[#121212] text-gray-300 overflow-x-hidden pt-20 pb-10 font-sans"
      style={{
        // Grid paper texture
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      
      {/* SVG Filter for Sticker Outline */}
      <svg className="hidden">
        <filter id="sticker-outline">
          {/* Dilate the alpha channel to create a thick outline */}
          <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="12" />
          {/* Fill the dilated area with gradient/color */}
          <feFlood floodColor="#4F46E5" floodOpacity="1" result="RED" />
          {/* Clip the red to the dilated alpha */}
          <feComposite in="RED" in2="DILATED" operator="in" result="OUTLINE" />
          {/* Merge the red outline behind the original image */}
          <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* Decorative Stamp Top Right */}
      <div className="absolute top-10 right-10 opacity-20 rotate-12 mix-blend-screen">
        <svg width="40" height="40" viewBox="0 0 100 100" className="text-white fill-current">
          <path d="M50 0 A 50 50 0 1 0 50 100 A 50 50 0 1 0 50 0 Z M50 15 A 35 35 0 1 1 50 85 A 35 35 0 1 1 50 15 Z" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative h-full flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Sticker Portrait */}
        <div className="relative w-full md:w-[40%] xl:w-[35%] flex justify-center md:justify-start md:mt-10 z-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative"
          >
            {/* Main Portrait with SVG Sticker Filter & Glow */}
            <div className="relative w-[320px] h-[400px] md:w-[420px] md:h-[500px] z-10" style={{ filter: 'url(#sticker-outline) drop-shadow(0px 0px 30px rgba(139,92,246,0.6))' }}>
              <Image 
                src="/Sugi.png" 
                alt="Berlin Sugiyanto"
                fill
                priority
                className="object-cover object-top filter contrast-[1.05]"
              />
            </div>

            {/* Floating Tag */}
            <div className="absolute top-[60%] -right-4 md:-right-6 bg-white shadow-md px-4 py-2 rotate-[-8deg] z-30">
              <span className="font-mono text-sm tracking-widest font-black text-black">MADE BY BERLIN</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Editorial Content */}
        <div className="relative w-full md:w-[60%] xl:w-[65%] flex flex-col gap-6 md:pt-10 z-10">
          
          {/* Main Headline */}
          <div className="relative w-max mb-2">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white border-b border-white/20 pb-2 inline-block">
              Hello! I'm <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Berlin</span>
            </h2>
            {/* Stamp sticker */}
            <div className="absolute -top-6 -right-6 md:-right-10 bg-white rotate-12 px-2 py-1 shadow-md">
              <span className="font-mono text-xs font-bold text-black">ID / BKS</span>
            </div>
          </div>

          {/* Columns Section */}
          <div className="flex flex-col md:flex-row gap-6 lg:gap-12 mt-4 w-full">
            
            {/* Left Area: Intro, Experience, and Polaroids */}
            <div className="md:w-[75%] flex flex-col w-full">
              
              {/* Intro & Experience Row */}
              <div className="flex flex-col md:flex-row gap-6 lg:gap-12">
                
                {/* Column 1: Intro */}
                <div className="md:w-[60%] flex flex-col gap-4 text-[13px] md:text-sm font-medium text-gray-400 leading-snug tracking-tight pr-0 lg:pr-4">
                  <p>
                    I am a <span className="font-bold text-white">Full-Stack Web Developer</span> who loves solving complex problems. I enjoy designing architectures from the database layer all the way up to the frontend UI, ensuring every piece of the application is scalable, maintainable, and seamlessly connected.
                  </p>
                  <p>
                    Currently, I focus on building data-driven systems and robust RESTful APIs. I work passionately utilizing my skills in <span className="font-bold text-white">PHP, Java,</span> and modern web frameworks to bring impactful projects to life.
                  </p>
                </div>

                {/* Column 2: Experience */}
                <div className="md:w-[40%] flex flex-col gap-4">
                  <h3 className="text-xl font-bold border-b border-white/20 pb-1 text-white">Experience</h3>
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-blue-400">24-Now</span>
                      <span className="font-bold text-white">Freelance Web Dev</span>
                    </div>
                    <p className="text-xs font-medium text-gray-300">Skincare Stock & Prime Property</p>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium leading-relaxed">
                      Building full-stack platforms and participating in open-source developer bounties.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-blue-400">2021-24</span>
                      <span className="font-bold text-white">Minister of Sospol</span>
                    </div>
                    <p className="text-xs font-medium text-gray-300">BEM Universitas Gunadarma</p>
                  </div>
                </div>

              </div>

              {/* Polaroids Row (Removed per user request) */}

            </div> {/* End Left Area */}

            {/* Column 3: Studies, Focus, Tools */}
            <div className="md:w-[25%] flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold border-b border-white/20 pb-1 text-white">Studies <span className="text-gray-500 text-[10px] align-top font-normal ml-1">ID/BKS</span></h3>
                <div className="flex gap-2 items-baseline">
                  <span className="font-bold text-blue-400 text-sm">21-26</span>
                  <span className="text-xs font-medium text-gray-300">Universitas Gunadarma</span>
                </div>
                <p className="text-xs font-medium text-gray-300">Informatics Engineering</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold border-b border-white/20 pb-1 text-white">Focus</h3>
                <ul className="text-xs font-medium text-gray-300 space-y-1">
                  <li className="flex items-center gap-2"><span className="text-purple-400 text-[10px]">▶</span> Full-Stack Web Dev</li>
                  <li className="flex items-center gap-2"><span className="text-purple-400 text-[10px]">▶</span> Backend Architecture</li>
                  <li className="flex items-center gap-2"><span className="text-purple-400 text-[10px]">▶</span> RESTful APIs</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold border-b border-white/20 pb-1 text-white">Tools</h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['PHP', 'PostgreSQL', 'Laravel', 'Spring Boot', 'MySQL', 'React', 'TS', 'Tailwind'].map((tool, idx) => (
                    <span key={idx} className="bg-white/10 text-gray-300 text-[10px] px-1.5 py-0.5 rounded shadow-sm border border-white/5">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
