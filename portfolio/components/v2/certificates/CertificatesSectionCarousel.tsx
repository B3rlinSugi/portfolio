"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, Database, ExternalLink, Shield, ChevronRight } from "lucide-react";
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
    return <Shield className="w-10 h-10 text-emerald-400" />;
  }

  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className="w-10 h-10 transition-transform group-hover:scale-110" style={{ color: iconData.color }} />;
  }

  return <Award className="w-10 h-10 text-gray-400" />;
}

export default function CertificatesSectionCarousel() {
  const certs = portfolioData.certifications;
  const driveFolder = certs[0]?.driveLink ?? "#";
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-80%"]);

  return (
    <section ref={targetRef} id="certificates" className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full" />
          <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="w-[90%] max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center">
          
          {/* Title Section */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0 shrink-0 pr-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">
                Certified <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Excellence.
                </span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                A collection of professional certifications and achievements demonstrating technical proficiency and continuous learning.
              </p>
              
              <a
                href={driveFolder}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors group"
              >
                <span className="text-sm font-medium">View All in Drive</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Carousel Section */}
          <div className="w-full md:w-2/3 overflow-hidden">
            <motion.div style={{ x }} className="flex gap-6 pl-4 md:pl-20 py-10 w-max">
              {certs.map((cert, index) => {
                const isBNSP = cert.isBNSP;
                return (
                  <motion.a
                    key={cert.name}
                    href={cert.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col w-[300px] md:w-[380px] shrink-0 rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-md overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
                    whileHover={{ y: -10 }}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center justify-between mb-8">
                      <div className={`p-4 rounded-2xl flex items-center justify-center ${isBNSP ? 'bg-emerald-500/20' : 'bg-white/5'} shadow-inner`}>
                         <CertIcon iconName={cert.icon} isBNSP={isBNSP} />
                      </div>
                      <span className="text-xs font-bold text-gray-500 tracking-widest">{cert.year}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-cyan-300 transition-all">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-emerald-400 font-medium mb-4">{cert.issuer}</p>
                    
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                      {cert.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 group-hover:text-white transition-colors">Verify Credential</span>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
