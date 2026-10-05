function createCard(title, content) {
    const card = document.createElement('div'); card.className = 'card';
    const h4 = document.createElement('h4'); h4.textContent = title;
    const p = document.createElement('p'); p.textContent = content;
    card.appendChild(h4); card.appendChild(p);
    const target = document.getElementById('target1');
    if (target) target.appendChild(card);
}

function createList(items) {
    const ol = document.createElement('ol');
    items.forEach(item => { const li = document.createElement('li'); li.textContent = item; ol.appendChild(li); });
    const target = document.getElementById('target1'); if (target) target.appendChild(ol);
}

function countChildren() {
    const parent = document.getElementById('parent-element');
    return parent ? parent.children.length : 0;
}

function findSpecialChild() {
    const el = document.querySelector('#parent-element .special');
    return el ? el.textContent : null;
}

function getParentBackground() {
    const child = document.querySelector('.family-tree .child');
    if (!child) return null;
    return getComputedStyle(child.parentElement).backgroundColor;
}

function setupStyleToggle() {
    const btn = document.getElementById('toggle-style');
    if (btn) btn.addEventListener('click', () => document.getElementById('style-target').classList.toggle('active-style'));
}

function setupClickCounter() {
    let count = 0;
    const btn = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    if (btn) btn.addEventListener('click', () => { count++; counter.textContent = `Кликов: ${count}`; });
}

function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    if (input) input.addEventListener('input', e => { display.textContent = e.target.value; });
}

function setupListEvents() {
    const addBtn = document.getElementById('add-item');
    const clearBtn = document.getElementById('clear-list');
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    if (addBtn) addBtn.addEventListener('click', () => {
        const val = input.value.trim(); if (!val) return;
        const li = document.createElement('li'); li.className = 'list-item';
        li.innerHTML = `<span>${val}</span><button class="delete-btn">×</button>`;
        list.appendChild(li); input.value = '';
    });
    if (list) list.addEventListener('click', e => {
        if (e.target.classList.contains('delete-btn')) e.target.parentElement.remove();
    });
    if (clearBtn) clearBtn.addEventListener('click', () => { list.innerHTML = ''; });
}

function setupForm() {
    const form = document.getElementById('user-form');
    const out = document.getElementById('form-output');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('user-name').value.trim();
        const email = document.getElementById('user-email').value.trim();
        const age = document.getElementById('user-age').value;
        const errors = [];
        if (name.length < 2) errors.push('Имя: минимум 2 символа');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Некорректный email');
        if (age && (age < 1 || age > 120)) errors.push('Возраст 1–120');
        if (errors.length) out.innerHTML = `<div class="error-message">${errors.join('<br>')}</div>`;
        else out.innerHTML = `<div class="success-message">Пользователь ${name} (${email}) зарегистрирован!</div>`;
    });
}

function initializeApp() {
    setupStyleToggle(); setupClickCounter(); setupInputDisplay(); setupListEvents(); setupForm();
    createCard('Пример карточки', 'Это содержимое карточки');
    createList(['Первый элемент', 'Второй элемент', 'Третий элемент']);
    console.log('Приложение инициализировано!');
}
document.addEventListener('DOMContentLoaded', initializeApp);