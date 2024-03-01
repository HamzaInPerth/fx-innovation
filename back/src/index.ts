import express from 'express'
import cors from 'cors'
import { initializeModels } from './database/db'
import TaskRoutes from './routes/TaskRoutes'

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

initializeModels()
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors(corsOptions))
const port = 3000

app.use('/tasks', TaskRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
