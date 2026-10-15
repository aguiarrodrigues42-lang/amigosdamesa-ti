'use client'

import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Dialog nativo (<dialog>.showModal): foco preso, Esc fecha, backdrop clicável.
 * `drawer`: painel lateral no desktop e bottom-sheet no mobile.
 */
export function DeskDialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  variant = 'drawer',
  className,
}: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  variant?: 'drawer' | 'center' | 'left'
  className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className={cn(
        'm-0 w-full max-w-none border-line-strong bg-surface text-text open:flex open:flex-col',
        'max-md:mt-auto max-md:max-h-[88dvh] max-md:rounded-t-2xl max-md:border-t',
        variant === 'drawer' && 'md:ml-auto md:h-dvh md:max-h-dvh md:max-w-xl md:border-l',
        variant === 'left' && 'md:mr-auto md:h-dvh md:max-h-dvh md:max-w-sm md:border-r',
        variant === 'center' && 'md:m-auto md:max-h-[86dvh] md:max-w-5xl md:rounded-2xl md:border',
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
        <div className="flex flex-col gap-1">
          <h2 id={titleId} className="display text-2xl md:text-3xl">
            {title}
          </h2>
          {description ? <p className="text-sm text-muted-text">{description}</p> : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-muted-text transition-colors hover:border-line-strong hover:text-text"
          aria-label="Fechar"
        >
          <X className="size-4" aria-hidden />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6">{children}</div>
      {footer ? <footer className="border-t border-line px-5 py-4 md:px-6">{footer}</footer> : null}
    </dialog>
  )
}
