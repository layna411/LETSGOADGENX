import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, Layers, Sparkles } from 'lucide-react';
import { SERVICES, ALL_COMPANY_SERVICES, type ServiceItem } from '../data/services';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DynamicIcon } from '../components/ui/DynamicIcon';
import { ServiceModal } from '../components/services/ServiceModal';
import { getWhatsAppUrl } from '../config/contact';

export const Services: React.FC = () => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Services Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="primary">Full-Stack Digital Solutions</Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
          Everything Your Business Needs to <br />
          <span className="text-gradient">Thrive Digitally.</span>
        </h1>
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
          We combine software engineering, brand design, and data-driven marketing into unified digital solutions built for startups, businesses, and creators.
        </p>
      </div>

      {/* Services Editorial Stream */}
      <div className="space-y-16">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            id={service.slug}
            className="p-8 sm:p-12 rounded-3xl glass-card border border-white/[0.08] relative overflow-hidden transition-all duration-300 hover:border-brand-violet/30"
          >
            {/* Ambient accent per card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left Column: Title, Description, and Badges */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 text-brand-electric border border-brand-blue/30 flex items-center justify-center">
                    <DynamicIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  <Badge variant="purple">{service.badge}</Badge>
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  {service.title}
                </h2>

                <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-body">
                  {service.fullDesc}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue/20 hover:bg-brand-blue/30 text-brand-electric text-xs font-heading font-semibold border border-brand-blue/30 transition-all"
                  >
                    <span>Dedicated Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setActiveModalService(service)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-heading font-semibold border border-white/10 transition-all cursor-pointer"
                  >
                    <span>Quick Modal View</span>
                  </button>

                  <a
                    href={getWhatsAppUrl(service.inquiryType)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-heading font-semibold border border-[#25D366]/30 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Key Offerings & Deliverables */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-brand-surface/60 p-6 sm:p-8 rounded-2xl border border-white/[0.05]">
                {/* Offerings */}
                <div>
                  <h3 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> What’s Included
                  </h3>
                  <ul className="space-y-2 text-xs text-brand-text">
                    {service.offerings.map((off, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-electric shrink-0 mt-0.5" />
                        <span>{off}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3">
                    Typical Deliverables
                  </h3>
                  <ul className="space-y-2 text-xs text-brand-muted">
                    {service.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shrink-0 mt-1.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 15 SPECIALIZED SERVICES INDEX */}
      <div className="mt-20 p-8 sm:p-12 rounded-3xl glass-card border border-white/[0.08] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Full Service Directory
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Our 15 Specialized Digital & Creative Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            End-to-end solutions spanning engineering, creative identity, photography, and performance growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_COMPANY_SERVICES.map((srv, idx) => (
            <Link
              key={idx}
              to={srv.includes('Photography') ? '/services/photography' : `/contact?service=${encodeURIComponent(srv)}`}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-brand-electric/40 hover:bg-white/[0.04] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-brand-lavender">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                <span className="text-sm font-heading font-semibold text-white group-hover:text-brand-electric transition-colors">
                  {srv}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-electric group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Services FAQ & Consultation CTA */}
      <div className="mt-24 p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-brand-card via-brand-surface to-brand-card border border-white/[0.08] text-center space-y-6">
        <Badge variant="cyan">Tailored Scopes</Badge>
        <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white">
          Need a Custom Combination of Tech & Branding?
        </h2>
        <p className="text-sm sm:text-base text-brand-muted max-w-xl mx-auto font-body">
          Most modern businesses benefit from bundling web development, visual identity, and launch marketing together. We create bundled proposals with clear itemized milestones.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
            Request a Custom Scope
          </Button>
          <Button
            href={getWhatsAppUrl('general')}
            variant="whatsapp"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle className="w-4 h-4" />}
          >
            Direct WhatsApp Chat
          </Button>
        </div>
      </div>

      <ServiceModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
      />
    </div>
  );
};
