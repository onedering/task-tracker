// backend/src/routes/auth.ts
import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
	const { username, email, password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	const user = await User.create({ username, email, passwordHash: hash });
	res.json(user); // здесь просто вызываем res.json без return
});

router.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await User.findOne({ where: { email } });
	if (!user) {
		res.status(401).json({ error: 'User not found' });
		return; // здесь можно явно завершить обработчик, но без возвращения значения
	}

	const valid = await bcrypt.compare(password, user.passwordHash);
	if (!valid) {
		res.status(401).json({ error: 'Invalid password' });
		return;
	}

	const token = signToken({ id: user.id });
	res.json({ token }); // и здесь тоже без return
});

export default router;
