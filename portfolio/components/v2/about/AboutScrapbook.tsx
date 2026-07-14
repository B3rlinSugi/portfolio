"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutScrapbook() {
  return (
    <section 
      className="relative w-full min-h-screen bg-[#F3F0EC] text-[#222] overflow-x-hidden pt-20 pb-10 font-sans"
      style={{
        // Grid paper texture
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      
      {/* SVG Filter for Sticker Outline */}
      <svg className="hidden">
        <filter id="sticker-outline">
          {/* Dilate the alpha channel to create a thick outline */}
          <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="12" />
          {/* Fill the dilated area with red */}
          <feFlood floodColor="#E74C3C" floodOpacity="1" result="RED" />
          {/* Clip the red to the dilated alpha */}
          <feComposite in="RED" in2="DILATED" operator="in" result="OUTLINE" />
          {/* Merge the red outline behind the original image */}
          <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* Decorative Red Stamp Top Right */}
      <div className="absolute top-10 right-10 opacity-80 rotate-12 mix-blend-multiply">
        <svg width="40" height="40" viewBox="0 0 100 100" className="text-[#E74C3C] fill-current">
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
            {/* Main Portrait with SVG Sticker Filter */}
            <div className="relative w-[320px] h-[400px] md:w-[420px] md:h-[500px] z-10" style={{ filter: 'url(#sticker-outline) drop-shadow(10px 10px 15px rgba(0,0,0,0.15))' }}>
              <Image 
                src="/sugi.png" 
                alt="Berlin Sugiyanto"
                fill
                priority
                className="object-cover object-top filter contrast-[1.05]"
              />
            </div>

            {/* Floating Tag */}
            <div className="absolute top-[60%] -right-4 md:-right-6 bg-white border border-gray-300 shadow-sm px-4 py-2 rotate-[-8deg] z-30">
              <span className="font-mono text-sm tracking-widest font-bold text-gray-800">MADE BY BERLIN</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Editorial Content */}
        <div className="relative w-full md:w-[60%] xl:w-[65%] flex flex-col gap-6 md:pt-10 z-10">
          
          {/* Main Headline */}
          <div className="relative w-max mb-2">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 border-b border-gray-400 pb-2 inline-block">
              Hello! I'm <span className="text-[#E74C3C]">Berlin</span>
            </h2>
            {/* Stamp sticker */}
            <div className="absolute -top-6 -right-6 md:-right-10 bg-white border border-gray-400 rotate-12 px-2 py-1 shadow-sm">
              <span className="font-mono text-xs text-gray-600">ID / YOG</span>
            </div>
          </div>

          {/* Columns Section */}
          <div className="flex flex-col md:flex-row gap-6 lg:gap-12 mt-4 w-full">
            
            {/* Left Area: Intro, Experience, and Polaroids */}
            <div className="md:w-[75%] flex flex-col w-full">
              
              {/* Intro & Experience Row */}
              <div className="flex flex-col md:flex-row gap-6 lg:gap-12">
                
                {/* Column 1: Intro */}
                <div className="md:w-[60%] flex flex-col gap-4 text-[13px] md:text-sm font-medium text-gray-800 leading-snug tracking-tight pr-0 lg:pr-4">
                  <p>
                    It doesn't matter if I'm at my desk or out exploring; I'm always thinking about building something. I <span className="font-bold">love</span> coding, designing, reading, brewing coffee, and occasionally capturing moments through my lens.
                  </p>
                  <p>
                    I am a Software Engineer and Backend Specialist. I dedicate myself to creating robust APIs, and currently, I work passionately as a <span className="font-bold">Backend Developer</span> crafting seamless integrations and scalable architectures for various impactful projects.
                  </p>
                </div>

                {/* Column 2: Experience */}
                <div className="md:w-[40%] flex flex-col gap-4">
                  <h3 className="text-xl font-bold border-b border-gray-300 pb-1">Experience</h3>
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-[#E74C3C]">2024</span>
                      <span className="font-bold text-gray-900">Backend Dev</span>
                    </div>
                    <p className="text-xs font-medium text-gray-800">Freelance / Remote</p>
                    <p className="text-[11px] text-[#2c7a3f] mt-1 font-medium leading-relaxed">
                      Building scalable backend architectures using Laravel, PostgreSQL, and Express for diverse clients.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-[#E74C3C]">2023</span>
                      <span className="font-bold text-gray-900">Fullstack Web</span>
                    </div>
                    <p className="text-xs font-medium text-gray-800">Tech Agency</p>
                  </div>
                </div>

              </div>

              {/* Polaroids Row Underneath Intro & Experience */}
              <div className="flex justify-between items-end gap-2 md:gap-4 mt-6 pt-4 pointer-events-none z-30">
                
                {/* Polaroid 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50, rotate: -5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                  className="bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-xl border border-gray-200 transform cursor-pointer flex-1 max-w-[200px] pointer-events-auto rotate-[-3deg]"
                >
                  <div className="relative aspect-square w-full bg-gray-200 overflow-hidden">
                    <Image src="/1.png" alt="Life 1" fill className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <p className="font-mono mt-1 text-center text-gray-700 text-lg font-bold uppercase tracking-widest">BEM</p>
                </motion.div>

                {/* Polaroid 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                  className="bg-white p-2 pb-8 md:p-3 md:pb-10 shadow-xl border border-gray-200 transform cursor-pointer flex-1 max-w-[210px] pointer-events-auto rotate-[2deg] -mt-6"
                >
                  <div className="relative aspect-square w-full bg-gray-200 overflow-hidden">
                    <Image src="/2.png" alt="Life 2" fill className="object-cover filter sepia hover:sepia-0 transition-all duration-500" />
                  </div>
                  <p className="font-mono mt-2 text-center text-gray-700 text-xl font-bold uppercase tracking-widest">HIMTI</p>
                </motion.div>

                {/* Polaroid 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50, rotate: 6 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                  className="bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-xl border border-gray-200 transform cursor-pointer flex-1 max-w-[200px] pointer-events-auto rotate-[-2deg]"
                >
                  <div className="relative aspect-square w-full bg-gray-200 overflow-hidden">
                    <Image src="/3.png" alt="Life 3" fill className="object-cover filter brightness-75 hover:brightness-100 transition-all duration-500" />
                  </div>
                  <p className="font-mono mt-1 text-center text-gray-700 text-lg font-bold uppercase tracking-widest">ME</p>
                </motion.div>

              </div>

            </div> {/* End Left Area */}

            {/* Column 3: Studies, Focus, Tools */}
            <div className="md:w-[25%] flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold border-b border-gray-300 pb-1">Studies <span className="text-[#E74C3C] text-[10px] align-top font-normal ml-1">ID/EN</span></h3>
                <div className="flex gap-2 items-baseline">
                  <span className="font-bold text-[#2c7a3f] text-sm">2024</span>
                  <span className="text-xs font-medium">Computer Science</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold border-b border-gray-300 pb-1">Focus</h3>
                <ul className="text-xs font-medium text-gray-800 space-y-1">
                  <li className="flex items-center gap-2"><span className="text-[#2c7a3f] text-[10px]">▶</span> Backend Dev</li>
                  <li className="flex items-center gap-2"><span className="text-[#2c7a3f] text-[10px]">▶</span> API Design</li>
                  <li className="flex items-center gap-2"><span className="text-[#2c7a3f] text-[10px]">▶</span> Databases</li>
                  <li className="flex items-center gap-2"><span className="text-[#2c7a3f] text-[10px]">▶</span> Architecture</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold border-b border-gray-300 pb-1">Tools</h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['Laravel', 'PHP', 'NodeJS', 'NextJS', 'MySQL', 'Postgres', 'Git', 'Docker'].map((tool, idx) => (
                    <span key={idx} className="bg-[#2c3e50] text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">
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
