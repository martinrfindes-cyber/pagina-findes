import { Phone, Mail } from 'lucide-react'
import { PHONE, EMAIL } from '@/lib/constants'
import ChatButton from '@/components/ChatButton'

export default function CallToAction() {
  return (
    <section
      id="contacto"
      className="py-20 md:py-28 bg-white"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-primary mb-4">
          ¿Tienes dudas? Nuestro asistente te ayuda
        </h2>
        <p className="text-gray-500 text-lg mb-9">
          Respuesta en minutos. Sin formularios, sin esperas.
        </p>

        <ChatButton className="inline-flex items-center gap-3 bg-wa text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-wa-dark active:scale-95 transition-all shadow-2xl shadow-wa/30" iconSize={22}>
          QUIERO INFORMACIÓN
        </ChatButton>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
          <a
            href={`tel:${PHONE.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Phone size={14} aria-hidden="true" />
            {PHONE}
          </a>
          <span className="hidden sm:inline text-gray-200">|</span>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Mail size={14} aria-hidden="true" />
            {EMAIL}
          </a>
        </div>

      </div>
    </section>
  )
}
