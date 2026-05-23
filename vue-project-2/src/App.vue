<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import TaskItem from './components/TaskItem.vue'
import TaskForm from './components/TaskForm.vue'
import type { Task } from './types/task.types'

const tasks = ref<Task[]>([])

const activeTasksAmount = computed(() => tasks.value.filter((t) => t.isCompleted === false).length)
const completedTasksAmount = computed(
  () => tasks.value.filter((t) => t.isCompleted === true).length,
)

onMounted(() => {
  const lsTasks = localStorage.getItem('tasks')

  if (lsTasks) {
    tasks.value = JSON.parse(lsTasks) // реактивный массив заполняем данными из ls
  }
})

watch(tasks, () => {
  if (tasks.value) {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
}, { deep: true }) // deep: true = следи не только за массивов но и за обьектам внутри
// без этого изменения внутри массива не отловятся

function addTask(newTaskTitle: string) {
  const newTaks: Task = {
    id: Date.now(),
    title: newTaskTitle,
    isCompleted: false,
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
</script>

<template>
  <div class="container">
    <h2 class="title">Менеджер задач</h2>

    <TaskForm @add-task="addTask" />

    <p class="task-elements-text">Количество задач: {{ activeTasksAmount }} активно, {{ completedTasksAmount }}
      выполнено</p>

    <ul v-if="tasks.length > 0" class="tasks-list">
      <TaskItem v-for="task in tasks" v-bind:key="task.id" :task="task" @complete-task="completeTask"
        @return-task="returnTask" @delete-task="deleteTask" />
    </ul>

    <p v-if="tasks.length === 0" class="no-tasks-text">Нет задач.</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin-inline: auto;
  padding: 40px 20px;

  color: #541a1a;
}

.task-elements-text {
  margin-top: 20px;
}

.title {
  text-align: center;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  list-style-type: none;
}

.no-tasks-text {
  margin-top: 20px;
  color: #541a1a7d;
  text-align: center;
}
</style>
