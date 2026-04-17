'use client'

import { ReactNode } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  offset?: number
  className?: string
}

export function ParallaxSection({
  children,
  offset = 50,
  className = '',
}: ParallaxSectionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
