'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Rutas de Aprendizaje', href: '/#rutas' },
  { label: 'Próximos Cursos',      href: '/#proximos-cursos' },
  { label: 'Contacto',             href: '/#contacto' },
]

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-black/10 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <a
            href="#"
            className={`font-extrabold text-2xl tracking-tight transition-colors duration-200 ${
              scrolled ? 'text-primary' : 'text-white'
            }`}
            aria-label="FINDES — Inicio"
          >
            FINDES
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#empresas"
              className={`text-sm font-semibold border-2 rounded-full px-5 py-1.5 transition-colors duration-200 ${
                scrolled
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-white/80 text-white hover:bg-white/15'
              }`}
            >
              Para Empresas
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-primary' : 'text-white'
            }`}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-4 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 font-medium py-3 border-b border-gray-100 last:border-0 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#empresas"
              onClick={() => setIsOpen(false)}
              className="mt-3 text-primary font-semibold py-2 flex items-center gap-1 hover:gap-2 transition-all"
            >
              Para Empresas →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
