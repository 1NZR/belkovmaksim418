# Ответы на вопросы ПР №12

1. preventDefault отменяет действие браузера, stopPropagation останавливает всплытие.
2. Делегирование: 1 обработчик на родителе vs N обработчиков.
3. Фазы: capturing → target → bubbling.
4. target — где произошло событие; currentTarget — где висит обработчик.
5. 
ew CustomEvent('name', { detail: {...} }) + dispatchEvent.
6. debounce — ждёт паузу; throttle — ограничивает частоту.
7. removeEventListener; важно для предотвращения утечек памяти.
8. События load, error, loadstart, loadend.
9. addEventListener позволяет несколько обработчиков; onclick — только один.
10. Делегирование, passive listeners, устранение лишних обработчиков.