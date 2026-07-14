"use client";

import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";

export default function ContactSectionTypewriter() {
  return (
    <section 
      id="contact" 
      className="w-full min-h-screen bg-[#f4f1ea] text-[#1c1c1c] py-24 px-4 md:px-12 flex flex-col items-center justify-center font-mono selection:bg-[#1c1c1c] selection:text-[#f4f1ea] relative"
    >
      
      {/* Kertas texture buatan dengan CSS */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-3xl w-full">
        
        {/* Header Surat */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-right mb-16 text-xs md:text-sm text-gray-500 uppercase tracking-widest leading-loose"
        >
          <p>DATE: <span className="text-[#1c1c1c]">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</span></p>
          <p>LOCATION: <span className="text-[#1c1c1c]">JAKARTA, ID</span></p>
          <p>SUBJECT: <span className="text-[#1c1c1c]">COMMUNICATION CHANNEL</span></p>
        </motion.div>

        {/* Isi Surat (Animasi teks muncul perlahan seperti diketik) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-lg md:text-2xl leading-[2] md:leading-[2] mb-20 space-y-10 text-justify"
        >
          <p>Dear Visitor,</p>
          
          <p>
            If you are reading this, it means you have successfully traversed through the archives of my digital portfolio.
          </p>
          
          <p>
            As a backend developer, I spend most of my time constructing systems that are invisible to the eye—ensuring they are reliable, secure, and performant. However, engineering is ultimately a collaborative human endeavor.
          </p>
          
          <p>
            Whether you have a complex architectural problem to solve, a scalable application to build, or simply wish to exchange ideas over a cup of coffee, my lines of communication remain perpetually open.
          </p>
          
          <p className="pt-4">Sincerely,</p>
          
          {/* Tanda Tangan (Signature) */}
          <div className="pt-2">
             <span className="font-serif italic text-4xl md:text-5xl opacity-80 decoration-black decoration-wavy underline-offset-8">
               Berlin Sugiyanto
             </span>
             <p className="text-xs uppercase tracking-widest mt-4 text-gray-500">Backend Systems Engineer</p>
          </div>
        </motion.div>

        {/* Kontak (Postscript) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 pt-10 border-t-2 border-black/20 flex flex-col md:flex-row gap-8 md:gap-16 items-start"
        >
          <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest w-48">
            <p className="mb-2 text-[#1c1c1c] font-bold">POSTSCRIPT (P.S.)</p>
            <p>Digital dispatch available via the following channels:</p>
          </div>

          <div className="flex flex-col gap-6">
            <a 
              href={`mailto:${portfolioData.email}`} 
              className="text-lg md:text-xl font-medium hover:italic hover:translate-x-2 transition-all flex items-center gap-4 group"
            >
              <span className="text-gray-400 group-hover:text-black transition-colors">[1]</span> 
              <span className="border-b border-black/30 group-hover:border-black pb-1">Electronic Mail</span>
            </a>
            
            <a 
              href={portfolioData.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl font-medium hover:italic hover:translate-x-2 transition-all flex items-center gap-4 group"
            >
              <span className="text-gray-400 group-hover:text-black transition-colors">[2]</span> 
              <span className="border-b border-black/30 group-hover:border-black pb-1">GitHub Repository</span>
            </a>
            
            <a 
              href={portfolioData.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl font-medium hover:italic hover:translate-x-2 transition-all flex items-center gap-4 group"
            >
              <span className="text-gray-400 group-hover:text-black transition-colors">[3]</span> 
              <span className="border-b border-black/30 group-hover:border-black pb-1">Professional Network</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
