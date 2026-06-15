'use client'

import { useEffect } from 'react'

const WEBHOOK_URL = '/api/chat'

export default function N8nChat() {
  useEffect(() => {
    async function init() {
      if (!document.getElementById('n8n-chat-css')) {
        const link = document.createElement('link')
        link.id = 'n8n-chat-css'
        link.rel = 'stylesheet'
        link.href = '/n8n-chat/style.css'
        document.head.appendChild(link)
      }

      const { createChat } = await import('@n8n/chat')
      const chat = createChat({
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

      const w = window as any
      w.openN8nChat = () => {
        if (chat && typeof chat.open === 'function') {
          chat.open()
        }
      }
    }

    init().catch(console.error)
  }, [])

  return null
}
