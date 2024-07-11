import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         // eslint-disable-next-line no-undef
         '@': path.resolve(__dirname, './src'),
      },
   },
   server: {
      port: 5500,
      proxy: {
         '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true,
         },
         '/socket.io': {
            target: 'http://localhost:5000',
            changeOrigin: true,
         },
      },
   },
})
