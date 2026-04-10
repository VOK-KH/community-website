'use client'

import { useLayoutEffect, useRef } from 'react'
import { marqueeRow1, marqueeRow2 } from './data'

type Item = { text: string; mod?: 'c' | 'v' | 'e' }

function Row({
  items,
  id,
  reverse,
}: {
  items: readonly Item[]
  id: string
  reverse?: boolean
}) {
  const doubled = [...items, ...items, ...items]
  return (
    <div className="mq-row">
      <div
        className={`mq-inner${reverse ? ' mq-inner--rev' : ''}`}
        id={id}
        aria-hidden={id !== 'mq1'}
      >
        {doubled.map((item, i) => (
          <div key={`${id}-${i}`} className="mq-item">
            <span className={item.mod ? `mq-w ${item.mod}` : 'mq-w'}>{item.text}</span>
            <span className="mq-dot" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarqueeStrip() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const mq1 = wrap.querySelector<HTMLElement>('#mq1')
    const mq2 = wrap.querySelector<HTMLElement>('#mq2')

    const onEnter = () => {
      if (mq1) mq1.style.animationPlayState = 'paused'
      if (mq2) mq2.style.animationPlayState = 'paused'
    }
    const onLeave = () => {
      if (mq1) mq1.style.animationPlayState = 'running'
      if (mq2) mq2.style.animationPlayState = 'running'
    }
    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mouseleave', onLeave)

    return () => {
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="mq-wrap"
      id="marquee"
      data-sec="marquee"
    >
      <div className="mq-fl" aria-hidden />
      <div className="mq-fr" aria-hidden />
      <Row items={marqueeRow1} id="mq1" />
      <Row items={marqueeRow2} id="mq2" reverse />
    </div>
  )
}
