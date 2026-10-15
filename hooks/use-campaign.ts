'use client'

import { useSyncExternalStore } from 'react'
import { getCampaignStatus, type CampaignStatus } from '@/config/campaign'

function subscribeEvery(ms: number) {
  return (cb: () => void) => {
    const id = window.setInterval(cb, ms)
    return () => window.clearInterval(id)
  }
}

const subscribeStatus = subscribeEvery(30_000)

export function useCampaignStatus(): CampaignStatus {
  return useSyncExternalStore(
    subscribeStatus,
    () => getCampaignStatus(),
    () => getCampaignStatus(),
  )
}

const subscribeSecond = subscribeEvery(1_000)
const getSecond = () => Math.floor(Date.now() / 1000)
const getNull = () => null

/** Segundos epoch atuais no cliente; null durante SSR para evitar divergência. */
export function useNowSeconds(): number | null {
  return useSyncExternalStore(subscribeSecond, getSecond, getNull)
}
