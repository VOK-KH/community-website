import { gsap } from '@/lib/motion'

/** Initial state for clip-reveal title words */
export function setAboutWordsHidden(root: Element | null) {
  if (!root) return
  const words = root.querySelectorAll('.about-word')
  gsap.set(words, { y: '115%' })
}

/** Initial state for section subtitles / lead copy */
export function setAboutDescsHidden(root: Element | null) {
  if (!root) return
  const descs = root.querySelectorAll('.about-sec-desc')
  gsap.set(descs, { opacity: 0, y: 22, filter: 'blur(9px)' })
}

/** Show all text immediately (reduced motion) */
export function clearAboutTextMotion(root: Element | null) {
  if (!root) return
  gsap.set(root.querySelectorAll('.about-word'), { y: '0%' })
  gsap.set(root.querySelectorAll('.about-sec-desc'), {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  })
}
