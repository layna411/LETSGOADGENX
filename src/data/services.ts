import type { InquiryType } from '../config/contact';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  inquiryType: InquiryType;
  badge: string;
  iconName: string;
  offerings: string[];
  deliverables: string[];
  approach: string[];
  faqs: { q: string; a: string }[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'software-dev',
    slug: 'software-development',
    title: 'Software & App Development',
    badge: 'Mobile & Cloud Systems',
    iconName: 'Code2',
    shortDesc: 'Custom digital products engineered around your business goals.',
    fullDesc: 'We architect and build bespoke software, native and cross-platform mobile apps, and robust cloud platforms. Built for scale, security, and effortless performance as your user base expands.',
    inquiryType: 'app',
    offerings: [
      'Android application development',
      'iOS application development',
      'Web applications & SPAs',
      'Custom enterprise software',
      'Backend and REST/GraphQL API development',
      'AI integrations & LLM endpoints',
      'Database-driven applications',
      'Application maintenance & refactoring',
    ],
    deliverables: [
      'Production-ready application source code',
      'Documented API architecture & Swagger schemas',
      'Automated testing & CI/CD deployment pipelines',
      'Database schema diagrams & backup procedures',
      'App Store & Play Store publication support',
      '30-day post-launch warranty & monitoring',
    ],
    approach: [
      'Technical feasibility analysis and architecture design',
      'Iterative milestone sprints with staging previews',
      'Security-first development adhering to industry best practices',
      'Load-tested deployment on reliable cloud infrastructure',
    ],
    faqs: [
      {
        q: 'Do you develop for both Android and iOS?',
        a: 'Yes! We build cross-platform mobile applications using Flutter or React Native to ship to both platforms efficiently, as well as native code when deep device optimization is required.',
      },
      {
        q: 'How do you handle backend security and authentication?',
        a: 'We implement industry standard protocols including JWT, OAuth 2.0, SSL encryption in transit, hashed secrets, and least-privilege cloud access.',
      },
      {
        q: 'Can you integrate AI capabilities into our existing software?',
        a: 'Yes, we can build custom workflows connecting OpenAI, Anthropic, or custom local LLMs to your data pipelines, customer support tools, or analytical dashboards.',
      },
    ],
  },
  {
    id: 'web-dev',
    slug: 'website-development',
    title: 'Website & Web Development',
    badge: 'High Conversion & Speed',
    iconName: 'Globe',
    shortDesc: 'Fast, responsive websites designed to turn visitors into customers.',
    fullDesc: 'Every website we engineer is custom-built with crisp typography, lightning-fast loading speeds, seamless mobile responsiveness, and clear conversion paths that guide visitors to take action.',
    inquiryType: 'website',
    offerings: [
      'Business websites & corporate portals',
      'High-converting landing pages',
      'Portfolio & creative showcase websites',
      'E-commerce websites & online stores',
      'Dynamic web applications & portals',
      'Admin dashboards & management panels',
      'Website redesign & modernization',
      'Core Web Vitals & performance optimization',
    ],
    deliverables: [
      'Semantic, clean HTML5/CSS/JavaScript codebase',
      'Fully responsive layouts tested across 10+ screen resolutions',
      'On-page SEO setup (meta tags, sitemaps, OpenGraph data)',
      'Integrated contact forms with email/WhatsApp notifications',
      'Lighthouse 90+ speed performance optimization',
      'Hosting configuration & domain SSL setup',
    ],
    approach: [
      'Understanding target customer persona and key conversion actions',
      'Wireframing high-converting visual hierarchy and content layout',
      'Building with clean, lightweight frontend architecture',
      'Cross-browser and mobile device verification before go-live',
    ],
    faqs: [
      {
        q: 'How long does it typically take to launch a business website?',
        a: 'Depending on project scope and content readiness, a high-impact corporate website or landing page typically takes 2 to 4 weeks from discovery to deployment.',
      },
      {
        q: 'Will my website work well on all smartphone screen sizes?',
        a: 'Absolutely. Every site is designed mobile-first and tested from small mobile viewports (320px) up to ultra-wide desktop displays (1600px+).',
      },
      {
        q: 'Do you provide maintenance and updates after launch?',
        a: 'Yes, we provide ongoing maintenance support plans for code updates, security monitoring, and regular content adjustments.',
      },
    ],
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    badge: 'Targeted ROI & Reach',
    iconName: 'TrendingUp',
    shortDesc: 'Reach the right audience with purposeful digital campaigns.',
    fullDesc: 'Data-informed digital campaigns that connect your brand with qualified audiences. We combine technical SEO, targeted paid media, social storytelling, and lead funnels to drive real business metrics.',
    inquiryType: 'marketing',
    offerings: [
      'Social media management & scheduling',
      'Search engine optimization (SEO)',
      'Google advertising (Search, Display, Performance Max)',
      'Meta advertising (Instagram & Facebook Ads)',
      'Content planning & editorial calendars',
      'High-impact campaign creatives',
      'Lead-generation campaigns & sales funnels',
      'Analytics, tracking pixels, and conversion reporting',
    ],
    deliverables: [
      'Full campaign architecture and audience targeting setup',
      'Ad creatives (copy, graphic assets, video cuts)',
      'Conversion tracking setup (Meta Pixel, GA4, Google Tag Manager)',
      'A/B test variations for messaging and visuals',
      'Transparent weekly and monthly performance reports',
    ],
    approach: [
      'Audience research and competitor digital footprint analysis',
      'Creation of targeted value proposition ads and landing experiences',
      'Iterative bid optimization and ad creative rotation',
      'Actionable reporting focused on cost-per-lead and acquisition metrics',
    ],
    faqs: [
      {
        q: 'Do you guarantee number 1 rankings on Google or instant viral sales?',
        a: 'No, we believe in honest business practices. While nobody can ethically guarantee search engine algorithm decisions, we follow proven white-hat SEO and data-driven ad strategies designed to systematically maximize your qualified reach and conversions.',
      },
      {
        q: 'What ad platforms do you specialize in?',
        a: 'We specialize in Meta (Instagram & Facebook) for visual interest and engagement, and Google Ads (Search & Performance Max) for high-intent search queries.',
      },
    ],
  },
  {
    id: 'branding',
    slug: 'graphic-design',
    title: 'Graphic Design & Branding',
    badge: 'Memorable Identity',
    iconName: 'Palette',
    shortDesc: 'Create a visual identity that people recognize and remember.',
    fullDesc: 'Distinctive branding that communicates your company’s values at a glance. From iconic logos and typography to social templates and packaging, we give your business an undeniable presence.',
    inquiryType: 'design',
    offerings: [
      'Logo design & visual brand marks',
      'Complete brand identity systems',
      'Brand style guides & color palettes',
      'Posters, banners, and billboard design',
      'Social media graphics & carousel kits',
      'Brochures, company profiles, and flyers',
      'Digital advertising creatives',
      'Product packaging & print collateral',
    ],
    deliverables: [
      'Vector logo files (.AI, .EPS, .SVG, .PNG, .PDF in all colorways)',
      'Brand identity guidelines document (typography, spacing, do/don\'t)',
      'Ready-to-use social media profile assets and banners',
      'Print-ready CMYK files with bleed margins',
      'Full commercial ownership rights',
    ],
    approach: [
      'Discovery session on company values, vision, and market positioning',
      'Moodboarding visual styles, color psychology, and typography pairings',
      'Developing multiple distinct concept directions',
      'Refining chosen direction with final delivery in all digital/print formats',
    ],
    faqs: [
      {
        q: 'Do I get the source vector files for my logo and designs?',
        a: 'Yes, 100%. Upon project completion, you receive full master vector files (SVG, AI, PDF) along with high-res PNG/JPG files for all web and print uses.',
      },
      {
        q: 'Can you work with our existing brand guidelines?',
        a: 'Absolutely. We can adhere strictly to your existing brand book while creating fresh collateral, marketing graphics, and product UI.',
      },
    ],
  },
  {
    id: 'video-editing',
    slug: 'video-editing',
    title: 'Video Editing & Creative Production',
    badge: 'Dynamic Storytelling',
    iconName: 'Video',
    shortDesc: 'Turn ideas into engaging visual stories.',
    fullDesc: 'High-retention video content crafted for modern digital audiences. We edit short-form vertical videos, YouTube content, product showcases, and kinetic motion graphics designed to hold attention.',
    inquiryType: 'general',
    offerings: [
      'Promotional video editing & brand trailers',
      'Instagram Reels & YouTube Shorts editing',
      'Long-form YouTube video editing',
      'Product demo videos & walkthroughs',
      'Motion graphics & logo animations',
      'Animated promotional social content',
      'Event recap & highlight video editing',
      'High-CTR advertising video creatives',
    ],
    deliverables: [
      'Color graded, sound-designed 4K / 1080p video exports',
      'Vertical 9:16 cuts optimized for Instagram & TikTok',
      'Horizontal 16:9 cuts optimized for YouTube & website heroes',
      'Custom kinetic typography subtitles and visual hooks',
      'Licensed royalty-free music and SFX tracks',
    ],
    approach: [
      'Reviewing raw footage, script, and key narrative points',
      'Pacing and sound design designed to maximize audience watch time',
      'Adding motion graphics, captions, and visual emphasis',
      'Color grading and multi-format export for web and social',
    ],
    faqs: [
      {
        q: 'What format do you need raw footage in?',
        a: 'We accept MP4, MOV, ProRes, or raw camera files via Google Drive, Dropbox, or WeTransfer.',
      },
      {
        q: 'Can you add subtitles and sound effects for viral Reels?',
        a: 'Yes! Dynamic word-by-word animated subtitles, sound design, zoom cuts, and sound effects are standard in our short-form editing packages.',
      },
    ],
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX Design & Prototyping',
    badge: 'Human-Centered Design',
    iconName: 'Layout',
    shortDesc: 'Intuitive user experiences and beautiful digital product designs.',
    fullDesc: 'We bridge user psychology and visual aesthetics. We craft seamless digital products, responsive web apps, and mobile interfaces that feel natural, delightful, and straightforward to use.',
    inquiryType: 'design',
    offerings: [
      'User journey mapping & information architecture',
      'Wireframing & low-fidelity user flow tests',
      'High-fidelity UI mockups in Figma',
      'Interactive clickable prototypes',
      'Comprehensive design systems & token libraries',
      'Mobile app UI design (iOS & Android guidelines)',
      'SaaS dashboard & web app interface design',
      'Design-to-development specification handoff',
    ],
    deliverables: [
      'Figma source file with auto-layout components and variables',
      'Clickable prototype link for stakeholder and user testing',
      'Exportable design tokens (colors, typography, spacing, radii)',
      'Detailed developer handoff notes and asset exports',
    ],
    approach: [
      'User research and core task flow simplification',
      'Systematic layout design with clear visual hierarchy',
      'Prototyping realistic interactions and micro-animations',
      'Developer-friendly component organization for fast implementation',
    ],
    faqs: [
      {
        q: 'Can your UI designs be easily handed off to our developers?',
        a: 'Yes! We build in Figma with strict auto-layout, standardized design tokens, responsive constraints, and clear state variations (default, hover, active, disabled) to ensure seamless engineering handoff.',
      },
    ],
  },
  {
    id: 'photography-production',
    slug: 'photography',
    title: 'Photography & Visual Production',
    badge: 'Professional Photoshoots',
    iconName: 'Camera',
    shortDesc: 'Capturing moments, products, and brands through professional photography that tells your story and elevates your visual identity.',
    fullDesc: 'We deliver end-to-end commercial and artistic photography services—from product and e-commerce shoots to corporate headshots, events, food, architecture, and high-concept brand campaigns.',
    inquiryType: 'photography',
    offerings: [
      'Product Photography (E-commerce & Catalogs)',
      'Brand & Commercial Photography',
      'Corporate Photography & Executive Headshots',
      'Event Photography (Summits, Fests & Conferences)',
      'Portrait Photography & Personal Branding',
      'Fashion & Lifestyle Photography',
      'Food Photography & Restaurant Menus',
      'Social Media Photography & Creative Assets',
      'Real Estate & Interior Photography',
      'Campaign Photography for Billboards & Ads',
    ],
    deliverables: [
      'High-resolution raw image capture with studio lighting setups',
      'Professional color grading & high-end editorial retouching',
      'Print-ready high-DPI masters & lightweight web-optimized cuts',
      'Private cloud proofing & digital delivery archive',
      'Full commercial reproduction & advertising usage rights',
    ],
    approach: [
      'Discuss: Creative brief, visual moodboarding, and shot list',
      'Plan: Location scouting, equipment prep, and schedule lock',
      'Shoot: Professional studio/ambient lighting & high-res capture',
      'Edit & Deliver: Precision color calibration, retouching, and delivery',
    ],
    faqs: [
      {
        q: 'Do you shoot on-location or in-studio?',
        a: 'Both! We can shoot at our studio setups or travel with full portable lighting and equipment to your office, restaurant, event venue, or exterior location.',
      },
      {
        q: 'How fast do we receive the edited photos?',
        a: 'Standard delivery is within 3 to 7 business days. For events and press releases, we provide select same-day or next-day highlight sets.',
      },
    ],
  },
];

export const ALL_COMPANY_SERVICES: string[] = [
  'Software Development',
  'Android & iOS App Development',
  'Website Development',
  'Web Application Development',
  'AI Solutions & API Integration',
  'Digital Marketing',
  'SEO & Social Media Management',
  'Graphic Design',
  'Logo Design & Brand Identity',
  'Poster, Banner & Brochure Design',
  'Video Editing & Motion Graphics',
  'Photography & Professional Photoshoots',
  'UI/UX Design',
  'E-commerce Solutions',
  'Website Maintenance & Technical Support',
];
