// backend/src/config/dbConfig.ts
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Task } from '../models/Task';
import { Comment } from '../models/Comment';
import { StatusHistory } from '../models/StatusHistory';

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: Number(process.env.DB_PORT) || 5432,
	database: process.env.DB_NAME || 'tasktracker',
	username: process.env.DB_USER || 'user',
	password: process.env.DB_PASS || 'pass',
	models: [User, Task, Comment, StatusHistory],
	logging: false
});

export default sequelize;
