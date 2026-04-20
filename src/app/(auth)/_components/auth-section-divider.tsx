import { cn } from '@/lib/utils'

type Props = {
  label: string
  className?: string
}

export function AuthSectionDivider({ label, className }: Props) {
  return (
    <div className={cn('relative my-4', className)} role="presentation">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <span className="w-full border-t border-white/12" />
      </div>
      <div className="relative flex justify-center text-[11px] font-medium uppercase tracking-wider text-[var(--vok-text2)]">
        <span className="auth-section-divider-pill px-3">{label}</span>
      </div>
    </div>
  )
}
