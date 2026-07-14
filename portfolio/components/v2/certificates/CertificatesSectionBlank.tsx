"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    return <Shield className="w-12 h-12 text-[#FF6B00]" />;
  }

  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className="w-12 h-12" style={{ color: iconData.color }} />;
  }

  return <Award className="w-12 h-12 text-gray-400" />;
}

export default function CertificatesSectionBlank() {
  const certs = portfolioData.certifications;
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Menggunakan useScroll untuk melacak progres scroll pada elemen container ini
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transformasi progres scroll (0 sampai 1) menjadi translasi sumbu X
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    // Tinggi 400vh memberikan ruang yang cukup bagi pengguna untuk men-scroll ke bawah
    // secara perlahan, yang akan diterjemahkan menjadi gerakan ke samping.
    <section ref={targetRef} id="certificates" className="relative h-[400vh] bg-[#0A0A0A] text-white">
      
      {/* Sticky container yang menahan tampilan di viewport (sebesar tinggi layar) */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Dekorasi Latar Belakang Cinematic */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FF6B00]/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
          {/* Tekstur grid transparan */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }}
          />
        </div>

        {/* Konten Horizontal yang Bergerak */}
        <motion.div style={{ x }} className="flex gap-10 md:gap-16 px-10 md:px-24 w-max items-center">
          
          {/* Judul & Pengantar (Muncul Paling Pertama di Kiri) */}
          <div className="w-[300px] md:w-[450px] shrink-0 mr-10 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              Verified <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-yellow-500">
                Credentials.
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 border-l-2 border-[#FF6B00] pl-4">
              Jelajahi koleksi sertifikasi profesional yang memvalidasi keahlian teknis dan pembelajaran berkelanjutan saya.
              <br/><br/>
              <span className="text-sm font-mono text-gray-500">➔ Scroll ke bawah untuk melihat</span>
            </p>
          </div>

          {/* Deretan Kartu Sertifikat */}
          {certs.map((cert, index) => {
            const isBNSP = cert.isBNSP;

            return (
              <div 
                key={cert.name} 
                className="group relative w-[320px] md:w-[420px] h-[480px] shrink-0 rounded-3xl overflow-hidden bg-[#111111] border border-white/10 transition-colors hover:border-white/30"
              >
                {/* Efek Glow Parallax Internal (Bergerak perlahan saat dihover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col h-full z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      <CertIcon iconName={cert.icon} isBNSP={isBNSP} />
                    </div>
                    
                    {isBNSP && (
                      <span className="px-3 py-1 bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold tracking-widest uppercase rounded-full border border-[#FF6B00]/30">
                        Top Cert
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <span className="text-sm font-mono text-gray-500 mb-3 block">{cert.year}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-[#FF6B00] font-medium mb-4">{cert.issuer}</p>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                      {cert.description}
                    </p>

                    <a 
                      href={cert.driveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors uppercase tracking-wider"
                    >
                      Lihat Sertifikat <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Elemen Penutup (Akhir Scroll) */}
          <div className="w-[300px] shrink-0 flex items-center justify-center h-[480px]">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-4">
                <span className="block w-2 h-2 bg-white rounded-full"></span>
              </div>
              <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Akhir Daftar</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
