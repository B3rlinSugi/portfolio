"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Komponen Reusable untuk Efek Magnet
function MagneticButton({ 
  children, 
  href, 
  className,
  strength = 0.3 
}: { 
  children: React.ReactNode, 
  href: string, 
  className?: string,
  strength?: number 
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring fisika agar pergerakannya bouncy dan mulus (Fluid)
  const springConfig = { damping: 15, stiffness: 150, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Menghitung posisi kursor relatif terhadap titik tengah elemen
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Menggerakkan elemen searah kursor berdasarkan kekuatan magnet (strength)
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    // Kembali ke titik tengah (0,0) saat kursor pergi
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center cursor-pointer ${className}`}
    >
      {children}
    </motion.a>
  );
}

export default function ContactSectionMagnetic() {
  return (
    <section id="contact" className="w-full min-h-screen bg-[#000] text-white py-32 px-4 md:px-12 flex flex-col items-center justify-center overflow-hidden font-sans relative selection:bg-indigo-500 selection:text-white">
      
      {/* Ornaments: Lingkaran blur di background agar terkesan melayang */}
      <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Berlin&backgroundColor=transparent" 
            alt="Avatar" 
            className="w-24 h-24 mx-auto mb-8 bg-white/5 rounded-full border border-white/10 p-2"
          />
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-tight">
            Let's start a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
              project together
            </span>
          </h2>
        </motion.div>

        {/* Magnetic Buttons Container */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mt-8">
          
          {/* Email Magnet */}
          <MagneticButton 
            href={`mailto:${portfolioData.email}`} 
            strength={0.4}
            className="group bg-white text-black px-8 py-5 md:px-12 md:py-6 rounded-full font-bold text-lg md:text-xl flex items-center gap-4 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-shadow"
          >
            <Mail className="w-6 h-6" />
            hello@berlin.dev
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center ml-2 group-hover:scale-110 transition-transform">
               <ArrowUpRight className="w-4 h-4" />
            </div>
          </MagneticButton>

          {/* Social Magnets */}
          <div className="flex items-center gap-6">
            <MagneticButton 
              href={portfolioData.github} 
              strength={0.5}
              className="w-20 h-20 md:w-24 md:h-24 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-colors"
            >
              <FaGithub className="w-8 h-8 md:w-10 md:h-10" />
            </MagneticButton>

            <MagneticButton 
              href={portfolioData.linkedin} 
              strength={0.5}
              className="w-20 h-20 md:w-24 md:h-24 bg-white/10 border border-white/20 rounded-full text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-colors"
            >
              <FaLinkedin className="w-8 h-8 md:w-10 md:h-10" />
            </MagneticButton>
          </div>

        </div>

      </div>

      <div className="absolute bottom-10 left-0 w-full text-center">
         <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
            Interact with the buttons
         </p>
      </div>

    </section>
  );
}
