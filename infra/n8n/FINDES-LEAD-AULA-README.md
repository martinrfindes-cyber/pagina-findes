# Workflow n8n — FINDES-LEAD-AULA

Lleva los leads del **formulario de renta de aulas** (hero de `/renta-de-aulas`)
al **dashboard del CRM** (`https://findes-crm-dashboard.7yidoh.easypanel.host`).

- **Archivo:** [`FINDES-LEAD-AULA.json`](./FINDES-LEAD-AULA.json)
- **Instancia n8n:** `https://n8n-n8n.7yidoh.easypanel.host`
- **Webhook (producción):** `POST https://n8n-n8n.7yidoh.easypanel.host/webhook/findes-lead-aula`
- **Credencial que usa:** `Chatwoot FINDES admin (martin)` (httpHeaderAuth, id `8RROUEbNisEU6Se9`)

## Por qué pasa por Chatwoot

El dashboard **no tiene base propia**: lee conversaciones de Chatwoot
(cuenta `2`, bandeja `Findes_Web` = inbox `1`) y de ahí saca nombre, correo,
teléfono y la temperatura del lead. Así que "meter un lead al CRM" es, en la
práctica, **crear un contacto + una conversación + un mensaje** en Chatwoot.

El mensaje repite el correo y el teléfono en texto plano **a propósito**: el
scoring del dashboard los busca en los mensajes del visitante, no solo en la
ficha del contacto.

Con nombre + correo + teléfono el lead puntúa **79/100 → columna Caliente**.

## Flujo (7 nodos, en línea)

| # | Nodo | Qué hace |
|---|------|----------|
| 1 | **Webhook formulario aulas** | `POST /webhook/findes-lead-aula`. Responde 200 de inmediato (`onReceived`): la persona no espera. |
| 2 | **Preparar lead** (Code) | Normaliza campos, arma el teléfono en E.164 (`+52…`), formatea la fecha y redacta el mensaje. Si no hay correo ni teléfono, corta. |
| 3 | **Crear contacto** (HTTP) | `POST /contacts` con `inbox_id: 1`. Va con `onError: continuar` porque Chatwoot devuelve **422** si el correo ya existe. |
| 4 | **Buscar contacto** (HTTP) | `GET /contacts/search?q=<correo>`. Corre siempre; resuelve el caso del contacto repetido. |
| 5 | **Resolver contacto** (Code) | Se queda con el `contact_id` del que haya funcionado. Si ninguno, lanza error visible en n8n. |
| 6 | **Crear conversación** (HTTP) | `POST /conversations` en el inbox 1, `status: open`, con los datos del formulario en `custom_attributes`. |
| 7 | **Mandar mensaje al CRM** (HTTP) | `POST /conversations/{id}/messages` con `message_type: incoming` (tiene que ser *incoming* para que cuente como mensaje del visitante). |

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

## Gotchas

- **`message_type` debe ser `incoming`.** Si va como `outgoing`, el dashboard lo
  lee como mensaje del agente y el lead queda en 0 puntos.
- **El teléfono necesita formato E.164** (`+525512345678`) o Chatwoot responde 422.
- **Publicar, no solo guardar.** Un workflow guardado en borrador no atiende el
  webhook (mismo error que ya nos pasó con el bot, ver la nota de troubleshooting).
- La URL de pruebas (`/webhook-test/…`) solo vive mientras le das *Test workflow*
  en la UI; la del sitio es la de producción (`/webhook/…`).
