import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, ArrowUpRight, Shield } from 'lucide-react';
import { CONTACT_INFO, getWhatsAppUrl, getMailtoUrl } from '../../config/contact';
import { SERVICES } from '../../data/services';
import { SITE_CONFIG } from '../../config/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-surface border-t border-white/[0.08] relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-violet/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3 group inline-flex" aria-label="LetsGoAdGenX">
              <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-electric shadow-glow-sm">
                <img
                  src="/adgenx-logo.png"
                  alt="ADGEN-X Logo"
                  className="w-full h-full object-cover rounded-full"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white tracking-tight">
                  LetsGo<span className="text-brand-electric">AdGenX</span>
                </span>
                <span className="text-[11px] tracking-widest text-brand-lavender/90 uppercase font-heading -mt-1 font-semibold">
                  ADGEN - X
                </span>
              </div>
            </Link>

            <p className="text-sm text-brand-muted leading-relaxed max-w-sm font-body">
              A technology, creative design, and digital growth company helping startups, businesses, and institutions transform their ideas into high-performance digital products and memorable brands.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-heading font-medium bg-brand-blue/10 text-brand-lavender border border-brand-blue/20">
                <span className="w-2 h-2 rounded-full bg-brand-electric animate-pulse" />
                {CONTACT_INFO.tagline}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-heading font-semibold text-white tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="hover:text-brand-electric transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-electric" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-sm font-heading font-semibold text-white tracking-wider uppercase mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="hover:text-brand-electric transition-colors line-clamp-1"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Details */}
          <div>
            <h4 className="text-sm font-heading font-semibold text-white tracking-wider uppercase mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3.5 text-sm text-brand-muted">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
                  Official Email
                </span>
                <a
                  href={getMailtoUrl()}
                  className="text-white hover:text-brand-electric transition-colors font-medium flex items-center gap-1.5 break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
                  Contact Numbers
                </span>
                <div className="flex flex-col gap-1.5">
                  {CONTACT_INFO.phones.map((p) => (
                    <a
                      key={p.raw}
                      href={`tel:${p.raw}`}
                      className="text-white hover:text-brand-electric transition-colors font-medium flex items-center justify-between text-xs sm:text-sm group"
                    >
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-brand-violet shrink-0" />
                        {p.display}
                      </span>
                      {p.isPrimary && (
                        <span className="text-[10px] uppercase font-heading bg-brand-blue/20 text-brand-electric px-1.5 py-0.5 rounded border border-brand-blue/30">
                          Primary
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold transition-all w-full justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp (+91 90801 04624)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© {currentYear} LetsGoAdGenX. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-white/40 flex items-center gap-1">
              <Shield className="w-3 h-3 text-brand-electric" /> Secure & Dedicated
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
