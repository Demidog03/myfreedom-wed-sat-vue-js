import type { Task } from '@/modules/tasks/types/task.types'
import useLocalStorageRef from '@/shared/composables/useLocalStorageRef'
import { computed } from 'vue'


export default function useTasks() {
    const tasks = useLocalStorageRef<Task[]>('tasks', [])

    const activeTasksAmount = computed(() => tasks.value.filter((t) => t.isCompleted === false).length)
    const completedTasksAmount = computed(
        () => tasks.value.filter((t) => t.isCompleted === true).length,
    )

    function addTask(newTaskTitle: string, newTaskDescription?: string) {
        const newTaks: Task = {
            id: Date.now(),
            title: newTaskTitle,
            isCompleted: false,
        }

        if (newTaskDescription) {
            newTaks.description = newTaskDescription
        }

        tasks.value.push(newTaks)
    }

    function completeTask(id: number) {
        const taskToChange = tasks.value.find((t) => t.id === id)

        if (taskToChange) {
            taskToChange.isCompleted = true
        }
    }

    function returnTask(id: number) {
        const taskToChange = tasks.value.find((t) => t.id === id)

        if (taskToChange) {
            taskToChange.isCompleted = false
        }
    }

    function deleteTask(id: number) {
        tasks.value = tasks.value.filter(t => t.id !== id)
    }

    return {
        // данные - refы
        tasks: tasks,
        activeTasksAmount: activeTasksAmount,
        completedTasksAmount: completedTasksAmount,
        // функции
        addTask: addTask,
        completeTask: completeTask,
        returnTask: returnTask,
        deleteTask: deleteTask,
    }
}