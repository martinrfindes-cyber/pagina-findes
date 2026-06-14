// Micro-segmentador B2C / B2B
// Se ubica entre Social Proof y Rutas de Aprendizaje.
// Dirige a cada perfil a la sección que le corresponde sin confundirlos.

const perfiles = [
  {
    emoji:     '👤',
    titulo:    'Soy profesionista',
    desc:      'Quiero capacitarme para crecer, actualizar mi perfil o conseguir un mejor empleo.',
    cta:       'Ver rutas de aprendizaje',
    href:      '#rutas',
    ariaLabel: 'Ir a Rutas de Aprendizaje para profesionistas',
  },
  {
    emoji:     '🏢',
    titulo:    'Tengo un equipo que capacitar',
    desc:      'Busco programas in-company, grupos privados o capacitación para mis colaboradores.',
    cta:       'Ver opciones para empresas',
    href:      '#empresas',
    ariaLabel: 'Ir a la sección de Capacitación Empresarial',
  },
]

export default function Segmentador() {
  return (
    <section
      className="py-12 md:py-16 bg-gray-50 border-b border-gray-200"
      aria-labelledby="segmentador-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <p
          id="segmentador-heading"
          className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-7"
        >
          ¿Cuál es tu situación?
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {perfiles.map(({ emoji, titulo, desc, cta, href, ariaLabel }) => (
            <a
              key={href}
              href={href}
              aria-label={ariaLabel}
              className="group flex flex-col gap-4 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary hover:shadow-lg hover:shadow-primary/8 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl leading-none select-none" aria-hidden="true">
                  {emoji}
                </span>
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-1 group-hover:text-primary transition-colors">
                    {titulo}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-auto group-hover:gap-2.5 transition-all">
                {cta}
                <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
