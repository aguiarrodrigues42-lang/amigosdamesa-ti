import { links } from '@/data/links'

const facts = [
  ['Ambiente', 'A fase de Exame ocorre em ambiente simulado.'],
  ['Sem garantias', 'Não há garantia de aprovação, de repasse ou de resultado.'],
  ['Custos extras', 'Pode haver cobrança de licença da plataforma Profit.'],
  ['Regulamento', 'Elegibilidade, deduções e restrições valem conforme o regulamento vigente.'],
]

export function TransparencySection() {
  return (
    <section aria-labelledby="transp-title" className="py-24 lg:py-32">
      <div className="container-desk grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <p className="eyebrow">Antes de contratar</p>
          <h2 id="transp-title" className="h2-desk">
            O que você precisa saber.
          </h2>
          <a
            href={links.regulamento}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-fit text-sm text-orange underline decoration-orange/40 underline-offset-4 hover:decoration-orange"
          >
            Abrir regulamento
          </a>
        </div>
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {facts.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2 bg-surface p-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-orange">{k}</dt>
              <dd className="leading-relaxed text-muted-text">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
