# Respaldo del workflow de n8n — PAG-FIND-CHATWOOT

Backup versionado del workflow que corre el **chatbot de la página FINDES** y la
**captación de leads** hacia Chatwoot, Twenty CRM y Telegram.

- **Archivo:** [`PAG-FIND-CHATWOOT.json`](./PAG-FIND-CHATWOOT.json)
- **Instancia n8n:** `https://n8n-n8n.7yidoh.easypanel.host` (Easypanel)
- **ID del workflow:** `7L8AIEufiiKI3R3G`

> [!] **Estado actual (jul 2026): la rama de Twenty + Telegram está PAUSADA.**
> El CRM de base es el dashboard `findes-crm-dashboard` + Google Sheet; Twenty es
> solo demo para clientes. La rama sigue en el JSON (nodos `TW: *`) pero
> **desconectada**: no hay conexión `Traer historial → TW: preparar lead`.
> **Para re-activarla:** agregar de nuevo el destino
> `{ "node": "TW: preparar lead", "type": "main", "index": 0 }` dentro de
> `connections["Traer historial"].main[0]` (junto a `Extraer datos del lead`),
> luego `PUT` + `activate`. El bot y la sync a Chatwoot siguen activos siempre.

## Qué hace

Cuando entra un mensaje desde el chat de la web (webhook de Chatwoot):

1. 🤖 **Agente IA** (OpenAI) responde usando el catálogo de cursos.
2. 📇 Escribe nombre / teléfono / correo en el **contacto de Chatwoot**.
3. 🗂️ Crea/actualiza la **Persona + Empresa** en **Twenty CRM** (dedup por
   correo o teléfono; no duplica).
4. 📲 Si es un **lead nuevo**, manda un aviso a **Telegram** (bot AVISO FINDES).

## Cómo restaurar

> ⚠️ El JSON **no** incluye los tokens (las credenciales viven encriptadas en
> n8n y se referencian por `id`+`nombre`). Al reimportar en otra instancia hay
> que **volver a crear/mapear las credenciales**:
> `OpenAi account`, `Chatwoot FINDES (api_access_token)`,
> `Chatwoot FINDES admin (martin)`, `Twenty API (n8n-leads)`, `AVISO FINDES`.

**Opción A — UI:** n8n → *Workflows* → *Import from File* → elegir el JSON →
remapear credenciales → **Publicar** (activar).

**Opción B — API pública:**

```bash
curl -X PUT "https://n8n-n8n.7yidoh.easypanel.host/api/v1/workflows/7L8AIEufiiKI3R3G" \
  -H "X-N8N-API-KEY: <TU_API_KEY>" -H "Content-Type: application/json" \
  --data-binary @PAG-FIND-CHATWOOT.json
curl -X POST "https://n8n-n8n.7yidoh.easypanel.host/api/v1/workflows/7L8AIEufiiKI3R3G/activate" \
  -H "X-N8N-API-KEY: <TU_API_KEY>"
```

> Nota: la API pública rechaza `settings` con propiedades extra; por eso el
> backup sólo conserva `settings.executionOrder`.

## Para replicar con otro cliente

Cambiar en los nodos `TW: *`: la credencial de Twenty y, en `TW: aviso Telegram`,
el `chatId` (hoy apunta al chat de pruebas de Martín) y la credencial de Telegram.
