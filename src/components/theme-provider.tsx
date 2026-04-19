'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, scriptProps, ...props }: ThemeProviderProps) {
  const resolvedScriptProps =
    typeof window === 'undefined'
      ? scriptProps
      : ({ ...scriptProps, type: 'application/json' as const } satisfies NonNullable<
          ThemeProviderProps['scriptProps']
        >)

  return (
    <NextThemesProvider {...props} scriptProps={resolvedScriptProps}>
      {children}
    </NextThemesProvider>
  )
}
