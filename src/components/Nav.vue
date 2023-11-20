<script setup lang="ts">
import NavItem from './NavItem.vue'

type NavItemData = {
  href: string
  text: string
}

const navData: NavItemData[] = [
  { href: '/', text: 'Home' },
  { href: '/todo', text: 'Todo' },
  { href: '/posts', text: 'Posts' }
]
</script>

<template>
  <nav class="bg-blue-700 shadow">
    <ul class="flex list-none justify-around md:justify-start">
      <NavItem v-for="item in navData" :href="item.href" :text="item.text" />
    </ul>
  </nav>
</template>

<style scoped></style>
