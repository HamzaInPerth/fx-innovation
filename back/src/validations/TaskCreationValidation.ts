import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export default [
  body('name')
    .isString()
    .withMessage('Task name has a wrong format')
    .isLength({ min: 1, max: 255 })
    .withMessage('Task name must be between 1-255 character long.'),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    }
    next()
  }
]
