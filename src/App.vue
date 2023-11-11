<script setup lang="ts">
import Container from './components/Container.vue'
import Nav from './components/Nav.vue'
</script>

<template>
  <Nav />

  <main>
    <Container>
      <RouterView />
    </Container>
  </main>
</template>

<style scoped></style>
