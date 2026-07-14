"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { PixelImage } from "@/components/ui/pixel-image";
import { useEffect, useState } from "react";

export default function HeroVisual() {
  // To prevent hydration mismatch with framer-motion transforms on initial load
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end">
      
      {/* Abstract Flowing Backdrop (Subtle Violet) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-0 w-[80%] h-[80%] bg-gradient-to-t from-indigo-500/20 to-violet-500/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl z-0 pointer-events-none"
      />

      {/* Developer Portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full h-[80%] max-h-[750px] lg:scale-100 lg:origin-bottom flex items-end justify-center pointer-events-none"
      >
        <div 
          className="absolute inset-0 w-full h-full drop-shadow-2xl mix-blend-multiply"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)'
          }}
        >
          <PixelImage 
            src="/berlin.png?v=2" 
            grid="8x8"
            grayscaleAnimation={true}
            pixelFadeInDuration={1200}
            maxAnimationDelay={1200}
            colorRevealDelay={1800}
            className="w-full h-full"
            imageClassName="object-contain object-bottom drop-shadow-2xl mix-blend-multiply"
          />
        </div>
        {/* Subtle base shadow/fade to blend the cutoff */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8F9FA] to-transparent pointer-events-none" />
      </motion.div>



    </div>
  );
}
