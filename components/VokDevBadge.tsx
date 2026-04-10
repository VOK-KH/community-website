import React from 'react';
import { cn } from '@/lib/utils';

interface VokDevBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'md';
  withGlow?: boolean;
}

export function VokDevBadge({
  variant = 'primary',
  size = 'md',
  withGlow = true,
  className,
  children,
  ...props
}: VokDevBadgeProps) {
  const baseClasses = 'inline-flex items-center gap-1.5 rounded-full font-semibold transition-all duration-300';

  const variantClasses = {
    primary: cn(
      'bg-primary/20 text-primary border border-primary/30',
      withGlow && 'hover:glow-primary'
    ),
    secondary: cn(
      'bg-secondary/20 text-secondary border border-secondary/30',
      withGlow && 'hover:glow-secondary'
    ),
    tertiary: cn(
      'bg-tertiary/20 text-tertiary border border-tertiary/30',
      withGlow && 'hover:glow-tertiary'
    ),
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    destructive: 'bg-destructive/20 text-destructive border border-destructive/30',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
