import React from 'react';
import { ABOUT_DATA } from '../data/about';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, Compass, Eye } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <Badge variant="purple" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Our Identity & Purpose
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
          Where Technology <br />
          <span className="text-gradient">Meets Creativity.</span>
        </h1>
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
          {ABOUT_DATA.subtitle}
        </p>
      </div>

      {/* Brand Story / Narrative */}
      <div className="p-8 sm:p-14 rounded-3xl glass-card border border-white/[0.08] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender">
            Who We Are
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            An Ambitious Digital Growth & Creative Technology Company
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-brand-muted leading-relaxed font-body">
            {ABOUT_DATA.story.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 text-brand-electric border border-brand-blue/30 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <div className="text-xs uppercase font-heading font-semibold text-brand-lavender tracking-wider mb-2">
              Our Mission
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Building With Clear Purpose
            </h3>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-body">
              {ABOUT_DATA.mission}
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-violet/20 text-brand-lavender border border-brand-violet/30 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <div className="text-xs uppercase font-heading font-semibold text-brand-lavender tracking-wider mb-2">
              Our Vision
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Your Long-Term Digital Partner
            </h3>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-body">
              {ABOUT_DATA.vision}
            </p>
          </div>
        </div>
      </div>

      {/* Principles: What We Do, Why We Exist, Approach */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="cyan">Our Foundation</Badge>
          <h2 className="text-3xl font-heading font-bold text-white mt-3">
            How We Operate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ABOUT_DATA.principles.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-card border border-white/[0.06] hover:border-brand-violet/30 transition-all"
            >
              <h3 className="text-lg font-heading font-bold text-white mb-3">
                {p.title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed font-body">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="primary">The Guiding Principles</Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mt-3">
            Core Values That Drive Every Delivery
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_DATA.values.map((v) => (
            <div
              key={v.number}
              className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-brand-blue/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-heading font-black text-gradient mb-3">
                  {v.number}
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-body">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#121738] to-[#1a1138] border border-white/[0.08] text-center space-y-5">
        <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white">
          Let’s Build the Next Chapter of Your Business.
        </h2>
        <p className="text-sm sm:text-base text-brand-muted max-w-lg mx-auto font-body">
          We are ready to listen, advise, design, and engineer. Connect with our founders and core technical team today.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
            Start a Conversation
          </Button>
        </div>
      </div>
    </div>
  );
};
