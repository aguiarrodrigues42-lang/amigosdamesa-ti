'use client'

import { X } from 'lucide-react'
import type { CampaignStatus } from '@/config/campaign'
import { getApprovedPromo } from '@/config/campaign'
import { categories } from '@/data/plans'
import type { Plan } from '@/data/types'
import { formatBRL } from '@/lib/format'
import { DeskDialog } from './desk-dialog'

const rows: { label: string; get: (p: Plan, s: CampaignStatus) => string }[] = [
  { label: 'Categoria', get: (p) => categories.find((c) => c.slug === p.category)?.label ?? '—' },
  { label: 'Contratos', get: (p) => (p.contracts != null ? String(p.contracts) : 'A confirmar') },
  { label: 'Ativo', get: (p) => p.asset ?? 'A confirmar' },
  { label: 'Meta de aprovação', get: (p) => (p.category === 'senior' ? 'Não se aplica' : formatBRL(p.metaCents)) },
  { label: 'Stop Global', get: (p) => formatBRL(p.stopGlobalCents) },
  {
    label: 'Preço',
    get: (p, s) => {
      if (p.status === 'unavailable' || p.baseOfferPriceCents == null) return 'Indisponível'
      const promo = getApprovedPromo(p.id, s)
      const v = formatBRL(promo?.campaignPriceCents ?? p.baseOfferPriceCents)
      return p.billing === 'monthly' ? `${v}/mês` : v
    },
  },
  { label: 'Valor de referência', get: (p) => formatBRL(p.referencePriceCents) },
  { label: 'Cobrança', get: (p) => (p.billing === 'monthly' ? 'Mensal' : 'Pagamento único') },
  {
    label: 'Taxa após aprovação',
    get: (p) =>
      p.afterApprovalCents
        ? `ONE ${formatBRL(p.afterApprovalCents.profitOne)} · PRO ${formatBRL(p.afterApprovalCents.profitPro)}`
        : '—',
  },
  { label: 'Condições', get: (p) => (p.notes.length ? p.notes.join(' · ') : '—') },
]

export function ComparePlans({
  open,
  onClose,
  plans,
  status,
  onRemove,
}: {
  open: boolean
  onClose: () => void
  plans: Plan[]
  status: CampaignStatus
  onRemove: (id: string) => void
}) {
  return (
    <DeskDialog
      open={open}
      onClose={onClose}
      variant="center"
      title="Comparar planos"
      description="Lado a lado, sem escolher no escuro. Até 3 planos."
    >
      {plans.length === 0 ? (
        <p className="text-muted-text">Nenhum plano selecionado.</p>
      ) : (
        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="sr-only">Comparação entre planos selecionados</caption>
            <thead>
              <tr>
                <th scope="col" className="w-40 pb-4 text-left align-bottom">
                  <span className="sr-only">Atributo</span>
                </th>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className="pb-4 pl-4 text-left align-bottom">
                    <div className="flex items-start justify-between gap-2">
                      <span className="display text-xl">{p.name}</span>
                      <button
                        type="button"
                        onClick={() => onRemove(p.id)}
                        className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-subtle hover:text-text"
                        aria-label={`Remover ${p.name} da comparação`}
                      >
                        <X className="size-3.5" aria-hidden />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="py-3 pr-4 text-left align-top font-normal text-muted-text">
                    {r.label}
                  </th>
                  {plans.map((p) => (
                    <td key={p.id} className="py-3 pl-4 align-top font-mono text-[13px] leading-relaxed tabular-nums text-text">
                      {r.get(p, status)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DeskDialog>
  )
}
