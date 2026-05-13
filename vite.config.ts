import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const notifyOrigin = env.VITE_DEV_NOTIFY_API_ORIGIN?.trim()

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: notifyOrigin
      ? {
          proxy: {
            '/api': {
              target: notifyOrigin,
              changeOrigin: true,
            },
          },
        }
      : undefined,
  }
})
