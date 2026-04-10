import { communityStats } from './data'

export function StatsSection() {
  return (
    <section className="border-y border-border/40 bg-card/40 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {communityStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
