function runTest(name, actual, expected) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    const div = document.createElement('div');
    div.className = `test-result ${ok ? 'test-success' : 'test-failure'}`;
    div.textContent = `${name}: ${ok ? '✅ УСПЕХ' : '❌ ОШИБКА'}`;
    document.querySelector('footer').appendChild(div);
    console.log(name, ok);
}
document.addEventListener('DOMContentLoaded', () => {
    runTest('createDebounce type', typeof createDebounce(() => {}, 100), 'function');
    runTest('createThrottle type', typeof createThrottle(() => {}, 100), 'function');
});