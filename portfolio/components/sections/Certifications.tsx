"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Award, Shield, Database, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  SiPhp, SiMysql, SiLinux, SiCss
} from "react-icons/si";

const certIconMap: Record<string, { icon: any, color: string }> = {
  SiPhp: { icon: SiPhp, color: "#777BB4" },
  SiMysql: { icon: SiMysql, color: "#4479A1" },
  SiLinux: { icon: SiLinux, color: "#FCC624" }, // Yellow/Black typical for Linux, we'll use golden yellow
  SiCss3: { icon: SiCss, color: "#1572B6" },
  SiOracle: { icon: Database, color: "#F80000" }, // Oracle Red
};

const CertIcon = ({ iconName, isBNSP }: { iconName: string; isBNSP?: boolean }) => {
  if (isBNSP || iconName.startsWith("/")) {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <Shield className="w-8 h-8 text-[#FF6B00]" />
      </div>
    );
  }
  
  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className="w-8 h-8 transition-transform group-hover:scale-110" style={{ color: iconData.color }} />;
  }
  return <Award className="w-8 h-8 text-neutral-400" />;
};

export default function Certifications() {
  const certs = portfolioData.certifications;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="certifications" className="relative py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FF6B00]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Layout: Top text + Bottom horizontal cards */}
        <div className="flex flex-col gap-12">
          
          {/* Top Row: Heading & Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#FF6B00] uppercase mb-4">
                CERTIFICATIONS
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-[1.15] mb-4">
                Certified. Skilled. <br className="hidden md:block" />
                Always <span className="text-[#FF6B00] italic">Learning.</span>
              </h3>
              <p className="text-neutral-400 text-base leading-relaxed max-w-lg">
                Here are some of my certifications that strengthen my technical expertise.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={scrollLeft}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] transition-all text-white"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={scrollRight}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] transition-all text-white"
                  aria-label="Scroll Right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="w-px h-8 bg-white/10 hidden sm:block"></div>

              <a 
                href="https://drive.google.com/drive/folders/1uYB927_zS42WQEeYKfcq5BH39QnOqW2q?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/5 transition-all duration-300"
              >
                <span className="text-sm font-semibold text-white group-hover:text-[#FF6B00] transition-colors">
                  See All Certificates
                </span>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#FF6B00] transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Bottom Row: Horizontally Scrolling Cards with Hidden Scrollbar */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0"
          >
            {certs.map((cert: any, i: number) => (
              <motion.a
                key={cert.name}
                href={cert.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative flex flex-col w-[300px] md:w-[340px] flex-shrink-0 snap-start rounded-2xl bg-[#0a0a0a] border border-white/[0.06] hover:border-[#FF6B00]/30 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-[#FF6B00]/[0.04]"
              >
                {/* Certificate Image Placeholder / Icon Header */}
                <div className="relative h-36 bg-gradient-to-br from-[#111] to-[#0a0a0a] flex items-center justify-center overflow-hidden">
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }} />
                  
                  {/* BNSP gets special treatment */}
                  {cert.isBNSP ? (
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center">
                        <Shield className="w-9 h-9 text-[#FF6B00]" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider text-[#FF6B00] uppercase">National Cert</span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <CertIcon iconName={cert.icon} />
                      </div>
                    </div>
                  )}

                  {/* Subtle orange glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/0 to-[#FF6B00]/0 group-hover:from-[#FF6B00]/[0.02] group-hover:to-transparent transition-all duration-500" />
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h4 className="text-sm font-bold text-white leading-snug mb-1.5 group-hover:text-[#FF6B00] transition-colors line-clamp-2">
                    {cert.name}
                  </h4>
                  <p className="text-xs font-medium text-[#FF6B00]/70 mb-3">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-4 line-clamp-3 flex-1">
                    {cert.description}
                  </p>

                  {/* Footer: Year + Link icon */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                    <span className="text-xs font-bold text-[#FF6B00]">{cert.year}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#FF6B00] transition-colors" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
