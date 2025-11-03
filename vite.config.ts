import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 'resources/js/app.tsx'
            ],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    server: {
        hmr: {
            overlay: true,
        },
        watch: {
            // Ignore wayfinder generated directories to prevent infinite loops
            ignored: [
                '**/resources/js/actions/**',
                '**/resources/js/routes/**',
                '**/resources/js/wayfinder/**',
            ],
        },
    },
});
