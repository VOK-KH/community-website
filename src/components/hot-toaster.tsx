'use client'

import { Toaster } from 'react-hot-toast'

export function HotToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4500,
        style: {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
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
          iconTheme: {
            primary: 'hsl(var(--success))',
            secondary: 'hsl(var(--foreground))',
          },
        },
      }}
    />
  )
}
