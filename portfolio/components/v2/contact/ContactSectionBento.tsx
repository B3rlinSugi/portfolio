"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, Copy, CheckCircle2, MapPin, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactSectionBento() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in a tag
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full bg-[#050505] min-h-[90vh] py-24 px-4 md:px-8 flex flex-col items-center justify-center font-sans selection:bg-white selection:text-black">
      
      <div className="max-w-6xl w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
              Let's Connect.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Have a project in mind or want to discuss backend architecture? <br className="hidden md:block" />
              I'm currently open for new opportunities.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          
          {/* 1. Main Email Card (Spans 2 cols, 2 rows) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-2 md:row-span-2 bg-[#121212] rounded-[2rem] p-8 md:p-12 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-between"
          >
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/30 transition-colors duration-700" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 backdrop-blur-md">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">Drop me a line</h3>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight break-all">
                hello@<br/>berlin.dev
              </p>
              <p className="text-sm text-gray-500 mt-4 font-mono">{portfolioData.email}</p>
            </div>

            <div className="relative z-10 mt-12">
              <button 
                onClick={handleCopyEmail}
                className="flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all group/btn"
              >
                <span className="font-semibold text-white">
                  {copied ? "Email Copied!" : "Copy Email Address"}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white group-hover/btn:bg-white group-hover/btn:text-black'}`}>
                  {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </div>
              </button>
            </div>
          </motion.div>

          {/* 2. Location / Status Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 md:col-span-2 bg-[#121212] rounded-[2rem] p-8 md:p-10 border border-white/5 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors"
          >
            {/* Map dots pattern background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-500 font-semibold text-sm tracking-widest uppercase">Available for Hire</span>
                </div>
                <h3 className="text-3xl font-bold text-white leading-tight">Based in <br/>Jakarta, ID</h3>
              </div>
              
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 self-start md:self-auto">
                 <MapPin className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </motion.div>

          {/* 3. GitHub Card */}
          <motion.a 
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 bg-[#121212] rounded-[2rem] p-8 border border-white/5 flex flex-col justify-between group hover:bg-[#1a1a1a] hover:border-white/10 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <FaGithub className="w-7 h-7" />
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
            </div>
            
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Code</p>
              <h3 className="text-2xl font-bold text-white">GitHub</h3>
            </div>
          </motion.a>

          {/* 4. LinkedIn Card */}
          <motion.a 
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 bg-[#121212] rounded-[2rem] p-8 border border-white/5 flex flex-col justify-between group hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-[#0077b5] transition-all duration-300">
                <FaLinkedin className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-[#0077b5] transition-colors" />
            </div>
            
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Network</p>
              <h3 className="text-2xl font-bold text-white">LinkedIn</h3>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
