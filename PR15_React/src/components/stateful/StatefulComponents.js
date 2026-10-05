import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) { super(props); this.state = { count: props.initialValue || 0 }; }
    render() {
        return (
            <div className="user-card">
                <h3>Counter</h3>
                <div className="counter">{this.state.count}</div>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>+</button>
                <button onClick={() => this.setState({ count: this.state.count - 1 })}>-</button>
                <button onClick={() => this.setState({ count: 0 })}>Сброс</button>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) { super(props); this.state = { email: '', password: '', error: '' }; }
    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email.includes('@')) return this.setState({ error: 'Некорректный email' });
        if (password.length < 6) return this.setState({ error: 'Пароль минимум 6 символов' });
        this.setState({ error: 'Успешный вход!' });
    };
    render() {
        return (
            <form className="user-card" onSubmit={this.handleSubmit}>
                <h3>Login</h3>
                <input placeholder="Email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                <input type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                <button type="submit">Войти</button>
                {this.state.error && <p>{this.state.error}</p>}
            </form>
        );
    }
}

class ColorPicker extends Component {
    constructor(props) { super(props); this.state = { selected: props.colors[0] }; }
    render() {
        return (
            <div className="user-card">
                <h3>Color Picker</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {this.props.colors.map(c => (
                        <div key={c} onClick={() => this.setState({ selected: c })}
                            style={{ width: 40, height: 40, background: c, borderRadius: '50%', cursor: 'pointer', border: this.state.selected === c ? '3px solid black' : 'none' }} />
                    ))}
                </div>
                <p>Выбран: {this.state.selected}</p>
            </div>
        );
    }
}

class TodoList extends Component {
    constructor(props) { super(props); this.state = { items: [], input: '' }; }
    addItem = () => {
        if (!this.state.input.trim()) return;
        this.setState({ items: [...this.state.items, { text: this.state.input, done: false }], input: '' });
    };
    toggle = (i) => { const items = [...this.state.items]; items[i].done = !items[i].done; this.setState({ items }); };
    remove = (i) => { const items = this.state.items.filter((_, idx) => idx !== i); this.setState({ items }); };
    render() {
        return (
            <div className="user-card">
                <h3>TodoList</h3>
                <input value={this.state.input} onChange={e => this.setState({ input: e.target.value })} placeholder="Новая задача" />
                <button onClick={this.addItem}>Добавить</button>
                <ul>
                    {this.state.items.map((item, i) => (
                        <li key={i} style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
                            <input type="checkbox" checked={item.done} onChange={() => this.toggle(i)} />
                            {item.text}
                            <button onClick={() => this.remove(i)}>×</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

class StatefulComponents extends Component {
    render() {
        return (
            <section className="task-section">
                <h2>Компоненты с состоянием</h2>
                <div className="component-demo">
                    <h3>Задание 3: Классовые компоненты</h3>
                    <Counter initialValue={0} />
                    <LoginForm />
                    <ColorPicker colors={['#ff0000', '#00ff00', '#0000ff']} />
                </div>
                <div className="component-demo">
                    <h3>Задание 4: Обработка событий</h3>
                    <TodoList />
                </div>
            </section>
        );
    }
}
export default StatefulComponents;