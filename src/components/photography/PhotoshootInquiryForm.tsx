import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, MessageCircle, Calendar, MapPin, Clock, Camera } from 'lucide-react';
import { Button } from '../ui/Button';
import { CONTACT_INFO, getWhatsAppUrl } from '../../config/contact';

interface PhotoshootFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  shootDate: string;
  location: string;
  duration: string;
  indoorOutdoor: string;
  budget: string;
  projectDetails: string;
  botcheck: string;
}

interface PhotoshootInquiryFormProps {
  initialService?: string;
  onSuccess?: () => void;
}

export const PhotoshootInquiryForm: React.FC<PhotoshootInquiryFormProps> = ({
  initialService = '',
}) => {
  const [formData, setFormData] = useState<PhotoshootFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceRequired: initialService || 'Product Shoot',
    shootDate: '',
    location: '',
    duration: 'Half Day (4 Hours)',
    indoorOutdoor: 'Studio / Controlled Environment',
    budget: '',
    projectDetails: '',
    botcheck: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const serviceOptions = [
    'Product Shoot',
    'Portrait Session',
    'Corporate Photography',
    'Event Coverage',
    'Fashion & Lifestyle',
    'Food Photography',
    'Real Estate & Interiors',
    'Brand Campaign',
    'Other',
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number for shoot coordination.';
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select the photography service required.';
    }

    if (!formData.projectDetails.trim() || formData.projectDetails.trim().length < 10) {
      newErrors.projectDetails = 'Please provide brief details about your shoot (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (formData.botcheck) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      if (accessKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Photoshoot Booking Inquiry: ${formData.serviceRequired} (${formData.fullName})`,
            from_name: 'LetsGoAdGenX Photography Desk',
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            service_required: formData.serviceRequired,
            preferred_date: formData.shootDate || 'Not specified',
            location: formData.location || 'To be determined',
            duration: formData.duration,
            environment: formData.indoorOutdoor,
            budget: formData.budget || 'Flexible',
            message: formData.projectDetails,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus('success');
          setFeedbackMessage(
            'Your photoshoot request has been recorded. Our creative producer will contact you within 24 hours to confirm date availability, shot lists, and location details.'
          );
        } else {
          throw new Error(result.message || 'Submission error');
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStatus('success');
        setFeedbackMessage(
          'Inquiry captured! You can also connect directly via WhatsApp to verify availability for your preferred date.'
        );
      }
    } catch (err: unknown) {
      setStatus('error');
      setFeedbackMessage(
        err instanceof Error
          ? err.message
          : 'Could not send inquiry at this time. Please message our photography team directly via WhatsApp or phone.'
      );
    }
  };

  const handleSendToWhatsApp = () => {
    const summary = `*Photoshoot Booking Inquiry - LetsGoAdGenX*%0A%0A*Name:* ${encodeURIComponent(formData.fullName || 'Not provided')}%0A*Phone:* ${encodeURIComponent(formData.phone || 'Not provided')}%0A*Service:* ${encodeURIComponent(formData.serviceRequired)}%0A*Preferred Date:* ${encodeURIComponent(formData.shootDate || 'Flexible')}%0A*Location:* ${encodeURIComponent(formData.location || 'To be discussed')}%0A*Duration:* ${encodeURIComponent(formData.duration)}%0A*Setting:* ${encodeURIComponent(formData.indoorOutdoor)}%0A*Budget:* ${encodeURIComponent(formData.budget || 'Standard')}%0A*Details:* ${encodeURIComponent(formData.projectDetails || 'Discuss creative concept.')}`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${summary}`, '_blank', 'noopener,noreferrer');
  };

  if (status === 'success') {
    return (
      <div className="p-8 sm:p-12 rounded-3xl glass-card border border-brand-violet/30 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
          Photoshoot Inquiry Submitted!
        </h3>

        <p className="text-sm sm:text-base text-brand-muted max-w-lg mx-auto font-body leading-relaxed">
          {feedbackMessage}
        </p>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-brand-lavender/90 max-w-md mx-auto">
          <em>Note:</em> A photoshoot booking is confirmed once shoot dates, studio/location access, and deliverables are formally agreed.
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleSendToWhatsApp}
            variant="whatsapp"
            icon={<MessageCircle className="w-4 h-4" />}
          >
            Confirm Date Faster on WhatsApp
          </Button>

          <Button
            onClick={() => {
              setStatus('idle');
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                serviceRequired: 'Product Shoot',
                shootDate: '',
                location: '',
                duration: 'Half Day (4 Hours)',
                indoorOutdoor: 'Studio / Controlled Environment',
                budget: '',
                projectDetails: '',
                botcheck: '',
              });
            }}
            variant="secondary"
          >
            Submit Another Request
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

      {/* Row 1: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="photo-fullName" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Your Name <span className="text-brand-electric">*</span>
          </label>
          <input
            type="text"
            id="photo-fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Sarah Jenkins"
            required
            className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
              errors.fullName ? 'border-red-400' : 'border-white/10 focus:border-brand-blue'
            } text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
          />
          {errors.fullName && <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="photo-phone" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Phone Number <span className="text-brand-electric">*</span>
          </label>
          <input
            type="tel"
            id="photo-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 90801 04624"
            required
            className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
              errors.phone ? 'border-red-400' : 'border-white/10 focus:border-brand-blue'
            } text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
        </div>
      </div>

      {/* Row 2: Email & Photography Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="photo-email" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Email Address <span className="text-brand-electric">*</span>
          </label>
          <input
            type="email"
            id="photo-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="sarah@example.com"
            required
            className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
              errors.email ? 'border-red-400' : 'border-white/10 focus:border-brand-blue'
            } text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="photo-service" className="block text-xs font-heading font-semibold text-white/90 mb-2">
            Photography Service Required <span className="text-brand-electric">*</span>
          </label>
          <select
            id="photo-service"
            name="serviceRequired"
            value={formData.serviceRequired}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#0E1020] border border-white/10 focus:border-brand-blue text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
          >
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Shoot Date & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="photo-date" className="block text-xs font-heading font-semibold text-white/90 mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-electric" /> Preferred Shoot Date
          </label>
          <input
            type="date"
            id="photo-date"
            name="shootDate"
            value={formData.shootDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#0E1020] border border-white/10 focus:border-brand-blue text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
          />
        </div>

        <div>
          <label htmlFor="photo-location" className="block text-xs font-heading font-semibold text-white/90 mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-violet" /> Shoot Location / City
          </label>
          <input
            type="text"
            id="photo-location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. In-studio or client office (City, State)"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-brand-blue text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
          />
        </div>
      </div>

      {/* Row 4: Duration & Setting Preference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="photo-duration" className="block text-xs font-heading font-semibold text-white/90 mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-electric" /> Estimated Duration
          </label>
          <select
            id="photo-duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#0E1020] border border-white/10 focus:border-brand-blue text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
          >
            <option value="Mini Session (1-2 Hours)">Mini Session (1-2 Hours)</option>
            <option value="Half Day (4 Hours)">Half Day (4 Hours)</option>
            <option value="Full Day (8 Hours)">Full Day (8 Hours)</option>
            <option value="Multi-Day Production">Multi-Day Production</option>
            <option value="To Be Determined">To Be Determined</option>
          </select>
        </div>

        <div>
          <label htmlFor="photo-setting" className="block text-xs font-heading font-semibold text-white/90 mb-2 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-brand-lavender" /> Setting Preference
          </label>
          <select
            id="photo-setting"
            name="indoorOutdoor"
            value={formData.indoorOutdoor}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#0E1020] border border-white/10 focus:border-brand-blue text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
          >
            <option value="Studio / Controlled Environment">Studio / Controlled Lighting</option>
            <option value="On-Location (Office / Restaurant / Store)">On-Location (Client Venue)</option>
            <option value="Outdoor Natural Lighting">Outdoor Natural Lighting</option>
            <option value="Mixed (Indoor & Outdoor)">Mixed (Indoor & Outdoor)</option>
          </select>
        </div>
      </div>

      {/* Row 5: Project Details */}
      <div>
        <label htmlFor="photo-details" className="block text-xs font-heading font-semibold text-white/90 mb-2">
          Shoot Concept & Details <span className="text-brand-electric">*</span>
        </label>
        <textarea
          id="photo-details"
          name="projectDetails"
          rows={4}
          value={formData.projectDetails}
          onChange={handleChange}
          placeholder="Describe your subject (e.g. 15 cosmetic products, 8 team members headshots, 1-day tech conference), visual style expectations, and intended usage..."
          required
          className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
            errors.projectDetails ? 'border-red-400' : 'border-white/10 focus:border-brand-blue'
          } text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
        />
        {errors.projectDetails && (
          <p className="mt-1.5 text-xs text-red-400">{errors.projectDetails}</p>
        )}
      </div>

      {/* Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'loading'}
          className="w-full sm:flex-1 justify-center"
          icon={status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        >
          {status === 'loading' ? 'Submitting Details...' : 'Request Photoshoot Proposal'}
        </Button>

        <a
          href={getWhatsAppUrl('photography')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-sm font-heading font-semibold inline-flex items-center justify-center gap-2 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>

      <div className="text-[11px] text-white/40 text-center">
        Dates and production schedules are confirmed upon mutual agreement of creative scope.
      </div>
    </form>
  );
};
