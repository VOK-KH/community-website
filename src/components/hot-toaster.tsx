'use client'

import { Toaster } from 'react-hot-toast'

export function HotToaster() {
  return (
    <Toaster
      position="top-center"
      containerStyle={{ zIndex: 10050 }}
      gutter={12}
      toastOptions={{
        duration: 4500,
        style: {
          fontSize: '0.875rem',
          lineHeight: '1.35rem',
          maxWidth: 'min(100vw - 1.5rem, 22rem)',
          padding: '0.875rem 1rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.18)',
          background: 'hsl(var(--popover))',
          color: 'hsl(var(--popover-foreground))',
          border: '1px solid hsl(var(--border))',
        },
        error: {
          iconTheme: {
            primary: 'hsl(var(--destructive))',
            secondary: 'hsl(var(--destructive-foreground))',
          },
        },
        success: {
          duration: 4000,
          style: {
            fontSize: '0.875rem',
            lineHeight: '1.35rem',
            maxWidth: 'min(100vw - 1.5rem, 22rem)',
            padding: '0.875rem 1rem',
            border: '1px solid hsl(var(--success) / 0.45)',
            background:
              'linear-gradient(135deg, hsl(var(--popover)) 0%, hsl(var(--success) / 0.08) 100%)',
            color: 'hsl(var(--popover-foreground))',
            boxShadow:
              '0 0 0 1px hsl(var(--success) / 0.12), 0 14px 44px -8px hsl(var(--success) / 0.25), 0 10px 32px rgba(0, 0, 0, 0.2)',
          },
          iconTheme: {
            primary: 'hsl(var(--success))',
            secondary: 'hsl(0 0% 100%)',
          },
        },
      }}
    />
  )
}
