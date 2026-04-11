import { VokDevButton } from '@/components/VokDevButton'

export function CommunityCta() {
  return (
    <section className="pg-cta" aria-labelledby="community-cta-heading">
      <div className="pg-cta-inner">
        <h2 id="community-cta-heading">Ready to join us?</h2>
        <p>
          Create an account to follow builders, join discussions, and get early access to events and
          programs.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <VokDevButton variant="primary" size="lg" withGlow>
            Create account
          </VokDevButton>
          <VokDevButton variant="secondary" size="lg">
            Learn more
          </VokDevButton>
        </div>
      </div>
    </section>
  )
}
