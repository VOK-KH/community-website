/**
 * lib/motion/dom.ts
 * Tiny DOM / media-query helpers used across animation files.
 */

/** True when the user has requested reduced motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** True on desktop (pointer: fine) — used to gate cursor / tilt effects. */
export const hasFinePointer = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches

/** True on screens narrower than `px` (default 768). */
export const isMobile = (px = 768): boolean =>
  typeof window !== 'undefined' && window.innerWidth < px

/**
 * Returns scoped `qs` / `qsa` helpers bound to a root element.
 *
 * @example
 * const { qs, qsa } = scopedQuery(ref.current)
 * const hero = qs('#hero')
 * const cards = qsa('.gsap-card')
 */
export function scopedQuery(root: HTMLElement) {
  return {
    qs: <T extends Element = HTMLElement>(sel: string): T | null =>
      root.querySelector<T>(sel),
    qsa: (sel: string): HTMLElement[] =>
      Array.from(root.querySelectorAll<HTMLElement>(sel)),
  }
}
