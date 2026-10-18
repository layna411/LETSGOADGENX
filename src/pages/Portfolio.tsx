import React, { useState } from 'react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/projects';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { ProjectModal } from '../components/portfolio/ProjectModal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/contact';
import { SEOHead } from '../components/seo/SEOHead';
import { PAGE_METADATA } from '../config/seo';

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
      {/* Route-Aware Technical SEO */}
      <SEOHead
        metadata={PAGE_METADATA.work}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/work' },
        ]}
      />

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

      {/* Projects Grid or Updating State */}
      {PROJECTS.length === 0 ? (
        <div className="p-10 sm:p-16 rounded-3xl glass-card border border-white/[0.08] text-center space-y-6 my-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 text-brand-electric border border-brand-blue/30 mx-auto flex items-center justify-center shadow-glow-sm">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-brand-blue/20 text-brand-electric border border-brand-blue/30">
              Portfolio Upload In Progress
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white pt-2">
              Client Case Studies Updating Soon
            </h2>
            <p className="text-sm sm:text-base text-brand-muted font-body leading-relaxed">
              We are currently uploading our latest client case studies, live website deployments, video edits, and promotional campaigns.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-brand-lavender/90 max-w-md mx-auto">
            Want to see live work samples in your specific industry? Connect with us directly on WhatsApp or submit an inquiry to receive a private work deck.
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-heading font-semibold border border-[#25D366]/30 transition-all shadow-md shadow-[#25D366]/10"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Request Work Samples via WhatsApp</span>
            </a>
            <Button to="/contact" variant="primary" size="sm">
              Start a Project With Us
            </Button>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}

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
