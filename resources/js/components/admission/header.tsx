import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import SearchCommand from '@/components/admission/search-command';
import { login, register } from '@/routes';
import admission, { track as trackRoute } from '@/routes/admission';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
    isDark: boolean;
    toggleTheme: () => void;
}

const navigationLinks = [
    { href: admission.application.create.url() ?? '/admission', label: 'Home' },
    { href: admission.application.create.url(), label: 'Apply' },
    { href: trackRoute.url(), label: 'Track Status' },
];

export default function Header({ isDark, toggleTheme }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-blue-900/50 dark:bg-gray-950/95">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link
                        href={admission.application.create.url()}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                            MSU
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-blue-900 dark:text-blue-100">
                                Admission
                            </span>
                            <span className="text-[10px] leading-tight text-blue-500 dark:text-blue-400">
                                Mindanao State University
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSearchOpen(true)}
                            className="hidden md:flex"
                        >
                            <Search className="h-4 w-4" />
                            <Kbd className="ml-2">⌘K</Kbd>
                        </Button>

                        {/* Theme toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                        >
                            {isDark ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </Button>

                        {/* Auth */}
                        {user ? (
                            <Link
                                href={trackRoute.url()}
                                className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 md:inline-block"
                            >
                                My Application
                            </Link>
                        ) : (
                            <div className="hidden items-center gap-2 md:flex">
                                <Link
                                    href={login.url()}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={register.url()}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="border-t border-blue-100 bg-white px-4 pb-4 pt-2 dark:border-blue-900/50 dark:bg-gray-950 md:hidden">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-2 border-t border-blue-100 pt-2 dark:border-blue-900/50">
                            {user ? (
                                <Link
                                    href={trackRoute.url()}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white"
                                >
                                    My Application
                                </Link>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href={login.url()}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-gray-600 hover:bg-blue-50 dark:text-gray-300"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={register.url()}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                )}
            </header>

            {searchOpen && <SearchCommand onClose={() => setSearchOpen(false)} />}
        </>
    );
}