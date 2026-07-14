"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Play, Info, Shield, Award, Database } from "lucide-react";
import { SiCss, SiLinux, SiMysql, SiPhp } from "react-icons/si";

const certIconMap: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  SiPhp: { icon: SiPhp, color: "#777BB4" },
  SiMysql: { icon: SiMysql, color: "#4479A1" },
  SiLinux: { icon: SiLinux, color: "#FCC624" },
  SiCss3: { icon: SiCss, color: "#1572B6" },
  SiOracle: { icon: Database, color: "#F80000" },
};

function CertIcon({ iconName, isBNSP, className = "" }: { iconName: string; isBNSP?: boolean; className?: string }) {
  if (isBNSP || iconName.startsWith("/")) {
    return <Shield className={className} />;
  }
  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className={className} style={{ color: iconData.color }} />;
  }
  return <Award className={className} />;
}

export default function CertificatesSectionStreaming() {
  const certs = portfolioData.certifications;
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCert = certs[activeIdx];

  return (
    <section id="certificates" className="relative w-full h-[100vh] min-h-[800px] bg-[#141414] text-white overflow-hidden flex flex-col justify-end pb-12 md:pb-24 select-none">
      
      {/* Background Layer (Menciptakan efek Ambient yang berubah sesuai sertifikat) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCert.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Ambient warna berdasarkan status sertifikat */}
            <div className={`absolute top-[-10%] right-[-10%] w-[60vw] h-[80vh] blur-[150px] opacity-30 ${activeCert.isBNSP ? 'bg-[#E50914]' : 'bg-blue-600'}`} />
            
            <div className="absolute top-[20%] right-[10%] opacity-10">
               <CertIcon iconName={activeCert.icon} isBNSP={activeCert.isBNSP} className="w-[40vw] h-[40vw]" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient untuk menggelapkan bagian bawah agar teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/50 to-transparent z-10" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 px-6 md:px-16 w-full max-w-[1600px] mx-auto mb-12 md:mb-20">
        
        {/* Kategori / Label ala Netflix Series */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-[#E50914] rounded-sm flex items-center justify-center">
             <span className="text-white text-[8px] font-black">N</span>
          </div>
          <span className="text-[#E50914] font-bold text-sm tracking-widest uppercase shadow-black drop-shadow-md">
            Portfolio Original
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCert.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-6 shadow-black drop-shadow-xl max-w-4xl leading-tight">
              {activeCert.name}
            </h2>
            
            {/* Meta Info */}
            <div className="flex gap-3 md:gap-4 items-center mb-6 font-semibold text-sm md:text-base">
              <span className="text-[#46d369] drop-shadow-md">Match {Math.floor(Math.random() * 10) + 90}%</span>
              <span className="text-gray-300 border border-gray-600 px-1.5 bg-black/40 rounded-sm">{activeCert.year}</span>
              <span className="text-gray-300 border border-gray-600 px-1.5 bg-black/40 rounded-sm uppercase">{activeCert.isBNSP ? "National" : "Course"}</span>
              <span className="text-gray-300 drop-shadow-md">{activeCert.issuer}</span>
            </div>
            
            <p className="max-w-3xl text-base md:text-xl text-gray-300 mb-8 line-clamp-3 shadow-black drop-shadow-md leading-relaxed">
              {activeCert.description}
            </p>
          </motion.div>
        </AnimatePresence>
        
        {/* Action Buttons */}
        <div className="flex gap-4">
          <a 
            href={activeCert.driveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-md flex items-center font-bold text-lg gap-3 hover:bg-gray-200 transition-colors"
          >
            <Play fill="currentColor" className="w-6 h-6" /> View Document
          </a>
          <button 
            className="bg-gray-500/40 backdrop-blur-md border border-white/10 text-white px-6 md:px-8 py-2 md:py-3 rounded-md flex items-center font-bold text-lg gap-3 hover:bg-gray-500/60 transition-colors"
          >
            <Info className="w-6 h-6" /> More Info
          </button>
        </div>
      </div>

      {/* Thumbnail Carousel (Up Next) */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto">
        <h3 className="px-6 md:px-16 text-xl md:text-2xl font-bold mb-4 text-gray-300">Up Next in Certifications</h3>
        
        <div className="flex gap-4 px-6 md:px-16 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {certs.map((cert, idx) => (
            <div 
              key={cert.name}
              onClick={() => setActiveIdx(idx)} 
              className={`relative shrink-0 w-64 md:w-72 h-36 md:h-40 rounded-md overflow-hidden bg-[#222] cursor-pointer transition-all duration-300 snap-start ${
                idx === activeIdx 
                  ? 'border-2 border-white scale-105 shadow-2xl z-30' 
                  : 'border-2 border-transparent opacity-50 hover:opacity-100 hover:border-gray-500 hover:scale-100 z-10'
              }`}
            >
              {/* Thumbnail Ambient Background */}
              <div className={`absolute inset-0 opacity-20 ${cert.isBNSP ? 'bg-[#E50914]' : 'bg-blue-600'}`} />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center border border-white/10">
                     <CertIcon iconName={cert.icon} isBNSP={cert.isBNSP} className="w-5 h-5 text-gray-300" />
                  </div>
                  {cert.isBNSP && (
                    <span className="text-[9px] font-black uppercase tracking-wider text-white bg-[#E50914] px-1.5 py-0.5 rounded-sm">Top</span>
                  )}
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-snug line-clamp-2">{cert.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Style internal untuk menyembunyikan scrollbar bawaan browser tapi tetap bisa discroll */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
