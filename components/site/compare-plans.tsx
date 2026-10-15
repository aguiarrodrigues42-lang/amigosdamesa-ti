'use client'

import { ArrowRight, Check, Crown, X } from 'lucide-react'
import type { CampaignStatus } from '@/config/campaign'
import { categories } from '@/data/plans'
import type { Plan } from '@/data/types'
import { formatBRL } from '@/lib/format'
import { comparisonId, displayedOfferPriceCents, recommendPremium } from '@/lib/premium'
import { cn } from '@/lib/utils'
import { DeskDialog } from './desk-dialog'

type Row = { label: string; get: (p: Plan, s: CampaignStatus) => string }

const rows: Row[] = [
  { label: 'Categoria', get: (p) => categories.find((c) => c.slug === p.category)?.label ?? '—' },
  {
    label: 'Fase de entrada',
    get: (p) => (p.category === 'senior' ? 'Simulador Remunerado' : 'Exame de avaliação'),
  },
  { label: 'Ativo', get: (p) => p.asset ?? 'A confirmar' },
  { label: 'Contratos', get: (p) => (p.contracts != null ? String(p.contracts) : 'A confirmar') },
  {
    label: 'Meta de aprovação',
    get: (p) => (p.category === 'senior' ? 'Não se aplica' : formatBRL(p.metaCents)),
  },
  { label: 'Stop global', get: (p) => formatBRL(p.stopGlobalCents) },
  {
    label: 'Preço exibido',
    get: (p, s) => {
      const v = displayedOfferPriceCents(p, s)
      if (v == null) return 'Indisponível'
      return p.billing === 'monthly' ? `${formatBRL(v)}/mês` : formatBRL(v)
    },
  },
  { label: 'Valor de referência', get: (p) => formatBRL(p.referencePriceCents) },
  { label: 'Cobrança', get: (p) => (p.billing === 'monthly' ? 'Mensal (recorrente)' : 'Pagamento único') },
  {
    label: 'Taxa após aprovação',
    get: (p) =>
      p.afterApprovalCents
        ? `ONE ${formatBRL(p.afterApprovalCents.profitOne)} · PRO ${formatBRL(p.afterApprovalCents.profitPro)}`
        : 'Não informada',
  },
  { label: 'Disponibilidade', get: (p) => (p.status === 'available' ? 'Disponível' : 'Indisponível') },
]

const gridCols: Record<number, string> = {
  1: 'grid-cols-1 md:grid-cols-[176px_minmax(0,1fr)]',
  2: 'grid-cols-2 md:grid-cols-[176px_repeat(2,minmax(0,1fr))]',
  3: 'grid-cols-3 md:grid-cols-[176px_repeat(3,minmax(0,1fr))]',
}

const lower = (s: string) => s.toLocaleLowerCase('pt-BR')

