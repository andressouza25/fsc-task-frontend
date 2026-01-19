import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
  const {
    register,
    formState: { erros, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

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
      reset(data)
    }

    fetchTask()
  }, [taskId, reset])

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time.trim(),
      }),
    })
    if (!response.ok) {
      return toast.error('Ocorreu um erro ao salvar a tarefa.')
    }
    const newTask = await response.json()
    setTask(newTask)
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
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="bg-brand-white mt-6 space-y-6 rounded-xl p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register('title', {
                  required: 'O título é obrigatório.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio.'
                    }
                    return true
                  },
                })}
                errorMessage={erros?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                {...register('time', {
                  required: 'O horário é obrigatório.',
                })}
                errorMessage={erros?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                {...register('description', {
                  required: 'A descrição é obrigatória.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia.'
                    }
                    return true
                  },
                })}
                errorMessage={erros?.description?.message}
              />
            </div>
          </div>
          {/* Botão de salvar */}
          <div className="flex w-full justify-end gap-2">
            <Button
              size="large"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
