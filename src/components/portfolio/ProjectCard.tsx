import React from 'react';
import { ArrowUpRight, ExternalLink, Laptop, Smartphone, BarChart3, Palette, Video } from 'lucide-react';
import type { ProjectItem } from '../../data/projects';
import { Badge } from '../ui/Badge';

interface ProjectCardProps {
  project: ProjectItem;
  onView: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView }) => {
  const getMockupIcon = () => {
    switch (project.mockupType) {
      case 'browser':
        return <Laptop className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'dashboard':
        return <BarChart3 className="w-5 h-5" />;
      case 'brand':
        return <Palette className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div
      onClick={() => onView(project)}
      className="group cursor-pointer rounded-3xl overflow-hidden glass-card glass-card-hover border border-white/[0.08] flex flex-col justify-between transition-all duration-300"
    >
      {/* Visual Canvas Mockup Area */}
      <div
        className={`relative aspect-[16/10] w-full bg-gradient-to-br ${project.gradientTheme} p-6 flex flex-col justify-between overflow-hidden border-b border-white/[0.08]`}
      >
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Ambient glow highlight */}
        <div
          className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-2xl opacity-40 transition-transform duration-500 group-hover:scale-125"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <Badge
            variant={project.tag === 'Concept Project' ? 'primary' : 'purple'}
            className="text-[10px]"
          >
            {project.tag}
          </Badge>
          <div className="p-2 rounded-xl bg-black/40 backdrop-blur-md text-white/80 border border-white/10 group-hover:text-white transition-colors">
            {getMockupIcon()}
          </div>
        </div>

        {/* Center UI Showcase Miniature */}
        <div className="relative z-10 my-auto text-center transform group-hover:scale-105 transition-transform duration-300">
          <div className="inline-block px-4 py-2 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-xs font-mono font-medium text-white/90 shadow-2xl">
            <span className="text-brand-electric">/concept/</span>
            {project.slug}
          </div>
        </div>

        {/* Category Chip */}
        <div className="relative z-10 flex items-center justify-between text-xs text-brand-muted font-heading">
          <span className="font-semibold text-white/70">{project.category}</span>
          <span className="flex items-center gap-1 text-brand-lavender font-medium group-hover:text-brand-electric transition-colors">
            Inspect Case <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-2 group-hover:text-brand-electric transition-colors">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-body mb-5">
            {project.oneLiner}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-brand-muted"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-1 text-[11px] font-mono text-brand-lavender/70">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
