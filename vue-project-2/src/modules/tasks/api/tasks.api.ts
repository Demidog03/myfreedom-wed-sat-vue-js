import axios from "axios";
import type { ChangeStatusTasksResponse, CreateTaskBody, CreateTasksResponse, DeleteTaskResponse, GetTaskDetailsResponse, GetTasksResponse } from "./tasks.api.types";

async function getTasks() {
  const response = await axios.get<GetTasksResponse>('http://localhost:3000/tasks')
  return response.data
}

async function createTask(body: CreateTaskBody) {
  const response = await axios.post<CreateTasksResponse>('http://localhost:3000/tasks', body)
  return response.data
}

async function changeStatus(id: string, completed: boolean) {
  const body = {
    completed: completed
  }
  const response = await axios.patch<ChangeStatusTasksResponse>(`http://localhost:3000/tasks/${id}/status`, body)
  return response.data
}

async function deleteTask(id: string) {
  const response = await axios.delete<DeleteTaskResponse>(`http://localhost:3000/tasks/${id}`)
  return response.data
}

async function getTaskDetails(id: string) {
  const response = await axios.get<GetTaskDetailsResponse>(`http://localhost:3000/tasks/${id}`)
  return response.data
}

const tasksApi = {
  getTasks,
  createTask,
  changeStatus,
  deleteTask,
  getTaskDetails
}

export default tasksApi
