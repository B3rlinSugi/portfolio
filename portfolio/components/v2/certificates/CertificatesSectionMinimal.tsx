"use client";

import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function CertificatesSectionMinimal() {
  const certs = portfolioData.certifications;

  return (
    <section id="certificates" className="w-full bg-white py-32 px-6 md:px-12 text-zinc-900">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-zinc-900 pb-12 mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">
              Certificates
            </h2>
            <p className="text-zinc-600 text-lg md:text-xl font-medium">
              Official records of technical competency and continuous learning across various domains of software engineering.
            </p>
          </div>
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
            {certs.length} Credentials Listed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {certs.map((cert) => {
            return (
              <a
                key={cert.name}
                href={cert.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-start border-t border-zinc-200 pt-6 hover:border-zinc-900 transition-colors"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <span className="font-mono text-xs font-bold bg-zinc-100 px-2 py-1 text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                    {cert.year}
                  </span>
                  {cert.isBNSP && (
                    <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600">
                      National Cert
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4">
                  {cert.name}
                </h3>
                
                <p className="text-sm font-semibold text-zinc-500 mb-6">
                  {cert.issuer}
                </p>

                <p className="text-zinc-600 text-sm leading-relaxed mb-8 flex-grow">
                  {cert.description}
                </p>

                <div className="mt-auto flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                  View File
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
