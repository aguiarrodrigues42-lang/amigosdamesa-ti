import { SectionHeading } from './section-heading'
import { Term } from './term'

const steps = [
  {
    code: 'EX',
    term: 'exame' as const,
    title: 'Exame',
    text: 'Avaliação em ambiente simulado com meta de aprovação e stop global definidos pelo plano.',
  },
  {
    code: 'SR',
    term: 'sr' as const,
    title: 'Simulador Remunerado',
    text: 'Após a aprovação, resultados podem ser elegíveis a repasse, conforme critérios e deduções do regulamento.',
  },
  {
    code: 'CR',
    term: 'cr' as const,
    title: 'Conta Real',
    text: 'Progressão para operação com capital da mesa, segundo os critérios de cada modalidade.',
  },
]

export function TraderJourney() {
  return (
    <section
      id="jornada"
      aria-labelledby="jornada-title"
      className="border-t border-line bg-bg-deep py-24 lg:py-32"
    >
      <div className="container-desk flex flex-col gap-16">
        <SectionHeading
          eyebrow="Como funciona"
          title={<span id="jornada-title">Três etapas. Critérios explícitos em cada uma.</span>}
          lead="A jornada é sequencial: cada fase tem regras próprias. Os nomes e condições exatos dependem do plano contratado."
        />
        <ol className="relative grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.code} className="relative flex flex-col gap-6 bg-surface p-7 lg:p-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                  {`Etapa ${i + 1} de 3`}
                </span>
                <span className="display text-5xl text-orange">{s.code}</span>
              </div>
              <h3 className="display text-3xl">
                <Term k={s.term}>{s.title}</Term>
              </h3>
              <p className="leading-relaxed text-muted-text">{s.text}</p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}
