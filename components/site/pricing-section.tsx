'use client'

import { useEffect, useMemo, useState } from 'react'
import { Columns3, Search, SlidersHorizontal, X } from 'lucide-react'
import { useCampaignStatus } from '@/hooks/use-campaign'
import { categories, plans } from '@/data/plans'
import type { CategorySlug, Plan } from '@/data/types'
import { cn } from '@/lib/utils'
import { ComparePlans } from './compare-plans'
import { DeskDialog } from './desk-dialog'
import { PlanCard } from './plan-card'
import { PlanDetailDrawer } from './plan-detail-drawer'
import { SectionHeading } from './section-heading'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'contracts-asc' | 'contracts-desc'

const sortLabels: Record<SortKey, string> = {
  featured: 'Ordem do catálogo',
  'price-asc': 'Menor preço',
  'price-desc': 'Maior preço',
  'contracts-asc': 'Menos contratos',
  'contracts-desc': 'Mais contratos',
}

const PAGE = 6
const MAX_COMPARE = 3
const slugs = categories.map((c) => c.slug) as string[]

function sortPlans(list: Plan[], key: SortKey) {
  const nullLast = (v: number | null, dir: 1 | -1) => (v == null ? Number.POSITIVE_INFINITY : v * dir)
  const copy = [...list]
  switch (key) {
    case 'price-asc':
      return copy.sort((a, b) => nullLast(a.baseOfferPriceCents, 1) - nullLast(b.baseOfferPriceCents, 1))
    case 'price-desc':
      return copy.sort((a, b) => nullLast(a.baseOfferPriceCents, -1) - nullLast(b.baseOfferPriceCents, -1))
    case 'contracts-asc':
      return copy.sort((a, b) => nullLast(a.contracts, 1) - nullLast(b.contracts, 1))
    case 'contracts-desc':
      return copy.sort((a, b) => nullLast(a.contracts, -1) - nullLast(b.contracts, -1))
    default:
      return copy
  }
}

