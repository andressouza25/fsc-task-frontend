import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import Button from './Button'

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  const getStatusClasses = () => {
    switch (task.status) {
      case 'done':
        return {
          container: 'bg-[#00ADB5]/10 text-[#00ADB5]',
          checkbox: 'bg-[#00ADB5] text-white',
        }
      case 'in_progress':
        return {
          container: 'bg-[#FFAA04]/10 text-[#FFAA04]',
          checkbox: 'bg-[#FFAA04] text-white',
        }
      default:
        return {
          container: 'bg-[#35383E]/10 text-[#35383E]',
          checkbox: 'bg-[#35383E]/10 text-white',
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
        <Button variant="ghost">
          <TrashIcon
            className="text-[#9A9C9F]"
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
