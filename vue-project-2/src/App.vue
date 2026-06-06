<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { RouterView } from 'vue-router';

</script>

<template>
  <RouterView/>
  <VueQueryDevtools />
  <!-- /tasks => <RouterView/> => <TasksPage/> -->
  <!-- /test => <RouterView/> => <TestPage/> -->
</template>

<style scoped></style>
