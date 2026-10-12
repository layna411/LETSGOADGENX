import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Clock, Check, Copy } from 'lucide-react';
import { CONTACT_INFO, getWhatsAppUrl, getMailtoUrl, type InquiryType } from '../config/contact';
import { ContactForm } from '../components/forms/ContactForm';
import { Badge } from '../components/ui/Badge';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const whatsappTemplates: { label: string; type: InquiryType }[] = [
    { label: 'General Project Inquiry', type: 'general' },
    { label: 'Website Development', type: 'website' },
    { label: 'Mobile / Web Application', type: 'app' },
    { label: 'Graphic Design & Branding', type: 'design' },
    { label: 'Digital Marketing & Growth', type: 'marketing' },
    { label: 'Photography & Photoshoots', type: 'photography' },
  ];

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Contact Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">Start a Project</Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
          Let’s Build Something <br />
          <span className="text-gradient">Extraordinary.</span>
        </h1>
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
          Tell us about your upcoming software, website, branding, or growth initiative. We review every inquiry personally and respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Contact Details & WhatsApp Templates */}
        <div className="lg:col-span-5 space-y-8">
          {/* Official Contact Card */}
          <div className="p-8 rounded-3xl glass-card border border-white/[0.08] space-y-6">
            <h2 className="text-xl font-heading font-bold text-white">
              Direct Contact Details
            </h2>

            {/* Email */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] space-y-2">
              <div className="flex items-center justify-between text-xs font-heading font-semibold text-white/50 uppercase tracking-wider">
                <span>Official Email</span>
                <button
                  onClick={copyEmailToClipboard}
                  className="text-brand-electric hover:text-white flex items-center gap-1 transition-colors text-[11px] cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <a
                href={getMailtoUrl()}
                className="text-base sm:text-lg font-heading font-medium text-white hover:text-brand-electric transition-colors flex items-center gap-2 break-all"
              >
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                {CONTACT_INFO.email}
              </a>
            </div>

            {/* Phone Numbers */}
            <div className="space-y-3">
              <div className="text-xs font-heading font-semibold text-white/50 uppercase tracking-wider">
                Direct Phone Numbers (India +91)
              </div>
              {CONTACT_INFO.phones.map((phone) => (
                <div
                  key={phone.raw}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-between group"
                >
                  <a
                    href={`tel:${phone.raw}`}
                    className="text-sm sm:text-base font-heading font-medium text-white hover:text-brand-electric transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-brand-violet shrink-0" />
                    <span>{phone.display}</span>
                  </a>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.04] text-brand-lavender border border-white/5">
                    {phone.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Response Time Indicator */}
            <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3 text-xs text-brand-muted">
              <Clock className="w-4 h-4 text-brand-electric shrink-0" />
              <span>Typical response time: <strong className="text-white">Within 24 hours</strong></span>
            </div>
          </div>

          {/* Quick WhatsApp Templates */}
          <div className="p-8 rounded-3xl glass-card border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <MessageCircle className="w-5 h-5" />
              <h2 className="text-lg font-heading font-bold text-white">
                Instant WhatsApp Topics
              </h2>
            </div>
            <p className="text-xs text-brand-muted font-body leading-relaxed">
              Prefer chatting directly on WhatsApp? Pick a topic below to initiate a prefilled chat with our primary number (+91 90801 04624):
            </p>

            <div className="space-y-2 pt-2">
              {whatsappTemplates.map((item) => (
                <a
                  key={item.type}
                  href={getWhatsAppUrl(item.type)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-xs font-heading font-medium text-white hover:text-white transition-all group"
                >
                  <span>{item.label}</span>
                  <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Complete Interactive Inquiry Form */}
        <div className="lg:col-span-7 space-y-4">
          <div className="mb-2">
            <h2 className="text-2xl font-heading font-bold text-white mb-1">
              Project Inquiry Form
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted font-body">
              Fill in your specifications below. We provide tailored cost estimates and milestone proposals.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
};
