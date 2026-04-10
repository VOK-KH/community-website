'use client'

import { marqueeRow1, marqueeRow2 } from './data'

function rowItems(row: readonly { text: string; mod?: 'c' | 'v' | 'e' }[]) {
  const doubled = [...row, ...row]
  return doubled.map((item, index) => (
    <div key={`${item.text}-${index}`} className="mq-item">
      <span className={item.mod ? `mq-w ${item.mod}` : 'mq-w'}>{item.text}</span>
      <span className="mq-dot" />
    </div>
  ))
}

export function MarqueeStrip() {
  return (
    <div className="mq-wrap" id="marquee" data-sec="marquee">
      <div className="mq-fl" />
      <div className="mq-fr" />
      <div className="mq-row">
        <div className="mq-inner" id="mq1">
          {rowItems(marqueeRow1)}
        </div>
      </div>
      <div className="mq-row">
        <div className="mq-inner" id="mq2">
          {rowItems(marqueeRow2)}
        </div>
      </div>
    </div>
  )
}
