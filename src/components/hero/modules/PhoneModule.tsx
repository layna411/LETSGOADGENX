import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Smartphone, ArrowRight, Zap, Check, BarChart2, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PhoneModuleProps {
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
  isDimmed: boolean;
}

export const PhoneModule: React.FC<PhoneModuleProps> = ({ onHover, isHovered, isDimmed }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [screenIndex, setScreenIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setScreenIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      data-cursor="card"
      data-cursor-label="APPS"
      onClick={() => navigate('/services/software-development')}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      animate={
        !prefersReducedMotion
          ? {
            y: [0, -6, 0],
          }
          : {}
      }
      transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute top-[3%] right-[1.5%] sm:right-[2.5%] z-20 cursor-pointer group select-none transition-all duration-300 ${isHovered
          ? 'scale-105 -translate-y-1 z-40'
          : isDimmed
            ? 'opacity-40 scale-98 hover:opacity-100'
            : 'hover:scale-102'
        }`}
    >
      {/* Prominent Smartphone Mockup */}
      <div
        className={`w-40 sm:w-46 rounded-[22px] p-2 border backdrop-blur-xl transition-all duration-300 shadow-xl ${isHovered
            ? 'bg-[#150f33]/98 border-violet-400 shadow-[0_0_35px_rgba(183,160,255,0.5)]'
            : 'bg-[#0b081e]/90 border-white/[0.12] hover:border-violet-400/60'
          }`}
      >
        {/* Dynamic Island Notch */}
        <div className="flex justify-center mb-1.5">
          <div className="h-2 w-12 bg-black/90 rounded-full flex items-center justify-between px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400/70" />
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>

        {/* Screen Content Preview */}
        <div className="rounded-[16px] p-2.5 bg-gradient-to-b from-[#140e30] via-[#0e0924] to-[#070514] space-y-2 border border-white/[0.05] min-h-[140px] flex flex-col justify-between">
          {/* Status Bar */}
          <div className="flex items-center justify-between text-[7.5px] text-white/50 font-mono">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span>5G</span>
              <span className="w-2.5 h-1.5 rounded-sm border border-white/50 flex items-center p-0.5">
                <span className="w-full h-full bg-white rounded-2xs" />
              </span>
            </span>
          </div>

          {/* Smooth Screen Content Transitions */}
          {screenIndex === 0 ? (
            <motion.div
              key="screen-1"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              <div className="p-2 rounded-xl bg-gradient-to-r from-violet-600/30 to-indigo-600/30 border border-violet-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-heading font-bold text-white flex items-center gap-1">
                    <BarChart2 className="w-2.5 h-2.5 text-violet-300" />
                    <span>Analytics Pro</span>
                  </span>
                  <span className="p-0.5 px-1 rounded bg-violet-400/25 text-violet-200 text-[6.5px] font-mono">
                    Live
                  </span>
                </div>
                <div className="h-1.5 w-16 bg-white/35 rounded" />
              </div>

              <div className="space-y-1 text-[7.5px] font-mono text-white/70">
                <div className="flex items-center gap-1">
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Flutter & React Native</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-violet-400" />
                  <span>120Hz Fluid Motion</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="screen-2"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-600/30 to-cyan-600/30 border border-cyan-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-heading font-bold text-white flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5 text-cyan-300" />
                    <span>Secure Wallet</span>
                  </span>
                  <span className="p-0.5 px-1 rounded bg-cyan-400/25 text-cyan-200 text-[6.5px] font-mono">
                    Encrypted
                  </span>
                </div>
                <div className="h-1.5 w-18 bg-white/35 rounded" />
              </div>

              <div className="space-y-1 text-[7.5px] font-mono text-white/70">
                <div className="flex items-center gap-1">
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Biometric FaceID</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-cyan-400" />
                  <span>Cloud Data Sync</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bottom Dock / Navigation Pill */}
          <div className="pt-1.5 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-md bg-violet-500/20 text-violet-400">
                <Smartphone className="w-3 h-3" />
              </div>
              <div>
                <span className="text-[10px] font-heading font-bold text-white group-hover:text-violet-300 transition-colors block leading-tight">
                  Mobile Apps
                </span>
                <span className="text-[7.5px] font-mono text-violet-400/80 leading-none">
                  iOS & Android
                </span>
              </div>
            </div>
            <ArrowRight className="w-3 h-3 text-violet-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
