import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { User } from '../models/User'
import { Role } from '../models/Role'
dotenv.config()

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_SERVER_NAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //   dialectOptions: {
  //     ssl: {
  //       require: true, // This will help you. But you will see nwe error
  //       rejectUnauthorized: false, // This line will fix new error
  //     },
  //   },
  models: [Role, User],
})
