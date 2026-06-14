'use client'

import { useState } from 'react'
import { MessageCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react'
import { waLink } from '@/lib/constants'

type RutaKey = 'datos' | 'rrhh' | 'contabilidad' | 'liderazgo' | 'ventas' | 'admin'
type Step = 0 | 1 | 2 | 'result'

interface Opcion {
  texto: string
  scores: Partial<Record<RutaKey, number>>
}

interface Pregunta {
  texto:    string
  opciones: Opcion[]
}

const preguntas: Pregunta[] = [
  {
    texto: '¿Cuál es tu meta principal?',
    opciones: [
      { texto: 'Mejorar en mi trabajo actual',    scores: { datos: 1, rrhh: 1, contabilidad: 1, liderazgo: 1 } },
      { texto: 'Conseguir un empleo nuevo',       scores: { admin: 2, datos: 1, ventas: 1 } },
      { texto: 'Ascender o subir de puesto',      scores: { liderazgo: 3, datos: 1 } },
      { texto: 'Vender más o atender mejor',      scores: { ventas: 3 } },
      { texto: 'Cambiar de área profesional',     scores: { rrhh: 1, contabilidad: 1, datos: 1, admin: 1 } },
    ],
  },
  {
    texto: '¿En qué área te ves trabajando?',
    opciones: [
      { texto: 'Datos y tecnología',                scores: { datos: 3 } },
      { texto: 'Finanzas o contabilidad',           scores: { contabilidad: 3 } },
      { texto: 'Recursos Humanos',                  scores: { rrhh: 3 } },
      { texto: 'Liderazgo y gestión de equipos',    scores: { liderazgo: 3 } },
      { texto: 'Ventas o atención al cliente',      scores: { ventas: 3 } },
      { texto: 'Administración general',            scores: { admin: 3 } },
    ],
  },
  {
    texto: '¿Cuánto tiempo puedes dedicar a estudiar?',
    opciones: [
      { texto: 'Solo fines de semana',          scores: { admin: 1, contabilidad: 1 } },
      { texto: 'Algunas tardes entre semana',   scores: { datos: 1, rrhh: 1, ventas: 1 } },
      { texto: 'Tengo horario flexible',        scores: { liderazgo: 1, datos: 1 } },
    ],
  },
]

const resultados: Record<RutaKey, {
  emoji:     string
  nombre:    string
  razon:     string
  cargo:     string
  duracion:  string
  waMsg:     string
}> = {
  datos: {
    emoji:    '📊',
    nombre:   'Analista de Datos',
    razon:    'Tus respuestas indican que buscas crecer con herramientas tecnológicas de alto impacto. Los datos son el recurso más valioso del mercado laboral actual.',
    cargo:    'Analista de Datos Jr. · BI Analyst',
    duracion: '~5 meses',
    waMsg:    'Hola, hice el diagnóstico en el sitio y me recomendaron la ruta de Analista de Datos. ¿Me pueden dar más información?',
  },
  rrhh: {
    emoji:    '👥',
    nombre:   'Recursos Humanos',
    razon:    'Tu perfil apunta hacia la gestión de personas. La ruta de RH te da las herramientas para crecer o consolidarte en una de las áreas más estratégicas de cualquier empresa.',
    cargo:    'Coordinador de RRHH · Especialista en Nóminas',
    duracion: '~4 meses',
    waMsg:    'Hola, hice el diagnóstico en el sitio y me recomendaron la ruta de Recursos Humanos. ¿Me pueden dar más información?',
  },
  contabilidad: {
    emoji:    '📋',
    nombre:   'Contabilidad y Fiscal',
    razon:    'Tus respuestas muestran interés en finanzas o contabilidad. Esta ruta te da dominio real del ámbito fiscal mexicano, valorado en empresas de todos los tamaños.',
    cargo:    'Auxiliar Contable · Contador Fiscal',
    duracion: '~4 meses',
    waMsg:    'Hola, hice el diagnóstico en el sitio y me recomendaron la ruta de Contabilidad y Fiscal. ¿Me pueden dar más información?',
  },
  liderazgo: {
    emoji:    '🎯',
    nombre:   'Liderazgo y Supervisión',
    razon:    'Tu objetivo de ascender y tu perfil de gestión apuntan directamente a esta ruta. Las habilidades de liderazgo son las más difíciles de encontrar — y las mejor remuneradas.',
    cargo:    'Supervisor · Coordinador · Gerente',
    duracion: '~2 meses',
    waMsg:    'Hola, hice el diagnóstico en el sitio y me recomendaron la ruta de Liderazgo y Supervisión. ¿Me pueden dar más información?',
  },
  ventas: {
    emoji:    '🤝',
    nombre:   'Ventas y Atención al Cliente',
    razon:    'Tus respuestas apuntan al mundo comercial. Esta ruta te da metodología real para vender más, fidelizar clientes y construir relaciones que generan ingresos recurrentes.',
    cargo:    'Asesor Comercial · Ejecutivo de Ventas · Gerente de Atención al Cliente',
    duracion: '~2 meses',
    waMsg:    'Hola, hice el diagnóstico en el sitio y me recomendaron la ruta de Ventas y Atención al Cliente. ¿Me pueden dar más información?',
  },
  admin: {
    emoji:    '💼',
    nombre:   'Empleo Administrativo',
    razon:    'Esta ruta está diseñada para darte las habilidades digitales esenciales que cualquier empresa busca hoy. Es el punto de entrada más directo al mercado laboral formal.',
    cargo:    'Asistente Administrativo · Auxiliar de Oficina',
    duracion: '~2 meses',
    waMsg:    'Hola, hice el diagnóstico en el sitio y me recomendaron la ruta de Empleo Administrativo. ¿Me pueden dar más información?',
  },
}

function calcularRuta(respuestas: Opcion[]): RutaKey {
  const score: Record<RutaKey, number> = {
    datos: 0, rrhh: 0, contabilidad: 0, liderazgo: 0, ventas: 0, admin: 0,
  }
  for (const op of respuestas) {
    for (const [ruta, pts] of Object.entries(op.scores) as [RutaKey, number][]) {
      score[ruta] += pts
    }
  }
  return (Object.entries(score) as [RutaKey, number][])
    .sort((a, b) => b[1] - a[1])[0][0]
}

export default function DiagnosticoRuta() {
  const [step, setStep]         = useState<Step>(0)
  const [respuestas, setResp]   = useState<Opcion[]>([])
  const [resultado, setResult]  = useState<RutaKey | null>(null)

  const preguntaActual = step !== 'result' ? preguntas[step as number] : null
  const totalSteps     = preguntas.length

  const handleOpcion = (opcion: Opcion) => {
    const nuevas = [...respuestas, opcion]
    setResp(nuevas)

    const siguientePaso = (step as number) + 1
    if (siguientePaso >= totalSteps) {
      setResult(calcularRuta(nuevas))
      setStep('result')
    } else {
      setStep(siguientePaso as Step)
    }
  }

  const reiniciar = () => {
    setStep(0)
    setResp([])
    setResult(null)
  }

  const res = resultado ? resultados[resultado] : null

  return (
    <section
      id="diagnostico"
      className="py-16 md:py-20 bg-primary-dark"
      aria-labelledby="diagnostico-heading"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            <Sparkles size={12} aria-hidden="true" />
            Diagnóstico gratuito
          </div>
          <h2
            id="diagnostico-heading"
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            ¿No sabes por dónde empezar?
          </h2>
          <p className="text-white/60 text-base">
            Responde 3 preguntas y te decimos cuál ruta es la ideal para ti.
          </p>
        </div>

        {/* Barra de progreso */}
        {step !== 'result' && (
          <div className="flex gap-2 mb-8" aria-label="Progreso del diagnóstico" role="progressbar"
               aria-valuenow={(step as number) + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
            {preguntas.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= (step as number) ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/20">

          {/* Pregunta activa */}
          {step !== 'result' && preguntaActual && (
            <div className="p-6 md:p-8">
              <p className="text-xs font-bold text-primary/50 uppercase tracking-widest mb-2">
                Pregunta {(step as number) + 1} de {totalSteps}
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {preguntaActual.texto}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {preguntaActual.opciones.map((op) => (
                  <button
                    key={op.texto}
                    onClick={() => handleOpcion(op)}
                    className="text-left px-4 py-3.5 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/[0.04] font-medium text-gray-700 hover:text-primary text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]"
                  >
                    {op.texto}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resultado */}
          {step === 'result' && res && (
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3" aria-hidden="true">{res.emoji}</div>
                <p className="text-xs font-bold text-primary/50 uppercase tracking-widest mb-1">
                  Tu ruta recomendada
                </p>
                <h3 className="text-2xl font-bold text-primary mb-1">
                  {res.nombre}
                </h3>
                <p className="text-sm text-gray-500">
                  Duración estimada: <strong className="text-gray-700">{res.duracion}</strong>
                </p>
              </div>

              <div className="bg-primary/[0.05] border-l-4 border-primary rounded-r-xl px-5 py-4 mb-6">
                <p className="text-gray-700 text-sm leading-relaxed">{res.razon}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-base" aria-hidden="true">🎯</span>
                <span>
                  Puestos relacionados:{' '}
                  <strong className="text-gray-800">{res.cargo}</strong>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={waLink(res.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-wa text-white font-bold px-5 py-3.5 rounded-xl hover:bg-wa-dark active:scale-95 transition-all text-sm shadow-lg shadow-wa/20"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Quiero información sobre esta ruta
                </a>
                <a
                  href="#rutas"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary/20 text-primary font-semibold px-5 py-3.5 rounded-xl hover:border-primary hover:bg-primary/5 text-sm transition-all"
                >
                  Ver la ruta completa
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>

              <div className="text-center mt-5">
                <button
                  onClick={reiniciar}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <RotateCcw size={12} aria-hidden="true" />
                  Volver a hacer el diagnóstico
                </button>
              </div>
            </div>
          )}

        </div>

        <p className="text-center text-white/30 text-xs mt-5">
          Este diagnóstico es orientativo. Un asesor FINDES puede ayudarte a confirmar tu elección.
        </p>

      </div>
    </section>
  )
}
