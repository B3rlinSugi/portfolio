"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate deterministic-looking particles
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: (i % 3) + 2, // 2px - 4px
    x: (i * 17) % 100, 
    y: (i * 23) % 100, 
    duration: (i % 15) + 25, // 25s - 40s
    delay: (i % 5),
    color: i % 4 === 0 ? "bg-white" : i % 2 === 0 ? "bg-[#ff4d00]" : "bg-[#ff6b00]",
    opacity: (i % 10) * 0.01 + 0.1, // 10% - 20%
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
      
      {/* LAYER 1: Base Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* LAYER 2: Grid System (Parallax/Slow Move) */}
      <motion.div 
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-10%] w-[120%] h-[120%] opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 90, 0, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 90, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      {/* LAYER 3: Radial Glow (Center-right) */}
      <motion.div 
        animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, #ff6b00 0%, #ff4d00 40%, #ff7b00 100%)",
          filter: "blur(180px)",
          opacity: 0.25
        }}
      />

      {/* LAYER 8: Code Visualization (Behind Portrait) */}
      <div className="absolute right-[5%] lg:right-[15%] top-[25%] opacity-[0.05] blur-[4px] font-mono text-sm text-[#ff6b00] whitespace-pre z-0 pointer-events-none rotate-[-3deg] select-none">
        {`const api = createServer()
        
app.use(express.json())
app.use(cors())

app.get('/api/v1/users', async (req, res) => {
  const users = await database.query('SELECT * FROM users')
  return res.status(200).json({ data: users })
})

database.connect({
  host: process.env.DB_HOST,
  pool: true,
  maxConnections: 100
})

api.listen(8080, () => {
  logger.info('System online. Scalable architecture active.')
})`}
      </div>

      {/* LAYER 4: Connection Lines (SVG) */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Animated Paths simulating data flow */}
          <motion.path 
            d="M 15% 20% L 35% 20% L 35% 50% L 50% 50%" 
            stroke="#ff6b00" 
            strokeWidth="1" 
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 85% 15% L 85% 45% L 65% 45%" 
            stroke="#ff6b00" 
            strokeWidth="1" 
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.path 
            d="M 10% 75% L 25% 75% L 25% 95%" 
            stroke="#ff6b00" 
            strokeWidth="1" 
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.path 
            d="M 75% 85% L 75% 65% L 95% 65%" 
            stroke="#ff6b00" 
            strokeWidth="1" 
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          {/* Static Circuit Lines */}
          <path d="M 45% 10% L 45% 25% L 65% 25%" stroke="rgba(255,107,0,0.25)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <path d="M 90% 55% L 70% 55% L 70% 75%" stroke="rgba(255,107,0,0.25)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* LAYER 6: Particle System */}
      {mounted && particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -150, 0],
            x: [0, p.id % 2 === 0 ? 30 : -30, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
          className={`absolute rounded-full ${p.color} z-10 pointer-events-none`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity
          }}
        />
      ))}
      
    </div>
  );
}
