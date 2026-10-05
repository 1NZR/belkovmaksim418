function runTest(name, actual, expected) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    const div = document.createElement('div');
    div.className = `test-result ${ok ? 'success' : 'error'}`;
    div.innerHTML = `<strong>${name}:</strong> ${ok ? '✅' : '❌'} (получено: ${JSON.stringify(actual)})`;
    document.getElementById('testResults').appendChild(div);
    console.log(name, ok, { expected, actual });
}
document.addEventListener('DOMContentLoaded', () => {
    runTest('sum(1,2,3)', sum(1,2,3), 6);
    runTest('sum()', sum(), 0);
    runTest('createUser', createUser({name:"Анна", age:25}), "Пользователь: Анна, возраст: 25, email: не указан");
    runTest('secretMessage', secretMessage("1234", "Hello")("1234"), "Hello");
    runTest('compose', compose(x => x+1, x => x*2)(3), 7);
    runTest('myMap', myMap([1,2,3], x => x*2), [2,4,6]);
    runTest('myFilter', myFilter([1,2,3,4], x => x%2===0), [2,4]);
    runTest('myReduce', myReduce([1,2,3,4], (a,b)=>a+b, 0), 10);
    runTest('curry', curry((a,b,c)=>a+b+c)(1)(2)(3), 6);
    const validator = createValidator({minLength: 5, requireDigit: true});
    runTest('validator invalid', validator("abc").valid, false);
    runTest('validator valid', validator("abc12").valid, true);
    console.log('=== ВСЕ ТЕСТЫ ЗАВЕРШЕНЫ ===');
});