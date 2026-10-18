import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Compass, 
  CheckCircle2 
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { getWhatsAppUrl } from '../config/contact';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_METADATA } from '../config/seo';

/**
 * Animated Abstract Visual Component
 * Creates an attractive visual centerpiece using glowing gradient orbs,
 * dynamic orbital rings, floating glass HUD pills, and smooth particle motion.
 */
const ComingSoonVisual: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Subtle floating particles configuration
  const particles = [
    { top: '15%', left: '18%', size: 4, delay: 0 },
    { top: '22%', right: '20%', size: 6, delay: 1.2 },
    { bottom: '25%', left: '22%', size: 5, delay: 0.8 },
    { bottom: '18%', right: '24%', size: 4, delay: 2.1 },
    { top: '50%', left: '8%', size: 3, delay: 1.6 },
    { top: '45%', right: '10%', size: 5, delay: 2.7 },
  ];

  return (
    <div 
      className="relative w-full max-w-3xl mx-auto h-[400px] sm:h-[480px] flex items-center justify-center my-6 sm:my-10 select-none overflow-visible"
      aria-hidden="true"
    >
      {/* 1. Multi-Stage Ambient Radial Glowing Orbs */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                scale: [1, 1.15, 0.95, 1],
                opacity: [0.35, 0.55, 0.35],
              }
            : {}
        }
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-brand-blue/25 blur-[90px] pointer-events-none"
      />
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                scale: [1.1, 0.9, 1.15, 1.1],
                opacity: [0.3, 0.5, 0.3],
              }
            : {}
        }
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-brand-violet/30 blur-[80px] pointer-events-none"
      />
      <div className="absolute w-44 h-44 rounded-full bg-brand-electric/20 blur-[50px] pointer-events-none" />

      {/* 2. Concentric Orbital Rings */}
      {/* Outer Dashed Orbit */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? { rotate: 360 }
            : {}
        }
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-white/10 pointer-events-none flex items-center justify-center"
      >
        {/* Accent satellite nodes on outer ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-electric shadow-[0_0_12px_#38BDF8]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-brand-violet shadow-[0_0_10px_#8B5CF6]" />
      </motion.div>

      {/* Middle Glowing Orbit */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? { rotate: -360 }
            : {}
        }
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute w-64 h-64 sm:w-[320px] sm:h-[320px] rounded-full border border-brand-violet/25 pointer-events-none flex items-center justify-center"
      >
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_10px_#4263FF]" />
      </motion.div>

      {/* Inner Pulsing Pulsewave */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                scale: [0.96, 1.04, 0.96],
                opacity: [0.4, 0.8, 0.4],
              }
            : {}
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-brand-electric/30 pointer-events-none"
      />

      {/* 3. Subtle Floating Dust Particles */}
      {!prefersReducedMotion &&
        particles.map((p, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [-6, 6, -6],
              opacity: [0.25, 0.8, 0.25],
            }}
            transition={{
              duration: 3.5 + idx * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
            }}
            className="absolute rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.6)] pointer-events-none"
          />
        ))}

      {/* 4. Central Glass Nexus (Focal Core) */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                y: [-5, 5, -5],
              }
            : {}
        }
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-48 sm:w-56 p-6 rounded-3xl glass-card border border-white/20 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center text-center group"
      >
        {/* Core Glow Highlight */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.08] via-transparent to-brand-blue/[0.08] pointer-events-none" />

        {/* Central Dynamic Icon Pod */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-brand-blue/30 via-brand-violet/30 to-brand-electric/20 border border-white/20 flex items-center justify-center shadow-glow-md mb-4">
          <div className="relative">
            <Layers className="w-8 h-8 sm:w-9 sm:h-9 text-brand-electric" />
            <Sparkles className="w-4 h-4 text-brand-lavender absolute -top-1.5 -right-1.5 animate-pulse" />
          </div>
        </div>

        {/* Studio Badge */}
        <div className="space-y-1">
          <div className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-brand-lavender">
            STUDIO WORKSHOP
          </div>
          <div className="text-xs sm:text-sm font-heading font-semibold text-white">
            Curating Next Release
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-brand-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-electric animate-ping" />
          <span>IN DEVELOPMENT</span>
        </div>
      </motion.div>

      {/* 5. Floating Glass HUD Orbit Badges */}
      {/* Top Right Floating Pill */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                y: [4, -4, 4],
                x: [-2, 2, -2],
              }
            : {}
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="hidden md:flex absolute top-12 right-6 lg:right-12 z-20 items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card/80 border border-white/10 shadow-lg backdrop-blur-md text-xs font-heading font-medium text-brand-lavender"
      >
        <Code2 className="w-3.5 h-3.5 text-brand-electric" />
        <span>Modern Web Architecture</span>
      </motion.div>

      {/* Bottom Left Floating Pill */}
      <motion.div
        animate={
          !prefersReducedMotion
            ? {
                y: [-4, 4, -4],
                x: [2, -2, 2],
              }
            : {}
        }
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden md:flex absolute bottom-12 left-6 lg:left-12 z-20 items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card/80 border border-white/10 shadow-lg backdrop-blur-md text-xs font-heading font-medium text-brand-lavender"
      >
        <Compass className="w-3.5 h-3.5 text-brand-violet" />
        <span>Experience-Driven Design</span>
      </motion.div>
    </div>
  );
};

