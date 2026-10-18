import React from 'react';
import { Badge } from '../components/ui/Badge';
import { CONTACT_INFO } from '../config/contact';
import { FileText } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_METADATA } from '../config/seo';

export const Terms: React.FC = () => {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Route-Aware Technical SEO */}
      <SEOHead
        metadata={PAGE_METADATA.terms}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms' },
        ]}
      />
      <div className="text-center space-y-4">
        <Badge variant="purple" icon={<FileText className="w-3.5 h-3.5" />}>
          Service Terms
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-sm text-brand-muted">
          Last updated: October 2026 • LetsGoAdGenX (ADGEN-X)
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl glass-card border border-white/[0.08] space-y-8 text-sm text-brand-muted leading-relaxed font-body">
        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">1. Scope of Services</h2>
          <p>
            LetsGoAdGenX provides digital development, software engineering, mobile applications, website development, brand identity design, graphic design, and digital marketing advisory services. All specific deliverables, fees, and milestone timetables are governed by agreed project scopes or statements of work (SOW).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">2. Intellectual Property & Ownership</h2>
          <p>
            Upon settlement of final project fees, full commercial ownership and master files for custom deliverables (such as source code, vector logos, and design assets) are transferred to the client, excluding third-party open-source libraries or standard pre-existing frameworks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">3. Client Collaboration & Responsibilities</h2>
          <p>
            Timely delivery requires constructive client participation, including prompt review of milestone previews, timely delivery of raw content/credentials, and approval of production staging releases.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">4. Warranty & Maintenance</h2>
          <p>
            Standard software and website projects include a defined post-launch stabilization warranty to address technical bugs within the original agreed scope. Ongoing feature development, third-party API changes, or hosting changes beyond this period are provided under mutual maintenance arrangements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-heading font-bold text-white">5. Governing Inquiries</h2>
          <p>
            For questions or contractual inquiries, reach our team at{' '}
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-brand-electric hover:underline">
              {CONTACT_INFO.email}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};
