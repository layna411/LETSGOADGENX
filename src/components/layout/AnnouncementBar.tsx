import React, { useState } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-brand-blue/90 via-brand-violet/90 to-brand-electric/90 text-white text-xs sm:text-sm py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center font-medium">
          <Sparkles className="w-3.5 h-3.5 text-brand-lavender shrink-0 hidden sm:inline" />
          <span>{SITE_CONFIG.announcement}</span>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:text-brand-lavender transition-colors ml-1"
          >
            Start a Project <ArrowRight className="w-3 h-3 inline" />
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white p-1 rounded-md transition-colors hover:bg-white/10"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
