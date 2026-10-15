import { nextEdition, pastEditions } from '@/data/arena'
import { links } from '@/data/links'
import { SectionHeading } from './section-heading'

export function ArenaSection() {
  const last = pastEditions[0]
  return (
    <section id="arena" aria-labelledby="arena-title" className="py-24 lg:py-32">
      <div className="container-desk flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Arena"
            title={<span id="arena-title">Competição com regras públicas.</span>}
            lead="Torneio de curta duração com ranking diário. A próxima edição será anunciada pelos canais oficiais."
          />
          <span className="w-fit rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-text">
            {nextEdition ? `Próxima: ${nextEdition.period}` : 'Próxima edição a anunciar'}
          </span>
        </div>

        {last ? (
          <article className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-12">
            <div className="flex flex-col gap-6 bg-surface p-7 lg:col-span-5 lg:p-9">
              <div className="flex items-center justify-between">
                <h3 className="display text-4xl">{last.title}</h3>
                <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                  Encerrada
                </span>
              </div>
              <dl className="flex flex-col text-sm">
                {[
                  ['Período', last.period],
                  ['Duração', `${last.durationDays} dias`],
                  ['Inscrição', last.entryFee],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-t border-line py-2.5">
                    <dt className="text-muted-text">{k}</dt>
                    <dd className="text-right font-mono text-text">{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className="flex flex-col gap-2 text-sm text-muted-text">
                {last.rules.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rotate-45 bg-orange" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <ol className="grid bg-surface lg:col-span-7">
              {last.prizes.map((p, i) => (
                <li
                  key={p.place}
                  className={`flex items-center justify-between gap-6 px-7 py-6 lg:px-9 ${i > 0 ? 'border-t border-line' : ''}`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className={`display text-6xl ${i === 0 ? 'text-orange' : 'text-subtle'}`}>{i + 1}</span>
                    <span className="text-sm text-muted-text">{p.extras}</span>
                  </div>
                  <span className="font-display text-3xl font-bold tabular-nums">{p.cash}</span>
                </li>
              ))}
            </ol>
          </article>
        ) : null}

        <p className="text-sm text-subtle">
          Premiações e regras referem-se à edição encerrada. Acompanhe novas edições no{' '}
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-text underline underline-offset-4 hover:text-text">
            Instagram oficial
          </a>
          .
        </p>
      </div>
    </section>
  )
}
