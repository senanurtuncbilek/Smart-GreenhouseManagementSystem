import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Greenhouse from './Greenhouse';
import Sensor from './Sensor';

@Table
export default class Zone extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column(DataType.STRING)
  description?: string;

  @ForeignKey(() => Greenhouse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  greenhouseId!: number;

  @BelongsTo(() => Greenhouse)
  greenhouse!: Greenhouse;

  @HasMany(() => Sensor)
  sensors!: Sensor[];
}
