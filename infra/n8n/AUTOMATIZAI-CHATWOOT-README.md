# Respaldo del workflow de n8n — AUTOMATIZAI-CHATWOOT

Backup versionado del workflow que corre el **chatbot del sitio AutomatizAI**
(automatizai.com.mx) y la **captación de leads** hacia Chatwoot. Es un clon del
bot de FINDES (`PAG-FIND-CHATWOOT`) **sin** la rama de Twenty CRM / Telegram ni
el tool de precios.

- **Archivo:** [`AUTOMATIZAI-CHATWOOT.json`](./AUTOMATIZAI-CHATWOOT.json)
- **Instancia n8n:** `https://n8n-n8n.7yidoh.easypanel.host` (Easypanel, la misma que FINDES)
- **ID del workflow:** `cyATBuZhuVf222O4`
- **Estado:** activo · 12 nodos · webhook path `986c1b30-4a2e-4ae1-80b3-bec54afd104c`

## Qué hace

Cuando entra un mensaje desde el chat de la web (webhook de Chatwoot, inbox 2):

1. 🤖 **AI Agent** (OpenAI, cuenta de AutomatizAI) responde con la persona de
   AutomatizAI y pide nombre / empresa / qué desea automatizar.
2. 📇 Extrae los datos del lead y los escribe en el **contacto de Chatwoot**
   (`Actualizar contacto en Chatwoot`).

## Debounce — agrupar mensajes en partes (jul 2026)

El visitante suele escribir en varios globos seguidos ("hola" / "tengo una
duda" / "sobre chatbots"). Antes el bot respondía a cada uno por separado. Ahora
la rama del `AI Agent` pasa por un patrón *Wait + debounce*:

```
Filter ─┬─► Traer historial → Extraer lead → Actualizar contacto   (rama lead, sin cambios)
        └─► Esperar (juntar) 8s → Historial (juntar) → Junta mensajes → AI Agent → responder
```

- **`Esperar (juntar)`** (nodo `Wait`, 8 s): al llegar un mensaje no responde de
  inmediato.
- **`Historial (juntar)`**: relee la conversación en Chatwoot tras la espera.
- **`Junta mensajes`** (nodo `Code`): compara por `id` de mensaje. Si mientras
  esperaba llegó otro mensaje entrante más nuevo, **esta ejecución se detiene**
  (`return []`); la del último mensaje será la que conteste, **juntando** todos
  los globos entrantes desde la última respuesta del bot (separados por `\n`) en
  un solo turno para el agente. Preserva `body` intacto (la memoria usa
  `conversation.id`), solo reescribe `body.content`.

Los 8 s se ajustan en el nodo `Esperar (juntar)` (`amount`). La rama de captación
de lead **no** pasa por el debounce (es idempotente: solo rellena campos vacíos).

El **formulario web** entra por otro camino (inbox 3 tipo API, vía la ruta
`app/api/lead/route.ts` del sitio), no por este workflow. Ambos leads se ven
juntos en el dashboard `findes-automatizai-crm`.

## Credenciales (NO van en el JSON)

> ⚠️ El JSON **no** incluye los tokens: las credenciales viven encriptadas en
> n8n y se referencian por `id`+`nombre`. Al reimportar en otra instancia hay
> que **volver a crear/mapear**:
>
> - `OpenAI AutomatizAI` (`iHv1bkAxAEnjRbsX`) — el gasto de IA cae en AutomatizAI.
> - `Chatwoot AutomatizAI (bot api_access_token)` (`N0vrn5JbpnLimAsv`) — el bot
>   firma con su marca.
> - `Chatwoot FINDES admin (martin)` (`8RROUEbNisEU6Se9`) — usada por
>   `Traer historial` y `Actualizar contacto` (misma cuenta 2 de Chatwoot).

## Cómo restaurar

**Opción A — UI:** n8n → *Workflows* → *Import from File* → elegir el JSON →
remapear credenciales → **Publicar** (activar).

**Opción B — API pública:**
`POST /api/v1/workflows` con el JSON (header `X-N8N-API-KEY`), luego
`POST /api/v1/workflows/{id}/activate`. La API key no se guarda en el repo;
se pide al usuario en cada sesión.

## Cómo se actualiza este respaldo

`GET https://n8n-n8n.7yidoh.easypanel.host/api/v1/workflows/cyATBuZhuVf222O4`
con el header `X-N8N-API-KEY`, se guarda el JSON con indentación y se commitea.
Rehacer cuando cambie el workflow en n8n.
