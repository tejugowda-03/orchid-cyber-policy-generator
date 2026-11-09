"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Petal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  duration: number;
  delay: number;
  size: number;
}

export default function OrchidBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Generate floating petals
    const newPetals: Petal[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      rotation: Math.random() * 360,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      size: Math.random() * 20 + 15,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.02_0.01_280)] via-[oklch(0.05_0.04_290)] to-[oklch(0.03_0.02_300)]" />
      
      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Radial Gradient Overlays */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.25 290) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-25"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.18 305) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, oklch(0.75 0.15 200) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[oklch(0.68_0.18_305)]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: "0 0 10px oklch(0.68 0.18 305)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Floating Orchid Petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size,
          }}
          initial={{
            y: `${petal.y}vh`,
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "120vh",
            rotate: petal.rotation + 360,
            opacity: [0, 0.6, 0.4, 0],
            x: [0, 30, -20, 10, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: "linear",
            delay: petal.delay,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id={`petal-gradient-${petal.id}`}>
                <stop offset="0%" stopColor="oklch(0.75 0.20 310)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="oklch(0.65 0.22 300)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="oklch(0.55 0.18 295)" stopOpacity="0.3" />
              </radialGradient>
            </defs>
            <ellipse
              cx="50"
              cy="50"
              rx="30"
              ry="45"
              fill={`url(#petal-gradient-${petal.id})`}
              opacity="0.7"
            />
          </svg>
        </motion.div>
      ))}

      {/* Cyber Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.68 0.18 305)" />
            <stop offset="50%" stopColor="oklch(0.55 0.25 290)" />
            <stop offset="100%" stopColor="oklch(0.75 0.15 200)" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="30%"
          x2="100%"
          y2="30%"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="0"
          y1="70%"
          x2="100%"
          y2="70%"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
      </svg>
    </div>
  );
}
