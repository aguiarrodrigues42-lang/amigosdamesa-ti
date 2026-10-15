import { AboutMesa } from '@/components/site/about-mesa'
import { AnnouncementBar } from '@/components/site/announcement-bar'
import { ArenaSection } from '@/components/site/arena-section'
import { CampaignSection } from '@/components/site/campaign-section'
import { ClubeDoValor } from '@/components/site/clube-do-valor'
import { Differentials } from '@/components/site/differentials'
import { FaqSection } from '@/components/site/faq-section'
import { HeroBlackWeek } from '@/components/site/hero-black-week'
import { MainHeader } from '@/components/site/main-header'
import { MarketMicroTicker } from '@/components/site/market-micro-ticker'
import { PricingSection } from '@/components/site/pricing-section'
import { FinalCta, SiteFooter } from '@/components/site/site-footer'
import { TestimonialsSection } from '@/components/site/testimonials-section'
import { TraderJourney } from '@/components/site/trader-journey'
import { TrustMetrics } from '@/components/site/trust-metrics'

export default function Page() {
  return (
    <>
      <AnnouncementBar />
      <MainHeader />
      <main id="conteudo">
        <HeroBlackWeek />
        <MarketMicroTicker />
        <TrustMetrics />
        <CampaignSection />
        <AboutMesa />
        <TraderJourney />
        <PricingSection />
        <Differentials />
        <ClubeDoValor />
        <ArenaSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
