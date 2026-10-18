import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroBackgroundProps {
  isHovered: boolean;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ isHovered }) => {
  const prefersReducedMotion = useReducedMotion();

  // Floating cyan and violet particles with independent curved trajectories
  const particles = [
    { id: 1, color: '#00E5FF', size: 4, top: '18%', left: '12%', pathX: [0, 14, -8, 4, 0], pathY: [0, -18, -8, -22, 0], duration: 5.6, delay: 0 },
    { id: 2, color: '#C084FC', size: 3.5, top: '22%', right: '14%', pathX: [0, -12, 8, -6, 0], pathY: [0, -20, -10, -26, 0], duration: 6.4, delay: 0.8 },
    { id: 3, color: '#38BDF8', size: 4.5, bottom: '26%', left: '8%', pathX: [0, 10, -6, 12, 0], pathY: [0, 14, -8, 8, 0], duration: 5.8, delay: 1.2 },
    { id: 4, color: '#A855F7', size: 3.5, bottom: '22%', right: '10%', pathX: [0, -8, 6, -10, 0], pathY: [0, 12, -6, 10, 0], duration: 6.8, delay: 0.4 },
    { id: 5, color: '#00E5FF', size: 3, top: '38%', left: '5%', pathX: [0, -8, 10, 0], pathY: [0, -12, 6, 0], duration: 4.8, delay: 1.6 },
    { id: 6, color: '#E879F9', size: 3, top: '14%', left: '50%', pathX: [0, 12, -10, 0], pathY: [0, -14, 8, 0], duration: 5.2, delay: 2.0 },
    { id: 7, color: '#38BDF8', size: 3.5, bottom: '38%', right: '6%', pathX: [0, -12, 6, 0], pathY: [0, -8, -16, 0], duration: 7.0, delay: 0.6 },
    { id: 8, color: '#818CF8', size: 3, top: '68%', left: '16%', pathX: [0, 8, -12, 0], pathY: [0, -14, 6, 0], duration: 6.0, delay: 1.0 },
  ];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible"
      style={{ perspective: '1200px' }}
      aria-hidden="true"
    >
      {/* ============================================================== */}
      {/* 1. SOFT RADIAL GLOW THAT GENTLY PULSES (Atmospheric Aura)      */}
      {/* ============================================================== */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                scale: isHovered ? [1.08, 1.18, 1.08] : [1, 1.10, 1],
                opacity: isHovered ? [0.55, 0.75, 0.55] : [0.38, 0.58, 0.38],
              }
            : {
                scale: 1,
                opacity: isHovered ? 0.6 : 0.45,
              }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[340px] sm:w-[440px] md:w-[480px] lg:w-[500px] xl:w-[560px] h-[340px] sm:h-[440px] md:h-[480px] lg:h-[500px] xl:h-[560px] rounded-full bg-gradient-to-tr from-brand-blue/35 via-brand-violet/30 to-cyan-500/20 blur-[90px] pointer-events-none transition-all duration-500"
      />

      {/* Secondary Accent Backlight Nodes */}
      <div
        className={`absolute w-[240px] sm:w-[320px] lg:w-[360px] h-[240px] sm:h-[320px] lg:h-[360px] rounded-full bg-cyan-400/20 blur-[75px] pointer-events-none top-1/4 left-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-85' : 'opacity-65'
        }`}
      />
      <div
        className={`absolute w-[220px] sm:w-[300px] lg:w-[340px] h-[220px] sm:h-[300px] lg:h-[340px] rounded-full bg-brand-violet/25 blur-[80px] pointer-events-none bottom-1/4 right-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-85' : 'opacity-65'
        }`}
      />

      {/* ============================================================== */}
      {/* 2. FAINT GEOMETRIC PATTERN & CYBERNETIC TELEMETRY              */}
      {/* ============================================================== */}
      <svg
        className="absolute w-[360px] sm:w-[460px] md:w-[520px] lg:w-[540px] xl:w-[600px] h-[360px] sm:h-[460px] md:h-[520px] lg:h-[540px] xl:h-[600px] pointer-events-none opacity-20 transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.32 : 0.2 }}
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle cx="300" cy="300" r="280" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="4 20" />
        <circle cx="300" cy="300" r="220" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" strokeDasharray="2 12" />
        <circle cx="300" cy="300" r="160" stroke="rgba(0, 229, 255, 0.18)" strokeWidth="0.75" />

        {/* Quadrant Crosshair Telemetry Markers */}
        <line x1="300" y1="10" x2="300" y2="30" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="300" y1="570" x2="300" y2="590" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="10" y1="300" x2="30" y2="300" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="570" y1="300" x2="590" y2="300" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* Diagonal Subtle Studio Guides */}
        <line x1="95" y1="95" x2="110" y2="110" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <line x1="505" y1="95" x2="490" y2="110" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <line x1="95" y1="505" x2="110" y2="490" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <line x1="505" y1="505" x2="490" y2="490" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      </svg>

      {/* ============================================================== */}
      {/* 3. THREE LARGE BLUE-PURPLE ORBITAL RINGS                      */}
      {/* ============================================================== */}
      {/* --- ORBITAL RING 1: Major Diagonal Orbit (Clockwise 28s) --- */}
      <div
        className="absolute w-[340px] sm:w-[440px] md:w-[500px] lg:w-[520px] xl:w-[580px] 2xl:w-[620px] h-[340px] sm:h-[440px] md:h-[500px] lg:h-[520px] xl:h-[580px] 2xl:h-[620px] flex items-center justify-center pointer-events-none transition-all duration-500"
        style={{
          transform: 'rotateX(68deg) rotateY(-18deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          animate={!prefersReducedMotion ? { rotateZ: 360 } : {}}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="relative w-full h-full rounded-full flex items-center justify-center"
        >
          <svg className="w-full h-full" viewBox="0 0 600 600" fill="none">
            <circle
              cx="300"
              cy="300"
              r="285"
              stroke="url(#orbitGradMajor)"
              strokeWidth={isHovered ? '2' : '1.5'}
              strokeDasharray="16 28 8 36"
              className={`transition-opacity duration-500 ${isHovered ? 'opacity-85' : 'opacity-60'}`}
            />
            <circle
              cx="300"
              cy="300"
              r="270"
              stroke="rgba(0, 229, 255, 0.2)"
              strokeWidth="1"
              strokeDasharray="4 18"
            />
            <defs>
              <linearGradient id="orbitGradMajor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glowing Traveling Energy Bead */}
          <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_20px_#00e5ff] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
          </div>
          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-blue shadow-[0_0_12px_#38bdf8]" />
        </motion.div>
      </div>

      {/* --- ORBITAL RING 2: Minor Counter-Orbit (Counter-Clockwise 34s) --- */}
      <div
        className="absolute w-[310px] sm:w-[400px] md:w-[460px] lg:w-[470px] xl:w-[530px] 2xl:w-[570px] h-[310px] sm:h-[400px] md:h-[460px] lg:h-[470px] xl:h-[530px] 2xl:h-[570px] flex items-center justify-center pointer-events-none transition-all duration-500"
        style={{
          transform: 'rotateX(-62deg) rotateY(32deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          animate={!prefersReducedMotion ? { rotateZ: -360 } : {}}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          className="relative w-full h-full rounded-full flex items-center justify-center"
        >
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <circle
              cx="250"
              cy="250"
              r="238"
              stroke="url(#orbitGradMinor)"
              strokeWidth={isHovered ? '2' : '1.5'}
              strokeDasharray="22 36 10 26"
              className={`transition-opacity duration-500 ${isHovered ? 'opacity-85' : 'opacity-60'}`}
            />
            <circle
              cx="250"
              cy="250"
              r="224"
              stroke="rgba(192, 132, 252, 0.25)"
              strokeWidth="1"
              strokeDasharray="3 14"
            />
            <defs>
              <linearGradient id="orbitGradMinor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>

          {/* Orbiting Violet Comet Cluster */}
          <div className="absolute top-1/4 -right-1 w-3.5 h-3.5 rounded-full bg-purple-300 shadow-[0_0_18px_#c084fc] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
          <div className="absolute bottom-1/4 -left-1 w-2.5 h-2.5 rounded-full bg-brand-electric shadow-[0_0_14px_#00E5FF]" />
        </motion.div>
      </div>

      {/* --- ORBITAL RING 3: Equatorial Horizon Telemetry Compass (Clockwise 48s) --- */}
      <div
        className="absolute w-[360px] sm:w-[460px] md:w-[520px] lg:w-[540px] xl:w-[610px] 2xl:w-[660px] h-[360px] sm:h-[460px] md:h-[520px] lg:h-[540px] xl:h-[610px] 2xl:h-[660px] flex items-center justify-center pointer-events-none transition-all duration-500"
        style={{
          transform: 'rotateX(52deg) rotateY(-36deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          animate={!prefersReducedMotion ? { rotateZ: 360 } : {}}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          className="relative w-full h-full rounded-full flex items-center justify-center"
        >
          <svg className="w-full h-full" viewBox="0 0 700 700" fill="none">
            <circle
              cx="350"
              cy="350"
              r="335"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1"
              strokeDasharray="8 32"
              className={`transition-opacity duration-500 ${isHovered ? 'opacity-40' : 'opacity-25'}`}
            />
            {/* Telemetry coordinate nodes */}
            <circle cx="350" cy="15" r="2.5" fill="#00E5FF" className="opacity-75" />
            <circle cx="685" cy="350" r="2.5" fill="#8B5CF6" className="opacity-75" />
            <circle cx="350" cy="685" r="2.5" fill="#00E5FF" className="opacity-75" />
            <circle cx="15" cy="350" r="2.5" fill="#8B5CF6" className="opacity-75" />
          </svg>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 4. OCCASIONAL SUBTLE LIGHT STREAK (Energy Traverse)           */}
      {/* ============================================================== */}
      {!prefersReducedMotion && (
        <div
          className="absolute w-[340px] sm:w-[440px] md:w-[500px] lg:w-[520px] xl:w-[580px] h-[340px] sm:h-[440px] md:h-[500px] lg:h-[520px] xl:h-[580px] pointer-events-none"
          style={{
            transform: 'rotateX(68deg) rotateY(-18deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            animate={{
              rotateZ: [0, 360],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 8.5,
              ease: 'easeInOut',
            }}
            className="w-full h-full rounded-full flex items-center justify-center"
          >
            <svg className="w-full h-full" viewBox="0 0 600 600" fill="none">
              <path
                d="M 300 15 A 285 285 0 0 1 585 300"
                stroke="url(#streakGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_10px_#00E5FF]"
              />
              <defs>
                <linearGradient id="streakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="40%" stopColor="#00E5FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. SMALL CYAN AND VIOLET PARTICLES (Drifting Curved Paths)    */}
      {/* ============================================================== */}
      {!prefersReducedMotion &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: 'absolute',
              top: p.top,
              bottom: p.bottom,
              left: p.left,
              right: p.right,
              width: p.size,
              height: p.size,
              borderRadius: '9999px',
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
            animate={{
              x: p.pathX,
              y: p.pathY,
              opacity: [0.25, 0.9, 0.45, 0.95, 0.25],
              scale: [0.85, 1.25, 0.9, 1.2, 0.85],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
    </div>
  );
};
