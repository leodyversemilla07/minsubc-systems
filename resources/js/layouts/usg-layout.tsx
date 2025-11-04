import { Footer, Header } from '@/components/usg';
import { type ReactNode } from 'react';

interface USGLayoutProps {
    children: ReactNode;
}

export default function USGLayout({ children }: USGLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />

            {/* Main content - responsive padding for header height */}
            <main className="flex-1 pt-16 md:pt-28">{children}</main>

            <Footer />
        </div>
    );
}
