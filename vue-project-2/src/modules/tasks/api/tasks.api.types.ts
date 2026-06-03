import type { Task } from "../types/task.types";

export type GetTasksResponse = Task[]

export type CreateTasksResponse = Task

export type ChangeStatusTasksResponse = Task

export interface CreateTaskBody {
  title: string
  description?: string
}

export interface DeleteTaskResponse {
  message: string
}

export type GetTaskDetailsResponse = Task
