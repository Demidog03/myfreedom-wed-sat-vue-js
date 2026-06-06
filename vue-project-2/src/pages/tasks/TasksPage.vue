<script setup lang="ts">
import useGetTasksQuery from '@/modules/tasks/queries/useGetTasksQuery';
import TaskForm from '@/modules/tasks/ui/TaskForm.vue';
import TaskItem from '@/modules/tasks/ui/TaskItem.vue';
import FullscreenSpinner from '@/shared/ui/FullscreenSpinner.vue';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const { data: tasks, isLoading } = useGetTasksQuery()

const activeTasksAmount = computed(() => tasks?.value?.filter((t) => t.completed === false).length)
const completedTasksAmount = computed(
  () => tasks?.value?.filter((t) => t.completed === true).length,
)

</script>

<template>
  <div class="container">
    <!-- <a href="/test">Перейти на тестовую страницу</a> -->
    <RouterLink to="/test">Перейти на тестовую страницу</RouterLink>
    <h2 class="title">Менеджер задач</h2>

    <TaskForm />

    <p class="task-elements-text">Количество задач: {{ activeTasksAmount }} активно, {{ completedTasksAmount }}
      выполнено</p>

    <ul v-if="tasks && tasks?.length > 0" class="tasks-list">
      <TaskItem v-for="task in tasks" v-bind:key="task.id" :task="task" />
    </ul>

    <p v-if="tasks && tasks?.length === 0" class="no-tasks-text">Нет задач.</p>

    <FullscreenSpinner :is-loading="isLoading" />
  </div>
</template>

<style scoped>
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
