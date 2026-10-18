/**
 * Centralized Client & Brand Partner Directory
 * ----------------------------------------------------
 * Store and manage real clients, brand partners, and organizations.
 * To add a new client:
 * 1. Place the logo image (PNG/SVG/WebP/JPG) into `/public/clients/`.
 * 2. Add a new ClientItem entry to the CLIENTS array below.
 */

export interface ClientItem {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  websiteUrl?: string;
  tagline?: string;
  location?: string;
}

export const CLIENTS: readonly ClientItem[] = [
  {
    id: 'jairam-ventures',
    name: 'Jairam Ventures',
    category: 'Enterprise & Diversified Group',
    logoUrl: '/clients/jairam-ventures.png',
    websiteUrl: 'https://jairamventures.com/',
    tagline: 'Building Trust. Creating Opportunities.',
    location: 'India',
  },
  {
    id: 'astra-pg-colive',
    name: 'Astra PG Co-Live',
    category: 'Co-Living & Hospitality',
    logoUrl: '/clients/astra-pg-colive.png',
    websiteUrl: 'https://astrapgcolive.com/',
    tagline: 'Premium Living & Hospitality Spaces',
    location: 'Chennai, India',
  },
  {
    id: 'sparkle-bridal-studio',
    name: 'Sparkle Bridal Studio',
    category: 'Bridal Studio & Salon Academy',
    logoUrl: '/clients/sparkle-bridal-studio.jpg',
    tagline: 'Salon & Professional Training Academy',
    location: 'India',
  },
  {
    id: 'ks-physio-care',
    name: 'KS Physio Care',
    category: 'Healthcare & Physiotherapy',
    logoUrl: '/clients/ks-physio-care.png',
    tagline: 'Move Better • Feel Better • Live Better',
    location: 'India',
  },
  {
    id: 'pr3',
    name: 'PR3',
    category: 'Brand & Commercial Venture',
    logoUrl: '/clients/pr3.png',
    tagline: 'Strength & Professional Excellence',
    location: 'India',
  },
  {
    id: 'kpn-engineers',
    name: 'KPN Blue Tooth Engineers',
    category: 'Engineering & Construction',
    logoUrl: '/clients/kpn-engineers.png',
    tagline: 'Water Proofing & Engineering Solutions',
    location: 'India',
  },
  {
    id: 'yazhini-beauty-parlour',
    name: 'Yazhini Beauty Parlour',
    category: 'Beauty, Bridal & Training',
    logoUrl: '/clients/yazhini-beauty-parlour.png',
    tagline: 'Professional Bridal & Aesthetic Care',
    location: 'Perambalur, India',
  },
  {
    id: 'dhanalakshmi-driving-school',
    name: 'Dhanalakshmi Driving School',
    category: 'Automobile & Driver Training',
    logoUrl: '/clients/dhanalakshmi-driving-school.jpg',
    tagline: 'Safe Journeys, Prosperous Futures',
    location: 'Tamil Nadu, India',
  },
  {
    id: 'astraa-global-school',
    name: 'Astraa Global School',
    category: 'Education & Institutional',
    logoUrl: '/clients/astraa-global-school.png',
    tagline: 'Reach for the Stars',
    location: 'India',
  },
  {
    id: 'sr-food-court',
    name: 'S.R Food Court',
    category: 'Food, Dining & Catering',
    logoUrl: '/clients/sr-food-court.png',
    tagline: 'Indian • Chinese • Briyani',
    location: 'India',
  },
] as const;
