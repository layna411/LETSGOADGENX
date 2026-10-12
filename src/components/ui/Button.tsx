import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  target,
  rel,
  icon,
  iconRight,
  className = '',
  disabled,
  ...rest
}) => {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs font-medium rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm font-medium rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base font-semibold rounded-xl gap-2.5 shadow-lg',
  };

  const variantStyles = {
    primary:
      'bg-brand-gradient text-white shadow-glow-sm hover:shadow-glow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-white/20',
    secondary:
      'bg-brand-card hover:bg-brand-surface text-brand-text border border-white/10 hover:border-brand-violet/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm',
    outline:
      'bg-transparent hover:bg-white/[0.05] text-brand-text border border-white/20 hover:border-brand-electric/50 transition-all duration-200',
    whatsapp:
      'bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-semibold',
    ghost:
      'bg-transparent hover:bg-white/[0.05] text-brand-muted hover:text-white transition-colors duration-200',
  };

  const baseClasses = `inline-flex items-center justify-center font-heading tracking-wide transition-all select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {icon && <span>{icon}</span>}
        <span>{children}</span>
        {iconRight && <span>{iconRight}</span>}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={baseClasses}
      >
        {icon && <span>{icon}</span>}
        <span>{children}</span>
        {iconRight && <span>{iconRight}</span>}
      </a>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled} {...rest}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span>{iconRight}</span>}
    </button>
  );
};
