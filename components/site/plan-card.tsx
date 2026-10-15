'use client'

import { AlertTriangle, Check, Plus } from 'lucide-react'
import type { CampaignStatus } from '@/config/campaign'
import { getApprovedPromo } from '@/config/campaign'
import type { Plan } from '@/data/types'
import { formatBRL } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Term } from './term'

export function PlanPrice({ plan, status, size = 'lg' }: { plan: Plan; status: CampaignStatus; size?: 'lg' | 'md' }) {
  const promo = getApprovedPromo(plan.id, status)
  if (plan.status === 'unavailable' || plan.baseOfferPriceCents == null) {
    return (
      <div className="flex flex-col gap-1">
        <span className="eyebrow">Status</span>
        <span className="display text-3xl text-subtle">Indisponível no momento</span>
      </div>
    )
  }
  const price = promo?.campaignPriceCents ?? plan.baseOfferPriceCents
  return (
    <div className="flex flex-col gap-1.5">
      <span className="eyebrow">{promo ? 'Preço Black Week' : 'Preço-base do catálogo'}</span>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            'font-display font-bold tabular-nums tracking-tight text-text',
            size === 'lg' ? 'text-[2.75rem] leading-none' : 'text-3xl leading-none',
          )}
        >
          {formatBRL(price)}
        </span>
        {plan.billing === 'monthly' ? <span className="text-sm text-muted-text">/mês</span> : null}
      </div>
      {plan.referencePriceCents != null ? (
        <p className="text-xs text-subtle">
          Valor de referência{' '}
          <span className="tabular-nums line-through decoration-subtle">
            {formatBRL(plan.referencePriceCents)}
          </span>
        </p>
      ) : null}
      {!promo ? (
        <p className="text-xs text-subtle">Sujeito às condições da campanha quando aprovadas.</p>
      ) : null}
    </div>
  )
}

export function PlanCard({
  plan,
  status,
  compared,
  compareDisabled,
  onToggleCompare,
  onOpen,
}: {
  plan: Plan
  status: CampaignStatus
  compared: boolean
  compareDisabled: boolean
  onToggleCompare: () => void
  onOpen: () => void
}) {
  const unavailable = plan.status === 'unavailable'
  const exclusive = plan.category === 'exclusive'
  const senior = plan.category === 'senior'

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border transition-all duration-200',
        exclusive ? 'silver-edge' : 'border-line bg-surface',
        !unavailable && 'hover:-translate-y-0.5 hover:border-orange/50 hover:shadow-[0_18px_50px_-24px_var(--orange-glow)]',
        unavailable && 'opacity-70',
        plan.featured && !exclusive && 'border-orange/40',
      )}
    >
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center gap-2">
          {plan.featured ? (
            <span className="rounded-full bg-orange px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-bg-deep">
              Mais vendido
            </span>
          ) : null}
          {exclusive ? (
            <span className="rounded-full border border-silver/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-silver">
              Edição limitada
            </span>
          ) : null}
          {unavailable ? (
            <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
              Indisponível
            </span>
          ) : null}
          {plan.billing === 'monthly' ? (
            <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-text">
              Mensal
            </span>
          ) : null}
        </div>

        <div className="flex items-end justify-between gap-4">
          <h3
            id={`plan-${plan.id}`}
            className={cn('display text-[1.7rem]', exclusive && 'text-silver-metal')}
          >
            {plan.name}
          </h3>
          <div className="flex shrink-0 flex-col items-end">
            {plan.contracts != null ? (
              <>
                <span className="font-display text-[2.4rem] font-bold leading-none tabular-nums text-orange">
                  {plan.contracts}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                  contratos
                </span>
              </>
            ) : (
              <span className="rounded-md border border-dashed border-line-strong px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                Contratos a confirmar
              </span>
            )}
          </div>
        </div>

        <dl className="flex flex-col text-sm">
          {plan.asset ? (
            <div className="flex items-center justify-between border-t border-line py-2.5">
              <dt className="text-muted-text">Ativo</dt>
              <dd className="font-mono text-text">{plan.asset}</dd>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-4 border-t border-line py-2.5">
            <dt className="text-muted-text">
              <Term k="meta">Meta de aprovação</Term>
            </dt>
            <dd className="text-right font-mono tabular-nums text-text">
              {senior ? 'Não se aplica' : formatBRL(plan.metaCents)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-y border-line py-2.5">
            <dt className="text-muted-text">
              <Term k="stop">Stop Global</Term>
            </dt>
            <dd className="font-mono tabular-nums text-text">{formatBRL(plan.stopGlobalCents)}</dd>
          </div>
          {plan.afterApprovalCents ? (
            <div className="flex flex-col gap-1.5 border-b border-line py-2.5">
              <dt className="text-muted-text">Taxa única após aprovação</dt>
              <dd className="flex justify-between font-mono text-xs tabular-nums text-text">
                <span>{`Profit ONE ${formatBRL(plan.afterApprovalCents.profitOne)}`}</span>
                <span>{`PRO ${formatBRL(plan.afterApprovalCents.profitPro)}`}</span>
              </dd>
            </div>
          ) : null}
        </dl>

        {senior ? (
          <p className="text-sm leading-relaxed text-muted-text">
            Entrada direta no <Term k="sr">Simulador Remunerado</Term> para trader experiente,
            segundo regras específicas.
          </p>
        ) : null}

        {plan.notes.length > 0 ? (
          <ul className="flex flex-col gap-2 text-sm">
            {plan.notes.slice(0, 3).map((n) => (
              <li key={n} className="flex items-start gap-2 text-muted-text">
                <Check className="mt-0.5 size-3.5 shrink-0 text-orange" aria-hidden />
                <span className="leading-snug">{n}</span>
              </li>
            ))}
            {plan.notes.length > 3 ? (
              <li className="pl-5 text-xs text-subtle">{`+${plan.notes.length - 3} condições no detalhe`}</li>
            ) : null}
          </ul>
        ) : null}

        {plan.reviewFlags.length > 0 ? (
          <p className="flex items-start gap-2 rounded-lg border border-dashed border-orange/40 px-3 py-2 text-xs leading-relaxed text-orange">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            Pendente de validação comercial
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-5 border-t border-line pt-5">
          <PlanPrice plan={plan} status={status} />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpen}
              className={cn(
                'inline-flex h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors',
                unavailable
                  ? 'border border-line-strong text-muted-text hover:text-text'
                  : 'bg-orange text-bg-deep hover:bg-orange-light',
              )}
            >
              Ver condições
              <span className="sr-only">{` do ${plan.name}`}</span>
            </button>
            <button
              type="button"
              onClick={onToggleCompare}
            aria-disabled={compareDisabled && !compared ? true : undefined}
            aria-pressed={compared}
            className={cn(
              'inline-flex h-11 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors aria-disabled:opacity-40',
                compared
                  ? 'border-orange text-orange'
                  : 'border-line-strong text-muted-text hover:text-text',
              )}
            >
              {compared ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
              Comparar
              <span className="sr-only">{` ${plan.name}`}</span>
            </button>
          </div>
          <p className="text-[11px] leading-relaxed text-subtle">
            Consulte custos de licença da plataforma e condições de repasse.
          </p>
        </div>
      </div>
    </article>
  )
}
