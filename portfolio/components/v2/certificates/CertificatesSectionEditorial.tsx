"use client";

import { portfolioData } from "@/data/portfolio";
import { ArrowRight } from "lucide-react";

export default function CertificatesSectionEditorial() {
  const certs = portfolioData.certifications;

  // Fungsi untuk menentukan ukuran grid masing-masing item
  // Total 7 Sertifikat
  const getGridClass = (index: number) => {
    // 0: BNSP (Paling Penting) -> Besar (2 Kolom, 2 Baris)
    if (index === 0) return "md:col-span-2 md:row-span-2";
    
    // 1, 2, 3, 4: Sertifikat standar -> Kecil (1 Kolom, 1 Baris)
    if (index >= 1 && index <= 4) return "md:col-span-1 md:row-span-1";
    
    // 5, 6: Sertifikat sisa -> Lebar (2 Kolom, 1 Baris) untuk menyeimbangkan grid bawah
    if (index === 5 || index === 6) return "md:col-span-2 md:row-span-1";
    
    return "md:col-span-1 md:row-span-1";
  };

  return (
    <section id="certificates" className="w-full bg-[#121212] text-gray-300 min-h-screen py-16 px-4 md:px-8 selection:bg-white selection:text-black flex flex-col items-center justify-center">
      
      <div className="max-w-7xl w-full">
        {/* Newspaper Header (Compact) */}
        <div className="border-t-4 border-b-2 border-white/20 py-2 mb-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-bold tracking-widest uppercase gap-2 text-center text-white">
          <span>The Portfolio Edition</span>
          <span className="hidden md:inline">Vol. I — EST. 2026</span>
          <span>Verified Credentials Archive</span>
        </div>

        {/* Massive Title (Compact) */}
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-none tracking-tight uppercase text-white">
            Certifications
          </h2>
          <div className="mt-6 flex justify-center">
            <p className="text-[10px] md:text-xs uppercase tracking-widest border-b-2 border-white/20 inline-block pb-1 px-8 font-bold text-gray-400">
              A Curated Archive of Technical Proficiencies
            </p>
          </div>
        </div>

        {/* 
          SINGLE DENSE GRID BLOCK
          Using border/gap tricks for crisp lines
        */}
        <div className="w-full bg-white/20 border-4 border-white/20 grid grid-cols-1 md:grid-cols-4 gap-[1px]">
          
          {certs.map((cert, index) => {
            const isHeadline = index === 0;
            const gridClass = getGridClass(index);

            return (
              <div 
                key={cert.name} 
                className={`bg-[#121212] flex flex-col ${gridClass} p-6 md:p-8 hover:bg-[#1A1A1A] transition-colors group`}
              >
                {/* Meta Header */}
                <div className={`border-b-2 border-white/20 pb-3 mb-5 text-[10px] uppercase font-bold flex justify-between items-end text-gray-300 ${isHeadline ? 'mt-2' : ''}`}>
                  <span className={isHeadline ? "text-sm text-white" : "text-gray-400"}>{cert.issuer}</span>
                  <span className="bg-white text-black px-2 py-0.5">{cert.year}</span>
                </div>
                
                {/* Title */}
                <h3 className={`${isHeadline ? 'text-5xl lg:text-7xl mb-6' : 'text-2xl lg:text-3xl mb-4'} font-serif leading-none uppercase text-white group-hover:text-gray-300 transition-colors cursor-default`}>
                  {cert.name}
                </h3>
                
                {/* Description */}
                <p className={`${isHeadline ? 'text-sm md:text-base columns-1 lg:columns-2 gap-8' : 'text-xs line-clamp-4'} leading-relaxed mb-8 font-medium text-gray-400 text-justify flex-grow`}>
                  {isHeadline ? (
                    <>
                      <span className="float-left text-6xl leading-[0.8] pr-2 font-serif uppercase text-white">
                        {cert.description.charAt(0)}
                      </span>
                      {cert.description.substring(1)}
                    </>
                  ) : (
                    cert.description
                  )}
                </p>
                
                {/* Action Link */}
                <a 
                  href={cert.driveLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto self-start uppercase font-bold border-white/20 text-gray-300 hover:bg-white hover:text-black transition-all flex items-center gap-2 ${
                    isHeadline 
                      ? 'text-xs border-2 px-6 py-3' 
                      : 'text-[10px] border border-t-2 border-b-2 px-4 py-2'
                  }`}
                >
                  {isHeadline ? 'Review Full Document' : 'Examine'} 
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
          
        </div>
        
        {/* Footer info */}
        <div className="mt-4 text-right">
           <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">End of Archive. Total entries: {certs.length}</p>
        </div>

      </div>
    </section>
  );
}
