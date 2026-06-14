import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle, Clock, Monitor, MapPin, MessageCircle,
  ArrowLeft, GraduationCap, Users, Award, Video, TrendingUp,
  ChevronDown, BookOpen, Building2,
} from 'lucide-react'
import { getCursoBySlug, getCursosByRuta, cursos } from '@/lib/cursos'
import { YEARS, PHONE, WA_NUMBER } from '@/lib/constants'

// ─── SEO ──────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return cursos.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const curso = getCursoBySlug(params.slug)
  if (!curso) return { title: 'Curso no encontrado · FINDES' }

  const modalidadLabel = curso.modalidades.includes('Presencial')
    ? 'Presencial y Online en Vivo'
    : 'Online en Vivo'

  return {
    title:       `Curso de ${curso.nombre} en CDMX | FINDES`,
    description: `Curso de ${curso.nombre} en CDMX. ${curso.duracion} · ${modalidadLabel}. Instructores en activo, grupos reducidos y constancia de participación. ${YEARS} años formando profesionistas en México.`,
    openGraph: {
      title:       `Curso de ${curso.nombre} en CDMX | FINDES`,
      description: `${curso.duracion} · ${modalidadLabel}. ${curso.logros[0].split(' — ')[0]}.`,
      type:        'website',
      locale:      'es_MX',
    },
  }
}

// ─── Datos estáticos ──────────────────────────────────────────────────────────
const modalidadColor: Record<string, string> = {
  'Presencial':     'bg-blue-100 text-blue-700',
  'Online en Vivo': 'bg-green-100 text-green-700',
  'In Company':     'bg-orange-100 text-orange-700',
}

const diferenciadores = [
  { Icon: GraduationCap, titulo: 'Instructores en activo',      desc: 'Profesionistas que ejercen la materia hoy, no solo la enseñan.' },
  { Icon: Video,         titulo: 'Clases en vivo',              desc: 'Todas las sesiones son en tiempo real. Preguntas respondidas al momento.' },
  { Icon: Users,         titulo: 'Grupos reducidos',            desc: 'Atención personalizada garantizada. No somos una plataforma masiva.' },
  { Icon: Award,         titulo: 'Constancia de participación', desc: 'Documento oficial reconocido por empresas empleadoras en México.' },
  { Icon: Monitor,       titulo: 'Presencial y Online en Vivo', desc: 'Elige la modalidad que mejor se adapta a tu ritmo de vida.' },
]

const statsAutoridad = [
  { valor: `${YEARS} años`, etiqueta: 'formando profesionistas en México' },
  { valor: '+12,000',       etiqueta: 'alumnos capacitados al año' },
  { valor: '+500',          etiqueta: 'empresas atendidas en toda la República' },
]

const faq = [
  {
    pregunta: '¿Las clases son en vivo o grabadas?',
    respuesta: 'Todas las sesiones son en vivo con instructor. No vendemos cursos grabados. Esto significa que puedes hacer preguntas, pedir que el instructor repita un tema y participar activamente durante cada clase.',
  },
  {
    pregunta: '¿Qué pasa si me pierdo una clase?',
    respuesta: 'Sabemos que tienes compromisos laborales. Si faltaste a una sesión, puedes comunicarte directamente con tu instructor para aclarar dudas. Además, en grupos presenciales puedes reponer la clase en el siguiente grupo disponible sin costo.',
  },
  {
    pregunta: '¿Recibiré algún documento al terminar?',
    respuesta: 'Sí. Al concluir el curso recibes una constancia de participación con valor curricular, reconocida por empresas en toda la República Mexicana. Puedes incluirla en tu CV y en plataformas como LinkedIn.',
  },
  {
    pregunta: '¿Cuánto cuesta el curso?',
    respuesta: 'El costo varía según la modalidad y el grupo. Escríbenos por WhatsApp para conocer el precio exacto, fechas del próximo grupo y si hay opciones de pago en mensualidades. Respondemos en minutos.',
  },
  {
    pregunta: '¿Puedo inscribirme si soy principiante?',
    respuesta: 'Depende del curso. Cada página de curso indica claramente a quién va dirigido. Si tienes dudas, escríbenos y te orientamos hacia el curso correcto según tu nivel actual.',
  },
  {
    pregunta: '¿Qué diferencia a FINDES de una plataforma como Udemy o Coursera?',
    respuesta: 'En FINDES los grupos son pequeños, el instructor te conoce por nombre y el contenido se adapta a las necesidades reales de tu sector en México. No somos una plataforma de contenido grabado para miles de personas — somos capacitación profesional con acompañamiento real.',
  },
]

