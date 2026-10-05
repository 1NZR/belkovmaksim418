function runTest(name, actual, expected) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    const div = document.createElement('div');
    div.className = `test-result ${ok ? 'test-success' : 'test-failure'}`;
    div.textContent = `${name}: ${ok ? '✅' : '❌'}`;
    document.querySelector('footer').appendChild(div);
    console.log(name, ok);
}
document.addEventListener('DOMContentLoaded', () => {
    runTest('API_BASE_URL defined', typeof API_BASE_URL, 'string');
    runTest('fetchGetRequest type', typeof fetchGetRequest, 'function');
    runTest('fetchPostRequest type', typeof fetchPostRequest, 'function');
    runTest('fetchWithRetry type', typeof fetchWithRetry, 'function');
});