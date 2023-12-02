import { defineConfig } from 'vite'
import dotenv from 'dotenv'

dotenv.config()

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: parseInt(process.env.PORT)
  }
})
