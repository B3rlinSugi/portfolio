"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, Shield, Database, ExternalLink, X, Cpu } from "lucide-react";
import { SiCss, SiLinux, SiMysql, SiPhp } from "react-icons/si";

const certIconMap: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  SiPhp: { icon: SiPhp, color: "#777BB4" },
  SiMysql: { icon: SiMysql, color: "#4479A1" },
  SiLinux: { icon: SiLinux, color: "#FCC624" },
  SiCss3: { icon: SiCss, color: "#1572B6" },
  SiOracle: { icon: Database, color: "#F80000" },
};

function CertIcon({ iconName, isBNSP, size = 8 }: { iconName: string; isBNSP?: boolean; size?: number }) {
  if (isBNSP || iconName.startsWith("/")) {
    return <Shield className={`w-${size} h-${size} text-cyan-400`} />;
  }

  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className={`w-${size} h-${size}`} style={{ color: iconData.color }} />;
  }

  return <Award className={`w-${size} h-${size} text-gray-400`} />;
}

export default function CertificatesSectionTree() {
  const certs = portfolioData.certifications;
  const [activeCert, setActiveCert] = useState<any | null>(null);

  // Hardcode mapping berdasarkan index dari data portfolio untuk membentuk Tree (Bottom-Up)
  // L1: 5 (DBMS), 6 (Server OS)
  // L2: 4 (Oracle), 3 (Linux)
  // L3: 1 (Web Dev), 2 (Web Design)
  // L4: 0 (BNSP)
  const treeLevels = [
    [certs[0]], // Level 4 (Puncak)
    [certs[1], certs[2]], // Level 3
    [certs[4], certs[3]], // Level 2
    [certs[5], certs[6]], // Level 1 (Dasar)
  ];

  return (
    <section id="certificates" className="relative w-full min-h-[120vh] bg-[#0A0E17] text-white overflow-hidden py-24 flex items-center justify-center font-mono">
      
      {/* Sci-fi Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-[#0A0E17] pointer-events-none" />

      {/* Title */}
      <div className="absolute top-12 left-0 w-full text-center z-10 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 tracking-widest uppercase mb-2">
          Skill Tree
        </h2>
        <p className="text-cyan-600/70 text-sm tracking-widest">Select a node to view certification details</p>
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 mt-20">
        
        {/* Tree Container */}
        <div className="relative flex flex-col items-center gap-16 md:gap-24">
          
          {/* SVG Lines connecting nodes (absolute behind) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            {/* Hanya dekorasi garis vertikal sederhana agar adaptif */}
            <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="25%" y1="30%" x2="25%" y2="95%" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="75%" y1="30%" x2="75%" y2="95%" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Diagonal lines connect level 3 to level 4 (center) */}
            <line x1="25%" y1="30%" x2="50%" y2="5%" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="75%" y1="30%" x2="50%" y2="5%" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Render Nodes */}
          {treeLevels.map((level, levelIdx) => (
            <div key={levelIdx} className={`w-full flex justify-center gap-16 md:gap-40 ${level.length === 1 ? 'px-0' : 'px-10'}`}>
              {level.map((cert, certIdx) => {
                const isActive = activeCert?.name === cert.name;
                const isBNSP = cert.isBNSP;

                return (
                  <div key={cert.name} className="relative group">
                    {/* Node Hover Glow */}
                    <div className={`absolute inset-0 blur-xl transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'} ${isBNSP ? 'bg-cyan-500' : 'bg-indigo-500'}`} />
                    
                    <button
                      onClick={() => setActiveCert(cert)}
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#0f172a] border-cyan-400 scale-110 shadow-[0_0_30px_rgba(34,211,238,0.3)]' 
                          : 'bg-[#0b0f19] border-slate-700 hover:border-indigo-400 hover:scale-105'
                      }`}
                      style={{
                        transform: isActive ? 'rotate(45deg) scale(1.1)' : 'rotate(45deg)',
                      }}
                    >
                      {/* Un-rotate the content inside */}
                      <div style={{ transform: 'rotate(-45deg)' }} className="flex flex-col items-center gap-1">
                        <CertIcon iconName={cert.icon} isBNSP={isBNSP} size={8} />
                      </div>
                    </button>
                    
                    {/* Label Node */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-32 text-center pointer-events-none">
                      <p className={`text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                        {cert.name.length > 20 ? cert.name.substring(0, 20) + '...' : cert.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Floating HUD Modal for Active Cert */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-[calc(100%-3rem)] md:w-[450px] z-50 bg-[#0f172a]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(34,211,238,0.15)]"
          >
            <button 
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">Node Data Extracted</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
              {activeCert.name}
            </h3>
            <p className="text-indigo-400 font-semibold text-sm mb-4">
              {activeCert.issuer} — <span className="text-slate-400">{activeCert.year}</span>
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {activeCert.description}
            </p>

            <a
              href={activeCert.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-slate-900 font-bold uppercase tracking-wider text-xs transition-all"
            >
              Access File <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
