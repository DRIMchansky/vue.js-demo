<script setup lang="ts">
import { ref } from 'vue'

import { TODO_INPUT_PLACEHOLDER } from '../../constsnts'
import { useTodoStore } from '../../store/todo'

const newTodo = ref('')
const todoStore = useTodoStore()

const handleSubmit = () => {
  todoStore.addTodo(newTodo.value)
  newTodo.value = ''
}
</script>

<template>
  <div>
    <form class="flex flex-col" @submit.prevent="handleSubmit()">
      <label for="newTodo">New ToDo</label>
      <input
        v-model="newTodo"
        name="newTodo"
        id="newTodo"
        class="block w-full rounded-md border-2 border-solid border-zinc-800 p-2"
        type="text"
        autocomplete="off"
        :placeholder="TODO_INPUT_PLACEHOLDER"
      />
      <button
        :disabled="!newTodo"
        class="mx-auto mt-5 rounded-md bg-blue-700 px-8 py-3 text-white transition-colors hover:bg-blue-800 hover:text-gray-200 active:bg-blue-900 disabled:bg-blue-300 disabled:text-gray-100 disabled:active:text-gray-100 md:px-10 md:active:text-gray-400"
        type="submit"
      >
        Add
      </button>
    </form>
  </div>
</template>

<style scoped></style>
