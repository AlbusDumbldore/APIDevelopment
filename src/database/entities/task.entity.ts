import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
// @ts-ignore
import { UserModel } from './user.model';

@Table({ tableName: 'tasks' })
export class TaskEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  public id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public importance: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public status: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public authorId: number;

  @BelongsTo(() => UserModel, {
    as: 'author',
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
  })
  public author: UserModel;
}
