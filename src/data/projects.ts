export type ProjectCategory = 
  | 'All'
  | 'Websites' 
  | 'Mobile Applications' 
  | 'Web Applications' 
  | 'Branding' 
  | 'Graphic Design' 
  | 'Video and Marketing';

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  tag: 'Concept Project' | 'Design Exploration';
  oneLiner: string;
  overview: string;
  objectives: string[];
  deliverables: string[];
  techStack: string[];
  gradientTheme: string;
  accentColor: string;
  mockupType: 'browser' | 'mobile' | 'dashboard' | 'brand' | 'video';
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'lumina-commerce',
    slug: 'lumina-luxury-ecommerce',
    name: 'Lumina Living — Luxury E-Commerce',
    category: 'Websites',
    tag: 'Concept Project',
    oneLiner: 'High-speed minimalist e-commerce storefront with immersive editorial product views.',
    overview: 'A concept exploration for a premium lifestyle and interior decor brand. Built with a focus on sub-second page transitions, dynamic cart drawers, and editorial typography that lets product photography shine.',
    objectives: [
      'Create an elevated luxury aesthetic emphasizing craft and material quality',
      'Optimize the checkout flow to reduce cart abandonment on mobile devices',
      'Achieve sub-second page load times with headless e-commerce architecture',
    ],
    deliverables: [
      'Full responsive e-commerce storefront UI',
      'Product listing & detail page templates with variant pickers',
      'Interactive cart drawer & micro-animations',
      'Design token system and typography hierarchy',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shopify Storefront API', 'Framer Motion'],
    gradientTheme: 'from-[#141B36] to-[#0A0D1A]',
    accentColor: '#38BDF8',
    mockupType: 'browser',
  },
  {
    id: 'vitalpulse-health',
    slug: 'vitalpulse-healthcare-app',
    name: 'VitalPulse — Preventive Health Companion',
    category: 'Mobile Applications',
    tag: 'Design Exploration',
    oneLiner: 'Intuitive iOS & Android app concept for tracking biometric health vitals and appointment schedules.',
    overview: 'An empathetic mobile design exploration crafted to make personal health management accessible and calm rather than overwhelming. Features daily wellness checks, telehealth video access, and medication notifications.',
    objectives: [
      'Transform complex clinical biometric data into digestible visual summaries',
      'Ensure high contrast and accessibility compliance for senior users',
      'Design rapid one-tap telehealth consultation booking',
    ],
    deliverables: [
      'Mobile UX flows across 45+ screens in Figma',
      'Interactive mobile prototype demonstrating appointment bookings',
      'Comprehensive iOS Human Interface Guideline asset kit',
      'React Native component skeleton',
    ],
    techStack: ['Flutter', 'Dart', 'Figma', 'Firebase', 'HealthKit API'],
    gradientTheme: 'from-[#1D1338] to-[#0D091A]',
    accentColor: '#8B5CF6',
    mockupType: 'mobile',
  },
  {
    id: 'nexus-analytics',
    slug: 'nexus-saas-dashboard',
    name: 'NexusFlow — Business Analytics Dashboard',
    category: 'Web Applications',
    tag: 'Concept Project',
    oneLiner: 'Real-time telemetry and revenue intelligence web application with configurable widgets.',
    overview: 'A web app concept engineered for SaaS operators. Consolidates subscription revenue metrics, churn predictions, and customer acquisition channels into interactive dark-mode visualizations.',
    objectives: [
      'Consolidate multi-channel revenue data into a responsive single-pane view',
      'Allow custom drag-and-drop widget prioritization for executive users',
      'Maintain sub-100ms render speeds across data sets with 50,000+ data points',
    ],
    deliverables: [
      'Full web application frontend architecture',
      'Real-time data visualization charts with custom tooltips',
      'Custom themeable dark-mode UI kit',
      'Role-based permission view controllers',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Zustand'],
    gradientTheme: 'from-[#0F1E36] to-[#08101E]',
    accentColor: '#4263FF',
    mockupType: 'dashboard',
  },
  {
    id: 'aurora-bistro',
    slug: 'aurora-artisan-branding',
    name: 'Aurora Artisan — Hospitality & Dining Identity',
    category: 'Branding',
    tag: 'Design Exploration',
    oneLiner: 'Warm, memorable brand identity system for an artisan cafe and culinary roastery.',
    overview: 'A complete branding exploration blending contemporary European minimalism with organic, tactile warmth. Spans custom wordmark design, color palette, packaging labels, and digital menus.',
    objectives: [
      'Craft an iconic, timeless visual mark suited for physical signage and packaging',
      'Develop cohesive packaging labels for bean bags and takeaway merchandise',
      'Design responsive digital QR menus optimized for instant mobile browsing',
    ],
    deliverables: [
      'Primary, secondary, and badge logo variations in vector formats',
      'Brand guideline book including typography rules and color codes',
      'Takeaway cup, packaging pouch, and uniform mockups',
      'Mobile web menu template',
    ],
    techStack: ['Adobe Illustrator', 'Figma', 'Vector Asset System', 'Print CMYK Standards'],
    gradientTheme: 'from-[#2E1838] to-[#140A1A]',
    accentColor: '#B7A0FF',
    mockupType: 'brand',
  },
  {
    id: 'horizon-growth-campaign',
    slug: 'horizon-performance-marketing',
    name: 'Horizon FinTech — Acquisition & Ads Suite',
    category: 'Video and Marketing',
    tag: 'Concept Project',
    oneLiner: 'Multi-channel digital ad campaign with high-retention video creatives and landing funnels.',
    overview: 'A comprehensive growth marketing concept testing short-form video hooks, carousel ad variants, and intent-focused search ads for a personal finance platform.',
    objectives: [
      'Develop 6 distinct video hook variations for TikTok and Instagram Reels',
      'Design high-converting carousel ad graphics detailing feature comparisons',
      'Map full user journey from initial ad click to verified account setup',
    ],
    deliverables: [
      '12 high-converting ad creative banners (feed & story formats)',
      '3 motion-graphic promotional short video concepts',
      'Targeting strategy matrix and funnel conversion map',
      'A/B tested headline and copy variations',
    ],
    techStack: ['After Effects', 'Premiere Pro', 'Meta Ads Manager', 'Figma', 'Google Ads'],
    gradientTheme: 'from-[#0E2638] to-[#07131D]',
    accentColor: '#38BDF8',
    mockupType: 'video',
  },
  {
    id: 'apex-venture-landing',
    slug: 'apex-venture-landing',
    name: 'Apex AI — Early-Stage Seed Landing Page',
    category: 'Websites',
    tag: 'Concept Project',
    oneLiner: 'High-impact product landing page with interactive 3D particle accents and investor deck access.',
    overview: 'A concept landing page designed to build immediate credibility for an early-stage artificial intelligence startup raising capital and attracting top developer talent.',
    objectives: [
      'Communicate an ambitious, future-forward value proposition in seconds',
      'Incorporate interactive product demos directly into the hero experience',
      'Facilitate seamless email waitlist signups and investor deck requests',
    ],
    deliverables: [
      'Modern dark-mode landing page with subtle interactive lighting',
      'Interactive API code playground mockup',
      'Integrated waitlist lead capture with immediate validation',
      'Lighthouse 98 performance score architecture',
    ],
    techStack: ['Vite', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    gradientTheme: 'from-[#191638] to-[#090818]',
    accentColor: '#8B5CF6',
    mockupType: 'browser',
  },
  {
    id: 'strata-brand-system',
    slug: 'strata-brand-system',
    name: 'Strata Studio — Geometric Identity & Collateral',
    category: 'Graphic Design',
    tag: 'Design Exploration',
    oneLiner: 'Bold geometric poster series, business collateral, and digital asset kit for an architectural practice.',
    overview: 'A graphic design exploration examining the intersection of architectural structure and grid-based poster layouts, typography, and company print brochures.',
    objectives: [
      'Develop a stark, confident visual language using architectural grid lines',
      'Design high-contrast presentation decks and project proposals',
      'Create social media graphic templates for architectural photography',
    ],
    deliverables: [
      'Set of 5 exhibition poster artworks and vector layouts',
      'Stationery suite: business cards, letterhead, and project folders',
      'Social media promotional template grid in Figma',
      'Comprehensive typographic style guide',
    ],
    techStack: ['Adobe Illustrator', 'InDesign', 'Photoshop', 'Typography Grids'],
    gradientTheme: 'from-[#1E1738] to-[#0A0717]',
    accentColor: '#B7A0FF',
    mockupType: 'brand',
  },
  {
    id: 'learnsphere-portal',
    slug: 'learnsphere-educational-portal',
    name: 'LearnSphere — Interactive Learning Platform',
    category: 'Web Applications',
    tag: 'Concept Project',
    oneLiner: 'Modern web application for interactive skill certifications, progress tracking, and video lessons.',
    overview: 'An educational web platform concept designed for remote upskilling. Includes modular course video players, interactive code quizzes, progress metrics, and downloadable certificates.',
    objectives: [
      'Structure clean chapter navigation alongside video streaming',
      'Design gamified progress badges and milestone completion certificates',
      'Build seamless lesson bookmarking and resource file downloads',
    ],
    deliverables: [
      'Full student portal web app UI with responsive desktop and tablet layouts',
      'Interactive quiz component with immediate score feedback',
      'Dark/light mode toggle with accessible contrast ratios',
      'Instructor analytics dashboard overview',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'HTML5 Video API'],
    gradientTheme: 'from-[#11243B] to-[#08121E]',
    accentColor: '#38BDF8',
    mockupType: 'dashboard',
  },
];
