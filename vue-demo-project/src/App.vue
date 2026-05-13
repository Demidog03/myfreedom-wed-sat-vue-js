<script setup lang="ts">
import { ref } from 'vue'
import Page1 from './Page1.vue'
import Page2 from './Page2.vue'

type Pages = 'Page1' | 'Page2'

// let activePage: Pages = 'Page1'

// Observable/Subscriber - ref
const activePage = ref<Pages>('Page1')

function activatePage2() {
  activePage.value = 'Page2' // rerender
  console.log(activePage)
}
</script>

<template>
  <!-- conditional render -->
  <Page1 v-if="activePage === 'Page1'" />
  <Page2 v-if="activePage === 'Page2'" />

  <button @click="activatePage2">Go to Page 2</button>
</template>

<style scoped></style>
