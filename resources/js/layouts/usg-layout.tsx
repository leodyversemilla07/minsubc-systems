import { Footer, Header } from '@/components/usg';
import { type ReactNode, useState, useEffect } from 'react';

interface USGLayoutProps {
    children: ReactNode;
}

export default function USGLayout({ children }: USGLayoutProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check local storage or system preference
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Header isDark={isDark} toggleTheme={toggleTheme} />

            {/* Main content - responsive padding for header height */}
            <main className="flex-1 pt-16 md:pt-28">{children}</main>

            <Footer />
        </div>
    );
}
