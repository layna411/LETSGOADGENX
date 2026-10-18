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
  tag: 'Client Project' | 'Concept Project' | 'Design Exploration';
  oneLiner: string;
  overview: string;
  objectives: string[];
  deliverables: string[];
  techStack: string[];
  gradientTheme: string;
  accentColor: string;
  mockupType: 'browser' | 'mobile' | 'dashboard' | 'brand' | 'video';
  liveUrl?: string;
  imageUrl?: string;
}

/**
 * Client projects will be added here one by one.
 * Dummy data has been completely cleared.
 */
export const PROJECTS: ProjectItem[] = [];
