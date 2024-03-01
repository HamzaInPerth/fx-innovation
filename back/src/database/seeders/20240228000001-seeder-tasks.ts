import { QueryInterface } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('tasks', [
      {
        uuid: uuidv4(),
        name: 'Sample Task 1',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(),
        name: 'Sample Task 2',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface: QueryInterface) {
    // await queryInterface.bulkDelete('tasks', null, {})
  }
}
