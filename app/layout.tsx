import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ChatwootWidget from '@/components/ChatwootWidget'
import { SITE_URL, EMAIL, PHONE, ADDRESS, YEARS } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const TITLE = 'FINDES — Capacitación Profesional en CDMX'
const DESCRIPTION =
  'Cursos presenciales y en vivo con instructores expertos. Encuentra tu ruta de aprendizaje y desarrolla las habilidades que buscan las empresas.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | FINDES',
  },
  description: DESCRIPTION,
  keywords: ['capacitación profesional', 'cursos CDMX', 'Excel', 'Power BI', 'Recursos Humanos', 'Contabilidad'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: 'FINDES',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Datos estructurados (JSON-LD) para que Google entienda la organización
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'FINDES',
  description: DESCRIPTION,
  url: SITE_URL,
  email: EMAIL,
  telephone: PHONE,
  foundingDate: `${new Date().getFullYear() - Number(YEARS)}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS,
    addressLocality: 'Ciudad de México',
    addressCountry: 'MX',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <ChatwootWidget />
      </body>
    </html>
  )
}
