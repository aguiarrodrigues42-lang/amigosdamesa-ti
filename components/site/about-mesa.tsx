import { SectionHeading } from './section-heading'

const pillars = [
  {
    title: 'Avaliação objetiva',
    text: 'Cada plano define meta de aprovação e stop global. Você sabe o critério antes de operar.',
  },
  {
    title: 'Comunidade ativa',
    text: 'Traders, mentores e conteúdo diário para apoiar a disciplina operacional.',
  },
  {
    title: 'Regras documentadas',
    text: 'Elegibilidade, deduções e restrições estão no regulamento público, acessível a qualquer momento.',
  },
]

export function AboutMesa() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="py-24 lg:py-32">
      <div className="container-desk grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="A mesa"
            title={<span id="sobre-title">Disciplina antes de capital.</span>}
            lead="A Amigos da Mesa é uma mesa proprietária de Day Trade. Estamos no mercado desde 2018. Unica mesa com repasses por quinzena!"
          />
        </div>
        <ul className="flex flex-col lg:col-span-5 lg:col-start-8 lg:pt-10">
          {pillars.map((p) => (
            <li key={p.title} className="flex flex-col gap-2 border-t border-line py-6 last:border-b">
              <h3 className="display text-2xl">{p.title}</h3>
              <p className="leading-relaxed text-muted-text">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
