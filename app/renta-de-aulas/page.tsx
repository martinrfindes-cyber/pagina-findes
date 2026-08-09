import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MapPin, CheckCircle, ArrowLeft, Users, Projector,
  Clock, Building2, ChevronDown, Phone, Mail,
} from 'lucide-react'
import { aulas, areas, incluye, casosDeUso } from '@/lib/aulas'
import { ADDRESS, PHONE, EMAIL, YEARS, SITE_URL } from '@/lib/constants'
import ChatButton from '@/components/ChatButton'
import GaleriaInstalaciones from '@/components/GaleriaInstalaciones'

// ─── SEO ──────────────────────────────────────────────────────────────────────
const TITLE = 'Renta de Aulas y Salones para Cursos en CDMX'
const DESCRIPTION =
  'Renta aulas equipadas en Paseo de la Reforma, CDMX: proyector, pizarrón, aire acondicionado, Wi-Fi y área para coffee break. Ideal para cursos, capacitaciones, exámenes y juntas.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/renta-de-aulas' },
  openGraph: {
    title: `${TITLE} | FINDES`,
    description: DESCRIPTION,
    type: 'website',
    locale: 'es_MX',
    url: `${SITE_URL}/renta-de-aulas`,
  },
}

const faq = [
  {
    pregunta: '¿Cuánto cuesta rentar un aula?',
    respuesta:
      'El costo depende del aula, del número de horas y de si necesitas servicios adicionales. Escríbenos por chat con la fecha, el horario y cuántas personas serán, y te mandamos la cotización.',
  },
  {
    pregunta: '¿Se puede rentar por horas o solo por día completo?',
    respuesta:
      'Manejamos renta por horas, por día y por periodos largos para diplomados o programas de varias semanas. Entre más días, mejor la tarifa.',
  },
  {
    pregunta: '¿Se puede rentar fines de semana?',
    respuesta:
      'Sí, contamos con disponibilidad en sábado. Consúltanos la fecha que necesitas para confirmarte el horario disponible.',
  },
  {
    pregunta: '¿Incluye servicio de café o alimentos?',
    respuesta:
      'El aula incluye el área común para tu coffee break y servicio de agua. Si necesitas coffee break o comida para el grupo, lo podemos coordinar como servicio adicional.',
  },
  {
    pregunta: '¿Hay estacionamiento?',
    respuesta:
      'Estamos sobre Paseo de la Reforma, en la Col. Cuauhtémoc, con estacionamientos públicos cerca y muy buena conexión de transporte público. Consúltanos las opciones para tu grupo.',
  },
  {
    pregunta: '¿Emiten factura?',
    respuesta:
      'Sí. Facturamos a persona física o moral sin ningún trámite complicado. Solo necesitamos tus datos fiscales al confirmar la reserva.',
  },
]

const pasos = [
  { n: '1', titulo: 'Nos escribes',        desc: 'Dinos la fecha, el horario y cuántas personas serán.' },
  { n: '2', titulo: 'Te cotizamos',        desc: 'Te confirmamos disponibilidad y el costo, sin vueltas.' },
  { n: '3', titulo: 'Apartas tu fecha',    desc: 'Reservas el aula y emitimos tu factura.' },
  { n: '4', titulo: 'Llegas y das tu curso', desc: 'El aula te espera montada, limpia y equipada.' },
]

// Datos estructurados para Google
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Renta de aulas y salones para cursos — FINDES',
  serviceType: 'Renta de aulas y salones de capacitación',
  description: DESCRIPTION,
  areaServed: { '@type': 'City', name: 'Ciudad de México' },
  provider: {
    '@type': 'EducationalOrganization',
    name: 'FINDES',
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS,
      addressLocality: 'Ciudad de México',
      addressCountry: 'MX',
    },
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.pregunta,
    acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
  })),
}

// Fotos que alimentan la galería
const fotosGaleria = [
  ...aulas.map((a) => ({ src: a.foto, alt: a.alt, titulo: a.nombre })),
  ...areas.map((a) => ({ src: a.foto, alt: a.alt, titulo: a.titulo })),
]

