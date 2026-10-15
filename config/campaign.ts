/**
 * Configuração central da Black Week 2026.
 *
 * PENDENTE DE APROVAÇÃO: a janela abaixo é SUGERIDA. Enquanto `approved` for
 * false, nenhum preço promocional é renderizado e a UI sinaliza a pendência.
 *
 * Datas em ISO com offset de America/Sao_Paulo (-03:00, sem horário de verão).
 */
export type CampaignStatus = 'prelaunch' | 'live' | 'ended'

export type PerPlanPromo = {
  /** Preço promocional aprovado, em centavos. */
  campaignPriceCents: number
  /** Base legítima para cálculo de economia (normalmente o preço-base). */
  savingsBaseCents?: number
  campaignBadge?: string
  /** Parcelamento só com dado real do checkout. */
  installments?: { count: number; valueCents: number; totalCents: number; interest: string }
  pixPriceCents?: number
}

export const campaign = {
  name: 'Black Week 2026',
  start: '2026-11-01T00:00:00-03:00',
  end: '2026-11-30T23:59:59-03:00',
  timezone: 'America/Sao_Paulo',
  /** Força um estado para revisão visual. null = calculado pelo relógio. */
  statusOverride: null as CampaignStatus | null,
  /** Aprovação do responsável comercial. Obrigatória para publicar como oferta real. */
  approved: false,
  /** planId -> promoção aprovada. Vazio até a tabela oficial existir. */
  perPlanPromos: {} as Record<string, PerPlanPromo>,
}

export function getCampaignStatus(now: Date = new Date()): CampaignStatus {
  if (campaign.statusOverride) return campaign.statusOverride
  const t = now.getTime()
  if (t < new Date(campaign.start).getTime()) return 'prelaunch'
  if (t > new Date(campaign.end).getTime()) return 'ended'
  return 'live'
}

export function getApprovedPromo(planId: string, status: CampaignStatus) {
  if (!campaign.approved || status !== 'live') return null
  return campaign.perPlanPromos[planId] ?? null
}
