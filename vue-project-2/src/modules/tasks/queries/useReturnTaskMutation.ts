import { useMutation, useQueryClient } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";

export default function useReturnTaskMutation() {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['return-task-status'],
    mutationFn: (id: string) => tasksApi.changeStatus(id, false),
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
