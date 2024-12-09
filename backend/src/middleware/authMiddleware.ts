// backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
	const header = req.headers.authorization;
	if (!header) {
		res.status(401).json({ error: 'No token provided' });
		return; // важно просто прервать выполнение, но не возвращать res.
	}

	const [scheme, token] = header.split(' ');
	if (scheme !== 'Bearer' || !token) {
		res.status(401).json({ error: 'Invalid token format' });
		return;
	}

	try {
		const decoded = verifyToken(token);
		(req as any).user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' });
		return;
	}
};
