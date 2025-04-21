import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import User from '../models/User';
config();
console.log('DB_PASS:', process.env.DB_PASS, '| Type:', typeof process.env.DB_PASS);



const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [User],
  logging: false,
});

export default sequelize;
