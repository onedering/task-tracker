// backend/src/models/User.ts
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Task } from './Task';
import { Comment } from './Comment';
import { StatusHistory } from './StatusHistory';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	username!: string;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	email!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	passwordHash!: string;

	@HasMany(() => Task, 'assigneeId')
	tasks!: Task[];

	@HasMany(() => Comment, 'authorId')
	comments!: Comment[];

	@HasMany(() => StatusHistory, 'changedBy')
	statusHistory!: StatusHistory[];
}
