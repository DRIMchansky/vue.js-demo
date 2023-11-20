import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

type TodoItem = {
  text: string
  checked: boolean
  id: string
}

export const useTodoStore = defineStore(
  'todo',
  () => {
    const todos = ref<TodoItem[]>([])

    const numTodos = computed(() => todos.value.length)

    const numCheckedTodos = computed(() => todos.value.filter(e => e.checked).length)

    const sortedTodos = computed(() =>
      Array.from(todos.value).sort((a, b) => Number(a.checked) - Number(b.checked))
    )

    const addTodo = (text: string) => {
      const newTodo = {
        text,
        checked: false,
        id: nanoid()
      }
      todos.value = [...todos.value, newTodo]
    }

    const toggleTodoChecked = (id: string) => {
      const item = todos.value.find(t => t.id === id)
      if (item) {
        item.checked = !item.checked
      }
    }

    const deleteTodo = (id: string) => {
      const index = todos.value.findIndex(t => t.id === id)
      todos.value.splice(index, 1)
    }

    return { todos, sortedTodos, numTodos, numCheckedTodos, addTodo, toggleTodoChecked, deleteTodo }
  },
  { persist: true }
)
