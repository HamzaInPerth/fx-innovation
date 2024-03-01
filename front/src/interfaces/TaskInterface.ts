export interface ITask {
  uuid: string
  name: string
  completed: boolean
}

export interface TaskFormProps {
  addTask: (taskName: string) => void
}

export interface TaskListProps {
  tasks: ITask[]
  deleteTask: (uuid: string) => void
  toggleTaskCompletion: (uuid: string) => void
}

export interface TaskItemProps {
  task: ITask
  toggleTaskCompletion: (uuid: string, completed: boolean) => void
  deleteTask: (uuid: string) => void
}
