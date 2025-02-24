import react from '@vitejs/plugin-react'
import { join } from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        viteStaticCopy({
            targets: [
                {
                    src: join(__dirname, 'node_modules', 'mediainfo.js', 'dist', 'MediaInfoModule.wasm'),
                    dest: '',
                },
            ],
        }),
        svgr({
            svgrOptions: {
                exportType: 'default',
                ref: true,
                svgo: false,
                titleProp: true,
            },
            include: [
                'src/**/*.svg',
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
