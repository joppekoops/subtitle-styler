import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            '@app-styles': '/src/styles',
            '@app-resources': '/res',
            'source-map-js': 'source-map',
        },
    },
})
