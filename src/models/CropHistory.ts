import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Greenhouse from './Greenhouse';

@Table
export default class CropHistory extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cropName!: string;

  @Column(DataType.DATE)
  plantedAt!: Date;

  @Column(DataType.DATE)
  harvestedAt?: Date;

  @ForeignKey(() => Greenhouse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  greenhouseId!: number;

  @BelongsTo(() => Greenhouse)
  greenhouse!: Greenhouse;
}
