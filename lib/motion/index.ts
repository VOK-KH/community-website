/**
 * lib/motion — barrel export
 * Import everything animation-related from here.
 *
 * @example
 * import { gsap, ScrollTrigger, useScrollReveal, fadeUp } from '@/lib/motion'
 */

export { gsap, ScrollTrigger, registerGsap } from './core'
export {
  prefersReducedMotion,
  hasFinePointer,
  isMobile,
  scopedQuery,
} from './dom'
export {
  fadeUp,
  fadeIn,
  slideUp,
  popIn,
  wordReveal,
  lineReveal,
  letterPop,
  slideRight,
  stOnce,
  stScrub,
} from './presets'
export {
  useGsapSetup,
  useScrollReveal,
  useParallax,
  useTilt,
  useStaggerReveal,
  useCountUp,
} from './hooks'