// Métricas institucionales reales de FINDES
const metricasReales = [
  { valor: `${YEARS} años`, detalle: 'formando profesionistas en México', sub: 'Fundada en 1991 · Ciudad de México' },
  { valor: '+12,000',       detalle: 'alumnos capacitados al año',         sub: 'En modalidades presencial y en línea' },
  { valor: '+500',          detalle: 'empresas que nos han confiado su capacitación', sub: 'Cobertura en toda la República' },
]

// ─── Sidebar card ──────────────────────────────────────────────────────────────
function SidebarCard({ curso }: { curso: ReturnType<typeof getCursoBySlug> & object }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-black/10 p-6">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Curso</p>
      <h2 className="font-bold text-gray-900 text-lg leading-snug mb-4">{curso.nombre}</h2>

      <div className="space-y-2.5 mb-5 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-primary flex-shrink-0" aria-hidden="true" />
          <span><strong className="text-gray-800">{curso.duracion}</strong> de capacitación</span>
        </div>
        <div className="flex items-start gap-2">
          <Monitor size={15} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{curso.modalidades.join(' · ')}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-primary flex-shrink-0" aria-hidden="true" />
          <span>Reforma 403, CDMX</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3 text-center">Precio e inscripción vía WhatsApp</p>

      <a
        href={curso.waMsg}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 bg-wa text-white font-bold px-5 py-3.5 rounded-xl hover:bg-wa-dark active:scale-95 transition-all text-sm shadow-lg shadow-wa/20 mb-3"
      >
        <MessageCircle size={17} aria-hidden="true" />
        Quiero inscribirme
      </a>
      <p className="text-xs text-gray-400 text-center">Respondemos en minutos</p>

      <hr className="my-4 border-gray-100" />

      {/* Opción B2B en sidebar */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Building2 size={14} className="text-amber-700 flex-shrink-0" aria-hidden="true" />
          <p className="text-xs font-bold text-amber-800">¿Capacitación para tu empresa?</p>
        </div>
        <p className="text-xs text-amber-700/70 mb-3 leading-relaxed">
          Grupos In Company, temario a la medida y factura empresarial.
        </p>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, me interesa el curso de ${curso.nombre} en modalidad In Company para capacitar a mi equipo. ¿Me pueden dar información y cotización?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-700 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-amber-800 transition-colors"
        >
          <MessageCircle size={13} aria-hidden="true" />
          Solicitar cotización
        </a>
      </div>

      <Link
        href="/#rutas"
        className="w-full inline-flex items-center justify-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors mt-3"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        Ver todas las rutas
      </Link>
    </div>
  )
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function CursoPage({ params }: { params: { slug: string } }) {
  const curso = getCursoBySlug(params.slug)
  if (!curso) notFound()

  const relacionados = getCursosByRuta(curso.rutaId)
    .filter((c) => c.slug !== curso.slug)
    .slice(0, 3)

  return (
    <>
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Link href="/" className="font-extrabold text-2xl tracking-tight text-primary" aria-label="FINDES — Inicio">
            FINDES
          </Link>
          <a
            href={curso.waMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-wa text-white font-bold px-5 py-2.5 rounded-xl hover:bg-wa-dark active:scale-95 transition-all text-sm shadow-md shadow-wa/20"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Quiero inscribirme
          </a>
        </div>
      </header>

      <main className="bg-gray-50 min-h-screen">

        {/* ── Hero del curso ── */}
        <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

            {/* Breadcrumb */}
            <nav aria-label="Ruta de navegación" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/60 flex-wrap">
                <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li aria-hidden="true" className="text-white/30">›</li>
                <li><Link href="/#rutas" className="hover:text-white transition-colors">Rutas de Aprendizaje</Link></li>
                <li aria-hidden="true" className="text-white/30">›</li>
                <li><Link href="/#rutas" className="hover:text-white transition-colors">{curso.rutaNombre}</Link></li>
                <li aria-hidden="true" className="text-white/30">›</li>
                <li className="text-white/90 font-medium">{curso.nombre}</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  {curso.nombre}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {curso.modalidades.map((m) => (
                    <span key={m} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${modalidadColor[m]}`}>
                      {m}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    <Clock size={11} aria-hidden="true" />
                    {curso.duracion}
                  </span>
                </div>
              </div>

              {/* Sidebar CTA — desktop */}
              <aside className="hidden md:block sticky top-[88px]" aria-label="Información de inscripción">
                <SidebarCard curso={curso} />
              </aside>
            </div>
          </div>
        </div>

        {/* ── Contenido principal ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-10 items-start">

            {/* ── Columna principal — 2/3 ── */}
            <div className="md:col-span-2 space-y-10">

              {/* 1. ¿A quién va dirigido? */}
              <section aria-labelledby="dirigido-heading">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <h2 id="dirigido-heading" className="text-xl font-bold text-gray-900">
                    ¿A quién va dirigido?
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                  {curso.dirigidoA.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. Qué cambia en tu carrera */}
              <section aria-labelledby="logros-heading">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp size={16} className="text-green-600" aria-hidden="true" />
                  </div>
                  <h2 id="logros-heading" className="text-xl font-bold text-gray-900">
                    Qué cambia en tu vida profesional
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6">
                  <p className="text-sm text-green-800/70 mb-5 font-medium">
                    Al terminar este curso, tu posición profesional será diferente:
                  </p>
                  <ul className="space-y-4">
                    {curso.logros.map((logro, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-green-200">
                          <CheckCircle size={14} className="text-white" aria-hidden="true" />
                        </div>
                        <span className="text-gray-800 text-sm leading-relaxed font-medium">{logro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 3. Duración y modalidad */}
              <section aria-labelledby="duracion-heading">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-blue-600" aria-hidden="true" />
                  </div>
                  <h2 id="duracion-heading" className="text-xl font-bold text-gray-900">
                    Duración y modalidad
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Duración total</p>
                      <p className="text-3xl font-bold text-primary">{curso.duracion}</p>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Horarios típicos: mañanas o tardes,<br />de lunes a viernes o sábados</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Modalidades disponibles</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {curso.modalidades.map((m) => (
                          <span key={m} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${modalidadColor[m]}`}>
                            {m}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">Grupos pequeños · Instructor en vivo<br />Sesiones interactivas y participativas</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Temario */}
              <section aria-labelledby="temario-heading">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Award size={16} className="text-purple-600" aria-hidden="true" />
                  </div>
                  <h2 id="temario-heading" className="text-xl font-bold text-gray-900">
                    Temario
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                  {curso.temario.map((modulo, mi) => (
                    <div key={mi} className="p-6">
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-xs font-bold text-primary/50 uppercase tracking-widest flex-shrink-0">
                          Módulo {mi + 1}
                        </span>
                        <h3 className="font-bold text-gray-900 text-base">{modulo.titulo}</h3>
                      </div>
                      <ul className="space-y-2">
                        {modulo.temas.map((tema, ti) => (
                          <li key={ti} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 mt-2" aria-hidden="true" />
                            <span className="text-sm text-gray-600 leading-relaxed">{tema}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. ¿Por qué FINDES? */}
              <section aria-labelledby="porque-heading">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={16} className="text-orange-600" aria-hidden="true" />
                  </div>
                  <h2 id="porque-heading" className="text-xl font-bold text-gray-900">
                    ¿Por qué estudiar en FINDES?
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

                  {/* Stats de autoridad */}
                  <div className="bg-primary-dark px-6 py-5 grid grid-cols-3 divide-x divide-white/10">
                    {statsAutoridad.map(({ valor, etiqueta }) => (
                      <div key={etiqueta} className="text-center px-3">
                        <p className="text-2xl font-bold text-white">{valor}</p>
                        <p className="text-white/50 text-xs mt-0.5 leading-snug">{etiqueta}</p>
                      </div>
                    ))}
                  </div>

                  {/* Declaración institucional */}
                  <div className="px-6 pt-5 pb-1">
                    <p className="text-sm text-gray-600 leading-relaxed border-l-4 border-primary pl-4">
                      FINDES no es una plataforma de cursos grabados. Cada grupo es pequeño,
                      cada instructor ejerce su materia hoy, y cada sesión es en vivo.
                      Eso es lo que hace la diferencia entre aprender y realmente cambiar tu situación profesional.
                    </p>
                  </div>

                  {/* Diferenciadores */}
                  <div className="p-6 pt-4 grid sm:grid-cols-2 gap-4">
                    {diferenciadores.map(({ Icon, titulo, desc }) => (
                      <div key={titulo} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/[0.07] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={15} className="text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{titulo}</p>
                          <p className="text-xs text-gray-500 leading-snug mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 6. Trayectoria institucional — métricas reales */}
              <section aria-labelledby="trayectoria-heading">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <h2 id="trayectoria-heading" className="text-xl font-bold text-gray-900">
                    Una institución con trayectoria comprobada
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    {metricasReales.map(({ valor, detalle, sub }) => (
                      <div key={valor} className="px-6 py-7 text-center">
                        <p className="text-3xl font-bold text-primary mb-1">{valor}</p>
                        <p className="text-sm font-semibold text-gray-700 leading-snug mb-1">{detalle}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 border-t border-gray-100 px-6 py-4">
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      FINDES ha formado profesionistas en contabilidad, recursos humanos, datos, liderazgo y administración
                      desde 1991 — con instructores que ejercen su materia en el mercado laboral mexicano hoy.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Preguntas frecuentes */}
              <section aria-labelledby="faq-heading">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <ChevronDown size={16} className="text-indigo-600" aria-hidden="true" />
                  </div>
                  <h2 id="faq-heading" className="text-xl font-bold text-gray-900">
                    Preguntas frecuentes
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                  {faq.map((item, i) => (
                    <details key={i} className="group p-6">
                      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                        <span className="font-semibold text-gray-800 text-sm leading-snug">{item.pregunta}</span>
                        <ChevronDown
                          size={16}
                          className="text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <p className="text-sm text-gray-600 leading-relaxed mt-4">
                        {item.respuesta}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* 8. Bloque B2B — In Company */}
              <section
                aria-labelledby="empresa-heading"
                className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Building2 size={18} className="text-amber-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="empresa-heading" className="font-bold text-gray-900 text-lg leading-snug">
                      ¿Necesitas capacitar a tu equipo?
                    </h2>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Este curso está disponible en modalidad In Company para grupos empresariales.
                    </p>
                  </div>
                </div>

                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    'Grupo privado exclusivo para tu empresa',
                    'Temario adaptado a tus procesos y necesidades',
                    'Impartición en tus instalaciones o en línea',
                    'Facturación a persona moral incluida',
                    'Cobertura nacional — cualquier ciudad',
                    'Métricas e indicadores de resultado',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, me interesa el curso de ${curso.nombre} en modalidad In Company para capacitar a mi equipo. ¿Me pueden dar información y cotización?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-800 active:scale-95 transition-all text-sm shadow-md"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Solicitar cotización empresarial
                </a>
                <p className="text-xs text-amber-700/60 mt-2">+500 empresas capacitadas · Respondemos en minutos</p>
              </section>

              {/* 9. CTA B2C final */}
              <section
                className="bg-primary-dark rounded-2xl p-8 md:p-10"
                aria-label="Inscripción al curso"
              >
                <p className="text-center text-white/50 text-xs font-medium uppercase tracking-widest mb-4">
                  Más de 12,000 profesionistas se capacitaron con FINDES este año
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-white text-center leading-snug mb-3">
                  ¿Listo para cambiar tu situación profesional?
                </h2>
                <p className="text-white/60 text-sm text-center mb-2 leading-relaxed max-w-md mx-auto">
                  Escríbenos por WhatsApp para conocer fechas, horarios y precio del próximo grupo.
                </p>
                <p className="text-center mb-7">
                  <span className="inline-block bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">
                    ⚡ Los grupos son pequeños — los lugares se agotan
                  </span>
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    href={curso.waMsg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-wa text-white font-bold px-8 py-4 rounded-2xl hover:bg-wa-dark active:scale-95 transition-all text-base shadow-xl shadow-wa/20"
                  >
                    <MessageCircle size={20} aria-hidden="true" />
                    Quiero inscribirme por WhatsApp
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-white/35 text-xs mt-5">
                  <span>{PHONE}</span>
                  <span className="hidden sm:inline text-white/20">·</span>
                  <span>informes@findes.org</span>
                  <span className="hidden sm:inline text-white/20">·</span>
                  <span>Respondemos en minutos</span>
                </div>
              </section>

              {/* 10. Cursos relacionados */}
              {relacionados.length > 0 && (
                <section aria-labelledby="relacionados-heading">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={16} className="text-gray-500" aria-hidden="true" />
                    </div>
                    <h2 id="relacionados-heading" className="text-xl font-bold text-gray-900">
                      Otros cursos de la ruta {curso.rutaNombre}
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relacionados.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/cursos/${r.slug}`}
                        className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-primary/30 hover:shadow-md transition-all group"
                      >
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {r.modalidades.slice(0, 2).map((m) => (
                            <span key={m} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${modalidadColor[m]}`}>
                              {m}
                            </span>
                          ))}
                        </div>
                        <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-primary transition-colors mb-2">
                          {r.nombre}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={11} aria-hidden="true" />
                          {r.duracion}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* ── Sidebar sticky — desktop ── */}
            <aside className="hidden md:block sticky top-[88px]" aria-label="Inscripción rápida">
              <SidebarCard curso={curso} />
            </aside>

          </div>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold text-lg tracking-tight">FINDES</p>
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} FINDES · Paseo de la Reforma 403, Int. 206, CDMX ·{' '}
            <a href={`tel:${PHONE}`} className="hover:text-gray-400 transition-colors">{PHONE}</a>
          </p>
          <Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1.5">
            <ArrowLeft size={13} aria-hidden="true" />
            Ir al inicio
          </Link>
        </div>
      </footer>

      {/* ── CTA sticky — solo móvil ── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-2xl px-4 py-3">
        <a
          href={curso.waMsg}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2.5 bg-wa text-white font-bold px-5 py-3.5 rounded-xl hover:bg-wa-dark active:scale-95 transition-all text-sm shadow-lg shadow-wa/25"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Quiero inscribirme · WhatsApp
        </a>
      </div>
    </>
  )
}
