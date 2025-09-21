import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    esbuild: {
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    optimizeDeps: {
            include: [
                '@mui/material',
                '@emotion/react',
                '@emotion/styled',
                'react-quill',
                'recharts',
                'framer-motion',
                'leaflet'
            ],
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        react: ['react', 'react-dom'],
                        mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
                        quill: ['react-quill'],
                        charts: ['recharts'],
                        motion: ['framer-motion'],
                        leaflet: ['leaflet'],
                    },
                },

            },
        },
});