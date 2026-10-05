# Ответы на вопросы ПР №11

1. innerHTML парсит HTML; textContent — безопасный текст.
2. Делегирование: обработчик на родителе, а не на каждом элементе.
3. getElementById — по id; querySelector — CSS-селектор; querySelectorAll — все совпадения.
4. event.preventDefault() — для ссылок, форм.
5. classList.add сохраняет остальные классы; className перезаписывает.
6. createElement + appendChild — самый эффективный.
7. Всплытие: событие идёт от target вверх; stopPropagation останавливает.
8. FormData собирает данные; через form.elements — по элементам.
9. input — при вводе; change — при потере фокуса/изменении; keyup — при отпускании клавиши.
10. DocumentFragment, минимум reflow, кэширование ссылок.