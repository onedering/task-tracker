import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Task } from './Task';
import { User } from './User';

@Table({ tableName: 'comments', timestamps: true })
export class Comment extends Model {
	@ForeignKey(() => Task)
	@Column({ type: DataType.INTEGER, allowNull: false })
	taskId!: number;

	@BelongsTo(() => Task)
	task!: Task;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	authorId!: number;

	@BelongsTo(() => User)
	author!: User;
}
