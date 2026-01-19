import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()
  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      setTask(data)
    }

    fetchTask()
  }, [taskId])

  const handleSaveClick = async () => {
    setSaveIsLoading(true)
    const newErrors = []
    const title = titleRef.current.valeu
    const description = descriptionRef.current.valeu
    const time = timeRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório',
      })
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório',
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória',
      })
    }
    setErrors(newErrors)
    if (newErrors.length > 0) {
      return setSaveIsLoading(false)
    }

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    })
    if (!response.ok) {
      toast.error('Ocorreu um erro ao salvar a tarefa.')
      return setSaveIsLoading(false)
    }
    const newTask = await response.json()
    setTask(newTask)
    setSaveIsLoading(false)
    toast.success('Tarefa salva com sucesso.')
  }

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao deletar a tarefa.')
    }

    toast.success('Tarefa deletada com sucesso!')
    navigate(-1)
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* Dados da tarefa */}
        <div className="bg-brand-white mt-6 space-y-6 rounded-xl p-6">
          <div>
            <Input
              id="title"
              label="Título"
              defaultValeu={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>
          <div>
            <TimeSelect
              defaultValeu={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValeu={task?.description}
              errorMessage={errors?.description}
              ref={descriptionError?.message}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-2">
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
