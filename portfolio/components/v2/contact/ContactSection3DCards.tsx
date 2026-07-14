"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Komponen Reusable untuk Kartu 3D
const TiltCard = ({ 
  title, 
  icon, 
  href, 
  glowColor = "rgba(255,255,255,0.1)",
  delay = 0
}: { 
  title: string; 
  icon: React.ReactNode; 
  href: string; 
  glowColor?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Fisika pegas agar pergerakan rotasi mulus tidak kaku
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Memetakan nilai koordinat mouse ke sudut rotasi (max miring 15 derajat)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Posisi relatif mouse di dalam kartu
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalisasi posisi ke persentase (-0.5 hingga 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Kembali ke posisi datar saat kursor pergi
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      style={{ perspective: "1000px" }}
      className="w-full max-w-sm mx-auto"
    >
      <motion.a
        href={href}
        target={title !== "EMAIL" ? "_blank" : undefined}
        rel={title !== "EMAIL" ? "noopener noreferrer" : undefined}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-full h-[400px] rounded-[2rem] bg-white/5 border border-white/10 p-8 flex flex-col justify-between group cursor-pointer shadow-2xl"
      >
        {/* Latar Belakang Kartu dengan efek Glassmorphism & Noise */}
        <div className="absolute inset-0 rounded-[2rem] backdrop-blur-xl overflow-hidden pointer-events-none">
          <div 
             className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
                background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 60%)`,
             }}
          />
          {/* Noise Tekstur Kasar */}
          <div 
             className="absolute inset-0 opacity-20 mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }}
          />
        </div>
        
        {/* Ikon: Mengambang sejauh 50px dari latar */}
        <div 
          style={{ transform: "translateZ(50px)" }} 
          className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 border border-white/20 shadow-lg"
        >
           {icon}
        </div>

        {/* Teks: Mengambang sejauh 40px dari latar */}
        <div style={{ transform: "translateZ(40px)" }}>
           <h3 className="text-3xl font-black text-white tracking-widest uppercase mb-3">{title}</h3>
           <p className="text-gray-400 font-medium tracking-[0.2em] text-xs uppercase">Hold & Drag to Tilt</p>
        </div>

        {/* Panah: Mengambang paling tinggi (70px) */}
        <div 
          style={{ transform: "translateZ(70px)" }} 
          className="absolute bottom-8 right-8 text-white/30 group-hover:text-white transition-colors duration-300"
        >
           <ArrowUpRight className="w-10 h-10 transform group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </motion.a>
    </motion.div>
  );
};

export default function ContactSection3DCards() {
  return (
    <section 
      id="contact" 
      className="w-full min-h-screen bg-[#020202] py-32 px-4 md:px-12 flex flex-col justify-center font-sans selection:bg-white selection:text-black relative overflow-hidden"
    >
      
      {/* Latar Belakang Lingkungan Gelap */}
      <div className="absolute top-0 left-[20%] w-[50vw] h-[50vw] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
           <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-6">
              Establish a connection
           </h2>
           <p className="text-gray-400 text-lg max-w-xl mx-auto font-light">
              Select a medium below. These geometric cards respond to your spatial input.
           </p>
        </motion.div>

        {/* Grid 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
           <TiltCard 
             title="EMAIL" 
             icon={<Mail className="w-8 h-8" />} 
             href={`mailto:${portfolioData.email}`} 
             glowColor="rgba(255,255,255,0.15)"
             delay={0.1}
           />
           <TiltCard 
             title="GITHUB" 
             icon={<FaGithub className="w-8 h-8" />} 
             href={portfolioData.github} 
             glowColor="rgba(255,255,255,0.15)"
             delay={0.3}
           />
           <TiltCard 
             title="LINKEDIN" 
             icon={<FaLinkedin className="w-8 h-8" />} 
             href={portfolioData.linkedin} 
             glowColor="rgba(0,119,181,0.2)"
             delay={0.5}
           />
        </div>

        {/* Footer Minimalist */}
        <div className="mt-32 w-full flex flex-col md:flex-row justify-between items-center text-sm font-medium tracking-widest text-gray-600 uppercase border-t border-white/10 pt-10 px-8">
           <p>© 2026 BERLIN SUGIYANTO</p>
           <p className="mt-4 md:mt-0">JAKARTA, ID</p>
        </div>

      </div>

    </section>
  );
}
