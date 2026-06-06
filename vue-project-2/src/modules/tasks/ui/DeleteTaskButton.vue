<script setup lang="ts">
import { inject } from 'vue';
import type { Task } from '../types/task.types';
import { TASK_INJECT_KEYS } from '../constants/task.constants';
import useDeleteTaskMutation from '../queries/useDeleteTaskMutation';
import { useRouter } from 'vue-router';

defineProps<{
  shouldRedirect?: boolean
}>()

const router = useRouter()
const task = inject<Task>(TASK_INJECT_KEYS.task)!
const { mutate: deleteTask } = useDeleteTaskMutation()

</script>

<template>
    <button @click="() => {
      deleteTask(task.id)
      if (shouldRedirect) {
        router.replace('/tasks')
      }
    }" class="delete-btn">
        Удалить
    </button>
</template>

<style scoped>
.delete-btn {
    padding: 3px 7px;
    background-color: #6c1d1e;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}
</style>
