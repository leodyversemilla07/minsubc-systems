import { Footer, Header } from '@/components/sas';
import { type ReactNode } from 'react';

interface SASLayoutProps {
    children: ReactNode;
}

export default function SASLayout({ children }: SASLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
            <Header />

            <main className="flex-1 pt-16">{children}</main>

            <Footer />
        </div>
    );
}
