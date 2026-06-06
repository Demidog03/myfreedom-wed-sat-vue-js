import { useMutation, useQueryClient } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";

export default function useDeleteTaskMutation() {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['delete-task'],
    mutationFn: (id: string) => tasksApi.deleteTask(id),
    onSuccess: () => {
      // если задача успешно удалится (запрос обработается успешно), переотправь запрос getTasks и getTaskDetails
      query.invalidateQueries({
        queryKey: ['get-tasks']
      })
      query.invalidateQueries({
        queryKey: ['get-task-details']
      })
    }
  })
}
