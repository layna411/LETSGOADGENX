import React from 'react';
import { Home, Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const NotFound: React.FC = () => {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center space-y-6">
      <Badge variant="purple">404 Error</Badge>

      <h1 className="text-6xl sm:text-7xl font-heading font-black text-gradient">
        404
      </h1>

      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
        Page Not Found
      </h2>

      <p className="text-sm sm:text-base text-brand-muted font-body leading-relaxed max-w-md mx-auto">
        The page you are looking for might have been moved, renamed, or does not exist.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button to="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
          Return to Homepage
        </Button>

        <Button to="/services" variant="secondary" size="md" icon={<Compass className="w-4 h-4" />}>
          Explore Services
        </Button>
      </div>
    </div>
  );
};
