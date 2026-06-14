import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import N8nChat from '@/components/N8nChat'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FINDES — Capacitación Profesional en CDMX',
  description:
    'Cursos presenciales y en vivo con instructores expertos. Encuentra tu ruta de aprendizaje y desarrolla las habilidades que buscan las empresas.',
  keywords: ['capacitación profesional', 'cursos CDMX', 'Excel', 'Power BI', 'Recursos Humanos', 'Contabilidad'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <N8nChat />
      </body>
    </html>
  )
}
