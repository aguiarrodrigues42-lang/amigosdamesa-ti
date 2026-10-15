export type CategorySlug =
  | 'exames'
  | 'prime-plus'
  | 'titan'
  | 'exclusive'
  | 'senior'
  | 'pegue-e-monte'
  | 'bit'

export type CategoryInfo = {
  slug: CategorySlug
  label: string
  subtitle: string
}

export type Plan = {
  id: string
  category: CategorySlug
  name: string
  /** null = não confirmado (ex.: BIT). Nunca inferir a partir do nome. */
  contracts: number | null
  /** null = não se aplica (Sênior) ou não informado. */
  metaCents: number | null
  stopGlobalCents: number
  /** Preço-base exibido atualmente. null quando indisponível. */
  baseOfferPriceCents: number | null
  /** Valor riscado da captura. Não é total parcelado. */
  referencePriceCents: number | null
  billing: 'once' | 'monthly'
  status: 'available' | 'unavailable'
  notes: string[]
  /** Taxa única após aprovação (somente Prime Plus). */
  afterApprovalCents: { profitOne: number | null; profitPro: number | null } | null
  asset: string | null
  /** "Mais vendido" — somente quando confirmado na fonte. */
  featured: boolean
  /** Pendências de validação comercial/regulatória. */
  reviewFlags: string[]
}
