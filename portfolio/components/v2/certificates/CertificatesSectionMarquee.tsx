"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export default function CertificatesSectionMarquee() {
  const certs = portfolioData.certifications;
  const [hoveredCert, setHoveredCert] = useState<any | null>(null);

  // Duplikasi array untuk efek infinite loop yang mulus
  const marqueeItemsRow1 = [...certs, ...certs];
  const marqueeItemsRow2 = [...certs].reverse().concat([...certs].reverse());
  const marqueeItemsRow3 = [...certs.slice(3), ...certs.slice(0,3), ...certs.slice(3), ...certs.slice(0,3)];

  return (
    <section id="certificates" className="relative w-full min-h-[100vh] bg-[#F4F4F0] text-[#111] py-32 overflow-hidden flex flex-col justify-center">
      
      {/* Custom CSS untuk Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 40s linear infinite;
        }
        /* Pause saat di-hover pada kontainer utamanya */
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}} />

      <div className="absolute top-12 left-12 z-10 pointer-events-none">
        <p className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-[#E74C3C]">
          [ Interactive Registry ]
        </p>
      </div>

      <div className="marquee-container flex flex-col gap-8 md:gap-12 relative z-0 mt-10">
        
        {/* ROW 1 (Kiri) */}
        <div className="flex w-[200vw] md:w-[300vw] animate-marquee-left">
          {marqueeItemsRow1.map((cert, idx) => (
            <div 
              key={`r1-${idx}`} 
              className="flex items-center gap-8 md:gap-16 px-4 md:px-8 shrink-0 group cursor-crosshair"
              onMouseEnter={() => setHoveredCert(cert)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              <h3 className="text-6xl md:text-8xl lg:text-[140px] font-black uppercase tracking-tighter text-transparent transition-colors duration-300 group-hover:text-[#111] group-hover:scale-105" 
                  style={{ WebkitTextStroke: "2px #111" }}>
                {cert.name}
              </h3>
              <ArrowUpRight className="w-16 h-16 md:w-24 md:h-24 text-[#E74C3C] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* ROW 2 (Kanan) */}
        <div className="flex w-[200vw] md:w-[300vw] animate-marquee-right">
          {marqueeItemsRow2.map((cert, idx) => (
            <div 
              key={`r2-${idx}`} 
              className="flex items-center gap-8 md:gap-16 px-4 md:px-8 shrink-0 group cursor-crosshair"
              onMouseEnter={() => setHoveredCert(cert)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              <h3 className="text-6xl md:text-8xl lg:text-[140px] font-black uppercase tracking-tighter text-transparent transition-colors duration-300 group-hover:text-[#111] group-hover:scale-105" 
                  style={{ WebkitTextStroke: "2px #111" }}>
                {cert.name}
              </h3>
              <ArrowUpRight className="w-16 h-16 md:w-24 md:h-24 text-[#E74C3C] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>

      {/* FIXED REVEAL CARD (Muncul di tengah saat Hover) */}
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-4">
        <AnimatePresence>
          {hoveredCert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-gray-200 pointer-events-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-mono text-xl font-black text-gray-300 block mb-2">{hoveredCert.year}</span>
                  {hoveredCert.isBNSP && (
                    <span className="inline-block px-3 py-1 bg-[#E74C3C] text-white text-xs font-bold tracking-widest uppercase rounded">
                      National Standard
                    </span>
                  )}
                </div>
              </div>

              <h4 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {hoveredCert.name}
              </h4>
              <p className="text-[#E74C3C] font-semibold text-lg mb-4">
                {hoveredCert.issuer}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {hoveredCert.description}
              </p>

              <a
                href={hoveredCert.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#111] text-white font-bold uppercase tracking-wider rounded-xl hover:bg-[#E74C3C] transition-colors group"
              >
                Access Original Document
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
