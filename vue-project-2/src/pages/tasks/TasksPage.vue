<script setup lang="ts">
import useTasks from '@/modules/tasks/composables/useTasks';
import TaskForm from '@/modules/tasks/ui/TaskForm.vue';
import TaskItem from '@/modules/tasks/ui/TaskItem.vue';
import { RouterLink } from 'vue-router';

const { tasks, activeTasksAmount, completedTasksAmount, addTask, completeTask, deleteTask, returnTask } = useTasks()

</script>

<template>
  <div class="container">
    <!-- <a href="/test">Перейти на тестовую страницу</a> -->
    <RouterLink to="/test">Перейти на тестовую страницу</RouterLink>
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
