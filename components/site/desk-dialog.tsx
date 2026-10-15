'use client'

import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Dialog nativo (<dialog>.showModal): foco preso, Esc fecha, foco restaurado,
 * backdrop clicável e rolagem da página bloqueada enquanto aberto.
 * - drawer: painel lateral no desktop e bottom-sheet no mobile.
 * - left: painel à esquerda no desktop, tela cheia no mobile.
 * - fullscreen: modal central amplo no desktop, tela cheia (100dvh) no mobile.
 */
export function DeskDialog({
  open,
  onClose,
  title,
  description,
  eyebrow,
  children,
  footer,
  variant = 'drawer',
  className,
}: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  eyebrow?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  variant?: 'drawer' | 'center' | 'left' | 'fullscreen'
  className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
    if (!open) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev
    }
  }, [open])

  const mobileFull = variant === 'left' || variant === 'fullscreen'

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className={cn(
        'z-[100] m-0 w-full max-w-none overscroll-contain border-line-strong bg-surface text-text open:flex open:flex-col',
        mobileFull
          ? 'max-md:inset-0 max-md:h-dvh max-md:max-h-dvh'
          : 'max-md:mt-auto max-md:max-h-[88dvh] max-md:rounded-t-2xl max-md:border-t',
        variant === 'drawer' && 'md:ml-auto md:h-dvh md:max-h-dvh md:max-w-xl md:border-l',
        variant === 'left' && 'md:mr-auto md:h-dvh md:max-h-dvh md:max-w-sm md:border-r',
        variant === 'center' && 'md:m-auto md:max-h-[86dvh] md:max-w-5xl md:rounded-2xl md:border',
        variant === 'fullscreen' &&
          'md:m-auto md:h-[min(90dvh,860px)] md:max-h-[min(90dvh,860px)] md:max-w-[1120px] md:rounded-2xl md:border',
        className,
      )}
    >
      <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
        <div className="flex min-w-0 flex-col gap-1">
          {eyebrow}
          <h2 id={titleId} className="display text-2xl md:text-3xl">
            {title}
          </h2>
          {description ? <p className="text-sm leading-relaxed text-muted-text">{description}</p> : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-text transition-colors hover:border-text"
          aria-label="Fechar"
        >
          <X className="size-5" aria-hidden />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-6">{children}</div>
      {footer ? (
        <footer className="shrink-0 border-t border-line bg-surface px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
          {footer}
        </footer>
      ) : null}
    </dialog>
  )
}
