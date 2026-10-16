'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Plus } from 'lucide-react'
import type { CampaignStatus } from '@/config/campaign'
import type { Plan } from '@/data/types'
import { formatBRL } from '@/lib/format'
import {
  DEFAULT_PLATFORM,
  INSTALLMENTS,
  getCheckoutUrl,
  getPlanPlatformPricing,
  getPlanPricing,
  platformOptions,
  type PlatformId,
} from '@/lib/pricing'
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
      <span className="font-display text-xs font-semibold uppercase tracking-[0.06em] text-muted-text">
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
            'font-display font-extrabold leading-none tabular-nums tracking-[-0.02em] text-text',
            size === 'lg' ? 'text-[clamp(2rem,7vw,2.75rem)]' : 'text-3xl',
          )}
        >
          {formatBRL(salePriceCents)}
        </span>
        {monthly ? <span className="text-base text-muted-text">/mês</span> : null}
      </p>
    </div>
  )
}

export function BuyButton({
  plan,
  platform,
  className,
}: {
  plan: Plan
  platform?: PlatformId
  className?: string
}) {
  const url = getCheckoutUrl(plan, platform)
  const base =
    'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-display text-sm font-bold uppercase tracking-[0.02em]'
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

function PlatformPicker({
  planId,
  value,
  onChange,
}: {
  planId: string
  value: PlatformId
  onChange: (id: PlatformId) => void
}) {
  const labelId = `platform-${planId}`
  return (
    <div className="flex flex-col gap-3">
      <p id={labelId} className="font-display text-[13px] font-semibold uppercase tracking-[0.04em] text-text">
        Escolha sua plataforma
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="grid grid-cols-2 gap-2">
        {platformOptions.map((opt) => {
          const selected = opt.id === value
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.id)}
              className={cn(
                'relative flex min-h-16 flex-col items-start justify-center gap-1 rounded-xl border px-3 py-2.5 text-left transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange',
                selected
                  ? 'border-orange bg-orange/10 shadow-[inset_0_0_0_1px_var(--orange)]'
                  : 'border-line-strong bg-bg-deep/40 hover:border-muted-text',
              )}
            >
              <span className="flex w-full items-center justify-between gap-2">
                <span
                  className={cn(
                    'font-display text-sm font-semibold uppercase leading-none tracking-[0.01em]',
                    selected ? 'text-text' : 'text-muted-text',
                  )}
                >
                  {opt.name}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-full border',
                    selected ? 'border-orange bg-orange' : 'border-line-strong',
                  )}
                >
                  {selected ? <Check className="size-3 text-bg-deep" strokeWidth={3} /> : null}
                </span>
              </span>
              {opt.extraPriceCents === 0 ? (
                <span className="flex flex-wrap items-baseline gap-1.5 font-display text-[13px] font-medium">
                  <s className="tabular-nums text-subtle">{formatBRL(opt.originalPlatformPriceCents)}</s>
                  <span className="font-bold uppercase text-orange">Grátis</span>
                </span>
              ) : (
                <span className="font-display text-[13px] font-semibold tabular-nums text-muted-text">
                  {`+ ${formatBRL(opt.extraPriceCents)}`}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PlatformPrice({
  plan,
  status,
  platform,
}: {
  plan: Plan
  status: CampaignStatus
  platform: PlatformId
}) {
  const p = getPlanPlatformPricing(plan, status, platform)
  if (p.finalPriceCents == null) {
    return <span className="display text-3xl text-subtle">Indisponível</span>
  }
  const showOriginal =
    p.discountPercent != null && p.originalDisplayPriceCents != null && p.originalDisplayPriceCents > p.finalPriceCents
  return (
    <div className="flex flex-col gap-1.5" aria-live="polite">
      {showOriginal ? (
        <p className="font-display text-[15px] font-medium text-subtle">
          <span className="sr-only">De </span>
          <s className="tabular-nums decoration-bw-red decoration-2">{formatBRL(p.originalDisplayPriceCents!)}</s>
        </p>
      ) : null}
      <p className="font-display text-[13px] font-medium uppercase tracking-[0.04em] text-muted-text">
        {p.monthly ? 'Por mês' : 'À vista'}
      </p>
      <p className="flex items-baseline gap-1.5">
        <span className="font-display text-[clamp(2rem,7vw,2.75rem)] font-extrabold leading-none tabular-nums tracking-[-0.02em] text-text">
          {formatBRL(p.finalPriceCents)}
        </span>
        {p.monthly ? <span className="text-base text-muted-text">/mês</span> : null}
      </p>
      {p.installmentCents != null ? (
        <p className="font-display text-[15px] font-medium text-muted-text">
          {'ou '}
          <span className="font-semibold tabular-nums text-text">{`${INSTALLMENTS}x de ${formatBRL(p.installmentCents)}`}</span>
        </p>
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
  const available = plan.status === 'available'
  const [platform, setPlatform] = useState<PlatformId>(DEFAULT_PLATFORM)
  const { discountPercent } = getPlanPricing(plan, status)

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
        {discountPercent != null ? <DiscountBadge percent={discountPercent} /> : null}
        {plan.featured || exclusive || unavailable || plan.billing === 'monthly' ? (
          <div className="flex flex-wrap items-center gap-2">
            {plan.featured ? (
              <span className="rounded-full bg-orange px-2.5 py-0.5 font-display text-xs font-medium uppercase tracking-[0.06em] text-bg-deep">
                Mais vendido
              </span>
            ) : null}
            {exclusive ? (
              <span className="rounded-full border border-silver/40 px-2.5 py-0.5 font-display text-xs uppercase tracking-[0.06em] text-silver">
                Edição limitada
              </span>
            ) : null}
            {unavailable ? (
              <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-display text-xs uppercase tracking-[0.06em] text-subtle">
                Indisponível
              </span>
            ) : null}
            {plan.billing === 'monthly' ? (
              <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-display text-xs uppercase tracking-[0.06em] text-muted-text">
                Mensal
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <h3 id={`plan-${plan.id}`} className={cn('min-w-0 font-display text-[clamp(1.3rem,6.2vw,1.6rem)] font-semibold uppercase leading-tight tracking-[-0.01em] text-text', exclusive && 'text-silver-metal')}>
            {plan.name}
          </h3>
          {plan.contracts != null ? (
            <p className="flex shrink-0 flex-col items-end">
              <span className="font-display text-[2.1rem] font-bold leading-none tabular-nums tracking-[-0.02em] text-orange">
                {plan.contracts}
              </span>
              <span className="font-display text-xs font-medium uppercase tracking-[0.04em] text-subtle">contratos</span>
            </p>
          ) : null}
        </div>

        <dl className="flex flex-col text-[15px]">
          {plan.asset ? (
            <div className="flex items-center justify-between border-t border-line py-2.5">
              <dt className="spec-label">Ativo</dt>
              <dd className="spec-value">{plan.asset}</dd>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-4 border-t border-line py-2.5">
            <dt className="spec-label">
              <Term k="meta">Meta</Term>
            </dt>
            <dd className="spec-value text-right">
              {senior ? 'Não se aplica' : formatBRL(plan.metaCents)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-y border-line py-2.5">
            <dt className="spec-label">
              <Term k="stop">Stop global</Term>
            </dt>
            <dd className="spec-value text-right">{formatBRL(plan.stopGlobalCents)}</dd>
          </div>
          {plan.afterApprovalCents ? (
            <div className="flex items-center justify-between gap-4 border-b border-line py-2.5">
              <dt className="spec-label">Taxa após aprovação</dt>
              <dd className="spec-value text-right text-[13px]">
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
          <div className="flex flex-col gap-3">
            <p className="font-display text-[13px] font-semibold uppercase tracking-[0.04em] text-muted-text">Benefícios inclusos</p>
            <ul className="flex flex-col gap-2.5 text-[15px] font-medium">
              {plan.notes.map((n) => (
                <li key={n} className="flex items-start gap-2.5 text-text">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-orange/15">
                    <Check className="size-3 text-orange" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="leading-snug">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-auto flex flex-col gap-5 border-t border-line pt-5">
          {available ? (
            <PlatformPicker planId={plan.id} value={platform} onChange={setPlatform} />
          ) : null}
          <PlatformPrice plan={plan} status={status} platform={platform} />
          <BuyButton plan={plan} platform={platform} className="h-14 w-full text-base" />
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onOpen}
              className="text-[15px] font-medium text-muted-text underline decoration-line-strong underline-offset-4 hover:text-text"
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
                'inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors aria-disabled:opacity-40',
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
