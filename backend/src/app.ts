// backend/src/app.ts
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/dbConfig';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import dashboardRoutes from './routes/dashboard';
import commentRoutes from './routes/comments';

const app = express();
app.use(cors());
app.use(express.json());

// Синхронизация БД (только при старте; в проде - миграции)
sequelize.sync({ alter: true }).then(() => {
	console.log('Database synced');
});

// Роуты
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/tasks/:id/comments', commentRoutes);
app.use('/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
