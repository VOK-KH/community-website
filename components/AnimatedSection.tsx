'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useScrollTrigger } from '@/hooks/useScrollTrigger'

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
  const { ref, isVisible } = useScrollTrigger()

  const initialVariants = {
    up: { opacity: 0, y: 40 },
    down: { opacity: 0, y: -40 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
  }

  const animateVariants = {
    opacity: 1,
    y: direction === 'up' || direction === 'down' ? 0 : undefined,
    x: direction === 'left' || direction === 'right' ? 0 : undefined,
  }

  return (
    <motion.div
      ref={ref}
      initial={initialVariants[direction]}
      animate={isVisible ? animateVariants : initialVariants[direction]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
