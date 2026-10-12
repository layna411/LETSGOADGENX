import React from 'react';
import { X, CheckCircle2, ArrowRight, MessageCircle, HelpCircle } from 'lucide-react';
import type { ServiceItem } from '../../data/services';
import { DynamicIcon } from '../ui/DynamicIcon';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { getWhatsAppUrl } from '../../config/contact';
import { useNavigate } from 'react-router-dom';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const navigate = useNavigate();

  if (!service) return null;

  const handleStartProject = () => {
    onClose();
    navigate(`/contact?service=${encodeURIComponent(service.title)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-brand-surface border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 border-b border-white/[0.08] bg-gradient-to-r from-brand-card to-brand-surface">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-brand-muted hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Close service details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-brand-blue/20 text-brand-electric border border-brand-blue/30">
              <DynamicIcon name={service.iconName} className="w-6 h-6" />
            </div>
            <Badge variant="purple">{service.badge}</Badge>
          </div>

          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
            {service.title}
          </h3>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-body">
            {service.fullDesc}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Full Offerings List */}
          <div>
            <h4 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3">
              Included Offerings & Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.offerings.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs sm:text-sm text-brand-text"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Deliverables */}
          <div>
            <h4 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3">
              Standard Project Deliverables
            </h4>
            <div className="space-y-2">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-violet mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Working Approach */}
          <div>
            <h4 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3">
              Our Working Approach
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.approach.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-brand-card/60 border border-white/[0.06] text-xs text-brand-muted"
                >
                  <span className="font-heading font-bold text-white text-xs block mb-1">
                    Phase {idx + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Service Specific FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Frequent Questions
              </h4>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                  >
                    <div className="text-xs sm:text-sm font-heading font-semibold text-white mb-1">
                      {faq.q}
                    </div>
                    <div className="text-xs text-brand-muted leading-relaxed font-body">
                      {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Actions */}
        <div className="p-6 sm:p-8 border-t border-white/[0.08] bg-brand-card/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-brand-muted text-center sm:text-left">
            Ready to scope your <span className="text-white font-medium">{service.title}</span>?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={getWhatsAppUrl(service.inquiryType)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>

            <Button
              onClick={handleStartProject}
              variant="primary"
              size="md"
              className="flex-1 sm:flex-initial text-xs"
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start Inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
