/**
 * Configuração central da Black Week 2026.
 *
 * O site circula a partir de 30/10/2026 já como campanha lançada: não há
 * estado público de pré-lançamento. Após `end`, a página passa a "encerrada".
 *
 * Datas em ISO com offset de America/Sao_Paulo (-03:00, sem horário de verão).
 */
export type CampaignStatus = 'prelaunch' | 'live' | 'ended'

export type PerPlanPromo = {
  /** Preço promocional aprovado, em centavos. Sobrepõe o preço do catálogo. */
  campaignPriceCents: number
  /** Preço anterior confirmado para o cálculo do desconto. */
  originalPriceCents?: number
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
  approved: true,
  /**
   * Confirmação comercial de que o preço atual do catálogo é o preço da
   * campanha e de que o valor anterior registrado é o preço anterior real.
   * Com false, nenhum percentual de desconto é exibido.
   */
  discountsApproved: true,
  /** planId -> promoção específica, quando diferente do catálogo. */
  perPlanPromos: {} as Record<string, PerPlanPromo>,
}

export function getCampaignStatus(now: Date = new Date()): CampaignStatus {
  if (campaign.statusOverride) return campaign.statusOverride
  if (now.getTime() > new Date(campaign.end).getTime()) return 'ended'
  return 'live'
}

export function getApprovedPromo(planId: string, status: CampaignStatus) {
  if (!campaign.approved || status !== 'live') return null
  return campaign.perPlanPromos[planId] ?? null
}
