import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import Segmentador from '@/components/Segmentador'
import DiagnosticoRuta from '@/components/DiagnosticoRuta'
import RutasAprendizaje from '@/components/RutasAprendizaje'
import AutoridadFindes from '@/components/AutoridadFindes'
import PorQueFindes from '@/components/PorQueFindes'
import ProximosCursos from '@/components/ProximosCursos'
import CapacitacionEmpresas from '@/components/CapacitacionEmpresas'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Segmentador />
        <DiagnosticoRuta />
        <RutasAprendizaje />
        <AutoridadFindes />
        <PorQueFindes />
        <ProximosCursos />
        <CapacitacionEmpresas />
        <CallToAction />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
