import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'purple' | 'cyan' | 'outline' | 'subtle';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
  icon,
}) => {
  const variantStyles = {
    primary: 'bg-brand-blue/15 text-brand-electric border border-brand-blue/30 shadow-[0_0_12px_rgba(66,99,255,0.15)]',
    purple: 'bg-brand-violet/15 text-brand-lavender border border-brand-violet/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]',
    cyan: 'bg-brand-electric/15 text-brand-electric border border-brand-electric/30',
    outline: 'bg-white/[0.03] text-brand-muted border border-white/10',
    subtle: 'bg-white/[0.05] text-white/90 border border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase font-heading ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </span>
  );
};
