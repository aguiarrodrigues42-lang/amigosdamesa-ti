import { testimonials } from '@/data/testimonials'

export function TestimonialsSection() {
  return (
    <section aria-labelledby="relatos-title" className="border-t border-line bg-bg-deep py-24 lg:py-32">
      <div className="container-desk flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Comunidade</p>
          <h2 id="relatos-title" className="h2-desk">
            O que a rotina muda.
          </h2>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-line bg-surface p-7">
                <blockquote className="text-pretty text-lg leading-relaxed text-text">
                  <span className="display mr-1 text-3xl text-orange" aria-hidden>
                    {'“'}
                  </span>
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                  <span
                    className="flex size-10 items-center justify-center rounded-full bg-surface-raised font-display text-lg font-bold text-muted-text"
                    aria-hidden
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{t.name}</span>
                    <span className="text-xs text-subtle">{t.context}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-subtle">
          Relatos de experiência na comunidade. Não representam resultado financeiro típico nem
          garantia de aprovação ou repasse.
        </p>
      </div>
    </section>
  )
}
