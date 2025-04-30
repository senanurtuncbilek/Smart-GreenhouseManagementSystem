import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Greenhouse from './Greenhouse';

@Table
export default class AutomationRule extends Model {
  @ForeignKey(() => Greenhouse)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  greenhouseId!: number;

  @BelongsTo(() => Greenhouse)
  greenhouse!: Greenhouse;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.JSONB)
  condition!: {
    type: 'temperature' | 'humidity' | 'soil' | 'light',
    operator: '>' | '<' | '=' | '>=' | '<=',
    value: number
  };

  @Column(DataType.JSONB)
  action!: {
    type: 'log' | 'warning' | 'irrigation',
    message: string
  };

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  isActive!: boolean;
}
