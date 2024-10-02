import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] /*
  server: {
    proxy: {
      '/api': {
        target: 'https://numberwordgenerator20240927020628.azurewebsites.net',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ''),

        configure: (proxy) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('error', err)
          })
          proxy.on('proxyReq', (_proxyReq, req, _res) => {
            console.log('Request sent to target:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              'Response received from target:',
              proxyRes.statusCode,
              req.url
            )
          })
        },
      },
    },
  },*/,
})
