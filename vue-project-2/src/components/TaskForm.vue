<script setup lang="ts">
import { ref } from 'vue';

const newTaskTitle = ref<string>('')

const emit = defineEmits<{
    addTask: [newTaskTitle: string]
}>()

function addTaskLocal() {
    emit('addTask', newTaskTitle.value.trim())

    // чистка
    newTaskTitle.value = ''
}

</script>

<template>
    <form @submit.prevent="addTaskLocal" class="form">
        <!-- v-model -> директива two-way binding (двухсторонная привязка) -->
        <input v-model="newTaskTitle" class="input" type="text" placeholder="Напишите новую задачу..." required />
        <button class="submit-btn" type="submit">Добавить</button>
    </form>
</template>

<style scoped>
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
    background-color: #1a543d;
    color: white;
    border-radius: 7px;
    font-size: 1rem;
    cursor: pointer;
}
</style>