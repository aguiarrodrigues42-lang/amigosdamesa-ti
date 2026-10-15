export type Metric = { value: string; label: string; verified: boolean; note?: string }

/**
 * Apenas métricas `verified: true` são renderizadas.
 * As afirmações do site atual divergem entre si e aguardam checagem editorial.
 */
export const companyMetrics: Metric[] = [
  { value: '7', label: 'famílias de planos', verified: true, note: 'Derivado do catálogo' },
  { value: '31', label: 'ofertas catalogadas', verified: true, note: 'Derivado do catálogo' },
  { value: 'WIN · WDO · BIT', label: 'ativos elegíveis conforme plano', verified: true },
  { value: 'Exame · SR · CR', label: 'etapas da jornada', verified: true },
  { value: '2018', label: 'desde', verified: false, note: 'Confirmar ano de fundação' },
  { value: '20.000+', label: 'traders ativos', verified: false, note: 'Conflita com 2.400+' },
  { value: '2.400+', label: 'traders ativos', verified: false, note: 'Conflita com 20.000+' },
  { value: '80%', label: 'taxa de aprovação', verified: false },
  { value: 'R$ 1,5M+', label: 'repasses por quinzena', verified: false },
]
