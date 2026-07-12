# MONITOR-AUTOMATIZAI (uptime)

Workflow de n8n que vigila que **automatizai.com.mx** y sus canales sigan arriba, avisa por **Telegram** si algo falla y **reactiva solo el chatbot** si se cae. Cubre el **nivel 1** (vigilar + avisar) para web/Chatwoot y el **nivel 2** (auto-arreglo acotado) para el chatbot.

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

## Auto-arreglo del chatbot (nivel 2)

Si el chequeo del bot da caído (404 = workflow inactivo/sin publicar), el monitor
**lo reactiva solo** por la API de n8n (`POST /workflows/cyATBuZhuVf222O4/activate`),
espera 5 s, vuelve a probar y avisa el resultado:

- ✅ *"El chatbot estaba caído; lo reactivé automáticamente y ya responde."*
- ⚠️ *"El chatbot SIGUE caído tras intentar reactivarlo — revísalo tú."* (causa más profunda).

Probado end-to-end (2026-07-12): se desactivó el bot real, el monitor lo detectó,
lo reactivó y confirmó webhook 200. Reactivar es **acotado y reversible** (no reescribe
nada). Web/Chatwoot siguen en modo solo-aviso (reiniciar Easypanel sería otro paso, con token propio).

## Flujo de nodos

`Cada 3 horas` → `Revisar web` → `Revisar Chatwoot` → `Revisar bot (webhook)` → `¿Bot caído?`
- si **NO**: → `Evaluar (Code)` → `Enviar alerta Telegram`
- si **SÍ**: → `Reactivar bot` → `Esperar 5s` → `Re-revisar bot` → `Evaluar` → `Enviar alerta Telegram`

- Los nodos HTTP usan `neverError` + `onError: continueRegularOutput` + `timeout 15s`,
  para que **una caída total** (DNS/timeout) también dispare alerta en vez de romper el workflow.
- **Evaluar (Code):** junta los estados (y si hubo intento de arreglo, su resultado).
  Si todo está sano devuelve `[]` (no manda nada). Si algo falla o se auto-arregló,
  arma el texto y lo pasa a Telegram.
- **Reactivar bot:** HTTP a la API de n8n con credencial **Header Auth**
  `n8n API (monitor auto-fix)` (`X-N8N-API-KEY`). Esa API key **sí queda guardada**
  en n8n (dedicada; se puede rotar/borrar para quitarle el poder al monitor).
- **Enviar alerta Telegram:** `POST` a la API de Telegram (`sendMessage`),
  `parse_mode: Markdown`. Chat destino: `chat_id 938034114` (chat directo con
  el bot **@Alertas_AutomatizaiBot**, canal dedicado a alertas).

## Seguridad / notas

- El **token del bot de Telegram** va redactado en el JSON como
  `<TELEGRAM_BOT_TOKEN>`. Para reimportar, reemplázalo por el token real
  (BotFather → @Alertas_AutomatizaiBot). Se puede regenerar con `/revoke`.
- Los **chequeos** no necesitan la API key (el bot se comprueba por su webhook
  público). La API key **solo** la usa el paso de **auto-arreglo** (`Reactivar bot`),
  vía la credencial `n8n API (monitor auto-fix)`.
- Es **una sola API key dedicada** (nombre `monitor auto-fix`) que **NO se borra**:
  su valor vive en esa credencial. **Si borras esa key en Settings → n8n API, el
  auto-arreglo deja de funcionar** (esa es justo la forma de quitarle el poder al monitor).
  Es distinta de la key temporal del nivel 1, que sí se borró.
- WhatsApp **no** se vigila: en AutomatizAI es solo un enlace al celular de Martín,
  no un sistema con API (decisión documentada en [project_automatizai_chatbot]).

## Reimportar

Settings → n8n API para crear key temporal, o importar el JSON desde la UI
(Workflows → Import from File). Recuerda poner el token real y **publicar/activar**.
