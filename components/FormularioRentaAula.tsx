'use client'

import { useState } from 'react'
import { MessageCircle, CheckCircle2, ShieldCheck, Clock, Send } from 'lucide-react'
import { WA_NUMBER } from '@/lib/constants'

/**
 * Formulario de cotización de renta de aula (hero de /renta-de-aulas).
 *
 * No hay backend: al enviar arma un mensaje de WhatsApp ya redactado y abre
 * el chat con FINDES. Es el camino con menos fricción — el prospecto solo
 * llena 4 campos, toca "Enviar" y el lead llega al celular que sí se contesta.
 *
 * Si algún día quieres que el lead también caiga en n8n/CRM, basta con definir
 * NEXT_PUBLIC_LEADS_WEBHOOK: se hace un POST silencioso (fire and forget) y,
 * si falla, el usuario ni se entera porque WhatsApp ya se abrió.
 */

const OPCIONES_PERSONAS = ['1 a 15', '16 a 30', '31 a 50', 'Más de 50'] as const
const OPCIONES_DURACION = ['Por horas', 'Medio día', 'Día completo', 'Varios días'] as const

const WEBHOOK = process.env.NEXT_PUBLIC_LEADS_WEBHOOK

interface Errores {
  nombre?: string
  celular?: string
  correo?: string
  personas?: string
}

