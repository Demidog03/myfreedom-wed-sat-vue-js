<script setup lang="ts">
import useTasks from '@/modules/tasks/composables/useTasks';
import { TASK_INJECT_KEYS } from '@/modules/tasks/constants/task.constants';
import CompleteTaskButton from '@/modules/tasks/ui/CompleteTaskButton.vue';
import DeleteTaskButton from '@/modules/tasks/ui/DeleteTaskButton.vue';
import ReturnTaskButton from '@/modules/tasks/ui/ReturnTaskButton.vue';
import { computed, onMounted, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LeftFillIcon from '@iconify-vue/mingcute/left-fill';
import FullscreenSpinner from '@/shared/ui/FullscreenSpinner.vue';

const route = useRoute()
const router = useRouter()
const { selectedTask, isLoading, completeTask, setSelectedTaskId, returnTask, deleteTask, getTaskDetails } = useTasks()

onMounted(async () => {
  if (typeof route?.params?.id === 'string') {
    setSelectedTaskId(route.params.id)
    getTaskDetails()
  }
})

const statusText = computed(() => {
    if (selectedTask?.value?.completed === true) {
        return 'Завершен'
    }
    if (selectedTask?.value?.completed === false) {
        return 'Активный'
    }
    return 'Неопределен'
})
const statusClass = computed(() => {
     if (selectedTask?.value?.completed === true) {
        return 'completed'
    }
    if (selectedTask?.value?.completed === false) {
        return 'active'
    }
    return ''
})

function deleteTaskAndRedirect(id: string) {
    deleteTask(id)
    router.replace('/tasks')
}

onMounted(() => {
    console.log(route.params.id)
})

provide(TASK_INJECT_KEYS.task, selectedTask)
provide(TASK_INJECT_KEYS.completeTask, completeTask)
provide(TASK_INJECT_KEYS.returnTask, returnTask)
provide(TASK_INJECT_KEYS.deleteTask, deleteTaskAndRedirect)
</script>

<template>
    <div class="container">
        <RouterLink class="go-back-link" to="/tasks"> <LeftFillIcon height="1em" /> Назад</RouterLink>
        <h1 class="header secondary-text">Детали задачи</h1>
        <h2 class="title"><span class="secondary-text">Название:</span> <span class="title-text">{{ selectedTask?.title
            || 'Данные не найдены' }}</span></h2>
        <p class="description"><span class="secondary-text">Описание:</span> <span class="description-text">{{
            selectedTask?.description || 'Данные не найдены' }}</span></p>
        <p class="status">Статус: <span :class="'status-text ' + statusClass">{{ statusText }} <div
                    :class="'circle-' + statusClass"></div></span></p>
        <div class="buttons-container" v-if="Boolean(selectedTask)">
            <CompleteTaskButton />
            <ReturnTaskButton />
            <DeleteTaskButton />
        </div>
        <FullscreenSpinner :is-loading="isLoading" />
    </div>
</template>

<style scoped>
.secondary-text {
    color: #541a1ad2;
}

.header {
    margin-bottom: 20px;
}

.title {
    margin-bottom: 10px;
}

.title-text {
    font-style: italic;
}

.description {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 10px;
}

.description-text {
    font-style: italic;
}

.completed {
    color: #1a543d;
    font-weight: 500;
}

.active {
    color: #cf8032;
    font-weight: 500;
}

.status {
    display: flex;
    gap: 5px;
    align-items: center;
    margin-bottom: 10px;
}

.status-text {
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;
}

.circle-completed {
    width: 5px;
    height: 5px;
    background-color: #1a543d;
    border-radius: 50%;
}

.circle-active {
    width: 5px;
    height: 5px;
    background-color: #cf8032;
    border-radius: 50%;
}

.buttons-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

.go-back-link {
    text-decoration: none;
    color: #5d5d5d;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
</style>
