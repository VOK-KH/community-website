"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/motion"

export interface InteractiveGridPatternScrollParallax {
  /** Section (or element) whose scroll range drives the parallax */
  triggerRef: React.RefObject<HTMLElement | null>
  /** GSAP scrub smoothing; higher = more inertia */
  scrub?: number
  /** Half-range of vertical motion in % of pattern height (scroll maps across full range) */
  yPercent?: number
  /** Starts slightly zoomed; settles to 1 as the section crosses the viewport */
  scaleExtra?: number
}

export interface InteractiveGridPatternProps {
  className?: string
  children?: React.ReactNode
  /** Size of each grid cell in pixels */
  cellSize?: number
  /** Mouse proximity radius (px) for cell highlight falloff */
  proximity?: number
  /**
   * `fixed` — full viewport (demos). `absolute` — fills positioned parent.
   */
  variant?: "fixed" | "absolute"
  /**
   * `local` — pointer on container only. `global` — window pointer while cursor
   * intersects the container (works when the pattern sits behind other layers).
   */
  pointerMode?: "local" | "global" | "none"
  /** Subtle drifting motion of the whole mesh */
  drift?: boolean
  /** Extra classes on the drifting grid layer (e.g. animation duration overrides) */
  driftClassName?: string
  /** Pulsing center glow */
  ambientPulse?: boolean
  /** Extra classes on the ambient pulse layer */
  ambientPulseClassName?: string
  /** Edge fade into section background */
  vignette?: boolean
  /** Dark base behind cells (fullscreen demos) */
  darkBase?: boolean
  /**
   * Scroll-linked parallax on the pattern container (does not fight CSS drift on the inner layer).
   */
  scrollParallax?: InteractiveGridPatternScrollParallax
}

export function InteractiveGridPattern({
  className,
  children,
  cellSize = 52,
  proximity = 120,
  variant = "absolute",
  pointerMode = "local",
  drift = true,
  driftClassName,
  ambientPulse = true,
  ambientPulseClassName,
  vignette = true,
  darkBase = false,
  scrollParallax,
}: InteractiveGridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [grid, setGrid] = useState({ rows: 0, cols: 0, scale: 1 })
  const [mousePos, setMousePos] = useState({ x: -10000, y: -10000 })
  const [activeCell, setActiveCell] = useState<number | null>(null)

  const updateGrid = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    const scale = Math.max(1, Math.min(width, height) / 800)
    const scaledCellSize = cellSize * scale

    const cols = Math.ceil(width / scaledCellSize) + 1
    const rows = Math.ceil(height / scaledCellSize) + 1

    setGrid({ rows, cols, scale })
  }, [cellSize])

  useEffect(() => {
    updateGrid()
    const container = containerRef.current
    if (!container) return

    const ro = new ResizeObserver(updateGrid)
    ro.observe(container)
    return () => ro.disconnect()
  }, [updateGrid])

  useEffect(() => {
    if (pointerMode !== "global") return

    const onMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        setMousePos({ x: -10000, y: -10000 })
        setActiveCell(null)
        return
      }
      setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [pointerMode])

  useLayoutEffect(() => {
    if (!scrollParallax) return
    registerGsap()
    const el = containerRef.current
    const trigger = scrollParallax.triggerRef.current
    if (!el || !trigger || prefersReducedMotion()) return

    const {
      scrub = 1.2,
      yPercent = 10,
      scaleExtra = 0.03,
    } = scrollParallax
    const half = yPercent / 2

    const tween = gsap.fromTo(
      el,
      { yPercent: half, scale: 1 + scaleExtra },
      {
        yPercent: -half,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- granular deps; avoid unstable `scrollParallax` object identity
  }, [
    scrollParallax?.triggerRef,
    scrollParallax?.scrub,
    scrollParallax?.yPercent,
    scrollParallax?.scaleExtra,
  ])

  const handleLocalMove = useCallback((e: React.MouseEvent) => {
    if (pointerMode !== "local") return
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [pointerMode])

  const handleLocalLeave = useCallback(() => {
    if (pointerMode !== "local") return
    setMousePos({ x: -10000, y: -10000 })
    setActiveCell(null)
  }, [pointerMode])

  const scaledCellSize = cellSize * grid.scale
  const scaledProximity = proximity * grid.scale

  const variantClass =
    variant === "fixed"
      ? "fixed inset-0"
      : "absolute inset-0"

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden will-change-transform",
        variantClass,
        darkBase && "bg-neutral-950",
        pointerMode === "global" && "pointer-events-none",
        className,
      )}
      onMouseMove={handleLocalMove}
      onMouseLeave={handleLocalLeave}
    >
      <div
        className={cn(
          "absolute inset-0 will-change-transform",
          drift && "animate-igp-drift",
          driftClassName,
        )}
      >
        {Array.from({ length: grid.rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {Array.from({ length: grid.cols }).map((_, colIndex) => {
              const index = rowIndex * grid.cols + colIndex
              const cellX = colIndex * scaledCellSize + scaledCellSize / 2
              const cellY = rowIndex * scaledCellSize + scaledCellSize / 2
              const dx = mousePos.x - cellX
              const dy = mousePos.y - cellY
              const distance = Math.sqrt(dx * dx + dy * dy)
              const proximityFactor =
                pointerMode === "none"
                  ? 0
                  : Math.max(0, 1 - distance / scaledProximity)
              const isActive = activeCell === index
              const hot = pointerMode !== "none" && (isActive || proximityFactor > 0.02)
              const fillOpacity = isActive
                ? 0.34
                : proximityFactor * 0.22

              return (
                <div
                  key={index}
                  className="shrink-0 border border-border/25 transition-[box-shadow] duration-700 ease-out"
                  style={{
                    width: scaledCellSize,
                    height: scaledCellSize,
                  }}
                  onMouseEnter={
                    pointerMode === "local" ? () => setActiveCell(index) : undefined
                  }
                  onMouseLeave={
                    pointerMode === "local" ? () => setActiveCell(null) : undefined
                  }
                >
                  <div
                    className={cn(
                      "h-full w-full bg-primary transition-[opacity,box-shadow] duration-700 ease-out motion-reduce:transition-none",
                      hot && "shadow-[0_0_22px_hsl(var(--primary)/0.22)]",
                    )}
                    style={{
                      opacity: pointerMode === "none" ? 0.04 : fillOpacity,
                      transitionDuration: isActive ? "120ms" : "700ms",
                    }}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {ambientPulse && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "animate-igp-ambient rounded-full",
              ambientPulseClassName,
            )}
            style={{
              width: "min(70vmin, 900px)",
              height: "min(70vmin, 900px)",
              background:
                "radial-gradient(circle, hsl(var(--primary) / 0.14) 0%, hsl(var(--secondary) / 0.06) 38%, transparent 72%)",
            }}
          />
        </div>
      )}

      {vignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 50% 45%, transparent 0%, transparent 42%, hsl(var(--background) / 0.55) 100%)",
          }}
        />
      )}

      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  )
}

export default function InteractiveGridPatternDemo() {
  return (
    <InteractiveGridPattern
      variant="fixed"
      pointerMode="local"
      darkBase
      className="z-0"
    />
  )
}
