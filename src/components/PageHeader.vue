<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <h2 class="text-center text-3xl font-semibold text-stone-900">{{ text }}</h2>
</template>

<style scoped></style>
