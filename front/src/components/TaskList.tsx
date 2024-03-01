import React from 'react'
import TaskItem from './TaskItem'
import { TaskListProps } from '../interfaces/TaskInterface'

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  deleteTask,
  toggleTaskCompletion
}) => {
  tasks.sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1
    } else if (!a.completed && b.completed) {
      return -1
    }
    return 0
  })

  return (
    <div className=" rounded-md py-2 flex flex-col space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.uuid}
          task={task}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      ))}
      {!tasks.length && (
        <div className="text-sltate-600 text-sm font-thin">No task found.</div>
      )}
    </div>
  )
}

export default TaskList
