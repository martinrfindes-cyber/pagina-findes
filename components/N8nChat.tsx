'use client'

import { useEffect } from 'react'

const WEBHOOK_URL = '/api/chat'

function injectScript(src: string, id: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById(id)) { resolve(); return }
    const s = document.createElement('script')
    s.id = id
    s.src = src
    s.type = 'module'
    s.onload = () => resolve()
    document.head.appendChild(s)
  })
}

function injectCSS(href: string, id: string) {
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

export default function N8nChat() {
  useEffect(() => {
    injectCSS('/n8n-chat/style.css', 'n8n-chat-css')

    injectScript('/n8n-chat/chat.bundle.es.js', 'n8n-chat-js').then(() => {
      const w = window as any
      if (typeof w.createChat !== 'function') return
      const chat = w.createChat({
        webhookUrl: WEBHOOK_URL,
        mode: 'window',
        showWelcomeScreen: true,
        initialMessages: [
          '¡Hola! 👋 Soy el asistente de FINDES.',
          '¿En qué curso o ruta de aprendizaje te puedo orientar?',
        ],
        i18n: {
          en: {
            title: 'Asistente FINDES',
            subtitle: 'Respondo tus preguntas sobre cursos, horarios e inscripciones.',
            footer: '',
            getStarted: 'Comenzar conversación',
            inputPlaceholder: 'Escribe tu pregunta aquí...',
            closeButtonTooltip: 'Cerrar chat',
          },
        },
      })

      w.openN8nChat = () => {
        if (chat && typeof chat.open === 'function') {
          chat.open()
        }
      }
    })
  }, [])

  return null
}
