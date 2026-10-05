// Временная сложность: O(sqrt(n))
function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
}

// Временная сложность: O(n)
function factorial(n) {
    if (n < 0) return -1;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

// Временная сложность: O(n)
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const result = [0, 1];
    for (let i = 2; i < n; i++) result.push(result[i-1] + result[i-2]);
    return result;
}

// Временная сложность: O(log(min(a,b)))
function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a;
}

// Временная сложность: O(n)
function isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-zа-яё0-9]/gi, '');
    let left = 0, right = clean.length - 1;
    while (left < right) {
        if (clean[left] !== clean[right]) return false;
        left++; right--;
    }
    return true;
}

// Временная сложность: O(n)
function countVowels(str) {
    const vowels = 'аеёиоуыэюяaeiou';
    let count = 0;
    for (const ch of str.toLowerCase()) if (vowels.includes(ch)) count++;
    return count;
}

// Временная сложность: O(n)
function reverseString(str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) result += str[i];
    return result;
}

// Временная сложность: O(n)
function findLongestWord(sentence) {
    const words = sentence.split(/\s+/);
    let longest = '';
    for (const w of words) if (w.length > longest.length) longest = w;
    return longest;
}

// Временная сложность: O(n)
function findMax(arr) {
    if (!arr.length) return undefined;
    let max = arr[0];
    for (const n of arr) if (n > max) max = n;
    return max;
}

// Временная сложность: O(n)
function removeDuplicates(arr) {
    const seen = new Set();
    const result = [];
    for (const item of arr) if (!seen.has(item)) { seen.add(item); result.push(item); }
    return result;
}

// Временная сложность: O(n²)
function bubbleSort(arr) {
    const result = [...arr];
    const n = result.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (result[j] > result[j+1]) {
                [result[j], result[j+1]] = [result[j+1], result[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return result;
}

// Временная сложность: O(log n)
function binarySearch(sortedArr, target) {
    let left = 0, right = sortedArr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (sortedArr[mid] === target) return mid;
        if (sortedArr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Временная сложность: O(n)
function formatCurrency(amount, currency = '₽') {
    const fixed = Number(amount).toFixed(2);
    const [intPart, decPart] = fixed.split('.');
    const withSpaces = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return \\.\ \\;
}

// Временная сложность: O(n)
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Временная сложность: O(n)
function generatePassword(length = 8) {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}';
    const all = lower + upper + digits + special;
    let pwd = '';
    pwd += lower[Math.floor(Math.random() * lower.length)];
    pwd += upper[Math.floor(Math.random() * upper.length)];
    pwd += digits[Math.floor(Math.random() * digits.length)];
    pwd += special[Math.floor(Math.random() * special.length)];
    for (let i = 4; i < length; i++) pwd += all[Math.floor(Math.random() * all.length)];
    return pwd.split('').sort(() => Math.random() - 0.5).join('');
}