'use client'

import { MessageCircle } from 'lucide-react'

interface Props {
  className?: string
  children?: React.ReactNode
  iconSize?: number
  /**
   * Atributos del lead que se mandan a Chatwoot al abrir el chat
   * (aparecen en el sidebar de la conversación). Ej: { ruta_interes: 'Datos' }.
   */
  attributes?: Record<string, string>
}

export default function ChatButton({
  className,
  children = 'QUIERO INFORMACIÓN',
  iconSize = 18,
  attributes,
}: Props) {
  function handleClick() {
    const w = window as any
    if (typeof w.openChat === 'function') {
      w.openChat(attributes)
    }
  }

  return (
    <button onClick={handleClick} type="button" className={className}>
      <MessageCircle size={iconSize} aria-hidden="true" />
      {children}
    </button>
  )
}
