import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import usg from '@/routes/usg';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigationLinks = [
    { href: usg.index.url(), label: 'Home' },
    { href: usg.vmgo.show.url(), label: 'VMGO' },
    { href: usg.officers.index.url(), label: 'Officers' },
    { href: usg.announcements.index.url(), label: 'Announcements' },
    { href: usg.events.index.url(), label: 'Events' },
    { href: usg.resolutions.index.url(), label: 'Resolutions' },
    { href: usg.transparency.index.url(), label: 'Transparency' },
];

export default function Header() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentUrl = page.url;

    const isActive = (href: string) => {
        const usgIndexUrl = usg.index.url();
        if (href === usgIndexUrl) {
            return (
                currentUrl === href ||
                currentUrl === '/' ||
                currentUrl === '/usg' ||
                currentUrl === '/usg/'
            );
        }
        return currentUrl.startsWith(href);
    };

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-green-200 bg-white shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top row: Logo, Name, and Auth buttons */}
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href={usg.index.url()}
                        className="flex items-center gap-3 transition-opacity hover:opacity-80"
                    >
                        <img
                            src="/minsu-logo.png"
                            alt="MinSUBC Logo"
                            className="h-10 w-10 rounded-full object-contain"
                        />
                        <img
                            src="/usg-logo.png"
                            alt="USG Logo"
                            className="h-10 w-10 rounded-full object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="hidden text-xs leading-tight font-semibold text-green-900 lg:block dark:text-white">
                                Mindoro State University — Bongabong Campus
                            </span>
                            <span className="text-xs leading-tight font-semibold text-green-900 lg:text-sm dark:text-white">
                                University Student Government
                            </span>
                            <span className="text-xs font-semibold text-green-900 lg:hidden dark:text-white">
                                MinSU Bongabong | USG
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <AppearanceToggleDropdown />

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="hidden rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-800 sm:block"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="hidden px-4 py-2 text-sm font-medium text-green-900 transition-colors hover:text-green-800 sm:block dark:text-gray-300 dark:hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="hidden rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-800 sm:block"
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

                {/* Bottom row: Desktop Navigation */}
                <div className="hidden border-t border-green-100 py-3 md:block dark:border-gray-800">
                    <div className="flex items-center space-x-2">
                        {navigationLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                                        active
                                            ? 'bg-green-700 text-white shadow-sm'
                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-green-200 bg-white md:hidden dark:border-gray-800 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6 lg:px-8">
                        {navigationLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all ${
                                        active
                                            ? 'bg-green-700 text-white shadow-sm'
                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}

                        {/* Mobile auth buttons */}
                        <div className="border-t border-green-200 pt-4 dark:border-gray-800">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="block rounded-lg bg-green-700 px-4 py-2 text-center text-sm font-medium text-white shadow-md transition-colors hover:bg-green-800"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        href={login()}
                                        className="block rounded-lg border-2 border-green-700 px-4 py-2 text-center text-sm font-medium text-green-900 transition-colors hover:bg-green-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="block rounded-lg bg-green-700 px-4 py-2 text-center text-sm font-medium text-white shadow-md transition-colors hover:bg-green-800"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
