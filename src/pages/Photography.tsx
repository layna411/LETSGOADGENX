import React, { useState } from 'react';
import { Camera, ArrowRight, Sparkles, CheckCircle2, HelpCircle, ShieldCheck, Calendar } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DynamicIcon } from '../components/ui/DynamicIcon';
import { PhotographyGallery } from '../components/photography/PhotographyGallery';
import { PhotoshootInquiryForm } from '../components/photography/PhotoshootInquiryForm';
import {
  PHOTOGRAPHY_SERVICES,
  PHOTOGRAPHY_WORKFLOW,
  PHOTOGRAPHY_FAQS,
  type PhotographyItem,
} from '../data/photography';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_METADATA, SITE_URL } from '../config/seo';

export const Photography: React.FC = () => {
  const [selectedServiceForForm, setSelectedServiceForForm] = useState<string>('Product Shoot');

  const scrollToInquiry = () => {
    const el = document.getElementById('photoshoot-inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('photography-gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookItem = (item: PhotographyItem) => {
    setSelectedServiceForForm(item.category + ' Photography');
    scrollToInquiry();
  };

  const photographySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Professional Photography & Visual Production',
    description:
      'Professional product photography, corporate shoots, portrait sessions, event coverage, and brand campaign visual production.',
    provider: {
      '@type': 'ProfessionalService',
      name: 'LetsGoAdGenX',
      url: SITE_URL,
    },
    serviceType: 'Commercial & Brand Photography',
    areaServed: 'India & Global',
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Route-Aware Technical SEO */}
      <SEOHead
        metadata={PAGE_METADATA.photography}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Photography', path: '/services/photography' },
        ]}
        schema={photographySchema}
      />

      {/* 1. PHOTOGRAPHY HERO SECTION */}
      <section className="relative p-8 sm:p-14 lg:p-20 rounded-3xl glass-card border border-white/[0.08] overflow-hidden text-center">
        {/* Ambient lighting lights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <Badge variant="purple" icon={<Camera className="w-3.5 h-3.5" />}>
            Photography & Visual Production
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.12]">
            Professional Photography That{' '}
            <span className="text-gradient">Brings Your Brand to Life.</span>
          </h1>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
            From products and portraits to events and commercial campaigns, we create impactful visual stories for individuals and businesses.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={scrollToInquiry}
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Book a Photoshoot
            </Button>

            <Button
              onClick={scrollToPortfolio}
              variant="secondary"
              size="lg"
              icon={<Camera className="w-4 h-4 text-brand-electric" />}
              className="w-full sm:w-auto"
            >
              View Photography Portfolio
            </Button>
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-center flex-wrap gap-6 text-xs text-brand-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-electric" /> E-Commerce & Catalogs
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-violet" /> Executive & Team Portraits
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Commercial Advertising
            </span>
          </div>
        </div>
      </section>

      {/* 2. PHOTOGRAPHY SERVICE CATEGORIES (10 CATEGORIES) */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">Specialized Disciplines</Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Comprehensive Photographic Services
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-body">
            Tailored equipment, precision studio strobes, and on-location setups engineered for every commercial need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHOTOGRAPHY_SERVICES.map((serv) => (
            <div
              key={serv.id}
              className="p-6 sm:p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-brand-violet/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-violet/15 text-brand-lavender border border-brand-violet/25 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <DynamicIcon name={serv.iconName} className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-brand-electric transition-colors">
                  {serv.title}
                </h3>

                <p className="text-xs text-brand-muted leading-relaxed font-body mb-5">
                  {serv.description}
                </p>

                <ul className="space-y-1.5 pt-2 border-t border-white/[0.06] mb-6">
                  {serv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-brand-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-electric shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedServiceForForm(serv.title);
                    scrollToInquiry();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-heading font-semibold text-brand-lavender hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Select For Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PHOTOGRAPHY PORTFOLIO WITH LIGHTBOX */}
      <section id="photography-gallery" className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="primary" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Visual Gallery
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Curated Visual Showcase
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-body">
            Explore diverse compositions, lighting techniques, and subjects. Click any image for full-screen inspection with technical capture details.
          </p>
        </div>

        <PhotographyGallery onBookItem={handleBookItem} />
      </section>

      {/* 4. PHOTOSHOOT 5-STEP PROCESS */}
      <section className="p-8 sm:p-14 rounded-3xl glass-card border border-white/[0.08] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="cyan">Shoot Lifecycle</Badge>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white">
            Our 5-Step Photography Workflow
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted font-body">
            Structured shoot preparation ensures no lost time and delivers print-grade final imagery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {PHOTOGRAPHY_WORKFLOW.map((wf, idx) => (
            <div
              key={wf.step}
              className="p-5 rounded-2xl bg-brand-surface/80 border border-white/[0.06] flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-heading font-black text-gradient block mb-2">
                  {wf.step}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-brand-lavender font-semibold block mb-1">
                  Stage 0{idx + 1}
                </span>
                <h3 className="text-base font-heading font-bold text-white mb-1">
                  {wf.title}
                </h3>
                <div className="text-xs text-brand-electric font-medium mb-3">
                  {wf.subtitle}
                </div>
                <p className="text-xs text-brand-muted leading-relaxed font-body mb-4">
                  {wf.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] space-y-1">
                {wf.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="text-[11px] text-white/70 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-electric shrink-0" />
                    <span className="line-clamp-1">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRANSPARENT SCOPES & PACKAGES GUIDANCE */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-card via-brand-surface to-brand-card border border-white/[0.08] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="purple">Photoshoot Scoping</Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            How We Structure Photoshoot Proposals
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted font-body">
            Every shoot has distinct requirements (number of products, talent, studio rentals, or multi-location travel). We provide transparent itemized proposals tailored to your scope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-brand-electric" /> Studio & Product Sessions
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Ideal for e-commerce catalogs, brand lookbooks, and cosmetic/electronics packaging. Billed per product count or half/full day studio blocks with all lighting included.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-violet" /> On-Location & Corporate Shoots
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We bring portable strobes, backdrops, and gear directly to your office, restaurant, or facility. Structured around hourly durations with full commercial rights.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Commercial Advertising Campaigns
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              High-concept productions with art direction, prop staging, model casting coordination, and master 300 DPI retouching for large billboard and print usage.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="cyan">Common Queries</Badge>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-brand-electric" /> Photography FAQs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PHOTOGRAPHY_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card border border-white/[0.06] space-y-2"
            >
              <h3 className="text-sm sm:text-base font-heading font-semibold text-white">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-body">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 & 8. PHOTOSHOOT INQUIRY FORM & WHATSAPP CTA */}
      <section id="photoshoot-inquiry" className="space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="purple">Book Your Session</Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Request a Photoshoot Proposal
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted font-body">
            Share your shoot dates, subject requirements, and location preference. We review scheduling availability and return a comprehensive proposal.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <PhotoshootInquiryForm initialService={selectedServiceForForm} />
        </div>
      </section>
    </div>
  );
};
