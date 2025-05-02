import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Greenhouse from './Greenhouse';
import Zone from './Zone';

@Table
export default class Sensor extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: 'temperature' | 'humidity' | 'soil' | 'light';

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  value!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  unit?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  timestamp!: Date;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  status!: 'active' | 'inactive' | 'error';

  
  @ForeignKey(() => Greenhouse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  greenhouseId!: number;


  @ForeignKey(() => Zone)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  zoneId?: number;
  
  @BelongsTo(() => Zone)
  zone?: Zone;


  @BelongsTo(() => Greenhouse)
  greenhouse!: Greenhouse;
}
