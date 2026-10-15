'use client'

import { campaign } from '@/config/campaign'
import { useCampaignStatus } from '@/hooks/use-campaign'

const copy = {
  prelaunch: 'Black Week 2026 em preparação · condições sujeitas à aprovação',
  live: 'Black Week 2026 · condições conforme tabela oficial da campanha',
  ended: 'Black Week 2026 encerrada · consulte as condições vigentes',
} as const

export function AnnouncementBar() {
  const status = useCampaignStatus()

  return (
    <div className="border-b border-line bg-bg-deep">
      <div className="container-desk flex h-9 items-center justify-center gap-3 text-center">
        <span
          className={
            status === 'live'
              ? 'size-1.5 shrink-0 rounded-full bg-orange'
              : 'size-1.5 shrink-0 rounded-full bg-subtle'
          }
          aria-hidden
        />
        <p className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-muted-text">
          {copy[status]}
          {!campaign.approved && status !== 'ended' ? (
            <span className="ml-2 text-orange max-sm:hidden">· preview</span>
          ) : null}
        </p>
      </div>
    </div>
  )
}
