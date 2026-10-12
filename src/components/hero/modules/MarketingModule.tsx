import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MarketingModuleProps {
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
  isDimmed: boolean;
}

export const MarketingModule: React.FC<MarketingModuleProps> = ({ onHover, isHovered, isDimmed }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      data-cursor="card"
      data-cursor-label="GROWTH"
      onClick={() => navigate('/services/digital-marketing')}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      animate={
        !prefersReducedMotion
          ? {
            y: [0, -6, 0],
          }
          : {}
      }
      transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      style={{ top: 'calc(50% - 60px)' }}
      className={`absolute left-[0.5%] sm:left-[1.5%] z-20 cursor-pointer group select-none transition-all duration-300 ${isHovered
          ? 'scale-105 -translate-y-1 z-40'
          : isDimmed
            ? 'opacity-40 scale-98 hover:opacity-100'
            : 'hover:scale-102'
        }`}
    >
      {/* Animated Marketing Analytics Card */}
      <div
        className={`w-44 sm:w-50 rounded-xl p-3 border backdrop-blur-xl transition-all duration-300 shadow-xl overflow-hidden ${isHovered
            ? 'bg-[#0d2117]/98 border-emerald-400 shadow-[0_0_35px_rgba(34,197,94,0.5)]'
            : 'bg-[#06150e]/90 border-white/[0.12] hover:border-emerald-400/60'
          }`}
      >
        {/* Metric Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8.5px] font-mono text-white/50 uppercase tracking-wider">
            Performance
          </span>
          <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8.5px] font-mono font-bold border border-emerald-500/30">
            <ArrowUpRight className="w-2.5 h-2.5" />
            <span>+340%</span>
          </div>
        </div>

        {/* Self-Drawing Line Graph & Animated Bars */}
        <div className="h-12 w-full relative mb-2 flex items-end">
          {/* SVG Vector Path that draws itself */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 48">
            <defs>
              <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Gradient Area */}
            <path
              d="M 10 40 Q 40 32, 70 24 T 120 14 T 150 6 L 150 48 L 10 48 Z"
              fill="url(#chartGrad)"
            />

            {/* Glowing Trend Line */}
            <motion.path
              d="M 10 40 Q 40 32, 70 24 T 120 14 T 150 6"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={!prefersReducedMotion ? { pathLength: [0.2, 1, 0.2] } : { pathLength: 1 }}
              transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Peak Target Dot */}
            <circle cx="150" cy="6" r="3" fill="#34D399" className="shadow-[0_0_8px_#34d399]" />
          </svg>

          {/* Animated Growth Bars */}
          <div className="w-full flex items-end justify-between gap-1.5 h-full px-1.5 opacity-40">
            {[30, 44, 38, 58, 72, 90].map((height, i) => (
              <motion.div
                key={i}
                animate={
                  !prefersReducedMotion
                    ? {
                      height: [`${height * 0.75}%`, `${height}%`, `${height * 0.75}%`],
                    }
                    : {}
                }
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: 'easeInOut',
                }}
                style={{ height: `${height}%` }}
                className="w-full rounded-t-sm bg-gradient-to-t from-emerald-600/30 to-emerald-400"
              />
            ))}
          </div>
        </div>

        {/* Channel Tags with Pulsing Indicator */}
        <div className="flex items-center justify-between text-[7.5px] font-mono text-emerald-300/90 mb-2">
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25">
              SEO
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25">
              Ads
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25">
              ROI
            </span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Module Label Strip */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10.5px] font-heading font-bold text-white group-hover:text-emerald-300 transition-colors block leading-tight">
                Digital Marketing
              </span>
              <span className="text-[8px] font-mono text-emerald-400/80 leading-none">
                Data-Driven Growth
              </span>
            </div>
          </div>
          <ArrowRight className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};
