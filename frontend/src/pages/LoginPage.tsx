// frontend/src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { api, setAuthToken } from '../services/api';

export const LoginPage: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	async function handleLogin() {
		try {
			const res = await api.post('/auth/login', { email, password });
			setAuthToken(res.data.token);
			window.location.href = '/tasks'; // переходим на страницу задач
		} catch (err: any) {
			setError('Неверные учетные данные');
		}
	}

	return (
		<div>
			<h2>Вход</h2>
			<input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
			<input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
			<button onClick={handleLogin}>Войти</button>
			{error && <p>{error}</p>}
		</div>
	);
};
