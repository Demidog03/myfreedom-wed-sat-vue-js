<script setup lang="ts">
import LoadingAltLoopIcon from '@iconify-vue/line-md/loading-alt-loop';

defineProps<{
  isLoading: boolean
}>()

</script>

<template>
  <div v-if="isLoading" class="fullscreen-spinner">
    <LoadingAltLoopIcon height="3rem" />
  </div>
</template>

<style scoped>
.fullscreen-spinner {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
