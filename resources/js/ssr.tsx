import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';
import type { ComponentType } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob<{ default: ComponentType }>('./pages/**/*.tsx');

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) => {
            const importPage = pages[`./pages/${name}.tsx`];

            if (!importPage) {
                throw new Error(`Page not found: ${name}`);
            }

            return importPage().then((module) => module.default);
        },
        setup: ({ App, props }) => {
            return <App {...props} />;
        },
    }),
);
