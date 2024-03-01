import React from 'react'
import { TaskItemProps } from '../interfaces/TaskInterface'
import { TaskCheckedSVG } from './TaskCheckedSVG'
import TaskDeletedSVG from './TaskDeleteSVG'

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleTaskCompletion,
  deleteTask
}) => {
  return (
    <div className="flex flex-row space-x-2 items-center justify-between w-full border-b pb-2">
      <div className="flex flex-row space-x-2 items-center flex-grow">
        <button
          className="p-1"
          onClick={() => toggleTaskCompletion(task.uuid, !task.completed)}
        >
          <TaskCheckedSVG isCompleted={task.completed} />
        </button>
        <div className="flex-grow break-normal ">
          <span
            className={` break-all  ${
              task.completed ? 'line-through font-thin' : ''
            }`}
          >
            {task.name}
          </span>
        </div>
      </div>
      <div>
        <button onClick={() => deleteTask(task.uuid)}>
          <TaskDeletedSVG />
        </button>
      </div>
    </div>
  )
}

export default TaskItem
