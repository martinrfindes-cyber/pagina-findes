import { NextResponse } from 'next/server'

/**
 * Recibe el formulario de renta de aulas y lo reenvía al workflow de n8n
 * (FINDES-LEAD-AULA), que lo escribe en Chatwoot para que aparezca en el
 * dashboard del CRM.
 *
 * Va por el servidor y no directo desde el navegador para que la URL del
 * webhook no viaje en el bundle público y para no depender de CORS.
 * Configurar N8N_LEAD_WEBHOOK_URL en el entorno (Easypanel). Si no está
 * definida, el endpoint responde ok igual: el lead ya se va por WhatsApp y
 * no queremos romperle el envío al usuario.
 */

const WEBHOOK = process.env.N8N_LEAD_WEBHOOK_URL

export async function POST(req: Request) {
  let datos: Record<string, unknown>
  try {
    datos = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Honeypot: los bots llenan todos los campos, las personas no ven este.
  if (typeof datos.web === 'string' && datos.web.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const texto = (v: unknown) => (typeof v === 'string' ? v.trim().slice(0, 300) : '')
  const lead = {
    origen:   'renta-aulas',
    servicio: 'Renta de aulas',
    nombre:   texto(datos.nombre),
    celular:  texto(datos.celular),
    correo:   texto(datos.correo),
    personas: texto(datos.personas),
    fecha:    texto(datos.fecha),
    duracion: texto(datos.duracion),
    notas:    texto(datos.notas),
  }

  // Sin forma de contactar no hay nada que registrar.
  if (!lead.correo && !lead.celular) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (!WEBHOOK) {
    console.warn('[lead-aula] N8N_LEAD_WEBHOOK_URL no configurada; el lead solo va por WhatsApp')
    return NextResponse.json({ ok: true, registrado: false })
  }

  try {
    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error('[lead-aula] n8n respondió', res.status)
      return NextResponse.json({ ok: true, registrado: false })
    }
  } catch (err) {
    console.error('[lead-aula] no se pudo avisar a n8n:', err)
    return NextResponse.json({ ok: true, registrado: false })
  }

  return NextResponse.json({ ok: true, registrado: true })
}
