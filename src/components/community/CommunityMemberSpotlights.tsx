'use client'

import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { AboutSectionTitle } from '@/components/about/AboutSectionTitle'
import { clearAboutTextMotion, setAboutDescsHidden, setAboutWordsHidden } from '@/components/about/sectionText'
import { communityMembers, type CommunityMember } from './data'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

const spotlightColA = communityMembers.filter((_, i) => i % 2 === 0)
const spotlightColB = communityMembers.filter((_, i) => i % 2 === 1)

function MemberSpotlightRow({ member }: { member: CommunityMember }) {
  const Icon = member.avatar
  return (
    <div className="community-mq-row group flex shrink-0 items-center gap-3 border-b border-border/40 py-3.5 pr-1 transition-colors hover:border-primary/30 hover:bg-primary/4 sm:gap-4 sm:py-4">
      <div className="pg-icon h-10 w-10 shrink-0 sm:h-11 sm:w-11 [&>svg]:h-[1.05rem] [&>svg]:w-[1.05rem] sm:[&>svg]:h-[1.15rem] sm:[&>svg]:w-[1.15rem]">
        <Icon aria-hidden />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-semibold leading-snug text-foreground">{member.name}</span>
          <span className="text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
            {member.role}
          </span>
        </div>
        <p
          className="mt-1 line-clamp-2 text-[0.75rem] leading-relaxed text-muted-foreground sm:text-xs"
          title={member.specialties.join(' · ')}
        >
          {member.specialties.join(' · ')}
        </p>
      </div>
      <div className="hidden shrink-0 flex-col items-end gap-0.5 text-right text-[0.65rem] tabular-nums text-muted-foreground sm:flex sm:text-[0.7rem]">
        <span>
          <span className="font-semibold text-foreground">{member.projects}</span> projects
        </span>
        <span>
          <span className="font-semibold text-foreground">{member.followers.toLocaleString()}</span>{' '}
          followers
        </span>
      </div>
    </div>
  )
}

function VerticalMarqueeTrack({
  members,
  direction,
}: {
  members: CommunityMember[]
  direction: 'up' | 'down'
}) {
  const doubled = [...members, ...members]
  return (
    <div
      className={
        direction === 'up'
          ? 'community-mq-track community-mq-track--up flex flex-col'
          : 'community-mq-track community-mq-track--down flex flex-col'
      }
    >
      {doubled.map((m, i) => (
        <MemberSpotlightRow key={`${m.id}-${i}`} member={m} />
      ))}
    </div>
  )
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

export function CommunityMemberSpotlights() {
  const secRef = useRef<HTMLElement>(null)
  const mqRootRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return

    const reduced = prefersReducedMotion()
    const viewport = sec.querySelector<HTMLElement>('.community-mq-viewport')

    if (reduced) {
      clearAboutTextMotion(sec)
      if (viewport) gsap.set(viewport, { opacity: 1, y: 0, filter: 'blur(0px)' })
      return
    }

    setAboutWordsHidden(sec)
    setAboutDescsHidden(sec)
    if (viewport) gsap.set(viewport, { opacity: 0, y: 32, filter: 'blur(10px)' })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    const words = sec.querySelectorAll('.about-word')
    const descs = sec.querySelectorAll('.about-sec-desc')

    tl.to(words, { y: '0%', duration: 0.88, stagger: 0.06 }, 0)
      .to(descs, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 }, 0.12)
      .to(
        viewport,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.95, ease: 'power3.out' },
        0.2,
      )

    const parallaxEls = sec.querySelectorAll<HTMLElement>('.community-mq-parallax')
    const parallaxTweens = Array.from(parallaxEls).map((el, i) =>
      gsap.to(el, {
        yPercent: i === 0 ? 7 : -7,
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.15,
        },
      }),
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      parallaxTweens.forEach((tw) => {
        tw.scrollTrigger?.kill()
        tw.kill()
      })
    }
  }, [])

  useLayoutEffect(() => {
    const root = mqRootRef.current
    if (!root || prefersReduced) return

    const tracks = root.querySelectorAll<HTMLElement>('.community-mq-track')
    const pause = () => {
      tracks.forEach((t) => {
        t.style.animationPlayState = 'paused'
      })
    }
    const resume = () => {
      tracks.forEach((t) => {
        t.style.animationPlayState = 'running'
      })
    }
    root.addEventListener('mouseenter', pause)
    root.addEventListener('mouseleave', resume)
    root.addEventListener('focusin', pause)
    root.addEventListener('focusout', resume)

    return () => {
      root.removeEventListener('mouseenter', pause)
      root.removeEventListener('mouseleave', resume)
      root.removeEventListener('focusin', pause)
      root.removeEventListener('focusout', resume)
    }
  }, [prefersReduced])

  return (
    <section ref={secRef} className="pg-sec pg-sec-alt" aria-labelledby="community-spotlights-heading">
      <div className="pg-sec-inner">
        <div className="pg-sec-hd">
          <AboutSectionTitle id="community-spotlights-heading" words={['Member', 'Spotlights']} />
          <p className="about-sec-desc">
            A live feed of builders on VokDev—two columns drift in opposite directions. Hover or focus
            inside to pause and read. Motion respects your reduced-motion settings.
          </p>
        </div>

        {prefersReduced ? (
          <div className="community-mq-static grid max-h-[min(70vh,560px)] gap-8 overflow-y-auto rounded-2xl border border-border/60 bg-card/30 p-4 md:grid-cols-2 md:p-6">
            <ul className="space-y-0" role="list">
              {spotlightColA.map((m) => (
                <li key={m.id} className="list-none">
                  <MemberSpotlightRow member={m} />
                </li>
              ))}
            </ul>
            <ul className="space-y-0" role="list">
              {spotlightColB.map((m) => (
                <li key={m.id} className="list-none">
                  <MemberSpotlightRow member={m} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            ref={mqRootRef}
            className="community-mq-viewport relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/50 bg-card/20 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-1 h-14 bg-linear-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-14 bg-linear-to-t from-background to-transparent" />

            <div className="grid max-h-[min(72vh,600px)] min-h-[min(52vh,420px)] grid-cols-1 gap-0 md:grid-cols-2 md:gap-px md:divide-x md:divide-border/40">
              <div className="community-mq-parallax relative min-h-0 overflow-hidden md:min-h-[min(72vh,600px)]">
                <div className="community-mq-shell h-full overflow-hidden px-4 py-2 sm:px-5">
                  <VerticalMarqueeTrack members={spotlightColA} direction="up" />
                </div>
              </div>
              <div className="community-mq-parallax relative min-h-0 overflow-hidden md:min-h-[min(72vh,600px)]">
                <div className="community-mq-shell h-full overflow-hidden px-4 py-2 sm:px-5">
                  <VerticalMarqueeTrack members={spotlightColB} direction="down" />
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="community-spotlights-foot mt-10 text-center text-sm text-muted-foreground">
          Want your work featured?{' '}
          <Link
            href="/contact"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Get in touch
          </Link>{' '}
          — we rotate spotlights regularly.
        </p>
      </div>
    </section>
  )
}
