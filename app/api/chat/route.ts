import { NextRequest, NextResponse } from 'next/server'

const N8N_WEBHOOK =
  'https://n8n-n8n.7yidoh.easypanel.host/webhook/240667e2-c936-41b0-9f90-c2e2547f0ce0/chat'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const n8nRes = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await n8nRes.json()
    return NextResponse.json(data, { status: n8nRes.status })
  } catch (err) {
    console.error('[chat proxy] error:', err)
    return NextResponse.json(
      { error: 'Error al conectar con el asistente. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}
