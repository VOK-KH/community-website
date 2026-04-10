'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

const particleConfig: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: { value: 56, density: { enable: true, width: 1200, height: 800 } },
    color: { value: ['#00e5ff', '#7c3aed', '#10b981'] },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.08, max: 0.3 },
      animation: { enable: true, speed: 0.6, startValue: 'random', sync: false },
    },
    size: {
      value: { min: 1, max: 2.5 },
      animation: { enable: true, speed: 1.2, startValue: 'random', sync: false },
    },
    links: {
      enable: true,
      distance: 140,
      color: '#00e5ff',
      opacity: 0.06,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'bounce' },
    },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: { enable: true, mode: 'grab' },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 160, links: { opacity: 0.18, color: '#00e5ff' } },
    },
  },
  detectRetina: true,
}

export function ParticlesBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine((engine) => loadSlim(engine)).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="tsparticles"
      className="particles-bg particles-visible"
      options={particleConfig}
    />
  )
}
