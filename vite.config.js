import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    // Lets `import { ReactComponent as Logo } from './logo.svg'` keep working (the AI provider icons).
    svgr({ include: '**/*.svg', svgrOptions: { exportType: 'named', namedExport: 'ReactComponent' } }),
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
})
