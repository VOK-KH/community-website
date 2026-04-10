'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HeroAnimationProps {
  children: ReactNode
  delay?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export function HeroAnimation({ children, delay = 0 }: HeroAnimationProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        {typeof children === 'string' ? <h1>{children}</h1> : children}
      </motion.div>
    </motion.div>
  )
}

export function HeroTitle({ children }: { children: ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-balance"
    >
      {children}
    </motion.h1>
  )
}

export function HeroSubtitle({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.p>
  )
}

export function HeroButton({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
