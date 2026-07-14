"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, Shield, Database, ExternalLink, RefreshCcw, ArrowRight, ArrowLeft } from "lucide-react";
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
    return <Shield className="w-12 h-12 text-[#2c7a3f]" />;
  }

  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className="w-12 h-12" style={{ color: iconData.color }} />;
  }

  return <Award className="w-12 h-12 text-gray-400" />;
}

// Komponen individual untuk setiap kartu agar kita bisa melacak drag motion masing-masing
function SwipeableCard({ 
  cert, 
  isFront, 
  onSwipe, 
  indexOffset 
}: { 
  cert: any; 
  isFront: boolean; 
  onSwipe: (dir: number) => void;
  indexOffset: number;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      // Jika digeser cukup jauh, trigger onSwipe
      const dir = info.offset.x > 0 ? 1 : -1;
      onSwipe(dir);
    }
  };

  const isBNSP = cert.isBNSP;

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{ 
        scale: 1 - indexOffset * 0.05, 
        y: indexOffset * 15, 
        opacity: 1 - indexOffset * 0.2,
        zIndex: 10 - indexOffset
      }}
      exit={{ x: x.get() > 0 ? 300 : -300, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`absolute w-full max-w-sm aspect-[4/5] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col p-8 ${isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
          <CertIcon iconName={cert.icon} isBNSP={isBNSP} />
        </div>
        <div className="text-right">
          <span className="font-mono text-sm font-bold text-gray-400 block mb-1">{cert.year}</span>
          {isBNSP && (
            <span className="inline-block px-3 py-1 bg-[#2c7a3f]/10 text-[#2c7a3f] text-[10px] font-bold tracking-widest uppercase rounded-full">
              Verified
            </span>
          )}
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="font-bold text-gray-900 text-2xl leading-tight mb-2 pointer-events-none">
          {cert.name}
        </h3>
        <p className="text-[#2c7a3f] font-semibold text-sm mb-4 pointer-events-none">
          {cert.issuer}
        </p>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-5 pointer-events-none">
          {cert.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
        <a
          href={cert.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={(e) => e.stopPropagation()} // Supaya klik link tidak mengganggu drag
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#2c7a3f] transition-colors uppercase tracking-wider"
        >
          Lihat Sertifikat <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function CertificatesSectionDeck() {
  const certs = portfolioData.certifications;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (dir: number) => {
    // Berpindah ke kartu berikutnya (index bertambah)
    if (currentIndex < certs.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  return (
    <section id="certificates" className="relative w-full min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      
      {/* Judul Latar Belakang */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <h2 className="text-[15vw] font-black uppercase whitespace-nowrap">Certificates</h2>
      </div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
          The Deck.
        </h2>
        <p className="text-gray-500 font-medium">
          Geser (Swipe) kartu ke kiri atau kanan untuk melihat sertifikat berikutnya.
        </p>
      </div>

      <div className="relative w-full max-w-sm h-[450px] md:h-[500px] mx-auto flex items-center justify-center">
        <AnimatePresence>
          {certs.map((cert, index) => {
            // Hanya render kartu yang belum diswipe (index >= currentIndex)
            // Dan hanya maksimal 3 kartu di bawahnya untuk optimasi performa dan visual
            if (index < currentIndex || index > currentIndex + 2) return null;

            const isFront = index === currentIndex;
            const indexOffset = index - currentIndex;

            return (
              <SwipeableCard
                key={cert.name}
                cert={cert}
                isFront={isFront}
                onSwipe={handleSwipe}
                indexOffset={indexOffset}
              />
            );
          })}
        </AnimatePresence>

        {/* Jika semua kartu habis */}
        {currentIndex >= certs.length && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute flex flex-col items-center justify-center w-full max-w-sm aspect-[4/5] bg-white rounded-3xl border border-dashed border-gray-300"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-800 text-xl mb-2">Semua Selesai Dilihat!</h3>
            <p className="text-gray-500 text-sm mb-6 text-center px-8">Anda telah melihat semua sertifikasi yang tersedia.</p>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-[#2c7a3f] text-white rounded-full font-bold hover:bg-[#236332] transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> Ulangi dari Awal
            </button>
          </motion.div>
        )}
      </div>

      {/* Manual Controls */}
      <div className="flex items-center gap-6 mt-12 relative z-10">
        <button 
          onClick={() => handleSwipe(-1)}
          disabled={currentIndex >= certs.length}
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-[#E74C3C] disabled:opacity-50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="font-mono font-bold text-gray-500">
          {Math.min(currentIndex + 1, certs.length)} / {certs.length}
        </div>
        <button 
          onClick={() => handleSwipe(1)}
          disabled={currentIndex >= certs.length}
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-[#2c7a3f] disabled:opacity-50 transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </section>
  );
}
