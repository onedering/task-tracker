// backend/src/routes/dashboard.ts
import { Router, Request, Response } from 'express';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { authMiddleware } from '../middleware/authMiddleware';
import { Op, fn, col } from 'sequelize';

const router = Router();

router.use(authMiddleware);

router.get('/', async (req: Request, res: Response) => {
	const tasksCountByStatus = await Task.findAll({
		attributes: ['status', [fn('COUNT', col('id')), 'count']],
		group: ['status']
	});

	const tasksCountByUser = await Task.findAll({
		attributes: ['assigneeId', [fn('COUNT', col('id')), 'count']],
		group: ['assigneeId'],
		include: [{ model: User, attributes: ['username'] }]
	});

	// Просто отправляем ответ без return
	res.json({ tasksCountByStatus, tasksCountByUser });
});

export default router;
