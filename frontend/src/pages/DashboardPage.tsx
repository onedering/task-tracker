// frontend/src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export const DashboardPage: React.FC = () => {
	const [data, setData] = useState<any>({ tasksCountByStatus: [], tasksCountByUser: [] });

	useEffect(() => {
		async function loadData() {
			const res = await api.get('/dashboard');
			setData(res.data);
		}
		loadData();
	}, []);

	return (
		<div>
			<h2>Дашборд</h2>
			<h3>Количество задач по статусам</h3>
			<ul>
				{data.tasksCountByStatus.map((item: any, i: number) => (
					<li key={i}>
						{item.status}: {item.count}
					</li>
				))}
			</ul>

			<h3>Количество задач по пользователям</h3>
			<ul>
				{data.tasksCountByUser.map((item: any, i: number) => (
					<li key={i}>
						{item.User.username}: {item.count}
					</li>
				))}
			</ul>
		</div>
	);
};
