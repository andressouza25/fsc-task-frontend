import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { LoaderIcon } from '../assets/icons'
import { useUpdateTask } from '../hooks/data/use-update-task'
import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const TaskForm = ({ task, taskId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: task.title,
      time: task.time,
      description: task.description,
    },
  })

  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId)

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => toast.success('Tarefa atualizada com sucesso!'),
      onError: () => toast.error('Erro ao atualizar tarefa.'),
    })
  }

  return (
    <>
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
              errorMessage={errors?.title?.message}
            />
          </div>
          <div>
            <TimeSelect
              {...register('time', {
                required: 'O horário é obrigatório.',
              })}
              errorMessage={errors?.time?.message}
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
              errorMessage={errors?.description?.message}
            />
          </div>
        </div>
        {/* Botão de salvar */}
        <div className="mt-6 flex w-full justify-end gap-2">
          <Button
            size="large"
            color="primary"
            disabled={updateTaskIsLoading}
            type="submit"
          >
            {updateTaskIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </form>
    </>
  )
}

export default TaskForm
