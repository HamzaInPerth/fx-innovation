import axios, { AxiosInstance } from 'axios'
import { ITask } from '../interfaces/TaskInterface'

class ApiService {
  private _axiosInstance: AxiosInstance | null = null

  private get axiosInstance(): AxiosInstance {
    if (!this._axiosInstance) {
      this._axiosInstance = axios.create({
        baseURL: 'http://localhost:3001'
      })
    }
    return this._axiosInstance
  }

  public async getAllTasks(): Promise<ITask[]> {
    try {
      const response = await this.axiosInstance.get('/tasks')
      // This is just to simulate a real call api
      await new Promise((resolve) => setTimeout(resolve, 500))
      return response.data
    } catch (error) {
      console.error('Error in tasks:', error)
      throw error
    }
  }

  public async createTask(name: string): Promise<ITask> {
    try {
      const response = await this.axiosInstance.post('/tasks', { name })
      // This is just to simulate a real call api
      await new Promise((resolve) => setTimeout(resolve, 500))
      return response.data
    } catch (error: any) {
      console.error('Error in getAllEvents:', error)
      throw error
    }
  }

  public async deleteTask(uuid: string) {
    try {
      const response = await this.axiosInstance.delete(`/tasks/${uuid}`)
      return response.data
    } catch (error) {
      console.error('Error in getAllEvents:', error)
      throw error
    }
  }

  public async updateTaskStatus(uuid: string, completed: boolean) {
    try {
      const response = await this.axiosInstance.put(`/tasks/${uuid}`, {
        completed
      })
      return response.data
    } catch (error) {
      console.error('Error in getAllEvents:', error)
      throw error
    }
  }
}

const apiServiceInstance = new ApiService()

export default apiServiceInstance
