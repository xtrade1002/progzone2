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
            react: fileURLToPath(new URL('./resources/js/lib/react.js', import.meta.url)),
            'react-dom/client': fileURLToPath(new URL('./resources/js/lib/react-dom-client.js', import.meta.url)),
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
