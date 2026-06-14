import Link from 'next/link'
import { Clock, MessageCircle, ArrowRight, CalendarDays } from 'lucide-react'
import { waLink } from '@/lib/constants'
import { slugPorNombre } from '@/lib/cursos'

// ── Para actualizar: cambia nombre, modalidad y duracion. Sin fechas fijas.
interface CursoDestacado {
  nombre:    string
  modalidad: string
  duracion:  string
  areas:     string   // breve descripción del enfoque
}

const cursos: CursoDestacado[] = [
  {
    nombre:    'Excel Avanzado',
    modalidad: 'Presencial',
    duracion:  '24 horas',
    areas:     'Power Query · Macros · Dashboards ejecutivos',
  },
  {
    nombre:    'Power BI',
    modalidad: 'Online en Vivo',
    duracion:  '20 horas',
    areas:     'Dashboards · DAX · Power BI Service',
  },
  {
    nombre:    'Nóminas y IMSS',
    modalidad: 'Presencial',
    duracion:  '30 horas',
    areas:     'Cálculo de nómina · IMSS · CFDI · ISR',
  },
]

const chipStyle: Record<string, string> = {
  'Presencial':     'bg-blue-100 text-blue-700',
  'Online en Vivo': 'bg-green-100 text-green-700',
  'In Company':     'bg-orange-100 text-orange-700',
}

export default function ProximosCursos() {
  return (
    <section id="proximos-cursos" className="py-16 md:py-24 bg-white" aria-labelledby="proximos-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 id="proximos-heading" className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Cursos con grupos abriendo pronto
          </h2>
          <p className="text-gray-500 text-lg">
            Escríbenos para conocer la fecha exacta del próximo grupo y asegurar tu lugar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso) => {
            const slug = slugPorNombre[curso.nombre]
            return (
              <article
                key={curso.nombre}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  {slug ? (
                    <Link
                      href={`/cursos/${slug}`}
                      className="font-bold text-lg text-primary leading-snug hover:text-primary/80 transition-colors"
                    >
                      {curso.nombre}
                    </Link>
                  ) : (
                    <h3 className="font-bold text-lg text-primary leading-snug">{curso.nombre}</h3>
                  )}
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${chipStyle[curso.modalidad]}`}>
                    {curso.modalidad}
                  </span>
                </div>

                <div className="space-y-1.5 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <span>{curso.duracion}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CalendarDays size={14} className="flex-shrink-0 text-gray-400 mt-0.5" aria-hidden="true" />
                    <span className="text-xs text-gray-400 leading-relaxed">{curso.areas}</span>
                  </div>
                </div>

                {/* Indicador de disponibilidad */}
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3.5 py-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" aria-hidden="true" />
                  <p className="text-xs font-semibold text-amber-700">
                    Próximo grupo · Consultar fecha de inicio
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href={waLink(`Hola, me interesa el curso de ${curso.nombre}. ¿Cuándo abre el próximo grupo?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-dark active:scale-95 transition-all text-sm"
                  >
                    <MessageCircle size={15} aria-hidden="true" />
                    Consultar próxima fecha
                  </a>
                  {slug && (
                    <Link
                      href={`/cursos/${slug}`}
                      className="inline-flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors py-1"
                    >
                      Ver temario completo
                      <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
