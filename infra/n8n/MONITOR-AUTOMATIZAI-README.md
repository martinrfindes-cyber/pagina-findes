# MONITOR-AUTOMATIZAI (uptime)

Workflow de n8n que vigila que **automatizai.com.mx** y sus canales sigan arriba, y avisa por **Telegram** si algo falla. Es el "nivel 1" (vigilar + avisar) del enfoque de auto-recuperación: NO arregla solo, solo detecta y notifica.

- **n8n id:** `tV8eLNKgZYn4ua25` · **activo**, corre **cada 3 horas**.
- **Instancia n8n:** `https://n8n-n8n.7yidoh.easypanel.host` (ver [reference_n8n_acceso]).

## Qué revisa (3 chequeos)

1. **Web** — `GET https://automatizai.com.mx` → debe responder 2xx/3xx.
2. **Chatwoot** — `GET https://findes-chatwoot.7yidoh.easypanel.host` → debe responder 2xx/3xx.
3. **Chatbot** — `POST` al webhook del workflow `AUTOMATIZAI-CHATWOOT`
   (`/webhook/986c1b30-4a2e-4ae1-80b3-bec54afd104c`) con un body "ping"
   (`{"message_type":"monitor_ping"}`) que **el propio Filtro descarta**:
   no gasta OpenAI ni toca conversaciones reales. Si el workflow está
   **inactivo / sin publicar**, el webhook devuelve **404** → se detecta como caída.
   (Esta es la falla clásica del bot "se queda pensando".)

## Flujo de nodos

`Cada 3 horas (schedule)` → `Revisar web` → `Revisar Chatwoot` → `Revisar bot (webhook)` → `Evaluar (Code)` → `Enviar alerta Telegram`

- Los 3 nodos HTTP usan `neverError` + `onError: continueRegularOutput` + `timeout 15s`,
  para que **una caída total** (DNS/timeout) también dispare alerta en vez de romper el workflow.
- **Evaluar (Code):** junta los 3 estados. Si todo está sano devuelve `[]`
  (no manda nada). Si algo falla, arma el texto y lo pasa a Telegram.
- **Enviar alerta Telegram:** `POST` a la API de Telegram (`sendMessage`),
  `parse_mode: Markdown`. Chat destino: `chat_id 938034114` (chat directo con
  el bot **@Alertas_AutomatizaiBot**, canal dedicado a alertas).

## Seguridad / notas

- El **token del bot de Telegram** va redactado en el JSON como
  `<TELEGRAM_BOT_TOKEN>`. Para reimportar, reemplázalo por el token real
  (BotFather → @Alertas_AutomatizaiBot). Se puede regenerar con `/revoke`.
- El monitor **no necesita la API key de n8n** para funcionar: comprueba el bot
  por su webhook público, no por la API. La API key solo se usó para crear/subir
  el workflow y se borra después (práctica de seguridad de Martín).
- WhatsApp **no** se vigila: en AutomatizAI es solo un enlace al celular de Martín,
  no un sistema con API (decisión documentada en [project_automatizai_chatbot]).

## Reimportar

Settings → n8n API para crear key temporal, o importar el JSON desde la UI
(Workflows → Import from File). Recuerda poner el token real y **publicar/activar**.
