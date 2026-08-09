import Link from 'next/link'
import { MapPin, Projector, Wind, Wifi, ArrowRight } from 'lucide-react'
import { ADDRESS } from '@/lib/constants'
import { aulas } from '@/lib/aulas'

const destacados = [
  { Icon: Projector, texto: 'Proyector y pizarrón' },
  { Icon: Wind,      texto: 'Aire acondicionado' },
  { Icon: Wifi,      texto: 'Wi-Fi y coffee break' },
]

export default function RentaAulas() {
  return (
    <section
      id="renta-aulas"
      className="py-16 md:py-24 bg-white"
      aria-labelledby="renta-aulas-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Foto real del aula ── */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-xl shadow-primary/10 order-1 md:order-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/instalaciones/aula-ejecutiva.jpg"
              alt="Aula de FINDES disponible para renta, con mesas de trabajo, pizarrón y proyector"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {aulas.length} aulas disponibles
            </span>
          </div>

          {/* ── Texto ── */}
          <div>
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Renta de aulas
            </span>

            <h2
              id="renta-aulas-heading"
              className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight"
            >
              ¿Necesitas un aula para impartir tu curso?
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Rentamos nuestras aulas equipadas en Paseo de la Reforma a empresas,
              instructores e instituciones que necesitan una sede profesional para
              capacitar. Tú pones el curso, nosotros el espacio listo para usarse.
            </p>

            <ul className="space-y-2.5 mb-7">
              {destacados.map(({ Icon, texto }) => (
                <li key={texto} className="flex items-center gap-3 text-gray-600 text-sm">
                  <span className="w-8 h-8 rounded-lg bg-primary/[0.07] flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-primary" aria-hidden="true" />
                  </span>
                  {texto}
                </li>
              ))}
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <span className="w-8 h-8 rounded-lg bg-primary/[0.07] flex items-center justify-center flex-shrink-0">
                  <MapPin size={15} className="text-primary" aria-hidden="true" />
                </span>
                {ADDRESS}
              </li>
            </ul>

            <Link
              href="/renta-de-aulas"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-primary-dark active:scale-95 transition-all text-base shadow-lg shadow-primary/20 group"
            >
              Ver aulas y cotizar
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
