import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Rotating3DLogoProps {
  className?: string;
  mousePos?: { x: number; y: number };
  isHovered?: boolean;
}

export const Rotating3DLogo: React.FC<Rotating3DLogoProps> = ({
  className = '',
  mousePos = { x: 0, y: 0 },
  isHovered = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Dynamic 3D counter-parallax based on mouse coordinates for true spatial depth
  const parallaxX = mousePos.x * -28;
  const parallaxY = mousePos.y * -28;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible ${className}`}
      style={{ perspective: '1400px' }}
      aria-hidden="true"
    >
      {/* ============================================================== */}
      {/* 1. CINEMATIC AMBIENT AURA (Smooth Volumetric Lighting)         */}
      {/* ============================================================== */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                scale: [1, 1.15, 1],
                opacity: [0.45, 0.7, 0.45],
              }
            : {}
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[300px] sm:w-[400px] md:w-[460px] lg:w-[480px] xl:w-[540px] h-[300px] sm:h-[400px] md:h-[460px] lg:h-[480px] xl:h-[540px] rounded-full bg-gradient-to-tr from-brand-blue/35 via-brand-violet/40 to-cyan-500/25 blur-[90px] pointer-events-none"
      />
      <div className="absolute w-[220px] sm:w-[280px] md:w-[320px] lg:w-[340px] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[340px] rounded-full bg-cyan-400/20 blur-[60px] pointer-events-none" />

      {/* ============================================================== */}
      {/* 2. PRECISION GYROSCOPIC GIMBAL SYSTEM (3D Tilted Planes)       */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate3d(${parallaxX * 0.4}px, ${parallaxY * 0.4}px, 0)`,
          transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* --- GIMBAL RING 1: Horizontal Orbital (Tilted 70° on X) --- */}
        <div
          className="absolute w-[320px] sm:w-[420px] md:w-[480px] lg:w-[480px] xl:w-[560px] 2xl:w-[620px] h-[320px] sm:h-[420px] md:h-[480px] lg:h-[480px] xl:h-[560px] 2xl:h-[620px] flex items-center justify-center pointer-events-none"
          style={{
            transform: 'rotateX(70deg) rotateY(-16deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            animate={!prefersReducedMotion ? { rotateZ: 360 } : {}}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="relative w-full h-full rounded-full flex items-center justify-center"
          >
            <svg className="w-full h-full" viewBox="0 0 600 600" fill="none">
              {/* Outer Neon Precision Track */}
              <circle
                cx="300"
                cy="300"
                r="285"
                stroke="url(#gyroGrad1)"
                strokeWidth="1.5"
                strokeDasharray="12 24 8 36"
                className="opacity-70"
              />
              {/* Inner Coordinate Ring */}
              <circle
                cx="300"
                cy="300"
                r="268"
                stroke="rgba(0, 229, 255, 0.25)"
                strokeWidth="1"
                strokeDasharray="4 16"
              />
              <defs>
                <linearGradient id="gyroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing Traveling Energy Particle */}
            <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_24px_#00e5ff] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping" />
            </div>
            <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-blue shadow-[0_0_14px_#38bdf8]" />
          </motion.div>
        </div>

        {/* --- GIMBAL RING 2: Vertical Counter-Orbital (Tilted -64° on X, 32° on Y) --- */}
        <div
          className="absolute w-[290px] sm:w-[380px] md:w-[440px] lg:w-[440px] xl:w-[510px] 2xl:w-[570px] h-[290px] sm:h-[380px] md:h-[440px] lg:h-[440px] xl:h-[510px] 2xl:h-[570px] flex items-center justify-center pointer-events-none"
          style={{
            transform: 'rotateX(-64deg) rotateY(32deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            animate={!prefersReducedMotion ? { rotateZ: -360 } : {}}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="relative w-full h-full rounded-full flex items-center justify-center"
          >
            <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
              <circle
                cx="250"
                cy="250"
                r="238"
                stroke="url(#gyroGrad2)"
                strokeWidth="1.5"
                strokeDasharray="20 40 10 30"
                className="opacity-75"
              />
              <circle
                cx="250"
                cy="250"
                r="224"
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="1"
                strokeDasharray="3 14"
              />
              <defs>
                <linearGradient id="gyroGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C084FC" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.85" />
                </linearGradient>
              </defs>
            </svg>

            {/* Orbiting Violet Comet Cluster */}
            <div className="absolute top-1/4 -right-1.5 w-3.5 h-3.5 rounded-full bg-purple-300 shadow-[0_0_20px_#c084fc] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <div className="absolute bottom-1/4 -left-1.5 w-3 h-3 rounded-full bg-brand-electric shadow-[0_0_16px_#00E5FF]" />
          </motion.div>
        </div>

        {/* --- GIMBAL RING 3: Precision Architectural Telemetry Compass --- */}
        <div
          className="absolute w-[340px] sm:w-[440px] md:w-[500px] lg:w-[500px] xl:w-[580px] 2xl:w-[650px] h-[340px] sm:h-[440px] md:h-[500px] lg:h-[500px] xl:h-[580px] 2xl:h-[650px] flex items-center justify-center pointer-events-none"
          style={{
            transform: 'rotateX(48deg) rotateY(-40deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            animate={!prefersReducedMotion ? { rotateZ: 360 } : {}}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className="relative w-full h-full rounded-full flex items-center justify-center"
          >
            <svg className="w-full h-full" viewBox="0 0 700 700" fill="none">
              <circle
                cx="350"
                cy="350"
                r="335"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1"
                strokeDasharray="8 32"
              />
              {/* Telemetry crosshair marks */}
              <circle cx="350" cy="15" r="2.5" fill="#00E5FF" className="opacity-80" />
              <circle cx="685" cy="350" r="2.5" fill="#8B5CF6" className="opacity-80" />
              <circle cx="350" cy="685" r="2.5" fill="#00E5FF" className="opacity-80" />
              <circle cx="15" cy="350" r="2.5" fill="#8B5CF6" className="opacity-80" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CONTINUOUS EXPANDING ENERGY RIPPLES (Subtle, High-End Pulse)*/}
      {/* ============================================================== */}
      {[0, 1.8, 3.6].map((delay, idx) => (
        <motion.div
          key={idx}
          animate={
            !prefersReducedMotion
              ? {
                  scale: [0.75, 1.5],
                  opacity: [0.65, 0],
                }
              : {}
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeOut',
            delay,
          }}
          className="absolute w-[240px] sm:w-[320px] md:w-[360px] lg:w-[380px] xl:w-[440px] h-[240px] sm:h-[320px] md:h-[360px] lg:h-[380px] xl:h-[440px] rounded-full border border-cyan-400/35 pointer-events-none shadow-[0_0_25px_rgba(0,229,255,0.25)]"
        />
      ))}

      {/* ============================================================== */}
      {/* 4. THE 3D HOLOGRAPHIC BRAND CORE (Unique, Upright & Pristine)  */}
      {/* ============================================================== */}
      <div
        className="relative flex items-center justify-center -mt-6 sm:-mt-10"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Floating Zero-G Levitation & Gyroscope Precession */}
        <motion.div
          animate={
            !prefersReducedMotion
              ? {
                  y: [-12, 12, -12],
                  rotateX: [12, -12, 12],
                  rotateY: [-24, 24, -24],
                  rotateZ: [-6, 6, -6],
                }
              : {}
          }
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main 3D Glassmorphic Obsidian Shield Core */}
          <div
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 rounded-full p-2.5 sm:p-3 bg-gradient-to-tr from-[#080c24]/95 via-[#10173d]/90 to-[#0b1335]/95 border-2 border-cyan-400/70 shadow-[0_0_50px_rgba(0,229,255,0.45),inset_0_0_20px_rgba(0,229,255,0.2)] backdrop-blur-2xl flex items-center justify-center overflow-hidden"
            style={{
              transform: 'translateZ(15px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Holographic Concentric Grid Pattern (Echoing Brand Identity) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5ff12_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff12_1px,transparent_1px)] bg-[size:1.2rem_1.2rem] opacity-40 pointer-events-none rounded-full" />

            {/* Precision Neon Inner Rim */}
            <div className="absolute inset-2.5 rounded-full border border-cyan-300/40 pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-dashed border-violet-400/30 pointer-events-none" />

            {/* Diagonal Specular High-Gloss Sheen Sweep */}
            <motion.div
              animate={
                !prefersReducedMotion
                  ? {
                      x: ['-160%', '240%'],
                    }
                  : {}
              }
              transition={{
                repeat: Infinity,
                duration: 3.2,
                ease: 'easeInOut',
                repeatDelay: 1.2,
              }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent rotate-25 pointer-events-none"
            />

            {/* Multi-Layer Volumetric Core Glow */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-brand-blue/50 via-cyan-500/20 to-brand-violet/50 blur-xl pointer-events-none" />

            {/* Official ADGEN-X Brand Logo (Always Upright, Razor Sharp) */}
            <div className="relative z-10 w-full h-full p-2 flex items-center justify-center">
              <img
                src="/adgenx-logo.png"
                alt="LetsGo AdGenX Official 3D Brand Core"
                width={280}
                height={280}
                className="w-full h-full object-contain filter drop-shadow-[0_8px_25px_rgba(0,149,255,0.7)]"
                loading="eager"
              />
            </div>
          </div>

          {/* Precision 3D Depth Chamfer Layers (Physical Extrusion Behind Disc) */}
          {[-4, -8, -12, -16].map((z, idx) => (
            <div
              key={z}
              className="absolute w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 rounded-full border border-cyan-400/30 bg-gradient-to-tr from-[#050818] via-[#090e28] to-[#070b20] pointer-events-none"
              style={{
                transform: `translateZ(${z}px)`,
                opacity: 0.8 - idx * 0.18,
              }}
            />
          ))}

          {/* Back Core Aura Beacon */}
          <div
            className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-cyan-400/30 blur-2xl pointer-events-none"
            style={{ transform: 'translateZ(-20px)' }}
          />
        </motion.div>
      </div>
    </div>
  );
};
