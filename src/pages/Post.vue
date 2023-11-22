<script setup lang="ts">
import { useRouter } from 'vue-router'

import PostContent from '../features/Posts/PostContent.vue'
import { usePostsStore } from '../store/posts'

const postsStore = usePostsStore()
const router = useRouter()

const post = postsStore.getPost(Number(`${router.currentRoute.value.params.id}`))
</script>

<template>
  <PostContent :data="post" />
</template>

<style scoped></style>
