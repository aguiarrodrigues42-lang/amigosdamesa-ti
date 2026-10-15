import { Plus } from 'lucide-react'
import { faq } from '@/data/faq'

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-bg-deep py-24 lg:py-32">
      <div className="container-desk grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 id="faq-title" className="h2-desk">
            Dúvidas comuns.
          </h2>
        </div>
        <div className="flex flex-col lg:col-span-8">
          {faq.map((item) => (
            <details key={item.q} className="group border-t border-line last:border-b">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg">
                <span className="text-pretty">{item.q}</span>
                <Plus
                  className="size-5 shrink-0 text-orange transition-transform group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <div className="flex flex-col gap-3 pb-6 pr-10">
                <p className="leading-relaxed text-muted-text">{item.a}</p>
                {item.pendingReview ? (
                  <p className="rounded-lg border border-dashed border-orange/40 px-3 py-2 text-xs text-orange">
                    {`Em revisão: ${item.pendingReview}`}
                  </p>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
