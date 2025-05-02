import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { UserRole } from '../constants/roles';
import Greenhouse from './Greenhouse';

@Table
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

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

  @HasMany(() => Greenhouse)
  greenhouses!: Greenhouse[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken?: string | null;
  
}
