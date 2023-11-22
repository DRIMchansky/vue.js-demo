<script setup lang="ts">
import { Post } from '../../store/posts'
import PageHeader from '../../components/PageHeader.vue'

defineProps<{
  data: Post | undefined
}>()
</script>

<template>
  <div v-if="data">
    <PageHeader :text="data.title" />
    <article class="mt-4">
      <p>{{ data.body }}</p>
    </article>
  </div>

  <div v-else>Loading...</div>
</template>

<style scoped></style>
