// backend/src/models/Task.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { Comment } from './Comment';
import { StatusHistory } from './StatusHistory';

@Table({ tableName: 'tasks', timestamps: true })
export class Task extends Model {
	@Column({ type: DataType.STRING, allowNull: false })
	title!: string;

	@Column({ type: DataType.TEXT })
	description!: string;

	@Column({ type: DataType.ENUM('backlog', 'in_progress', 'done'), defaultValue: 'backlog', allowNull: false })
	status!: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	assigneeId!: number;

	@BelongsTo(() => User, 'assigneeId')
	assignee!: User;

	@HasMany(() => Comment, 'taskId')
	comments!: Comment[];

	@HasMany(() => StatusHistory, 'taskId')
	statusHistory!: StatusHistory[];
}
