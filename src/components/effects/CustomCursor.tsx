import React, { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'link' | 'button' | 'card' | 'core' | 'hidden';

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [cardLabel, setCardLabel] = useState<string>('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mutable refs for high-performance 60fps tracking without React re-renders
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const primaryCursorRef = useRef<HTMLDivElement>(null);
  const followerCursorRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer and if no reduced motion preferred
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check element under cursor to determine state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If user is over text inputs, textareas, or selects, hide custom cursor to keep native caret
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        setMode('hidden');
        return;
      }

      // Central core detection
      if (target.closest('[data-cursor="core"]') || target.closest('.group\\/core')) {
        setMode('core');
        return;
      }

      // Service card detection
      const cardEl = target.closest('[data-cursor="card"]') as HTMLElement | null;
      if (cardEl) {
        setMode('card');
        const customLabel = cardEl.getAttribute('data-cursor-label');
        setCardLabel(customLabel || 'EXPLORE');
        return;
      }

      // Button detection
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.btn-primary') ||
        target.closest('.btn-secondary')
      ) {
        setMode('button');
        return;
      }

      // Link detection
      if (target.tagName === 'A' || target.closest('a')) {
        setMode('link');
        return;
      }

      setMode('default');
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance RAF loop
    const renderLoop = () => {
      // Lerp follower smoothly towards mousePos (0.16 smoothing factor)
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.16;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.16;

      if (primaryCursorRef.current) {
        primaryCursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (followerCursorRef.current) {
        followerCursorRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  const isHidden = !isVisible || mode === 'hidden';

  return (
    <>
      {/* 1. Primary Precise Cursor Dot */}
      <div
        ref={primaryCursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-200 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            mode === 'button'
              ? 'w-2 h-2 bg-brand-electric shadow-[0_0_10px_#38bdf8]'
              : mode === 'card'
              ? 'w-1.5 h-1.5 bg-brand-lavender shadow-[0_0_8px_#b7a0ff]'
              : mode === 'core'
              ? 'w-3 h-3 bg-cyan-300 shadow-[0_0_15px_#67e8f9]'
              : isClicking
              ? 'w-1.5 h-1.5 bg-white scale-75'
              : 'w-2 h-2 bg-brand-electric shadow-[0_0_8px_rgba(56,189,248,0.8)]'
          }`}
        />
      </div>

      {/* 2. Secondary Fluid Follower Ring */}
      <div
        ref={followerCursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
            mode === 'button'
              ? 'w-11 h-11 border-2 border-brand-electric/80 bg-brand-blue/15 scale-110 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
              : mode === 'link'
              ? 'w-9 h-9 border border-brand-lavender/90 bg-brand-violet/10 scale-105 shadow-[0_0_14px_rgba(183,160,255,0.35)]'
              : mode === 'card'
              ? 'w-14 h-14 border border-brand-electric/70 bg-brand-surface/70 backdrop-blur-sm shadow-[0_0_24px_rgba(56,189,248,0.35)]'
              : mode === 'core'
              ? 'w-16 h-16 border-2 border-cyan-400 bg-cyan-950/30 scale-125 shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-pulse'
              : isClicking
              ? 'w-7 h-7 border border-brand-electric/90 scale-90 bg-brand-blue/20'
              : 'w-8 h-8 border border-white/30 bg-transparent'
          }`}
        >
          {/* Card Hover Action Label */}
          {mode === 'card' && (
            <span className="text-[8px] font-mono font-bold tracking-widest text-brand-electric uppercase animate-in fade-in duration-200">
              {cardLabel}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
