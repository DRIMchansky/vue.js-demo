<script setup lang="ts">
defineProps<{
  href: string
  text: string
}>()
</script>

<template>
  <router-link :to="href" custom v-slot="{ href, navigate, isActive }">
    <li class="flex-1 md:flex-initial">
      <a
        :href="href"
        @click="navigate"
        class="block py-5 text-center text-white transition-colors hover:bg-blue-800 hover:text-gray-200 active:bg-blue-900 md:px-10 md:active:text-gray-400"
        :class="{
          'bg-blue-500': isActive
        }"
        >{{ text }}</a
      >
    </li>
  </router-link>
</template>

<style scoped></style>
