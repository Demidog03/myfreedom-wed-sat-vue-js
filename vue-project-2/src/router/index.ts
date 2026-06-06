import TaskDetailsPage from '@/pages/tasks/details/TaskDetailsPage.vue'
import TasksPage from '@/pages/tasks/TasksPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks'
    },
    {
      path: '/tasks',
      component: TasksPage
    },
    {
      path: '/tasks/:id', // :id => динамический роут (динамический адрес)
      component: TaskDetailsPage
    },
  ],
})

export default router
