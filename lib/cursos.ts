import { WA_NUMBER } from './constants'

export interface Modulo {
  titulo: string
  temas:  string[]
}

export interface Curso {
  slug:        string
  nombre:      string
  rutaId:      string
  rutaNombre:  string
  duracion:    string
  modalidades: string[]
  dirigidoA:   string[]
  logros:      string[]
  temario:     Modulo[]
  waMsg:       string
}

function waLink(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
function waCurso(nombre: string) {
  return waLink(
    `Hola, me interesa el curso de ${nombre} en FINDES. ¿Me pueden dar información sobre fechas, horarios y precio?`
  )
}

export const cursos: Curso[] = [

  // ── RUTA: ANALISTA DE DATOS ──────────────────────────────────────────────────

  {
    slug:       'excel-basico',
    nombre:     'Excel Básico',
    rutaId:     'datos',
    rutaNombre: 'Analista de Datos',
    duracion:   '16 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Personas que nunca han usado Excel o lo usan de forma muy básica.',
      'Profesionistas que necesitan organizar información en su trabajo diario.',
      'Quienes buscan una base sólida antes de avanzar a niveles intermedios o superiores.',
    ],
    logros: [
      'Dejarás de pedir ayuda para tareas básicas en Excel — trabajarás de forma completamente autónoma desde la primera semana.',
      'Crearás reportes y formatos profesionales que reflejan tu nivel de preparación ante cualquier jefe o cliente.',
      'Resolverás cálculos cotidianos en minutos en lugar de horas, aumentando tu rendimiento real sin trabajar más tiempo.',
      'Agregarás Excel como habilidad demostrable en tu CV, lo que te diferenciará de otros candidatos en entrevistas de trabajo.',
      'Tendrás la base para avanzar al nivel intermedio y posicionarte como referente de datos en tu área.',
    ],
    temario: [
      {
        titulo: 'Fundamentos de Excel',
        temas: ['Interfaz y navegación', 'Tipos de datos y formato de celdas', 'Ingreso y edición de datos', 'Atajos de teclado esenciales'],
      },
      {
        titulo: 'Fórmulas y funciones básicas',
        temas: ['SUMA, PROMEDIO, MIN, MAX', 'Función SI (condicional simple)', 'CONTAR y CONTARA', 'Referencias relativas y absolutas'],
      },
      {
        titulo: 'Organización y presentación de datos',
        temas: ['Ordenar y filtrar datos', 'Formato condicional básico', 'Creación de gráficas simples', 'Impresión y configuración de página'],
      },
    ],
    waMsg: waCurso('Excel Básico'),
  },

  {
    slug:       'excel-intermedio',
    nombre:     'Excel Intermedio',
    rutaId:     'datos',
    rutaNombre: 'Analista de Datos',
    duracion:   '20 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Usuarios que ya manejan Excel básico y quieren trabajar con mayor eficiencia.',
      'Profesionistas que elaboran reportes y necesitan funciones más potentes.',
      'Personas que trabajan con grandes volúmenes de datos en su área.',
    ],
    logros: [
      'Construirás tablas dinámicas y reportes que hoy le pides a alguien más — asumiendo el rol de referente de datos en tu área.',
      'Cruzarás bases de datos con funciones como BUSCARV en segundos, una habilidad que distingue a los perfiles más solicitados.',
      'Analizarás grandes volúmenes de información con agilidad, reduciendo el tiempo que dedicas a tareas repetitivas.',
      'Presentarás dashboards que proyectan dominio técnico y profesionalismo ante tu equipo o jefatura.',
      'Estarás posicionado para dar el salto al nivel avanzado o a certificaciones que aumentan tu valor en el mercado.',
    ],
    temario: [
      {
        titulo: 'Funciones de búsqueda y referencia',
        temas: ['BUSCARV y BUSCARH', 'ÍNDICE y COINCIDIR', 'Funciones de texto: CONCATENAR, IZQUIERDA, DERECHA, EXTRAE', 'Funciones de fecha y hora'],
      },
      {
        titulo: 'Tablas y bases de datos en Excel',
        temas: ['Formato de tabla inteligente', 'Filtros avanzados', 'Tablas dinámicas: creación y configuración', 'Gráficas dinámicas'],
      },
      {
        titulo: 'Control y presentación de datos',
        temas: ['Validación de datos', 'Formato condicional avanzado', 'Protección de hojas y libros', 'Vínculos entre hojas y libros'],
      },
    ],
    waMsg: waCurso('Excel Intermedio'),
  },

  {
    slug:       'excel-avanzado',
    nombre:     'Excel Avanzado',
    rutaId:     'datos',
    rutaNombre: 'Analista de Datos',
    duracion:   '24 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Profesionistas con dominio intermedio que quieren llevar su análisis al siguiente nivel.',
      'Personas que elaboran reportes complejos y necesitan automatizar procesos.',
      'Analistas, contadores o administradores que manejan grandes bases de datos.',
    ],
    logros: [
      'Automatizarás procesos que hoy te consumen horas, liberando tiempo para actividades de mayor valor en tu trabajo.',
      'Diseñarás dashboards ejecutivos que antes solo hacían consultores senior — posicionándote en un nivel diferente dentro de tu organización.',
      'Te convertirás en el experto de Excel de tu empresa, lo que se traduce en mayor visibilidad, reconocimiento y poder de negociación salarial.',
      'Escribirás macros para resolver problemas específicos de tu área sin depender de especialistas externos.',
      'Abrirás puertas a roles de análisis de datos, BI y consultoría — perfiles con alta demanda y mejores salarios en el mercado.',
    ],
    temario: [
      {
        titulo: 'Funciones avanzadas y matriciales',
        temas: ['Funciones matriciales dinámicas (FILTRAR, ORDENARPOR, ÚNICOS)', 'Funciones estadísticas avanzadas', 'Funciones financieras: VPN, TIR, PAGO', 'Anidación de funciones complejas'],
      },
      {
        titulo: 'Power Query y modelado de datos',
        temas: ['Importar y transformar datos con Power Query', 'Combinar y limpiar múltiples fuentes', 'Modelo de datos en Excel', 'Funciones DAX básicas'],
      },
      {
        titulo: 'Automatización con macros y VBA',
        temas: ['Grabadora de macros', 'Introducción a VBA', 'Creación de macros personalizadas', 'Botones e interfaz de usuario básica'],
      },
      {
        titulo: 'Dashboards y reportes ejecutivos',
        temas: ['Diseño de dashboards interactivos', 'Segmentadores y escalas de tiempo', 'Gráficas avanzadas y personalizadas', 'Reportes automáticos con hipervínculos'],
      },
    ],
    waMsg: waCurso('Excel Avanzado'),
  },

  {
    slug:       'power-bi',
    nombre:     'Power BI',
    rutaId:     'datos',
    rutaNombre: 'Analista de Datos',
    duracion:   '20 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Profesionistas que necesitan presentar datos de forma visual e impactante.',
      'Analistas, gerentes y coordinadores que toman decisiones basadas en reportes.',
      'Usuarios de Excel que quieren dar el salto a herramientas de Business Intelligence.',
    ],
    logros: [
      'Dejarás de presentar tablas estáticas de Excel y pasarás a dashboards interactivos que impresionan a cualquier directivo.',
      'Serás el profesionista capaz de conectar, limpiar y visualizar datos de múltiples fuentes — una habilidad crítica y escasa en el mercado.',
      'Tomarás decisiones con base en datos actualizados, no en información desactualizada o interpretada subjetivamente.',
      'Hablarás el lenguaje del Business Intelligence y colaborarás con equipos de TI y Analytics sin perder el hilo.',
      'Abrirás acceso a roles de BI Analyst, Data Analyst y Reporting Specialist — posiciones entre las mejor pagadas del mercado laboral.',
    ],
    temario: [
      {
        titulo: 'Introducción y conexión de datos',
        temas: ['Interfaz y flujo de trabajo en Power BI Desktop', 'Conexión a Excel, CSV y bases de datos', 'Power Query: limpieza y transformación', 'Relaciones entre tablas'],
      },
      {
        titulo: 'Visualizaciones y reportes',
        temas: ['Tipos de gráficas y cuándo usarlas', 'Mapas, KPI y tarjetas de métricas', 'Filtros, segmentadores e interacciones', 'Diseño y maquetación de reportes'],
      },
      {
        titulo: 'DAX y cálculos de negocio',
        temas: ['Medidas calculadas vs. columnas calculadas', 'Funciones DAX esenciales: SUM, CALCULATE, FILTER', 'Inteligencia de tiempo: YTD, MOM', 'Tablas de fechas personalizadas'],
      },
      {
        titulo: 'Publicación y colaboración',
        temas: ['Power BI Service: publicar y compartir', 'Dashboards en la nube', 'Actualización automática de datos', 'Buenas prácticas de seguridad y acceso'],
      },
    ],
    waMsg: waCurso('Power BI'),
  },

  {
    slug:       'ia-analisis-datos',
    nombre:     'IA aplicada al Análisis de Datos',
    rutaId:     'datos',
    rutaNombre: 'Analista de Datos',
    duracion:   '16 horas',
    modalidades: ['Online en Vivo'],
    dirigidoA: [
      'Analistas y profesionistas de datos que quieren integrar IA en su flujo de trabajo.',
      'Usuarios de Excel y Power BI que buscan multiplicar su productividad con herramientas de IA.',
      'Profesionistas curiosos que quieren entender cómo la IA transforma el análisis de datos hoy.',
    ],
    logros: [
      'Multiplicarás tu productividad usando IA para análisis, fórmulas y reportes — haciendo en minutos lo que antes tomaba horas.',
      'Te adelantarás a la mayoría de los profesionistas de tu campo, que aún no saben cómo integrar IA en su trabajo diario.',
      'Generarás análisis más ricos y narrativos usando herramientas que hoy solo usan los perfiles más avanzados del mercado.',
      'Combinarás tu criterio profesional con el poder de procesamiento de la IA para tomar decisiones más informadas.',
      'Te posicionarás como un profesionista de vanguardia, listo para el mercado que ya está siendo transformado por la inteligencia artificial.',
    ],
    temario: [
      {
        titulo: 'IA generativa para el analista de datos',
        temas: ['Panorama de herramientas de IA: ChatGPT, Copilot, Gemini', 'Prompts efectivos para análisis de datos', 'Generación automática de fórmulas en Excel', 'Escritura de código Python básico con IA'],
      },
      {
        titulo: 'Automatización del flujo de trabajo',
        temas: ['Limpieza de datos asistida por IA', 'Generación de reportes narrativos automáticos', 'IA en Power BI: preguntas en lenguaje natural', 'Detección de patrones y anomalías'],
      },
      {
        titulo: 'Ética, límites y mejores prácticas',
        temas: ['Verificación de resultados de IA', 'Privacidad de datos al usar IA', 'Sesgos y errores comunes', 'Casos de uso reales en empresas mexicanas'],
      },
    ],
    waMsg: waCurso('IA aplicada al Análisis de Datos'),
  },

  // ── RUTA: RECURSOS HUMANOS ───────────────────────────────────────────────────

  {
    slug:       'reclutamiento-seleccion',
    nombre:     'Reclutamiento y Selección de Personal',
    rutaId:     'rrhh',
    rutaNombre: 'Recursos Humanos',
    duracion:   '20 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Profesionistas de RH que realizan procesos de contratación y quieren profesionalizarlos.',
      'Coordinadores y jefes de área que participan en la selección de su equipo.',
      'Personas que buscan ingresar al área de Recursos Humanos.',
    ],
    logros: [
      'Contratarás mejores personas en menos tiempo, reduciendo el costo y la rotación que genera una mala selección.',
      'Aplicarás técnicas de entrevista por competencias que distinguen a los candidatos reales de los que solo saben venderse bien.',
      'Construirás procesos de selección documentados con criterios objetivos que protegen a tu empresa legalmente.',
      'Te posicionarás como un especialista de RH con metodología real, no solo intuición — lo que aumenta tu valor en el mercado.',
      'Reducirás la brecha entre lo que busca la empresa y lo que se contrata, mejorando el desempeño de los nuevos ingresos.',
    ],
    temario: [
      {
        titulo: 'Fundamentos del proceso de reclutamiento',
        temas: ['Análisis y descripción de puestos', 'Perfil del candidato ideal', 'Fuentes de reclutamiento: interno, externo y digital', 'Publicación de vacantes efectivas'],
      },
      {
        titulo: 'Técnicas de entrevista y evaluación',
        temas: ['Entrevista por competencias', 'Preguntas situacionales y conductuales', 'Evaluación psicométrica: tipos y aplicación', 'Assessment center básico'],
      },
      {
        titulo: 'Selección, integración y métricas',
        temas: ['Proceso de toma de decisión', 'Verificación de referencias y antecedentes', 'Onboarding efectivo', 'Indicadores de reclutamiento: tiempo de cobertura, costo por contratación'],
      },
    ],
    waMsg: waCurso('Reclutamiento y Selección de Personal'),
  },

  {
    slug:       'nominas-imss',
    nombre:     'Nóminas y IMSS',
    rutaId:     'rrhh',
    rutaNombre: 'Recursos Humanos',
    duracion:   '30 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Auxiliares y especialistas de RH o nómina que quieren dominar el proceso completo.',
      'Contadores y administradores que gestionan nómina en su empresa.',
      'Dueños de negocio que necesitan entender sus obligaciones patronales.',
    ],
    logros: [
      'Calcularás nóminas correctamente y sin errores que generen problemas legales o fiscales para tu empresa.',
      'Gestionarás con seguridad el IMSS, INFONAVIT e ISR — las obligaciones patronales que más errores generan en México.',
      'Dominarás el timbrado de CFDI de nómina y los complementos de pago, habilidades que muy pocos conocen bien.',
      'Protegerás a tu empresa de multas, recargos y demandas laborales que nacen de errores en la nómina.',
      'Consolidarás tu perfil como especialista en nómina — uno de los roles más demandados y estables del área de RH.',
    ],
    temario: [
      {
        titulo: 'Base legal y conceptos de nómina',
        temas: ['Ley Federal del Trabajo aplicada a nómina', 'Tipos de contratación y su impacto en nómina', 'Conceptos de percepciones y deducciones', 'Salario diario integrado (SDI)'],
      },
      {
        titulo: 'Cálculo de nómina e impuestos',
        temas: ['ISR en nómina: cálculo mensual y anual', 'Subsidio al empleo', 'Cuotas IMSS: obrero-patronales', 'INFONAVIT e IMSS: determinación de cuotas'],
      },
      {
        titulo: 'IMSS: gestión operativa',
        temas: ['Alta de trabajadores en IDSE', 'Modificación salarial y bajas', 'CFDI de nómina: timbrado y requisitos', 'SUA: cálculo y pago de cuotas'],
      },
      {
        titulo: 'Cálculos especiales y terminación laboral',
        temas: ['Vacaciones, prima vacacional y aguinaldo', 'PTU: cálculo y distribución', 'Finiquito y liquidación LFT', 'Retención de IMSS por incapacidad'],
      },
    ],
    waMsg: waCurso('Nóminas y IMSS'),
  },

  {
    slug:       'desarrollo-organizacional',
    nombre:     'Desarrollo Organizacional',
    rutaId:     'rrhh',
    rutaNombre: 'Recursos Humanos',
    duracion:   '20 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Profesionistas de RH que gestionan clima laboral, cultura y desarrollo de talento.',
      'Gerentes y coordinadores que lideran procesos de cambio organizacional.',
      'Consultores internos que diseñan intervenciones de mejora en sus empresas.',
    ],
    logros: [
      'Diagnosticarás el clima y la cultura de tu organización con herramientas reales, no con intuición o encuestas genéricas.',
      'Diseñarás planes de desarrollo de talento que la alta dirección reconocerá como estratégicos, no solo operativos.',
      'Gestionarás procesos de cambio con menor resistencia y mayor velocidad — una habilidad crítica en cualquier empresa en crecimiento.',
      'Hablarás el lenguaje de los indicadores y el ROI de RH, conectando tus acciones con los resultados del negocio.',
      'Te posicionarás como un profesionista de RH estratégico, listo para roles de gerencia o consultoría organizacional.',
    ],
    temario: [
      {
        titulo: 'Fundamentos de Desarrollo Organizacional',
        temas: ['Concepto y alcance del DO', 'Diagnóstico organizacional', 'Encuesta de clima laboral: diseño e interpretación', 'Modelo de Burke-Litwin'],
      },
      {
        titulo: 'Gestión del talento y desempeño',
        temas: ['Descripción de puestos por competencias', 'Evaluación del desempeño: 90°, 180° y 360°', 'Plan de desarrollo individual (PDI)', 'Planes de carrera y sucesión'],
      },
      {
        titulo: 'Gestión del cambio y cultura',
        temas: ['Modelo de Kotter para gestión del cambio', 'Resistencia al cambio: diagnóstico y manejo', 'Cultura organizacional: diagnóstico y diseño', 'Comunicación interna estratégica'],
      },
    ],
    waMsg: waCurso('Desarrollo Organizacional'),
  },

  {
    slug:       'liderazgo',
    nombre:     'Liderazgo',
    rutaId:     'liderazgo',
    rutaNombre: 'Liderazgo y Supervisión',
    duracion:   '16 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Coordinadores, jefes y supervisores que gestionan equipos de trabajo.',
      'Profesionistas que están por asumir su primer rol de liderazgo.',
      'Líderes con experiencia que quieren actualizar y estructurar su estilo de dirección.',
    ],
    logros: [
      'Motivarás a tu equipo con herramientas concretas — no con buenas intenciones que no generan resultados.',
      'Darás feedback que produce cambio real en tus colaboradores, en lugar de conversaciones incómodas que no llevan a ningún lado.',
      'Delegarás con claridad y harás seguimiento efectivo, liberando tu tiempo para las decisiones que solo tú puedes tomar.',
      'Construirás la autoridad que un líder necesita — basada en competencia real, no solo en jerarquía.',
      'Estarás listo para asumir o consolidar roles de coordinación, jefatura o gerencia con bases sólidas.',
    ],
    temario: [
      {
        titulo: 'Estilos y fundamentos de liderazgo',
        temas: ['Liderazgo situacional de Hersey y Blanchard', 'Liderazgo transformacional vs. transaccional', 'Autoconocimiento: fortalezas y áreas de mejora', 'El líder como coach de su equipo'],
      },
      {
        titulo: 'Herramientas de dirección de equipos',
        temas: ['Motivación: teorías aplicadas al entorno laboral', 'Delegación efectiva', 'Feedback y feedforward', 'Reuniones de trabajo productivas'],
      },
      {
        titulo: 'Desarrollo del equipo y resultados',
        temas: ['Etapas de desarrollo de un equipo (Tuckman)', 'Gestión del bajo desempeño', 'Indicadores de productividad del equipo', 'Reconocimiento y retención de talento'],
      },
    ],
    waMsg: waCurso('Liderazgo'),
  },

  {
    slug:       'nom-035',
    nombre:     'NOM-035: Factores de Riesgo Psicosocial',
    rutaId:     'rrhh',
    rutaNombre: 'Recursos Humanos',
    duracion:   '12 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Responsables de RH, seguridad e higiene y bienestar organizacional.',
      'Gerentes y supervisores que deben cumplir con la normativa vigente.',
      'Empresas de todos los tamaños que necesitan implementar la NOM-035.',
    ],
    logros: [
      'Cumplirás con las obligaciones legales de tu empresa sin riesgo de multas o inspecciones desfavorables de la STPS.',
      'Aplicarás los instrumentos de evaluación correctamente y documentarás los resultados con evidencia suficiente.',
      'Diseñarás un programa de prevención real que mejore el bienestar de los colaboradores — no solo un trámite de cumplimiento.',
      'Posicionarás a tu empresa como un empleador que cuida a su gente, fortaleciendo la retención de talento.',
      'Te convertirás en el referente interno de NOM-035, consolidando tu valor estratégico dentro del área de RH.',
    ],
    temario: [
      {
        titulo: 'Marco normativo y obligaciones',
        temas: ['Antecedentes y objetivo de la NOM-035', 'Obligaciones según número de trabajadores', 'Factores de riesgo psicosocial: definición y clasificación', 'Entornos organizacionales favorables'],
      },
      {
        titulo: 'Evaluación e instrumentos',
        temas: ['Cuestionario de evaluación de riesgo psicosocial', 'Identificación de eventos traumáticos severos', 'Análisis de resultados y diagnóstico', 'Medidas de control y seguimiento'],
      },
      {
        titulo: 'Implementación y cumplimiento',
        temas: ['Política de prevención de riesgo psicosocial', 'Programa de intervención', 'Registro documental requerido por la norma', 'Simulacro de inspección STPS'],
      },
    ],
    waMsg: waCurso('NOM-035'),
  },

  // ── RUTA: CONTABILIDAD Y FISCAL ──────────────────────────────────────────────

  {
    slug:       'contabilidad-no-contadores',
    nombre:     'Contabilidad para No Contadores',
    rutaId:     'contabilidad',
    rutaNombre: 'Contabilidad y Fiscal',
    duracion:   '20 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Dueños de negocio que necesitan entender los estados financieros de su empresa.',
      'Administradores, gerentes y coordinadores sin formación contable.',
      'Personas que trabajan con información financiera y quieren interpretarla correctamente.',
    ],
    logros: [
      'Leerás los estados financieros de tu empresa con la misma soltura que tu contador — tomando mejores decisiones sin depender de terceros.',
      'Dejarás de aprobar gastos o inversiones sin entender realmente su impacto en la salud financiera de la organización.',
      'Te comunicarás con autoridad con directores financieros, contadores e inversionistas, usando su mismo lenguaje.',
      'Identificarás señales de alerta financiera a tiempo, antes de que se conviertan en problemas que cuestan dinero o puestos de trabajo.',
      'Fortalecerás tu perfil directivo o gerencial, ya que las habilidades financieras son las más valoradas en puestos de liderazgo.',
    ],
    temario: [
      {
        titulo: 'Fundamentos contables',
        temas: ['Partida doble y ecuación contable', 'Catálogo de cuentas', 'Registro de operaciones básicas', 'Asientos contables: concepto y práctica'],
      },
      {
        titulo: 'Estados financieros',
        temas: ['Balance general: activo, pasivo y capital', 'Estado de resultados: ingresos y gastos', 'Flujo de efectivo operativo', 'Análisis e interpretación de estados financieros'],
      },
      {
        titulo: 'Aplicación práctica para no contadores',
        temas: ['Indicadores financieros clave (liquidez, rentabilidad, endeudamiento)', 'Lectura de reportes del contador', 'Presupuesto vs. real', 'Casos prácticos con empresas reales'],
      },
    ],
    waMsg: waCurso('Contabilidad para No Contadores'),
  },

  {
    slug:       'cfdi',
    nombre:     'CFDI: Comprobantes Fiscales Digitales',
    rutaId:     'contabilidad',
    rutaNombre: 'Contabilidad y Fiscal',
    duracion:   '16 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Contadores y auxiliares contables que emiten y reciben facturas electrónicas.',
      'Administradores y dueños de negocio que gestionan su facturación.',
      'Personal de cuentas por cobrar y por pagar que trabaja con comprobantes fiscales.',
    ],
    logros: [
      'Emitirás y cancelarás facturas sin errores que generen problemas fiscales o rechazos del SAT — protegiendo a tu empresa y a ti.',
      'Dominarás el CFDI 4.0 con todas sus especificaciones, incluyendo los complementos que más confusión generan en el mercado.',
      'Protegerás la deducibilidad de los gastos de tu empresa, asegurando que cada comprobante cumpla los requisitos fiscales vigentes.',
      'Reducirás el tiempo perdido corrigiendo errores de facturación, uno de los problemas más costosos en cualquier área administrativa.',
      'Serás el referente de facturación electrónica en tu área, lo que refuerza tu perfil ante cualquier empleador o cliente.',
    ],
    temario: [
      {
        titulo: 'Fundamentos del CFDI',
        temas: ['Marco legal: CFF y resolución miscelánea', 'Versión 4.0: cambios y requisitos', 'Estructura del XML: campos obligatorios', 'Tipos de CFDI: ingreso, egreso, traslado, nómina, pago'],
      },
      {
        titulo: 'Emisión y cancelación',
        temas: ['Proceso de timbrado con PAC', 'Datos de receptor y uso del CFDI', 'Cancelación: causas y procedimiento', 'Sustitución de comprobantes cancelados'],
      },
      {
        titulo: 'Complementos y casos especiales',
        temas: ['Complemento de pago (REP)', 'CFDI de nómina: requisitos básicos', 'Carta porte: cuándo aplica', 'Deducibilidad y requisitos fiscales para gastos'],
      },
    ],
    waMsg: waCurso('CFDI'),
  },

  {
    slug:       'impuestos',
    nombre:     'Impuestos: ISR e IVA',
    rutaId:     'contabilidad',
    rutaNombre: 'Contabilidad y Fiscal',
    duracion:   '24 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Contadores y auxiliares fiscales que preparan declaraciones periódicas.',
      'Dueños de negocio que quieren entender sus obligaciones fiscales.',
      'Personas que trabajan con personas físicas con actividad empresarial o RESICO.',
    ],
    logros: [
      'Presentarás tus declaraciones fiscales correctamente y en tiempo — sin miedos, sin errores y sin cargos innecesarios del SAT.',
      'Optimizarás la carga fiscal de tu empresa o negocio aplicando correctamente las deducciones autorizadas que muchos desconocen.',
      'Entenderás tu régimen fiscal con claridad y sabrás exactamente qué debes cumplir — y qué puedes evitar legalmente.',
      'Anticiparás los movimientos del SAT y evitarás las revisiones que nacen de inconsistencias fácilmente prevenibles.',
      'Aumentarás tu valor como contador o auxiliar fiscal, con conocimientos actualizados y aplicables desde el primer día.',
    ],
    temario: [
      {
        titulo: 'ISR: Impuesto Sobre la Renta',
        temas: ['Sujetos, objeto y tasa del ISR', 'Ingresos acumulables y deducciones autorizadas', 'Cálculo de pagos provisionales', 'Declaración anual: personas físicas y morales'],
      },
      {
        titulo: 'IVA: Impuesto al Valor Agregado',
        temas: ['Actos gravados, exentos y a tasa cero', 'IVA trasladado y acreditable', 'Cálculo de pago mensual de IVA', 'DIOT: declaración informativa de operaciones con terceros'],
      },
      {
        titulo: 'Regímenes fiscales especiales',
        temas: ['RESICO personas físicas: mecánica de pago', 'Régimen de actividades empresariales', 'RIF (régimen anterior): transición', 'Plataformas digitales: obligaciones fiscales'],
      },
    ],
    waMsg: waCurso('Impuestos: ISR e IVA'),
  },

  {
    slug:       'reformas-fiscales',
    nombre:     'Reformas Fiscales',
    rutaId:     'contabilidad',
    rutaNombre: 'Contabilidad y Fiscal',
    duracion:   '12 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Contadores y fiscalistas que necesitan mantenerse actualizados con los cambios del SAT.',
      'Administradores y dueños de negocio afectados por las reformas vigentes.',
      'Profesionistas que asesoran a empresas en materia fiscal.',
    ],
    logros: [
      'Te mantendrás al día con los cambios que el SAT implementa cada año, evitando errores por desconocimiento de las nuevas disposiciones.',
      'Adaptarás los procesos de tu empresa con anticipación, antes de que los cambios generen problemas o sanciones.',
      'Asesorarás a tus clientes o empleadores con información actualizada, fortaleciendo tu credibilidad y autoridad profesional.',
      'Identificarás oportunidades fiscales que las reformas generan — no solo los riesgos — para beneficiar a tu empresa o clientes.',
      'Consolidarás tu perfil como fiscalista actualizado, uno de los más demandados y mejor valuados del mercado contable mexicano.',
    ],
    temario: [
      {
        titulo: 'Reforma a la Ley del ISR',
        temas: ['Cambios en tasas y deducciones', 'Nuevas obligaciones para personas morales', 'Modificaciones para personas físicas', 'Disposiciones transitorias y fechas clave'],
      },
      {
        titulo: 'Reforma al IVA y IEPS',
        temas: ['Cambios en tasas y exenciones', 'Nuevos sujetos obligados', 'Impacto en operaciones con el extranjero', 'Ajustes en la DIOT'],
      },
      {
        titulo: 'Otras disposiciones y Miscelánea Fiscal',
        temas: ['Resolución Miscelánea Fiscal vigente', 'Cambios en facturación y CFDI', 'Nuevas obligaciones informativas', 'Criterios del SAT y jurisprudencia reciente'],
      },
    ],
    waMsg: waCurso('Reformas Fiscales'),
  },

  {
    slug:       'finanzas-empresariales',
    nombre:     'Finanzas Empresariales',
    rutaId:     'contabilidad',
    rutaNombre: 'Contabilidad y Fiscal',
    duracion:   '20 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Gerentes, directores y dueños de negocio que toman decisiones financieras.',
      'Profesionistas que necesitan evaluar proyectos de inversión o financiamiento.',
      'Contadores y administradores que quieren ampliar su visión financiera estratégica.',
    ],
    logros: [
      'Evaluarás proyectos e inversiones con herramientas reales — VPN, TIR, análisis de escenarios — y no solo con intuición o presentimientos.',
      'Construirás presupuestos y proyecciones financieras que la dirección tomará en serio como herramienta real de decisión.',
      'Hablarás el lenguaje del dinero con socios, directivos e inversionistas — lo que abre puertas a roles estratégicos de mayor responsabilidad.',
      'Identificarás a tiempo señales de alerta de liquidez, rentabilidad o endeudamiento que hoy podrían estar afectando tu empresa.',
      'Accederás a posiciones de mayor responsabilidad — dirección financiera, gerencia o consultoría — con bases técnicas que te dan credibilidad.',
    ],
    temario: [
      {
        titulo: 'Análisis financiero',
        temas: ['Razones financieras: liquidez, rentabilidad, apalancamiento', 'Análisis vertical y horizontal', 'Punto de equilibrio operativo y financiero', 'EBITDA y flujo libre de efectivo'],
      },
      {
        titulo: 'Presupuesto y proyecciones',
        temas: ['Presupuesto maestro: ventas, producción, gastos', 'Flujo de efectivo proyectado', 'Control presupuestal: variaciones', 'Escenarios financieros y sensibilidad'],
      },
      {
        titulo: 'Decisiones de inversión y financiamiento',
        temas: ['Valor del dinero en el tiempo', 'VPN y TIR: aplicación práctica', 'Costo de capital (WACC)', 'Fuentes de financiamiento: crédito bancario, capital, factoraje'],
      },
    ],
    waMsg: waCurso('Finanzas Empresariales'),
  },

  // ── RUTA: LIDERAZGO Y SUPERVISIÓN ───────────────────────────────────────────

  {
    slug:       'comunicacion-efectiva',
    nombre:     'Comunicación Efectiva',
    rutaId:     'liderazgo',
    rutaNombre: 'Liderazgo y Supervisión',
    duracion:   '16 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Profesionistas que necesitan transmitir ideas con claridad en reuniones, correos y presentaciones.',
      'Líderes y coordinadores que quieren mejorar la comunicación con su equipo.',
      'Personas que sienten que no se expresan con la contundencia que quisieran.',
    ],
    logros: [
      'Transmitirás tus ideas con claridad y contundencia — dejando de perder oportunidades porque no sabías cómo expresarlas bien.',
      'Manejarás conversaciones difíciles con asertividad, sin confrontación innecesaria ni sumisión que no lleva a ningún lado.',
      'Presentarás ante grupos o directivos con seguridad real, no con el nerviosismo que borra todo tu trabajo de preparación.',
      'Mejorarás tus relaciones laborales, ya que la mayoría de los conflictos en equipos nacen de una comunicación deficiente.',
      'Proyectarás más autoridad y profesionalismo en cualquier entorno — lo que se traduce directamente en mayor visibilidad y reconocimiento.',
    ],
    temario: [
      {
        titulo: 'Fundamentos de la comunicación efectiva',
        temas: ['Proceso y barreras de comunicación', 'Comunicación verbal, no verbal y paraverbal', 'Escucha activa: técnicas y práctica', 'Estilos de comunicación: pasivo, agresivo, asertivo'],
      },
      {
        titulo: 'Comunicación en el entorno laboral',
        temas: ['Comunicación escrita: correo, reportes y mensajes', 'Reuniones productivas: facilitación y síntesis', 'Presentaciones orales: estructura y manejo del nerviosismo', 'Comunicación con distintas generaciones'],
      },
      {
        titulo: 'Conversaciones difíciles y feedback',
        temas: ['Modelo para dar feedback efectivo', 'Manejo de conversaciones incómodas', 'Comunicación en situaciones de conflicto', 'Negociación básica en el entorno laboral'],
      },
    ],
    waMsg: waCurso('Comunicación Efectiva'),
  },

  {
    slug:       'supervision-efectiva',
    nombre:     'Supervisión Efectiva',
    rutaId:     'liderazgo',
    rutaNombre: 'Liderazgo y Supervisión',
    duracion:   '16 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Supervisores y jefes de línea que coordinan equipos operativos o administrativos.',
      'Personas que acaban de ser promovidas a un rol de supervisión.',
      'Líderes que quieren mejorar su capacidad de seguimiento y control de resultados.',
    ],
    logros: [
      'Dejarás de operar tú solo y aprenderás a hacer que tu equipo funcione — eso es exactamente lo que separa al supervisor del operativo.',
      'Establecerás metas claras y medibles que tu equipo entiende y cumple, sin necesidad de repetirlas constantemente.',
      'Manejarás el ausentismo, la baja productividad y los conflictos internos con herramientas legales y efectivas.',
      'Construirás autoridad con base en liderazgo y metodología — no en informalidad que nadie respeta a largo plazo.',
      'Consolidarás tu perfil de supervisor con un modelo de gestión que cualquier empresa valorará y querrá retener.',
    ],
    temario: [
      {
        titulo: 'El rol del supervisor en la organización',
        temas: ['Diferencia entre operar y supervisar', 'Transición de operativo a supervisor', 'Responsabilidades y alcance del rol', 'Gestión del tiempo del supervisor'],
      },
      {
        titulo: 'Planeación y seguimiento',
        temas: ['Establecimiento de objetivos: método SMART', 'Asignación de tareas y prioridades', 'Seguimiento diario: tableros y reportes', 'Indicadores de productividad operativa'],
      },
      {
        titulo: 'Manejo de situaciones críticas',
        temas: ['Ausentismo y puntualidad: manejo legal', 'Amonestaciones y actas administrativas', 'Motivación del equipo en entornos de presión', 'Comunicación con la gerencia: reportes de resultados'],
      },
    ],
    waMsg: waCurso('Supervisión Efectiva'),
  },

  {
    slug:       'manejo-conflictos',
    nombre:     'Manejo de Conflictos',
    rutaId:     'liderazgo',
    rutaNombre: 'Liderazgo y Supervisión',
    duracion:   '12 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Líderes, supervisores y coordinadores que gestionan equipos con fricciones o alta rotación.',
      'Profesionistas que frecuentemente enfrentan situaciones de tensión en su trabajo.',
      'Áreas de RH que implementan programas de clima organizacional.',
    ],
    logros: [
      'Resolverás disputas en tu equipo antes de que escalen a problemas que dañen el clima laboral o generen rotación costosa.',
      'Manejarás tus propias emociones en situaciones de presión — lo que te distingue como un líder maduro y confiable.',
      'Mediarás entre personas en conflicto con metodología probada, no con improvisación que generalmente empeora las cosas.',
      'Transformarás el conflicto en información útil para mejorar los procesos y la comunicación de tu equipo.',
      'Serás la persona a quien acuden cuando hay un problema interpersonal en la organización — un valor diferencial enorme en cualquier empresa.',
    ],
    temario: [
      {
        titulo: 'Naturaleza del conflicto',
        temas: ['Tipos y causas del conflicto laboral', 'Conflicto constructivo vs. destructivo', 'Estilos de manejo del conflicto (Thomas-Kilmann)', 'Escalada y desescalada del conflicto'],
      },
      {
        titulo: 'Herramientas de resolución',
        temas: ['Mediación: proceso y técnicas', 'Negociación integradora (ganar-ganar)', 'Comunicación no violenta (CNV)', 'Acuerdos y seguimiento post-conflicto'],
      },
      {
        titulo: 'Gestión emocional y prevención',
        temas: ['Inteligencia emocional aplicada al conflicto', 'Autoregulación en situaciones de tensión', 'Clima laboral y prevención del conflicto', 'Protocolos internos de manejo de quejas'],
      },
    ],
    waMsg: waCurso('Manejo de Conflictos'),
  },

  {
    slug:       'trabajo-en-equipo',
    nombre:     'Trabajo en Equipo',
    rutaId:     'liderazgo',
    rutaNombre: 'Liderazgo y Supervisión',
    duracion:   '12 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Equipos de trabajo que necesitan mejorar su colaboración y resultados colectivos.',
      'Líderes que quieren transformar grupos de personas en verdaderos equipos.',
      'Profesionistas que participan en proyectos multidisciplinarios.',
    ],
    logros: [
      'Transformarás un grupo de personas que trabajan juntas en un equipo que se apoya genuinamente y genera resultados colectivos.',
      'Construirás confianza entre los integrantes — la base sin la cual ningún método de trabajo funciona a largo plazo.',
      'Definirás roles claros que eliminan la duplicación de esfuerzos y los "yo pensé que lo hacía el otro".',
      'Mejorarás la toma de decisiones grupales, reduciendo el tiempo perdido en reuniones que no llegan a acuerdos.',
      'Generarás un ambiente donde las personas quieren colaborar — lo que impacta directamente en productividad y retención de talento.',
    ],
    temario: [
      {
        titulo: 'Equipos de alto rendimiento',
        temas: ['Grupo vs. equipo: diferencias clave', 'Modelo de Tuckman: etapas del equipo', 'Características de los equipos efectivos', 'Disfunciones del equipo (Lencioni)'],
      },
      {
        titulo: 'Colaboración y roles',
        temas: ['Roles de equipo (Belbin)', 'Complementariedad y diversidad', 'Acuerdos de equipo y normas de convivencia', 'Toma de decisiones grupal'],
      },
      {
        titulo: 'Cohesión y resultados',
        temas: ['Confianza: cómo construirla y protegerla', 'Resolución de fricciones internas', 'Celebración de logros y retroalimentación colectiva', 'Métricas de desempeño del equipo'],
      },
    ],
    waMsg: waCurso('Trabajo en Equipo'),
  },

  // ── RUTA: EMPLEO ADMINISTRATIVO ──────────────────────────────────────────────

  {
    slug:       'excel-administrativo',
    nombre:     'Excel para Trabajo Administrativo',
    rutaId:     'admin',
    rutaNombre: 'Empleo Administrativo',
    duracion:   '16 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Personas que buscan su primer empleo administrativo y necesitan Excel en su CV.',
      'Profesionistas que usan Excel a nivel muy básico y quieren mejorar su perfil.',
      'Quienes regresan al mercado laboral y necesitan actualizar sus habilidades digitales.',
    ],
    logros: [
      'Tendrás el manejo de Excel que cualquier empresa pide en sus ofertas de trabajo — y podrás demostrarlo desde el primer día.',
      'Crearás reportes y formatos que demuestran tu nivel de preparación sin necesidad de explicarlo con palabras.',
      'Dejarás de depender de otros para tareas básicas que hoy te frenan en el trabajo o en las entrevistas.',
      'Agregarás Excel como habilidad verificable en tu CV, diferenciándote de los candidatos que solo dicen que lo manejan.',
      'Tendrás la base que te permite avanzar al nivel intermedio cuando decidas crecer más en tu carrera.',
    ],
    temario: [
      {
        titulo: 'Excel en el trabajo de oficina',
        temas: ['Interfaz y navegación básica', 'Creación y formato de tablas profesionales', 'Fórmulas esenciales: SUMA, PROMEDIO, SI', 'Impresión y configuración de documentos'],
      },
      {
        titulo: 'Organización de información',
        temas: ['Ordenar y filtrar datos', 'Formato condicional para resaltar información', 'Gráficas simples para reportes', 'Plantillas de uso administrativo común'],
      },
    ],
    waMsg: waCurso('Excel para Trabajo Administrativo'),
  },

  {
    slug:       'outlook',
    nombre:     'Outlook y Correo Profesional',
    rutaId:     'admin',
    rutaNombre: 'Empleo Administrativo',
    duracion:   '10 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Personas que usarán correo electrónico corporativo por primera vez.',
      'Profesionistas que quieren mejorar su gestión del correo y el calendario.',
      'Asistentes y personal administrativo que coordinan agendas y reuniones.',
    ],
    logros: [
      'Gestionarás tu correo, calendario y tareas con la eficiencia que separa a los profesionistas organizados de los que siempre van tarde.',
      'Proyectarás imagen profesional desde el primer mensaje que envíes — los correos mal redactados o formateados tienen un costo real en la percepción laboral.',
      'Coordinarás reuniones, citas y seguimientos sin los olvidos que generan fricciones con clientes, proveedores o compañeros.',
      'Dominarás la herramienta de productividad más usada en empresas mexicanas — un requisito en casi cualquier puesto administrativo.',
      'Trabajarás integrado con el ecosistema Microsoft 365, lo que aumenta tu adaptabilidad en cualquier empresa que te contrate.',
    ],
    temario: [
      {
        titulo: 'Gestión del correo electrónico',
        temas: ['Configuración y personalización de Outlook', 'Redacción profesional de correos', 'Organización: carpetas, reglas y categorías', 'Bandeja de entrada cero: técnica y hábito'],
      },
      {
        titulo: 'Calendario y productividad',
        temas: ['Agenda de reuniones y citas', 'Invitaciones y respuestas', 'Tareas y recordatorios', 'Integración con Teams y otras apps de Microsoft 365'],
      },
    ],
    waMsg: waCurso('Outlook y Correo Profesional'),
  },

  {
    slug:       'gestion-tiempo',
    nombre:     'Gestión del Tiempo',
    rutaId:     'admin',
    rutaNombre: 'Empleo Administrativo',
    duracion:   '10 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Profesionistas que sienten que el tiempo nunca les alcanza.',
      'Personal administrativo con múltiples tareas simultáneas.',
      'Personas que quieren ser más productivas sin trabajar más horas.',
    ],
    logros: [
      'Recuperarás el control sobre tu día de trabajo — en lugar de reaccionar a todo, planearás y ejecutarás con intención.',
      'Entregarás más resultados en menos horas, sin la culpa de sentir que siempre te falta tiempo.',
      'Reducirás el estrés que viene de sentir que nunca terminas lo importante porque lo urgente siempre interrumpe.',
      'Aprenderás a decir no con asertividad, protegiendo tu tiempo sin dañar las relaciones laborales que importan.',
      'Te posicionarás como alguien confiable y organizado — una reputación que abre puertas a más responsabilidades y reconocimiento.',
    ],
    temario: [
      {
        titulo: 'Diagnóstico y fundamentos',
        temas: ['Autodiagnóstico de gestión del tiempo', 'Ladrones de tiempo: identificación y manejo', 'Urgente vs. importante: Matriz de Eisenhower', 'Ley de Parkinson y concentración en resultados'],
      },
      {
        titulo: 'Sistemas y hábitos de productividad',
        temas: ['Planeación semanal efectiva', 'Técnica Pomodoro y bloques de tiempo', 'Gestión de interrupciones y multitasking', 'Herramientas digitales de organización personal'],
      },
    ],
    waMsg: waCurso('Gestión del Tiempo'),
  },

  {
    slug:       'organizacion-administrativa',
    nombre:     'Organización Administrativa',
    rutaId:     'admin',
    rutaNombre: 'Empleo Administrativo',
    duracion:   '16 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Asistentes administrativos y recepcionistas que quieren profesionalizar su trabajo.',
      'Personal de oficina que gestiona archivos, proveedores y procesos internos.',
      'Personas que buscan su primer empleo administrativo y quieren destacar.',
    ],
    logros: [
      'Tendrás procesos claros para gestionar documentos, proveedores y agenda — dejando de improvisar cuando más se te necesita.',
      'Proyectarás un perfil profesional sólido desde el primer día en cualquier empresa, sin importar su tamaño o giro.',
      'Serás la persona en quien la dirección confía para mantener el orden operativo de la oficina — un rol de alto valor real.',
      'Dominarás la redacción de documentos administrativos que reflejan profesionalismo y atención al detalle.',
      'Consolidarás tu perfil como asistente o coordinador administrativo — uno de los puestos más estables del mercado laboral formal.',
    ],
    temario: [
      {
        titulo: 'Administración de documentos e información',
        temas: ['Sistemas de archivo físico y digital', 'Gestión documental: clasificación y resguardo', 'Redacción de documentos administrativos', 'Manejo de información confidencial'],
      },
      {
        titulo: 'Procesos administrativos de oficina',
        temas: ['Proceso de compras y control de proveedores', 'Inventario básico de papelería y suministros', 'Coordinación de reuniones y eventos', 'Agenda ejecutiva: gestión y seguimiento'],
      },
    ],
    waMsg: waCurso('Organización Administrativa'),
  },

  {
    slug:       'herramientas-digitales',
    nombre:     'Herramientas Digitales para la Oficina',
    rutaId:     'admin',
    rutaNombre: 'Empleo Administrativo',
    duracion:   '12 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Personas que necesitan actualizarse en el uso de herramientas digitales de oficina.',
      'Profesionistas que usan pocas herramientas digitales y quieren ampliar su perfil.',
      'Quienes regresan al mercado laboral y necesitan conocer las apps que las empresas usan hoy.',
    ],
    logros: [
      'Trabajarás con fluidez en el ecosistema digital que usan las empresas hoy — sin la curva de aprendizaje que frena a muchos al entrar.',
      'Colaborarás en la nube de forma eficiente, contribuyendo a proyectos en equipo sin importar si estás en oficina o en remoto.',
      'Demostrarás adaptabilidad digital — la habilidad que más valoran los empleadores en el mercado laboral actual.',
      'Reducirás el tiempo que pierdes buscando archivos, enviando versiones equivocadas o trabajando sin coordinación con tu equipo.',
      'Tendrás el perfil digital que cualquier empresa busca contratar hoy, diferenciándote en entrevistas con habilidades reales y verificables.',
    ],
    temario: [
      {
        titulo: 'Microsoft 365 en la oficina',
        temas: ['Word: documentos profesionales', 'Excel: fundamentos de uso laboral', 'Outlook: correo y calendario corporativo', 'Teams: reuniones y chat de equipo'],
      },
      {
        titulo: 'Colaboración y productividad en la nube',
        temas: ['OneDrive y Google Drive: almacenamiento y compartir archivos', 'Documentos colaborativos en tiempo real', 'Herramientas de gestión de tareas', 'Seguridad digital básica: contraseñas y phishing'],
      },
    ],
    waMsg: waCurso('Herramientas Digitales para la Oficina'),
  },

  // ── RUTA: VENTAS Y ATENCIÓN ──────────────────────────────────────────────────

  {
    slug:       'atencion-cliente',
    nombre:     'Atención al Cliente de Alto Impacto',
    rutaId:     'ventas',
    rutaNombre: 'Ventas y Atención al Cliente',
    duracion:   '16 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Personal de atención al cliente, recepción y call center que trata con usuarios o compradores.',
      'Vendedores y asesores comerciales que quieren mejorar su relación con el cliente.',
      'Supervisores de áreas de servicio que quieren elevar el estándar de su equipo.',
    ],
    logros: [
      'Convertirás situaciones de queja o insatisfacción en experiencias positivas que generan lealtad — la habilidad más valiosa en cualquier área de servicio.',
      'Manejarás clientes difíciles sin perder la calma ni comprometer los estándares de la empresa.',
      'Dominarás la comunicación empática que transforma interacciones frías en relaciones de confianza con impacto real en ventas y retención.',
      'Aplicarás protocolos de atención que elevan la percepción de calidad de tu empresa sin importar el canal (presencial, teléfono, chat).',
      'Posicionarás tu perfil como un profesionista de servicio al cliente con metodología real — el tipo de persona que las empresas buscan retener.',
    ],
    temario: [
      {
        titulo: 'Fundamentos del servicio al cliente',
        temas: ['Qué es y qué no es atención al cliente de calidad', 'El cliente interno y externo', 'Momentos de verdad: impacto en la percepción de marca', 'Expectativas del cliente moderno en México'],
      },
      {
        titulo: 'Comunicación y manejo de situaciones',
        temas: ['Comunicación empática y escucha activa', 'Manejo de quejas y reclamaciones', 'Clientes difíciles: tipología y técnicas', 'Lenguaje verbal y no verbal en el servicio'],
      },
      {
        titulo: 'Calidad de servicio y seguimiento',
        temas: ['Protocolos de atención multicanal', 'Métricas de satisfacción: NPS, CSAT', 'Manejo de tiempos de respuesta', 'Fidelización: del cliente satisfecho al cliente leal'],
      },
    ],
    waMsg: waCurso('Atención al Cliente de Alto Impacto'),
  },

  {
    slug:       'ventas-negociacion',
    nombre:     'Técnicas de Venta y Negociación',
    rutaId:     'ventas',
    rutaNombre: 'Ventas y Atención al Cliente',
    duracion:   '20 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Vendedores y asesores comerciales que quieren mejorar sus resultados con metodología.',
      'Personas que están iniciando en ventas y necesitan bases sólidas.',
      'Emprendedores y dueños de negocio que venden directamente sus productos o servicios.',
    ],
    logros: [
      'Cerrarás más ventas con un proceso estructurado — en lugar de depender del carisma o la suerte que no escalan.',
      'Manejarás objeciones con confianza y técnica, convirtiendo el "no" en una oportunidad de retomar el proceso.',
      'Negociarás condiciones con clientes y proveedores protegiendo el margen sin perder la relación comercial.',
      'Diagnosticarás las necesidades reales del cliente antes de presentar cualquier propuesta — la diferencia entre vender y empujar.',
      'Construirás una cartera de clientes fidelizados que compran de forma recurrente y te recomiendan activamente.',
    ],
    temario: [
      {
        titulo: 'Proceso de ventas consultivo',
        temas: ['El embudo de ventas: etapas y métricas', 'Prospección y calificación de clientes', 'Diagnóstico de necesidades: preguntas SPIN', 'Presentación de valor: beneficios vs. características'],
      },
      {
        titulo: 'Manejo de objeciones y cierre',
        temas: ['Tipos de objeciones y cómo clasificarlas', 'Técnicas de respuesta a objeciones', 'Señales de compra: cuándo y cómo cerrar', 'Técnicas de cierre aplicadas al mercado mexicano'],
      },
      {
        titulo: 'Negociación comercial',
        temas: ['Principios de negociación ganar-ganar', 'Preparación y estrategia de negociación', 'Manejo de presión, descuentos y plazos', 'Seguimiento postventa y fidelización'],
      },
    ],
    waMsg: waCurso('Técnicas de Venta y Negociación'),
  },

  // ── NUEVOS CURSOS — DATOS Y ADMIN ─────────────────────────────────────────────

  {
    slug:       'python',
    nombre:     'Python para Análisis de Datos',
    rutaId:     'datos',
    rutaNombre: 'Analista de Datos',
    duracion:   '24 horas',
    modalidades: ['Online en Vivo'],
    dirigidoA: [
      'Profesionistas de datos que ya manejan Excel y Power BI y quieren dar el salto a programación.',
      'Analistas que necesitan automatizar tareas repetitivas y manejar grandes volúmenes de datos.',
      'Personas sin experiencia en programación que quieren entrar al campo de la ciencia de datos.',
    ],
    logros: [
      'Automatizarás procesos que hoy hacen manualmente, liberando horas de trabajo repetitivo cada semana.',
      'Manejarás bases de datos de cualquier tamaño con Pandas — sin las limitaciones que Excel impone desde las 100,000 filas.',
      'Crearás visualizaciones de datos con código que puedes personalizar completamente, a diferencia de las opciones predefinidas de Excel.',
      'Abrirás la puerta a roles de Data Analyst, Data Scientist y Machine Learning — los perfiles tecnológicos mejor pagados del mercado.',
      'Demostrarás en entrevistas una habilidad técnica real con portafolio de proyectos — algo que muy pocos candidatos pueden mostrar.',
    ],
    temario: [
      {
        titulo: 'Fundamentos de Python',
        temas: ['Instalación de Python y Jupyter Notebook', 'Variables, tipos de datos y operadores', 'Listas, diccionarios y estructuras de control', 'Funciones y módulos básicos'],
      },
      {
        titulo: 'Análisis de datos con Pandas',
        temas: ['DataFrames: creación y manipulación', 'Limpieza de datos: valores nulos, duplicados y tipos', 'Agrupaciones, filtros y funciones de agregación', 'Lectura y escritura de archivos Excel y CSV'],
      },
      {
        titulo: 'Visualización con Matplotlib y Seaborn',
        temas: ['Gráficas básicas: línea, barra y dispersión', 'Personalización de visualizaciones', 'Análisis exploratorio de datos (EDA)', 'Presentación de hallazgos con gráficas de calidad'],
      },
    ],
    waMsg: waCurso('Python para Análisis de Datos'),
  },

  {
    slug:       'administracion-personal-lft',
    nombre:     'Administración de Personal y LFT',
    rutaId:     'rrhh',
    rutaNombre: 'Recursos Humanos',
    duracion:   '20 horas',
    modalidades: ['Presencial', 'Online en Vivo', 'In Company'],
    dirigidoA: [
      'Profesionistas de RH que gestionan contrataciones, bajas y expedientes de personal.',
      'Administradores y dueños de negocio que necesitan conocer sus obligaciones laborales.',
      'Supervisores que toman decisiones sobre su equipo y quieren hacerlo dentro de la ley.',
    ],
    logros: [
      'Contratarás, ajustarás y darás de baja personal correctamente — protegiendo a tu empresa de demandas laborales que pueden ser devastadoras.',
      'Elaborarás contratos, políticas y reglamentos internos que realmente protegen a la organización dentro del marco de la LFT.',
      'Gestionarás incapacidades, permisos, vacaciones y finiquitos con seguridad legal y sin improvisación costosa.',
      'Conocerás los derechos de los trabajadores que más frecuentemente se violan por desconocimiento — y cómo evitarlo.',
      'Fortalecerás tu perfil como profesionista de RH con formación legal aplicada, uno de los más solicitados por las empresas.',
    ],
    temario: [
      {
        titulo: 'Marco legal: Ley Federal del Trabajo',
        temas: ['Sujetos del derecho laboral: patrón, trabajador y empresa', 'Tipos de relaciones de trabajo y contratos', 'Obligaciones del patrón y derechos del trabajador', 'Reglamento Interior de Trabajo: contenido y registro'],
      },
      {
        titulo: 'Gestión del ciclo de vida del empleado',
        temas: ['Proceso de contratación legal: documentos y plazos', 'Modificaciones a las condiciones de trabajo', 'Vacaciones, días de descanso y permisos', 'Incapacidades: IMSS y descuentos en nómina'],
      },
      {
        titulo: 'Terminación laboral y riesgos',
        temas: ['Causas de rescisión: artículos 46 y 47 LFT', 'Finiquito vs. liquidación: cálculo y diferencias', 'Actas administrativas: redacción y requisitos', 'Inspecciones de la STPS: cómo prepararse'],
      },
    ],
    waMsg: waCurso('Administración de Personal y LFT'),
  },

  {
    slug:       'word',
    nombre:     'Word para el Trabajo Profesional',
    rutaId:     'admin',
    rutaNombre: 'Empleo Administrativo',
    duracion:   '12 horas',
    modalidades: ['Presencial', 'Online en Vivo'],
    dirigidoA: [
      'Personas que usan Word de forma básica y quieren elaborar documentos de apariencia profesional.',
      'Asistentes administrativos que redactan oficios, informes y reportes en su trabajo diario.',
      'Quienes buscan empleo y necesitan Word como habilidad verificable en su CV.',
    ],
    logros: [
      'Crearás documentos con apariencia profesional que reflejan el nivel de cuidado y preparación que espera cualquier empresa.',
      'Eliminarás el tiempo que pierdes dando formato manualmente — usando estilos y plantillas que hacen el trabajo en segundos.',
      'Redactarás oficios, informes y reportes con la estructura correcta para cada tipo de documento administrativo.',
      'Dominarás funciones avanzadas como combinación de correspondencia, tablas de contenido y control de cambios — habilidades que muy pocos conocen.',
      'Tendrás Word como competencia demostrable, no solo declarada en tu CV — lo que marca la diferencia en cualquier proceso de selección.',
    ],
    temario: [
      {
        titulo: 'Documentos profesionales en Word',
        temas: ['Configuración de página y márgenes', 'Estilos y jerarquía de títulos', 'Tablas: creación y formato', 'Encabezados, pies de página y numeración'],
      },
      {
        titulo: 'Funciones de productividad avanzada',
        temas: ['Tabla de contenido automática', 'Combinación de correspondencia (mailing)', 'Control de cambios y comentarios', 'Plantillas reutilizables y documentos maestros'],
      },
    ],
    waMsg: waCurso('Word para el Trabajo Profesional'),
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getCursoBySlug(slug: string): Curso | undefined {
  return cursos.find((c) => c.slug === slug)
}

export function getCursosByRuta(rutaId: string): Curso[] {
  return cursos.filter((c) => c.rutaId === rutaId)
}

export const slugPorNombre: Record<string, string> = {
  'Excel Básico':                         'excel-basico',
  'Excel Intermedio':                     'excel-intermedio',
  'Excel Avanzado':                       'excel-avanzado',
  'Power BI':                             'power-bi',
  'IA aplicada al análisis de datos':     'ia-analisis-datos',
  'Reclutamiento y Selección':            'reclutamiento-seleccion',
  'Nóminas':                              'nominas-imss',
  'Nóminas y IMSS':                       'nominas-imss',
  'Desarrollo Organizacional':            'desarrollo-organizacional',
  'Liderazgo':                            'liderazgo',
  'NOM-035':                              'nom-035',
  'Contabilidad para No Contadores':      'contabilidad-no-contadores',
  'CFDI':                                 'cfdi',
  'Impuestos':                            'impuestos',
  'Reformas Fiscales':                    'reformas-fiscales',
  'Finanzas Empresariales':               'finanzas-empresariales',
  'Comunicación Efectiva':                'comunicacion-efectiva',
  'Supervisión Efectiva':                 'supervision-efectiva',
  'Manejo de Conflictos':                 'manejo-conflictos',
  'Trabajo en Equipo':                    'trabajo-en-equipo',
  'Excel':                                'excel-administrativo',
  'Outlook':                              'outlook',
  'Gestión del Tiempo':                   'gestion-tiempo',
  'Organización Administrativa':          'organizacion-administrativa',
  'Herramientas Digitales':               'herramientas-digitales',
  'Atención al Cliente':                  'atencion-cliente',
  'Ventas y Negociación':                 'ventas-negociacion',
  'Técnicas de Venta':                    'ventas-negociacion',
  'Python':                               'python',
  'Python para Análisis de Datos':        'python',
  'Administración de Personal':           'administracion-personal-lft',
  'LFT':                                  'administracion-personal-lft',
  'Word':                                 'word',
  'Word Profesional':                     'word',
}
