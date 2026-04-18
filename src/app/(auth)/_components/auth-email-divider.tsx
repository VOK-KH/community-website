type Props = { label?: string }

export function AuthEmailDivider({ label = 'or continue with email' }: Props) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-[11px] font-medium uppercase tracking-wider">
        <span className="bg-card px-3 text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}
