function runTest(name, actual, expected) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    const div = document.createElement('div');
    div.className = `test-result ${ok ? 'test-success' : 'test-failure'}`;
    div.textContent = `${name}: ${ok ? '✅ УСПЕХ' : '❌ ОШИБКА'}`;
    document.querySelector('footer').appendChild(div);
    console.log(name, ok, actual, expected);
}
document.addEventListener('DOMContentLoaded', () => {
    runTest('countChildren', countChildren(), 4);
    runTest('findSpecialChild', findSpecialChild(), 'Особый дочерний элемент');
    runTest('getParentBackground', typeof getParentBackground(), 'string');
});