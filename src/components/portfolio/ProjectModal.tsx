import React from 'react';
import { X, CheckCircle2, ArrowRight, MessageCircle, Layers, Cpu, Sparkles } from 'lucide-react';
import type { ProjectItem } from '../../data/projects';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { getWhatsAppUrl } from '../../config/contact';
import { useNavigate } from 'react-router-dom';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const navigate = useNavigate();

  if (!project) return null;

  const handleInquire = () => {
    onClose();
    navigate(`/contact?project=${encodeURIComponent(project.name)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl my-8 bg-brand-surface border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Mockup Canvas */}
        <div
          className={`relative aspect-[21/9] sm:aspect-[24/9] w-full bg-gradient-to-r ${project.gradientTheme} p-6 sm:p-8 flex flex-col justify-between border-b border-white/[0.08]`}
        >
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-35"
            style={{ backgroundColor: project.accentColor }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors border border-white/10"
            aria-label="Close project view"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex items-center gap-2">
            <Badge variant="primary">{project.category}</Badge>
            <Badge variant="purple">{project.tag}</Badge>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-2">
              {project.name}
            </h3>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl font-body">
              {project.oneLiner}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Concept Disclaimer Alert */}
          <div className="p-4 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-brand-electric mt-0.5 shrink-0" />
            <div className="text-xs text-brand-muted leading-relaxed">
              <strong className="text-white">Design Exploration & Concept Study:</strong> This project represents LetsGoAdGenX’s creative engineering and design capability. We demonstrate our technical and aesthetic standards transparently without claiming unverified external client engagements.
            </div>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-2">
              Project Concept & Overview
            </h4>
            <p className="text-sm text-brand-muted leading-relaxed font-body">
              {project.overview}
            </p>
          </div>

          {/* Strategic Objectives */}
          <div>
            <h4 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-electric" /> Key Objectives
            </h4>
            <div className="space-y-2">
              {project.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text">
                  <CheckCircle2 className="w-4 h-4 text-brand-electric shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Produced */}
          <div>
            <h4 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3">
              Included Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-brand-muted flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-violet shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs uppercase font-heading font-semibold tracking-wider text-brand-lavender mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-electric" /> Technology & Tooling Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-brand-card border border-white/10 text-xs font-mono text-brand-lavender font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-6 sm:p-8 border-t border-white/[0.08] bg-brand-card/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-brand-muted text-center sm:text-left">
            Want us to build something similar for your company?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={getWhatsAppUrl('general', `Hi LetsGoAdGenX! I checked your project "${project.name}" and would love to build something similar for our business.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Discuss on WhatsApp
            </a>

            <Button
              onClick={handleInquire}
              variant="primary"
              size="md"
              className="flex-1 sm:flex-initial text-xs"
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start This Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
