export interface IndustryItem {
  name: string;
  desc: string;
  iconName: string;
}

export const INDUSTRIES: IndustryItem[] = [
  {
    name: 'Startups & Tech',
    desc: 'Rapid MVPs, launch landing pages, scalable web platforms, and investor pitch decks.',
    iconName: 'Rocket',
  },
  {
    name: 'Small & Medium Businesses',
    desc: 'Digital modernization, local search visibility, brand revamps, and customer portals.',
    iconName: 'Briefcase',
  },
  {
    name: 'Education & Academics',
    desc: 'Learning management portals, student enrollment funnels, and institutional branding.',
    iconName: 'GraduationCap',
  },
  {
    name: 'Healthcare & Wellness',
    desc: 'Patient appointment systems, clinical landing pages, and accessible digital tools.',
    iconName: 'HeartPulse',
  },
  {
    name: 'Retail & E-Commerce',
    desc: 'High-conversion online storefronts, catalog design, and performance product ads.',
    iconName: 'ShoppingBag',
  },
  {
    name: 'Food & Hospitality',
    desc: 'Restaurant branding, digital interactive menus, visual social media, and local promotions.',
    iconName: 'Utensils',
  },
  {
    name: 'Real Estate & Properties',
    desc: 'Property showcase portals, architectural brochures, and lead-generation ads.',
    iconName: 'Building2',
  },
  {
    name: 'Creators & Personal Brands',
    desc: 'Impactful portfolio hubs, short-form video editing, and merchandise identity.',
    iconName: 'Sparkles',
  },
  {
    name: 'Professional Services',
    desc: 'Clean corporate websites, client intake workflows, and high-trust editorial identity.',
    iconName: 'ShieldCheck',
  },
];
