import { communityStats } from './data'

export function CommunityStats() {
  return (
    <>
      <hr className="pg-divider mx-auto max-w-5xl border-0" />
      <section className="pg-sec pg-sec-alt" aria-label="Community impact">
        <div className="pg-sec-inner">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-10">
            {communityStats.map((stat) => (
              <div key={stat.label}>
                <div className="pg-stat-num gradient-text">{stat.value}</div>
                <p className="pg-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
