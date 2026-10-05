function sum(...numbers) { return numbers.reduce((acc, n) => acc + n, 0); }

function createUser({ name, age, email = "не указан" }) {
    return \Пользователь: \, возраст: \, email: \\;
}

function secretMessage(password, message) {
    return function(attempt) {
        return attempt === password ? message : "Доступ запрещен";
    };
}

function compose(...functions) {
    return function(initialValue) {
        return functions.reduceRight((acc, fn) => fn(acc), initialValue);
    };
}

function myMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) result.push(callback(array[i], i, array));
    return result;
}

function myFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) if (callback(array[i], i, array)) result.push(array[i]);
    return result;
}

function myReduce(array, callback, initialValue) {
    let acc = initialValue !== undefined ? initialValue : array[0];
    const start = initialValue !== undefined ? 0 : 1;
    for (let i = start; i < array.length; i++) acc = callback(acc, array[i], i, array);
    return acc;
}

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) return fn.apply(this, args);
        return function(...next) { return curried.apply(this, args.concat(next)); };
    };
}

function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

function throttle(fn, interval) {
    let last = 0;
    return function(...args) {
        const now = Date.now();
        if (now - last >= interval) { last = now; fn.apply(this, args); }
    };
}

function createValidator(options) {
    const { minLength = 0, requireDigit = false, requireUppercase = false } = options;
    return function(value) {
        const errors = [];
        if (value.length < minLength) errors.push(\Минимум \ символов\);
        if (requireDigit && !/\d/.test(value)) errors.push("Нужна хотя бы одна цифра");
        if (requireUppercase && !/[A-ZА-Я]/.test(value)) errors.push("Нужна заглавная буква");
        return { valid: errors.length === 0, errors };
    };
}