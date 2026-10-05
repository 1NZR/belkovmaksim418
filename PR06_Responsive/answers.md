# Ответы на вопросы ПР №6

1. Viewport meta tag задаёт ширину видимой области = ширине устройства, нужен для корректного масштабирования.
2. Использованы Fluid (проценты), Adaptive (медиа-запросы), Responsive (комбинация + гибкие изображения).
3. Mobile First — сначала мобильные стили, потом min-width. Преимущество — меньше кода, лучше на мобильных.
4. %, rem, vw/vh, clamp() — предпочтительны. %, rem, em, vw/vh — предпочтительны.
5. clamp(min, preferred, max) — плавная адаптивная типографика.
6. 1024px, 768px, 480px — стандартные брейкпоинты.
7. @media (max-width: 768px) { ... } — пример синтаксиса.
8. max-width — для Desktop First, min-width — для Mobile First.
9. max-width: 100%; height: auto; — адаптивные изображения.
10. DevTools, Responsive Design Mode, эмуляция устройств, Lighthouse.