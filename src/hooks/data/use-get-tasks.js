import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data: task } = await axios.api('/tasks')
      return task
    },
  })
}
