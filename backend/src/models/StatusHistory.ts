// backend/src/models/StatusHistory.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Task } from './Task';
import { User } from './User';

@Table({ tableName: 'status_history', timestamps: false })
export class StatusHistory extends Model {
	@ForeignKey(() => Task)
	@Column({ type: DataType.INTEGER, allowNull: false })
	taskId!: number;

	@BelongsTo(() => Task, 'taskId')
	task!: Task;

	@Column({ type: DataType.ENUM('backlog', 'in_progress', 'done'), allowNull: false })
	oldStatus!: string;

	@Column({ type: DataType.ENUM('backlog', 'in_progress', 'done'), allowNull: false })
	newStatus!: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	changedBy!: number;

	@BelongsTo(() => User, 'changedBy')
	changedByUser!: User;

	@Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
	changedAt!: Date;
}
