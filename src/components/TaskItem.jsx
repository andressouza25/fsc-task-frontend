import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import Button from './Button'

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
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
        <Button color="ghost">
          <TrashIcon
            className="text-brand-text-gray"
            onClick={() => handleDeleteClick(task.id)}
          />
        </Button>
        <a href="#" className="transation hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}

export default TaskItem
