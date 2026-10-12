import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Palette, ArrowRight, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DesignModuleProps {
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
  isDimmed: boolean;
}

export const DesignModule: React.FC<DesignModuleProps> = ({ onHover, isHovered, isDimmed }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      data-cursor="card"
      data-cursor-label="DESIGN"
      onClick={() => navigate('/services/graphic-design')}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      animate={
        !prefersReducedMotion
          ? {
            y: [0, -6, 0],
          }
          : {}
      }
      transition={{ duration: 6.0, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: 'calc(50% - 60px)' }}
      className={`absolute right-[0.5%] sm:right-[1.5%] z-20 cursor-pointer group select-none transition-all duration-300 ${isHovered
          ? 'scale-105 -translate-y-1 z-40'
          : isDimmed
            ? 'opacity-40 scale-98 hover:opacity-100'
            : 'hover:scale-102'
        }`}
    >
      {/* Creative Design Studio Canvas Card */}
      <div
        className={`w-44 sm:w-50 rounded-xl p-3 border backdrop-blur-xl transition-all duration-300 shadow-xl overflow-hidden ${isHovered
            ? 'bg-[#1b1033]/98 border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.5)]'
            : 'bg-[#100822]/90 border-white/[0.12] hover:border-purple-400/60'
          }`}
      >
        {/* Vector Canvas Preview with Pulsing Anchor Node */}
        <div className="h-14 w-full rounded-lg bg-black/50 border border-white/[0.06] relative p-1.5 flex items-center justify-between overflow-hidden mb-2">
          {/* Animated SVG Bezier Curve */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 170 56">
            <defs>
              <linearGradient id="vectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>
            </defs>

            <motion.path
              d="M 15 42 C 55 5, 105 52, 155 18"
              fill="none"
              stroke="url(#vectorGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Bezier Control Handles & Nodes */}
            <line x1="15" y1="42" x2="55" y2="5" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
            <circle cx="55" cy="5" r="3" fill="#38BDF8" />

            <circle cx="105" cy="52" r="3" fill="#F43F5E" />
            <line x1="105" y1="52" x2="155" y2="18" stroke="#F43F5E" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

            {/* Pulsing Active Anchor Node */}
            <circle cx="155" cy="18" r="4" fill="#FFFFFF" stroke="#A855F7" strokeWidth="2" className="shadow-[0_0_8px_#a855f7]" />
          </svg>

          {/* Typography Glyph Badge with Transition */}
          <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-purple-500/25 border border-purple-400/40 text-purple-200 font-serif font-extrabold text-[11px] leading-none">
            Aa
          </div>
        </div>

        {/* Animated Palette Swatches */}
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-sm border border-white/20" />
            <span className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-sm border border-white/20" />
            <span className="w-3.5 h-3.5 rounded-full bg-pink-500 shadow-sm border border-white/20" />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm border border-white/20" />
          </div>
          <span className="text-[8px] font-mono text-purple-300 flex items-center gap-1 font-semibold">
            <Layers className="w-2.5 h-2.5" /> Vectors
          </span>
        </div>

        {/* Module Label Strip */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-md bg-purple-500/20 text-purple-400">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10.5px] font-heading font-bold text-white group-hover:text-purple-300 transition-colors block leading-tight">
                Branding & Design
              </span>
              <span className="text-[8px] font-mono text-purple-400/80 leading-none">
                Visual Identity Systems
              </span>
            </div>
          </div>
          <ArrowRight className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};
