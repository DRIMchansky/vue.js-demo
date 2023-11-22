<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue'
import TodoCreator from './TodoCreator.vue'
import TodoList from './TodoList.vue'
</script>

<template>
  <PageHeader text="ToDo App" />

  <TodoCreator />
  <TodoList />
</template>

<style scoped></style>
