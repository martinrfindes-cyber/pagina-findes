const stats = [
  { value: '+30 años', label: 'formando profesionistas' },
  { value: '+12,000',  label: 'alumnos capacitados al año' },
  { value: '+500',     label: 'empresas atendidas' },
]

export default function SocialProof() {
  return (
    <section
      className="bg-primary-dark py-10"
      aria-label="Cifras de FINDES"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={value} className="flex flex-col items-center gap-1">
              <dt className="text-3xl md:text-4xl font-bold text-white">{value}</dt>
              <dd className="text-xs sm:text-sm text-white/55 leading-snug">{label}</dd>
            </div>
          ))}
          {/* Modalidades — separado para controlar el layout */}
          <div className="flex flex-col items-center gap-1">
            <dt className="text-2xl md:text-4xl font-bold text-white">3 modalidades</dt>
            <dd className="text-xs sm:text-sm text-white/55 leading-snug">Presencial · Online · In Company</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
