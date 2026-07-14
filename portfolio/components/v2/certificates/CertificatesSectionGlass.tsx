"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, ShieldCheck, ArrowUpRight, Award, Database } from "lucide-react";
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
    return <ShieldCheck className={className} />;
  }
  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className={className} style={{ color: iconData.color }} />;
  }
  return <Award className={className} />;
}

export default function CertificatesSectionGlass() {
  const certs = portfolioData.certifications;

  return (
    <section id="certificates" className="relative w-full min-h-screen bg-[#050505] overflow-hidden py-32 px-4 md:px-12 font-sans flex flex-col items-center">
      
      {/* 
        Abstract Background Orbs 
        (Sangat penting untuk menonjolkan efek blur dari glassmorphism) 
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orb Kiri Atas (Ungu/Indigo) */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-indigo-600/20 rounded-full blur-[120px]" 
        />
        
        {/* Orb Kanan Bawah (Biru) */}
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-blue-600/20 rounded-full blur-[130px]" 
        />
        
        {/* Orb Tengah (Cyan/Emerald) khusus area BNSP */}
        <motion.div 
          animate={{ 
            x: [0, 30, -20, 0], 
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-cyan-500/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Certifications
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Verified credentials and professional achievements, crafted with precision.
            </p>
          </motion.div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certs.map((cert, idx) => (
            <motion.a
              key={cert.name}
              href={cert.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-[2rem] p-8 overflow-hidden backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 cursor-pointer flex flex-col h-full"
            >
              {/* Highlight / Light Reflection Effect (Shine) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform ease-in-out" style={{ transitionDuration: '1.5s' }} />
              
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner backdrop-blur-md border ${cert.isBNSP ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-white/5 border-white/10'}`}>
                    <CertIcon iconName={cert.icon} isBNSP={cert.isBNSP} className={`w-7 h-7 ${cert.isBNSP ? 'text-cyan-400' : 'text-gray-300'}`} />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {cert.isBNSP && (
                      <span className="text-cyan-400 text-[10px] font-bold bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-full uppercase tracking-wider">
                        National
                      </span>
                    )}
                    <span className="text-gray-400 text-xs font-medium bg-black/40 border border-white/5 px-3 py-1.5 rounded-full">
                      {cert.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {cert.name}
                </h3>
                <p className="text-sm font-medium text-indigo-300 mb-5">
                  {cert.issuer}
                </p>
                
                <div className="mt-auto">
                  <p className="text-gray-400 text-sm line-clamp-3 mb-8 font-light leading-relaxed">
                    {cert.description}
                  </p>
                  
                  {/* Action Link */}
                  <div className="flex items-center gap-2 text-white text-sm font-semibold opacity-70 group-hover:opacity-100 group-hover:text-indigo-300 transition-all duration-300">
                    View Details 
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>

              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
