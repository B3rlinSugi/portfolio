"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const statsData = [
  { value: 7, suffix: "+", label: "Projects" },
  { value: 4, suffix: "+", label: "Years Learning" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: "∞", suffix: "", label: "Curiosity" } // Infinite doesn't count up
];

function StatCard({ item, index }: { item: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(item.value === "∞" ? "∞" : "0");

  useEffect(() => {
    if (isInView && typeof item.value === "number") {
      const controls = animate(0, item.value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (val) => {
          setDisplayValue(Math.floor(val).toString());
        }
      });
      return () => controls.stop();
    }
  }, [isInView, item.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-[#13151A] to-[#0F1115] border border-white/5 rounded-3xl group hover:border-orange-500/30 transition-colors duration-500"
    >
      <h4 className="text-[36px] md:text-[48px] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2 group-hover:from-orange-400 group-hover:to-orange-600 transition-all duration-500">
        {displayValue}{item.suffix}
      </h4>
      <p className="text-[14px] uppercase tracking-[2px] font-semibold text-gray-500 group-hover:text-gray-300 transition-colors duration-500 text-center">
        {item.label}
      </p>
    </motion.div>
  );
}

export default function EngineeringStats() {
  return (
    <div className="w-full mt-24 mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((item, idx) => (
          <StatCard key={idx} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
}
