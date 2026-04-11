import Footer from '@/components/Footer'
import {
  CommunityHero,
  CommunityStats,
  CommunityFeatures,
  CommunityMemberSpotlights,
  CommunityCta,
} from '@/components/community'

export default function CommunityPage() {
  return (
    <div className="pg">
      <main className="flex-1">
        <CommunityHero />
        <CommunityStats />
        <CommunityFeatures />
        <CommunityMemberSpotlights />
        <CommunityCta />
      </main>
      <Footer />
    </div>
  )
}
