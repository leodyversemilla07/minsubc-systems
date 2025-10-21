import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';

export default function SASLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header/Navigation */}
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-2">
                                <img
                                    src="/minsubc-logo.png"
                                    alt="MinSUBC Logo"
                                    className="h-8 w-8"
                                />
                                <span className="text-lg font-semibold">
                                    Student Affairs
                                </span>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex md:space-x-8">
                            <Link
                                href="/sas/scholarships"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Scholarships
                            </Link>
                            <Link
                                href="/sas/insurance"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Insurance
                            </Link>
                            <Link
                                href="/sas/organizations"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Organizations
                            </Link>
                            <Link
                                href="/sas/calendar"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Calendar
                            </Link>
                            <Link
                                href="/sas/documents"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Documents
                            </Link>
                            <Link
                                href="/sas/reports"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Reports
                            </Link>
                        </nav>

                        {/* User Menu & Actions */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}