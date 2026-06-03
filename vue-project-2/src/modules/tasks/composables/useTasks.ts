import type { Task } from '@/modules/tasks/types/task.types'
import { computed, onMounted, ref } from 'vue'
import tasksApi from '../api/tasks.api'

export default function useTasks() {
    const tasks = ref<Task[]>([])
    const selectedTask = ref<Task>()
    const selectedTaskId = ref<string>()
    const isLoading = ref<boolean>(false)

    const activeTasksAmount = computed(() => tasks.value.filter((t) => t.completed === false).length)
    const completedTasksAmount = computed(
        () => tasks.value.filter((t) => t.completed === true).length,
    )

    onMounted(() => {
      getTasks()
    })

    function startLoading() {
      isLoading.value = true
    }

    function stopLoading() {
      isLoading.value = false
    }

    function setSelectedTaskId(id: string) {
      selectedTaskId.value = id
    }

    async function getTaskDetails() {
      if (selectedTaskId.value) {
        try {
          startLoading()
          const data = await tasksApi.getTaskDetails(selectedTaskId.value)
          selectedTask.value = data
        }
        finally {
          stopLoading()
        }
      }
    }

    async function getTasks() {
      try {
        startLoading()
        const data = await tasksApi.getTasks()
        tasks.value = data
      }
      finally {
        stopLoading()
      }
    }

    async function addTask(newTaskTitle: string, newTaskDescription?: string) {
        try {
          startLoading()
          const newData = {
            title: newTaskTitle,
            description: newTaskDescription
          }

          await tasksApi.createTask(newData)
        }
        finally {
          stopLoading()
        }

        getTasks()
        getTaskDetails()
    }

    async function completeTask(id: string) {
      try {
        startLoading()
        await tasksApi.changeStatus(id, true)
      }
      finally {
        stopLoading()
      }

      getTasks()
      getTaskDetails()
    }

    async function returnTask(id: string) {
      try {
        startLoading()
        await tasksApi.changeStatus(id, false)
      }
      finally {
        stopLoading()
      }

      getTasks()
      getTaskDetails()
    }

    async function deleteTask(id: string) {
      try {
        startLoading()
        await tasksApi.deleteTask(id)
      }
      finally {
        stopLoading()
      }

      getTasks()
      getTaskDetails()
    }

    return {
        // данные - refы
        selectedTask,
        tasks,
        isLoading,
        activeTasksAmount,
        completedTasksAmount,
        // функции
        addTask,
        completeTask,
        returnTask,
        deleteTask,
        getTaskDetails,
        setSelectedTaskId
    }
}
