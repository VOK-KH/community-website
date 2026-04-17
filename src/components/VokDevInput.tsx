import React from 'react';
import { cn } from '@/lib/utils';

interface VokDevInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'glass';
}

export function VokDevInput({
  label,
  description,
  error,
  icon,
  variant = 'default',
  className,
  id,
  ...props
}: VokDevInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const baseClasses =
    'w-full px-4 py-2.5 rounded-lg transition-all duration-300 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    default: 'bg-input border border-border hover:border-secondary/50',
    glass: 'glass border-secondary/50 hover:border-secondary',
  };

  const hasError = !!error;
  const errorClass = hasError ? 'border-destructive focus:ring-destructive' : '';

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground block"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            baseClasses,
            variantClasses[variant],
            errorClass,
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>

      {description && !hasError && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {hasError && (
        <p className="text-xs text-destructive font-medium">{error}</p>
      )}
    </div>
  );
}

interface VokDevTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  variant?: 'default' | 'glass';
}

export function VokDevTextarea({
  label,
  description,
  error,
  variant = 'default',
  className,
  id,
  ...props
}: VokDevTextareaProps) {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;

  const baseClasses =
    'w-full px-4 py-2.5 rounded-lg transition-all duration-300 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed resize-vertical min-h-32';

  const variantClasses = {
    default: 'bg-input border border-border hover:border-secondary/50',
    glass: 'glass border-secondary/50 hover:border-secondary',
  };

  const hasError = !!error;
  const errorClass = hasError ? 'border-destructive focus:ring-destructive' : '';

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-foreground block"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        className={cn(
          baseClasses,
          variantClasses[variant],
          errorClass,
          className
        )}
        {...props}
      />

      {description && !hasError && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {hasError && (
        <p className="text-xs text-destructive font-medium">{error}</p>
      )}
    </div>
  );
}
