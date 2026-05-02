import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import sas from '@/routes/sas';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;

        const shouldUseDark =
            savedTheme === 'dark' || (!savedTheme && prefersDark);
        setIsDark(shouldUseDark);
        document.documentElement.classList.toggle('dark', shouldUseDark);
    }, []);

    const toggleTheme = () => {
        const nextTheme = !isDark;
        document.documentElement.classList.toggle('dark', nextTheme);
        localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
        setIsDark(nextTheme);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-600 shadow-sm backdrop-blur transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-green-800 dark:hover:bg-green-950/40 dark:hover:text-green-300"
            aria-label="Toggle color theme"
        >
            {isDark ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </button>
    );
};

export default function Header() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentUrl = page.url;

    const userRoles = Array.isArray(auth.user?.roles)
        ? auth.user.roles.map((role: { name: string }) => role.name)
        : [];

    const isStudent = userRoles.includes('student');
    const hasAdminAccess =
        userRoles.includes('sas-staff') ||
        userRoles.includes('sas-admin') ||
        userRoles.includes('super-admin');

    const navigationLinks = useMemo(() => {
        const links = [
            { href: sas.index.url(), label: 'Home' },
            { href: sas.scholarships.index.url(), label: 'Scholarships' },
            { href: sas.organizations.index.url(), label: 'Organizations' },
            { href: sas.activities.index.url(), label: 'Activities' },
        ];

        if (isStudent || hasAdminAccess) {
            links.push({
                href: sas.student.insurance.index.url(),
                label: 'My Insurance',
            });
        }

        if (hasAdminAccess) {
            links.push(
                { href: sas.admin.documents.index.url(), label: 'Documents' },
                { href: sas.admin.dashboard.url(), label: 'Admin' },
            );
        }

        return links;
    }, [isStudent, hasAdminAccess]);

    const isActive = (href: string) => {
        const sasIndexUrl = sas.index.url();

        if (href === sasIndexUrl) {
            return (
                currentUrl === href ||
                currentUrl === '/sas' ||
                currentUrl === '/sas/'
            );
        }

        return currentUrl.startsWith(href);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/90 shadow-2xl shadow-slate-950/20 backdrop-blur-xl backdrop-saturate-150 dark:border-slate-800/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    <Link
                        href={sas.index.url()}
                        className="group flex min-w-0 items-center gap-3"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="relative shrink-0">
                            <img
                                src="/minsu-logo.png"
                                alt="MinSUBC Logo"
                                className="h-10 w-10 rounded-full bg-white object-contain p-0.5 shadow-lg ring-1 shadow-green-500/10 ring-green-400/30 transition group-hover:scale-105"
                            />
                            <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-green-400" />
                        </div>

                        <div className="min-w-0">
                            <p className="hidden truncate text-xs font-bold tracking-wide text-green-300 lg:block">
                                Mindoro State University — Bongabong Campus
                            </p>
                            <p className="truncate text-sm font-black text-white sm:text-base">
                                Student Affairs and Services
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        {navigationLinks.map((link) => {
                            const active = isActive(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                                        active
                                            ? 'bg-green-500 text-slate-950 shadow-lg shadow-green-500/20'
                                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="hidden rounded-full bg-green-500 px-5 py-2 text-sm font-black text-slate-950 shadow-lg shadow-green-500/20 transition hover:-translate-y-0.5 hover:bg-green-400 sm:inline-flex"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="hidden rounded-full px-4 py-2 text-sm font-bold text-green-300 transition hover:bg-white/10 hover:text-white sm:inline-flex"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="hidden rounded-full bg-green-500 px-5 py-2 text-sm font-black text-slate-950 shadow-lg shadow-green-500/20 transition hover:-translate-y-0.5 hover:bg-green-400 sm:inline-flex"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10 hover:text-white md:hidden"
                            onClick={() => setIsMenuOpen((open) => !open)}
                            aria-label="Toggle navigation menu"
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

            {isMenuOpen && (
                <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 shadow-2xl md:hidden">
                    <div className="mx-auto max-w-7xl space-y-2">
                        {navigationLinks.map((link) => {
                            const active = isActive(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex rounded-2xl px-4 py-3 text-sm font-bold transition ${
                                        active
                                            ? 'bg-green-500 text-slate-950'
                                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        <div className="grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-2">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-2xl bg-green-500 px-4 py-3 text-center text-sm font-black text-slate-950"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-bold text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-2xl bg-green-500 px-4 py-3 text-center text-sm font-black text-slate-950"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
