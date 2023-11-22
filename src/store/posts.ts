import { defineStore } from 'pinia'
import { ComputedRef, computed, ref } from 'vue'

export type Post = {
  id: number
  title: string
  body: string
}

type Status = 'loaded' | 'loading' | 'error' | null

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const status = ref<Status>(null)

  const fetchPosts = async () => {
    if (status.value !== null) return
    status.value = 'loading'

    try {
      const [response] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts', { method: 'GET' }),
        new Promise(res =>
          setTimeout(() => {
            res(null)
          }, 500)
        )
      ])

      if (!response.ok) {
        status.value = 'error'
        return
      }

      posts.value = await response.json()
      status.value = 'loaded'
    } catch (error) {
      status.value = 'error'
    }
  }

  const getPost = (id: number): ComputedRef<Post | undefined> => {
    fetchPosts()
    return computed(() => posts.value.find(p => p.id === id))
  }

  return { posts, status, fetchPosts, getPost }
})
