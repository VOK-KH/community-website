'use client'

import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  )
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])
  return mobile
}

function buildConfig(mobile: boolean): ISourceOptions {
  return {
    fullScreen: false,
    fpsLimit: mobile ? 30 : 60,
    particles: {
      number: {
        value: mobile ? 20 : 56,
        density: { enable: true, width: 1200, height: 800 },
      },
      color: { value: ['#00e5ff', '#7c3aed', '#10b981'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.08, max: mobile ? 0.2 : 0.3 },
        animation: { enable: true, speed: 0.6, startValue: 'random', sync: false },
      },
      size: {
        value: { min: 1, max: 2.5 },
        animation: { enable: !mobile, speed: 1.2, startValue: 'random', sync: false },
      },
      links: {
        enable: !mobile,
        distance: 140,
        color: '#00e5ff',
        opacity: 0.06,
        width: 1,
      },
      move: {
        enable: true,
        speed: mobile ? 0.25 : 0.4,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'bounce' },
      },
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: { enable: !mobile, mode: 'grab' },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.18, color: '#00e5ff' } },
      },
    },
    detectRetina: true,
  }
}

type ParticlesBackgroundProps = {
  /** Unique canvas id when multiple instances exist on the same document. */
  id?: string
}

export function ParticlesBackground({ id = 'tsparticles' }: ParticlesBackgroundProps) {
  const [ready, setReady] = useState(false)
  const mobile = useIsMobile()
  const config = useMemo(() => buildConfig(mobile), [mobile])

  useEffect(() => {
    initParticlesEngine((engine) => loadSlim(engine)).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id={id}
      className="particles-bg particles-visible"
      options={config}
    />
  )
}
