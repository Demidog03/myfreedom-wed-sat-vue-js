<script setup lang="ts">
import useTasks from '@/modules/tasks/composables/useTasks';
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

const text = ref<string>('Text')
const counter = ref<number>(0)

const { tasks } = useTasks()

onMounted(() => { // первичный рендер
    console.log('Компонент появился на странице!')
    console.log(tasks.value)
})

watch(text, () => {
    console.log(`Реактивная переменная text изменила свое значение: ${text.value}`)
})

watch(counter, () => {
    console.log(`Реактивная переменная counter изменила свое значение: ${counter.value}`)
}, { immediate: true }) // immediate -> сразу же -> незамедленно
// immediate: true -> следи за изменениями переменной при этом в начале запустись хотя бы один раз
// watch + immediate: true = watch + onMounted

// watchEffect(() => {
//     console.log(`Реактивная переменная text изменила свое значение: ${text.value}`)
// })

// watchEffect(() => {
//     console.log(`Реактивная переменная counter изменила свое значение: ${counter.value}`)
// })

// watch([text, counter], () => {
//     console.log(`Реактивная переменная text изменила свое значение: ${text.value}`)
//     console.log(`Реактивная переменная counter изменила свое значение: ${counter.value}`)
// })

function changeText() {
    text.value = 'Text 2'
}

function increaseCounter() {
    counter.value++
}
</script>

<template>
    <RouterLink to="/">Перейти на главную страницу</RouterLink>
    <h1>Test Page</h1>
    <h2>{{ text }}</h2>
    <button @click="changeText">Change text</button>
    <h2>{{ counter }}</h2>
    <button @click="increaseCounter">Increase counter</button>
</template>

<style scoped></style>