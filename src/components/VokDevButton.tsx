import React from 'react'
import { cn } from '@/lib/utils'

interface VokDevButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  withGlow?: boolean;
}

export function VokDevButton({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  withGlow = true,
  className,
  children,
  disabled,
  ...props
}: VokDevButtonProps) {
  const baseClasses =
    'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';

  const variantClasses = {
    primary: cn(
      'bg-primary text-primary-foreground shadow-[0_10px_30px_-18px_hsl(var(--primary))] hover:brightness-110',
      withGlow && 'hover:glow-primary'
    ),
    secondary: cn(
      'bg-transparent border border-secondary/60 text-secondary hover:bg-secondary/10',
      withGlow && 'hover:glow-secondary'
    ),
    tertiary: cn(
      'bg-tertiary text-tertiary-foreground hover:brightness-110',
      withGlow && 'hover:glow-tertiary'
    ),
    ghost: 'bg-transparent text-foreground hover:bg-muted/70',
    destructive:
      'bg-destructive text-destructive-foreground hover:brightness-110',
  };

  const sizeClasses = {
    xs: 'px-3 py-1 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
        'hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-transform'
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
