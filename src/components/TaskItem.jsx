import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useUpdateTask } from '../hooks/data/use-update-task'
import Button from './Button'

const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id)

  const { mutate } = useUpdateTask(task.id)

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa!')
      },
    })
  }

  const getNewStatus = () => {
    if (task.status === 'not_started') {
      return 'in_progress'
    }
    if (task.status === 'in_progress') {
      return 'done'
    }
    return 'not_started'
  }

  const handleCheckBoxClick = () => {
    mutate(
      { status: getNewStatus() },
      {
        onSuccess: () =>
          toast.success('Status da tarefa atualizada com sucesso!'),
        onError: () => {
          'Erro ao atualizar status da tarefa. Por favor, tente novamente.'
        },
      }
    )
  }

  const getStatusClasses = () => {
    switch (task.status) {
      case 'done':
        return {
          container: 'bg-brand-primary/10 text-brand-primary',
          checkbox: 'bg-brand-primary text-white',
        }
      case 'in_progress':
        return {
          container: 'bg-brand-process/10 text-brand-process',
          checkbox: 'bg-brand-process text-white',
        }
      default:
        return {
          container: 'bg-brand-dark-blue/5 text-brand-dark-blue',
          checkbox: 'bg-brand-dark-blue/5 text-white',
        }
    }
  }

  const statusClasses = getStatusClasses()

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${statusClasses.container}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${statusClasses.checkbox}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckBoxClick}
          />

          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-current" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="text-brand-text-gray animate-spin" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default TaskItem
