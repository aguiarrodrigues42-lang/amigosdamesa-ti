'use client'

import { useId, useState } from 'react'
import { glossary, type GlossaryKey } from '@/data/glossary'
import { cn } from '@/lib/utils'

export function Term({
  k,
  children,
  className,
}: {
  k: GlossaryKey
  children: React.ReactNode
  className?: string
}) {
  const id = useId()
  const [open, setOpen] = useState(false)

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        className="cursor-help text-left underline decoration-subtle decoration-dotted underline-offset-4 transition-colors hover:decoration-orange"
      >
        {children}
        <span className="sr-only"> — o que significa</span>
      </button>
      <span
        id={id}
        role="tooltip"
        className={cn(
          'pointer-events-none absolute bottom-full left-0 z-40 mb-2 w-64 rounded-lg border border-line-strong bg-surface-raised p-3 font-sans text-[13px] normal-case leading-relaxed tracking-normal text-text shadow-xl transition-opacity duration-150',
          open ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden={!open}
      >
        {glossary[k]}
      </span>
    </span>
  )
}
