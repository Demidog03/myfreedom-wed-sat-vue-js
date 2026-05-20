<script setup lang="ts">
import type { Task } from '@/types/task.types';

defineProps<{ // переменные которые получаем с род. компонента
    task: Task,
}>()

const emit = defineEmits<{ // функции которые получаем с род. компонента
    completeTask: [id: number],
    returnTask: [id: number],
    deleteTask: [id: number]
}>()
</script>

<template>
    <li :class="task.isCompleted ? 'completed' : 'active'">
        <span>{{ task.title }}</span>
        <div class="buttons-container">
            <button @click="emit('completeTask', task.id)" v-if="!task.isCompleted" class="in-progress-btn">
                Завершить
            </button>
            <button @click="emit('returnTask', task.id)" v-if="task.isCompleted" class="completed-btn">
                Выполнено
            </button>
            <button @click="emit('deleteTask', task.id)" class="delete-btn">
                Удалить
            </button>
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
}

li.completed {
    background-color: #c0dcaa;
}

li.active {
    background-color: #dcc3aa;
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

.delete-btn {
    padding: 3px 7px;
    background-color: #6c1d1e;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}

.buttons-container {
    display: flex;
    gap: 10px;
    align-items: center;
}
</style>