import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle, MapPin, Sparkles, Layers } from 'lucide-react';
import type { PhotographyItem } from '../../data/photography';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { getWhatsAppUrl } from '../../config/contact';

interface PhotographyLightboxProps {
  item: PhotographyItem | null;
  items: PhotographyItem[];
  onClose: () => void;
  onNavigate: (newItem: PhotographyItem) => void;
  onBook: (item: PhotographyItem) => void;
}

export const PhotographyLightbox: React.FC<PhotographyLightboxProps> = ({
  item,
  items,
  onClose,
  onNavigate,
  onBook,
}) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onNavigate(items[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        const nextIndex = (currentIndex + 1) % items.length;
        onNavigate(items[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(items[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Top Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10"
        aria-label="Close Lightbox (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev Navigation Button */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10"
        aria-label="Previous photograph (Left Arrow)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Navigation Button */}
      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10"
        aria-label="Next photograph (Right Arrow)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Lightbox Frame */}
      <div
        className="relative max-w-5xl w-full max-h-[90vh] bg-brand-surface rounded-3xl border border-white/[0.12] overflow-hidden flex flex-col lg:flex-row shadow-2xl glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Photograph Display Area */}
        <div className="lg:w-3/5 bg-black flex items-center justify-center p-2 relative select-none">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[50vh] lg:max-h-[85vh] w-full object-contain rounded-2xl"
            loading="eager"
          />
        </div>

        {/* Right Metadata and Action Panel */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] lg:max-h-[85vh] border-t lg:border-t-0 lg:border-l border-white/[0.08] custom-scrollbar space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="purple">{item.category}</Badge>
              {item.clientType && (
                <span className="text-[10px] font-mono text-brand-lavender/70 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
                  {item.clientType}
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              {item.title}
            </h3>

            {item.location && (
              <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                <MapPin className="w-3.5 h-3.5 text-brand-electric shrink-0" />
                <span>{item.location}</span>
              </div>
            )}

            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-body">
              {item.fullDesc}
            </p>

            {/* Lighting & Camera Details */}
            {item.details && item.details.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] space-y-1.5">
                <div className="text-[11px] uppercase font-heading font-semibold text-brand-lavender flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-brand-electric" /> Setup & Capture Specifications
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.details.map((d, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-brand-text border border-white/5"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Included Deliverables */}
            {item.deliverables && item.deliverables.length > 0 && (
              <div className="space-y-1">
                <div className="text-[11px] uppercase font-heading font-semibold text-white/50">
                  Deliverables
                </div>
                <ul className="space-y-1 text-xs text-brand-muted">
                  {item.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-electric shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Services */}
            {item.relatedServices && item.relatedServices.length > 0 && (
              <div className="space-y-1 pt-1">
                <div className="text-[11px] uppercase font-heading font-semibold text-white/50 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-brand-violet" /> Integrated Services
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.relatedServices.map((rs, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-brand-violet/10 text-brand-lavender border border-brand-violet/20"
                    >
                      {rs}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
            <Button
              onClick={() => onBook(item)}
              variant="primary"
              size="md"
              className="w-full justify-center text-xs"
            >
              Book Shoot In This Style
            </Button>

            <a
              href={getWhatsAppUrl(
                'photography',
                `Hi LetsGoAdGenX! I saw your photography work "${item.title}" (${item.category}) and would like to discuss a similar photoshoot for our brand.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
