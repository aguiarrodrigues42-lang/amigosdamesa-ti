import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  align = 'left',
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <div
      className={cn(
        'flex max-w-4xl flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <p className="eyebrow flex items-center gap-3">
        <span className="h-px w-8 bg-orange" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="h2-desk">{title}</h2>
      {lead ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-text md:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  )
}
