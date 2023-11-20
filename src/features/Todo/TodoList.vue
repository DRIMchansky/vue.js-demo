<script setup lang="ts">
import { TransitionGroup } from 'vue'

import { useTodoStore } from '../../store/todo'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
</script>

<template>
  <div class="mt-5">
    <h3>TodoList</h3>
    <hr />
    <div class="mt-4 flex gap-2">
      <span class=""
        >Num todos:
        <b>{{ todoStore.numTodos }}</b>
      </span>
      <span class=""
        >Num checked: <b>{{ todoStore.numCheckedTodos }}</b>
      </span>
    </div>

    <transition-group name="todo" tag="ul" class="mt-4 flex flex-col gap-4">
      <TodoItem
        v-for="item in todoStore.sortedTodos"
        :text="item.text"
        :checked="item.checked"
        :key="item.id"
        @checked="todoStore.toggleTodoChecked(item.id)"
        @delete="todoStore.deleteTodo(item.id)"
      />
    </transition-group>
  </div>
</template>

<style scoped>
.todo-enter-active,
.todo-leave-active {
  transition: all 0.5s ease;
}
.todo-enter-from,
.todo-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
