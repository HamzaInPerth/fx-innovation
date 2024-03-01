import React, { useState } from 'react'
import { TaskFormProps } from '../interfaces/TaskInterface'

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (!input) return
      setIsLoading(true)
      setErrorMsg('')
      await addTask(input)
      setInput('')
    } catch (error: any) {
      let message = ''
      if (Array.isArray(error?.response?.data?.errors)) {
        message = error.response.data.errors
          .map(({ msg }: { msg: string }) => msg)
          .filter((msg: string) => msg)
          .join(', ')
      }
      setErrorMsg(message || 'An unprecdictable error occured.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2  ">
      <div className="flex flex-row space-x-2  justify-between">
        {!isLoading && (
          <input
            className="p-2 flex-1 text-slate-700 outline-none border border-slate-300"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task"
          />
        )}
        <button
          type="submit"
          className="bg-teal-600 text-white  disabled:opacity-50 p-2 flex-1 font-semibold rounded-lg"
          disabled={isLoading || !input}
        >
          {isLoading ? 'Loading...' : 'ADD'}
        </button>
      </div>
      {errorMsg && (
        <p className="bg-red-200 text-red-800 font-semibold text-center rounded">
          {errorMsg}
        </p>
      )}
    </form>
  )
}

export default TaskForm
