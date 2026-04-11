import { Fragment } from 'react'
import { cn } from '@/lib/utils'

interface AboutSectionTitleProps {
  id?: string
  /** Split title into clip-reveal words (e.g. ['Our', 'Mission']) */
  words: string[]
  className?: string
}

export function AboutSectionTitle({ id, words, className }: AboutSectionTitleProps) {
  return (
    <h2 id={id} className={cn(className)}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          {i > 0 ? ' ' : null}
          <span className="about-clip">
            <span className="about-word">{w}</span>
          </span>
        </Fragment>
      ))}
    </h2>
  )
}
