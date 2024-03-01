import sequelize from 'sequelize'
import { Model, DataTypes, Sequelize, CreationOptional } from 'sequelize'

class Task extends Model {
  declare readonly uuid: CreationOptional<string>
  declare name: string
  declare completed: boolean
  declare readonly createdAt: CreationOptional<Date>
  declare readonly updatedAt: CreationOptional<Date>
}

export function initTask(sequelize: Sequelize): void {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uuid: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'tasks',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ['uuid']
        }
      ]
    }
  )
}

export default Task
