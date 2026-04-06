import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('@sentry')) return 'sentry-vendor'
          if (id.includes('framer-motion') || id.includes('motion-dom')) return 'motion-vendor'
          if (id.includes('react-dom') || id.includes('/react/')) return 'react-vendor'

          return 'vendor'
        },
      },
    },
  },
})
