'use client'

import { ReactNode } from 'react'

interface HeroAnimationProps {
  children: ReactNode
  delay?: number
}

export function HeroAnimation({ children, delay = 0 }: HeroAnimationProps) {
  return (
    <div
      className="space-y-6 animate-fade-in"
      style={{
        animationDelay: `${delay * 1000}ms`,
      }}
    >
      <div>
        {typeof children === 'string' ? <h1>{children}</h1> : children}
      </div>
    </div>
  )
}

export function HeroTitle({ children }: { children: ReactNode }) {
  return (
    <h1
      className="text-balance animate-slide-in"
      style={{
        animationDelay: '100ms',
      }}
    >
      {children}
    </h1>
  )
}

export function HeroSubtitle({ children }: { children: ReactNode }) {
  return (
    <p
      className="animate-slide-in"
      style={{
        animationDelay: '200ms',
      }}
    >
      {children}
    </p>
  )
}

export function HeroButton({ children }: { children: ReactNode }) {
  return (
    <div
      className="animate-slide-in"
      style={{
        animationDelay: '300ms',
      }}
    >
      {children}
    </div>
  )
}
