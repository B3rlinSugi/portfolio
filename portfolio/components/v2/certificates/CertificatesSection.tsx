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

const rotations = [-4, 3, -2, 5, -3, 2, -5];
const delays = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];

function CertIcon({ iconName, isBNSP }: { iconName: string; isBNSP?: boolean }) {
  if (isBNSP || iconName.startsWith("/")) {
    return <Shield className="w-10 h-10 text-[#2c7a3f]" />;
  }

  const iconData = certIconMap[iconName];
  if (iconData) {
    const Icon = iconData.icon;
    return <Icon className="w-10 h-10 transition-transform group-hover:scale-110" style={{ color: iconData.color }} />;
  }

  return <Award className="w-10 h-10 text-gray-400" />;
}

function PinDecoration({ variant }: { variant: "pin" | "tape" }) {
  if (variant === "tape") {
    return (
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#f5e6a3]/90 border border-[#e8d48b]/60 shadow-sm z-20"
        style={{ clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)" }}
      />
    );
  }

  return (
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
      <div className="w-3.5 h-3.5 rounded-full bg-[#E74C3C] shadow-[0_2px_4px_rgba(0,0,0,0.25)] border border-[#c0392b]" />
      <div className="w-px h-2 bg-gray-400/60" />
    </div>
  );
}

export default function CertificatesSection() {
  const certs = portfolioData.certifications;
  const driveFolder = certs[0]?.driveLink ?? "#";

  return (
    <section
      id="certificates"
      className="relative w-full min-h-screen bg-[#F3F0EC] text-[#222] py-20 md:py-28 overflow-hidden border-t-2 border-gray-300"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="absolute top-12 left-8 md:left-16 opacity-60 rotate-[-12deg] pointer-events-none">
        <div className="border-2 border-[#2c7a3f] text-[#2c7a3f] font-mono text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-sm">
          Verified
        </div>
      </div>

      <div className="relative z-10 w-[95%] md:w-[90%] xl:w-[85%] max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#E74C3C] mb-2 font-bold">
              CHAPTER III
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none mb-4">
              Credentials.
            </h2>
            <p className="text-gray-600 max-w-xl text-xs md:text-sm font-medium leading-relaxed">
              Sertifikat yang menempel di dinding — bukti kompetensi teknis dari sertifikasi nasional
              hingga pelatihan universitas.
            </p>
          </div>

          <a
            href={driveFolder}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start md:self-auto px-5 py-2.5 bg-white border border-gray-300 shadow-sm hover:border-[#E74C3C]/40 hover:shadow-md transition-all rotate-1"
          >
            <span className="text-xs font-bold text-gray-800 group-hover:text-[#E74C3C] transition-colors">
              See All Certificates
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#E74C3C] transition-colors" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 pt-4">
          {certs.map((cert, i) => {
            const rotation = rotations[i % rotations.length];
            const isBNSP = cert.isBNSP;
            const decoration = i % 2 === 0 ? "pin" : "tape";

            return (
              <motion.a
                key={cert.name}
                href={cert.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40, rotate: rotation }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 100, damping: 18, delay: delays[i % delays.length] }}
                whileHover={{ scale: 1.04, rotate: 0, y: -8, zIndex: 50 }}
                className={`group relative block cursor-pointer ${
                  isBNSP ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""
                }`}
              >
                <PinDecoration variant={decoration} />

                <div
                  className={`relative bg-white border border-gray-200 shadow-xl p-3 md:p-4 pb-8 md:pb-10 transition-shadow group-hover:shadow-2xl ${
                    isBNSP ? "md:flex md:gap-5 md:items-stretch" : ""
                  }`}
                >
                  {isBNSP && (
                    <div className="absolute top-3 right-3 z-10 bg-[#2c7a3f]/10 border border-[#2c7a3f]/30 px-2 py-0.5">
                      <span className="font-mono text-[9px] font-bold tracking-widest text-[#2c7a3f] uppercase">
                        National Cert
                      </span>
                    </div>
                  )}

                  <div
                    className={`relative flex items-center justify-center overflow-hidden bg-[#f8f6f2] border border-gray-100 ${
                      isBNSP ? "md:w-[45%] aspect-[4/3] md:aspect-auto md:min-h-[180px]" : "aspect-[4/3] w-full"
                    }`}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
                        backgroundSize: "16px 16px",
                      }}
                    />

                    <div
                      className={`relative z-10 flex items-center justify-center rounded-2xl border ${
                        isBNSP
                          ? "w-20 h-20 bg-[#2c7a3f]/10 border-[#2c7a3f]/25"
                          : "w-16 h-16 bg-white border-gray-200 shadow-sm"
                      }`}
                    >
                      <CertIcon iconName={cert.icon} isBNSP={isBNSP} />
                    </div>
                  </div>

                  <div className={`flex flex-col mt-3 ${isBNSP ? "md:mt-0 md:flex-1 md:justify-center" : ""}`}>
                    <h3
                      className={`font-bold text-gray-900 leading-snug mb-1 group-hover:text-[#E74C3C] transition-colors ${
                        isBNSP ? "text-base md:text-lg" : "text-sm"
                      }`}
                    >
                      {cert.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#2c7a3f] mb-2">{cert.issuer}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3 flex-1">
                      {cert.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-gray-200">
                      <span className="font-mono text-xs font-bold text-[#E74C3C]">{cert.year}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E74C3C] transition-colors" />
                    </div>
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
