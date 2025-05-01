import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class UserEntity extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public password: string;
}
