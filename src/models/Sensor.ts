import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Greenhouse from './Greenhouse';

@Table
export default class Sensor extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column(DataType.FLOAT)
  temperature?: number;

  @Column(DataType.FLOAT)
  humidity?: number;

  @Column(DataType.FLOAT)
  soilMoisture?: number;

  @Column(DataType.FLOAT)
  light?: number;

  @ForeignKey(() => Greenhouse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  greenhouseId!: number;

  @BelongsTo(() => Greenhouse)
  greenhouse!: Greenhouse;
}
