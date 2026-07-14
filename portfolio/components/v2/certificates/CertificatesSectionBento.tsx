"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, Database, ExternalLink, Shield } from "lucide-react";
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
    return <Shield className="w-8 h-8 text-blue-600" />;
  }

  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className="w-8 h-8 transition-transform group-hover:scale-110" style={{ color: iconData.color }} />;
  }

  return <Award className="w-8 h-8 text-gray-400" />;
}

export default function CertificatesSectionBento() {
  const certs = portfolioData.certifications;

  return (
    <section id="certificates" className="w-full bg-[#f8f9fa] py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4"
          >
            Credentials & Certifications
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            Validated expertise through national and institutional certifications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {certs.map((cert, i) => {
            // Make the BNSP cert span more columns/rows for emphasis in the bento grid
            const isFeatured = cert.isBNSP;
            
            return (
              <motion.a
                key={cert.name}
                href={cert.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative flex flex-col bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden ${
                  isFeatured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                {/* Hover decorative gradient */}
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-[2rem]" />
                
                <div className="flex justify-between items-start mb-6 z-10">
                  <div className={`p-4 rounded-2xl ${isFeatured ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <CertIcon iconName={cert.icon} isBNSP={isFeatured} />
                  </div>
                  <div className="flex items-center gap-2">
                    {isFeatured && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Top Credential</span>
                    )}
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">{cert.year}</span>
                  </div>
                </div>

                <div className="z-10 flex flex-col h-full">
                  <h3 className={`font-bold text-gray-900 mb-2 ${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                    {cert.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-semibold mb-4">{cert.issuer}</p>
                  <p className={`text-gray-500 leading-relaxed ${isFeatured ? 'text-base mb-8 max-w-lg' : 'text-sm mb-6 flex-grow'}`}>
                    {cert.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-blue-600 transition-colors">
                    <span>View Certificate</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
