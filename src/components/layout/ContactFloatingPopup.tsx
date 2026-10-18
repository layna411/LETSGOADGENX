import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import { CONTACT_INFO, getWhatsAppUrl, type InquiryType } from '../../config/contact';
import { createInquiry } from '../../services/inquiryService';
import { Link } from 'react-router-dom';
import { SocialLinks } from '../ui/SocialLinks';

export const ContactFloatingPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'instant' | 'message'>('instant');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Quick message form state
  const [formData, setFormData] = useState({
    fullName: '',
    contactValue: '',
    serviceCategory: 'Website Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmitQuickMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.contactValue.trim()) {
      setSubmitError('Please enter your name and email or phone number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const isEmail = formData.contactValue.includes('@');
      await createInquiry({
        fullName: formData.fullName.trim(),
        email: isEmail ? formData.contactValue.trim() : '',
        phone: !isEmail ? formData.contactValue.trim() : '',
        serviceCategory: formData.serviceCategory,
        message: formData.message.trim() || 'Quick Inquiry via Floating Contact Popup',
        type: 'general',
      });

      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        contactValue: '',
        serviceCategory: 'Website Development',
        message: '',
      });
    } catch {
      setSubmitError('Unable to send at this moment. Please reach out via WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappTopics: { label: string; type: InquiryType; icon: string }[] = [
    { label: 'Website Development', type: 'website', icon: '🌐' },
    { label: 'Mobile / Web App', type: 'app', icon: '📱' },
    { label: 'Design & Branding', type: 'design', icon: '🎨' },
    { label: 'Digital Marketing & SEO', type: 'marketing', icon: '📈' },
    { label: 'Photo & Video Production', type: 'photography', icon: '📸' },
    { label: 'General Discussion', type: 'general', icon: '✨' },
  ];

  return (
    <div ref={popupRef} className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none">
      {/* ============================================================== */}
      {/* 1. POPUP WINDOW / MODAL DRAWER                                */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 w-[340px] sm:w-[400px] max-h-[85vh] flex flex-col rounded-3xl bg-[#0a0d20]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_70px_rgba(0,0,0,0.75)] overflow-hidden"
          >
            {/* Ambient Header Glow */}
            <div className="absolute top-0 right-0 w-64 h-32 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-48 h-32 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />

            {/* Popup Header */}
            <div className="relative z-10 px-5 pt-5 pb-3 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl p-[2px] bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-electric shrink-0 shadow-glow-sm">
                  <img
                    src="/adgenx-logo.png"
                    alt="LetsGoAdGenX"
                    className="w-full h-full object-cover rounded-[10px]"
                    width={40}
                    height={40}
                  />
                  {/* Online Beacon */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0a0d20] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-heading font-bold text-white flex items-center gap-1.5 leading-tight">
                    LetsGo<span className="text-brand-electric">AdGenX</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online • Instant Response</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white/70 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close Contact Pop-up"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="relative z-10 px-5 pt-3 pb-2 flex gap-2 border-b border-white/[0.06] bg-black/20">
              <button
                onClick={() => {
                  setActiveTab('instant');
                  setSubmitSuccess(false);
                }}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-heading font-semibold transition-all ${
                  activeTab === 'instant'
                    ? 'bg-brand-blue text-white shadow-glow-sm'
                    : 'text-brand-muted hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Instant Connect
              </button>
              <button
                onClick={() => {
                  setActiveTab('message');
                  setSubmitSuccess(false);
                }}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-heading font-semibold transition-all ${
                  activeTab === 'message'
                    ? 'bg-brand-blue text-white shadow-glow-sm'
                    : 'text-brand-muted hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Quick Inquiry Form
              </button>
            </div>

            {/* Popup Body (Scrollable) */}
            <div className="relative z-10 p-5 overflow-y-auto max-h-[55vh] space-y-4 font-body custom-scrollbar">
              {activeTab === 'instant' ? (
                <>
                  {/* WhatsApp Quick Topics Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60 font-medium">WhatsApp One-Tap Chat</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                        <MessageCircle className="w-3 h-3" /> Fastest reply
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {whatsappTopics.map((topic) => (
                        <a
                          key={topic.type}
                          href={getWhatsAppUrl(topic.type)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-emerald-500/15 border border-white/[0.06] hover:border-emerald-500/30 flex items-center gap-2 group transition-all text-left"
                        >
                          <span className="text-base shrink-0">{topic.icon}</span>
                          <span className="text-xs text-white/90 group-hover:text-emerald-300 font-medium leading-tight">
                            {topic.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Direct Phone Numbers */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
                    <div className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-electric" />
                      <span>Direct Call Lines</span>
                    </div>

                    <div className="space-y-1.5">
                      {CONTACT_INFO.phones.map((phone, idx) => (
                        <a
                          key={idx}
                          href={`tel:${phone.raw}`}
                          className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-brand-blue/15 border border-transparent hover:border-brand-blue/30 text-xs transition-colors"
                        >
                          <span className="text-white font-mono font-medium">{phone.display}</span>
                          <span className="text-[10px] text-brand-lavender font-heading">{phone.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Direct Email */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="w-4 h-4 text-brand-violet shrink-0" />
                      <span className="text-white/80 font-mono truncate">{CONTACT_INFO.email}</span>
                    </div>
                    <button
                      onClick={copyEmail}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[11px] text-white flex items-center gap-1 transition-colors shrink-0"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Quick Message Form */}
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 text-center space-y-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-heading font-bold text-white">Inquiry Received!</h4>
                      <p className="text-xs text-white/70 leading-relaxed font-body">
                        Thank you for reaching out. Our team will review your message and reply via email or WhatsApp promptly.
                      </p>
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="text-xs text-brand-electric hover:underline font-semibold"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitQuickMessage} className="space-y-3">
                      <div>
                        <label className="block text-[11px] text-white/70 font-medium mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Enter your name"
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-white/30 focus:border-brand-blue focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-white/70 font-medium mb-1">
                          Email or WhatsApp Phone *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contactValue}
                          onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                          placeholder="e.g. name@company.com or phone"
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-white/30 focus:border-brand-blue focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-white/70 font-medium mb-1">
                          Service Needed
                        </label>
                        <select
                          value={formData.serviceCategory}
                          onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#080d22] border border-white/[0.08] text-xs text-white focus:border-brand-blue focus:outline-none transition-colors"
                        >
                          <option value="Website Development">Website Development</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Custom Software Development">Custom Software Development</option>
                          <option value="Graphic Design & Branding">Graphic Design & Branding</option>
                          <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                          <option value="Video Editing & Motion Graphics">Video Editing & Motion Graphics</option>
                          <option value="Photography & Shoots">Photography & Shoots</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-white/70 font-medium mb-1">
                          Short Message or Goal
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Briefly describe what you would like to build..."
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-white/30 focus:border-brand-blue focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {submitError && (
                        <p className="text-xs text-rose-400 font-medium">{submitError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet hover:from-brand-blue/90 hover:to-brand-violet/90 text-white font-heading font-semibold text-xs flex items-center justify-center gap-2 shadow-glow-sm transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Inquiry</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* Social channels in quick popup */}
            <div className="relative z-10 px-5 py-2.5 border-t border-white/[0.06] bg-black/20 flex items-center justify-between">
              <span className="text-[10px] font-heading uppercase tracking-wider text-white/40">
                Official Channels
              </span>
              <SocialLinks size="sm" />
            </div>

            {/* Popup Footer */}
            <div className="relative z-10 px-5 py-3 border-t border-white/[0.08] bg-black/30 flex items-center justify-between text-xs">
              <span className="text-[11px] text-white/50">Need a comprehensive brief?</span>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-xs font-heading font-semibold text-brand-electric hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Full Contact Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 2. THE FLOATING POP-UP TRIGGER BUTTON                          */}
      {/* ============================================================== */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-full bg-gradient-to-r from-[#0d163a] via-[#141e4a] to-[#0f1738] border border-cyan-400/40 hover:border-cyan-400 shadow-[0_10px_35px_rgba(0,229,255,0.35)] backdrop-blur-xl transition-all duration-300"
        aria-label={isOpen ? 'Close Contact Menu' : 'Open Contact Menu'}
      >
        {/* Breathing Ambient Aura behind button */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/25 to-brand-violet/25 blur-md pointer-events-none group-hover:opacity-100 opacity-70 transition-opacity" />

        {/* Dynamic Icon */}
        <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-brand-blue to-cyan-400 flex items-center justify-center text-white shrink-0 shadow-glow-sm">
          {isOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <MessageCircle className="w-4 h-4 fill-white/20" />
          )}

          {/* Online green indicator dot */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0d163a]">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </span>
          )}
        </div>

        {/* Text Label */}
        <div className="flex flex-col text-left leading-none">
          <span className="text-[10px] uppercase font-mono tracking-wider text-brand-lavender">
            {isOpen ? 'Close' : 'Have a Project?'}
          </span>
          <span className="text-xs sm:text-sm font-heading font-bold text-white tracking-tight">
            {isOpen ? 'Dismiss' : 'Contact Us'}
          </span>
        </div>
      </motion.button>
    </div>
  );
};
