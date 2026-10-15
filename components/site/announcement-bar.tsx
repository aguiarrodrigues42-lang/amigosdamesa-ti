'use client'

import { Fragment } from 'react'
import { useCampaignStatus } from '@/hooks/use-campaign'

const liveItems = [
  'Black Week 2026',
  'As ofertas já estão no ar',
  'Condições especiais de novembro',
  'Encontre seu plano na Amigos da Mesa',
] as const

const items = {
  prelaunch: liveItems,
  live: liveItems,
  ended: ['Black Week 2026 encerrada', 'Amigos da Mesa PRO', 'Conheça os planos vigentes'],
} as const

function Diamond() {
  return <span className="mx-5 inline-block size-1.5 shrink-0 rotate-45 bg-text md:mx-7" aria-hidden />
}

function Sequence({ list }: { list: readonly string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {[...list, ...list].map((t, i) => (
        <Fragment key={`${t}-${i}`}>
          <span className="whitespace-nowrap">{t}</span>
          <Diamond />
        </Fragment>
      ))}
    </div>
  )
}

export function AnnouncementBar() {
  const status = useCampaignStatus()
  const list = items[status]

  return (
    <div className="ribbon relative overflow-hidden border-b border-bw-red-deep bg-bw-red text-text">
      <p className="sr-only">{list.join(' · ')}</p>
      <div
        className="flex h-[42px] items-center font-display text-[15px] font-bold uppercase tracking-[0.14em] md:h-[46px] md:text-base"
        aria-hidden
      >
        <div className="ribbon-track flex w-max motion-reduce:hidden">
          <Sequence list={list} />
          <Sequence list={list} />
        </div>
        <div className="hidden w-full items-center justify-center gap-3 px-4 text-center motion-reduce:flex">
          <span className="truncate">{`${list[0]} · ${list[1]}`}</span>
        </div>
      </div>
    </div>
  )
}
