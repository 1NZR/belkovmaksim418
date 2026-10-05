const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

function displayOutput(id, data) {
    const el = document.getElementById(id);
    if (el) el.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}
function displayData(id, data) {
    const el = document.getElementById(id);
    if (!el) return;
    if (Array.isArray(data)) el.innerHTML = data.map(item => `<div class="user-card"><h4>${item.name || item.title}</h4><p>${item.email || ''}</p></div>`).join('');
    else el.innerHTML = `<div class="user-card"><h4>${data.title || data.name}</h4><p>${JSON.stringify(data).slice(0,200)}</p></div>`;
}

async function fetchGetRequest() {
    displayOutput('get-output', 'Загрузка...');
    try {
        const res = await fetch(`${API_BASE_URL}/posts/1`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        displayOutput('get-output', data);
    } catch (e) { displayOutput('get-output', 'Ошибка: ' + e.message); }
}
async function fetchJsonData() {
    displayOutput('get-output', 'Загрузка пользователей...');
    try {
        const res = await fetch(`${API_BASE_URL}/users`);
        const data = await res.json();
        displayData('get-data', data);
        displayOutput('get-output', `Загружено ${data.length} пользователей`);
    } catch (e) { displayOutput('get-output', 'Ошибка: ' + e.message); }
}
async function fetchWithError() {
    displayOutput('get-output', 'Проверка ошибки...');
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/nonexistent-endpoint-xyz');
        if (!res.ok) throw new Error('HTTP ошибка: ' + res.status);
        await res.json();
    } catch (e) { displayOutput('get-output', 'Ошибка: ' + e.message); }
}
async function fetchPostRequest() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Новый пост', body: 'Содержание', userId: 1 })
        });
        const data = await res.json();
        displayOutput('crud-output', 'POST создан: ' + JSON.stringify(data, null, 2));
    } catch (e) { displayOutput('crud-output', 'Ошибка: ' + e.message); }
}
async function fetchPutRequest() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1, title: 'Обновлено', body: 'PUT', userId: 1 })
        });
        const data = await res.json();
        displayOutput('crud-output', 'PUT результат: ' + JSON.stringify(data, null, 2));
    } catch (e) { displayOutput('crud-output', 'Ошибка: ' + e.message); }
}
async function fetchPatchRequest() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PATCH', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'PATCH изменён' })
        });
        const data = await res.json();
        displayOutput('crud-output', 'PATCH результат: ' + JSON.stringify(data, null, 2));
    } catch (e) { displayOutput('crud-output', 'Ошибка: ' + e.message); }
}
async function fetchDeleteRequest() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts/1`, { method: 'DELETE' });
        displayOutput('crud-output', 'DELETE статус: ' + res.status + ' (ожидалось 200)');
    } catch (e) { displayOutput('crud-output', 'Ошибка: ' + e.message); }
}
async function fetchWithHeaders() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts`, {
            headers: { 'X-Custom-Header': 'MyValue', 'Authorization': 'Bearer test-token' }
        });
        displayOutput('headers-output', 'Кастомные заголовки отправлены, статус: ' + res.status);
    } catch (e) { displayOutput('headers-output', 'Ошибка: ' + e.message); }
}
async function fetchWithAuth() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts/1`, {
            headers: { 'Authorization': 'Basic ' + btoa('user:pass') }
        });
        displayOutput('headers-output', 'Basic Auth статус: ' + res.status);
    } catch (e) { displayOutput('headers-output', 'Ошибка: ' + e.message); }
}
async function fetchWithParams() {
    try {
        const url = new URL(`${API_BASE_URL}/posts`);
        url.searchParams.append('_limit', '5');
        url.searchParams.append('_sort', 'id');
        url.searchParams.append('_order', 'desc');
        const res = await fetch(url);
        const data = await res.json();
        displayOutput('headers-output', `Параметры: ${url.search}, получено ${data.length} постов`);
    } catch (e) { displayOutput('headers-output', 'Ошибка: ' + e.message); }
}
async function fetchWithTimeout() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 100);
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal });
        clearTimeout(timeoutId);
        displayOutput('headers-output', 'Запрос выполнен за 100мс: ' + res.status);
    } catch (e) {
        displayOutput('headers-output', 'Таймаут/отмена: ' + e.name);
    }
}
async function fetchAndCheckStatus() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts/1`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        displayOutput('response-output', 'OK статус: ' + res.status);
    } catch (e) { displayOutput('response-output', 'Ошибка: ' + e.message); }
}
async function fetchAndReadHeaders() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts/1`);
        const headers = [];
        res.headers.forEach((v, k) => headers.push(`${k}: ${v}`));
        displayOutput('response-output', 'Заголовки:\n' + headers.join('\n'));
    } catch (e) { displayOutput('response-output', 'Ошибка: ' + e.message); }
}
async function fetchBlobData() {
    try {
        const res = await fetch('https://picsum.photos/200/300');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        displayOutput('response-output', `Blob: ${blob.type}, ${blob.size} байт`);
        const img = new Image(); img.src = url; img.style.maxWidth = '200px';
        document.getElementById('response-output').appendChild(img);
    } catch (e) { displayOutput('response-output', 'Ошибка: ' + e.message); }
}
async function fetchWithFormData() {
    try {
        const formData = new FormData();
        formData.append('name', 'Иван');
        formData.append('email', 'ivan@example.com');
        const res = await fetch(`${API_BASE_URL}/posts`, { method: 'POST', body: formData });
        displayOutput('response-output', 'FormData отправлен, статус: ' + res.status);
    } catch (e) { displayOutput('response-output', 'Ошибка: ' + e.message); }
}
async function fetchNetworkError() {
    try { await fetch('https://this-domain-does-not-exist-xyz-12345.com'); }
    catch (e) { displayOutput('error-output', 'Сетевая ошибка: ' + e.message); }
}
async function fetchHttpError() {
    try {
        const res = await fetch(`${API_BASE_URL}/nonexistent-endpoint-xyz`);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    } catch (e) { displayOutput('error-output', 'HTTP ошибка: ' + e.message); }
}
async function fetchWithAbort() {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 50);
    try {
        await fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal });
    } catch (e) { displayOutput('error-output', 'Отменено: ' + e.name); }
}
async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return await res.json();
        } catch (e) {
            if (i === retries - 1) throw e;
            await new Promise(r => setTimeout(r, 2 ** i * 200));
        }
    }
}
async function testRetry() {
    displayOutput('error-output', 'Retry...');
    try {
        const data = await fetchWithRetry(`${API_BASE_URL}/posts/1`);
        displayOutput('error-output', 'Retry успех: ' + data.title);
    } catch (e) { displayOutput('error-output', 'Retry провал: ' + e.message); }
}
async function fetchWithPromiseAll() {
    const start = Date.now();
    try {
        const [users, posts, todos] = await Promise.all([
            fetch(`${API_BASE_URL}/users`).then(r => r.json()),
            fetch(`${API_BASE_URL}/posts`).then(r => r.json()),
            fetch(`${API_BASE_URL}/todos`).then(r => r.json())
        ]);
        displayOutput('parallel-output', `Promise.all: ${users.length} users, ${posts.length} posts, ${todos.length} todos за ${Date.now()-start}мс`);
    } catch (e) { displayOutput('parallel-output', 'Ошибка: ' + e.message); }
}
async function fetchWithPromiseRace() {
    const start = Date.now();
    try {
        const result = await Promise.race([
            fetch(`${API_BASE_URL}/posts/1`).then(r => r.json()),
            new Promise((_, rej) => setTimeout(() => rej(new Error('Таймаут')), 3000))
        ]);
        displayOutput('parallel-output', `Promise.race победитель за ${Date.now()-start}мс: ${result.title}`);
    } catch (e) { displayOutput('parallel-output', 'Ошибка: ' + e.message); }
}
async function fetchSequentialRequests() {
    const start = Date.now();
    try {
        const user = await fetch(`${API_BASE_URL}/users/1`).then(r => r.json());
        const posts = await fetch(`${API_BASE_URL}/posts?userId=1`).then(r => r.json());
        displayOutput('parallel-output', `Последовательно за ${Date.now()-start}мс: ${user.name}, ${posts.length} постов`);
    } catch (e) { displayOutput('parallel-output', 'Ошибка: ' + e.message); }
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fetch-get').addEventListener('click', fetchGetRequest);
    document.getElementById('fetch-json').addEventListener('click', fetchJsonData);
    document.getElementById('fetch-error').addEventListener('click', fetchWithError);
    document.getElementById('fetch-post').addEventListener('click', fetchPostRequest);
    document.getElementById('fetch-put').addEventListener('click', fetchPutRequest);
    document.getElementById('fetch-patch').addEventListener('click', fetchPatchRequest);
    document.getElementById('fetch-delete').addEventListener('click', fetchDeleteRequest);
    document.getElementById('fetch-headers').addEventListener('click', fetchWithHeaders);
    document.getElementById('fetch-auth').addEventListener('click', fetchWithAuth);
    document.getElementById('fetch-params').addEventListener('click', fetchWithParams);
    document.getElementById('fetch-timeout').addEventListener('click', fetchWithTimeout);
    document.getElementById('fetch-status').addEventListener('click', fetchAndCheckStatus);
    document.getElementById('fetch-headers-response').addEventListener('click', fetchAndReadHeaders);
    document.getElementById('fetch-blob').addEventListener('click', fetchBlobData);
    document.getElementById('fetch-formdata').addEventListener('click', fetchWithFormData);
    document.getElementById('fetch-network-error').addEventListener('click', fetchNetworkError);
    document.getElementById('fetch-http-error').addEventListener('click', fetchHttpError);
    document.getElementById('fetch-abort').addEventListener('click', fetchWithAbort);
    document.getElementById('fetch-retry').addEventListener('click', testRetry);
    document.getElementById('fetch-promise-all').addEventListener('click', fetchWithPromiseAll);
    document.getElementById('fetch-promise-race').addEventListener('click', fetchWithPromiseRace);
    document.getElementById('fetch-sequential').addEventListener('click', fetchSequentialRequests);
    console.log('Fetch API инициализирован!');
});