const atributos = { origen: 'renta-aulas', servicio: 'Renta de aulas' }

export default function RentaDeAulasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Navbar simple ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Link href="/" className="font-extrabold text-2xl tracking-tight text-primary" aria-label="FINDES — Inicio">
            FINDES
          </Link>
          <ChatButton
            className="hidden sm:inline-flex items-center gap-2 bg-wa text-white font-bold px-5 py-2.5 rounded-xl hover:bg-wa-dark active:scale-95 transition-all text-sm shadow-md shadow-wa/20"
            iconSize={16}
            attributes={atributos}
          >
            Cotizar mi aula
          </ChatButton>
        </div>
      </header>

      <main className="bg-gray-50">

        {/* ── Hero ── */}
        <section className="relative bg-primary-dark overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/instalaciones/aula-magna.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/85 to-primary-dark/95" aria-hidden="true" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            {/* Breadcrumb */}
            <nav aria-label="Ruta de navegación" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/60 flex-wrap">
                <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li aria-hidden="true" className="text-white/30">›</li>
                <li className="text-white/90 font-medium">Renta de Aulas</li>
              </ol>
            </nav>

            <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              Renta de aulas · Paseo de la Reforma, CDMX
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5 max-w-3xl">
              Aulas equipadas para impartir tus cursos
            </h1>

            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-8">
              Rentamos las mismas aulas donde FINDES lleva {YEARS} años capacitando profesionistas.
              Proyector, pizarrón, aire acondicionado y mobiliario listos desde el primer minuto —
              tú solo llegas a dar tu clase.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <ChatButton
                className="inline-flex items-center justify-center gap-2.5 bg-wa text-white font-bold px-8 py-4 rounded-2xl hover:bg-wa-dark active:scale-95 transition-all text-base shadow-xl shadow-wa/20"
                iconSize={20}
                attributes={atributos}
              >
                Cotizar renta de aula
              </ChatButton>
              <a
                href="#aulas"
                className="inline-flex items-center justify-center gap-2 text-white/90 font-semibold border-2 border-white/30 px-7 py-3.5 rounded-2xl hover:bg-white/10 transition-colors text-base"
              >
                Ver las aulas
              </a>
            </div>

            <p className="text-white/40 text-xs mt-5 flex items-center gap-1.5">
              <MapPin size={12} aria-hidden="true" />
              {ADDRESS}
            </p>
          </div>
        </section>

        {/* ── Aulas ── */}
        <section id="aulas" className="py-16 md:py-20" aria-labelledby="aulas-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-11">
              <h2 id="aulas-heading" className="text-3xl md:text-4xl font-bold text-primary mb-3">
                Nuestras aulas
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Tres espacios con distinta capacidad y montaje. Elegimos contigo el que mejor
                le queda a tu grupo.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {aulas.map((aula) => (
                <article
                  key={aula.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col"
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={aula.foto}
                      alt={aula.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-primary text-lg mb-2">{aula.nombre}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                      {aula.descripcion}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 mb-4">
                      {aula.capacidad && (
                        <span className="flex items-center gap-1.5">
                          <Users size={13} className="text-primary" aria-hidden="true" />
                          {aula.capacidad}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Projector size={13} className="text-primary" aria-hidden="true" />
                        Montaje {aula.montaje.toLowerCase()}
                      </span>
                    </div>

                    <ul className="flex flex-wrap gap-1.5">
                      {aula.equipamiento.map((eq) => (
                        <li
                          key={eq}
                          className="bg-primary/[0.06] text-primary/80 text-[11px] font-medium px-2.5 py-1 rounded-full"
                        >
                          {eq}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Qué incluye ── */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="incluye-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div>
                <h2 id="incluye-heading" className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Todo incluido en la renta
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-7">
                  No hay letras chiquitas ni cargos sorpresa: el aula se entrega montada,
                  limpia y con el equipo funcionando.
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {incluye.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-wa flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-gray-700 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Áreas comunes con foto */}
              <div className="space-y-5">
                {areas.map((area) => (
                  <div
                    key={area.foto}
                    className="flex gap-4 items-center bg-gray-50 border border-gray-100 rounded-2xl p-4"
                  >
                    <div className="w-28 h-24 sm:w-36 sm:h-28 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={area.foto}
                        alt={area.alt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-base mb-1">{area.titulo}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{area.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Para quién es ── */}
        <section className="py-16 md:py-20 bg-gray-50" aria-labelledby="para-quien-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-11">
              <h2 id="para-quien-heading" className="text-3xl md:text-4xl font-bold text-primary mb-3">
                ¿Para quién es?
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Si necesitas un espacio profesional en CDMX por unas horas o por varias semanas,
                este servicio es para ti.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {casosDeUso.map((caso) => (
                <div
                  key={caso}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/[0.07] flex items-center justify-center flex-shrink-0">
                    <Building2 size={17} className="text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{caso}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Galería ── */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="galeria-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-11">
              <h2 id="galeria-heading" className="text-3xl md:text-4xl font-bold text-primary mb-3">
                Conoce las instalaciones
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Fotos reales de nuestras aulas y áreas comunes. Haz clic en cualquiera para ampliarla.
              </p>
            </div>

            <GaleriaInstalaciones fotos={fotosGaleria} />
          </div>
        </section>

        {/* ── Cómo funciona ── */}
        <section className="py-16 md:py-20 bg-gray-50" aria-labelledby="pasos-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-11">
              <h2 id="pasos-heading" className="text-3xl md:text-4xl font-bold text-primary mb-3">
                Cómo apartar tu aula
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Cuatro pasos y en el mismo día sabes si tu fecha está disponible.
              </p>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pasos.map((paso) => (
                <li key={paso.n} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <span className="w-9 h-9 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center mb-4">
                    {paso.n}
                  </span>
                  <h3 className="font-bold text-primary text-base mb-1.5">{paso.titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{paso.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="faq-renta-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-renta-heading" className="text-3xl md:text-4xl font-bold text-primary mb-9 text-center">
              Preguntas frecuentes
            </h2>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 divide-y divide-gray-200 overflow-hidden">
              {faq.map((item) => (
                <details key={item.pregunta} className="group p-6">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <span className="font-semibold text-gray-800 text-sm leading-snug">{item.pregunta}</span>
                    <ChevronDown
                      size={16}
                      className="text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="text-sm text-gray-600 leading-relaxed mt-4">{item.respuesta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="py-16 md:py-24 bg-primary-dark" aria-labelledby="cta-renta-heading">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="cta-renta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Dinos tu fecha y te confirmamos disponibilidad
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Cuéntanos cuántas personas serán, qué día y en qué horario.
              Te mandamos la cotización por chat.
            </p>

            <ChatButton
              className="inline-flex items-center gap-3 bg-wa text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-wa-dark active:scale-95 transition-all shadow-2xl shadow-wa/30"
              iconSize={22}
              attributes={atributos}
            >
              Cotizar renta de aula
            </ChatButton>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/40">
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone size={14} aria-hidden="true" />
                {PHONE}
              </a>
              <span className="hidden sm:inline text-white/20">|</span>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={14} aria-hidden="true" />
                {EMAIL}
              </a>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                Respondemos en minutos
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer — el pb extra deja espacio al CTA fijo de móvil ── */}
      <footer className="bg-gray-900 py-8 pb-24 sm:pb-8" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold text-lg tracking-tight">FINDES</p>
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} FINDES · {ADDRESS}
          </p>
          <Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1.5">
            <ArrowLeft size={13} aria-hidden="true" />
            Ir al inicio
          </Link>
        </div>
      </footer>

      {/* ── CTA sticky móvil ── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-2xl px-4 py-3">
        <ChatButton
          className="w-full inline-flex items-center justify-center gap-2.5 bg-wa text-white font-bold px-5 py-3.5 rounded-xl hover:bg-wa-dark active:scale-95 transition-all text-sm shadow-lg shadow-wa/25"
          iconSize={18}
          attributes={atributos}
        >
          Cotizar renta de aula
        </ChatButton>
      </div>
    </>
  )
}
