import react from '@vitejs/plugin-react'
import { join } from 'path'
import { defineConfig } from 'vite'
import plainText from 'vite-plugin-plain-text'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        react(),
        plainText(
            [/\.vtt$/],
            { namedExport: false },
        ),
        tsconfigPaths(),
        viteStaticCopy({
            targets: [
                {
                    src: join(__dirname, 'node_modules', 'mediainfo.js', 'dist', 'MediaInfoModule.wasm'),
                    dest: '',
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            '@app-styles': '/src/styles',
            '@app-resources': '/res',
            'source-map-js': 'source-map',
        },
    },
})
