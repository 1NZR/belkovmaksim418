let timerInterval, timerValue = 0;

function handleBasicClick(e) {
    const out = document.getElementById('basic-output');
    out.textContent = `Тип: ${e.type}, X: ${e.clientX}, Y: ${e.clientY}, Цель: ${e.target.tagName}`;
    e.target.classList.add('pulse');
    setTimeout(() => e.target.classList.remove('pulse'), 500);
}
function handleMouseEvents(e) {
    const box = document.getElementById('color-box');
    const out = document.getElementById('mouse-output');
    if (e.type === 'mouseenter') box.style.background = '#e74c3c';
    if (e.type === 'mouseleave') box.style.background = '#3498db';
    if (e.type === 'mousemove') out.textContent = `X: ${e.offsetX}, Y: ${e.offsetY}`;
}
function setupBasicEvents() {
    const btn = document.getElementById('basic-btn');
    if (btn) btn.addEventListener('click', handleBasicClick);
    const box = document.getElementById('color-box');
    if (box) ['mouseenter','mouseleave','mousemove'].forEach(ev => box.addEventListener(ev, handleMouseEvents));
}
function handleKeyEvents(e) {
    const out = document.getElementById('key-output');
    out.textContent = `key=${e.key} code=${e.code} ctrl=${e.ctrlKey} alt=${e.altKey} shift=${e.shiftKey}`;
    if ((e.ctrlKey && e.key === 's') || (e.altKey && e.key === 'c') || (e.shiftKey && e.key === 'A')) {
        e.preventDefault(); out.textContent += ' — КОМБИНАЦИЯ ПЕРЕХВАЧЕНА!';
    }
}
function setupKeyboardEvents() {
    const input = document.getElementById('key-input');
    if (input) input.addEventListener('keydown', handleKeyEvents);
}
function handleDelegationClick(e) {
    const list = document.getElementById('item-list');
    const out = document.getElementById('delegation-output');
    if (e.target.classList.contains('delete')) { e.target.parentElement.remove(); return; }
    const item = e.target.closest('.item');
    if (item) {
        item.classList.toggle('selected');
        const selected = [...list.querySelectorAll('.item.selected')].map(i => i.dataset.id);
        out.textContent = `Выбрано: ${selected.join(', ') || 'ничего'}`;
    }
}
function addNewItem() {
    const list = document.getElementById('item-list');
    const id = Date.now();
    const div = document.createElement('div');
    div.className = 'item'; div.dataset.id = id;
    div.innerHTML = `Элемент ${id} <span class="delete">×</span>`;
    list.appendChild(div);
}
function setupDelegationEvents() {
    const list = document.getElementById('item-list');
    if (list) list.addEventListener('click', handleDelegationClick);
    const add = document.getElementById('add-item-btn');
    if (add) add.addEventListener('click', addNewItem);
}
function preventLinkDefault(e) {
    e.preventDefault();
    document.getElementById('prevention-output').textContent = 'Переход по ссылке заблокирован!';
    e.target.classList.add('shake');
    setTimeout(() => e.target.classList.remove('shake'), 400);
}
function preventFormSubmit(e) {
    e.preventDefault();
    const val = document.getElementById('form-input').value.trim();
    document.getElementById('prevention-output').textContent = val ? `Форма отправлена: ${val}` : 'Введите текст!';
}
function setupPreventionEvents() {
    const link = document.getElementById('prevent-link');
    if (link) link.addEventListener('click', preventLinkDefault);
    const form = document.getElementById('prevent-form');
    if (form) form.addEventListener('submit', preventFormSubmit);
}
function triggerCustomEvent() {
    const event = new CustomEvent('customAction', { detail: { message: 'Привет от кастомного события!' } });
    document.dispatchEvent(event);
}
function handleCustomEvent(e) {
    document.getElementById('custom-output').textContent = e.detail.message;
}
function setupMultipleListeners() {
    for (let i = 1; i <= 3; i++) document.addEventListener('customAction', () => console.log(`Обработчик #${i}`));
}
function setupCustomEvents() {
    document.addEventListener('customAction', handleCustomEvent);
    const trig = document.getElementById('trigger-custom');
    if (trig) trig.addEventListener('click', triggerCustomEvent);
    const multi = document.getElementById('multiple-listeners');
    if (multi) multi.addEventListener('click', setupMultipleListeners);
}
function loadImageWithEvents() {
    const container = document.getElementById('image-container');
    const out = document.getElementById('loading-output');
    container.innerHTML = '';
    const img = new Image();
    img.onload = () => { out.textContent = 'Изображение загружено!'; container.appendChild(img); };
    img.onerror = () => { out.textContent = 'Ошибка загрузки!'; };
    img.onloadstart = () => out.textContent = 'Загрузка...';
    img.src = 'https://picsum.photos/300/200?random=' + Date.now();
}
function simulateLoadError() {
    const container = document.getElementById('image-container');
    const out = document.getElementById('loading-output');
    container.innerHTML = '';
    const img = new Image();
    img.onerror = () => out.textContent = 'Ошибка: изображение не найдено';
    img.src = 'https://nonexistent-url-xyz.com/img.jpg';
}
function setupLoadingEvents() {
    const load = document.getElementById('load-image');
    if (load) load.addEventListener('click', loadImageWithEvents);
    const err = document.getElementById('load-error');
    if (err) err.addEventListener('click', simulateLoadError);
}
function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => { timerValue++; document.getElementById('timer-output').textContent = `Таймер: ${timerValue}`; }, 1000);
}
function stopTimer() {
    clearInterval(timerInterval); timerInterval = null; timerValue = 0;
    document.getElementById('timer-output').textContent = 'Таймер: 0';
}
function createDebounce(fn, delay) {
    let t; return function(...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), delay); };
}
function createThrottle(fn, interval) {
    let last = 0;
    return function(...args) {
        const now = Date.now();
        if (now - last >= interval) { last = now; fn.apply(this, args); }
    };
}
function testDebounce() {
    const out = document.getElementById('async-output');
    const debounced = createDebounce(() => { out.textContent = 'Debounce выполнен: ' + new Date().toLocaleTimeString(); }, 500);
    for (let i = 0; i < 5; i++) { debounced(); out.textContent = `Вызов #${i+1}...`; }
}
function testThrottle() {
    const out = document.getElementById('async-output');
    const throttled = createThrottle(() => { out.textContent = 'Throttle выполнен: ' + new Date().toLocaleTimeString(); }, 1000);
    for (let i = 0; i < 5; i++) { throttled(); out.textContent = `Вызов #${i+1}...`; }
}
function setupTimerEvents() {
    const start = document.getElementById('start-timer'); if (start) start.addEventListener('click', startTimer);
    const stop = document.getElementById('stop-timer'); if (stop) stop.addEventListener('click', stopTimer);
    const deb = document.getElementById('debounce-btn'); if (deb) deb.addEventListener('click', testDebounce);
    const thr = document.getElementById('throttle-btn'); if (thr) thr.addEventListener('click', testThrottle);
}
document.addEventListener('DOMContentLoaded', () => {
    setupBasicEvents(); setupKeyboardEvents(); setupDelegationEvents();
    setupPreventionEvents(); setupCustomEvents(); setupLoadingEvents(); setupTimerEvents();
    console.log('Все обработчики инициализированы!');
});