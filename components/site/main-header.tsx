'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'
import { links } from '@/data/links'
import { cn } from '@/lib/utils'
import { DeskDialog } from './desk-dialog'
import { Logo } from './logo'

import { navItems } from '@/data/nav'

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])
  return active
}

const ids = navItems.map((n) => n.id)

export function MainHeader() {
  const active = useActiveSection(ids)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="glass sticky top-0 z-50 border-b border-line">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-orange focus:px-3 focus:py-2 focus:text-bg-deep"
      >
        Pular para o conteúdo
      </a>
      <div className="container-desk flex h-16 items-center justify-between gap-6">
        <a href="#topo" className="shrink-0" aria-label="Amigos da Mesa PRO — início">
          <Logo priority />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm text-muted-text transition-colors hover:text-text',
                    active === item.id && 'text-text',
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute inset-x-4 -bottom-[13px] h-px bg-orange transition-opacity',
                      active === item.id ? 'opacity-100' : 'opacity-0',
                    )}
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={links.areaDoTrader}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm text-text transition-colors hover:border-orange sm:inline-flex"
          >
            Área do Trader
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
          <a
            href="#planos"
            className="hidden rounded-full bg-orange px-4 py-2 text-sm font-semibold text-bg-deep transition-colors hover:bg-orange-light md:inline-flex"
          >
            Ver planos
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex size-10 items-center justify-center rounded-full border border-line-strong text-text lg:hidden"
            aria-label="Abrir menu"
            aria-haspopup="dialog"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <DeskDialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Menu"
        variant="left"
        footer={
          <div className="flex flex-col gap-3">
            <a
              href="#planos"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 items-center justify-center rounded-full bg-orange font-semibold text-bg-deep"
            >
              Ver planos
            </a>
            <a
              href={links.areaDoTrader}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-1.5 rounded-full border border-line-strong text-text"
            >
              Área do Trader
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        }
      >
        <nav aria-label="Menu móvel">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="display flex items-center justify-between py-4 text-3xl"
                >
                  {item.label}
                  <span className="font-mono text-xs text-subtle">{`#${item.id}`}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </DeskDialog>
    </header>
  )
}
