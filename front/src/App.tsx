import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { ITask } from './interfaces/TaskInterface'
import apiServiceInstance from './services/ApiService'

/**
 * App component is the main component that handles tasks.
 * It manages tasks state, loading state, and error messages.
 */
const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMsg, setErrorMsg] = useState<string>('')

  /**
   * Fetches tasks from the server and updates the tasks state.
   * Sets loading state and handles any errors during fetching.
   */
  const fetchTasks = async () => {
    try {
      setErrorMsg('')
      setIsLoading(true)
      const fetchedTasks = await apiServiceInstance.getAllTasks()
      setTasks(fetchedTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setErrorMsg('An error occurred, please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  /**
   * Adds a new task.
   *
   * @param {string} taskName - The name of the task to be added.
   */
  const addTask = async (taskName: string) => {
    const task = await apiServiceInstance.createTask(taskName)
    setTasks([task, ...tasks])
  }

  /**
   * Deletes a task based on its UUID.
   *
   * @param {string} uuid - The UUID of the task to be deleted.
   */
  const deleteTask = async (uuid: string) => {
    await apiServiceInstance.deleteTask(uuid)
    setTasks(tasks.filter((task: ITask) => task.uuid !== uuid))
  }

  /**
   * Toggles the completion status of a task.
   *
   * @param {string} uuid - The UUID of the task to be toggled.
   */
  const toggleTaskCompletion = async (uuid: string) => {
    const task = tasks.find((task) => task.uuid === uuid)
    if (!task) {
      await fetchTasks()
      return
    }
    await apiServiceInstance.updateTaskStatus(uuid, task.completed)
    setTasks(
      tasks.map((task: ITask) =>
        task.uuid === uuid ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <div className="container-md container flex flex-col min-h-screen justify-center items-center mx-auto bg-slate-700">
      <div className="bg-white md:p-5 p-2 mx-2 my-10 rounded-3xl shadow-2xl border border-slate-300">
        {errorMsg}
        {(isLoading && <div className="animate-spin text-xl">⏳</div>) || (
          <div className="flex flex-col space-y-10  min-w-72 max-w-96">
            <TaskForm addTask={addTask} />

            <TaskList
              tasks={tasks}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
