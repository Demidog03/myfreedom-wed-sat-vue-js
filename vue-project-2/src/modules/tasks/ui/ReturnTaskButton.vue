<script setup lang="ts">
import { inject } from 'vue';
import type { Task } from '../types/task.types';
import { TASK_INJECT_KEYS } from '../constants/task.constants';

const task = inject<Task>(TASK_INJECT_KEYS.task)!
const returnTask = inject<(id: number) => void>(TASK_INJECT_KEYS.returnTask)!

</script>

<template>
    <button @click="returnTask(task.id)" v-if="task.isCompleted" class="completed-btn">
        Выполнено
    </button>
</template>

<style scoped>
.completed-btn {
    padding: 3px 7px;
    background-color: #1d6c1d;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}
</style>