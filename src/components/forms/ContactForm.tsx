import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, Loader2, MessageCircle, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { SERVICES } from '../../data/services';
import { CONTACT_INFO } from '../../config/contact';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  serviceCategory: string;
  budget: string;
  timeline: string;
  description: string;
  privacyConsent: boolean;
  botcheck: string; // Honeypot field for spam prevention
}

export const ContactForm: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    serviceCategory: '',
    budget: '',
    timeline: '',
    description: '',
    privacyConsent: false,
    botcheck: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  // Prefill service or project from query params if available
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const projectParam = searchParams.get('project');

    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        serviceCategory: serviceParam,
        description: prev.description || `I would like to inquire about ${serviceParam}.`,
      }));
    } else if (projectParam) {
      setFormData((prev) => ({
        ...prev,
        serviceCategory: 'Website & Web Development',
        description: prev.description || `I am interested in building a solution similar to "${projectParam}".`,
      }));
    }
  }, [searchParams]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format (e.g., name@example.com).';
    }

    if (!formData.serviceCategory) {
      newErrors.serviceCategory = 'Please select a primary service category.';
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = 'Please describe your project (minimum 10 characters).';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'Please agree to the privacy policy to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Bot honeypot check
    if (formData.botcheck) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      if (accessKey) {
        // Real Web3Forms submission
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New Project Inquiry from ${formData.fullName} (${formData.serviceCategory})`,
            from_name: 'LetsGoAdGenX Inquiries',
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone || 'Not provided',
            business_name: formData.businessName || 'Not provided',
            service_category: formData.serviceCategory,
            budget: formData.budget || 'Flexible',
            timeline: formData.timeline || 'Flexible',
            message: formData.description,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus('success');
          setFeedbackMessage(
            'Thank you! Your project inquiry has been delivered directly to the LetsGoAdGenX team. We will review your requirements and respond within 24 hours.'
          );
        } else {
          throw new Error(result.message || 'Submission error');
        }
      } else {
        // Fallback simulation when VITE_WEB3FORMS_ACCESS_KEY is not yet populated
        await new Promise((resolve) => setTimeout(resolve, 900));
        setStatus('success');
        setFeedbackMessage(
          'Inquiry captured! Note: Configure VITE_WEB3FORMS_ACCESS_KEY in your .env for external email routing. You can also send this inquiry directly to our WhatsApp!'
        );
      }
    } catch (err: unknown) {
      setStatus('error');
      setFeedbackMessage(
        err instanceof Error
          ? err.message
          : 'Could not submit at this time. Please connect with us directly via WhatsApp or official email.'
      );
    }
  };

  const handleSendToWhatsApp = () => {
    const summary = `*New Project Inquiry - LetsGoAdGenX*%0A%0A*Name:* ${encodeURIComponent(formData.fullName || 'Not provided')}%0A*Email:* ${encodeURIComponent(formData.email || 'Not provided')}%0A*Phone:* ${encodeURIComponent(formData.phone || 'Not provided')}%0A*Business:* ${encodeURIComponent(formData.businessName || 'Not provided')}%0A*Service:* ${encodeURIComponent(formData.serviceCategory || 'General Inquiry')}%0A*Budget:* ${encodeURIComponent(formData.budget || 'Flexible')}%0A*Timeline:* ${encodeURIComponent(formData.timeline || 'Flexible')}%0A*Description:* ${encodeURIComponent(formData.description || 'Discuss project details.')}`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${summary}`, '_blank', 'noopener,noreferrer');
  };

  if (status === 'success') {
    return (
      <div className="p-8 sm:p-12 rounded-3xl glass-card border border-brand-violet/30 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
          Inquiry Received!
        </h3>

        <p className="text-sm sm:text-base text-brand-muted max-w-lg mx-auto font-body leading-relaxed">
          {feedbackMessage}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleSendToWhatsApp}
            variant="whatsapp"
            icon={<MessageCircle className="w-4 h-4" />}
          >
            Forward to WhatsApp for Instant Chat
          </Button>

          <Button
            onClick={() => {
              setStatus('idle');
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                businessName: '',
                serviceCategory: '',
                budget: '',
                timeline: '',
                description: '',
                privacyConsent: false,
                botcheck: '',
              });
            }}
            variant="secondary"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-10 rounded-3xl glass-card border border-white/[0.08] space-y-6"
    >
      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="botcheck"
        value={formData.botcheck}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {status === 'error' && (
        <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Row 1: Full Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Full Name <span className="text-brand-electric">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
              errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-brand-blue'
            } text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1.5 text-xs text-red-400">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Email Address <span className="text-brand-electric">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
              errors.email ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-brand-blue'
            } text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Phone Number & Business Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Phone Number <span className="text-white/40 text-[11px]">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-blue text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
          />
        </div>

        <div>
          <label htmlFor="businessName" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Company / Business Name <span className="text-white/40 text-[11px]">(Optional)</span>
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Acme Innovations"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-blue text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
          />
        </div>
      </div>

      {/* Row 3: Service Category & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="serviceCategory" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Primary Service Needed <span className="text-brand-electric">*</span>
          </label>
          <select
            id="serviceCategory"
            name="serviceCategory"
            value={formData.serviceCategory}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={!!errors.serviceCategory}
            aria-describedby={errors.serviceCategory ? 'serviceCategory-error' : undefined}
            className={`w-full px-4 py-3 rounded-xl bg-[#0E1020] border ${
              errors.serviceCategory ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-brand-blue'
            } text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
          >
            <option value="">Select a service category...</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other / Integrated Solution">Multiple Services / Integrated Growth</option>
          </select>
          {errors.serviceCategory && (
            <p id="serviceCategory-error" className="mt-1.5 text-xs text-red-400">
              {errors.serviceCategory}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Estimated Budget <span className="text-white/40 text-[11px]">(Optional)</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#0E1020] border border-white/10 focus:border-brand-blue text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
          >
            <option value="">Select budget tier...</option>
            <option value="Under ₹25,000 / $300">Starter (Under ₹25,000 / $300)</option>
            <option value="₹25,000 - ₹50,000 / $300 - $600">Standard (₹25,000 - ₹50,000)</option>
            <option value="₹50,000 - ₹1,50,000 / $600 - $1,800">Growth (₹50,000 - ₹1,50,000)</option>
            <option value="Above ₹1,50,000 / $1,800+">Enterprise (Above ₹1,50,000)</option>
            <option value="Flexible / Needs Discussion">Flexible / Need Proposal</option>
          </select>
        </div>
      </div>

      {/* Row 4: Timeline */}
      <div>
        <label htmlFor="timeline" className="block text-xs font-heading font-semibold text-white/90 mb-2">
          Expected Timeline <span className="text-white/40 text-[11px]">(Optional)</span>
        </label>
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-[#0E1020] border border-white/10 focus:border-brand-blue text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
        >
          <option value="">Select ideal launch timetable...</option>
          <option value="Immediate (< 2 weeks)">Urgent (Within 2 weeks)</option>
          <option value="1 month">Standard (Within 1 month)</option>
          <option value="2-3 months">Comprehensive (2 to 3 months)</option>
          <option value="Flexible">Flexible / Planning stage</option>
        </select>
      </div>

      {/* Row 5: Project Description */}
      <div>
        <label htmlFor="description" className="block text-xs font-heading font-semibold text-white/90 mb-2">
          Project Description & Goals <span className="text-brand-electric">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Briefly tell us about your company, what you want to build or market, and your key expectations..."
          required
          aria-required="true"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
          className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
            errors.description ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-brand-blue'
          } text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all resize-y`}
        />
        {errors.description && (
          <p id="description-error" className="mt-1.5 text-xs text-red-400">
            {errors.description}
          </p>
        )}
      </div>

      {/* Row 6: Privacy Consent Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={formData.privacyConsent}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded border-white/20 text-brand-blue focus:ring-brand-blue bg-white/5"
          />
          <span className="text-xs text-brand-muted leading-relaxed">
            I agree to LetsGoAdGenX contacting me regarding this project proposal. We value your privacy and never sell or distribute your contact information.
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="mt-1 text-xs text-red-400">{errors.privacyConsent}</p>
        )}
      </div>

      {/* Form Submission Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'loading'}
          className="w-full sm:flex-1 justify-center"
          icon={status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        >
          {status === 'loading' ? 'Sending Inquiry...' : 'Submit Project Inquiry'}
        </Button>

        <button
          type="button"
          onClick={handleSendToWhatsApp}
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-sm font-heading font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp Instead</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 pt-2">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-electric" />
        <span>256-bit encrypted submission • Direct response within 24 hours</span>
      </div>
    </form>
  );
};
