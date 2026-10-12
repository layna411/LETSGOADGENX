import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CentralCoreProps {
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
}

export const CentralCore: React.FC<CentralCoreProps> = ({ onHover, isHovered }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      data-cursor="core"
      onClick={() => navigate('/about')}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      className="z-30 cursor-pointer group select-none flex items-center justify-center pointer-events-auto"
      aria-label="ADGEN-X Brand Core"
    >
      {/* 1. Multi-Stage Ambient Radial Lighting Centered on Logo */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-brand-blue/30 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-blue/50 transition-colors duration-500" />
      <div className="absolute w-52 h-52 sm:w-68 sm:h-68 bg-brand-violet/40 rounded-full blur-[80px] pointer-events-none group-hover:bg-brand-violet/60 transition-colors duration-500" />
      <div className="absolute w-36 h-36 bg-cyan-400/30 rounded-full blur-2xl pointer-events-none" />

      {/* 2. Concentric Pulsing Energy Shockwaves Centered on Logo */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.8, 0.3],
              }
            : {}
        }
        transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-brand-electric/40 pointer-events-none"
      />
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                scale: [1.15, 0.95, 1.15],
                opacity: [0.2, 0.7, 0.2],
              }
            : {}
        }
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-brand-violet/30 pointer-events-none"
      />

      {/* 3. Outer Rotating Dashed Ring (SVG Centered on Logo) */}
      <div className="absolute w-40 h-40 sm:w-48 sm:h-48 pointer-events-none flex items-center justify-center">
        <svg className="w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="url(#coreRingGrad)"
            strokeWidth="1.5"
            strokeDasharray="10 16"
            className="opacity-70"
          />
          <defs>
            <linearGradient id="coreRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Thin Electric-Blue Inner Ring (Rotating Counter-Clockwise Centered on Logo) */}
      <div className="absolute w-32 h-32 sm:w-40 sm:h-40 pointer-events-none rounded-full border border-cyan-400/50 border-dashed animate-[spin_20s_linear_infinite_reverse]" />

      {/* 4. Central Glowing Logo Housing Sphere (Exact Visual Center) */}
      <div className="relative p-2.5 sm:p-3 rounded-full bg-gradient-to-b from-[#1c244e]/95 via-[#0b0f2a]/95 to-[#050612]/95 border-2 border-brand-electric/70 shadow-[0_0_45px_rgba(56,189,248,0.5)] group-hover:shadow-[0_0_65px_rgba(56,189,248,0.8)] group-hover:border-cyan-300 transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
        {/* Animated Rotating Laser Accent Border */}
        <div className="absolute inset-0 rounded-full border border-brand-lavender/60 border-t-transparent animate-[spin_10s_linear_infinite] pointer-events-none" />

        {/* The Official ADGEN-X Logo (Undistorted, Razor Sharp, Layered Glow) */}
        <div className="relative w-20 h-20 sm:w-26 sm:h-26 rounded-full overflow-hidden flex items-center justify-center p-1.5 bg-black/50">
          <img
            src="/adgenx-logo.png"
            alt="ADGEN-X Official Brand Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]"
          />
        </div>
      </div>

      {/* 5. Brand Core Label Badge (Positioned below sphere without shifting center of gravity) */}
      <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-brand-surface/95 border border-brand-electric/50 text-[10.5px] font-heading font-bold text-white tracking-wide shadow-xl backdrop-blur-md flex items-center gap-1.5 group-hover:border-cyan-400 group-hover:bg-brand-surface transition-all whitespace-nowrap">
        <Sparkles className="w-3.5 h-3.5 text-brand-lavender animate-pulse" />
        <span className="text-gradient">ADGEN-X CORE</span>
      </div>

      {/* 6. Hover Tooltip Card */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-[calc(100%+42px)] left-1/2 -translate-x-1/2 z-50 glass-card px-4 py-2 rounded-xl border border-brand-electric/60 shadow-2xl text-center pointer-events-none whitespace-nowrap bg-[#0b1229]/95"
        >
          <div className="text-xs font-heading font-bold text-white flex items-center justify-center gap-1.5">
            <span>Digital Innovation Hub</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-electric" />
          </div>
          <div className="text-[10px] text-brand-muted mt-0.5">
            Unified Technology & Creative Ecosystem
          </div>
        </motion.div>
      )}
    </div>
  );
};
