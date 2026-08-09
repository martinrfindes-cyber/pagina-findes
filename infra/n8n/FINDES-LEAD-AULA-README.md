# Workflow n8n — FINDES-LEAD-AULA

Lleva los leads del **formulario de renta de aulas** (hero de `/renta-de-aulas`)
al **dashboard del CRM** (`https://findes-crm-dashboard.7yidoh.easypanel.host`).

- **Archivo:** [`FINDES-LEAD-AULA.json`](./FINDES-LEAD-AULA.json)
- **Instancia n8n:** `https://n8n-n8n.7yidoh.easypanel.host`
- **ID del workflow:** `exWAKFBPx2DafL2X` (activo desde el 8/ago/2026)
- **Webhook (producción):** `POST https://n8n-n8n.7yidoh.easypanel.host/webhook/findes-lead-aula`
- **Credencial que usa:** `Chatwoot FINDES admin (martin)` (httpHeaderAuth, id `8RROUEbNisEU6Se9`)

## Por qué pasa por Chatwoot

El dashboard **no tiene base propia**: lee conversaciones de Chatwoot
(cuenta `2`, bandeja `Findes_Web` = inbox `1`) y de ahí saca nombre, correo,
teléfono y la temperatura del lead. Así que "meter un lead al CRM" es, en la
práctica, **crear un contacto + una conversación + un mensaje** en Chatwoot.

El lead entra con **75/100 → columna Caliente** (nombre 15 + correo 30 +
teléfono 30), que el dashboard toma de la **ficha del contacto**. El mensaje
repite los datos en texto plano para el humano que lo lee.

## Flujo (9 nodos, en línea)

| # | Nodo | Qué hace |
|---|------|----------|
| 1 | **Webhook formulario aulas** | `POST /webhook/findes-lead-aula`. Responde 200 de inmediato (`onReceived`): la persona no espera. |
| 2 | **Preparar lead** (Code) | Normaliza campos, arma el teléfono en E.164 (`+52…`), formatea la fecha y redacta el mensaje. Si no hay correo ni teléfono, corta. |
| 3 | **Crear contacto** (HTTP) | `POST /contacts` con `inbox_id: 1`. Va con `onError: continuar` porque Chatwoot devuelve **422** si el correo **o el teléfono** ya existen. |
| 4 | **Buscar por correo** (HTTP) | `GET /contacts/search?q=<correo>`. |
| 5 | **Buscar por teléfono** (HTTP) | Igual pero con los 10 dígitos. Hacen falta las **dos**: el choque puede venir de cualquiera de los dos campos. |
| 6 | **Resolver contacto** (Code) | Se queda con el `contact_id` que haya salido y arma el `parche` de la ficha. Si no hay ninguno, lanza error visible en n8n. |
| 7 | **Actualizar contacto** (HTTP) | `PUT /contacts/{id}` con el parche. **Solo rellena lo que falta**: si el contacto ya existía con nombre o correo, no se los pisa. |
| 8 | **Crear conversación** (HTTP) | `POST /conversations` en el inbox 1, con los datos del formulario en `custom_attributes`. |
| 9 | **Mandar mensaje al CRM** (HTTP) | `POST /conversations/{id}/messages` con el resumen del formulario. |

Un lead repetido (mismo correo o teléfono) **no duplica el contacto**: reusa el
existente y le cuelga una conversación nueva por cada solicitud.

## Cómo se conecta con la página

`components/FormularioRentaAula.tsx` → `POST /api/lead-aula` (mismo origen) →
`app/api/lead-aula/route.ts` → webhook de n8n.

Se hace del lado del servidor para que la URL del webhook **no viaje en el
bundle público** y para no depender de CORS. La ruta necesita una variable de
entorno en Easypanel:

```
N8N_LEAD_WEBHOOK_URL=https://n8n-n8n.7yidoh.easypanel.host/webhook/findes-lead-aula
```

Si la variable falta, el sitio **no se rompe**: registra un warning y el lead
sigue yéndose por WhatsApp.

## Importar

**UI:** n8n → *Workflows* → *Import from File* → elegir el JSON → confirmar que
los 5 nodos HTTP tienen la credencial `Chatwoot FINDES admin (martin)` →
**Publicar** (no basta con guardar).

**API pública:**

```bash
curl -X POST https://n8n-n8n.7yidoh.easypanel.host/api/v1/workflows \
  -H "X-N8N-API-KEY: <key>" -H "Content-Type: application/json" \
  --data-binary @FINDES-LEAD-AULA.json
```

Después hay que activarlo: `POST /api/v1/workflows/<id>/activate`.

## Probarlo

```bash
curl -X POST https://n8n-n8n.7yidoh.easypanel.host/webhook/findes-lead-aula \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Prueba SA","celular":"5512345678","correo":"prueba@ejemplo.com","personas":"16 a 30","fecha":"2026-09-15","duracion":"Día completo","notas":"Coffee break"}'
```

Debe aparecer un lead nuevo en el dashboard, en la columna **Caliente**.
Para borrarlo, el propio tablero tiene el botón de eliminar.

## Gotchas (todos aprendidos a golpes en la integración)

- **El mensaje NO puede ser `incoming`.** Chatwoot responde
  *"Incoming messages are only allowed in Api inboxes"*: la bandeja del dashboard
  es de tipo **Website**, no API. Por eso va como `outgoing`. No se pierde nada
  porque el score sale de la ficha del contacto, que el nodo 7 deja completa.
  Si algún día se quisiera un mensaje de visitante de verdad, habría que crear
  una bandeja tipo **API** y enseñarle al dashboard a leer más de un inbox
  (hoy `CHATWOOT_INBOX_ID` acepta uno solo).
- **El 422 al crear contacto llega por dos vías**, correo *y* teléfono
  (`Phone number has already been taken`). Por eso hay dos búsquedas.
- **Nunca pisar la ficha de un contacto que ya existía.** El nodo 7 solo rellena
  huecos: si el contacto ya se llamaba "Laura", el formulario no la renombra.
- **El teléfono necesita formato E.164** (`+525512345678`) o Chatwoot responde 422.
- **La conversación queda en `pending`, no en `open`**, aunque se pida `open`:
  la bandeja tiene el agent bot conectado. No es problema — el dashboard lista
  todos los estados.
- **Publicar, no solo guardar.** Un workflow guardado en borrador no atiende el
  webhook (mismo error que ya nos pasó con el bot, ver la nota de troubleshooting).
- La URL de pruebas (`/webhook-test/…`) solo vive mientras le das *Test workflow*
  en la UI; la del sitio es la de producción (`/webhook/…`).
- Al probar con `curl` desde la consola de Windows los acentos llegan rotos
  (`Duración` → `Duraci�n`). Es de la consola, no del workflow: mandando un
  archivo UTF-8 con `--data-binary @lead.json` salen bien.
