import { ArrowRight, MessageCircle, MapPin } from 'lucide-react'
import { waLink, WA_DEFAULT_MSG, YEARS, ADDRESS } from '@/lib/constants'

const features = [
  { emoji: '🎓', title: 'Instructores en activo',      desc: 'Profesionistas que ejercen la materia hoy' },
  { emoji: '💻', title: 'Clases en vivo',              desc: 'Preguntas respondidas en el momento' },
  { emoji: '👥', title: 'Grupos reducidos',            desc: 'Atención personalizada, no masificación' },
  { emoji: '📜', title: 'Constancia de participación', desc: 'Reconocida por empresas empleadoras' },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light flex items-center overflow-hidden"
      aria-label="Sección principal"
    >
      {/* Decorative blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-0 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-light/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36 md:py-32 md:pt-44 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── Columna de texto ── */}
          <div>

            {/* Chips de credibilidad */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">
                {YEARS} años de experiencia
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">
                Presencial & Online en Vivo
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">
                <MapPin size={11} aria-hidden="true" />
                Reforma · CDMX
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] mb-8">
              Desarrolla las habilidades que el mercado profesional exige.
            </h1>

            {/* Tagline institucional — protagonista */}
            <figure className="mb-9">
              <blockquote className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 pt-7 pb-5">
                {/* Comilla decorativa */}
                <span
                  aria-hidden="true"
                  className="absolute -top-4 left-5 text-6xl text-white/30 font-serif leading-none select-none"
                >
                  "
                </span>
                <p className="text-xl md:text-2xl text-white font-semibold leading-snug">
                  Cuando terminas un curso en FINDES ya no eres la misma persona.
                </p>
              </blockquote>
              <figcaption className="mt-3 pl-6 text-xs text-white/45 tracking-wide">
                Filosofía institucional · FINDES desde 1991
              </figcaption>
            </figure>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#rutas"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 active:scale-95 transition-all text-base shadow-lg shadow-black/10"
              >
                Encuentra tu ruta
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href={waLink(WA_DEFAULT_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-wa text-white font-bold px-6 py-3.5 rounded-xl hover:bg-wa-dark active:scale-95 transition-all text-base shadow-lg shadow-wa/30"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Hablar por WhatsApp
              </a>
            </div>
          </div>

          {/* ── Columna visual — foto + feature cards (desktop) ── */}
          <div className="hidden md:block relative" aria-hidden="true">
            <div className="relative rounded-2xl overflow-hidden h-[480px] shadow-2xl shadow-black/30">

              {/* TODO: REEMPLAZAR con foto real de aula FINDES — Reforma 403, CDMX */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80"
                alt="Sesión de capacitación — imagen ilustrativa"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />

              {/* Gradiente de abajo hacia arriba */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/30 to-transparent" />

              {/* Feature cards en la zona inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                {features.map(({ emoji, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3"
                  >
                    <span className="text-xl leading-none">{emoji}</span>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">{title}</p>
                      <p className="text-white/65 text-xs">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-white/30 text-[10px] mt-2 tracking-wide">
              Imagen ilustrativa
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
