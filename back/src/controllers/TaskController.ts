import { Request, Response } from 'express'
import Task from '../models/task.model'
import { Op } from 'sequelize'

class TaskController {
  /**
   * Retrieves all tasks from the database.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  public async getAllTasks(req: Request, res: Response) {
    try {
      const tasks: Task[] = await Task.findAll({
        order: [['createdAt', 'DESC']]
      })
      res.status(200).json(tasks)
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
  }

  /**
   * Creates a new task in the database.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  public async createTask(req: Request, res: Response) {
    try {
      const { name } = req.body
      const task = await Task.create({
        name
      })
      res.status(200).json(task)
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
  }

  /**
   * Updates the status of an existing task.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  public async updateTaskStatus(req: Request, res: Response) {
    try {
      const { currentTask } = req
      const { completed } = req.body

      currentTask.completed = completed
      const task = await currentTask.save()
      res.status(200).json({ message: 'Task status updated !', task })
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
  }

  /**
   * Deletes a task from the database.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  public async deleteTask(req: Request, res: Response) {
    try {
      const { currentTask } = req
      const { uuid } = req.currentTask
      await currentTask.destroy()

      const isDeleted = !!!(await Task.findOne({ where: { uuid } }))
      const status = isDeleted ? 200 : 400
      res.status(status).json({ message: 'Task deleted !', isDeleted })
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
  }
}

export default new TaskController()
