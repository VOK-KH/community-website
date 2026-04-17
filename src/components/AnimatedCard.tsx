'use client'

import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  index?: number
}

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
  index = 0,
}: AnimatedCardProps) {
  const animationDelay = (delay + index * 0.1) * 1000

  return (
    <div
      className={`animate-slide-in ${className}`}
      style={{
        animationDelay: `${animationDelay}ms`,
      }}
    >
      {children}
    </div>
  )
}
