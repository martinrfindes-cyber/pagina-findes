# findes-web

Sitio web de **FINDES** construido con [Next.js](https://nextjs.org/) 16 (App Router),
React 18 y Tailwind CSS. Incluye el chatbot de atención (widget de Chatwoot) cuyo
"cerebro" vive en n8n a través del Agent Bot de Chatwoot.

## Requisitos

- Node.js `>=20.9.0`
- npm

## Puesta en marcha (local)

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo en http://localhost:3000
```

Otros comandos:

```bash
npm run build      # build de producción
npm run start      # sirve el build en el puerto 3000
npm run lint       # revisa el código con ESLint
```

## Variables de entorno

El sitio funciona sin configuración: los valores del widget de Chatwoot ya vienen
por defecto en el código. Solo necesitas un `.env.local` si quieres sobreescribirlos
(por ejemplo, si cambias de instancia de Chatwoot). Consulta [`.env.example`](.env.example)
para ver las variables disponibles.

> El `NEXT_PUBLIC_CHATWOOT_TOKEN` es un *website token* público (viaja al navegador
> en el widget), **no es un secreto**.

## Despliegue

Se despliega en **Easypanel**, que construye el proyecto automáticamente a partir de
este repositorio (git). No requiere Dockerfile.

## Estructura

- `app/` — páginas y layouts (App Router)
- `components/` — componentes React (incl. `ChatwootWidget.tsx`)
- `public/` — recursos estáticos
