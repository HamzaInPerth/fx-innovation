import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import { initTask } from '../models/task.model'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: 'mysql'
  }
)
export function initializeModels(): void {
  initTask(sequelize)
}
export default sequelize
