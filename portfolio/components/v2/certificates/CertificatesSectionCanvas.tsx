"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, ExternalLink, Database, Shield, MousePointer2 } from "lucide-react";
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
    return <Icon className="w-8 h-8" style={{ color: iconData.color }} />;
  }

  return <Award className="w-8 h-8 text-gray-400" />;
}

// Posisi tetap agar tidak terjadi hidration mismatch
const canvasPositions = [
  { x: 50, y: 100, rotate: -4 },
  { x: 400, y: 50, rotate: 2 },
  { x: 800, y: 120, rotate: -3 },
  { x: 150, y: 400, rotate: 5 },
  { x: 600, y: 350, rotate: -2 },
  { x: 1000, y: 300, rotate: 4 },
  { x: 300, y: 650, rotate: -5 },
];

export default function CertificatesSectionCanvas() {
  const certs = portfolioData.certifications;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section 
      id="certificates" 
      className="relative w-full h-[120vh] bg-[#f8f9fa] overflow-hidden border-y-2 border-gray-200"
      style={{ 
        backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", 
        backgroundSize: "24px 24px" 
      }}
    >
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-md mb-2">Interactive Canvas</h2>
        <div className="flex items-center justify-center gap-2 text-gray-600 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <MousePointer2 className="w-4 h-4" />
          <p className="text-sm">Tarik dan pindahkan sertifikat secara bebas</p>
        </div>
      </div>

      <div ref={containerRef} className="absolute inset-0 z-10 p-8 w-full h-full">
        {isMounted && certs.map((cert, i) => {
          const pos = canvasPositions[i % canvasPositions.length];
          const isFeatured = cert.isBNSP;

          return (
            <motion.div
              key={cert.name}
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 50 }}
              initial={{ opacity: 0, x: pos.x, y: pos.y + 100, rotate: 0 }}
              whileInView={{ opacity: 1, x: pos.x, y: pos.y, rotate: pos.rotate }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 }}
              className="absolute cursor-grab bg-white rounded-xl shadow-lg border border-gray-100 p-5 md:p-6 w-[280px] md:w-[320px] will-change-transform"
              style={{
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
              }}
            >
              <div className="flex items-start justify-between mb-4 pointer-events-none">
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                  <CertIcon iconName={cert.icon} isBNSP={isFeatured} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 block">{cert.year}</span>
                  {isFeatured && (
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Featured</span>
                  )}
                </div>
              </div>

              <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight pointer-events-none">
                {cert.name}
              </h3>
              <p className="text-sm font-semibold text-blue-500 mb-3 pointer-events-none">
                {cert.issuer}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-5 pointer-events-none">
                {cert.description}
              </p>

              <div className="pt-4 border-t border-gray-100">
                <a
                  href={cert.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-600 transition-colors"
                  onPointerDown={(e) => e.stopPropagation()} // Supaya bisa diklik tanpa men-trigger drag
                >
                  Lihat Detail <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
