/**
 * Recomendação premium do comparador — adaptação de RECOMENDACAO_PREMIUM_COMPARADOR.ts
 * aos tipos do projeto (valores em centavos).
 *
 * Regra de merchandising explícita: entre os planos DISPONÍVEIS selecionados,
 * destaca o de maior preço exibido (preço de campanha somente se aprovado e vigente).
 * Empate: mais contratos confirmados; persistindo, chave estável alfabética.
 * As justificativas usam apenas dados do catálogo.
 */
import { getApprovedPromo, type CampaignStatus } from '@/config/campaign'
import type { Plan } from '@/data/types'
import { formatBRL } from '@/lib/format'

/** Chave estável: categoria + nome (nomes como "UNO 40" se repetem entre categorias). */
export const comparisonId = (p: Plan) => `${p.category}::${p.name}`
export const isRecurringPlan = (p: Plan) => p.billing === 'monthly'

export function displayedOfferPriceCents(plan: Plan, status: CampaignStatus): number | null {
  if (plan.status !== 'available') return null
  const promo = getApprovedPromo(plan.id, status)
  if (promo && Number.isFinite(promo.campaignPriceCents) && promo.campaignPriceCents > 0) {
    return promo.campaignPriceCents
  }
  const base = plan.baseOfferPriceCents
  return typeof base === 'number' && Number.isFinite(base) && base > 0 ? base : null
}

const sameNote = (a: string, b: string) =>
  a.toLocaleLowerCase('pt-BR') === b.toLocaleLowerCase('pt-BR')

export type PremiumRecommendation = {
  recommendedId: string
  plan: Plan
  priceCents: number
  badge: 'DESTAQUE PREMIUM'
  title: string
  subtext: string
  reasons: string[]
  warnings: string[]
  uniqueBenefits: string[]
  pricesMixRecurringAndOneTime: boolean
  disclosure: string
}

export function recommendPremium(
  selectedPlans: Plan[],
  status: CampaignStatus,
): PremiumRecommendation | null {
  if (selectedPlans.length < 2) return null
  const priceOf = (p: Plan) => displayedOfferPriceCents(p, status)
  const eligible = selectedPlans.filter((p) => priceOf(p) !== null)
  if (eligible.length === 0) return null

  const ranked = [...eligible].sort((a, b) => {
    const byPrice = (priceOf(b) ?? 0) - (priceOf(a) ?? 0)
    if (byPrice !== 0) return byPrice
    const byContracts = (b.contracts ?? -1) - (a.contracts ?? -1)
    if (byContracts !== 0) return byContracts
    return comparisonId(a).localeCompare(comparisonId(b), 'pt-BR')
  })

  const top = ranked[0]
  const topPrice = priceOf(top) as number
  const peers = eligible.filter((p) => comparisonId(p) !== comparisonId(top))
  const pricesMixRecurringAndOneTime = new Set(eligible.map(isRecurringPlan)).size > 1
  const tiedOnPrice = peers.some((p) => priceOf(p) === topPrice)

  const reasons: string[] = []
  const warnings: string[] = []

  reasons.push(
    `É o plano de maior preço exibido entre os selecionados: ${formatBRL(topPrice)}${
      isRecurringPlan(top) ? '/mês' : ''
    }.`,
  )

  if (tiedOnPrice) {
    reasons.push(
      'Há empate de preço nesta comparação; o desempate considera o maior número de contratos confirmados.',
    )
  }

  const topContracts = top.contracts
  const strictMostContracts =
    typeof topContracts === 'number' &&
    peers.length > 0 &&
    peers.every((p) => typeof p.contracts === 'number' && topContracts > p.contracts)
  if (strictMostContracts) {
    reasons.push(
      `Neste comparativo, este plano oferece ${topContracts} contratos, a maior capacidade nominal entre as opções selecionadas.`,
    )
  }

  const uniqueBenefits = top.notes.filter(
    (note) => !peers.some((p) => p.notes.some((other) => sameNote(other, note))),
  )
  const allSameNotes =
    peers.length > 0 &&
    peers.every(
      (p) =>
        p.notes.length === top.notes.length &&
        p.notes.every((n) => top.notes.some((t) => sameNote(t, n))),
    )
  if (uniqueBenefits.length > 0) {
    reasons.push(`Além dos benefícios comuns, ele inclui: ${uniqueBenefits.join(', ')}.`)
  } else if (allSameNotes) {
    reasons.push(
      'Os bônus apresentados são equivalentes entre os planos selecionados; a principal diferença está nas condições operacionais e no investimento.',
    )
  } else {
    reasons.push('Os benefícios exibidos não mostram bônus exclusivos adicionais neste plano.')
  }

  const topMeta = top.metaCents
  if (
    typeof topMeta === 'number' &&
    peers.length > 0 &&
    peers.every((p) => typeof p.metaCents === 'number' && topMeta > p.metaCents)
  ) {
    warnings.push(
      `Também possui a maior meta de aprovação deste comparativo (${formatBRL(topMeta)}), o que exige mais desempenho na avaliação.`,
    )
  } else if (typeof topMeta === 'number') {
    warnings.push(`Meta de aprovação informada: ${formatBRL(topMeta)}.`)
  }

  warnings.push(
    `Stop global informado: ${formatBRL(top.stopGlobalCents)}. O stop é um limite de perda, não um benefício.`,
  )

  if (top.afterApprovalCents) {
    const one = top.afterApprovalCents.profitOne
    const pro = top.afterApprovalCents.profitPro
    const higherThanPeers = peers.some(
      (p) => p.afterApprovalCents && (one ?? 0) > (p.afterApprovalCents.profitOne ?? 0),
    )
    warnings.push(
      `${higherThanPeers ? 'A taxa após aprovação deste plano é superior às demais' : 'Há taxa única após aprovação'}: ONE ${formatBRL(one)} · PRO ${formatBRL(pro)}.`,
    )
  }

  if (pricesMixRecurringAndOneTime) {
    warnings.push(
      'Atenção: há pagamentos recorrentes e únicos nesta comparação. Os preços exibidos não representam o custo total de cada modalidade.',
    )
  }

  const excluded = selectedPlans.filter((p) => priceOf(p) === null)
  for (const p of excluded) {
    warnings.push(`${p.name} está indisponível e não participa do destaque.`)
  }

  return {
    recommendedId: comparisonId(top),
    plan: top,
    priceCents: topPrice,
    badge: 'DESTAQUE PREMIUM',
    title: 'A opção de maior investimento nesta comparação',
    subtext:
      'Selecionamos para destaque o plano de maior preço entre os que você está comparando. Veja as diferenças reais antes de contratar.',
    reasons,
    warnings,
    uniqueBenefits,
    pricesMixRecurringAndOneTime,
    disclosure:
      'Destaque comercial por preço. A escolha apropriada depende de experiência, estratégia, riscos e custos de cada plano.',
  }
}
