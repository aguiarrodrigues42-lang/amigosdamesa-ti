type Candle = { o: number; c: number; h: number; l: number }

function seededSeries(count: number, seed: number): Candle[] {
  let s = seed
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
  const out: Candle[] = []
  let price = 50
  for (let i = 0; i < count; i++) {
    const drift = 0.35 + Math.sin(i / 5) * 0.9
    const o = price
    const c = o + (rand() - 0.42) * 6 + drift
    const h = Math.max(o, c) + rand() * 2.6
    const l = Math.min(o, c) - rand() * 2.6
    out.push({ o, c, h, l })
    price = c
  }
  return out
}

/** Gráfico ilustrativo: série determinística, sem escala de preço e sem dados reais. */
export function CandleChart({
  count = 40,
  seed = 7,
  className,
}: {
  count?: number
  seed?: number
  className?: string
}) {
  const data = seededSeries(count, seed)
  const W = 600
  const H = 320
  const pad = 16
  const max = Math.max(...data.map((d) => d.h))
  const min = Math.min(...data.map((d) => d.l))
  const y = (v: number) => pad + ((max - v) / (max - min)) * (H - pad * 2)
  const step = (W - pad * 2) / count
  const bw = step * 0.56

  const avgPath = data
    .map((d, i) => {
      const x = pad + i * step + step / 2
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y((d.o + d.c) / 2).toFixed(1)}`
    })
    .join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-hidden>
      {[0.25, 0.5, 0.75].map((r) => (
        <line
          key={r}
          x1={pad}
          x2={W - pad}
          y1={H * r}
          y2={H * r}
          stroke="var(--line)"
          strokeDasharray="2 6"
        />
      ))}
      {data.map((d, i) => {
        const x = pad + i * step + (step - bw) / 2
        const up = d.c >= d.o
        const color = up ? 'var(--orange)' : 'var(--subtle)'
        const top = y(Math.max(d.o, d.c))
        const bottom = y(Math.min(d.o, d.c))
        const last = i === data.length - 1
        return (
          <g key={i} className={last ? 'candle-live' : undefined}>
            <line
              x1={x + bw / 2}
              x2={x + bw / 2}
              y1={y(d.h)}
              y2={y(d.l)}
              stroke={color}
              strokeWidth={1}
              opacity={up ? 0.9 : 0.6}
            />
            <rect
              x={x}
              y={top}
              width={bw}
              height={Math.max(1.5, bottom - top)}
              fill={up ? color : 'transparent'}
              stroke={color}
              strokeWidth={1}
              rx={1}
              opacity={up ? 0.95 : 0.7}
            />
          </g>
        )
      })}
      <path
        d={avgPath}
        fill="none"
        stroke="var(--silver)"
        strokeWidth={1}
        strokeOpacity={0.35}
        pathLength={1}
        className="draw-line auto"
      />
    </svg>
  )
}
