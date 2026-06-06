<script setup lang="ts">
import { inject } from 'vue';
import type { Task } from '../types/task.types';
import { TASK_INJECT_KEYS } from '../constants/task.constants';
import useCompleteTaskMutation from '../queries/useCompleteTaskMutation';

const task = inject<Task>(TASK_INJECT_KEYS.task)!
const { mutate: completeTask } = useCompleteTaskMutation()

</script>

<template>
    <button @click="completeTask(task.id)" v-if="!task.completed" class="in-progress-btn">
        Выполнить
    </button>
</template>

<style scoped>
.in-progress-btn {
    padding: 3px 7px;
    background-color: #df9c3e;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}
</style>
