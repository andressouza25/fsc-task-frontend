import { useQuery } from '@tanstack/react-query'

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks')
      const json = await response.json()

      if (Array.isArray(json)) return json
      if (Array.isArray(json?.tasks)) return json.tasks
      if (Array.isArray(json?.data)) return json.data

      return []
    },
  })
}
