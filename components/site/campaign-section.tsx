'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { campaign } from '@/config/campaign'
import { useCampaignStatus, useNowSeconds } from '@/hooks/use-campaign'
import { formatDateSP } from '@/lib/format'
import { cn } from '@/lib/utils'

const liveCopy = {
  label: 'Ofertas no ar',
  title: 'Black Week 2026 já começou.',
  text: 'Condições especiais liberadas em todas as categorias. Escolha seu plano e comece sua jornada.',
  countTo: 'end' as const,
  countLabel: 'As ofertas terminam em',
}

const statusCopy = {
  prelaunch: liveCopy,
  live: liveCopy,
  ended: {
    label: 'Encerrada',
    title: 'A Black Week 2026 terminou.',
    text: 'Os planos seguem disponíveis nas condições vigentes do catálogo.',
    countTo: null,
    countLabel: '',
  },
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function Countdown({ target, label }: { target: string; label: string }) {
  const now = useNowSeconds()
  const targetS = Math.floor(new Date(target).getTime() / 1000)
  const diff = now == null ? null : Math.max(0, targetS - now)
  const parts =
    diff == null
      ? null
      : [
          ['dias', Math.floor(diff / 86400)],
          ['horas', Math.floor((diff % 86400) / 3600)],
          ['min', Math.floor((diff % 3600) / 60)],
          ['seg', diff % 60],
        ]

  return (
    <div className="flex flex-col gap-3">
      <p className="eyebrow">{label}</p>
      <div className="flex gap-2" role="timer" aria-live="off">
        {(parts ?? [['dias'], ['horas'], ['min'], ['seg']]).map(([unit, v]) => (
          <div
            key={unit as string}
            className="flex min-w-16 flex-col items-center rounded-lg border border-line bg-surface px-3 py-3 md:min-w-20"
          >
            <span className="font-mono text-2xl tabular-nums text-text md:text-3xl">
              {v == null ? '--' : pad(v as number)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
              {unit}
            </span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[11px] text-subtle">Horário de Brasília (America/Sao_Paulo)</p>
    </div>
  )
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

export function CampaignSection() {
  const status = useCampaignStatus()
  const c = statusCopy[status]
  const { ref, visible } = useInView<HTMLDivElement>()

  return (
    <section
      id="campanha"
      aria-labelledby="campanha-title"
      className="relative overflow-hidden border-t border-line bg-bg-deep py-24 lg:py-32"
    >
      <div ref={ref} className={cn('container-desk relative flex flex-col gap-14', visible && 'is-visible')}>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]',
              status === 'live'
                ? 'border-orange text-orange'
                : 'border-line-strong text-muted-text',
            )}
          >
            <span
              className={cn('size-1.5 rounded-full', status === 'live' ? 'bg-orange' : 'bg-subtle')}
              aria-hidden
            />
            {c.label}
          </span>
        </div>

        <div className="relative">
          <h2
            id="campanha-title"
            className="display select-none text-[clamp(4.6rem,17vw,15.5rem)] leading-[0.82] text-text"
          >
            Black
            <br />
            <span className="text-orange">Week</span>
          </h2>
          <svg
            className="pointer-events-none absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2 md:h-32"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 70 L180 70 L260 40 L380 55 L470 22 L560 48 L640 30 L760 52 L860 18 L1000 18"
              fill="none"
              stroke="var(--orange)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              className="draw-line"
            />
          </svg>
        </div>

        <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-6">
            <h3 className="display text-3xl md:text-4xl">{c.title}</h3>
            <p className="max-w-xl leading-relaxed text-muted-text">{c.text}</p>
            <dl className="mt-2 grid max-w-md grid-cols-2 gap-4 font-mono text-xs">
              <div className="flex flex-col gap-1">
                <dt className="uppercase tracking-[0.16em] text-subtle">Início</dt>
                <dd className="text-text">{formatDateSP(campaign.start)}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="uppercase tracking-[0.16em] text-subtle">Término</dt>
                <dd className="text-text">{formatDateSP(campaign.end)}</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-6 lg:items-end">
            {c.countTo ? (
              <Countdown
                target={(c.countTo as string) === 'start' ? campaign.start : campaign.end}
                label={c.countLabel}
              />
            ) : null}
            <a
              href="#planos"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-bw-red px-7 font-bold uppercase tracking-[0.06em] text-text transition-colors hover:bg-bw-red-hot"
            >
              {status === 'ended' ? 'Ver planos' : 'Aproveitar ofertas'}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
