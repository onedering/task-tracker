// backend/src/routes/comments.ts
import { Router, Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { Task } from '../models/Task';
import { authMiddleware } from '../middleware/authMiddleware';

interface CommentsParams {
	id: string; // Параметр :id будет строковым
}

const router = Router({ mergeParams: true });

router.use(authMiddleware);

// GET /tasks/:id/comments
router.get('/', async (req: Request<CommentsParams>, res: Response) => {
	// Приводим req.params.id к числу, если нужно
	const taskId = Number(req.params.id);

	const comments = await Comment.findAll({
		where: { taskId },
		include: ['author']
	});

	// Просто вызываем res.json, без return
	res.json(comments);
});

// POST /tasks/:id/comments
router.post('/', async (req: Request<CommentsParams>, res: Response) => {
	const { text } = req.body;
	const taskId = Number(req.params.id);

	const task = await Task.findByPk(taskId);
	if (!task) {
		res.status(404).json({ error: 'Task not found' });
		return; // Просто завершаем функцию
	}

	const comment = await Comment.create({
		taskId: task.id,
		authorId: (req as any).user.id,
		text
	});

	res.json(comment);
});

export default router;
