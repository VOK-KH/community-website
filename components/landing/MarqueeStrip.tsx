'use client'

import { useScrollTrigger } from '@/hooks/useScrollTrigger'
import { marqueeTopics } from './data'

export function MarqueeStrip() {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.25 })
  const items = [...marqueeTopics, ...marqueeTopics]

  return (
    <section ref={ref} className="border-y border-border/40 bg-muted/30 py-4">
      <div className="overflow-hidden">
        <div className={isVisible ? 'animate-marquee flex w-max gap-4' : 'flex w-max gap-4 opacity-0'}>
          {items.map((topic, index) => (
            <span
              key={`${topic}-${index}`}
              className="rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-foreground/85 backdrop-blur"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
