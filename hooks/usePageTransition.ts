'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function usePageTransition() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transitionTo = async (path: string) => {
    setIsTransitioning(true)
    // Small delay for animation effect
    await new Promise(resolve => setTimeout(resolve, 300))
    router.push(path)
    // Reset after transition
    setTimeout(() => setIsTransitioning(false), 500)
  }

  return { transitionTo, isTransitioning }
}
