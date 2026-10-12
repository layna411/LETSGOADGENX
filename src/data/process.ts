export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    subtitle: 'Objectives & Strategy',
    description: 'We listen deeply to understand your business model, customer audience, market challenges, and precise functional requirements.',
    details: [
      'Comprehensive project requirements intake',
      'Target audience & competitive landscape review',
      'Definition of core success metrics & timeline expectations',
    ],
  },
  {
    step: '02',
    title: 'Strategize',
    subtitle: 'Architecture & Scope',
    description: 'We define the clear scope, deliverables, technical architecture, wireframes, and sequential project milestones.',
    details: [
      'Transparent milestones & timeline roadmapping',
      'Technology stack selection & cloud infrastructure design',
      'Information architecture & low-fidelity wireframing',
    ],
  },
  {
    step: '03',
    title: 'Create',
    subtitle: 'Design & Engineering',
    description: 'Our team crafts the visual identity and engineers the codebase using clean, modern, and high-performance practices.',
    details: [
      'High-fidelity interactive visual design & prototyping',
      'Clean, modular, and maintainable code development',
      'Regular sprint previews with transparent feedback cycles',
    ],
  },
  {
    step: '04',
    title: 'Launch',
    subtitle: 'Testing & Deployment',
    description: 'Rigorous cross-device testing, performance audits, and seamless production deployment to live environments.',
    details: [
      'Cross-browser, mobile responsiveness, and speed audits',
      'Security verification & production environment configuration',
      'Live launch execution & DNS/domain handoff',
    ],
  },
  {
    step: '05',
    title: 'Grow',
    subtitle: 'Support & Optimization',
    description: 'We stay by your side with warranty support, ongoing maintenance, creative asset production, and digital marketing growth.',
    details: [
      'Post-launch warranty & stability monitoring',
      'Ongoing creative assets & campaign iteration',
      'Data-driven optimizations based on real user actions',
    ],
  },
];
