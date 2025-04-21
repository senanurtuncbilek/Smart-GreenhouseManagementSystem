import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { UserRole } from '../constants/roles';

@Table
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.Farmer,
  })
  role!: UserRole;
}
