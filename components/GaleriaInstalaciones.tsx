'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface Foto {
  src: string
  alt: string
  titulo: string
}

/**
 * Galería de fotos reales de las instalaciones, con visor a pantalla completa.
 * Navegable con teclado (← → Esc) y cerrable con clic fuera.
 */
export default function GaleriaInstalaciones({ fotos }: { fotos: Foto[] }) {
  const [abierta, setAbierta] = useState<number | null>(null)

  const cerrar    = useCallback(() => setAbierta(null), [])
  const siguiente = useCallback(
    () => setAbierta((i) => (i === null ? null : (i + 1) % fotos.length)),
    [fotos.length],
  )
  const anterior = useCallback(
    () => setAbierta((i) => (i === null ? null : (i - 1 + fotos.length) % fotos.length)),
    [fotos.length],
  )

  useEffect(() => {
    if (abierta === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     cerrar()
      if (e.key === 'ArrowRight') siguiente()
      if (e.key === 'ArrowLeft')  anterior()
    }
    window.addEventListener('keydown', onKey)
    // Evita que la página de atrás haga scroll mientras el visor está abierto
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflowPrevio
    }
  }, [abierta, cerrar, siguiente, anterior])

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fotos.map((foto, i) => (
          <button
            key={foto.src}
            type="button"
            onClick={() => setAbierta(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Ampliar foto: ${foto.titulo}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
              aria-hidden="true"
            />
            <span className="absolute bottom-3 left-4 right-4 text-left text-white text-sm font-semibold drop-shadow">
              {foto.titulo}
            </span>
          </button>
        ))}
      </div>

      {abierta !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label={fotos[abierta].titulo}
          onClick={cerrar}
        >
          <button
            type="button"
            onClick={cerrar}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar visor"
          >
            <X size={28} />
          </button>

          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); anterior() }}
                className="absolute left-2 sm:left-6 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={34} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); siguiente() }}
                className="absolute right-2 sm:right-6 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Foto siguiente"
              >
                <ChevronRight size={34} />
              </button>
            </>
          )}

          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos[abierta].src}
              alt={fotos[abierta].alt}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <figcaption className="text-center text-white/80 text-sm mt-4">
              {fotos[abierta].titulo}
              <span className="text-white/40 ml-2">
                {abierta + 1} / {fotos.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
