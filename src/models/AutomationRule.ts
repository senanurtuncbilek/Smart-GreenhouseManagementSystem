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
  conditions!: {
    sensor: 'temperature' | 'humidity' | 'soil' | 'light';
    operator: '>' | '<' | '=' | '>=' | '<=';
    value: number;
  }[];

  @Column(DataType.JSONB)
  actions!: {
    device: 'ventilation' | 'waterSystem' | string;
    action: 'START' | 'STOP';
    duration?: number;
  }[];

  @Column(DataType.INTEGER)
  priority!: number;

  @Column(DataType.JSONB)
  activeHours?: {
    start: string; // "08:00"
    end: string;   // "18:00"
  };

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  isActive!: boolean;
}
