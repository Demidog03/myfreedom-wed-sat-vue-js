import { useMutation, useQueryClient } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";
import type { CreateTaskBody } from "../api/tasks.api.types";

export default function useAddTaskMutation() {
  const query = useQueryClient()

  return useMutation({
    mutationKey: ['add-task'],
    mutationFn: (body: CreateTaskBody) => tasksApi.createTask(body),
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
