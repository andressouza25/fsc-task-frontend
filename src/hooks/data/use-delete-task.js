import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`)
      return deletedTask
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldtask) => {
        return oldtask.filter((oldtask) => oldtask.id !== deletedTask.id)
      })
    },
  })
}
