import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    const host = env.VITE_DEV_SERVER_HOST ?? 'localhost';
    const port = Number(env.VITE_DEV_SERVER_PORT ?? 5173);
    const bind = env.VITE_DEV_SERVER_BIND ?? host;
    const useHttps = env.VITE_DEV_SERVER_HTTPS === 'true';

    return {
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
            react(),
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.jsx'],
                refresh: true,
            }),
            tailwindcss(),
        ],
        server: {
            host: bind,
            port,
            strictPort: true,
            hmr: {
                host,
                port,
                protocol: useHttps ? 'wss' : 'ws',
            },
        },
        optimizeDeps: {
            include: [
                '@mui/material',
                '@emotion/react',
                '@emotion/styled',
            ],
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        react: ['react', 'react-dom'],
                        mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
                    },
                },

            },
        },
    };
});
