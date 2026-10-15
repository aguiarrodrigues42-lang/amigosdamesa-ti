'use client'

import { ArrowUpRight, Check, Plus } from 'lucide-react'
import type { CampaignStatus } from '@/config/campaign'
import type { Plan } from '@/data/types'
import { formatBRL } from '@/lib/format'
import { getCheckoutUrl, getPlanPricing } from '@/lib/pricing'
import { cn } from '@/lib/utils'
import { Term } from './term'

export function DiscountBadge({ percent, size = 'md' }: { percent: number; size?: 'sm' | 'md' }) {
  return (
    <span className="flex flex-wrap items-center gap-2">
      <span
        className={cn(
          'inline-flex items-center rounded-full bg-bw-red font-display font-bold uppercase leading-none tabular-nums text-text',
          size === 'md' ? 'px-3 py-1.5 text-base' : 'px-2.5 py-1 text-sm',
        )}
      >
        {`${percent}% OFF`}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-text">
        Black Week 2026
      </span>
    </span>
  )
}

export function PlanPrice({
  plan,
  status,
  size = 'lg',
}: {
  plan: Plan
  status: CampaignStatus
  size?: 'lg' | 'md'
}) {
  const { salePriceCents, discountPercent, monthly } = getPlanPricing(plan, status)
  if (salePriceCents == null) {
    return <span className="display text-3xl text-subtle">Indisponível</span>
  }
  return (
    <div className="flex flex-col gap-3">
      {discountPercent != null ? (
        <DiscountBadge percent={discountPercent} size={size === 'lg' ? 'md' : 'sm'} />
      ) : null}
      <p className="flex items-baseline gap-1.5">
        <span
          className={cn(
            'font-display font-bold leading-none tabular-nums tracking-tight text-text',
            size === 'lg' ? 'text-[2.9rem]' : 'text-3xl',
          )}
        >
          {formatBRL(salePriceCents)}
        </span>
        {monthly ? <span className="text-base text-muted-text">/mês</span> : null}
      </p>
    </div>
  )
}

export function BuyButton({ plan, className }: { plan: Plan; className?: string }) {
  const url = getCheckoutUrl(plan)
  const base =
    'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold uppercase tracking-[0.06em]'
  if (plan.status !== 'available') {
    return (
      <span aria-disabled="true" className={cn(base, 'border border-line-strong text-subtle', className)}>
        Indisponível
      </span>
    )
  }
  if (!url) {
    return (
      <span
        aria-disabled="true"
        title="Link de compra em configuração"
        className={cn(base, 'cursor-not-allowed bg-bw-red/45 text-text/70', className)}
      >
        Comprar agora
        <span className="sr-only">{` — link de compra do ${plan.name} em configuração`}</span>
      </span>
    )
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, 'btn-cta', className)}
    >
      Comprar agora
      <ArrowUpRight className="size-4" aria-hidden />
      <span className="sr-only">{` o ${plan.name}`}</span>
    </a>
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
  const extraNotes = plan.notes.length - 3

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border transition-all duration-200',
        exclusive ? 'silver-edge' : 'border-line bg-surface',
        !unavailable && 'hover:-translate-y-0.5 hover:border-bw-red/50 hover:shadow-[0_18px_50px_-24px_var(--bw-red-glow)]',
        unavailable && 'opacity-70',
        plan.featured && !exclusive && 'border-orange/40',
      )}
    >
      <div className="flex flex-1 flex-col gap-5 p-6">
        {plan.featured || exclusive || unavailable || plan.billing === 'monthly' ? (
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
        ) : null}

        <div className="flex items-end justify-between gap-4">
          <h3 id={`plan-${plan.id}`} className={cn('display text-[1.7rem]', exclusive && 'text-silver-metal')}>
            {plan.name}
          </h3>
          {plan.contracts != null ? (
            <p className="flex shrink-0 flex-col items-end">
              <span className="font-display text-[2.4rem] font-bold leading-none tabular-nums text-orange">
                {plan.contracts}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">contratos</span>
            </p>
          ) : null}
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
              <Term k="meta">Meta</Term>
            </dt>
            <dd className="text-right font-mono tabular-nums text-text">
              {senior ? 'Não se aplica' : formatBRL(plan.metaCents)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-y border-line py-2.5">
            <dt className="text-muted-text">
              <Term k="stop">Stop global</Term>
            </dt>
            <dd className="font-mono tabular-nums text-text">{formatBRL(plan.stopGlobalCents)}</dd>
          </div>
          {plan.afterApprovalCents ? (
            <div className="flex items-center justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-muted-text">Taxa após aprovação</dt>
              <dd className="text-right font-mono text-xs tabular-nums text-text">
                {`ONE ${formatBRL(plan.afterApprovalCents.profitOne)} · PRO ${formatBRL(plan.afterApprovalCents.profitPro)}`}
              </dd>
            </div>
          ) : null}
        </dl>

        {senior ? (
          <p className="text-sm text-muted-text">
            Entrada direta no <Term k="sr">Simulador Remunerado</Term>.
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
            {extraNotes > 0 ? (
              <li className="pl-5">
                <button
                  type="button"
                  onClick={onOpen}
                  className="text-xs text-muted-text underline decoration-line-strong underline-offset-4 hover:text-text"
                >
                  {`+${extraNotes} ${extraNotes === 1 ? 'benefício' : 'benefícios'}`}
                </button>
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-col gap-5 border-t border-line pt-5">
          <PlanPrice plan={plan} status={status} />
          <BuyButton plan={plan} className="w-full" />
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onOpen}
              className="text-sm text-muted-text underline decoration-line-strong underline-offset-4 hover:text-text"
            >
              Detalhes
              <span className="sr-only">{` do ${plan.name}`}</span>
            </button>
            <button
              type="button"
              onClick={onToggleCompare}
              aria-disabled={compareDisabled && !compared ? true : undefined}
              aria-pressed={compared}
              className={cn(
                'inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors aria-disabled:opacity-40',
                compared ? 'border-orange text-orange' : 'border-line-strong text-muted-text hover:text-text',
              )}
            >
              {compared ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
              Comparar
              <span className="sr-only">{` ${plan.name}`}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
