'use client'

import * as React from 'react'

type CmsLayoutContextValue = {
  openMobileNav: () => void
}

const CmsLayoutContext = React.createContext<CmsLayoutContextValue | null>(null)

export function CmsLayoutProvider({
  children,
  value,
}: Readonly<{ children: React.ReactNode; value: CmsLayoutContextValue }>) {
  return <CmsLayoutContext.Provider value={value}>{children}</CmsLayoutContext.Provider>
}

export function useCmsLayoutNav() {
  const ctx = React.useContext(CmsLayoutContext)
  if (!ctx) {
    throw new Error('useCmsLayoutNav must be used within CmsLayoutProvider')
  }
  return ctx
}
