import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PHOTOGRAPHY_PORTFOLIO, type PhotographyItem } from '../../data/photography';
import { PhotographyLightbox } from '../photography/PhotographyLightbox';
import { getWhatsAppUrl } from '../../config/contact';

export const HomePhotographySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotographyItem | null>(null);

  // Pick top 4 visual showcase items
  const showcaseItems = PHOTOGRAPHY_PORTFOLIO.slice(0, 4);

  return (
    <section className="py-24 bg-brand-surface/40 border-y border-white/[0.06] relative overflow-hidden">
      {/* Ambient lighting accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="purple" icon={<Camera className="w-3.5 h-3.5" />}>
            Photography & Visual Production
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Every Frame <span className="text-gradient">Tells a Story.</span>
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-body">
            From professional portraits and product shoots to events and brand campaigns, we capture visuals that make your business stand out.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              to="/services/photography"
              variant="primary"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Explore Photography
            </Button>

            <Button
              to="/services/photography#inquiry"
              variant="secondary"
              size="md"
              icon={<Sparkles className="w-4 h-4 text-brand-electric" />}
            >
              Book a Photoshoot
            </Button>
          </div>
        </div>

        {/* Photographic Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass-card border border-white/[0.08] hover:border-brand-electric/40 transition-all duration-300 relative aspect-[3/4]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="purple" className="text-[10px]">
                  {item.category}
                </Badge>
              </div>

              {/* Bottom Caption */}
              <div className="absolute inset-x-5 bottom-5 z-10 space-y-1">
                <h3 className="text-base font-heading font-bold text-white group-hover:text-brand-electric transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 font-body">
                  {item.shortDesc}
                </p>
                <div className="pt-1 text-[11px] font-heading font-semibold text-brand-lavender flex items-center gap-1">
                  Click to inspect full photo →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs text-brand-muted">
            Need custom e-commerce product shoots, corporate headshots, or conference event coverage?
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/services/photography"
              className="text-xs font-heading font-semibold text-brand-electric hover:underline"
            >
              View Full Gallery & Process
            </Link>
            <span className="text-white/20">•</span>
            <a
              href={getWhatsAppUrl('photography')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-heading font-semibold text-[#25D366] hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Booking
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox for homepage showcase */}
      <PhotographyLightbox
        item={selectedPhoto}
        items={showcaseItems}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={(newItem) => setSelectedPhoto(newItem)}
        onBook={() => {
          setSelectedPhoto(null);
          window.location.href = '/services/photography#inquiry';
        }}
      />
    </section>
  );
};
