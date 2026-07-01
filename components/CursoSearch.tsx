'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Search, X, ArrowRight } from 'lucide-react'
import { cursos } from '@/lib/cursos'

// Quita acentos y pasa a minúsculas para que la búsqueda sea tolerante.
function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

interface Props {
  /** true cuando el navbar ya hizo scroll (fondo blanco). Solo afecta al botón. */
  scrolled?: boolean
  /** 'desktop' = botón que abre un panel; 'mobile' = input siempre visible. */
  variant?: 'desktop' | 'mobile'
  /** callback tras elegir un curso (p. ej. cerrar el menú móvil). */
  onNavigate?: () => void
}

export default function CursoSearch({ scrolled = false, variant = 'desktop', onNavigate }: Props) {
  const [open, setOpen]   = useState(variant === 'mobile')
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef     = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return []
    return cursos
      .filter((c) => normalize(c.nombre).includes(q) || normalize(c.rutaNombre).includes(q))
      .slice(0, 8)
  }, [query])

  // Cerrar al hacer click fuera o con Escape (solo en desktop).
  useEffect(() => {
    if (variant !== 'desktop' || !open) return
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, variant])

  // Enfocar el input al abrir en desktop.
  useEffect(() => {
    if (variant === 'desktop' && open) inputRef.current?.focus()
  }, [open, variant])

  function handleSelect() {
    setQuery('')
    if (variant === 'desktop') setOpen(false)
    onNavigate?.()
  }

  const resultsList = (
    <ul className="max-h-80 overflow-y-auto py-1" role="listbox">
      {results.map((c) => (
        <li key={c.slug} role="option" aria-selected="false">
          <Link
            href={`/cursos/${c.slug}`}
            onClick={handleSelect}
            className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-primary-50 transition-colors group"
          >
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-primary truncate">{c.nombre}</span>
              <span className="block text-xs text-gray-400 truncate">{c.rutaNombre} · {c.duracion}</span>
            </span>
            <ArrowRight size={15} className="flex-shrink-0 text-gray-300 group-hover:text-primary transition-colors" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )

  const emptyState = query.trim() !== '' && results.length === 0 && (
    <p className="px-4 py-4 text-sm text-gray-400 text-center">
      No encontramos ese curso. Escríbenos y te ayudamos.
    </p>
  )

  // ── Variante móvil: input en línea siempre visible ──────────────────────────
  if (variant === 'mobile') {
    return (
      <div className="py-3 border-b border-gray-100">
        <div className="relative">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar un curso…"
            aria-label="Buscar un curso"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {(results.length > 0 || emptyState) && (
          <div className="mt-2 rounded-xl border border-gray-100 bg-white shadow-sm">
            {results.length > 0 ? resultsList : emptyState}
          </div>
        )}
      </div>
    )
  }

  // ── Variante desktop: botón que despliega un panel ──────────────────────────
  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Buscar un curso"
        aria-expanded={open}
        className={`p-2 rounded-lg transition-colors ${
          scrolled ? 'text-gray-600 hover:text-primary hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'
        }`}
      >
        <Search size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden animate-fadeIn">
          <div className="relative border-b border-gray-100">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar un curso…"
              aria-label="Buscar un curso"
              className="w-full py-3 pl-11 pr-10 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); inputRef.current?.focus() }}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {query.trim() === '' ? (
            <p className="px-4 py-4 text-sm text-gray-400 text-center">
              Escribe el nombre de un curso o un área.
            </p>
          ) : results.length > 0 ? (
            resultsList
          ) : (
            emptyState
          )}
        </div>
      )}
    </div>
  )
}
