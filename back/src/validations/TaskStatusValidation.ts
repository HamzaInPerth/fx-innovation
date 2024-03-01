import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export default [
  body('completed')
    .isBoolean()
    .withMessage('Completed must be a boolean value'),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    next()
  }
]
