import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Roles } from '../../validation/app.types';

@Table({ tableName: 'users' })
export class UserEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  public id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public password: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: Roles.user })
  public role: string;
}
