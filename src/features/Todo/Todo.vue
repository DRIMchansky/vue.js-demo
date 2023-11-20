<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue'
import TodoCreator from './TodoCreator.vue'
import TodoList from './TodoList.vue'
</script>

<template>
  <div class="mx-auto mt-5 max-w-3xl">
    <PageHeader text="ToDo App" />

    <TodoCreator />
    <TodoList />
  </div>
</template>

<style scoped></style>
