"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, ChevronDown, Award, Shield, Database } from "lucide-react";
import { SiCss, SiLinux, SiMysql, SiPhp } from "react-icons/si";

const certIconMap: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  SiPhp: { icon: SiPhp, color: "#777BB4" },
  SiMysql: { icon: SiMysql, color: "#4479A1" },
  SiLinux: { icon: SiLinux, color: "#FCC624" },
  SiCss3: { icon: SiCss, color: "#1572B6" },
  SiOracle: { icon: Database, color: "#F80000" },
};

function CertIcon({ iconName, isBNSP }: { iconName: string; isBNSP?: boolean }) {
  if (isBNSP || iconName.startsWith("/")) {
    return <Shield className="w-8 h-8 text-indigo-600" />;
  }

  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className="w-8 h-8" style={{ color: iconData.color }} />;
  }

  return <Award className="w-8 h-8 text-gray-400" />;
}

export default function CertificatesSectionAccordion() {
  // Secara default buka accordion pertama
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const certs = portfolioData.certifications;

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="certificates" className="w-full bg-white py-24 md:py-32 px-6 md:px-12 text-zinc-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-zinc-900">
            Professional <br />
            <span className="text-indigo-600">Certifications.</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-xl">
            A minimalist registry of my verified technical competencies and institutional achievements.
          </p>
        </div>

        {/* Accordion List */}
        <div className="border-t-2 border-zinc-900">
          {certs.map((cert, index) => {
            const isActive = activeIndex === index;
            const isFeatured = cert.isBNSP;

            return (
              <div key={cert.name} className="border-b border-zinc-200">
                <button 
                  onClick={() => toggleAccordion(index)} 
                  className="w-full flex items-center justify-between py-6 md:py-8 group"
                >
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="font-mono text-zinc-400 font-bold text-lg md:text-xl w-8 md:w-12 text-left">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className={`text-xl md:text-3xl font-bold text-left transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-zinc-900 group-hover:text-indigo-500'}`}>
                      {cert.name}
                    </h3>
                    {isFeatured && !isActive && (
                      <span className="hidden md:inline-flex px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-zinc-400 font-mono text-sm font-bold hidden md:block">{cert.year}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-indigo-50' : 'bg-zinc-50 group-hover:bg-zinc-100'}`}>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isActive ? "rotate-180 text-indigo-600" : "text-zinc-400"}`} />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 flex flex-col md:flex-row gap-6 md:gap-10 pl-12 md:pl-20">
                        
                        {/* Icon Box */}
                        <div className={`shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center border shadow-sm ${isFeatured ? 'bg-indigo-50 border-indigo-100' : 'bg-zinc-50 border-zinc-200'}`}>
                          <CertIcon iconName={cert.icon} isBNSP={isFeatured} />
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-indigo-600 font-semibold text-lg">{cert.issuer}</p>
                            {isFeatured && (
                              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold tracking-widest uppercase rounded">
                                National Cert
                              </span>
                            )}
                          </div>
                          
                          <p className="text-zinc-500 text-base leading-relaxed max-w-2xl mb-6">
                            {cert.description}
                          </p>
                          
                          <a 
                            href={cert.driveLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-bold rounded-lg hover:bg-indigo-600 transition-colors group/btn"
                          >
                            View Certificate 
                            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
