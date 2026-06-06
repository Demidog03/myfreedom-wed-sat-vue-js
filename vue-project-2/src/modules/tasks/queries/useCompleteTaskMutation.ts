import { useMutation, useQueryClient } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";

export default function useCompleteTaskMutation() {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['complete-task-status'],
    mutationFn: (id: string) => tasksApi.changeStatus(id, true),
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