function FilterControls({
  sort,
  setSort,
  onlyAvailable,
  setOnlyAvailable,
}: {
  sort: SortKey
  setSort: (s: SortKey) => void
  onlyAvailable: boolean
  setOnlyAvailable: (v: boolean) => void
}) {
  return (
    <>
      <label className="flex flex-col gap-1.5 text-xs text-muted-text md:flex-row md:items-center md:gap-2">
        Ordenar
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-11 rounded-full border border-line-strong bg-surface px-4 text-sm text-text"
        >
          {Object.entries(sortLabels).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </label>
      <label className="flex h-11 cursor-pointer items-center gap-2.5 text-sm text-muted-text">
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={(e) => setOnlyAvailable(e.target.checked)}
          className="size-4 accent-orange"
        />
        Somente disponíveis
      </label>
    </>
  )
}

export function PricingSection() {
  const status = useCampaignStatus()
  const [active, setActive] = useState<CategorySlug>('exames')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('featured')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [limit, setLimit] = useState(PAGE)
  const [compare, setCompare] = useState<string[]>([])
  const [detailId, setDetailId] = useState<string | null>(null)
  const [compareOpen, setCompareOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1)
      if (slugs.includes(h)) {
        setActive(h as CategorySlug)
        setLimit(PAGE)
      }
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const selectCategory = (slug: CategorySlug) => {
    setActive(slug)
    setLimit(PAGE)
    setQuery('')
    window.history.replaceState(null, '', `#${slug}`)
  }

  const q = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    const base = plans.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.asset ?? ''} ${p.contracts ?? ''} ${p.notes.join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      } else if (p.category !== active) return false
      if (onlyAvailable && p.status !== 'available') return false
      return true
    })
    return sortPlans(base, sort)
  }, [q, active, onlyAvailable, sort])

  const visible = filtered.slice(0, limit)
  const activeCat = categories.find((c) => c.slug === active)!
  const detailPlan = plans.find((p) => p.id === detailId) ?? null
  const comparedPlans = compare.map((id) => plans.find((p) => p.id === id)!).filter(Boolean)

  const toggleCompare = (id: string) =>
    setCompare((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < MAX_COMPARE ? [...prev, id] : prev,
    )

  const countFor = (slug: CategorySlug) => plans.filter((p) => p.category === slug).length

  return (
    <section id="planos" aria-labelledby="planos-title" className="relative border-t border-line py-24 lg:py-32">
      {slugs.map((s) => (
        <span key={s} id={s} className="absolute top-0" aria-hidden />
      ))}
      <div className="container-desk flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={`Catálogo · ${plans.length} ofertas`}
            title={<span id="planos-title">Escolha pelo critério, não pelo impulso.</span>}
            lead="Contratos, meta, stop e preço lado a lado. Os valores abaixo são o preço-base atual do catálogo — preços Black Week só aparecem após aprovação."
          />
        </div>

        <div className="glass sticky top-16 z-30 -mx-5 flex flex-col gap-3 border-y border-line px-5 py-3 md:-mx-8 md:px-8">
          <div role="tablist" aria-label="Categorias de planos" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
            {categories.map((c) => {
              const selected = !q && c.slug === active
              return (
                <button
                  key={c.slug}
                  type="button"
                  role="tab"
                  id={`tab-${c.slug}`}
                  aria-selected={selected}
                  aria-controls="planos-grid"
                  onClick={() => selectCategory(c.slug)}
                  className={cn(
                    'flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm transition-colors',
                    selected ? 'bg-text text-bg-deep' : 'text-muted-text hover:bg-surface-raised hover:text-text',
                  )}
                >
                  {c.label}
                  <span className={cn('font-mono text-[10px]', selected ? 'text-bg-deep/60' : 'text-subtle')}>
                    {countFor(c.slug)}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-3">
            <label className="relative flex-1 md:max-w-xs">
              <span className="sr-only">Buscar plano em todas as categorias</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setLimit(PAGE)
                }}
                placeholder="Buscar: 25 contratos, BIT, Titan…"
                className="h-11 w-full rounded-full border border-line-strong bg-surface pl-11 pr-4 text-sm text-text placeholder:text-subtle"
              />
            </label>
            <div className="hidden items-center gap-5 md:flex">
              <FilterControls
                sort={sort}
                setSort={setSort}
                onlyAvailable={onlyAvailable}
                setOnlyAvailable={setOnlyAvailable}
              />
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-text md:hidden"
              aria-haspopup="dialog"
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              Filtros
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="display text-2xl" aria-live="polite">
            {q ? `${filtered.length} resultado${filtered.length === 1 ? '' : 's'} para “${query.trim()}”` : activeCat.label}
          </p>
          <p className="text-sm text-muted-text">
            {q ? 'Busca em todas as categorias.' : activeCat.subtitle}
          </p>
        </div>

        <div
          id="planos-grid"
          role="tabpanel"
          aria-labelledby={q ? undefined : `tab-${active}`}
          aria-label={q ? 'Resultados da busca' : undefined}
        >
          {visible.length === 0 ? (
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line-strong p-10">
              <p className="display text-2xl">Nenhum plano encontrado.</p>
              <p className="text-sm text-muted-text">Ajuste a busca ou remova o filtro de disponibilidade.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setOnlyAvailable(false)
                }}
                className="rounded-full border border-line-strong px-4 py-2 text-sm hover:border-orange"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <li key={p.id}>
                  <PlanCard
                    plan={p}
                    status={status}
                    compared={compare.includes(p.id)}
                    compareDisabled={compare.length >= MAX_COMPARE}
                    onToggleCompare={() => toggleCompare(p.id)}
                    onOpen={() => setDetailId(p.id)}
                  />
                </li>
              ))}
            </ul>
          )}
          {filtered.length > limit ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setLimit((l) => l + PAGE)}
                className="rounded-full border border-line-strong px-6 py-3 text-sm text-text transition-colors hover:border-orange"
              >
                {`Ver mais planos (${filtered.length - limit})`}
              </button>
            </div>
          ) : null}
        </div>

        <p className="max-w-3xl text-xs leading-relaxed text-subtle">
          O valor de referência é o preço riscado da captura de origem e não representa total
          parcelado. Pode haver cobrança de licença da plataforma Profit (referência: ONE R$ 115,00 ·
          PRO R$ 245,00), sujeita a confirmação vigente.
        </p>
      </div>

      {compare.length > 0 ? (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="glass flex items-center gap-3 rounded-full border border-line-strong py-2 pl-5 pr-2 shadow-2xl">
            <Columns3 className="size-4 text-orange" aria-hidden />
            <span className="text-sm" aria-live="polite">
              {`${compare.length} de ${MAX_COMPARE} selecionados`}
            </span>
            <button
              type="button"
              onClick={() => setCompare([])}
              className="flex size-9 items-center justify-center rounded-full text-subtle hover:text-text"
              aria-label="Limpar comparação"
            >
              <X className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setCompareOpen(true)}
              disabled={compare.length < 2}
              className="h-10 rounded-full bg-orange px-5 text-sm font-semibold text-bg-deep disabled:opacity-50"
            >
              Comparar
            </button>
          </div>
        </div>
      ) : null}

      <PlanDetailDrawer plan={detailPlan} status={status} onClose={() => setDetailId(null)} />
      <ComparePlans
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        plans={comparedPlans}
        status={status}
        onRemove={(id) => setCompare((prev) => prev.filter((x) => x !== id))}
      />
      <DeskDialog
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filtros"
        footer={
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="h-12 w-full rounded-full bg-orange font-semibold text-bg-deep"
          >
            {`Ver ${filtered.length} plano${filtered.length === 1 ? '' : 's'}`}
          </button>
        }
      >
        <div className="flex flex-col gap-5">
          <FilterControls
            sort={sort}
            setSort={setSort}
            onlyAvailable={onlyAvailable}
            setOnlyAvailable={setOnlyAvailable}
          />
        </div>
      </DeskDialog>
    </section>
  )
}
