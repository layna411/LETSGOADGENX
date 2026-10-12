export interface NavItem {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: 'LetsGoAdGenX',
  brand: 'ADGEN-X',
  tagline: 'BUILD. BRAND. GROW.',
  announcement: 'Your next digital idea starts here.',
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Photography', href: '/services/photography' },
    { label: 'Our Work', href: '/work' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/process' },
    { label: 'Contact', href: '/contact' },
  ],
  capabilities: [
    { label: 'Digital Products', desc: 'Web & mobile applications built to scale' },
    { label: 'Creative Identity', desc: 'Distinctive visual branding & graphic design' },
    { label: 'Business Growth', desc: 'Performance digital marketing & search visibility' },
  ],
  disciplines: [
    {
      title: 'Build',
      subtitle: 'Modern Engineering',
      desc: 'High-performance software, intuitive mobile applications, robust APIs, and web apps built using modern technologies.',
    },
    {
      title: 'Brand',
      subtitle: 'Visual Distinction',
      desc: 'Distinctive brand identities, memorable logos, clean UI/UX design, and creative assets that set you apart.',
    },
    {
      title: 'Grow',
      subtitle: 'Market Traction',
      desc: 'Targeted digital marketing campaigns, SEO, paid performance advertising, and organic growth strategies.',
    },
  ],
};
