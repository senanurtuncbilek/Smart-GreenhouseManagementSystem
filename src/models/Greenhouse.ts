import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import User from './User';

  
  @Table
export default class Greenhouse extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      })
      id!: number;


      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      name!: string;


      @Column(DataType.STRING)
      location?: string;
    

      @ForeignKey(() => User)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      userId!: number;
    
      @BelongsTo(() => User)
      user!: User;
      @Column(DataType.FLOAT)
      temperatureThreshold?: number;

      @Column(DataType.FLOAT)
      humidityThreshold?: number;
            
      @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
      })
      autoIrrigationEnabled?: boolean;
    

    }


        