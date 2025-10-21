import { Footer, Header } from '@/components/usg';
import { type ReactNode } from 'react';

interface USGLayoutProps {
    children: ReactNode;
}

export default function USGLayout({ children }: USGLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />

            {/* Main content - updated padding for taller header */}
            <main className="flex-1 pt-28">
                {children}
            </main>

            <Footer />
        </div>
    );
}
