/**
 * Centralized Technical SEO & Search Engine Optimization Configuration
 * LetsGoAdGenX (ADGEN-X)
 */

export const SITE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
  'https://letsgo-adgenx.web.app';

export const COMPANY_INFO = {
  name: 'LetsGoAdGenX',
  legalName: 'LetsGoAdGenX',
  brandName: 'ADGEN-X',
  email: 'letsgoadgenx@gmail.com',
  whatsappNumber: '919080104624',
  whatsappUrl: 'https://wa.me/919080104624',
  phones: ['+91 90801 04624', '+91 79045 05060', '+91 63742 58264'],
  phonesRaw: ['+919080104624', '+917904505060', '+916374258264'],
  logoUrl: `${SITE_URL}/adgenx-logo.png`,
  ogImageUrl: `${SITE_URL}/og-preview.jpg`,
  locale: 'en_US',
  themeColor: '#080914',
  areaServed: ['India', 'Global'],
};

/**
 * Keyword Groups organized by discipline and service offering
 */
export const KEYWORD_GROUPS = {
  coreBrand: [
    'LetsGoAdGenX',
    'ADGEN-X',
    'LetsGo AdGenX',
    'Technology and Creative Agency',
    'Digital Product Studio',
  ],
  softwareDevelopment: [
    'Software development',
    'Custom software development',
    'Software development services',
    'Business software solutions',
    'Custom application development',
    'AI solutions and API integration',
  ],
  websiteDevelopment: [
    'Website development',
    'Website development services',
    'Business website development',
    'Responsive website design',
    'Landing page development',
    'E-commerce website development',
  ],
  mobileAppDevelopment: [
    'Mobile app development',
    'Android app development',
    'iOS app development',
    'Mobile application development',
    'Cross-platform app development',
  ],
  digitalMarketing: [
    'Digital marketing',
    'Digital marketing services',
    'Social media marketing',
    'Search engine optimization',
    'Online advertising',
    'Lead generation marketing',
  ],
  graphicDesign: [
    'Graphic design and branding',
    'Graphic design services',
    'Logo design',
    'Brand identity design',
    'Poster design',
    'Social media post design',
    'Brochure and banner design',
  ],
  videoEditing: [
    'Video editing',
    'Professional video editing',
    'Promotional video editing',
    'Reels editing',
    'Motion graphics',
    'Advertising video production',
  ],
  photography: [
    'Photography',
    'Professional photography',
    'Product photography',
    'Corporate photography',
    'Event photography',
    'Portrait photography',
    'Brand photography',
  ],
  uiUxAndEcommerce: [
    'UI/UX and e-commerce',
    'UI/UX design services',
    'Web application interface design',
    'E-commerce development',
    'Online store development',
  ],
};

export interface PageMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
}

/**
 * Route-Specific Metadata Registry
 */
