/**
 * lib/motion/hooks.ts
 * React hooks for GSAP animations.
 * All hooks guard against SSR (window check) and reduced-motion preference.
 */

'use client'

import { useLayoutEffect, useRef, type DependencyList, type RefObject } from 'react'
import { gsap, ScrollTrigger, registerGsap } from './core'
import { hasFinePointer, prefersReducedMotion } from './dom'
import { fadeUp, stOnce } from './presets'

export interface GsapCtx {
  gsap: typeof gsap
  ScrollTrigger: typeof ScrollTrigger
  reducedMotion: boolean
  finePtr: boolean
  addCleanup: (fn: () => void) => void
}

export function useGsapSetup(
  setup: (ctx: GsapCtx) => void,
  deps: DependencyList = [],
) {
  const cleanups = useRef<(() => void)[]>([])

  useLayoutEffect(() => {
    registerGsap()
    cleanups.current = []
    const addCleanup = (fn: () => void) => cleanups.current.push(fn)

    const ctx = gsap.context(() => {
      setup({
        gsap,
        ScrollTrigger,
        reducedMotion: prefersReducedMotion(),
        finePtr: hasFinePointer(),
        addCleanup,
      })
    })

    return () => {
      cleanups.current.forEach((fn) => fn())
      cleanups.current = []
      ctx.revert()
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

interface ScrollRevealOptions {
  /** translateY start value (px). Default 36. */
  y?: number
  /** Animation duration in seconds. Default 0.85. */
  duration?: number
  /** ScrollTrigger start string. Default 'top 88%'. */
  start?: string
}

/** Fade-up reveal triggered when the element scrolls into view. */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options?: ScrollRevealOptions,
) {
  useLayoutEffect(() => {
    registerGsap()
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const { y = 36, duration = 0.85, start = 'top 88%' } = options ?? {}
    const tween = gsap.fromTo(el,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration, ease: 'expo.out', scrollTrigger: stOnce(el, start) },
    )

    return () => { tween.kill() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}

/**
 * Scrub-parallax: element moves `yPercent` over its scroll travel.
 * @param scrub  GSAP scrub value (0 = instant, higher = more lag). Default 1.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  yPercent: number,
  scrub = 1,
) {
  useLayoutEffect(() => {
    registerGsap()
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const tween = gsap.to(el, {
      yPercent,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub },
    })

    return () => {
      tween.kill()
    }
  }, [ref, yPercent, scrub])
}

interface TiltOptions {
  /** Max rotateX degrees. Default 7. */
  rx?: number
  /** Max rotateY degrees. Default 12. */
  ry?: number
  /** Scale on hover. Default 1.02. */
  scale?: number
  /** Perspective value (px). Default 800. */
  perspective?: number
}

/** Magnetic 3-D card tilt that follows the cursor inside the element. */
export function useTilt(
  ref: RefObject<HTMLElement | null>,
  options?: TiltOptions,
) {
  useLayoutEffect(() => {
    registerGsap()
    const el = ref.current
    if (!el || !hasFinePointer()) return

    const { rx = 7, ry = 12, scale = 1.02, perspective = 800 } = options ?? {}

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - r.left) / r.width - 0.5
      const dy = (e.clientY - r.top) / r.height - 0.5
      gsap.to(el, {
        rotateY: dx * ry,
        rotateX: -dy * rx,
        scale,
        duration: 0.38,
        ease: 'power2.out',
        transformPerspective: perspective,
      })
    }
    const onLeave = () =>
      gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.65, ease: 'expo.out' })

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, options])
}

/**
 * Stagger fade-up for a group of children when the container enters view.
 * @param containerRef  Ref to the parent element.
 * @param childSel      CSS selector for the children (relative to container).
 */
export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  childSel: string,
  options?: { stagger?: number; y?: number; duration?: number; start?: string },
) {
  useLayoutEffect(() => {
    registerGsap()
    const el = containerRef.current
    if (!el || prefersReducedMotion()) return

    const { stagger = 0.07, y = 20, duration = 0.5, start = 'top 90%' } = options ?? {}
    const children = Array.from(el.querySelectorAll(childSel))
    if (!children.length) return

    const tween = gsap.fromTo(
      children,
      fadeUp.from,
      {
        ...fadeUp.to(duration),
        y,
        stagger,
        scrollTrigger: stOnce(el, start),
      },
    )

    return () => { tween.kill() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, childSel])
}

/**
 * Animates `[data-count]` text nodes from 0 to their target value.
 * @param containerRef  Root element to search within.
 * @param delay         Animation start delay in seconds. Default 1.6.
 */
export function useCountUp(
  containerRef: RefObject<HTMLElement | null>,
  delay = 1.6,
) {
  useLayoutEffect(() => {
    registerGsap()
    const el = containerRef.current
    if (!el) return

    el.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
      const target = parseInt(node.dataset.count ?? '0', 10)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 2.4,
        ease: 'power3.out',
        delay,
        onUpdate: () => { node.textContent = Math.round(obj.v).toLocaleString() },
      })
    })
  }, [containerRef, delay])
}
