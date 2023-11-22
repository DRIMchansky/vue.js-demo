<script setup lang="ts">
import { onMounted } from 'vue'

import PageHeader from '../../components/PageHeader.vue'
import { usePostsStore } from '../../store/posts'

const postsStore = usePostsStore()

onMounted(() => postsStore.fetchPosts())
</script>

<template>
  <PageHeader text="Posts" />

  <div v-show="postsStore.status === 'loading'">Loading...</div>
  <div v-show="postsStore.status === 'error'">Loading error</div>

  <Transition name="fade">
    <div v-show="postsStore.status === 'loaded'">
      <ul class="mt-4 flex flex-col gap-3">
        <li v-for="post in postsStore.posts" :key="post.id">
          <router-link :to="`/posts/${post.id}`" custom v-slot="{ href, navigate }">
            <a :href="href" @click="navigate" class="hover:text-blue-700 hover:opacity-60"
              ><h3 class="text-2xl">{{ post.title }}</h3></a
            >
          </router-link>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
