import React from 'react';

export function WelcomeMessage({ name, age }) {
    return <div className="user-card fade-in"><h3>Привет, {name}!</h3><p>Возраст: {age}</p></div>;
}

export function UserCard({ user }) {
    return (
        <div className="user-card">
            <img src={user.avatar} alt={user.name} style={{width: 60, borderRadius: '50%'}} />
            <h4>{user.name} {user.isOnline ? '🟢' : '⚪'}</h4>
            <p>{user.email}</p>
        </div>
    );
}

export function Button({ variant = 'primary', size = 'medium', onClick, children }) {
    const bg = variant === 'primary' ? '#3498db' : '#95a5a6';
    const pad = size === 'small' ? '0.5rem 1rem' : size === 'large' ? '1rem 2rem' : '0.75rem 1.5rem';
    return <button style={{ background: bg, color: 'white', padding: pad, border: 'none', borderRadius: 6, cursor: 'pointer' }} onClick={onClick}>{children}</button>;
}

export function Card({ title, children }) {
    return <div className="user-card"><h3>{title}</h3><div>{children}</div></div>;
}

export function Toggle({ buttonText = 'Показать/скрыть', children }) {
    const [visible, setVisible] = React.useState(false);
    return (
        <div>
            <Button onClick={() => setVisible(!visible)}>{buttonText}</Button>
            {visible && <div className="user-card fade-in">{children}</div>}
        </div>
    );
}

export function ConditionalMessage({ status }) {
    const messages = { success: '✅ Успех!', error: '❌ Ошибка!', warning: '⚠️ Предупреждение!' };
    const colors = { success: '#d4edda', error: '#f8d7da', warning: '#fff3cd' };
    return <div style={{ background: colors[status], padding: '1rem', borderRadius: 6 }}>{messages[status]}</div>;
}

function BasicComponents() {
    const userData = { name: 'Анна Иванова', email: 'anna@example.com', avatar: 'https://i.pravatar.cc/100', isOnline: true };
    return (
        <section className="task-section">
            <h2>Базовые компоненты</h2>
            <div className="component-demo">
                <h3>Задание 1: Компоненты с props</h3>
                <WelcomeMessage name="Иван" age={25} />
                <UserCard user={userData} />
                <Button variant="primary" onClick={() => alert('Клик!')}>Нажми меня</Button>
            </div>
            <div className="component-demo">
                <h3>Задание 2: Children и условный рендеринг</h3>
                <Card title="Пример карточки"><p>Это содержимое карточки</p></Card>
                <Toggle buttonText="Показать/скрыть"><p>Секретный контент!</p></Toggle>
                <ConditionalMessage status="success" />
                <ConditionalMessage status="error" />
                <ConditionalMessage status="warning" />
            </div>
        </section>
    );
}
export default BasicComponents;