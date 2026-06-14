// ── Datos institucionales FINDES ────────────────────────────────────────────
export const WA_NUMBER = '525569878100'          // (55) 6987 8100
export const PHONE     = '(55) 5525 6303'
export const EMAIL     = 'informes@findes.org'
export const ADDRESS   = 'Paseo de la Reforma 403, Int. 206, Col. Cuauhtémoc, CDMX'
export const YEARS     = '34'

// ── Mensajes de WhatsApp pre-llenados ────────────────────────────────────────
export const WA_DEFAULT_MSG  = 'Hola, me gustaría obtener información sobre los cursos de FINDES.'
export const WA_EMPRESAS_MSG = 'Hola, me interesa conocer las opciones de capacitación in-company para mi empresa. ¿Me pueden dar más información?'

// ── Constructor de links ─────────────────────────────────────────────────────
export function waLink(msg: string = WA_DEFAULT_MSG): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
