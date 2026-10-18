export interface PhoneContact {
  label: string;
  display: string;
  raw: string;
  isPrimary?: boolean;
}

export interface SocialLink {
  id: 'linkedin' | 'x' | 'instagram' | 'facebook';
  name: string;
  handle: string;
  url: string;
  ariaLabel: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'letsgoadgenx',
    url: 'https://www.linkedin.com/in/letsgoadgenx/',
    ariaLabel: 'Connect with LetsGoAdGenX on LinkedIn',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@letsgoadgenx',
    url: 'https://x.com/letsgoadgenx',
    ariaLabel: 'Follow LetsGoAdGenX on X (Twitter)',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@letsgoadgenx',
    url: 'https://www.instagram.com/letsgoadgenx/',
    ariaLabel: 'Follow LetsGoAdGenX on Instagram',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'letsgoadgenx',
    url: 'https://www.facebook.com/letsgoadgenx/',
    ariaLabel: 'Follow LetsGoAdGenX on Facebook',
  },
] as const;

export const CONTACT_INFO = {
  companyName: 'LetsGoAdGenX',
  brandName: 'ADGEN-X',
  email: 'letsgoadgenx@gmail.com',
  phones: [
    {
      label: 'Primary & WhatsApp',
      display: '+91 90801 04624',
      raw: '+919080104624',
      digitsOnly: '919080104624',
      isPrimary: true,
    },
    {
      label: 'Direct Line',
      display: '+91 79045 05060',
      raw: '+917904505060',
      digitsOnly: '917904505060',
      isPrimary: false,
    },
    {
      label: 'Support & Inquiries',
      display: '+91 63742 58264',
      raw: '+916374258264',
      digitsOnly: '916374258264',
      isPrimary: false,
    },
  ],
  whatsappNumber: '919080104624',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/letsgoadgenx/',
    x: 'https://x.com/letsgoadgenx',
    instagram: 'https://www.instagram.com/letsgoadgenx/',
    facebook: 'https://www.facebook.com/letsgoadgenx/',
  },
  tagline: 'BUILD. BRAND. GROW.',
  supportingTagline: 'Your Vision. Our Creativity. Your Growth.',
  headline: 'We Build Digital Experiences That Grow Businesses.',
  description: 'From powerful software and stunning websites to memorable branding and strategic digital marketing, we turn your ideas into meaningful digital experiences.',
} as const;

export type InquiryType = 'general' | 'website' | 'app' | 'design' | 'marketing' | 'photography';

export const WHATSAPP_MESSAGES: Record<InquiryType, string> = {
  general: 'Hi LetsGoAdGenX! I would like to discuss a project. Please share the next steps.',
  website: 'Hi LetsGoAdGenX! I am interested in website development.',
  app: 'Hi LetsGoAdGenX! I am interested in mobile or web application development.',
  design: 'Hi LetsGoAdGenX! I am interested in graphic design and branding services.',
  marketing: 'Hi LetsGoAdGenX! I would like to discuss digital marketing services.',
  photography: 'Hi LetsGoAdGenX! I am interested in booking a professional photography session. Please share your services and availability.',
};

/**
 * Generates a safe WhatsApp redirect link with prefilled URL-encoded message
 */
export function getWhatsAppUrl(type: InquiryType = 'general', customMessage?: string): string {
  const text = customMessage || WHATSAPP_MESSAGES[type];
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encoded}`;
}

export function getMailtoUrl(subject = 'Project Inquiry - LetsGoAdGenX'): string {
  return `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}`;
}
