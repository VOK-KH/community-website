import Footer from '@/components/Footer'
import {
  CommunityHero,
  CommunityFeatures,
  CommunityMemberSpotlights,
  CommunityStats,
  CommunityCta,
} from '@/components/community'

export default function CommunityPage() {
  return (
    <div className="pg">
      <main className="flex-1">
        <CommunityHero />
        <CommunityFeatures />
        <CommunityMemberSpotlights />
        <CommunityStats />
        <CommunityCta />
      </main>
      <Footer />
    </div>
  )
}
