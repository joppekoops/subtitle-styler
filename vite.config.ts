import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import plainText from 'vite-plugin-plain-text'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        react(),
        plainText(
            [/\.vtt$/],
            { namedExport: false },
        ),
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
