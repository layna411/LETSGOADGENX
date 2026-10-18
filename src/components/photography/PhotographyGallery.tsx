import React, { useState } from 'react';
import { PHOTOGRAPHY_PORTFOLIO, type PhotographyCategory, type PhotographyItem } from '../../data/photography';
import { PhotographyLightbox } from './PhotographyLightbox';
import { Badge } from '../ui/Badge';
import { MapPin, Eye, ArrowUpRight, Camera, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../../config/contact';

interface PhotographyGalleryProps {
  onBookItem?: (item: PhotographyItem) => void;
  limit?: number;
}

export const PhotographyGallery: React.FC<PhotographyGalleryProps> = ({
  onBookItem,
  limit,
}) => {
  const [activeCategory, setActiveCategory] = useState<PhotographyCategory>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<PhotographyItem | null>(null);

  const categories: PhotographyCategory[] = [
    'All',
    'Products',
    'Portraits',
    'Events',
    'Corporate',
    'Fashion & Lifestyle',
    'Food',
    'Architecture & Interiors',
    'Brand Campaigns',
  ];

  const filteredItems = activeCategory === 'All'
    ? PHOTOGRAPHY_PORTFOLIO
    : PHOTOGRAPHY_PORTFOLIO.filter((i) => i.category === activeCategory);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handleBook = (item: PhotographyItem) => {
    setActiveLightboxItem(null);
    if (onBookItem) {
      onBookItem(item);
    } else {
      const element = document.getElementById('photoshoot-inquiry');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (PHOTOGRAPHY_PORTFOLIO.length === 0) {
    return (
      <div className="p-8 sm:p-14 rounded-3xl glass-card border border-white/[0.08] text-center space-y-6 max-w-3xl mx-auto my-8">
        <div className="w-16 h-16 rounded-2xl bg-brand-violet/20 text-brand-lavender border border-brand-violet/30 mx-auto flex items-center justify-center shadow-glow-sm">
          <Camera className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-brand-violet/20 text-brand-lavender border border-brand-violet/30">
            Portfolio In Progress
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white pt-2">
            Photography Portfolio Updating Soon
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-body leading-relaxed">
            We are currently curating and uploading our newest client photo albums across product shoots, executive headshots, event coverage, and commercial campaigns.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-brand-lavender/90 max-w-md mx-auto">
          Need to see photography samples in your specific category or book a date? Connect with us directly on WhatsApp.
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href={getWhatsAppUrl('photography')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-heading font-semibold border border-[#25D366]/30 transition-all shadow-md shadow-[#25D366]/10"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request Shoot Samples on WhatsApp</span>
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('photoshoot-inquiry');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-heading font-semibold shadow-glow-sm transition-all"
          >
            Book a Photoshoot Below
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Category Filter Chips */}
      <div className="flex items-center justify-center flex-wrap gap-2">
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

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxItem(item)}
            className="group cursor-pointer rounded-3xl overflow-hidden glass-card border border-white/[0.08] hover:border-brand-electric/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Photographic Canvas with Hover Overlay */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Scrim for readable badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="purple" className="text-[10px]">
                  {item.category}
                </Badge>
              </div>

              {/* View Lightbox Indicator */}
              <div className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 text-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                <Eye className="w-4 h-4 text-brand-electric" />
              </div>

              {/* Bottom Text in Image */}
              <div className="absolute inset-x-4 bottom-4 z-10">
                <h4 className="text-sm font-heading font-bold text-white line-clamp-1 mb-1 group-hover:text-brand-electric transition-colors">
                  {item.title}
                </h4>
                {item.location && (
                  <div className="flex items-center gap-1 text-[11px] text-white/70">
                    <MapPin className="w-3 h-3 text-brand-lavender shrink-0" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="p-4 bg-brand-surface/90 border-t border-white/[0.06] flex items-center justify-between text-xs text-brand-muted">
              <span className="line-clamp-1 text-[11px] font-body">{item.shortDesc}</span>
              <span className="text-brand-electric inline-flex items-center gap-0.5 shrink-0 ml-2 font-heading font-semibold text-[11px]">
                Inspect <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <PhotographyLightbox
        item={activeLightboxItem}
        items={displayedItems}
        onClose={() => setActiveLightboxItem(null)}
        onNavigate={(newItem) => setActiveLightboxItem(newItem)}
        onBook={handleBook}
      />
    </div>
  );
};
