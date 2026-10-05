function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => shouldResolve ? resolve('Успех!') : reject(new Error('Ошибка!')), 1000);
    });
}
function delay(ms) { return new Promise(res => setTimeout(res, ms)); }

async function handleBasicPromise() {
    const out = document.getElementById('promise-output');
    out.textContent = 'Загрузка...';
    try { const r = await createBasicPromise(true); out.textContent = 'Результат: ' + r; }
    catch (e) { out.textContent = 'Ошибка: ' + e.message; }
}
async function createPromiseChain() {
    const out = document.getElementById('promise-output');
    out.textContent = 'Цепочка запущена...';
    try {
        const r1 = await createBasicPromise(true);
        const r2 = await delay(500).then(() => r1 + ' → шаг 2');
        const r3 = await delay(500).then(() => r2 + ' → шаг 3');
        out.textContent = 'Цепочка: ' + r3;
    } catch (e) { out.textContent = 'Ошибка: ' + e.message; }
}
async function handlePromiseError() {
    const out = document.getElementById('promise-output');
    out.textContent = 'Загрузка...';
    try { await createBasicPromise(false); }
    catch (e) { out.textContent = 'Поймана ошибка: ' + e.message; }
}
async function basicAsyncAwait() {
    const out = document.getElementById('async-output');
    out.textContent = 'Загрузка...';
    const r = await createBasicPromise(true);
    await delay(300);
    out.textContent = 'Async/await результат: ' + r;
}
async function handleAsyncError() {
    const out = document.getElementById('async-output');
    try { await createBasicPromise(false); }
    catch (e) { out.textContent = 'Async ошибка: ' + e.message; }
}
async function parallelAsyncExecution() {
    const out = document.getElementById('async-output');
    const start = Date.now();
    out.textContent = 'Параллельный запуск...';
    const results = await Promise.all([createBasicPromise(true), createBasicPromise(true), createBasicPromise(true)]);
    out.textContent = `Параллельно за ${Date.now()-start}мс: ${results.join(' | ')}`;
}
async function fetchUsers() {
    const out = document.getElementById('api-output');
    const data = document.getElementById('api-data');
    out.textContent = 'Загрузка пользователей...';
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const users = await res.json();
        data.innerHTML = users.map(u => `<div class="user-card"><h4>${u.name}</h4><p>${u.email}</p><p>${u.phone}</p></div>`).join('');
        out.textContent = `Загружено ${users.length} пользователей`;
    } catch (e) { out.textContent = 'Ошибка: ' + e.message; }
}
async function createPost() {
    const out = document.getElementById('api-output');
    out.textContent = 'Создание поста...';
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Заголовок', body: 'Текст поста', userId: 1 })
        });
        const data = await res.json();
        out.textContent = 'Создан пост ID: ' + data.id;
    } catch (e) { out.textContent = 'Ошибка: ' + e.message; }
}
async function testApiError() {
    const out = document.getElementById('api-output');
    out.textContent = 'Проверка ошибки...';
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/nonexistent-endpoint-xyz');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        await res.json();
    } catch (e) { out.textContent = 'Ошибка: ' + e.message; }
}
let intervalId, counter = 0;
function startAsyncInterval() {
    if (intervalId) return;
    counter = 0;
    intervalId = setInterval(() => { counter++; document.getElementById('interval-output').textContent = `Интервал: ${counter}`; }, 1000);
}
function stopAsyncInterval() {
    clearInterval(intervalId); intervalId = null; counter = 0;
    document.getElementById('interval-output').textContent = 'Интервал: 0';
}
function delayWithPromise(ms) { return new Promise(res => setTimeout(res, ms)); }
async function testDelay() {
    const out = document.getElementById('timer-output');
    for (let i = 1; i <= 5; i++) {
        await delayWithPromise(500);
        out.textContent = `Шаг ${i}/5 выполнен`;
    }
    out.textContent = 'Все шаги выполнены!';
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('basic-promise').addEventListener('click', handleBasicPromise);
    document.getElementById('promise-chain').addEventListener('click', createPromiseChain);
    document.getElementById('promise-error').addEventListener('click', handlePromiseError);
    document.getElementById('basic-async').addEventListener('click', basicAsyncAwait);
    document.getElementById('async-error').addEventListener('click', handleAsyncError);
    document.getElementById('async-parallel').addEventListener('click', parallelAsyncExecution);
    document.getElementById('fetch-users').addEventListener('click', fetchUsers);
    document.getElementById('fetch-post').addEventListener('click', createPost);
    document.getElementById('fetch-error').addEventListener('click', testApiError);
    document.getElementById('start-interval').addEventListener('click', startAsyncInterval);
    document.getElementById('stop-interval').addEventListener('click', stopAsyncInterval);
    document.getElementById('delay-promise').addEventListener('click', testDelay);
    console.log('Асинхронные обработчики инициализированы!');
});