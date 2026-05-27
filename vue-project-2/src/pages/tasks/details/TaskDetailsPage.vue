<script setup lang="ts">
import useTasks from '@/modules/tasks/composables/useTasks';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const { tasks } = useTasks()

onMounted(() => {
    console.log(route.params.id)
})
</script>

<template>
    <h1>{{ tasks.find(t => t.id === Number(route.params.id))?.title || 'Данные не найдены' }}</h1>
</template>

<style scoped></style>