export default function FormularioRentaAula() {
  const [nombre,   setNombre]   = useState('')
  const [celular,  setCelular]  = useState('')
  const [correo,   setCorreo]   = useState('')
  const [personas, setPersonas] = useState('')
  const [fecha,    setFecha]    = useState('')
  const [duracion, setDuracion] = useState('')
  const [notas,    setNotas]    = useState('')

  const [errores, setErrores] = useState<Errores>({})
  const [enviado, setEnviado] = useState(false)
  const [waUrl,   setWaUrl]   = useState('')

  function validar(): Errores {
    const e: Errores = {}
    if (!nombre.trim())                             e.nombre   = 'Dinos tu nombre o el de tu empresa'
    if (celular.replace(/\D/g, '').length < 10)     e.celular  = 'Necesitamos 10 dígitos para contactarte'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) e.correo   = 'Revisa tu correo'
    if (!personas)                                  e.personas = 'Elige cuántas personas serán'
    return e
  }

  function armarMensaje(): string {
    const lineas = [
      'Hola FINDES, quiero cotizar la renta de un aula.',
      '',
      `• Nombre / empresa: ${nombre.trim()}`,
      `• Personas: ${personas}`,
      `• Fecha tentativa: ${fecha ? formatearFecha(fecha) : 'Por definir'}`,
      `• Duración: ${duracion || 'Por definir'}`,
      `• Celular: ${celular.trim()}`,
      `• Correo: ${correo.trim()}`,
    ]
    if (notas.trim()) lineas.push(`• Notas: ${notas.trim()}`)
    return lineas.join('\n')
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()

    const e = validar()
    setErrores(e)
    if (Object.keys(e).length > 0) return

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(armarMensaje())}`
    setWaUrl(url)
    setEnviado(true)

    // Copia del lead al webhook, si está configurado. Nunca bloquea el envío.
    if (WEBHOOK) {
      fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origen: 'renta-aulas',
          servicio: 'Renta de aulas',
          nombre, celular, correo, personas, fecha, duracion, notas,
        }),
        keepalive: true,
      }).catch(() => { /* el lead ya va por WhatsApp */ })
    }

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // ── Pantalla de confirmación ───────────────────────────────────────────────
  if (enviado) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 p-7 sm:p-8 text-center animate-fadeIn">
        <div className="w-14 h-14 rounded-2xl bg-wa/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={28} className="text-wa" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">Ya casi — solo dale enviar</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Abrimos WhatsApp con tus datos ya escritos. Envía el mensaje y te confirmamos
          disponibilidad y costo en minutos.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 w-full bg-wa text-white font-bold px-6 py-3.5 rounded-2xl hover:bg-wa-dark active:scale-95 transition-all text-base shadow-lg shadow-wa/25"
        >
          <MessageCircle size={19} aria-hidden="true" />
          Abrir WhatsApp de nuevo
        </a>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-4 text-sm text-gray-400 hover:text-primary transition-colors"
        >
          Corregir mis datos
        </button>
      </div>
    )
  }

  // ── Formulario ─────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="form-aula-heading"
      className="bg-white rounded-3xl shadow-2xl shadow-black/20 p-6 sm:p-7"
    >
      <h2 id="form-aula-heading" className="text-xl font-bold text-primary leading-snug">
        Cotiza tu aula en 30 segundos
      </h2>
      <p className="text-gray-500 text-sm mt-1.5 mb-5">
        Llena esto y te confirmamos disponibilidad y precio el mismo día.
      </p>

      <div className="space-y-4">
        <Campo
          id="aula-nombre"
          label="Nombre o empresa"
          error={errores.nombre}
        >
          <input
            id="aula-nombre"
            name="nombre"
            type="text"
            autoComplete="organization"
            placeholder="Ej. Grupo Reforma o Ana Martínez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            aria-invalid={!!errores.nombre}
            className={inputCls(!!errores.nombre)}
          />
        </Campo>

        <div className="grid sm:grid-cols-2 gap-4">
          <Campo id="aula-celular" label="WhatsApp" error={errores.celular}>
            <input
              id="aula-celular"
              name="celular"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="55 1234 5678"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              aria-invalid={!!errores.celular}
              className={inputCls(!!errores.celular)}
            />
          </Campo>

          <Campo id="aula-correo" label="Correo" error={errores.correo}>
            <input
              id="aula-correo"
              name="correo"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="tu@empresa.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              aria-invalid={!!errores.correo}
              className={inputCls(!!errores.correo)}
            />
          </Campo>
        </div>

        {/* Capacidad — pills de un toque, más rápido que escribir */}
        <fieldset>
          <legend className="block text-xs font-semibold text-gray-600 mb-2">
            ¿Cuántas personas serán?
          </legend>
          <div className="grid grid-cols-4 gap-1.5">
            {OPCIONES_PERSONAS.map((op) => (
              <Pill
                key={op}
                activo={personas === op}
                onClick={() => {
                  setPersonas(op)
                  setErrores((prev) => ({ ...prev, personas: undefined }))
                }}
              >
                {op}
              </Pill>
            ))}
          </div>
          {errores.personas && <Error>{errores.personas}</Error>}
        </fieldset>

        {/* Fecha y duración — opcionales, pero es lo que permite cotizar de una vez */}
        <Campo id="aula-fecha" label="Fecha tentativa" opcional>
          <input
            id="aula-fecha"
            name="fecha"
            type="date"
            value={fecha}
            min={hoy()}
            onChange={(e) => setFecha(e.target.value)}
            className={inputCls(false)}
          />
        </Campo>

        <fieldset>
          <legend className="block text-xs font-semibold text-gray-600 mb-2">
            Duración <span className="font-normal text-gray-400">(opcional)</span>
          </legend>
          <div className="grid grid-cols-2 gap-1.5">
            {OPCIONES_DURACION.map((op) => (
              <Pill key={op} activo={duracion === op} onClick={() => setDuracion(duracion === op ? '' : op)}>
                {op}
              </Pill>
            ))}
          </div>
        </fieldset>

        <Campo id="aula-notas" label="¿Algo más que debamos saber?" opcional>
          <input
            id="aula-notas"
            name="notas"
            type="text"
            placeholder="Coffee break, montaje en U, factura…"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            className={inputCls(false)}
          />
        </Campo>
      </div>

      <button
        type="submit"
        className="mt-6 w-full inline-flex items-center justify-center gap-2.5 bg-wa text-white font-bold px-6 py-4 rounded-2xl hover:bg-wa-dark active:scale-95 transition-all text-base shadow-lg shadow-wa/25"
      >
        <Send size={18} aria-hidden="true" />
        Enviar y cotizar por WhatsApp
      </button>

      <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-gray-400">
        <li className="flex items-center gap-1.5">
          <Clock size={12} aria-hidden="true" />
          Respondemos en minutos
        </li>
        <li className="flex items-center gap-1.5">
          <ShieldCheck size={12} aria-hidden="true" />
          Sin compromiso
        </li>
      </ul>
    </form>
  )
}

// ── Piezas chiquitas ─────────────────────────────────────────────────────────

function inputCls(hayError: boolean): string {
  return [
    'w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors',
    hayError ? 'border-red-400 bg-red-50/40' : 'border-gray-200 bg-white',
  ].join(' ')
}

function Campo({
  id, label, error, opcional, children,
}: {
  id: string
  label: string
  error?: string
  opcional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-600 mb-2">
        {label}
        {opcional && <span className="font-normal text-gray-400"> (opcional)</span>}
      </label>
      {children}
      {error && <Error>{error}</Error>}
    </div>
  )
}

function Error({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-[11px] text-red-500 mt-1.5">
      {children}
    </p>
  )
}

function Pill({
  activo, onClick, children,
}: {
  activo: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={[
        'rounded-xl border px-2 py-2.5 text-[11px] font-semibold transition-all active:scale-95',
        activo
          ? 'border-primary bg-primary text-white shadow-sm'
          : 'border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/** Fecha de hoy en YYYY-MM-DD para el min del input */
function hoy(): string {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

/** 2026-08-20 → 20 de agosto de 2026 (para el mensaje de WhatsApp) */
function formatearFecha(iso: string): string {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
