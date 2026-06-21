'use client'

import { useEffect } from 'react'

// El websiteToken de Chatwoot es público (viaja al navegador en el widget),
// así que es seguro tenerlo aquí. Se puede sobreescribir por variables de
// entorno NEXT_PUBLIC_* si algún día cambia la instancia de Chatwoot.
const BASE_URL =
  process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL ||
  'https://findes-chatwoot.7yidoh.easypanel.host'
const WEBSITE_TOKEN =
  process.env.NEXT_PUBLIC_CHATWOOT_TOKEN || 'Yf5FuqrRkWKh8TtEvHpTii5j'

/**
 * Carga el web widget de Chatwoot y expone un único punto de entrada,
 * `window.openChat(attributes?)`, para que cualquier botón de la página abra
 * el chat (y, opcionalmente, mande atributos del lead al sidebar de Chatwoot).
 *
 * Reemplaza al antiguo widget de @n8n/chat. El "cerebro" del bot ahora vive
 * en n8n vía el Agent Bot de Chatwoot, no en /api/chat.
 */
export default function ChatwootWidget() {
  useEffect(() => {
    const w = window as any

    // Aplica atributos del lead (si los hay) y abre la ventana de chat.
    const applyAndOpen = (attributes?: Record<string, string>) => {
      if (attributes && w.$chatwoot?.setCustomAttributes) {
        try {
          w.$chatwoot.setCustomAttributes(attributes)
        } catch {
          /* sin bloquear la apertura del chat */
        }
      }
      w.$chatwoot?.toggle('open')
    }

    // Punto de entrada único para los botones "QUIERO INFORMACIÓN".
    // Si el SDK aún no terminó de cargar, deja la acción en cola.
    w.openChat = (attributes?: Record<string, string>) => {
      if (w.$chatwoot) {
        applyAndOpen(attributes)
      } else {
        w.__chatwootPending = attributes ?? {}
      }
    }

    const onReady = () => {
      if (w.__chatwootPending !== undefined) {
        applyAndOpen(w.__chatwootPending)
        delete w.__chatwootPending
      }
    }
    window.addEventListener('chatwoot:ready', onReady)

    // Ocultamos la burbuja por defecto: la página ya tiene su propio botón
    // flotante (WhatsAppFloat) y los CTA llaman a openChat().
    w.chatwootSettings = {
      locale: 'es',
      position: 'right',
      hideMessageBubble: true,
    }

    // Inyecta el SDK una sola vez.
    if (!document.getElementById('chatwoot-sdk')) {
      const g = document.createElement('script')
      g.id = 'chatwoot-sdk'
      g.src = BASE_URL + '/packs/js/sdk.js'
      g.async = true
      g.onload = () => {
        w.chatwootSDK?.run({ websiteToken: WEBSITE_TOKEN, baseUrl: BASE_URL })
      }
      document.head.appendChild(g)
    }

    return () => {
      window.removeEventListener('chatwoot:ready', onReady)
    }
  }, [])

  return null
}
