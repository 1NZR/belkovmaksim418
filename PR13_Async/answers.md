# Ответы на вопросы ПР №13

1. async/await — синтаксический сахар над промисами, удобнее в сложных цепочках.
2. Promise.all отклоняется при первой ошибке.
3. all — все успешные; race — первый завершённый; allSettled — все результаты.
4. Retry с экспоненциальной задержкой: пауза 2^n мс.
5. Race condition — параллельные операции конфликтуют; решается блокировками/последовательностью.
6. Cache: Map + TTL; стратегии: stale-while-revalidate.
7. Promise.all, ограничение concurrency.
8. Всегда использовать .catch или try/catch.
9. async/await читабельнее, легче отлаживать.
10. DevTools, console.log, breakpoints, Network.