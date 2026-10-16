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

export type PlatformId = 'profit-one' | 'profit-pro'

export type PlatformOption = {
  id: PlatformId
  name: string
  originalPlatformPriceCents: number
  extraPriceCents: number
}

export const platformOptions: PlatformOption[] = [
  { id: 'profit-one', name: 'Profit One', originalPlatformPriceCents: 18000, extraPriceCents: 0 },
  { id: 'profit-pro', name: 'Profit Pro', originalPlatformPriceCents: 24000, extraPriceCents: 24000 },
]

export const DEFAULT_PLATFORM: PlatformId = 'profit-one'
export const INSTALLMENTS = 12
const INSTALLMENT_SURCHARGE = 1.12

export function getPlatform(id: PlatformId): PlatformOption {
  return platformOptions.find((p) => p.id === id) ?? platformOptions[0]
}

export type PlanPlatformPricing = PlanPricing & {
  finalPriceCents: number | null
  originalDisplayPriceCents: number | null
  installmentCents: number | null
}

export function getPlanPlatformPricing(
  plan: Plan,
  status: CampaignStatus,
  platformId: PlatformId,
): PlanPlatformPricing {
  const base = getPlanPricing(plan, status)
  const { extraPriceCents } = getPlatform(platformId)
  const finalPriceCents = base.salePriceCents != null ? base.salePriceCents + extraPriceCents : null
  const originalDisplayPriceCents =
    base.originalPriceCents != null ? base.originalPriceCents + extraPriceCents : null
  const installmentCents =
    finalPriceCents != null && !base.monthly
      ? Math.round((finalPriceCents * INSTALLMENT_SURCHARGE) / INSTALLMENTS)
      : null
  return { ...base, finalPriceCents, originalDisplayPriceCents, installmentCents }
}

/** Links de checkout específicos por plataforma. Quando ausente, usa o link padrão do plano. */
const platformCheckoutUrls: Partial<Record<PlatformId, Record<string, string>>> = {}

/** URL oficial de compra do plano. undefined quando não mapeada ou indisponível. */
export function getCheckoutUrl(plan: Plan, platformId?: PlatformId): string | undefined {
  if (plan.status !== 'available') return undefined
  return (platformId && platformCheckoutUrls[platformId]?.[plan.id]) || planCheckoutUrls[plan.id]
}
