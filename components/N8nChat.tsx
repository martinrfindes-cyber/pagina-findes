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
      createChat({
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

      // @n8n/chat no expone un método open(); la ventana solo se abre
      // haciendo clic en su botón flotante (.chat-window-toggle).
      const w = window as any
      w.openN8nChat = () => {
        const toggle = document.querySelector<HTMLElement>('.chat-window-toggle')
        if (!toggle) return
        const win = document.querySelector<HTMLElement>('.chat-window')
        const isOpen = win ? getComputedStyle(win).display !== 'none' : false
        if (!isOpen) toggle.click()
      }
    }

    init().catch(console.error)
  }, [])

  return null
}
