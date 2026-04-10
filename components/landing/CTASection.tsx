import { VokDevButton } from '@/components/VokDevButton'

export function CTASection() {
  return (
    <section className="border-y border-border/40 bg-card/60 px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Join?</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Start collaborating with thousands of builders and contributors today.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <VokDevButton variant="primary" size="lg">
            Create Account
          </VokDevButton>
          <VokDevButton variant="secondary" size="lg" withGlow={false}>
            Learn More
          </VokDevButton>
        </div>
      </div>
    </section>
  )
}
