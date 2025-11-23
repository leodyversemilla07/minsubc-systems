import { Footer, Header } from '@/components/sas';
import { type ReactNode } from 'react';

interface SASLayoutProps {
    children: ReactNode;
}

export default function SASLayout({ children }: SASLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />

            {/* Main content - updated padding for taller header */}
            <main className="flex-1 pt-16 sm:pt-28">{children}</main>

            <Footer />
        </div>
    );
}