function PremiumSummary({
  rec,
  onOpenPlan,
}: {
  rec: NonNullable<ReturnType<typeof recommendPremium>>
  onOpenPlan: () => void
}) {
  return (
    <section
      aria-labelledby="premium-title"
      className="relative overflow-hidden rounded-2xl border border-bw-red/60 bg-[color-mix(in_srgb,var(--bw-red-deep)_22%,var(--surface))]"
    >
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between md:gap-8 md:p-6">
        <div className="flex min-w-0 flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-sm bg-bw-red px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-text">
            <Crown className="size-3" aria-hidden />
            {rec.badge}
          </span>
          <h3 id="premium-title" className="display text-balance text-2xl md:text-3xl">
            {rec.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-muted-text">{rec.subtext}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-1 border-t border-line pt-4 md:min-w-56 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Plano em destaque</span>
          <span className="display text-2xl">{rec.plan.name}</span>
          <span className="font-mono text-lg tabular-nums text-text">
            {formatBRL(rec.priceCents)}
            {rec.plan.billing === 'monthly' ? <span className="text-sm text-muted-text">/mês</span> : null}
          </span>
          <button
            type="button"
            onClick={onOpenPlan}
            className="mt-2 hidden h-11 items-center justify-center gap-2 rounded-full bg-bw-red px-5 text-sm font-semibold text-text transition-colors hover:bg-[#e8323e] md:inline-flex"
          >
            Ver condições
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
      <div className="grid gap-4 border-t border-line p-5 md:grid-cols-2 md:p-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Por que este destaque</p>
          <ul className="flex flex-col gap-2">
            {rec.reasons.map((r) => (
              <li key={r} className="flex gap-2 text-sm leading-relaxed text-text">
                <Check className="mt-1 size-3.5 shrink-0 text-bw-red" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Antes de decidir</p>
          <ul className="flex flex-col gap-2">
            {rec.warnings.map((w) => (
              <li key={w} className="border-l border-line-strong pl-3 text-sm leading-relaxed text-muted-text">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-line px-5 py-3 text-xs leading-relaxed text-subtle md:px-6">{rec.disclosure}</p>
    </section>
  )
}

export function ComparePlans({
  open,
  onClose,
  plans,
  status,
  onRemove,
  onOpenPlan,
}: {
  open: boolean
  onClose: () => void
  plans: Plan[]
  status: CampaignStatus
  onRemove: (id: string) => void
  onOpenPlan: (id: string) => void
}) {
  const rec = recommendPremium(plans, status)
  const premiumKey = rec?.recommendedId
  const n = Math.min(Math.max(plans.length, 1), 3)
  const isPremium = (p: Plan) => comparisonId(p) === premiumKey

  const commonNotes = plans.length
    ? plans[0].notes.filter((note) => plans.every((p) => p.notes.some((x) => lower(x) === lower(note))))
    : []
  const exclusiveOf = (p: Plan) =>
    p.notes.filter((note) => !commonNotes.some((c) => lower(c) === lower(note)))

  return (
    <DeskDialog
      open={open}
      onClose={onClose}
      variant="fullscreen"
      eyebrow={
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
          {`${plans.length} de 3 planos`}
        </span>
      }
      title="Comparar planos"
      description="Contratos, meta, stop e custos lado a lado."
      footer={
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          {rec ? (
            <button
              type="button"
              onClick={() => onOpenPlan(rec.plan.id)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bw-red px-6 text-sm font-semibold text-text transition-colors hover:bg-[#e8323e]"
            >
              {`Ver condições do ${rec.plan.name}`}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong px-6 text-sm text-text transition-colors hover:border-text"
          >
            Voltar ao catálogo
          </button>
        </div>
      }
    >
      {plans.length < 2 ? (
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-line-strong p-6">
          <p className="display text-2xl">Selecione ao menos 2 planos.</p>
          <p className="text-sm leading-relaxed text-muted-text">
            Volte ao catálogo e toque em “Comparar” nos cards para montar sua comparação.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {rec ? (
            <PremiumSummary rec={rec} onOpenPlan={() => onOpenPlan(rec.plan.id)} />
          ) : (
            <p className="rounded-xl border border-line p-4 text-sm text-muted-text">
              Nenhum plano selecionado está disponível para destaque no momento.
            </p>
          )}

          <div role="table" aria-label="Comparação entre planos selecionados" className="flex flex-col">
            <div
              role="row"
              className={cn(
                'sticky -top-5 z-10 grid gap-2 border-b border-line bg-surface pb-3 pt-5 md:gap-4',
                gridCols[n],
              )}
            >
              <span role="columnheader" className="sr-only md:not-sr-only md:self-end md:font-mono md:text-[10px] md:uppercase md:tracking-[0.18em] md:text-subtle">
                Atributo
              </span>
              {plans.map((p) => (
                <div
                  key={p.id}
                  role="columnheader"
                  className={cn(
                    'flex min-w-0 flex-col gap-2 rounded-xl border p-2.5 md:p-3',
                    isPremium(p) ? 'border-bw-red bg-bw-red/10' : 'border-line',
                  )}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="display min-w-0 break-words text-base leading-tight md:text-xl">{p.name}</span>
                    <button
                      type="button"
                      onClick={() => onRemove(p.id)}
                      className="-mr-1 -mt-1 flex size-8 shrink-0 items-center justify-center rounded-full text-subtle hover:text-text"
                      aria-label={`Remover ${p.name} da comparação`}
                    >
                      <X className="size-4" aria-hidden />
                    </button>
                  </div>
                  {isPremium(p) ? (
                    <span className="inline-flex w-fit items-center gap-1 rounded-sm bg-bw-red px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-text">
                      <Crown className="size-2.5" aria-hidden />
                      Premium
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            {rows.map((r) => {
              const values = plans.map((p) => r.get(p, status))
              const differs = new Set(values).size > 1
              return (
                <div key={r.label} role="row" className={cn('grid gap-x-2 gap-y-1.5 border-b border-line py-3 md:gap-x-4', gridCols[n])}>
                  <span
                    role="rowheader"
                    className="col-span-full flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle md:col-span-1 md:text-[11px]"
                  >
                    {r.label}
                    {differs ? (
                      <span className="inline-flex items-center gap-1 normal-case tracking-normal text-muted-text">
                        <span className="size-1 rounded-full bg-bw-red" aria-hidden />
                        difere
                      </span>
                    ) : null}
                  </span>
                  {plans.map((p, i) => (
                    <span
                      key={p.id}
                      role="cell"
                      className={cn(
                        'min-w-0 break-words rounded-md px-2.5 py-1.5 font-mono text-[13px] leading-snug tabular-nums md:text-sm',
                        isPremium(p) ? 'bg-bw-red/10 text-text' : 'text-text',
                        values[i] === 'Indisponível' && 'text-subtle',
                      )}
                    >
                      {values[i]}
                    </span>
                  ))}
                </div>
              )
            })}
          </div>

          <section aria-labelledby="beneficios-title" className="flex flex-col gap-4">
            <h3 id="beneficios-title" className="display text-2xl">
              Benefícios e condições
            </h3>
            {commonNotes.length ? (
              <div className="flex flex-col gap-2 rounded-xl border border-line p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Comum a todos</p>
                <ul className="flex flex-wrap gap-2">
                  {commonNotes.map((c) => (
                    <li key={c} className="rounded-full border border-line-strong px-3 py-1 text-xs text-muted-text">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <ul className="grid gap-3 md:grid-cols-3">
              {plans.map((p) => {
                const ex = exclusiveOf(p)
                return (
                  <li
                    key={p.id}
                    className={cn(
                      'flex flex-col gap-2 rounded-xl border p-4',
                      isPremium(p) ? 'border-bw-red/60' : 'border-line',
                    )}
                  >
                    <p className="display text-lg">{p.name}</p>
                    {ex.length ? (
                      <ul className="flex flex-col gap-1.5">
                        {ex.map((e) => (
                          <li key={e} className="flex gap-2 text-sm leading-relaxed text-text">
                            <Check className="mt-1 size-3.5 shrink-0 text-bw-red" aria-hidden />
                            {e}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-text">Sem condições adicionais nesta comparação.</p>
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="text-xs leading-relaxed text-subtle">
              Pode haver cobrança de licença da plataforma Profit, sujeita a confirmação vigente.
              Preços Black Week só aparecem após aprovação comercial.
            </p>
          </section>
        </div>
      )}
    </DeskDialog>
  )
}
