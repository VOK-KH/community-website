'use client'

import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const directionClass = {
    up: 'animate-slide-in',
    down: 'animate-fade-in',
    left: 'animate-slide-in',
    right: 'animate-fade-in',
  }[direction]

  return (
    <div
      className={`${directionClass} ${className}`}
      style={{
        animationDelay: `${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  )
}
