'use client'

import { ReactNode } from 'react'

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0.2,
}: StaggerContainerProps) {
  return (
    <div
      className={className}
    >
      {children}
    </div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function StaggerItem({ children, className = '', delay = 0 }: StaggerItemProps) {
  return (
    <div className={`animate-slide-in ${className}`}>
      {children}
    </div>
  )
}
