import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type AuthFlowVariant = 'login' | 'register' | 'joint'

type Props = {
  variant: AuthFlowVariant
  className?: string
  children: ReactNode
}

export function AuthFlowSurface({ variant, className, children }: Props) {
  return <div className={cn('auth-flow', `auth-flow--${variant}`, className)}>{children}</div>
}
