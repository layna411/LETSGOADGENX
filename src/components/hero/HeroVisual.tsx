import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, TrendingUp, Sparkles, Terminal, CheckCircle2, Zap } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square flex items-center justify-center select-none">
      {/* Ambient Radial Lights */}
      <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-brand-blue/20 rounded-full blur-[90px] pointer-events-none -top-10 -left-10" />
      <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] bg-brand-violet/25 rounded-full blur-[90px] pointer-events-none -bottom-10 -right-10" />

      {/* Cyber Grid Circle Ring */}
      <div className="absolute inset-4 sm:inset-6 rounded-full border border-white/[0.08] grid-pattern opacity-40 animate-[spin_120s_linear_infinite]" />
      <div className="absolute inset-14 sm:inset-16 rounded-full border border-brand-violet/20 border-dashed" />

      {/* Central Brand Badge Hub */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-20 flex flex-col items-center"
      >
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-electric shadow-glow-md">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#080914] p-1.5 flex items-center justify-center">
            <img
              src="/adgenx-logo.png"
              alt="ADGEN-X Emblem"
              className="w-full h-full object-cover rounded-full"
              width={112}
              height={112}
            />
          </div>

          {/* Orbiting Live Status Dot */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-electric opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-electric border-2 border-brand-bg"></span>
          </span>
        </div>

        <div className="mt-3 px-3 py-1 rounded-full bg-brand-surface/90 border border-white/10 backdrop-blur-md text-[11px] font-heading font-semibold text-white tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3 h-3 text-brand-lavender" />
          <span>ADGEN - X</span>
        </div>
      </motion.div>

      {/* Floating Card 1: Code & App Preview (Top-Left) */}
      <motion.div
        animate={{ y: [-4, 6, -4], x: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="absolute top-2 left-0 sm:top-6 sm:-left-4 z-30 glass-card rounded-2xl p-3.5 border border-white/[0.12] shadow-xl max-w-[210px]"
      >
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/[0.06]">
          <div className="p-1.5 rounded-lg bg-brand-blue/20 text-brand-electric">
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-heading font-semibold text-white">Full-Stack App</div>
            <div className="text-[10px] text-brand-muted">React • Flutter • Node</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-brand-muted">
          <span className="flex items-center gap-1 text-emerald-400">
            <Zap className="w-2.5 h-2.5" /> 99.9% Speed
          </span>
          <span className="text-white/60">Ready</span>
        </div>
      </motion.div>

      {/* Floating Card 2: Brand Identity (Top-Right) */}
      <motion.div
        animate={{ y: [6, -5, 6], x: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-8 -right-2 sm:top-10 sm:-right-4 z-30 glass-card rounded-2xl p-3.5 border border-white/[0.12] shadow-xl max-w-[195px]"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-brand-violet/20 text-brand-lavender">
            <Palette className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-heading font-semibold text-white">Brand System</div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-[#4263FF]" title="#4263FF" />
          <span className="w-4 h-4 rounded-full bg-[#8B5CF6]" title="#8B5CF6" />
          <span className="w-4 h-4 rounded-full bg-[#38BDF8]" title="#38BDF8" />
          <span className="w-4 h-4 rounded-full bg-[#B7A0FF]" title="#B7A0FF" />
          <span className="text-[10px] text-brand-lavender ml-1 font-mono">Vectors</span>
        </div>
      </motion.div>

      {/* Floating Card 3: Growth & Analytics (Bottom-Center/Right) */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute -bottom-2 right-4 sm:bottom-4 sm:right-2 z-30 glass-card rounded-2xl p-3.5 border border-white/[0.12] shadow-xl max-w-[215px]"
      >
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-heading font-semibold text-white">Growth Impact</div>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 font-mono">+340%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-brand-blue to-brand-electric h-full w-[85%] rounded-full" />
        </div>
      </motion.div>

      {/* Floating Card 4: Terminal Snippet (Bottom-Left) */}
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-2 -left-2 sm:bottom-6 sm:left-0 z-30 glass-card rounded-2xl p-3 border border-white/[0.12] shadow-xl max-w-[190px] font-mono text-[10px]"
      >
        <div className="flex items-center gap-1.5 text-brand-lavender mb-1">
          <Terminal className="w-3 h-3 text-brand-electric" />
          <span className="text-white/80">letsgo-engine</span>
        </div>
        <div className="text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-2.5 h-2.5" /> build: complete
        </div>
      </motion.div>
    </div>
  );
};
