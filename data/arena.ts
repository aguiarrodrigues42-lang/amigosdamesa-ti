export type ArenaEdition = {
  id: string
  title: string
  period: string
  status: 'upcoming' | 'running' | 'past'
  entryFee: string
  durationDays: number
  prizes: { place: string; cash: string; extras: string }[]
  rules: string[]
}

/** Edição histórica. Encerrada em setembro de 2026 — não reabrir inscrições. */
export const pastEditions: ArenaEdition[] = [
  {
    id: 'arena-02',
    title: 'Arena #02',
    period: '07 a 11 de setembro de 2026',
    status: 'past',
    entryFee: 'R$ 150,00 via PIX',
    durationDays: 5,
    prizes: [
      { place: '1º lugar', cash: 'R$ 3.000', extras: 'Troféu e entrevista' },
      { place: '2º lugar', cash: 'R$ 2.000', extras: 'Medalha e entrevista' },
      { place: '3º lugar', cash: 'R$ 1.000', extras: 'Certificado e entrevista' },
    ],
    rules: [
      'Ranking diário pelo maior resultado líquido',
      'Limite de 20 contratos por operação',
      'Perda acumulada máxima de R$ 20.000',
      'Proibido uso de robôs e automações',
      'Proibido copy trade e espelhamento',
    ],
  },
]

/** Próxima edição: preencher somente após confirmação oficial. */
export const nextEdition: ArenaEdition | null = null
