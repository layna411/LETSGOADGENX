import React from 'react';
import { PROCESS_STEPS } from '../data/process';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CheckCircle2, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/contact';

export const Process: React.FC = () => {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Predictable Delivery
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
          From First Idea to <br />
          <span className="text-gradient">Final Launch.</span>
        </h1>
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
          We eliminate guesswork with a five-phase collaborative lifecycle engineered for transparency, technical quality, and timely shipping.
        </p>
      </div>

      {/* Deep-Dive Process Cards */}
      <div className="space-y-12">
        {PROCESS_STEPS.map((step, idx) => (
          <div
            key={step.step}
            className="p-8 sm:p-12 rounded-3xl glass-card border border-white/[0.08] relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Step indicator */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-5xl sm:text-6xl font-heading font-black text-gradient block">
                  {step.step}
                </span>
                <span className="text-xs uppercase font-mono tracking-widest text-brand-lavender font-semibold block">
                  Stage 0{idx + 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  {step.title}
                </h2>
                <div className="text-sm font-medium text-brand-electric">
                  {step.subtitle}
                </div>
              </div>

              {/* Step description and deliverables checklist */}
              <div className="lg:col-span-8 space-y-6">
                <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
                  {step.description}
                </p>

                <div className="p-6 rounded-2xl bg-brand-surface/70 border border-white/[0.05]">
                  <h3 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3">
                    What Happens in This Phase
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text">
                        <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Action */}
      <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-brand-card via-brand-surface to-brand-card border border-white/[0.08] text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white">
          Ready to Begin Stage 01?
        </h2>
        <p className="text-sm sm:text-base text-brand-muted max-w-lg mx-auto font-body">
          The first step is a low-friction discovery conversation. Tell us about your goals and let’s structure a roadmap together.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
            Start Discovery Session
          </Button>
          <Button
            href={getWhatsAppUrl('general')}
            variant="whatsapp"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle className="w-4 h-4" />}
          >
            Chat with Founders
          </Button>
        </div>
      </div>
    </div>
  );
};
