import { GraduationCap, Video, Users, Award, UserPlus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Item {
  Icon:  LucideIcon
  color: string
  titulo: string
  desc:   string
}

const items: Item[] = [
  {
    Icon:   GraduationCap,
    color:  'bg-blue-50 text-blue-600',
    titulo: 'Instructores en activo',
    desc:   'Profesionistas que ejercen la materia en el mercado laboral, no solo la enseñan.',
  },
  {
    Icon:   Video,
    color:  'bg-purple-50 text-purple-600',
    titulo: 'Clases en vivo',
    desc:   'Tus preguntas se responden en el momento. No en un foro, no en un ticket.',
  },
  {
    Icon:   Users,
    color:  'bg-green-50 text-green-600',
    titulo: 'Grupos reducidos',
    desc:   'Atención personalizada que se pierde en los grupos masivos.',
  },
  {
    Icon:   Award,
    color:  'bg-orange-50 text-orange-600',
    titulo: 'Constancia de participación',
    desc:   'Reconocida por empresas empleadoras en México.',
  },
  {
    Icon:   UserPlus,
    color:  'bg-teal-50 text-teal-600',
    titulo: 'Networking profesional',
    desc:   'Compañeros de industria. Conexiones reales del mercado laboral.',
  },
]

export default function PorQueFindes() {
  return (
    <section id="por-que" className="py-16 md:py-24 bg-gray-50" aria-labelledby="porqueFindes-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 id="porqueFindes-heading" className="text-3xl md:text-4xl font-bold text-primary mb-3">
            No es un curso grabado. Es capacitación real.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Lo que hace diferente a FINDES es la experiencia de aprendizaje en vivo con instructores expertos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ Icon, color, titulo, desc }) => (
            <article
              key={titulo}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">{titulo}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
