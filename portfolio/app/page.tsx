"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import GitHubStats from "@/components/sections/GitHubStats";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen />}
      </AnimatePresence>
      
      {/* We use an opacity transition to gracefully show the main content */}
      <main className={`relative flex flex-col min-h-screen overflow-hidden bg-neutral-50 dark:bg-[#050505] transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Cinematic Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] pointer-events-none z-0">
        {/* Deep Red Glow */}
        <div 
          className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-[100%] pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse at center, rgba(161,0,0,0.35) 0%, transparent 70%)",
            filter: "blur(80px)" 
          }}
        />
        {/* Orange Highlight Glow */}
        <div 
          className="absolute top-[-100px] left-[30%] w-[600px] h-[400px] rounded-[100%] pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse at center, rgba(255,107,0,0.2) 0%, transparent 70%)",
            filter: "blur(60px)" 
          }}
        />
      </div>

      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <GitHubStats />
      <Contact />
      
    </main>
    </>
  );
}
