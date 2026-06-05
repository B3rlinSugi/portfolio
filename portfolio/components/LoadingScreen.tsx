"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[100] overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[8px] md:tracking-[12px] text-white flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            B
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-orange-500 mx-1 md:mx-2"
          >
            E
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            C K E N D
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="tracking-[6px] md:tracking-[10px] text-xs md:text-sm text-zinc-400 mt-4 font-medium"
        >
          DEVELOPER
        </motion.p>

        <div className="w-48 md:w-64 h-[2px] bg-zinc-800 mt-10 overflow-hidden rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut"
            }}
            className="h-full bg-orange-500"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-xs md:text-sm text-zinc-500 mt-8 tracking-wider"
        >
          Building reliable systems...
        </motion.p>
      </div>
    </motion.div>
  );
}
