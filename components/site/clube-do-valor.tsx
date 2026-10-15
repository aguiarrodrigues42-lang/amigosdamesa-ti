import Image from 'next/image'
import { ArrowUpRight, Check } from 'lucide-react'
import { links } from '@/data/links'
import { SectionHeading } from './section-heading'

const benefits = [
  'Sala ao vivo com operações comentadas',
  'Conteúdo diário de leitura de mercado',
  'Comunidade de traders e mentores',
  'Acesso pela Área do Trader',
]

export function ClubeDoValor() {
  return (
    <section id="clube" aria-labelledby="clube-title" className="border-t border-line bg-bg-deep py-24 lg:py-32">
      <div className="container-desk grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/sala-clube.png"
              alt="Mesa de operação com múltiplos monitores em ambiente escuro"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-deep/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-text backdrop-blur">
              <span className="size-1.5 rounded-full bg-orange" aria-hidden />
              Sala ao vivo
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8">
          <SectionHeading
            eyebrow="Clube do Valor"
            title={<span id="clube-title">Operar junto, aprender todo dia.</span>}
            lead="Assinatura de comunidade e conteúdo para quem quer rotina, referência e acompanhamento — independente do plano de avaliação."
          />
          <ul className="flex flex-col">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 border-t border-line py-3 last:border-b">
                <Check className="size-4 shrink-0 text-orange" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <span className="eyebrow">Assinatura</span>
              <span className="font-display text-4xl font-bold tabular-nums">
                R$ 197,00<span className="text-base font-normal text-muted-text">/mês</span>
              </span>
              {!links.clubeCheckoutConfirmed ? (
                <span className="text-xs text-subtle">Valor a confirmar no checkout oficial.</span>
              ) : null}
            </div>
            <a
              href={links.clubeCheckout}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-orange px-6 font-semibold text-bg-deep hover:bg-orange-light"
            >
              Assinar o Clube
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
