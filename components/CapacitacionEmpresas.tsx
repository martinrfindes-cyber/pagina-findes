import { Building2, FileText, MapPin, BarChart3, Users, Globe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ADDRESS, YEARS } from '@/lib/constants'
import ChatButton from '@/components/ChatButton'

interface Beneficio {
  Icon:   LucideIcon
  titulo: string
  desc:   string
}

const beneficios: Beneficio[] = [
  {
    Icon:   FileText,
    titulo: 'Programa diseñado a la medida',
    desc:   'Adaptamos el temario, duración y profundidad a las necesidades reales de tu empresa y tu equipo.',
  },
  {
    Icon:   Building2,
    titulo: 'En tus instalaciones o en línea',
    desc:   'Impartimos la capacitación donde lo necesites: en tu empresa, en nuestras aulas o en modalidad online en vivo.',
  },
  {
    Icon:   Globe,
    titulo: 'Cobertura nacional',
    desc:   'Llegamos a cualquier ciudad del país. Empresas en toda la República han confiado en FINDES.',
  },
  {
    Icon:   BarChart3,
    titulo: 'Métricas y resultados medibles',
    desc:   'Establecemos objetivos, indicadores y métricas para que puedas demostrar el ROI de la capacitación.',
  },
  {
    Icon:   Users,
    titulo: 'Grupos privados y exclusivos',
    desc:   'Tu equipo capacitado en un grupo privado, con dinámica enfocada a los procesos de tu organización.',
  },
  {
    Icon:   MapPin,
    titulo: 'Factura empresarial',
    desc:   'Emitimos factura para personas morales. Proceso administrativo simple y soporte dedicado.',
  },
]

export default function CapacitacionEmpresas() {
  return (
    <section
      id="empresas"
      className="relative py-16 md:py-24 bg-primary-dark overflow-hidden"
      aria-labelledby="empresas-heading"
    >
      {/* ── Imagen de fondo — TODO: REEMPLAZAR con foto real de sesión empresarial FINDES ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=75"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        loading="lazy"
      />
      {/* Gradiente sobre la imagen para mantener legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 to-primary-dark/95" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Capacitación Empresarial · In Company
          </span>
          <h2
            id="empresas-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
          >
            ¿Necesitas capacitar a tu equipo?
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Diseñamos programas de capacitación a la medida de tu empresa.
            Con <strong className="text-white">{YEARS} años</strong> de experiencia formando profesionistas,
            llevamos nuestros cursos directamente a tu organización.
          </p>
        </div>

        {/* ── Beneficios grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {beneficios.map(({ Icon, titulo, desc }) => (
            <div
              key={titulo}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <Icon size={19} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-white text-base mb-1.5">{titulo}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── CTA + señales de confianza ── */}
        <div className="flex flex-col items-center gap-5">
          <ChatButton
            className="inline-flex items-center gap-2.5 bg-wa text-white font-bold px-8 py-4 rounded-2xl hover:bg-wa-dark active:scale-95 transition-all text-base shadow-xl shadow-wa/20"
            iconSize={20}
            attributes={{ ruta_interes: 'Capacitación empresas', origen: 'empresas' }}
          >
            Cotizar capacitación para mi equipo
          </ChatButton>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/40 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="text-white/60 font-semibold text-sm">+500</span>
              empresas atendidas
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-white/60 font-semibold text-sm">{YEARS} años</span>
              de experiencia
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} aria-hidden="true" className="text-white/40" />
              {ADDRESS}
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
