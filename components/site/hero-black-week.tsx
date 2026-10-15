'use client'

import { ArrowDown, ArrowRight } from 'lucide-react'
import { campaign } from '@/config/campaign'
import { useCampaignStatus } from '@/hooks/use-campaign'
import { CandleChart } from './candle-chart'

const copy = {
  prelaunch: {
    pill: 'Em breve · Novembro 2026',
    lead: 'A Black Week da Amigos da Mesa está chegando. Em novembro, você vai encontrar uma seleção especial de condições para conhecer nossos planos e escolher como dar o próximo passo no Day Trade.',
    cta: 'Conhecer os planos',
    panelStatus: 'Em preparação',
  },
  live: {
    pill: 'Black Week liberada',
    lead: 'A Black Week chegou à Amigos da Mesa. Reunimos condições especiais de novembro para você conhecer nossos planos, comparar as modalidades e encontrar a estrutura que combina com seu momento no Day Trade.',
    cta: 'Explorar ofertas Black Week',
    panelStatus: 'Liberada',
  },
  ended: {
    pill: 'Edição encerrada',
    lead: 'A Black Week 2026 foi encerrada. Os planos da Amigos da Mesa seguem disponíveis nas condições vigentes do catálogo.',
    cta: 'Ver planos',
    panelStatus: 'Encerrada',
  },
} as const

function MarketPanel({ status }: { status: string }) {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-line bg-surface/80">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-text">
          <span className="size-1.5 rounded-full bg-bw-red" aria-hidden />
          Black Week · Mesa PRO
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
          Visual ilustrativo
        </span>
      </div>
      <CandleChart className="h-auto w-full px-2 pt-4" />
      <dl className="grid grid-cols-3 border-t border-line">
        {[
          ['Campanha', status],
          ['Período', 'Nov 2026'],
          ['Ativos', 'WIN · WDO · BIT'],
        ].map(([k, v], i) => (
          <div key={k} className={`flex flex-col gap-1 px-4 py-3 ${i > 0 ? 'border-l border-line' : ''}`}>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">{k}</dt>
            <dd className="font-display text-lg font-bold uppercase leading-tight">{v}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="sr-only">
        Gráfico de candles ilustrativo, sem dados reais de mercado. Campanha Black Week 2026 da
        Amigos da Mesa PRO, em novembro de 2026, para WIN, WDO e BIT.
      </figcaption>
    </figure>
  )
}

export function HeroBlackWeek() {
  const status = useCampaignStatus()
  const effective = status === 'live' && !campaign.approved ? 'prelaunch' : status
  const c = copy[effective]

  return (
    <section id="topo" aria-labelledby="hero-title" className="hero-light relative overflow-hidden">
      <div className="orderbook-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-desk relative grid gap-10 pb-16 pt-8 md:pt-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-7">
          <div className="anim-eyebrow flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-text md:text-xs">
              <span className="h-4 w-0.5 bg-bw-red" aria-hidden />
              Amigos da Mesa PRO apresenta
              <span className="hidden text-subtle sm:inline">/</span>
              <span className="hidden text-muted-text sm:inline">Novembro 2026</span>
            </p>
          </div>

          <h1 id="hero-title" className="anim-headline flex flex-col gap-4">
            <span className="flex flex-col">
              <span className="display text-[clamp(4.25rem,19vw,10.5rem)] leading-[0.82] text-text">
                Black Week
              </span>
              <span className="flex items-end gap-4">
                <span className="display text-outline text-[clamp(4.25rem,19vw,10.5rem)] leading-[0.82]">
                  2026
                </span>
                <span className="mb-2 inline-flex items-center rounded-sm bg-bw-red px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-text md:mb-4 md:text-[11px]">
                  {c.pill}
                </span>
              </span>
            </span>
            <span className="display max-w-2xl text-balance text-[clamp(1.85rem,7.4vw,3.4rem)] leading-[0.98] text-text">
              Uma <span className="text-bw-red">nova oportunidade</span> para o seu Day Trade.
            </span>
          </h1>

          <p className="anim-support max-w-xl text-pretty text-base leading-relaxed text-muted-text md:text-lg">
            {c.lead}
          </p>

          <div className="anim-ctas flex flex-col gap-3 sm:flex-row">
            <a
              href="#planos"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-bw-red px-8 font-display text-lg font-bold uppercase tracking-[0.08em] text-text transition-colors hover:bg-[#e8323e]"
            >
              {c.cta}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href="#jornada"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line-strong px-8 font-display text-lg font-bold uppercase tracking-[0.08em] text-text transition-colors hover:border-text"
            >
              Entenda como funciona
              <ArrowDown className="size-5" aria-hidden />
            </a>
          </div>

          <p className="anim-ctas font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-subtle">
            WIN / WDO / BIT · Avaliação conforme modalidade · Consulte critérios, custos e regulamento.
          </p>
        </div>

        <div className="anim-support lg:col-span-5">
          <MarketPanel status={c.panelStatus} />
        </div>
      </div>
    </section>
  )
}
