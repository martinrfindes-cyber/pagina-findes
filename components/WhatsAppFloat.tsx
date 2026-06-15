'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  const [visible,     setVisible]     = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Show after 3 s or when user scrolls past 300 px — whichever comes first
    const timer = setTimeout(() => setVisible(true), 3000)

    const onScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-5 z-50 flex items-center gap-3">
      {showTooltip && (
        <div
          role="tooltip"
          className="bg-white text-gray-700 text-sm font-medium px-3.5 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap animate-fadeIn"
        >
          ¿Necesitas ayuda?
        </div>
      )}
      <button
        type="button"
        onClick={() => (window as any).openN8nChat?.()}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={()    => setShowTooltip(true)}
        onBlur={()     => setShowTooltip(false)}
        aria-label="Abrir asistente virtual — QUIERO INFORMACIÓN"
        className="bg-wa text-white font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-wa/30 flex items-center gap-2 hover:bg-wa-dark hover:scale-105 active:scale-95 transition-all duration-200 animate-bounceSlight text-sm"
      >
        <MessageCircle size={20} className="text-white shrink-0" aria-hidden="true" />
        QUIERO INFORMACIÓN
      </button>
    </div>
  )
}
