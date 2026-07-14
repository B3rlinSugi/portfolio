"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Award, Shield, Database } from "lucide-react";
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
    return <Shield className="w-8 h-8 text-[#E74C3C]" />;
  }

  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className="w-8 h-8" style={{ color: iconData.color }} />;
  }

  return <Award className="w-8 h-8 text-gray-400" />;
}

// Koordinat untuk menyebar kartu di atas meja virtual (persentase)
const deskPositions = [
  { left: "15%", top: "10%", rotate: -8 },
  { left: "45%", top: "5%", rotate: 12 },
  { left: "75%", top: "15%", rotate: -5 },
  { left: "10%", top: "45%", rotate: 15 },
  { left: "40%", top: "40%", rotate: -10 },
  { left: "70%", top: "50%", rotate: 8 },
  { left: "30%", top: "75%", rotate: -12 },
];

export default function CertificatesSectionIsometric() {
  const certs = portfolioData.certifications;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section 
      id="certificates" 
      className="relative w-full h-[130vh] md:h-[150vh] bg-[#e9e3d9] overflow-hidden"
    >
      {/* Background Texture (Tekstur Kayu/Meja) */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)",
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Header Info (Mengambang di kiri atas) */}
      <div className="absolute top-12 left-6 md:left-12 z-50 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tighter mb-2">
          The Desk.
        </h2>
        <p className="text-gray-600 font-medium bg-white/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white inline-block shadow-sm">
          Tarik (drag) atau sorot dokumen untuk melihat detail.
        </p>
      </div>

      {/* 
        Area Kanvas Isometrik
        Perspective memberikan efek 3D.
        RotateX dan RotateZ memiringkan wadah agar terlihat seperti dilihat dari atas meja.
      */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{ perspective: "1500px" }}
      >
        <div 
          ref={containerRef}
          className="relative w-[150%] h-[150%] md:w-[120%] md:h-[120%] pointer-events-auto"
          style={{ 
            transformStyle: "preserve-3d",
            transform: "rotateX(55deg) rotateZ(-35deg) scale(0.9)",
            transformOrigin: "center center"
          }}
        >
          {isMounted && certs.map((cert, i) => {
            const pos = deskPositions[i % deskPositions.length];
            const isFeatured = cert.isBNSP;

            return (
              <motion.div
                key={cert.name}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                // Mulai dari posisi di atas meja, sedikit terangkat dan jatuh
                initial={{ opacity: 0, left: pos.left, top: pos.top, z: 500, rotateZ: pos.rotate }}
                whileInView={{ opacity: 1, z: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 80, 
                  damping: 15, 
                  delay: i * 0.15 
                }}
                // Saat hover/drag: Angkat kartu (Z-index naik) dan putar sedikit agar tegak
                whileHover={{ scale: 1.05, z: 80, rotateX: -10, rotateY: 5, rotateZ: 0 }}
                whileDrag={{ scale: 1.1, z: 150, rotateX: -20, rotateY: 10, cursor: "grabbing" }}
                className="absolute cursor-grab bg-white rounded-lg p-6 w-[300px] shadow-[15px_15px_40px_rgba(0,0,0,0.15)] border border-gray-100 will-change-transform"
                style={{ 
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Efek Kertas / Dokumen */}
                <div className="absolute top-0 right-8 w-12 h-3 bg-red-500/20 rounded-b-sm" />
                <div className="absolute top-0 right-10 w-8 h-4 bg-[#E74C3C]/80 rounded-b-sm shadow-sm" />

                <div className="flex items-start gap-4 mb-6 relative z-10 pointer-events-none">
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <CertIcon iconName={cert.icon} isBNSP={isFeatured} />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-gray-400 block mb-1">{cert.year}</span>
                    {isFeatured && (
                      <span className="inline-block px-2 py-0.5 bg-[#E74C3C]/10 text-[#E74C3C] text-[10px] font-bold tracking-widest uppercase rounded">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-xl leading-snug mb-2 pointer-events-none">
                  {cert.name}
                </h3>
                <p className="text-[#E74C3C] font-semibold text-sm mb-4 pointer-events-none">
                  {cert.issuer}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-4 pointer-events-none">
                  {cert.description}
                </p>

                <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
                  <a
                    href={cert.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={(e) => e.stopPropagation()} // Supaya tidak men-trigger drag saat diklik
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#E74C3C] transition-colors uppercase tracking-wider"
                  >
                    Buka File <ExternalLink className="w-3.5 h-3.5" />
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
