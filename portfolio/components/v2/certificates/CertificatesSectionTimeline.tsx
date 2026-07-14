"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, ExternalLink, Database, Shield } from "lucide-react";
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
    return <Shield className="w-6 h-6 text-indigo-500" />;
  }

  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className="w-6 h-6" style={{ color: iconData.color }} />;
  }

  return <Award className="w-6 h-6 text-gray-400" />;
}

export default function CertificatesSectionTimeline() {
  const certs = portfolioData.certifications;

  return (
    <section id="certificates" className="w-full bg-[#FAFAFA] py-24 md:py-32 relative">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 font-serif">
            Journey of Expertise
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            A chronological timeline of my professional growth, technical certifications, and achievements.
          </p>
        </div>

        <div className="relative border-l border-gray-200 ml-4 md:ml-8 space-y-12 pb-12">
          {certs.map((cert, i) => {
            const isFeatured = cert.isBNSP;
            
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full ring-4 ring-white ${isFeatured ? 'bg-indigo-600 ring-indigo-100' : 'bg-gray-300'}`} />

                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  
                  {/* Year & Icon */}
                  <div className="flex-shrink-0 w-32 flex flex-row md:flex-col gap-3 items-center md:items-start">
                    <span className="text-3xl font-black text-gray-300">{cert.year}</span>
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                      <CertIcon iconName={cert.icon} isBNSP={isFeatured} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <a
                    href={cert.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block flex-grow rounded-2xl bg-white p-6 md:p-8 transition-all hover:-translate-y-1 ${
                      isFeatured 
                        ? 'border-2 border-indigo-100 shadow-xl shadow-indigo-500/5' 
                        : 'border border-gray-100 shadow-md shadow-gray-200/50 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        {isFeatured && (
                          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full mb-3">
                            Professional Certification
                          </span>
                        )}
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {cert.name}
                        </h3>
                        <p className="text-gray-500 font-medium text-sm mt-1">{cert.issuer}</p>
                      </div>
                      <div className="shrink-0">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 group-hover:text-indigo-600 transition-colors">
                          View
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {cert.description}
                    </p>
                  </a>
                  
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