export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'LetsGoAdGenX | Software Development, Design & Digital Marketing',
    description:
      'LetsGoAdGenX helps businesses build websites, mobile apps, custom software, strong brand identities, creative designs, and digital marketing campaigns.',
    canonicalPath: '/',
    keywords: [
      ...KEYWORD_GROUPS.coreBrand,
      ...KEYWORD_GROUPS.softwareDevelopment.slice(0, 3),
      ...KEYWORD_GROUPS.websiteDevelopment.slice(0, 3),
      ...KEYWORD_GROUPS.digitalMarketing.slice(0, 3),
    ],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  services: {
    title: 'Digital Services Directory | Software, Design & Marketing | LetsGoAdGenX',
    description:
      'Explore full-service digital capabilities: custom software, mobile apps, modern websites, graphic branding, video editing, and performance digital marketing.',
    canonicalPath: '/services',
    keywords: [
      'Digital services directory',
      'Full service digital agency',
      'Software development services',
      'Website development services',
      'Digital marketing services',
      'Graphic design services',
    ],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  'service-software-development': {
    title: 'Custom Software & Mobile App Development Services | LetsGoAdGenX',
    description:
      'Custom software development, Android and iOS mobile applications, API integrations, and scalable business software solutions engineered for performance.',
    canonicalPath: '/services/software-development',
    keywords: [
      ...KEYWORD_GROUPS.softwareDevelopment,
      ...KEYWORD_GROUPS.mobileAppDevelopment,
    ],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  'service-website-development': {
    title: 'Business Website & E-commerce Development Services | LetsGoAdGenX',
    description:
      'Fast, responsive website development services, high-converting landing pages, e-commerce stores, and custom web portals built for business growth.',
    canonicalPath: '/services/website-development',
    keywords: [
      ...KEYWORD_GROUPS.websiteDevelopment,
      ...KEYWORD_GROUPS.uiUxAndEcommerce,
    ],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  'service-digital-marketing': {
    title: 'Digital Marketing, SEO & Social Media Services | LetsGoAdGenX',
    description:
      'Targeted digital marketing services, search engine optimization, Google Ads, Meta advertising, and lead generation campaigns designed for measurable ROI.',
    canonicalPath: '/services/digital-marketing',
    keywords: [...KEYWORD_GROUPS.digitalMarketing],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  'service-graphic-design': {
    title: 'Graphic Design, Logo & Brand Identity Design Services | LetsGoAdGenX',
    description:
      'Distinctive brand identity design, logo creation, marketing collateral, social media posts, posters, brochures, and visual design assets that stand out.',
    canonicalPath: '/services/graphic-design',
    keywords: [...KEYWORD_GROUPS.graphicDesign],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  'service-video-editing': {
    title: 'Professional Video Editing & Motion Graphics Services | LetsGoAdGenX',
    description:
      'High-impact video editing, Instagram Reels, YouTube cuts, promotional commercials, brand trailers, and motion graphics production.',
    canonicalPath: '/services/video-editing',
    keywords: [...KEYWORD_GROUPS.videoEditing],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  'service-ui-ux-design': {
    title: 'UI/UX Design & Web Application Interface Design | LetsGoAdGenX',
    description:
      'Human-centered UI/UX design services, interactive prototypes, design systems, and web application interface design built for intuitive user engagement.',
    canonicalPath: '/services/ui-ux-design',
    keywords: [...KEYWORD_GROUPS.uiUxAndEcommerce],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  photography: {
    title: 'Professional Photography & Visual Production Services | LetsGoAdGenX',
    description:
      'Professional product photography, corporate shoots, portrait sessions, event coverage, and brand campaign visual production.',
    canonicalPath: '/services/photography',
    keywords: [...KEYWORD_GROUPS.photography],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  work: {
    title: 'Our Work & Selected Case Studies | LetsGoAdGenX Portfolio',
    description:
      'Explore digital products, brand identities, websites, and creative campaigns built by LetsGoAdGenX for businesses, startups, and institutions.',
    canonicalPath: '/work',
    keywords: [
      'LetsGoAdGenX portfolio',
      'Client case studies',
      'Website portfolio',
      'App development examples',
      'Design explorations',
    ],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  about: {
    title: 'About Us | Unified Creative & Technology Partner | LetsGoAdGenX',
    description:
      'Learn about LetsGoAdGenX (ADGEN-X) — an integrated digital partner bridging engineering rigor, brand design, and measurable customer acquisition.',
    canonicalPath: '/about',
    keywords: [
      'About LetsGoAdGenX',
      'ADGEN-X creative team',
      'Technology partner India',
      'Digital agency mission and vision',
    ],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  process: {
    title: 'Our Process | Transparent Discovery to Deployment | LetsGoAdGenX',
    description:
      'Discover our 5-phase delivery process: Discovery, Architecture & Design, Sprint Development, Quality Assurance, and Supported Deployment.',
    canonicalPath: '/process',
    keywords: [
      'Development process',
      'Agile delivery workflow',
      'Project roadmap',
      'Transparent client communication',
    ],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  contact: {
    title: 'Contact LetsGoAdGenX | Start a Digital Project Today',
    description:
      'Get in touch with LetsGoAdGenX for software development, websites, mobile apps, branding, or marketing. Instant inquiry via WhatsApp and direct contact.',
    canonicalPath: '/contact',
    keywords: [
      'Contact LetsGoAdGenX',
      'Hire software developers',
      'Start a website project',
      'WhatsApp digital agency inquiry',
    ],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  privacy: {
    title: 'Privacy Policy | LetsGoAdGenX',
    description:
      'Our commitment to privacy, data transparency, and security regarding client communications and service delivery.',
    canonicalPath: '/privacy',
    keywords: ['Privacy policy', 'Data security', 'LetsGoAdGenX privacy'],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
  terms: {
    title: 'Terms of Service | LetsGoAdGenX',
    description:
      'Terms of service, project delivery standards, intellectual property ownership, and service agreements with LetsGoAdGenX.',
    canonicalPath: '/terms',
    keywords: ['Terms of service', 'Service agreement', 'LetsGoAdGenX terms'],
    ogImage: `${SITE_URL}/og-preview.jpg`,
    ogType: 'website',
  },
};

/**
 * Generates Organization Schema (JSON-LD)
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_INFO.name,
    alternateName: COMPANY_INFO.brandName,
    url: SITE_URL,
    logo: COMPANY_INFO.logoUrl,
    image: COMPANY_INFO.ogImageUrl,
    description:
      'A technology, creative design, and digital growth company helping startups, businesses, and institutions transform ideas into digital products and powerful brands.',
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phonesRaw,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_INFO.phonesRaw[0],
        contactType: 'sales & customer support',
        availableLanguage: ['en', 'ta'],
      },
    ],
    areaServed: COMPANY_INFO.areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Professional Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Software & Mobile Application Development',
            url: `${SITE_URL}/services/software-development`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website & Web Application Development',
            url: `${SITE_URL}/services/website-development`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing & Search Engine Optimization',
            url: `${SITE_URL}/services/digital-marketing`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Graphic Design & Brand Identity',
            url: `${SITE_URL}/services/graphic-design`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Professional Video Editing & Motion Graphics',
            url: `${SITE_URL}/services/video-editing`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Photography & Visual Production',
            url: `${SITE_URL}/services/photography`,
          },
        },
      ],
    },
  };
}

/**
 * Generates WebSite Schema (JSON-LD)
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY_INFO.name,
    alternateName: COMPANY_INFO.brandName,
    description:
      'LetsGoAdGenX helps businesses build websites, mobile apps, custom software, strong brand identities, creative designs, and digital marketing campaigns.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * Generates BreadcrumbList Schema (JSON-LD)
 */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
