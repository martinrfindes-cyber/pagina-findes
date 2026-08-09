// ── Renta de aulas — datos de las instalaciones FINDES ───────────────────────
// Las fotos viven en /public/instalaciones/ (ver README de esa carpeta).

export interface Aula {
  id: string
  nombre: string
  /** Foto principal del aula (ruta pública) */
  foto: string
  alt: string
  descripcion: string
  /**
   * Capacidad en personas. Se deja opcional a propósito: si no está definida,
   * la tarjeta no muestra número (mejor eso que publicar un dato falso).
   * TODO: confirmar con FINDES la capacidad real de cada aula y llenarla aquí.
   */
  capacidad?: string
  /** Montajes posibles (escolar, U, auditorio…) */
  montaje: string
  equipamiento: string[]
}

export const aulas: Aula[] = [
  {
    id: 'aula-ejecutiva',
    nombre: 'Aula Ejecutiva',
    foto: '/instalaciones/aula-ejecutiva.jpg',
    alt: 'Aula ejecutiva de FINDES con mesas de trabajo blancas, pizarrón y proyector',
    descripcion:
      'Espacio moderno con mesas de trabajo amplias. Ideal para talleres, capacitaciones ejecutivas y sesiones donde el grupo necesita trabajar con laptop.',
    montaje: 'Escolar o en U',
    equipamiento: ['Proyector', 'Pizarrón blanco', 'Aire acondicionado', 'Mesas de trabajo'],
  },
  {
    id: 'aula-tradicional',
    nombre: 'Aula de Capacitación',
    foto: '/instalaciones/aula-tradicional.jpg',
    alt: 'Aula de capacitación de FINDES con pupitres, pizarrón blanco y proyector',
    descripcion:
      'Aula de capacitación clásica con mobiliario individual. Perfecta para cursos, diplomados y sesiones de varias horas.',
    montaje: 'Escolar',
    equipamiento: ['Proyector', 'Pizarrón blanco', 'Aire acondicionado', 'Mobiliario individual'],
  },
  {
    id: 'aula-magna',
    nombre: 'Aula Magna',
    foto: '/instalaciones/aula-magna.jpg',
    alt: 'Aula magna de FINDES, la de mayor capacidad, con pupitres en filas y proyector',
    descripcion:
      'Nuestra aula de mayor capacidad. Pensada para grupos grandes, conferencias, exámenes y presentaciones ante audiencia.',
    montaje: 'Escolar o auditorio',
    equipamiento: ['Proyector', 'Pizarrón blanco', 'Mobiliario individual', 'Cortinas para blackout'],
  },
]

/** Fotos de servicios/áreas comunes que acompañan la renta */
export const areas = [
  {
    foto: '/instalaciones/recepcion.jpg',
    alt: 'Recepción de FINDES con sala de espera y mostrador de atención',
    titulo: 'Recepción y sala de espera',
    desc: 'Tus asistentes son recibidos y registrados en recepción. Acceso controlado durante todo el evento.',
  },
  {
    foto: '/instalaciones/area-comun.jpg',
    alt: 'Área común de FINDES con mesas, bancas y servicio de agua para coffee break',
    titulo: 'Área común para coffee break',
    desc: 'Espacio abierto para los recesos: agua, mesas y bancas para que el grupo despeje entre sesiones.',
  },
]

/** Todo lo que incluye la renta, sin costo extra */
export const incluye = [
  'Mobiliario montado según tu formato',
  'Proyector y pizarrón blanco',
  'Aire acondicionado',
  'Internet Wi-Fi para todos los asistentes',
  'Servicio de agua',
  'Recepción y registro de asistentes',
  'Área común para coffee break',
  'Limpieza antes y después del evento',
]

/** Para quién es este servicio */
export const casosDeUso = [
  'Empresas que capacitan a su personal y no tienen aula propia',
  'Instructores y consultores independientes que imparten cursos',
  'Instituciones que necesitan sede para diplomados o certificaciones',
  'Aplicación de exámenes, evaluaciones y assessment centers',
  'Juntas de trabajo, sesiones de consejo y presentaciones',
  'Entrevistas de reclutamiento masivo',
]
