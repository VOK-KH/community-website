'use client'

import { motion } from 'framer-motion'
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(139, 51, 255, 0.2)' }}
      transition={{
        duration: 0.5,
        delay: delay + index * 0.1,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
