import React from 'react';
import { SOCIAL_LINKS } from '../../config/contact';

export const SocialIcons = {
  LinkedIn: ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 1.62 1.62A1.62 1.62 0 0 0 7.84 6.2Z" />
    </svg>
  ),
  X: ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Instagram: ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Facebook: ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
};

const SOCIAL_STYLE_CONFIG = {
  linkedin: {
    icon: SocialIcons.LinkedIn,
    hoverText: 'hover:text-[#0A66C2]',
    hoverBorder: 'hover:border-[#0A66C2]/40',
    hoverBg: 'hover:bg-[#0A66C2]/15',
    activeGlow: 'hover:shadow-[0_0_15px_rgba(10,102,194,0.35)]',
  },
  x: {
    icon: SocialIcons.X,
    hoverText: 'hover:text-white',
    hoverBorder: 'hover:border-white/40',
    hoverBg: 'hover:bg-white/15',
    activeGlow: 'hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]',
  },
  instagram: {
    icon: SocialIcons.Instagram,
    hoverText: 'hover:text-[#E4405F]',
    hoverBorder: 'hover:border-[#E4405F]/40',
    hoverBg: 'hover:bg-[#E4405F]/15',
    activeGlow: 'hover:shadow-[0_0_15px_rgba(228,64,95,0.35)]',
  },
  facebook: {
    icon: SocialIcons.Facebook,
    hoverText: 'hover:text-[#1877F2]',
    hoverBorder: 'hover:border-[#1877F2]/40',
    hoverBg: 'hover:bg-[#1877F2]/15',
    activeGlow: 'hover:shadow-[0_0_15px_rgba(24,119,242,0.35)]',
  },
};

interface SocialLinksProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  size = 'md',
  showLabels = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`flex items-center gap-2.5 flex-wrap ${className}`}>
      {SOCIAL_LINKS.map((social) => {
        const config = SOCIAL_STYLE_CONFIG[social.id as keyof typeof SOCIAL_STYLE_CONFIG];
        if (!config) return null;
        const IconComponent = config.icon;

        if (showLabels) {
          return (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-brand-muted ${config.hoverText} ${config.hoverBorder} ${config.hoverBg} ${config.activeGlow} transition-all duration-300 font-heading text-xs`}
            >
              <IconComponent className={iconSizes[size]} />
              <span className="font-medium text-white/90">{social.name}</span>
            </a>
          );
        }

        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            title={`${social.name}: ${social.handle}`}
            className={`${sizeClasses[size]} rounded-xl bg-white/[0.04] border border-white/[0.08] text-brand-muted ${config.hoverText} ${config.hoverBorder} ${config.hoverBg} ${config.activeGlow} transition-all duration-300 flex items-center justify-center group relative`}
          >
            <IconComponent className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-110`} />
          </a>
        );
      })}
    </div>
  );
};
