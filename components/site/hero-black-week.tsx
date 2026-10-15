'use client'

import { ArrowDown, ArrowRight } from 'lucide-react'
import { useCampaignStatus } from '@/hooks/use-campaign'

const copy = {
  prelaunch: {
    lead: 'A Black Week da Amigos da Mesa já começou! Aproveite as condições especiais de novembro, escolha o plano ideal para sua operação e venha fazer parte da nossa mesa.',
    cta: 'Aproveitar ofertas',
  },
  live: {
    lead: 'A Black Week da Amigos da Mesa já começou! Aproveite as condições especiais de novembro, escolha o plano ideal para sua operação e venha fazer parte da nossa mesa.',
    cta: 'Aproveitar ofertas',
  },
  ended: {
    lead: 'A Black Week 2026 terminou. Os planos da Amigos da Mesa continuam disponíveis — escolha o seu e venha fazer parte da nossa mesa.',
    cta: 'Ver planos',
  },
} as const

export function HeroBlackWeek() {
  const status = useCampaignStatus()
  const c = copy[status]

  return (
    <section id="topo" aria-labelledby="hero-title" className="hero-light relative overflow-hidden">
      <div className="orderbook-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-desk relative grid gap-10 pb-16 pt-8 md:pt-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-7">
          <div className="anim-eyebrow flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-text md:text-xs">
              <span className="h-4 w-0.5 bg-bw-red" aria-hidden />
              Amigos da Mesa | BLACK WEEK
            </p>
          </div>

          <h1 id="hero-title" className="anim-headline flex flex-col gap-4">
            <span className="flex flex-col">
              <span className="display text-[clamp(4.25rem,19vw,10.5rem)] leading-[0.82] text-text">
                Black Week
              </span>
              <span className="display text-outline text-[clamp(4.25rem,19vw,10.5rem)] leading-[0.82]">
                2026
              </span>
            </span>
            <span className="display max-w-2xl text-balance text-[clamp(1.85rem,6.6vw,3.2rem)] leading-[0.98] text-text">
              A hora de dar o próximo passo no Day Trade <span className="text-bw-red">é agora.</span>
            </span>
          </h1>

          <p className="anim-support max-w-xl text-pretty text-base leading-relaxed text-muted-text md:text-lg">
            {c.lead}
          </p>

          <div className="anim-ctas flex flex-col gap-3 sm:flex-row">
            <a
              href="#planos"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-bw-red px-8 font-display text-lg font-bold uppercase tracking-[0.08em] text-text transition-colors hover:bg-bw-red-hot"
            >
              {c.cta}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href="#jornada"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line-strong px-8 font-display text-lg font-bold uppercase tracking-[0.08em] text-text transition-colors hover:border-text"
            >
              Como funciona
              <ArrowDown className="size-5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
