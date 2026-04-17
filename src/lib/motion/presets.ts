/**
 * lib/motion/presets.ts
 * Reusable GSAP tween-vars presets.
 * Each preset exposes a `from` vars object and a `to(duration?)` factory.
 * Use with gsap.fromTo(el, presets.fadeUp.from, presets.fadeUp.to()).
 */

import type gsap from 'gsap'

type Vars = gsap.TweenVars

/** Fade + slide up from below (most common reveal). */
export const fadeUp = {
  from: { opacity: 0, y: 36 } as Vars,
  to: (duration = 0.85): Vars => ({ opacity: 1, y: 0, duration, ease: 'expo.out' }),
}

/** Simple opacity fade in. */
export const fadeIn = {
  from: { opacity: 0 } as Vars,
  to: (duration = 0.65): Vars => ({ opacity: 1, duration, ease: 'power2.out' }),
}

/** Fade + larger upward travel — section headings. */
export const slideUp = {
  from: { opacity: 0, y: 56 } as Vars,
  to: (duration = 1.1): Vars => ({ opacity: 1, y: 0, duration, ease: 'expo.out' }),
}

/** Pop in from scale 0.8 — cards, badges. */
export const popIn = {
  from: { opacity: 0, scale: 0.82 } as Vars,
  to: (duration = 0.5): Vars => ({
    opacity: 1, scale: 1, duration, ease: 'back.out(1.7)',
  }),
}

/** Word / letter clip-reveal (translateY from 110%). */
export const wordReveal = {
  from: { opacity: 0, y: '110%' } as Vars,
  to: (duration = 1.1): Vars => ({ opacity: 1, y: '0%', duration, ease: 'expo.out' }),
}

/** Horizontal line reveal (scaleX). */
export const lineReveal = {
  from: { scaleX: 0, transformOrigin: 'left center' } as Vars,
  to: (duration = 1.3): Vars => ({
    scaleX: 1, duration, ease: 'expo.out', transformOrigin: 'left center',
  }),
}

/** Letter pop — for VOK-style split text. */
export const letterPop = {
  from: { opacity: 0, scale: 0.4 } as Vars,
  to: (duration = 0.5): Vars => ({ opacity: 1, scale: 1, duration, ease: 'back.out(2)' }),
}

/** Slide in from the left. */
export const slideRight = {
  from: { opacity: 0, x: -32 } as Vars,
  to: (duration = 0.7): Vars => ({ opacity: 1, x: 0, duration, ease: 'expo.out' }),
}

// ── ScrollTrigger default configs ──────────────────────────────────────────

/** Standard "trigger when 88% up the screen, play once" config. */
export const stOnce = (trigger: Element | string, start = 'top 88%') => ({
  trigger,
  start,
  toggleActions: 'play none none none' as const,
})

/** Scrub parallax (full page). */
export const stScrub = (
  trigger: Element | string,
  scrub: number | boolean = 1,
  start = 'top bottom',
  end = 'bottom top',
) => ({ trigger, start, end, scrub })
