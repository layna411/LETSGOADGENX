import React from 'react';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import type { ServiceItem } from '../../data/services';
import { DynamicIcon } from '../ui/DynamicIcon';
import { Badge } from '../ui/Badge';
import { getWhatsAppUrl } from '../../config/contact';

interface ServiceCardProps {
  service: ServiceItem;
  onExplore: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onExplore }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 glass-card glass-card-hover border border-white/[0.08] transition-all duration-300">
      {/* Top Accent Gradient on Hover */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-electric/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header Icon & Badge */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-violet/20 border border-white/10 flex items-center justify-center text-brand-electric group-hover:scale-110 group-hover:text-brand-lavender transition-all duration-300 shadow-sm">
            <DynamicIcon name={service.iconName} className="w-6 h-6" />
          </div>
          <Badge variant="purple">{service.badge}</Badge>
        </div>

        {/* Title & Short Description */}
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 group-hover:text-brand-electric transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-brand-muted leading-relaxed font-body mb-6">
          {service.shortDesc}
        </p>

        {/* Offerings Pills */}
        <div className="space-y-2 mb-8">
          <div className="text-xs uppercase tracking-wider font-heading font-semibold text-white/50 mb-2">
            Key Capabilities
          </div>
          <ul className="space-y-1.5">
            {service.offerings.slice(0, 4).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-brand-text/90">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Links */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <button
          onClick={() => onExplore(service)}
          className="text-xs font-heading font-semibold text-brand-lavender hover:text-white inline-flex items-center gap-1.5 transition-colors group/btn cursor-pointer"
        >
          <span>Explore Service</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-brand-electric" />
        </button>

        <a
          href={getWhatsAppUrl(service.inquiryType)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-heading font-medium text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
          title="Discuss via WhatsApp"
        >
          <MessageCircle className="w-3 h-3" />
          <span>Discuss</span>
        </a>
      </div>
    </div>
  );
};
