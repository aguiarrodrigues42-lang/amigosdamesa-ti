import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { links } from '@/data/links'
import { Logo } from './logo'
import { navItems } from '@/data/nav'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="micrograd border-t border-line py-24 lg:py-32">
      <div className="container-desk flex flex-col items-start gap-8">
        <h2 id="cta-title" className="display max-w-4xl text-balance text-[clamp(3rem,7vw,6.5rem)]">
          Compare. Leia as regras. <span className="text-orange">Depois opere.</span>
        </h2>
        <a
          href="#planos"
          className="group inline-flex h-13 items-center gap-2 rounded-full bg-orange px-7 font-semibold text-bg-deep hover:bg-orange-light"
        >
          Comparar planos
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </a>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-deep">
      <div className="container-desk grid gap-10 py-14 md:grid-cols-12">
        <div className="flex flex-col gap-4 md:col-span-5">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-subtle">
            Mesa proprietária de Day Trade. Avaliações em ambiente simulado. Operar no mercado
            financeiro envolve riscos; resultados passados não garantem resultados futuros.
          </p>
        </div>
        <nav aria-label="Rodapé" className="md:col-span-3">
          <ul className="flex flex-col gap-2 text-sm">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={n.href} className="text-muted-text hover:text-text">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-col gap-2 text-sm md:col-span-4">
          {[
            ['Regulamento', links.regulamento],
            ['Área do Trader', links.areaDoTrader],
            ['Instagram', links.instagram],
            ['Site oficial', links.site],
          ].map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-text hover:text-text"
              >
                {label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-line">
        <p className="container-desk py-5 font-mono text-[11px] text-subtle">
          {'© 2026 Amigos da Mesa PRO · Black Week 2026'}
        </p>
      </div>
    </footer>
  )
}
