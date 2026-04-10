import React from 'react'
import { cn } from '@/lib/utils'

interface VokDevCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'featured' | 'minimal';
  hasGlow?: boolean;
  isHoverable?: boolean;
}

export function VokDevCard({
  variant = 'default',
  hasGlow = false,
  isHoverable = true,
  className,
  children,
  ...props
}: VokDevCardProps) {
  const baseClasses = 'rounded-xl transition-all duration-300';

  const variantClasses = {
    default: cn(
      'bg-card border border-border p-6 shadow-sm dark:shadow-md',
      isHoverable && 'hover:shadow-lg hover:-translate-y-1'
    ),
    interactive: cn(
      'glass p-6 border border-secondary/30',
      isHoverable && 'hover:glow-secondary hover:-translate-y-2'
    ),
    featured: cn(
      'border-gradient p-6 relative overflow-hidden',
      'bg-primary/5',
      isHoverable && 'hover:glow-primary hover:-translate-y-2'
    ),
    minimal: cn(
      'bg-transparent border border-border/50 p-6',
      isHoverable && 'hover:border-secondary/50 hover:bg-muted/50'
    ),
  };

  const glowClass = hasGlow
    ? variant === 'featured'
      ? 'glow-primary'
      : variant === 'interactive'
        ? 'glow-secondary'
        : ''
    : '';

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], glowClass, className, 'animate-slide-in')}
      {...props}
    >
      {children}
    </div>
  )
}

type VokDevCardHeaderProps = React.HTMLAttributes<HTMLDivElement>

export function VokDevCardHeader({
  className,
  ...props
}: VokDevCardHeaderProps) {
  return <div className={cn('mb-4', className)} {...props} />;
}

type VokDevCardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

export function VokDevCardTitle({
  className,
  ...props
}: VokDevCardTitleProps) {
  return (
    <h3
      className={cn(
        'text-xl font-bold text-foreground leading-tight',
        className
      )}
      {...props}
    />
  );
}

type VokDevCardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export function VokDevCardDescription({
  className,
  ...props
}: VokDevCardDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-muted-foreground leading-relaxed', className)}
      {...props}
    />
  );
}

type VokDevCardContentProps = React.HTMLAttributes<HTMLDivElement>

export function VokDevCardContent({
  className,
  ...props
}: VokDevCardContentProps) {
  return <div className={cn('space-y-4', className)} {...props} />;
}

type VokDevCardFooterProps = React.HTMLAttributes<HTMLDivElement>

export function VokDevCardFooter({
  className,
  ...props
}: VokDevCardFooterProps) {
  return (
    <div
      className={cn('mt-6 pt-4 border-t border-border/50 flex gap-3', className)}
      {...props}
    />
  );
}