export const Portfolio: React.FC = () => {
  return (
    <div className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Route-Aware Technical SEO */}
      <SEOHead
        metadata={PAGE_METADATA.work}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/work' },
        ]}
      />

      {/* Subtle Ambient Background Gradients */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] sm:w-[900px] h-[500px] bg-brand-blue/10 blur-[130px] rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-brand-violet/10 blur-[120px] rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />

      {/* Main Pre-Launch Hero */}
      <header className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Small Badge */}
        <div className="flex justify-center">
          <Badge 
            variant="purple" 
            icon={<Sparkles className="w-3.5 h-3.5 text-brand-lavender" />}
            className="tracking-wider text-[11px] sm:text-xs"
          >
            A NEW CHAPTER IS COMING
          </Badge>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.12]">
          Something Amazing Is <br className="hidden sm:inline" />
          <span className="text-gradient">Taking Shape.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed font-body">
          We’re crafting our next collection of digital experiences. Our work will be revealed here soon.
        </p>

        {/* Call to Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            to="/contact"
            variant="primary"
            size="lg"
            iconRight={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-glow-sm hover:shadow-glow-md"
          >
            Start a Project
          </Button>

          <Button
            href={getWhatsAppUrl('general')}
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
            className="w-full sm:w-auto"
          >
            Connect on WhatsApp
          </Button>
        </div>

        {/* Minimal "Stay tuned" indicator */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-brand-lavender/90 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-electric opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-electric"></span>
            </span>
            <span>Stay tuned for what’s next</span>
          </div>
        </div>
      </header>

      {/* Animated Abstract Centerpiece Visual */}
      <section aria-label="Creative Visual Animation">
        <ComingSoonVisual />
      </section>

      {/* Studio Craft & Engineering Pillars (Intentional Studio Values) */}
      <section 
        className="mt-12 sm:mt-16 pt-10 border-t border-white/[0.06]"
        aria-label="Studio Capabilities and Standards"
      >
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-medium tracking-widest uppercase text-brand-electric">
            WHAT WE ARE BUILDING
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Engineering Tomorrow’s Digital Standards
          </h2>
          <p className="text-sm text-brand-muted font-body">
            Our upcoming releases showcase our core principles across modern web development, architecture, and brand design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1 */}
          <div className="p-7 sm:p-8 rounded-3xl glass-card glass-card-hover border border-white/[0.08] space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-colors pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 border border-brand-blue/30 text-brand-electric flex items-center justify-center shadow-glow-sm">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
              Precision Architecture
            </h3>
            <p className="text-sm text-brand-muted font-body leading-relaxed">
              Fast, resilient web applications and platforms engineered with modern stacks, scalable APIs, and performance-first best practices.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-brand-lavender">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric" />
              <span>Full-Stack Engineering</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-7 sm:p-8 rounded-3xl glass-card glass-card-hover border border-white/[0.08] space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 rounded-full blur-2xl group-hover:bg-brand-violet/20 transition-colors pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-brand-violet/15 border border-brand-violet/30 text-brand-lavender flex items-center justify-center shadow-glow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
              Visual Distinction
            </h3>
            <p className="text-sm text-brand-muted font-body leading-relaxed">
              Bespoke visual identity and UI design that avoids templates. We create memorable digital experiences that set brands apart.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-brand-lavender">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet" />
              <span>Tailored Design Systems</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-7 sm:p-8 rounded-3xl glass-card glass-card-hover border border-white/[0.08] space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-electric/10 rounded-full blur-2xl group-hover:bg-brand-electric/20 transition-colors pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-brand-electric/15 border border-brand-electric/30 text-brand-electric flex items-center justify-center shadow-glow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
              Strategic Conversion
            </h3>
            <p className="text-sm text-brand-muted font-body leading-relaxed">
              Every detail is engineered with user clarity and business outcomes in mind—turning digital traffic into tangible trust and momentum.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-brand-lavender">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric" />
              <span>Impact-Driven UX</span>
            </div>
          </div>
        </div>
      </section>

      {/* Deliberate Pre-Launch Consultation Banner */}
      <section 
        className="mt-16 sm:mt-24 p-8 sm:p-14 rounded-3xl glass-card border border-white/[0.1] text-center space-y-6 relative overflow-hidden shadow-2xl"
        aria-label="Start a Project Consultation"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-blue/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
            EARLY ENGAGEMENTS OPEN
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Have a Project in Mind Before the Reveal?
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-body leading-relaxed">
            Our studio is actively collaborating with founders, businesses, and creators. Connect with our engineering and design team to discuss your goals today.
          </p>
        </div>

        <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            to="/contact" 
            variant="primary" 
            size="lg" 
            iconRight={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-glow-sm"
          >
            Start a Project
          </Button>

          <Button
            href={getWhatsAppUrl('general')}
            variant="whatsapp"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Chat Directly on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};
