'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { CheckCircle, MessageCircle, Clock, TrendingUp, ChevronDown, Sparkles, ArrowRight } from 'lucide-react'
import { waLink } from '@/lib/constants'
import { slugPorNombre } from '@/lib/cursos'

interface Ruta {
  id:          string
  emoji:       string
  nombre:      string
  perfil:      string
  duracion:    string
  resultado:   string
  cargoMeta:   string
  salario:     string
  badge:       { texto: string; color: string }
  cursos:      string[]
  modalidades: string[]
}

const rutas: Ruta[] = [
  {
    id:        'datos',
    emoji:     '📊',
    nombre:    'Analista de Datos',
    perfil:    'Para quienes trabajan con reportes o quieren entrar al mundo de los datos',
    duracion:  '~5 meses',
    resultado: 'Accede a puestos de análisis y datos — una de las áreas con mayor demanda y mejor remuneración del mercado laboral mexicano.',
    cargoMeta: 'Analista de Datos Jr. · BI Analyst',
    salario:   '$18,000 – $35,000/mes',
    badge:     { texto: '🔥 Alta demanda', color: 'bg-orange-100 text-orange-700' },
    cursos:    ['Excel Básico', 'Excel Intermedio', 'Excel Avanzado', 'Power BI', 'IA aplicada al análisis de datos', 'Python para Análisis de Datos'],
    modalidades: ['Presencial', 'Online en Vivo'],
  },
  {
    id:        'rrhh',
    emoji:     '👥',
    nombre:    'Recursos Humanos',
    perfil:    'Para quienes gestionan personal o quieren trabajar en áreas de RH',
    duracion:  '~4 meses',
    resultado: 'Consolida tu carrera en RH o da el salto a un puesto de mayor responsabilidad en la gestión de personas.',
    cargoMeta: 'Coordinador de RRHH · Especialista en Nóminas',
    salario:   '$14,000 – $28,000/mes',
    badge:     { texto: '⭐ Más popular', color: 'bg-yellow-100 text-yellow-700' },
    cursos:    ['Reclutamiento y Selección', 'Nóminas y IMSS', 'Desarrollo Organizacional', 'Liderazgo', 'NOM-035', 'Administración de Personal'],
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
  },
  {
    id:        'contabilidad',
    emoji:     '📋',
    nombre:    'Contabilidad y Fiscal',
    perfil:    'Para contadores, auxiliares y dueños de negocio',
    duracion:  '~4 meses',
    resultado: 'Aumenta tu valor en cualquier empresa, fortalece tu negocio propio y cumple tus obligaciones fiscales con seguridad.',
    cargoMeta: 'Auxiliar Contable · Contador Fiscal',
    salario:   '$13,000 – $25,000/mes',
    badge:     { texto: '📈 Muy estable', color: 'bg-blue-100 text-blue-700' },
    cursos:    ['Contabilidad para No Contadores', 'CFDI', 'Impuestos', 'Reformas Fiscales', 'Finanzas Empresariales'],
    modalidades: ['Presencial', 'Online en Vivo'],
  },
  {
    id:        'liderazgo',
    emoji:     '🎯',
    nombre:    'Liderazgo y Supervisión',
    perfil:    'Para quienes coordinan equipos o aspiran a puestos de mayor responsabilidad',
    duracion:  '~2 meses',
    resultado: 'Da el paso a coordinador, supervisor o gerente — con las herramientas que los líderes efectivos necesitan para crecer.',
    cargoMeta: 'Supervisor · Coordinador · Gerente',
    salario:   '$20,000 – $45,000/mes',
    badge:     { texto: '🚀 Alta proyección', color: 'bg-purple-100 text-purple-700' },
    cursos:    ['Comunicación Efectiva', 'Liderazgo', 'Supervisión Efectiva', 'Manejo de Conflictos', 'Trabajo en Equipo'],
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
  },
  {
    id:        'ventas',
    emoji:     '🤝',
    nombre:    'Ventas y Atención al Cliente',
    perfil:    'Para quienes trabajan en ventas o servicio al cliente y quieren mejorar sus resultados',
    duracion:  '~2 meses',
    resultado: 'Vende más con metodología, fideliza clientes y construye relaciones comerciales que generan ingresos recurrentes.',
    cargoMeta: 'Asesor Comercial · Ejecutivo de Ventas · Gerente de Atención al Cliente',
    salario:   '$12,000 – $30,000/mes + comisiones',
    badge:     { texto: '💼 Alta demanda', color: 'bg-teal-100 text-teal-700' },
    cursos:    ['Atención al Cliente', 'Ventas y Negociación'],
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
  },
  {
    id:        'admin',
    emoji:     '💼',
    nombre:    'Conseguir un Empleo Administrativo',
    perfil:    'Para quienes buscan su primer empleo o quieren actualizar su perfil profesional',
    duracion:  '~2 meses',
    resultado: 'Entra o regresa al mercado laboral con el perfil digital que cualquier empresa requiere contratar hoy.',
    cargoMeta: 'Asistente Administrativo · Recepcionista · Aux. de Oficina',
    salario:   '$9,000 – $16,000/mes',
    badge:     { texto: '✅ Ideal para empezar', color: 'bg-green-100 text-green-700' },
    cursos:    ['Excel', 'Outlook', 'Word', 'Gestión del Tiempo', 'Organización Administrativa', 'Herramientas Digitales'],
    modalidades: ['Presencial', 'Online en Vivo'],
  },
]

