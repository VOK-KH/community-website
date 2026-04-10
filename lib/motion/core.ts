import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGsap(): void {
  if (registered || typeof window === 'undefined') return
  registered = true
  gsap.registerPlugin(ScrollTrigger)
  // sensible global defaults
  gsap.config({ nullTargetWarn: false })
}

export { gsap, ScrollTrigger }
