'use client'

import { Check } from 'lucide-react'
import type { CampaignStatus } from '@/config/campaign'
import { getApprovedPromo } from '@/config/campaign'
import { links } from '@/data/links'
import { categories } from '@/data/plans'
import type { Plan } from '@/data/types'
import { formatBRL } from '@/lib/format'
import { DeskDialog } from './desk-dialog'
import { BuyButton, PlanPrice } from './plan-card'
import { Term } from './term'

export function PlanDetailDrawer({
  plan,
  status,
  onClose,
}: {
  plan: Plan | null
  status: CampaignStatus
  onClose: () => void
}) {
  const cat = plan ? categories.find((c) => c.slug === plan.category) : null
  const promo = plan ? getApprovedPromo(plan.id, status) : null

  return (
    <DeskDialog
      open={plan != null}
      onClose={onClose}
      title={plan?.name ?? ''}
      description={cat ? `${cat.label} · ${cat.subtitle}` : undefined}
      footer={
        plan ? (
          <div className="flex flex-col gap-3">
            <BuyButton plan={plan} className="w-full" />
            <a
              href={links.regulamento}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm text-muted-text underline underline-offset-4 hover:text-text"
            >
              Ler o regulamento antes de contratar
            </a>
          </div>
        ) : null
      }
    >
      {plan ? (
        <div className="flex flex-col gap-8">
          <PlanPrice plan={plan} status={status} />

          {promo?.installments ? (
            <p className="text-sm text-muted-text">
              {`${promo.installments.count}x de ${formatBRL(promo.installments.valueCents)} · total ${formatBRL(promo.installments.totalCents)} · ${promo.installments.interest}`}
            </p>
          ) : (
            <p className="text-xs leading-relaxed text-subtle">
              Parcelamento, juros e preço via PIX são confirmados no checkout oficial.
            </p>
          )}

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line text-sm">
            {[
              ['Contratos', plan.contracts != null ? String(plan.contracts) : 'A confirmar'],
              ['Ativo', plan.asset ?? 'A confirmar'],
              [
                <Term key="m" k="meta">Meta de aprovação</Term>,
                plan.category === 'senior' ? 'Não se aplica' : formatBRL(plan.metaCents),
              ],
              [<Term key="s" k="stop">Stop Global</Term>, formatBRL(plan.stopGlobalCents)],
              ['Cobrança', plan.billing === 'monthly' ? 'Mensal' : 'Pagamento único'],
              ['Status', plan.status === 'available' ? 'Disponível' : 'Indisponível'],
            ].map(([k, v], i) => (
              <div key={i} className="flex flex-col gap-1 bg-surface p-4">
                <dt className="text-xs text-muted-text">{k}</dt>
                <dd className="font-mono tabular-nums text-text">{v}</dd>
              </div>
            ))}
          </dl>

          {plan.afterApprovalCents ? (
            <div className="flex flex-col gap-3">
              <h3 className="eyebrow">Taxa única após aprovação</h3>
              <ul className="flex flex-col text-sm">
                <li className="flex justify-between border-t border-line py-2.5">
                  <span className="text-muted-text">Profit ONE</span>
                  <span className="font-mono tabular-nums">{formatBRL(plan.afterApprovalCents.profitOne)}</span>
                </li>
                <li className="flex justify-between border-y border-line py-2.5">
                  <span className="text-muted-text">Profit PRO</span>
                  <span className="font-mono tabular-nums">{formatBRL(plan.afterApprovalCents.profitPro)}</span>
                </li>
              </ul>
            </div>
          ) : null}

          {plan.notes.length > 0 ? (
            <div className="flex flex-col gap-3">
              <h3 className="eyebrow">Condições e benefícios informados</h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {plan.notes.map((n) => (
                  <li key={n} className="flex items-start gap-2.5 leading-relaxed">
                    <Check className="mt-1 size-3.5 shrink-0 text-orange" aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="text-xs leading-relaxed text-subtle">
            Avaliação em ambiente simulado. Aprovação e elegibilidade a{' '}
            <Term k="repasse">repasse</Term> dependem das regras do plano e do regulamento vigente.
            Pode haver cobrança de licença da plataforma Profit.
          </p>
        </div>
      ) : null}
    </DeskDialog>
  )
}
