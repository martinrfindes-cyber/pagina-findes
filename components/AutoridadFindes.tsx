import { GraduationCap, Monitor, Users, Award, MapPin } from 'lucide-react'
import { YEARS, ADDRESS } from '@/lib/constants'

const stats = [
  { value: `${YEARS} años`, label: 'de trayectoria institucional' },
  { value: '+12,000',       label: 'alumnos capacitados al año' },
  { value: '+500',          label: 'empresas que nos han confiado su capacitación' },
]

const features = [
  { Icon: GraduationCap, label: 'Instructores en activo' },
  { Icon: Monitor,       label: 'Presencial y Online en Vivo' },
  { Icon: Users,         label: 'Grupos reducidos' },
  { Icon: Award,         label: 'Constancia de participación' },
]

export default function AutoridadFindes() {
  return (
    <section
      className="py-16 md:py-20 bg-white border-y border-gray-100"
      aria-labelledby="autoridad-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Layout 2 columnas en desktop ── */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">

          {/* Columna texto */}
          <div>
            <p className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-3">
              Desde 1991 · Ciudad de México
            </p>
            <h2
              id="autoridad-heading"
              className="text-3xl md:text-4xl font-bold text-primary mb-3"
            >
              {YEARS} años formando profesionales en México
            </h2>
            <p className="text-gray-400 text-base mb-8 leading-relaxed">
              Una institución con experiencia real en el mercado laboral mexicano,
              con presencia en Paseo de la Reforma y alcance a toda la República.
            </p>

            {/* Stats — apilados en la columna */}
            <div className="space-y-4">
              {stats.map(({ value, label }) => (
                <div key={value} className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary whitespace-nowrap">
                    {value}
                  </span>
                  <span className="text-sm text-gray-400 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Ubicación */}
            <div className="mt-6 flex items-center gap-1.5 text-xs text-gray-400">
              <MapPin size={12} aria-hidden="true" />
              <span>{ADDRESS}</span>
            </div>
          </div>

          {/* Columna imagen — TODO: REEMPLAZAR con foto real de instructor o aula FINDES */}
          <div>
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80"
                alt="Capacitación en FINDES — imagen ilustrativa"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay suave */}
              <div className="absolute inset-0 bg-primary/20" />
              {/* Badge fundación */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3">
                <p className="text-primary font-bold text-sm">Fundada en 1991</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Más de tres décadas formando el talento que las empresas mexicanas necesitan.
                </p>
              </div>
            </div>
            <p className="text-center text-gray-400 text-[10px] mt-2 tracking-wide">
              Imagen ilustrativa
            </p>
          </div>
        </div>

        {/* ── Features — 4 chips en fila ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-primary/[0.04] border border-primary/10 rounded-xl px-4 py-3.5"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-primary" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-primary/80 leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
