import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { answer } from './api/_lib/assistant.js'
import { health } from './api/_lib/health.js'
import { buildStatus } from './api/_lib/status.js'

// Serves /api/chat during `npm start`, using the same code as the Vercel function in api/chat.js.
const localApi = (env) => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use('/api/status', async (req, res) => {
      try {
        const { status, body } = await buildStatus(env)
        res.statusCode = status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(body))
      } catch (err) {
        res.statusCode = 502
        res.end(JSON.stringify({ error: err.message }))
      }
    })
    server.middlewares.use('/api/health', async (req, res) => {
      const service = new URL(req.url, 'http://localhost').searchParams.get('service')
      const { status, body } = await health(service, env)
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(body))
    })
    server.middlewares.use('/api/chat', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        return res.end()
      }
      let raw = ''
      for await (const chunk of req) raw += chunk
      let payload = {}
      try {
        payload = JSON.parse(raw || '{}')
      } catch {
        payload = {}
      }
      const { status, body, background } = await answer({
        messages: payload.messages,
        ip: req.socket.remoteAddress,
        origin: req.headers.origin || null,
        host: req.headers.host || null,
        env,
      })
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(body))
      background?.()
    })
  },
})

export default defineConfig(({ mode }) => {
  // Server-only secrets (no VITE_ prefix) from .env.local; they never reach the browser bundle.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      // Lets `import { ReactComponent as Logo } from './logo.svg'` keep working (the AI provider icons).
      svgr({ include: '**/*.svg', svgrOptions: { exportType: 'named', namedExport: 'ReactComponent' } }),
      localApi(env),
    ],
    server: { port: 3000 },
    preview: { port: 3000 },
    // Same output folder as Create React App, so Vercel's existing build settings keep working.
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          // Libraries change rarely, so they get their own long-cached files.
          manualChunks: {
            react: ['react', 'react-dom', 'styled-components'],
            motion: ['framer-motion'],
            forms: ['formik', 'yup', 'react-toastify'],
          },
        },
      },
    },
  }
})
