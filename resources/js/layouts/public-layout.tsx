import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { dashboard, login, register } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Calendar,
    FileText,
    Home,
    Megaphone,
    Menu,
    Shield,
    Target,
    Users,
    X,
} from 'lucide-react';
import { type ReactNode, useState } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function PublicLayout({
    children,
    breadcrumbs,
}: PublicLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigationLinks = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/usg/vmgo', label: 'VMGO', icon: Target },
        { href: '/usg/officers', label: 'Officers', icon: Users },
        { href: '/usg/announcements', label: 'Announcements', icon: Megaphone },
        { href: '/usg/events', label: 'Events', icon: Calendar },
        { href: '/usg/resolutions', label: 'Resolutions', icon: FileText },
        { href: '/usg/transparency', label: 'Transparency', icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 right-0 left-0 z-50 border-b border-green-200 bg-white shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-700 shadow-md">
                                <span className="text-sm font-bold text-white">
                                    USG
                                </span>
                            </div>
                            <span className="font-semibold text-green-900 dark:text-white">
                                MinSUBC Portal
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center space-x-1 md:flex">
                            {navigationLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                                    >
                                        <IconComponent className="h-4 w-4" />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-3">
                            <AppearanceToggleDropdown />

                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-800"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="px-4 py-2 text-sm font-medium text-green-900 transition-colors hover:text-green-800 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-800"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}

                            {/* Mobile menu button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="border-t border-green-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                        <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6 lg:px-8">
                            {navigationLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <IconComponent className="h-4 w-4" />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main content */}
            <main className="pt-16">
                {breadcrumbs && (
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                )}
                {children}
            </main>

            <Toaster />
        </div>
    );
}
