import { Router } from 'express'
import TaskController from '../controllers/TaskController'
import checkTaskExists from '../middlewares/checkTaskExists'
import TaskStatusValidation from '../validations/TaskStatusValidation'
import TaskCreationValidation from '../validations/TaskCreationValidation'

class TaskRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes() {
    this.router.get('/', TaskController.getAllTasks)
    this.router.post('/', TaskCreationValidation, TaskController.createTask)
    this.router.put(
      '/:uuid',
      checkTaskExists,
      TaskStatusValidation,
      TaskController.updateTaskStatus
    )
    this.router.delete('/:uuid', checkTaskExists, TaskController.deleteTask)
  }
}

export default new TaskRoutes().router
