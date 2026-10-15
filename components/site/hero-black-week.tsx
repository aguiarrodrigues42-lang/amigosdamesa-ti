import { ArrowDown, ArrowRight } from 'lucide-react'
import { CandleChart } from './candle-chart'

function CampaignSeal() {
  return (
    <div className="relative inline-flex flex-col border border-line-strong px-4 py-3">
      {(['-left-px -top-px', '-right-px -top-px', '-bottom-px -left-px', '-bottom-px -right-px'] as const).map(
        (pos) => (
          <span key={pos} className={`absolute ${pos} size-2 bg-orange`} aria-hidden />
        ),
      )}
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-text">
        Edição · Nov 2026
      </span>
      <span className="display text-3xl leading-none text-text">Black Week</span>
    </div>
  )
}

export function HeroBlackWeek() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="micrograd relative overflow-hidden">
      <div className="container-desk grid gap-12 pb-20 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-24">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <div className="anim-eyebrow flex flex-wrap items-center gap-4">
            <CampaignSeal />
            <p className="eyebrow max-w-[16rem] leading-relaxed">
              Mesa proprietária de Day Trade · WIN · WDO · BIT
            </p>
          </div>

          <h1
            id="hero-title"
            className="anim-headline display text-balance text-[clamp(3.4rem,7.4vw,7.6rem)]"
          >
            Sua próxima operação começa com <span className="text-orange">regras claras.</span>
          </h1>

          <p className="anim-support max-w-xl text-pretty text-lg leading-relaxed text-muted-text">
            Compare modalidades, metas, stops e custos para escolher o plano mais coerente com
            sua estratégia. Transparência antes da escolha.
          </p>

          <div className="anim-ctas flex flex-col gap-3 sm:flex-row">
            <a
              href="#planos"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-orange px-7 text-base font-semibold text-bg-deep transition-colors hover:bg-orange-light"
            >
              Comparar planos
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a
              href="#jornada"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-line-strong px-7 text-base text-text transition-colors hover:border-orange"
            >
              Como funciona a avaliação
              <ArrowDown className="size-4" aria-hidden />
            </a>
          </div>

          <p className="anim-ctas max-w-xl border-l border-line-strong pl-4 text-[13px] leading-relaxed text-subtle">
            Avaliações em ambiente simulado. Regras, custos, aprovação e elegibilidade a repasses
            variam conforme o plano e o regulamento vigente.
          </p>
        </div>

        <div className="anim-support lg:col-span-5 lg:pt-6">
          <figure className="relative overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-text">
                <span className="size-1.5 rounded-full bg-orange" aria-hidden />
                WIN · M5
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                Visual ilustrativo
              </span>
            </div>
            <CandleChart className="h-auto w-full px-2 pt-4" />
            <div className="grid grid-cols-3 border-t border-line">
              {[
                ['Etapa 01', 'Exame'],
                ['Etapa 02', 'SR'],
                ['Etapa 03', 'CR'],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex flex-col gap-1 px-4 py-3 ${i > 0 ? 'border-l border-line' : ''}`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                    {k}
                  </span>
                  <span className="display text-xl">{v}</span>
                </div>
              ))}
            </div>
            <figcaption className="sr-only">
              Gráfico de candles ilustrativo, sem dados reais de mercado, e as três etapas da
              jornada: Exame, Simulador Remunerado e Conta Real.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
