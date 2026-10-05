function runTest(name, actual, expected) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    const div = document.createElement('div');
    div.className = `test-result ${ok ? 'test-success' : 'test-failure'}`;
    div.textContent = `${name}: ${ok ? '✅' : '❌'}`;
    document.querySelector('footer').appendChild(div);
    console.log(name, ok);
}
document.addEventListener('DOMContentLoaded', async () => {
    runTest('delay type', typeof delay(100).then, 'function');
    runTest('createBasicPromise type', typeof createBasicPromise, 'function');
});