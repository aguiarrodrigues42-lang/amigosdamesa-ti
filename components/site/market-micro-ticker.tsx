const items = [
  'WIN',
  'WDO',
  'BIT',
  'Exame',
  'Simulador Remunerado',
  'Conta Real',
  '7 famílias de planos',
  '31 ofertas catalogadas',
  'Regras por modalidade',
  'Ambiente simulado na avaliação',
]

/** Faixa institucional — sem cotações, sem dados de mercado. */
export function MarketMicroTicker() {
  const loop = [...items, ...items]
  return (
    <div
      className="relative overflow-hidden border-b border-line bg-bg"
      role="region"
      aria-label="Ativos e etapas da mesa"
    >
      <ul className="sr-only">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <div className="ticker-track flex w-max items-center py-2.5" aria-hidden>
        {loop.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="flex items-center gap-6 px-6 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle"
          >
            {item}
            <span className="size-1 rotate-45 bg-orange/70" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent" />
    </div>
  )
}
