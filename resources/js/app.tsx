import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType, ReactElement } from 'react';
import { Toaster } from './components/ui/toast';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob<{ default: ComponentType }>('./pages/**/*.tsx');

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const importPage = pages[`./pages/${name}.tsx`];

        if (!importPage) {
            throw new Error(`Page not found: ${name}`);
        }

        return importPage().then((module) => module.default);
    },
    strictMode: true,
    withApp: (app: ReactElement) => (
        <>
            {app}
            <Toaster />
        </>
    ),
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
