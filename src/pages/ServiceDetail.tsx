import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, HelpCircle, Layers, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/services';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DynamicIcon } from '../components/ui/DynamicIcon';
import { getWhatsAppUrl } from '../config/contact';
import { NotFound } from './NotFound';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_METADATA, SITE_URL } from '../config/seo';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Alias resolution
  const resolvedSlug =
    slug === 'app-development'
      ? 'software-development'
      : slug === 'web-applications'
      ? 'software-development'
      : slug === 'logo-branding'
      ? 'graphic-design'
      : slug;

  const service = SERVICES.find((s) => s.slug === resolvedSlug);

  if (!service) {
    return <NotFound />;
  }

  const metaKey = `service-${resolvedSlug}`;
  const metadata = PAGE_METADATA[metaKey] || {
    title: `${service.title} Services | LetsGoAdGenX`,
    description: service.fullDesc,
    canonicalPath: `/services/${service.slug}`,
    keywords: [service.title, `${service.title} services`, 'LetsGoAdGenX'],
    ogType: 'website' as const,
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDesc,
    provider: {
      '@type': 'ProfessionalService',
      name: 'LetsGoAdGenX',
      url: SITE_URL,
    },
    serviceType: service.badge,
    areaServed: 'India & Global',
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Route-Aware Technical SEO */}
      <SEOHead
        metadata={metadata}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        schema={serviceSchema}
      />
      {/* Back button */}
      <div className="mb-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-heading font-medium text-brand-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Services
        </Link>
      </div>

      {/* Hero Header */}
      <div className="p-8 sm:p-14 rounded-3xl glass-card border border-white/[0.08] relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-brand-blue/20 text-brand-electric border border-brand-blue/30">
              <DynamicIcon name={service.iconName} className="w-6 h-6" />
            </div>
            <Badge variant="purple">{service.badge}</Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
            {service.fullDesc}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Inquire About {service.title}
            </Button>

            <Button
              href={getWhatsAppUrl(service.inquiryType)}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              icon={<MessageCircle className="w-4 h-4" />}
            >
              Instant WhatsApp Discussion
            </Button>
          </div>
        </div>
      </div>

      {/* Two Column Offerings & Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Included Capabilities */}
        <div className="p-8 rounded-3xl glass-card border border-white/[0.08]">
          <h2 className="text-lg font-heading font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-electric" /> Full Scope of Capabilities
          </h2>
          <ul className="space-y-3">
            {service.offerings.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-brand-text">
                <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div className="p-8 rounded-3xl glass-card border border-white/[0.08]">
          <h2 className="text-lg font-heading font-bold text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-lavender" /> Tangible Deliverables
          </h2>
          <ul className="space-y-3">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-brand-muted">
                <span className="w-2 h-2 rounded-full bg-brand-violet mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Working Approach Phases */}
      <div className="p-8 sm:p-12 rounded-3xl glass-card border border-white/[0.08] mb-12">
        <h2 className="text-2xl font-heading font-bold text-white mb-6">
          Our Working Approach for {service.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.approach.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-brand-surface/70 border border-white/[0.06]"
            >
              <div className="text-xs uppercase font-mono font-semibold text-brand-lavender mb-2">
                Phase 0{idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-body">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      {service.faqs && service.faqs.length > 0 && (
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-white/[0.08] mb-12">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-electric" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
              >
                <h3 className="text-sm sm:text-base font-heading font-semibold text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-body">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-card to-brand-surface border border-white/[0.08] text-center space-y-4">
        <h3 className="text-2xl font-heading font-bold text-white">
          Ready to kick off your {service.title}?
        </h3>
        <p className="text-sm text-brand-muted max-w-md mx-auto">
          Share your requirements or timeline goals. We respond promptly with a customized breakdown.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Button
            to={`/contact?service=${encodeURIComponent(service.title)}`}
            variant="primary"
            size="md"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Start Project Inquiry
          </Button>
        </div>
      </div>
    </div>
  );
};
