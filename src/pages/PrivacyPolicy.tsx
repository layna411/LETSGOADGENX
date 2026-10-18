import React from 'react';
import { Badge } from '../components/ui/Badge';
import { CONTACT_INFO } from '../config/contact';
import { ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_METADATA } from '../config/seo';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Route-Aware Technical SEO */}
      <SEOHead
        metadata={PAGE_METADATA.privacy}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ]}
      />
      <div className="text-center space-y-4">
        <Badge variant="cyan" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
          Legal & Transparency
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-brand-muted">
          Last updated: October 2026 • Effective for LetsGoAdGenX (ADGEN-X)
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl glass-card border border-white/[0.08] space-y-8 text-sm text-brand-muted leading-relaxed font-body">
        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">1. Overview</h2>
          <p>
            LetsGoAdGenX (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website and digital agency services. This Privacy Policy outlines how we collect, use, and safeguard personal and business information submitted when engaging our services or using our website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">2. Information We Collect</h2>
          <p>
            When you contact us or submit a project proposal, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details such as your name, business email address, and telephone number.</li>
            <li>Company details, project descriptions, timelines, and budget ranges.</li>
            <li>Technical diagnostic details automatically sent by browsers (such as device type and IP address) for site security.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">3. How We Use Your Information</h2>
          <p>
            Information provided is utilized solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Review project requirements and provide customized technical or creative proposals.</li>
            <li>Communicate regarding active project milestones and deliverables.</li>
            <li>Maintain security and prevent spam or abusive form submissions.</li>
          </ul>
          <p>
            We strictly do not sell, rent, or trade your personal or business information to third-party brokers or advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">4. Data Security</h2>
          <p>
            We implement industry-standard technical measures including SSL encryption in transit to protect transmitted communications. While no internet transmission is 100% impenetrable, we restrict internal access to authorized project personnel only.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">5. Contact Us</h2>
          <p>
            For questions regarding this policy or to request data removal, please email us directly at{' '}
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-brand-electric hover:underline">
              {CONTACT_INFO.email}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};
