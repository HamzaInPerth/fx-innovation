import { Request, Response, NextFunction } from 'express'
import Task from '../models/task.model'

declare global {
  namespace Express {
    interface Request {
      currentTask: Task
    }
  }
}

const checkTaskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid } = req.params
  const task = await Task.findOne({ where: { uuid } })
  if (task) {
    req.currentTask = task
    next()
  } else {
    res.status(404).json({ message: 'Task not found' })
  }
}

export default checkTaskExists
