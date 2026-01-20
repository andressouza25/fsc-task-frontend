import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from '../assets/icons'
import Button from '../components/Button'
import Sidebar from '../components/Sidebar'
import TaskForm from '../components/TaskForm'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useGetTask } from '../hooks/data/use-get-task'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { data: task } = useGetTask({ taskId })
  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId)

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleDeleteClick = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
        navigate(-1)
      },
      onError: () => toast.error('Ocorreu um erro ao deletar a tarefa.'),
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* Barra do topo */}
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="bg-brand-primary mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link to="/" className="text-brand text-grey cursor-pointer">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand text-grey" />
              <span className="text-brand-primary font-semibold">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
            disabled={deleteTaskIsLoading}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* Renderizar formulário apenas quando task existe */}
        {task && <TaskForm task={task} taskId={taskId} navigate={navigate} />}
      </div>
    </div>
  )
}

export default TaskDetailsPage
