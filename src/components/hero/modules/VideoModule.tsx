import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Video, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VideoModuleProps {
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
  isDimmed: boolean;
}

export const VideoModule: React.FC<VideoModuleProps> = ({ onHover, isHovered, isDimmed }) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      data-cursor="card"
      data-cursor-label="VIDEO"
      onClick={() => navigate('/services/video-editing')}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      animate={
        !prefersReducedMotion
          ? {
              y: [0, -6, 0],
            }
          : {}
      }
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute bottom-[3%] left-[1.5%] sm:left-[2.5%] z-20 cursor-pointer group select-none transition-all duration-300 ${
        isHovered
          ? 'scale-105 -translate-y-1 z-40'
          : isDimmed
          ? 'opacity-40 scale-98 hover:opacity-100'
          : 'hover:scale-102'
      }`}
    >
      {/* Video Sequencer & Moving Timeline Card */}
      <div
        className={`w-48 sm:w-56 rounded-xl p-3 border backdrop-blur-xl transition-all duration-300 shadow-xl overflow-hidden ${
          isHovered
            ? 'bg-[#210e1c]/98 border-pink-400 shadow-[0_0_35px_rgba(244,114,182,0.5)]'
            : 'bg-[#140712]/90 border-white/[0.12] hover:border-pink-400/60'
        }`}
      >
        {/* Mini Preview Viewport & Timecode */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-pink-500/25 text-pink-400 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 fill-pink-400" />
            </div>
            <span className="text-[8.5px] font-mono text-white/60">00:04:18:24</span>
          </div>
          <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-pink-500/15 border border-pink-500/25 text-pink-300">
            4K 60FPS
          </span>
        </div>

        {/* Multi-Track Sequencer Timeline with Moving Scrubber */}
        <div className="h-11 w-full rounded-lg bg-black/60 border border-white/[0.06] relative p-1.5 space-y-1 overflow-hidden mb-2">
          {/* Track 1: Video A-Roll */}
          <div className="h-2 w-full flex gap-1">
            <div className="w-14 h-full rounded-sm bg-gradient-to-r from-violet-500 to-indigo-500" />
            <div className="w-18 h-full rounded-sm bg-gradient-to-r from-pink-500 to-rose-500" />
            <div className="w-10 h-full rounded-sm bg-gradient-to-r from-cyan-500 to-blue-500" />
          </div>

          {/* Track 2: B-Roll & Transitions */}
          <div className="h-2 w-full flex gap-1 pl-4">
            <div className="w-22 h-full rounded-sm bg-gradient-to-r from-sky-500 to-teal-500" />
            <div className="w-12 h-full rounded-sm bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>

          {/* Track 3: Audio Waveform with Undulating Motion */}
          <div className="h-2 w-full flex items-center gap-0.5 opacity-70">
            {[4, 9, 14, 7, 12, 16, 9, 6, 13, 17, 8, 10, 15, 7, 11, 9, 13, 16, 8, 12].map((h, i) => (
              <motion.span
                key={i}
                animate={
                  !prefersReducedMotion
                    ? {
                        height: [`${h * 0.4}px`, `${h * 0.6}px`, `${h * 0.4}px`],
                      }
                    : {}
                }
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.05 }}
                className="w-1 bg-pink-400 rounded-full"
              />
            ))}
          </div>

          {/* Animated Scrubber Playhead Line */}
          <motion.div
            animate={
              !prefersReducedMotion
                ? {
                    left: ['5%', '92%', '5%'],
                  }
                : {}
            }
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 bottom-0 w-[1.5px] bg-rose-400 shadow-[0_0_8px_#fb7185] pointer-events-none"
          >
            <div className="w-2.5 h-2.5 -ml-[4px] bg-rose-400 rotate-45 rounded-[1px]" />
          </motion.div>
        </div>

        {/* Module Label Strip */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-md bg-pink-500/20 text-pink-400">
              <Video className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10.5px] font-heading font-bold text-white group-hover:text-pink-300 transition-colors block leading-tight">
                Video & Motion
              </span>
              <span className="text-[8px] font-mono text-pink-400/80 leading-none">
                High-Retention Editing
              </span>
            </div>
          </div>
          <ArrowRight className="w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};
