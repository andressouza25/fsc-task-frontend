import PropTypes from 'prop-types'
import { useState } from 'react'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import Button from './Button'

const TaskItem = ({ task, handleCheckboxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      setDeleteIsLoading(false)
      return toast.error(
        'Erro ao deletar a tarefa. Por favor, tente novamente.'
      )
    }
    onDeleteSuccess(task.id)
    setDeleteIsLoading(false)
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
          container: 'bg-brand-dark-blue/10 text-brand-dark-blue',
          checkbox: 'bg-brand-dark-blue/10 text-white',
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
            onChange={() => handleCheckboxClick(task.id)}
          />

          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-current" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="text-brand-text-gray animate-spin" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <a href="#" className="transation hover:opacity-75">
          <DetailsIcon />
        </a>
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
