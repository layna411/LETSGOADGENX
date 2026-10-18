export type PhotographyCategory =
  | 'All'
  | 'Products'
  | 'Portraits'
  | 'Events'
  | 'Corporate'
  | 'Fashion & Lifestyle'
  | 'Food'
  | 'Architecture & Interiors'
  | 'Brand Campaigns';

export interface PhotographyItem {
  id: string;
  title: string;
  category: PhotographyCategory;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string;
  location?: string;
  clientType?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  details: string[];
  deliverables: string[];
  relatedServices: string[];
}

export interface PhotographyServiceOffering {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export const PHOTOGRAPHY_SERVICES: PhotographyServiceOffering[] = [
  {
    id: 'product-photo',
    title: 'Product Photography',
    description: 'Crisp, high-definition product imagery for e-commerce stores, catalogs, advertisements, packaging, and launch campaigns.',
    iconName: 'Package',
    features: [
      'Pure white & dark minimalist backgrounds',
      'Macro detail & material texture shots',
      'Creative contextual lifestyle staging',
      'High-res web & print ready exports',
    ],
  },
  {
    id: 'brand-commercial',
    title: 'Brand & Commercial Photography',
    description: 'Strategic visual content that communicates your company’s story, brand values, and distinct market positioning.',
    iconName: 'Briefcase',
    features: [
      'Campaign storytelling & narrative visuals',
      'Hero imagery for modern website headers',
      'Consistent brand tone & color grading',
      'Digital ad campaign visual assets',
    ],
  },
  {
    id: 'corporate-headshots',
    title: 'Corporate Photography',
    description: 'Executive portraits, leadership headshots, authentic workplace candids, and corporate team culture photography.',
    iconName: 'Users',
    features: [
      'Studio lighting setup on-location',
      'Executive & leadership headshots',
      'Modern collaborative workspace candids',
      'Annual report & company profile imagery',
    ],
  },
  {
    id: 'event-photo',
    title: 'Event Photography',
    description: 'Comprehensive photographic coverage of corporate summits, college fests, galas, product reveals, and conferences.',
    iconName: 'Calendar',
    features: [
      'Full event timeline & keynote coverage',
      'Attendee interactions & VIP stage moments',
      'Rapid next-day press highlight selections',
      'High-resolution complete event archive',
    ],
  },
  {
    id: 'portrait-sessions',
    title: 'Portrait Photography',
    description: 'Individual portraits, professional headshots, creative founder profiles, and personal branding imagery.',
    iconName: 'UserCheck',
    features: [
      'Flattering dynamic studio & natural lighting',
      'Posing guidance for natural expressions',
      'Subtle high-end skin retouching',
      'LinkedIn & editorial publication cuts',
    ],
  },
  {
    id: 'fashion-lifestyle',
    title: 'Fashion & Lifestyle Photography',
    description: 'Apparel lookbooks, model portfolios, urban streetwear shoots, and aspirational lifestyle campaign productions.',
    iconName: 'Sparkles',
    features: [
      'Editorial outdoor & studio setups',
      'Lookbook & e-commerce apparel cataloging',
      'Creative moodboard alignment',
      'Dynamic movement & lifestyle frames',
    ],
  },
  {
    id: 'food-photo',
    title: 'Food Photography',
    description: 'Mouth-watering photography for restaurant menus, artisanal culinary products, cafes, and hospitality campaigns.',
    iconName: 'Utensils',
    features: [
      'Professional food styling & prop setup',
      'Warm atmospheric ambient lighting',
      'Steam, texture, and pour action shots',
      'Optimized formats for digital QR menus & Zomato/Swiggy',
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Photography',
    description: 'Vibrant, thumb-stopping imagery crafted specifically for Instagram grids, Reels thumbnails, and digital engagement.',
    iconName: 'Instagram',
    features: [
      'Vertical 9:16 and 4:5 optimized ratios',
      'Batch content creation for monthly queues',
      'Trend-conscious aesthetic curation',
      'Platform-ready color saturation & pop',
    ],
  },
  {
    id: 'real-estate',
    title: 'Real Estate & Interior Photography',
    description: 'Wide-angle, distortion-free photography for luxury residences, commercial office spaces, and architectural portfolios.',
    iconName: 'Building2',
    features: [
      'HDR balanced exterior & interior windows',
      'Architectural perspective correction',
      'Daylight & twilight ambient capture',
      'Ideal for listings, brochures & websites',
    ],
  },
  {
    id: 'campaign-photo',
    title: 'Campaign Photography',
    description: 'High-concept original photography engineered specifically for billboards, posters, print collateral, and major product pushes.',
    iconName: 'Megaphone',
    features: [
      'Cohesive art direction from script to shoot',
      'Ultra-high megapixel raw capture for print',
      'Cross-department coordination with designers',
      'Commercial advertising usage licensing',
    ],
  },
];

/**
 * Client photography portfolio will be added here one by one.
 * Dummy stock photos have been removed per client request.
 */
export const PHOTOGRAPHY_PORTFOLIO: PhotographyItem[] = [];


export const PHOTOGRAPHY_WORKFLOW = [
  {
    step: '01',
    title: 'Discuss',
    subtitle: 'Vision & Requirements',
    description: 'We meet to understand your shoot requirements, brand personality, moodboard preferences, and exact deliverables needed.',
    deliverables: ['Creative brief review', 'Style moodboard alignment', 'Shoot scope agreement'],
  },
  {
    step: '02',
    title: 'Plan',
    subtitle: 'Logistics & Concept',
    description: 'We confirm the photoshoot schedule, scout/arrange locations, define lighting style, and prepare shot lists with clear milestones.',
    deliverables: ['Sequential shot list', 'Lighting & equipment checklist', 'Location & timing confirmation'],
  },
  {
    step: '03',
    title: 'Shoot',
    subtitle: 'Capturing Every Frame',
    description: 'On shoot day, our team sets up professional lighting, guides subjects/products carefully, and captures high-resolution raw files.',
    deliverables: ['High-resolution RAW capture', 'Live client tethering preview', 'Backup onto dual redundant drives'],
  },
  {
    step: '04',
    title: 'Edit',
    subtitle: 'Color Grade & Retouch',
    description: 'We curate the finest frames, perform precise color grading, skin/product retouching, and custom lighting enhancement.',
    deliverables: ['Professional color grading', 'Delicate retouching & cleanup', 'Staging preview for client feedback'],
  },
  {
    step: '05',
    title: 'Deliver',
    subtitle: 'Finished High-Res Assets',
    description: 'We export your final images in full-resolution print formats and optimized web cuts, delivered via secure private cloud links.',
    deliverables: ['Full-resolution uncompressed master files', 'Web & mobile optimized lightweight formats', 'Full commercial usage rights'],
  },
];

export const PHOTOGRAPHY_FAQS = [
  {
    q: 'Can the photoshoot take place at our office, restaurant, or factory?',
    a: 'Yes! We travel with portable professional studio lighting, strobes, and backdrops to shoot on-location at your office, retail store, restaurant, or chosen venue across India.',
  },
  {
    q: 'How long does post-production and editing take?',
    a: 'Standard editing typically takes 3 to 7 business days depending on the number of images. For urgent press releases or events, we offer rapid same-day or next-day highlight deliveries.',
  },
  {
    q: 'Do we receive full commercial ownership of the photos?',
    a: 'Yes, absolutely. Once final delivery is completed, you receive full commercial rights to use the images across your website, social media, advertisements, billboards, and print collateral.',
  },
  {
    q: 'What camera and lighting equipment do you utilize?',
    a: 'We utilize professional full-frame mirrorless camera systems, high-speed prime and zoom lenses, wireless studio strobes, diffused softboxes, and calibrated color-grading monitors to ensure print-grade color fidelity.',
  },
  {
    q: 'Can you help us with shot lists and moodboards?',
    a: 'Yes! During Stage 01 (Discuss) and Stage 02 (Plan), we assist you in developing detailed moodboards, visual styling references, and comprehensive shot lists so nothing is missed on shoot day.',
  },
];
