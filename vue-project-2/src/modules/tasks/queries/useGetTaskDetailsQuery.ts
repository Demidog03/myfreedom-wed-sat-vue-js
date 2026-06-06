import { useQuery } from "@tanstack/vue-query";
import tasksApi from "../api/tasks.api";

export default function useGetTaskDetailsQuery(id: string) {
  return useQuery({
    queryKey: ['get-task-details', id],
    queryFn: () => tasksApi.getTaskDetails(id),
    enabled: Boolean(id), // запусти запрос только тогда когда id придет,
  })
}
