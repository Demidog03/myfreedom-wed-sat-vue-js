<script setup lang="ts">
import { ref } from 'vue';
import useAddTaskMutation from '../queries/useAddTaskMutation';

const newTaskTitle = ref<string>('')
const newTaskDescription = ref<string>('')
const { mutate: addTask } = useAddTaskMutation()

function addTaskLocal() {
    // falsy => '', 0, undefined, null, false, NaN
    if (!newTaskTitle.value.trim()) {
        alert('Название не может быть пустым!')
        return
    }

    addTask({
      title: newTaskTitle.value.trim(),
      description: newTaskDescription.value.trim()
    })

    // чистка
    newTaskTitle.value = ''
    newTaskDescription.value = ''
}

</script>

<template>
    <form @submit.prevent="addTaskLocal" class="form">
        <!-- v-model -> директива two-way binding (двухсторонная привязка) -->
        <input v-model="newTaskTitle" class="input" type="text" placeholder="Напишите название задачи" required />
        <textarea v-model="newTaskDescription" class="textarea" rows="10" placeholder="Укажите описание задачи" />
        <button class="submit-btn" type="submit">Добавить</button>
    </form>
</template>

<style scoped>
.form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    max-width: 500px;
    margin-inline: auto;
}

.textarea {
    resize: none;
    outline: 0;
    padding: 7px;
    font-size: 1rem;
    background-color: #f1e2d1;
    border: 0;
    border-radius: 7px;
}

.input {
    outline: 0;
    padding: 7px;
    font-size: 1rem;
    background-color: #f1e2d1;
    border: 0;
    border-radius: 7px;
}

.input::placeholder, .textarea::placeholder {
    color: #6a5c4c;
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
    align-self: flex-end;
}
</style>
