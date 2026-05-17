<script setup lang="ts">
import { ref, computed } from 'vue'

interface Task {
  id: number
  title: string
  isCompleted: boolean
}

const tasks = ref<Task[]>([
  { id: 1, title: 'Изучить Vue.js', isCompleted: false },
  { id: 2, title: 'Изучить JS', isCompleted: true },
])

const activeTasksAmount = computed(() => tasks.value.filter((t) => t.isCompleted === false).length)
const completedTasksAmount = computed(
  () => tasks.value.filter((t) => t.isCompleted === true).length,
)

console.log(activeTasksAmount)
console.log(completedTasksAmount)

const newTaskTitle = ref<string>('')

function addTask() {
  console.log(newTaskTitle.value)

  const newTaks: Task = {
    id: Date.now(),
    title: newTaskTitle.value.trim(),
    isCompleted: false,
  }

  tasks.value.push(newTaks)

  // чистка инпута
  newTaskTitle.value = ''
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

// function changeNewTaskTitleValue() {
//   newTaskTitle.value = 'Saga'
// }
</script>

<template>
  <div class="container">
    <h2 class="title">Менеджер задач</h2>

    <form @submit.prevent="addTask" class="form">
      <!-- v-model -> директива two-way binding (двухсторонная привязка) -->
      <input
        v-model="newTaskTitle"
        class="input"
        type="text"
        placeholder="Новая задача..."
        required
      />
      <button class="submit-btn" type="submit">Добавить</button>
    </form>

    <p>Количество задач: {{ activeTasksAmount }} активно, {{ completedTasksAmount }} выполнено</p>

    <ul class="tasks-list">
      <li v-for="task in tasks">
        <span>{{ task.title }}</span>
        <button @click="completeTask(task.id)" v-if="!task.isCompleted" class="in-progress-btn">
          Завершить
        </button>
        <button @click="returnTask(task.id)" v-if="task.isCompleted" class="completed-btn">
          Выполнено
        </button>
      </li>
    </ul>

    <!-- <button @click="changeNewTaskTitleValue">Поменять значение newTaskTitle</button> -->
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin-inline: auto;
  padding: 40px 20px;

  color: #541a1a;
}

.title {
  text-align: center;
}

.form {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.input {
  outline: 0;
  padding: 7px;
  font-size: 1rem;
  background-color: #f1e2d1;
  border: 0;
  border-radius: 7px;
}

.submit-btn {
  border: 0;
  padding: 7px 12px;
  font-weight: 600;
  background-color: #541a1a;
  color: white;
  border-radius: 7px;
  font-size: 1rem;
  cursor: pointer;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  list-style-type: none;
}

.tasks-list li {
  background-color: #dcc3aa;
  padding: 7px;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
}

.in-progress-btn {
  padding: 3px 7px;
  background-color: #326460;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.completed-btn {
  padding: 3px 7px;
  background-color: #1d6c1d;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
</style>
