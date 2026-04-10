'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground/70"
        aria-label="Toggle theme"
      >
        Theme
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground/80 hover:bg-muted transition-colors"
      aria-label="Toggle theme"
      type="button"
    >
      <span className="inline-flex items-center gap-2">
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
