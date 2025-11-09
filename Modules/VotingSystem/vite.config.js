import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: '../../public/build-votingsystem',
        emptyOutDir: true,
        manifest: true,
    },
    plugins: [
        laravel({
            publicDirectory: '../../public',
            buildDirectory: 'build-votingsystem',
            input: [
                'Modules/VotingSystem/resources/assets/css/app.css',
                'Modules/VotingSystem/resources/assets/js/app.js'
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
});