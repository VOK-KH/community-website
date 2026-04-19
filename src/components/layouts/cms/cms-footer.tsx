import { Separator } from '@/components/ui/separator'

export function CmsFooter() {
  return (
    <footer className="pb-6 pt-10">
      <Separator className="opacity-60" />
      <div className="mx-auto w-full max-w-6xl px-4 py-5">
        <p className="text-center text-[11px] leading-relaxed text-muted-foreground md:text-left">
          CMS access is protected by Better Auth (sessions, rate limits, and secure cookies).
        </p>
      </div>
    </footer>
  )
}
