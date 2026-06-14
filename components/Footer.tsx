const links = [
  { label: 'Rutas de Aprendizaje', href: '#rutas' },
  { label: 'Próximos Cursos',      href: '#proximos-cursos' },
  { label: 'Para Empresas',        href: '#empresas' },
  { label: 'Contacto',             href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-bold text-xl mb-1.5">FINDES</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Capacitación profesional presencial y en línea<br />
              Ciudad de México
            </p>
          </div>

          <nav aria-label="Links del pie de página">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-gray-600 text-xs">
          <p>© {new Date().getFullYear()} FINDES. Todos los derechos reservados.</p>
          <a href="#" className="hover:text-gray-400 transition-colors">
            Aviso de Privacidad
          </a>
        </div>

      </div>
    </footer>
  )
}
