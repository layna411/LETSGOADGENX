import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroBackground } from './HeroBackground';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(true);

  // Detect precise desktop pointer (disable mouse parallax on touch-only devices)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(pointer: fine)');
      setIsPointerFine(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsPointerFine(e.matches);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isPointerFine) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Parallax calculations:
  // - Main illustration moves max 4–6px in pointer direction
  // - Background layer moves max 8–12px in opposite direction
  const illusParallaxX = isPointerFine && !prefersReducedMotion ? mousePos.x * 10 : 0;
  const illusParallaxY = isPointerFine && !prefersReducedMotion ? mousePos.y * 10 : 0;

  const bgParallaxX = isPointerFine && !prefersReducedMotion ? mousePos.x * -20 : 0;
  const bgParallaxY = isPointerFine && !prefersReducedMotion ? mousePos.y * -20 : 0;

  const smoothTransition = isHovered
    ? 'transform 0.18s ease-out'
    : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[480px] xl:max-w-[560px] 2xl:max-w-[640px] mx-auto select-none flex items-center justify-center py-1 sm:py-2"
      aria-label="LetsGoAdGenX Creative & Engineering Team"
    >
      {/* ============================================================== */}
      {/* 1. BACKGROUND PARALLAX LAYER (Behind image, z-0)              */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate3d(${bgParallaxX}px, ${bgParallaxY}px, 0)`,
          transition: smoothTransition,
        }}
      >
        <HeroBackground isHovered={isHovered} />
      </div>

      {/* ============================================================== */}
      {/* 2. MAIN 3D ILLUSTRATION WRAPPER (z-10, Razor Sharp)            */}
      {/* ============================================================== */}
      <div
        className="relative z-10 w-full flex flex-col items-center justify-center"
        style={{
          transform: `translate3d(${illusParallaxX}px, ${illusParallaxY}px, 0)`,
          transition: smoothTransition,
        }}
      >
        {/* Continuous Floating & Slight Scale Animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: prefersReducedMotion
              ? 0
              : isHovered
              ? [-3, -11, -3]
              : [0, -8, 0],
            scale: prefersReducedMotion
              ? 1
              : isHovered
              ? 1.015
              : [1, 1.012, 1],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 6.2,
              ease: 'easeInOut',
            },
            scale: {
              repeat: Infinity,
              duration: 6.2,
              ease: 'easeInOut',
            },
            opacity: { duration: 0.7 },
          }}
          className="relative w-full flex flex-col items-center justify-center overflow-visible"
        >
          {/* Crystal-Clear 3D Team Image with Zero Blurring */}
          <img
            src="/hero-team-3d.png"
            alt="LetsGoAdGenX 3D Creative Engineering & Marketing Team"
            width={1019}
            height={823}
            className="w-full h-auto max-h-[290px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[430px] xl:max-h-[490px] 2xl:max-h-[550px] object-contain transform-gpu select-none"
            style={{
              imageRendering: 'auto',
            }}
            loading="eager"
            decoding="async"
          />

          {/* ========================================================== */}
          {/* 3. CINEMATIC LIGHT SWEEP (Soft specular sheen overlay)     */}
          {/* ========================================================== */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <motion.div
                animate={{
                  x: ['-140%', '220%'],
                  opacity: [0, 0, 0.22, 0.22, 0, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 8.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute inset-y-0 w-3/4 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 20%, rgba(56, 189, 248, 0.12) 42%, rgba(192, 132, 252, 0.22) 50%, rgba(0, 229, 255, 0.14) 58%, transparent 80%)',
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          )}

          {/* ========================================================== */}
          {/* 4. SOFT PHYSICAL FLOOR SHADOW (In sync with levitation)   */}
          {/* ========================================================== */}
          <motion.div
            animate={{
              scale: prefersReducedMotion
                ? 1
                : isHovered
                ? [0.96, 0.90, 0.96]
                : [1, 0.94, 1],
              opacity: prefersReducedMotion
                ? 0.7
                : isHovered
                ? [0.70, 0.55, 0.70]
                : [0.75, 0.60, 0.75],
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 6.2,
                ease: 'easeInOut',
              },
              opacity: {
                repeat: Infinity,
                duration: 6.2,
                ease: 'easeInOut',
              },
            }}
            className="w-[85%] max-w-[420px] h-4 sm:h-5 -mt-1 sm:-mt-2 bg-black/85 blur-lg rounded-[100%] pointer-events-none"
          />
        </motion.div>
      </div>
    </div>
  );
};
