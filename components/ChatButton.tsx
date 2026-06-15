'use client'

import { MessageCircle } from 'lucide-react'

interface Props {
  className?: string
  children?: React.ReactNode
  iconSize?: number
}

export default function ChatButton({ className, children = 'QUIERO INFORMACIÓN', iconSize = 18 }: Props) {
  function handleClick() {
    const w = window as any
    if (typeof w.openN8nChat === 'function') {
      w.openN8nChat()
    }
  }

  return (
    <button onClick={handleClick} type="button" className={className}>
      <MessageCircle size={iconSize} aria-hidden="true" />
      {children}
    </button>
  )
}
