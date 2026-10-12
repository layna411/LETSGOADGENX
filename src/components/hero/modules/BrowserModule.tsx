import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BrowserModuleProps {
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
  isDimmed: boolean;
}

export const BrowserModule: React.FC<BrowserModuleProps> = ({ onHover, isHovered, isDimmed }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      data-cursor="card"
      data-cursor-label="WEBSITES"
      onClick={() => navigate('/services/website-development')}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      animate={
        !prefersReducedMotion
          ? {
            y: [0, -6, 0],
          }
          : {}
      }
      transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute top-[3%] left-[1.5%] sm:left-[2.5%] z-20 cursor-pointer group select-none transition-all duration-300 ${isHovered
          ? 'scale-105 -translate-y-1 z-40'
          : isDimmed
            ? 'opacity-40 scale-98 hover:opacity-100'
            : 'hover:scale-102'
        }`}
    >
      {/* Mini Glass Browser Window Mockup */}
      <div
        className={`w-48 sm:w-56 rounded-xl border backdrop-blur-xl transition-all duration-300 shadow-xl overflow-hidden ${isHovered
            ? 'bg-[#0d1633]/98 border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.5)]'
            : 'bg-[#080d22]/90 border-white/[0.12] hover:border-sky-400/60'
          }`}
      >
        {/* Browser Window Header */}
        <div className="px-3 py-1.5 bg-black/50 border-b border-white/[0.08] flex items-center justify-between">
          {/* Traffic Light Window Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/90" />
            <span className="w-2 h-2 rounded-full bg-amber-500/90" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/90" />
          </div>
          {/* URL Pill with Loading Indicator */}
          <div className="px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[8.5px] font-mono text-sky-300 flex items-center gap-1 truncate max-w-[110px]">
            <Loader2 className="w-2 h-2 text-sky-400 animate-spin" />
            <span>letsgoadgenx.dev</span>
          </div>
        </div>

        {/* Animated Page Loading Progress Bar */}
        <div className="w-full h-[2px] bg-sky-950/40 overflow-hidden">
          <motion.div
            animate={
              !prefersReducedMotion
                ? {
                  x: ['-100%', '100%'],
                }
                : {}
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-sky-400 to-transparent"
          />
        </div>

        {/* Viewport Content Preview with Subtle Movement */}
        <div className="p-3 space-y-2 bg-gradient-to-b from-[#0c1430] to-[#060a1a]">
          {/* Mock Hero Wireframe */}
          <div className="space-y-1">
            <div className="h-2 w-20 bg-gradient-to-r from-sky-400 via-indigo-400 to-cyan-300 rounded-full" />
            <div className="h-1.5 w-28 bg-white/25 rounded-full" />
          </div>

          {/* Interactive Screen Tab Preview */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <div
              className={`p-1.5 rounded-lg border transition-all duration-300 space-y-1 ${activeTab === 0
                  ? 'bg-sky-500/15 border-sky-400/40'
                  : 'bg-white/[0.03] border-white/[0.06]'
                }`}
            >
              <div className="w-3.5 h-3.5 rounded bg-sky-500/25 text-sky-300 flex items-center justify-center text-[8px] font-mono">
                ⚡
              </div>
              <div className="h-1.5 w-12 bg-white/40 rounded" />
            </div>

            <div
              className={`p-1.5 rounded-lg border transition-all duration-300 space-y-1 ${activeTab === 1
                  ? 'bg-violet-500/15 border-violet-400/40'
                  : 'bg-white/[0.03] border-white/[0.06]'
                }`}
            >
              <div className="w-3.5 h-3.5 rounded bg-violet-500/25 text-violet-300 flex items-center justify-center text-[8px] font-mono">
                🚀
              </div>
              <div className="h-1.5 w-12 bg-white/40 rounded" />
            </div>
          </div>

          {/* Module Label Strip */}
          <div className="pt-1.5 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-md bg-sky-500/20 text-sky-400">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10.5px] font-heading font-bold text-white group-hover:text-sky-300 transition-colors block leading-tight">
                  Website Development
                </span>
                <span className="text-[8px] font-mono text-sky-400/80 leading-none">
                  Next.js & Responsive Web
                </span>
              </div>
            </div>
            <ArrowRight className="w-3 h-3 text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
