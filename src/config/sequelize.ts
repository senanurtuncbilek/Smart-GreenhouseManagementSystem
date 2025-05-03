import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import User from '../models/User';
import Greenhouse from '../models/Greenhouse';
import Sensor from '../models/Sensor';
import AutomationRule from '../models/AutomationRule';
import Zone from '../models/Zone';
import CropHistory from '../models/CropHistory';


config();
console.log('DB_PASS:', process.env.DB_PASS, '| Type:', typeof process.env.DB_PASS);



const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [User, Greenhouse, Sensor, AutomationRule, Zone, CropHistory],
  logging: false,
});

export default sequelize;
