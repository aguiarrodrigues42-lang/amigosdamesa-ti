import { campaign, getApprovedPromo, type CampaignStatus } from '@/config/campaign'
import { planCheckoutUrls } from '@/data/links'
import type { Plan } from '@/data/types'

export type PlanPricing = {
  salePriceCents: number | null
  originalPriceCents: number | null
  discountPercent: number | null
  monthly: boolean
}

const valid = (v: number | null | undefined): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v > 0

export function getPlanPricing(plan: Plan, status: CampaignStatus): PlanPricing {
  const monthly = plan.billing === 'monthly'
  if (plan.status !== 'available') {
    return { salePriceCents: null, originalPriceCents: null, discountPercent: null, monthly }
  }
  const promo = getApprovedPromo(plan.id, status)
  const salePrice = valid(promo?.campaignPriceCents) ? promo.campaignPriceCents : plan.baseOfferPriceCents
  const originalPrice = promo?.originalPriceCents ?? plan.referencePriceCents
  const salePriceCents = valid(salePrice) ? salePrice : null

  let discountPercent: number | null = null
  const canShowDiscount =
    campaign.approved && campaign.discountsApproved && status === 'live'
  if (canShowDiscount && salePriceCents != null && valid(originalPrice) && originalPrice > salePriceCents) {
    const pct = Math.round(((originalPrice - salePriceCents) / originalPrice) * 100)
    discountPercent = pct > 0 ? pct : null
  }

  return {
    salePriceCents,
    originalPriceCents: valid(originalPrice) ? originalPrice : null,
    discountPercent,
    monthly,
  }
}

/** URL oficial de compra do plano. undefined quando não mapeada ou indisponível. */
export function getCheckoutUrl(plan: Plan): string | undefined {
  if (plan.status !== 'available') return undefined
  return planCheckoutUrls[plan.id]
}
