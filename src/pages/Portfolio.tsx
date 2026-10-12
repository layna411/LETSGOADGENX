import React, { useState } from 'react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/projects';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { ProjectModal } from '../components/portfolio/ProjectModal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/contact';

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'Websites',
    'Mobile Applications',
    'Web Applications',
    'Branding',
    'Graphic Design',
    'Video and Marketing',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Portfolio Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <Badge variant="primary" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Craft & Explorations
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
          Ideas Turned Into <br />
          <span className="text-gradient">Experiences.</span>
        </h1>
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
          Explore our portfolio of concept designs, digital engineering prototypes, and branding explorations. We showcase real capabilities and aesthetic standards transparently.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-heading font-medium transition-all ${
              activeCategory === cat
                ? 'bg-brand-blue text-white shadow-glow-sm border border-brand-electric/40'
                : 'bg-white/[0.03] text-brand-muted hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photography Cross-Link Banner */}
      <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-violet/15 via-brand-surface to-brand-blue/15 border border-brand-violet/25 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-violet/20 text-brand-lavender border border-brand-violet/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-heading font-bold text-white">
              Looking for our Professional Photography Showcase?
            </div>
            <div className="text-xs text-brand-muted">
              Explore product photography, corporate headshots, events, food, and brand campaigns in our dedicated photo gallery.
            </div>
          </div>
        </div>
        <Button
          to="/services/photography"
          variant="secondary"
          size="sm"
          iconRight={<ArrowRight className="w-3.5 h-3.5" />}
          className="shrink-0"
        >
          View Photography Portfolio
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onView={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Bottom Conversion Prompt */}
      <div className="mt-20 p-8 sm:p-14 rounded-3xl glass-card border border-white/[0.08] text-center space-y-5">
        <Badge variant="purple">Your Vision. Our Craft.</Badge>
        <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white">
          Ready to Build Something Remarkable?
        </h2>
        <p className="text-sm sm:text-base text-brand-muted max-w-lg mx-auto font-body">
          Whether you need an MVP mobile app, a high-converting corporate website, or an unforgettable brand revamp, we bring the execution.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
            Start a Project With Us
          </Button>
          <Button
            href={getWhatsAppUrl('general')}
            variant="whatsapp"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle className="w-4 h-4" />}
          >
            Chat Directly on WhatsApp
          </Button>
        </div>
      </div>

      {/* Detailed Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
