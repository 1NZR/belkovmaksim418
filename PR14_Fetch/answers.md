# Ответы на вопросы ПР №14

1. Fetch — промис-based, современный; XHR — устаревший, callback.
2. Fetch не отклоняет промис при HTTP 404 — нужно проверять res.ok.
3. GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS.
4. Заголовки: Content-Type, Authorization, Accept, X-Custom-Header.
5. PUT заменяет ресурс целиком, PATCH — частично.
6. Basic Auth (btoa), Bearer Token, OAuth2.
7. AbortController + signal.
8. JSON — res.json(), FormData — formData(), Blob — res.blob(), ArrayBuffer — res.arrayBuffer().
9. Promise.all для параллельных, кэш в Map.
10. Обёртки, retry, timeout, обработка ошибок.