"use client";

import { portfolioData } from "@/data/portfolio";
import { ExternalLink, ShieldAlert, Award, Database, Crosshair, Hexagon } from "lucide-react";
import { SiCss, SiLinux, SiMysql, SiPhp } from "react-icons/si";

const certIconMap: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  SiPhp: { icon: SiPhp, color: "currentColor" },
  SiMysql: { icon: SiMysql, color: "currentColor" },
  SiLinux: { icon: SiLinux, color: "currentColor" },
  SiCss3: { icon: SiCss, color: "currentColor" },
  SiOracle: { icon: Database, color: "currentColor" },
};

function CertIcon({ iconName, isBNSP, className = "" }: { iconName: string; isBNSP?: boolean; className?: string }) {
  if (isBNSP || iconName.startsWith("/")) {
    return <ShieldAlert className={className} />;
  }
  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className={className} />;
  }
  return <Award className={className} />;
}

export default function CertificatesSectionBlueprint() {
  const certs = portfolioData.certifications;

  return (
    <section id="certificates" className="relative w-full min-h-screen bg-[#07162c] text-cyan-400 font-mono overflow-hidden py-32 px-4 md:px-12 selection:bg-cyan-900 selection:text-white">
      
      {/* 
        Grid / Blueprint Lines Background 
        Membuat pola grid arsitektur dengan CSS linear-gradient
      */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px),
            linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Technical Header / Title Block */}
        <div className="border-b-2 border-cyan-500/50 pb-6 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3 text-cyan-300">
              <Crosshair className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
              <p className="text-xs tracking-[0.4em] font-bold">FIG 01. CREDENTIAL SCHEMATICS</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
              Certifications
            </h2>
          </div>
          
          <div className="flex flex-col text-right text-[10px] md:text-xs text-cyan-500 space-y-1 p-4 border border-cyan-500/30 bg-[#07162c]/80 backdrop-blur-sm">
            <p className="flex justify-between gap-8 border-b border-cyan-500/20 pb-1">
              <span>PROJECT:</span> <span className="text-white">BERLIN PORTFOLIO</span>
            </p>
            <p className="flex justify-between gap-8 border-b border-cyan-500/20 py-1">
              <span>DWG NO:</span> <span className="text-white">BS-2026-CT</span>
            </p>
            <p className="flex justify-between gap-8 border-b border-cyan-500/20 py-1">
              <span>SCALE:</span> <span className="text-white">1:1 FULL SCALE</span>
            </p>
            <p className="flex justify-between gap-8 py-1">
              <span>STATUS:</span> <span className="text-[#facc15]">VERIFIED / APPROVED</span>
            </p>
          </div>
        </div>

        {/* Blueprint Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {certs.map((cert, i) => (
            <div 
              key={cert.name} 
              className="relative border border-cyan-500/40 p-8 bg-[#07162c]/80 backdrop-blur-md group hover:border-cyan-300 hover:bg-cyan-900/20 transition-all duration-300 cursor-default flex flex-col"
            >
              {/* Fake Registration Marks (Crosshairs at corners) */}
              <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 border-t-2 border-l-2 border-white group-hover:border-cyan-300 transition-colors" />
              <div className="absolute -top-[5px] -right-[5px] w-2.5 h-2.5 border-t-2 border-r-2 border-white group-hover:border-cyan-300 transition-colors" />
              <div className="absolute -bottom-[5px] -left-[5px] w-2.5 h-2.5 border-b-2 border-l-2 border-white group-hover:border-cyan-300 transition-colors" />
              <div className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 border-b-2 border-r-2 border-white group-hover:border-cyan-300 transition-colors" />

              {/* Fake Dimension Lines Top */}
              <div className="absolute -top-3 left-8 right-8 h-[1px] bg-cyan-500/30 flex items-center justify-center hidden group-hover:flex">
                 <span className="bg-[#07162c] px-2 text-[8px] text-cyan-400">300mm</span>
              </div>

              {/* Technical Reference Label */}
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-cyan-500/20">
                 <p className="text-[10px] text-cyan-600 tracking-widest font-bold">REF_ID: {String(i+1).padStart(3, '0')}</p>
                 {cert.isBNSP && (
                   <span className="text-[9px] text-[#07162c] bg-[#facc15] px-2 py-0.5 font-bold uppercase tracking-widest flex items-center gap-1">
                     <Hexagon className="w-2.5 h-2.5" /> High Priority
                   </span>
                 )}
              </div>
              
              <div className="flex gap-5 items-start mb-6">
                <div className={`w-14 h-14 border shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform ${cert.isBNSP ? 'border-[#facc15] text-[#facc15]' : 'border-cyan-500/50 text-cyan-400'}`}>
                  <CertIcon iconName={cert.icon} isBNSP={cert.isBNSP} className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white uppercase leading-tight mb-2 group-hover:text-cyan-100 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-[11px] text-[#facc15] uppercase tracking-widest font-bold">
                    [ {cert.issuer} ]
                  </p>
                </div>
              </div>

              <div className="mb-8 flex-grow">
                 <p className="text-xs leading-relaxed text-cyan-100/70 line-clamp-4 border-l-2 border-cyan-900 pl-4 group-hover:border-cyan-500 transition-colors">
                   {cert.description}
                 </p>
              </div>
              
              <div className="flex justify-between items-center border-t border-cyan-500/30 pt-5 mt-auto">
                <div className="flex items-center gap-2 text-[10px] text-cyan-500">
                   <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse" />
                   ACQ: {cert.year}
                </div>
                
                <a 
                  href={cert.driveLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative flex items-center gap-2 text-[10px] md:text-xs text-white bg-cyan-950 px-4 py-2 hover:bg-cyan-800 transition-colors border border-cyan-500/50 uppercase font-bold tracking-widest overflow-hidden"
                >
                  <span className="relative z-10">Execute View</span>
                  <ExternalLink className="w-3.5 h-3.5 relative z-10 group-hover/btn:rotate-12 transition-transform" />
                  
                  {/* Scanline effect on button hover */}
                  <div className="absolute inset-0 h-full w-full bg-cyan-400/20 translate-y-full group-hover/btn:-translate-y-full transition-transform duration-700 ease-linear" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
