import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe, Smartphone, TrendingUp, Palette, Film, Camera, ArrowRight, Sparkles } from 'lucide-react';

import { CentralCore } from './CentralCore';
import { OrbitalRings } from './OrbitalRings';
import { BrowserModule } from './modules/BrowserModule';
import { PhoneModule } from './modules/PhoneModule';
import { MarketingModule } from './modules/MarketingModule';
import { DesignModule } from './modules/DesignModule';
import { VideoModule } from './modules/VideoModule';
import { CameraModule } from './modules/CameraModule';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || prefersReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
    setActiveModule(null);
  };

  const tiltStyle =
    !isMobile && !prefersReducedMotion
      ? {
        transform: `perspective(1200px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`,
        transition: isHovered
          ? 'transform 0.15s ease-out'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }
      : {};

  const isDimmed = (id: string) => {
    return activeModule !== null && activeModule !== id;
  };

  const mobileServices = [
    {
      title: 'Website Development',
      desc: 'Next.js, React & Modern Web',
      path: '/services/website-development',
      icon: <Globe className="w-4 h-4 text-sky-400" />,
      border: 'border-sky-500/30',
      bg: 'bg-sky-500/10',
    },
    {
      title: 'Mobile Apps',
      desc: 'iOS, Android & Cross-Platform',
      path: '/services/software-development',
      icon: <Smartphone className="w-4 h-4 text-violet-400" />,
      border: 'border-violet-500/30',
      bg: 'bg-violet-500/10',
    },
    {
      title: 'Digital Marketing',
      desc: 'SEO, Ads & Data-Driven Growth',
      path: '/services/digital-marketing',
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Branding & Design',
      desc: 'Visual Identity & Creative Systems',
      path: '/services/graphic-design',
      icon: <Palette className="w-4 h-4 text-purple-400" />,
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Video & Motion',
      desc: 'High-Retention Video Editing',
      path: '/services/video-editing',
      icon: <Film className="w-4 h-4 text-pink-400" />,
      border: 'border-pink-500/30',
      bg: 'bg-pink-500/10',
    },
    {
      title: 'Photography',
      desc: 'Product & Commercial Shoots',
      path: '/services/photography',
      icon: <Camera className="w-4 h-4 text-amber-400" />,
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* DESKTOP & TABLET: UNIFIED 6-CARD ORBITAL COMPOSITION (md+)     */}
      {/* ============================================================== */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="hidden md:block relative w-full max-w-[680px] lg:max-w-[740px] h-[560px] sm:h-[580px] mx-auto select-none preserve-3d"
        style={tiltStyle}
        aria-label="ADGEN-X Interactive Digital Universe"
      >
        {/* Faint Technical Matrix Grid */}
        <div className="absolute inset-4 rounded-3xl bg-[linear-gradient(to_right,#0e1630_1px,transparent_1px),linear-gradient(to_bottom,#0e1630_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-25 pointer-events-none" />

        {/* Volumetric Radial Aura Fields (Restrained to boundary) */}
        <div className="absolute w-[400px] h-[400px] bg-brand-blue/20 rounded-full blur-[110px] pointer-events-none top-0 left-0" />
        <div className="absolute w-[400px] h-[400px] bg-brand-violet/25 rounded-full blur-[110px] pointer-events-none bottom-0 right-0" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Floating Geometric Particle Accents within boundaries */}
        <div className="absolute top-12 left-1/4 text-cyan-400/30 text-[10px] font-mono pointer-events-none animate-pulse select-none">
          +
        </div>
        <div className="absolute bottom-20 left-16 text-violet-400/30 text-[10px] font-mono pointer-events-none animate-pulse select-none">
          ◇
        </div>
        <div className="absolute top-24 right-1/4 text-cyan-400/30 text-[10px] font-mono pointer-events-none animate-pulse select-none">
          +
        </div>
        <div className="absolute bottom-20 right-20 text-indigo-400/30 text-[10px] font-mono pointer-events-none animate-pulse select-none">
          ◇
        </div>

        {/* 1. Dynamic Rotating Orbital Rings (Centered at 370, 290) */}
        <OrbitalRings activeModule={activeModule} />

        {/* 2. Central ADGEN-X Brand Core (Exact 50% / 50% Visual Center) */}
        <CentralCore
          isHovered={activeModule === 'core'}
          onHover={(hovered) => setActiveModule(hovered ? 'core' : null)}
        />

        {/* 3. Six Symmetrical Service Modules in 3 Balanced Bands */}
        {/* Upper Band: Website Development (Left) & Mobile Apps (Right) */}
        <BrowserModule
          isHovered={activeModule === 'website'}
          isDimmed={isDimmed('website')}
          onHover={(hovered) => setActiveModule(hovered ? 'website' : null)}
        />
        <PhoneModule
          isHovered={activeModule === 'mobile'}
          isDimmed={isDimmed('mobile')}
          onHover={(hovered) => setActiveModule(hovered ? 'mobile' : null)}
        />

        {/* Middle Band: Digital Marketing (Left) & Branding & Design (Right) */}
        <MarketingModule
          isHovered={activeModule === 'marketing'}
          isDimmed={isDimmed('marketing')}
          onHover={(hovered) => setActiveModule(hovered ? 'marketing' : null)}
        />
        <DesignModule
          isHovered={activeModule === 'design'}
          isDimmed={isDimmed('design')}
          onHover={(hovered) => setActiveModule(hovered ? 'design' : null)}
        />

        {/* Lower Band: Video & Motion (Left) & Photography (Right) */}
        <VideoModule
          isHovered={activeModule === 'video'}
          isDimmed={isDimmed('video')}
          onHover={(hovered) => setActiveModule(hovered ? 'video' : null)}
        />
        <CameraModule
          isHovered={activeModule === 'photography'}
          isDimmed={isDimmed('photography')}
          onHover={(hovered) => setActiveModule(hovered ? 'photography' : null)}
        />
      </div>

      {/* ============================================================== */}
      {/* MOBILE BREAKPOINT: COMPACT CORE VISUAL + RESPONSIVE GRID (< md) */}
      {/* ============================================================== */}
      <div className="block md:hidden w-full max-w-md mx-auto pt-4">
        {/* Compact Centered Core Visual */}
        <div className="relative h-60 w-full flex items-center justify-center select-none overflow-hidden rounded-2xl bg-brand-surface/40 border border-white/[0.08] shadow-2xl mb-6">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e1630_1px,transparent_1px),linear-gradient(to_bottom,#0e1630_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
          <div className="absolute w-44 h-44 bg-brand-blue/30 rounded-full blur-[60px]" />
          <div className="absolute w-44 h-44 bg-brand-violet/30 rounded-full blur-[60px]" />

          {/* Concentric Orbital Rings */}
          <div className="absolute w-48 h-48 rounded-full border border-cyan-400/30 border-dashed animate-[spin_25s_linear_infinite]" />
          <div className="absolute w-36 h-36 rounded-full border border-violet-400/40 animate-[spin_18s_linear_infinite_reverse]" />

          {/* Centered Brand Core */}
          <div
            onClick={() => navigate('/about')}
            className="relative cursor-pointer flex flex-col items-center justify-center group"
          >
            <div className="p-2 rounded-full bg-gradient-to-b from-[#1c244e] via-[#0b0f2a] to-[#050612] border-2 border-brand-electric shadow-[0_0_30px_rgba(56,189,248,0.6)]">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center p-1 bg-black/60">
                <img
                  src="/adgenx-logo.png"
                  alt="ADGEN-X Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                />
              </div>
            </div>
            <div className="mt-2.5 px-3 py-0.5 rounded-full bg-brand-surface/90 border border-brand-electric/40 text-[10px] font-heading font-bold text-white flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>ADGEN-X CORE</span>
            </div>
          </div>
        </div>

        {/* Responsive 2-Column Mobile Services Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {mobileServices.map((service, index) => (
            <div
              key={index}
              onClick={() => navigate(service.path)}
              className={`p-3 rounded-xl border ${service.border} ${service.bg} backdrop-blur-md cursor-pointer active:scale-95 transition-transform flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-black/40 border border-white/10">
                  {service.icon}
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white/40" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-white line-clamp-1">
                  {service.title}
                </div>
                <div className="text-[10px] text-brand-muted line-clamp-1 mt-0.5 font-body">
                  {service.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