const modalidadChip: Record<string, string> = {
  'Presencial':     'bg-blue-100 text-blue-700',
  'Online en Vivo': 'bg-green-100 text-green-700',
  'In Company':     'bg-orange-100 text-orange-700',
}

export default function RutasAprendizaje() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleSelect = (id: string) => {
    const next = activeId === id ? null : id
    setActiveId(next)
    if (next) {
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 80)
    }
  }

  const active = rutas.find((r) => r.id === activeId) ?? null

  return (
    <section id="rutas" className="py-16 md:py-24 bg-white" aria-labelledby="rutas-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <h2 id="rutas-heading" className="text-3xl md:text-4xl font-bold text-primary mb-4">
            ¿Qué quieres lograr profesionalmente?
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Elige tu objetivo. Te mostramos el camino más directo para lograrlo.
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Rutas de aprendizaje disponibles"
        >
          {rutas.map((ruta) => {
            const isActive = activeId === ruta.id
            return (
              <article
                key={ruta.id}
                role="listitem"
                className={`flex flex-col rounded-2xl border-2 transition-all duration-200 overflow-hidden relative
                  ${isActive
                    ? 'border-primary shadow-xl shadow-primary/10 bg-primary/[0.03]'
                    : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-lg hover:shadow-gray-200/60'
                  }`}
              >
                {/* Badge de demanda */}
                <div className="absolute top-4 right-4">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${ruta.badge.color}`}>
                    {ruta.badge.texto}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-7 gap-5">
                  <span className="text-5xl leading-none select-none" aria-hidden="true">
                    {ruta.emoji}
                  </span>

                  <div>
                    <h3 className={`font-bold text-xl leading-snug mb-1.5 ${isActive ? 'text-primary' : 'text-gray-900'}`}>
                      {ruta.nombre}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-2">
                      {ruta.perfil}
                    </p>
                    <p className="text-xs text-gray-400">
                      Mercado laboral MX:{' '}
                      <span className="font-semibold text-primary/80">{ruta.salario} aprox.*</span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock size={13} className="flex-shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="text-gray-500 font-semibold">{ruta.cursos.length} cursos</strong>
                      </span>
                    </div>

                    <div className="bg-primary/[0.05] border-l-2 border-primary rounded-r-lg px-3.5 py-3">
                      <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-1">
                        Puedes trabajar como
                      </p>
                      <p className="text-sm text-gray-700 font-semibold leading-snug">
                        {ruta.cargoMeta}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botón CTA */}
                <button
                  onClick={() => handleSelect(ruta.id)}
                  aria-expanded={isActive}
                  aria-controls={`panel-${ruta.id}`}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light
                    ${isActive
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 text-primary border-t border-gray-200 hover:bg-primary hover:text-white'
                    }`}
                >
                  {isActive ? (
                    <><ChevronDown size={16} aria-hidden="true" /> Ver menos</>
                  ) : (
                    <>Ver ruta completa <ChevronDown size={16} aria-hidden="true" className="-rotate-90" /></>
                  )}
                </button>
              </article>
            )
          })}
        </div>

        {/* ── Panel de detalle ── */}
        {active && (
          <div
            id={`panel-${active.id}`}
            ref={panelRef}
            role="region"
            aria-label={`Detalle de la ruta: ${active.nombre}`}
            className="mt-6 border-2 border-primary/20 bg-white rounded-2xl overflow-hidden animate-fadeIn"
          >
            {/* Panel header */}
            <div className="bg-primary/[0.04] border-b border-primary/10 px-6 md:px-8 py-5 flex flex-wrap items-center gap-3">
              <span className="text-4xl" aria-hidden="true">{active.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-0.5">
                  Al completar esta ruta podrías trabajar como
                </p>
                <h3 className="font-bold text-xl text-primary leading-tight">{active.cargoMeta}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{active.perfil}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {active.modalidades.map((m) => (
                  <span key={m} className={`text-xs font-semibold px-3 py-1 rounded-full ${modalidadChip[m]}`}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Resultado de carrera */}
            <div className="px-6 md:px-8 pt-6 pb-4">
              <div className="flex items-start gap-3 bg-primary/[0.05] border-l-4 border-primary rounded-r-xl px-5 py-4">
                <TrendingUp size={20} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-1.5">
                    Por qué vale la pena esta ruta
                  </p>
                  <p className="text-gray-800 font-semibold leading-relaxed text-base">
                    {active.resultado}
                  </p>
                  <p className="text-primary/70 text-xs mt-2">
                    * Referencia de mercado laboral MX: {active.salario} aprox. Los resultados individuales pueden variar.
                  </p>
                </div>
              </div>
            </div>

            {/* Cursos + CTA */}
            <div className="px-6 md:px-8 pb-6 flex flex-col md:flex-row gap-8 md:gap-12">

              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Cursos de esta ruta
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {active.cursos.map((curso) => {
                    const slug = slugPorNombre[curso]
                    return (
                      <li key={curso} className="flex items-center gap-2.5">
                        <CheckCircle size={15} className="text-wa flex-shrink-0" aria-hidden="true" />
                        {slug ? (
                          <Link
                            href={`/cursos/${slug}`}
                            className="text-gray-700 text-sm font-medium hover:text-primary hover:underline underline-offset-2 transition-colors inline-flex items-center gap-1"
                          >
                            {curso}
                            <ArrowRight size={11} className="opacity-50" aria-hidden="true" />
                          </Link>
                        ) : (
                          <span className="text-gray-700 text-sm font-medium">{curso}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="md:w-56 flex flex-col gap-3 justify-center">
                <a
                  href={waLink(
                    `Hola, me interesa la ruta de ${active.nombre}. ¿Me pueden dar información sobre los cursos disponibles y próximas fechas?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-wa text-white font-bold px-5 py-3 rounded-xl hover:bg-wa-dark active:scale-95 transition-all text-sm shadow-md shadow-wa/20"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Quiero información
                </a>
                <p className="text-xs text-gray-400 text-center">
                  Respondemos en minutos por WhatsApp
                </p>
              </div>

            </div>
          </div>
        )}

        {/* CTA inferior — enlaza al diagnóstico */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm mb-3">
            ¿No estás seguro cuál ruta es para ti?
          </p>
          <a
            href="#diagnostico"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm border border-primary/30 hover:border-primary hover:bg-primary/5 px-5 py-2.5 rounded-xl transition-all"
          >
            <Sparkles size={15} aria-hidden="true" />
            Encuentra tu ruta ideal en 3 preguntas →
          </a>
        </div>

      </div>
    </section>
  )
}
