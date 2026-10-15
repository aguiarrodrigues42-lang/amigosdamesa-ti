import { companyMetrics } from '@/data/companyMetrics'

export function TrustMetrics() {
  const verified = companyMetrics.filter((m) => m.verified)
  return (
    <section aria-label="Estrutura da mesa" className="border-y border-line bg-bg-deep">
      <dl className="container-desk grid grid-cols-2 lg:grid-cols-4">
        {verified.map((m, i) => (
          <div
            key={m.label}
            className={`flex flex-col gap-2 py-8 lg:py-10 ${
              i % 2 === 1 ? 'border-l border-line pl-5 md:pl-8' : i > 0 ? 'lg:border-l lg:border-line lg:pl-8' : ''
            } ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''}`}
          >
            <dt className="order-2 text-sm text-muted-text">{m.label}</dt>
            <dd className="display order-1 text-[clamp(2rem,3.6vw,3.2rem)] text-text">{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
