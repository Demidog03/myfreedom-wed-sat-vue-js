<script setup lang="ts">
import type { Task } from '@/modules/tasks/types/task.types';
import { provide, toRef } from 'vue';
import { useRouter } from 'vue-router';
import ReturnTaskButton from './ReturnTaskButton.vue';
import CompleteTaskButton from './CompleteTaskButton.vue';
import DeleteTaskButton from './DeleteTaskButton.vue';
import { TASK_INJECT_KEYS } from '../constants/task.constants.ts';

const router = useRouter()

const props = defineProps<{ // переменные которые получаем с род. компонента
    task: Task,
}>()

provide(TASK_INJECT_KEYS.task, toRef(props, 'task'))

function goToDetailPage() {
    if (props.task.id) {
        router.push(`/tasks/${props.task.id}`)
    }
}
</script>

<template>
    <li @click.self="goToDetailPage" :class="task.completed ? 'completed' : 'active'">
        <span>{{ task.title }}</span>
        <div class="buttons-container">
            <CompleteTaskButton />
            <ReturnTaskButton />
            <DeleteTaskButton />
        </div>
    </li>
</template>

<style scoped>
li {
    background-color: #dcc3aa;
    padding: 7px;
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

li.completed {
    background-color: #c0dcaa;
}

li.completed:hover {
    background-color: #a1be8b;
}

li.active {
    background-color: #dcc3aa;
}

li.active:hover {
    background-color: #b79f87;
}

.buttons-container {
    display: flex;
    gap: 10px;
    align-items: center;
}
</style>
