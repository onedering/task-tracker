// frontend/src/pages/TasksPage.tsx
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Task {
	id: number;
	title: string;
	status: string;
	assignee: { username: string };
}

export const TasksPage: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		async function loadTasks() {
			const res = await api.get('/tasks');
			setTasks(res.data);
		}
		loadTasks();
	}, []);

	return (
		<div>
			<h2>Задачи</h2>
			<table>
				<thead>
					<tr>
						<th>Заголовок</th>
						<th>Статус</th>
						<th>Ответственный</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map(t => (
						<tr key={t.id}>
							<td>{t.title}</td>
							<td>{t.status}</td>
							<td>{t.assignee?.username}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
