import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Camera, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CameraModuleProps {
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
  isDimmed: boolean;
}

export const CameraModule: React.FC<CameraModuleProps> = ({ onHover, isHovered, isDimmed }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      data-cursor="card"
      data-cursor-label="PHOTO"
      onClick={() => navigate('/services/photography')}
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
      className={`absolute bottom-[3%] right-[1.5%] sm:right-[2.5%] z-20 cursor-pointer group select-none transition-all duration-300 ${
        isHovered
          ? 'scale-105 -translate-y-1 z-40'
          : isDimmed
          ? 'opacity-40 scale-98 hover:opacity-100'
          : 'hover:scale-102'
      }`}
    >
      {/* Studio Photography & Camera Frame Card */}
      <div
        className={`w-42 sm:w-48 rounded-xl p-3 border backdrop-blur-xl transition-all duration-300 shadow-xl overflow-hidden ${
          isHovered
            ? 'bg-[#1f1809]/98 border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.5)]'
            : 'bg-[#120d04]/90 border-white/[0.12] hover:border-amber-400/60'
        }`}
      >
        {/* Optical Lens Aperture Ring Mockup with Rotating Focus Ring */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full border border-amber-400/70 p-0.5 flex items-center justify-center bg-black/70 shadow-[0_0_10px_rgba(251,191,36,0.35)]">
              {/* Rotating Focus Indicator Ring */}
              <div className="w-4.5 h-4.5 rounded-full border border-dashed border-cyan-400/70 animate-[spin_12s_linear_infinite] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#67e8f9]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono font-bold text-amber-300">50mm f/1.2</span>
              <span className="text-[7px] font-mono text-white/50">Studio Optics</span>
            </div>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        </div>

        {/* Gallery Image Preview Card with Smooth Crossfade */}
        <div className="rounded-lg p-1.5 bg-white/[0.04] border border-white/[0.08] flex items-center gap-2 mb-2">
          {/* Framed Photo Simulation */}
          <div className="w-12 h-8 rounded bg-gradient-to-tr from-amber-600 via-rose-500 to-indigo-500 shrink-0 relative overflow-hidden flex items-end p-1 shadow-inner">
            <span className="text-[6px] text-white font-mono font-semibold">
              {photoIndex === 0 ? 'RAW 48MP' : 'PRO STUDIO'}
            </span>
          </div>

          <div className="flex flex-col text-[7.5px] text-white/70 font-mono leading-tight">
            <span>{photoIndex === 0 ? 'Commercial Brand' : 'Fashion & Events'}</span>
            <span className="text-amber-400 font-semibold">Color Graded 4K</span>
          </div>
        </div>

        {/* Module Label Strip */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-md bg-amber-500/20 text-amber-400">
              <Camera className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10.5px] font-heading font-bold text-white group-hover:text-amber-300 transition-colors block leading-tight">
                Photography
              </span>
              <span className="text-[8px] font-mono text-amber-400/80 leading-none">
                Studio & Shoots
              </span>
            </div>
          </div>
          <ArrowRight className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};
