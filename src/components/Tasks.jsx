import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'
import TaskItem from './TaskItem'
import TaskSeparator from './TasksSeparator'

const Tasks = () => {
  const queryClient = useQueryClient()
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks')
      const json = await response.json()

      if (Array.isArray(json)) return json
      if (Array.isArray(json?.tasks)) return json.tasks
      if (Array.isArray(json?.data)) return json.data

      return []
    },
  })

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task

      if (task.status === 'not_started') {
        toast.info('Tarefa iniciada com sucesso!')
        return { ...task, status: 'in_progress' }
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!')
        return { ...task, status: 'done' }
      }

      toast.warning('Tarefa reiniciada com sucesso!')
      return { ...task, status: 'not_started' }
    })

    queryClient.setQueryData(['tasks'], newTasks)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      {/* HEADER */}
      <div className="flex w-full justify-between">
        <div>
          <span className="text-brand-primary text-xs font-semibold">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar Tarefas
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova Tarefa
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </div>

      {/* LISTA */}
      <div className="rounded-xl bg-white p-6">
        {/* MANHÃ */}
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />

          {morningTasks.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}

          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        {/* TARDE */}
        <div className="my-6 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />

          {afternoonTasks.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}

          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        {/* NOITE */}
        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />

          {eveningTasks.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhuma tarefa cadastrada para o período da noite.
            </p>
          )}

          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
