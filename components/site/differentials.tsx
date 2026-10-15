import { links } from '@/data/links'
import { SectionHeading } from './section-heading'

const items = [
  {
    title: 'Sem drawdown como critério',
    text: 'A avaliação considera limites diários e globais do plano, não um drawdown móvel.',
  },
  {
    title: 'Sua estratégia, dentro das regras',
    text: 'Opere com seu método. O regulamento restringe micro-scalping e outras práticas específicas.',
  },
  {
    title: 'WIN, WDO e BIT',
    text: 'Mini Índice, Mini Dólar e Bitcoin, conforme o plano e os limites de cada modalidade.',
  },
  {
    title: 'Plataforma Profit',
    text: 'Profit ONE, Plus ou PRO conforme o plano. Consulte o custo de licença vigente.',
  },
]

export function Differentials() {
  return (
    <section aria-labelledby="dif-title" className="py-24 lg:py-32">
      <div className="container-desk grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading
            eyebrow="Diferenciais"
            title={<span id="dif-title">O que muda na prática.</span>}
          />
          <a
            href={links.regulamento}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm text-orange underline decoration-orange/40 underline-offset-4 hover:decoration-orange"
          >
            Ler o regulamento completo
          </a>
        </div>
        <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {items.map((it) => (
            <div key={it.title} className="flex flex-col gap-2 border-t border-line py-6">
              <dt className="display text-2xl">{it.title}</dt>
              <dd className="leading-relaxed text-muted-text">{it.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
