"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactSectionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulasi pengiriman data ke server (delay 1.5 detik)
    setTimeout(() => {
      setStatus("success");
      
      // Sebagai fallback karena belum ada database/API backend,
      // kita buka aplikasi email bawaan dengan data yang sudah diisi.
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name");
      const message = formData.get("message");
      const mailtoLink = `mailto:${portfolioData.email}?subject=Project Inquiry from ${name}&body=${encodeURIComponent(String(message))}`;
      
      window.location.href = mailtoLink;
      
      // Reset form status setelah 3 detik
      setTimeout(() => {
        setStatus("idle");
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="w-full min-h-[90vh] bg-[#000] text-white py-24 px-4 md:px-12 flex flex-col justify-center font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden"
    >
      {/* Ambient Glow Effects */}
      <div className="absolute top-[10%] right-[10%] w-[30rem] h-[30rem] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[20rem] h-[20rem] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Side: Copywriting & Links */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-max mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
              Accepting New Projects
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Ready to scale <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              your architecture?
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed font-light">
            Whether you need a robust REST API, a secure authentication system, or complex database optimization, I'm available to help build backend systems that last.
          </p>
          
          <div className="flex flex-col gap-6">
            <a 
              href={portfolioData.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center justify-between border-b border-white/10 pb-4 w-full md:w-[80%] group"
            >
              <span className="font-medium">Explore GitHub Repositories</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </a>
            <a 
              href={portfolioData.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center justify-between border-b border-white/10 pb-4 w-full md:w-[80%] group"
            >
              <span className="font-medium">Connect on LinkedIn</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </a>
            <a 
              href={`mailto:${portfolioData.email}`}
              className="text-gray-400 hover:text-white transition-colors flex items-center justify-between border-b border-white/10 pb-4 w-full md:w-[80%] group"
            >
              <span className="font-medium">Direct Email ({portfolioData.email})</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Clean SaaS Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group"
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="mb-8">
             <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
             <p className="text-gray-500 text-sm">Fill out the form below and I'll get back to you shortly.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Full Name
              </label>
              <input 
                required 
                type="text" 
                id="name" 
                name="name" 
                placeholder="John Doe" 
                className="bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Email Address
              </label>
              <input 
                required 
                type="email" 
                id="email" 
                name="email" 
                placeholder="john@company.com" 
                className="bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Message
              </label>
              <textarea 
                required 
                id="message" 
                name="message" 
                rows={4} 
                placeholder="Tell me about your project or the problem you're trying to solve..." 
                className="bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none text-sm" 
              />
            </div>

            <button 
              disabled={status !== "idle"} 
              type="submit" 
              className={`mt-4 w-full font-semibold rounded-xl px-4 py-4 transition-all flex items-center justify-center gap-2 
                ${status === "idle" ? 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02]' : ''}
                ${status === "loading" ? 'bg-[#222] text-white cursor-not-allowed' : ''}
                ${status === "success" ? 'bg-emerald-500 text-white cursor-not-allowed' : ''}
              `}
            >
              {status === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
              {status === "loading" && <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>}
              {status === "success" && <><CheckCircle2 className="w-5 h-5" /> Message Ready</>}
            </button>
            
            {/* Disclaimer for static site */}
            <p className="text-[10px] text-gray-600 text-center mt-2">
               Your message will be securely drafted in your default email client.
            </p>
          </form>

        </motion.div>
      </div>
    </section>
  );
}
