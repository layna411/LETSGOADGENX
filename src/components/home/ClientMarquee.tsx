import React from 'react';
import { CLIENTS, type ClientItem } from '../../data/clients';
import { Badge } from '../ui/Badge';
import { Building2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClientCardProps {
  client: ClientItem;
  showCategory?: boolean;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, showCategory = true }) => {
  return (
    <div
      className="group relative flex items-center gap-4 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[#0e1124]/85 hover:bg-[#131735] border border-white/[0.08] hover:border-brand-electric/50 transition-all duration-300 shadow-sm hover:shadow-[0_10px_35px_rgba(56,189,248,0.18)] backdrop-blur-md mx-2.5 sm:mx-3.5 shrink-0 select-none cursor-default"
      role="group"
      aria-label={client.name}
    >
      {/* Brand Logo Container - Preserves original colors, aspect ratio, and transparency */}
      <div className="h-11 sm:h-12 w-14 sm:w-16 flex items-center justify-center shrink-0 overflow-hidden rounded-xl bg-white/[0.04] p-1.5 border border-white/[0.06] group-hover:border-brand-electric/30 transition-colors">
        <img
          src={client.logoUrl}
          alt={`${client.name} logo`}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-108"
        />
      </div>

      {/* Brand Name & Domain / Category */}
      <div className="flex flex-col min-w-0 pr-1 border-l border-white/[0.08] pl-3.5">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-[15px] font-heading font-bold text-white group-hover:text-brand-electric transition-colors whitespace-nowrap tracking-tight">
            {client.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 group-hover:animate-ping shrink-0" />
        </div>
        {showCategory && (
          <span className="text-[10px] sm:text-[11px] font-mono text-brand-muted/80 whitespace-nowrap tracking-wide">
            {client.category}
          </span>
        )}
      </div>
    </div>
  );
};

export interface ClientMarqueeProps {
  heading?: string;
  subtitle?: string;
  badge?: string;
  direction?: 'ltr' | 'rtl';
  speed?: 'slow' | 'normal' | 'fast';
  showCategory?: boolean;
}

export const ClientMarquee: React.FC<ClientMarqueeProps> = ({
  heading = "Brands We've Worked With",
  subtitle = 'Building partnerships. Creating digital impact.',
  badge = 'Client Partnerships',
  direction = 'ltr',
  speed = 'normal',
  showCategory = true,
}) => {
  // Configurable speed mapping
  const speedDurations = {
    slow: '85s',
    normal: '55s',
    fast: '35s',
  };

  const animationClass = direction === 'ltr' ? 'animate-marquee-ltr' : 'animate-marquee-rtl';
  const durationStyle = { animationDuration: speedDurations[speed] };

  // Calculate repeat count to ensure a dense, uninterrupted loop regardless of screen resolution
  const repeatCount = Math.max(2, Math.ceil(16 / Math.max(1, CLIENTS.length)));
  const evenRepeatCount = repeatCount % 2 === 0 ? repeatCount : repeatCount + 1;
  const marqueeItems = Array(evenRepeatCount).fill(CLIENTS).flat();

  return (
    <section
      aria-label="Brands We've Worked With"
      className="py-14 sm:py-18 bg-brand-surface/35 border-y border-white/[0.06] relative overflow-hidden"
    >
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-violet/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10 text-center space-y-3">
        <Badge variant="purple" icon={<Building2 className="w-3.5 h-3.5" />}>
          {badge}
        </Badge>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight">
          {heading.includes("Worked With") ? (
            <>
              {heading.replace("Worked With", "").trim()}{' '}
              <span className="text-gradient">Worked With</span>
            </>
          ) : (
            heading
          )}
        </h2>

        <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto font-body leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Infinite Horizontal Logo Marquee with Luxury Edge Fade Mask */}
      <div className="relative w-full overflow-hidden pause-on-hover py-3 marquee-edge-mask">
        {/* Continuous Marquee Track */}
        <div
          className={`${animationClass} flex items-center will-change-transform`}
          style={durationStyle}
        >
          {marqueeItems.map((client, idx) => (
            <ClientCard
              key={`${client.id}-${idx}`}
              client={client}
              showCategory={showCategory}
            />
          ))}
        </div>
      </div>

      {/* Bottom Trust & Partnership Footer Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-5 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-electric shrink-0" />
          <span className="font-heading font-medium text-white/80">
            Delivering digital platforms, brand identities & growth across diverse industries
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] text-brand-lavender/80 hidden md:inline">
            Hover any brand to pause scrolling
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 font-heading font-semibold text-brand-electric hover:text-white transition-colors"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
