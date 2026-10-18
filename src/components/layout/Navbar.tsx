import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { Button } from '../ui/Button';
import { getWhatsAppUrl } from '../../config/contact';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isItemActive = (href: string) => {
    const current = location.pathname;
    if (href === '/') {
      return current === '/';
    }
    if (href === '/services') {
      return (
        current === '/services' ||
        current.startsWith('/services/') ||
        current === '/photography' ||
        current.startsWith('/photography/')
      );
    }
    return current === href || current.startsWith(href + '/');
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080914]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50 py-2.5 sm:py-3'
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-xl"
            aria-label="LetsGoAdGenX Home"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-electric shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
              <img
                src="/adgenx-logo.png"
                alt="ADGEN-X Official Brand Logo"
                className="w-full h-full object-cover rounded-full"
                width={44}
                height={44}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight flex items-center gap-1.5">
                LetsGo<span className="text-brand-electric">AdGenX</span>
              </span>
              <span className="text-[10px] tracking-widest text-brand-lavender/80 uppercase font-heading -mt-1 font-semibold">
                ADGEN - X
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {SITE_CONFIG.navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                    active
                      ? 'text-white bg-white/[0.12] shadow-sm font-semibold'
                      : 'text-brand-muted hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-brand-muted hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all duration-200"
              title="Chat with us on WhatsApp"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Button
              to="/contact"
              variant="primary"
              size="sm"
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.05] text-[#25D366]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brand-muted hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#080914]/98 backdrop-blur-2xl border-b border-white/[0.1] shadow-2xl px-6 py-8 transition-all animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3">
            {SITE_CONFIG.navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`px-4 py-3 rounded-xl text-base font-heading font-medium transition-all ${
                    active
                      ? 'text-white bg-brand-blue/20 border border-brand-blue/30 font-semibold'
                      : 'text-brand-muted hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/[0.08] flex flex-col gap-3">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center"
                iconRight={<ArrowRight className="w-4 h-4" />}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a Project
              </Button>

              <Button
                href={getWhatsAppUrl('general')}
                variant="whatsapp"
                size="md"
                className="w-full justify-center"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                WhatsApp Quick Chat
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
