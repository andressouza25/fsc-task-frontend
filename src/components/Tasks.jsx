import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { CloudSunIcon, MoonIcon, SunIcon } from '../assets/icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { taskQueryKeys } from '../keys/queries'
import Header from './Header'
import TaskItem from './TaskItem'
import TaskSeparator from './TasksSeparator'

const Tasks = () => {
  const queryClient = useQueryClient()

  const { data: tasks = [] } = useGetTasks()

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

    queryClient.setQueryData(taskQueryKeys.getAll(), newTasks)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      {/* HEADER */}
      <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />

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
