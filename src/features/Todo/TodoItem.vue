<script setup lang="ts">
defineProps<{ text: string; checked: boolean }>()
</script>

<template>
  <li>
    <button
      type="button"
      class="flex w-full justify-between rounded-md border-2 border-blue-700 p-2"
      :class="{ ['bg-blue-300']: checked, ['border-transparent']: checked }"
      @click="$emit('checked')"
    >
      <span :class="{ ['line-through']: checked }">{{ text }}</span>
      <button
        type="button"
        class="rounded-md bg-blue-700 px-2 text-white transition-colors hover:bg-blue-800 hover:text-gray-200 active:bg-blue-900 md:active:text-gray-400"
        @click.stop.prevent="$emit('delete')"
      >
        Delete
      </button>
    </button>
  </li>
</template>

<style scoped></style>
