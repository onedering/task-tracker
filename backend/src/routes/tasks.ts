// backend/src/routes/tasks.ts
import { Router } from 'express';
import { Task } from '../models/Task';
import { StatusHistory } from '../models/StatusHistory';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
	const tasks = await Task.findAll({ include: ['assignee'] });
	res.json(tasks); // просто вызываем метод без return
});


router.get('/:id', async (req, res) => {
	const task = await Task.findByPk(req.params.id, { include: ['assignee', 'comments', 'statusHistory'] });
	if (!task) {
		res.status(404).json({ error: 'Task not found' });
		return; // можно просто вернуть пустой return, чтобы прекратить функцию
	}
	res.json(task);
});

router.post('/', async (req, res) => {
	const { title, description, assigneeId } = req.body;
	const task = await Task.create({ title, description, assigneeId });
	res.json(task);
});

router.put('/:id', async (req, res) => {
	const { title, description, status, assigneeId } = req.body;
	const task = await Task.findByPk(req.params.id);
	if (!task) {
		res.status(404).json({ error: 'Task not found' });
		return;
	}

	const oldStatus = task.status;
	await task.update({ title, description, status, assigneeId });

	if (oldStatus !== status) {
		await StatusHistory.create({
			taskId: task.id,
			oldStatus,
			newStatus: status,
			changedBy: (req as any).user.id,
			changedAt: new Date()
		});
	}

	res.json(task);
});


export default router;
