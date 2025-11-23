import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import sas from '@/routes/sas';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Header() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentUrl = page.url;

    // Check user roles
    const userRoles = Array.isArray(auth.user?.roles)
        ? auth.user.roles.map((role: { name: string }) => role.name)
        : [];
    const isStudent = userRoles.includes('student');
    const isSASStaff = userRoles.includes('sas-staff');
    const isSASAdmin = userRoles.includes('sas-admin');
    const isSuperAdmin = userRoles.includes('super-admin');
    const hasAdminAccess = isSASStaff || isSASAdmin || isSuperAdmin;

    // Build navigation links based on user authentication and roles
    const navigationLinks = useMemo(() => {
        const links = [
            { href: sas.index.url(), label: 'Home' },
            { href: sas.scholarships.index.url(), label: 'Scholarships' },
            { href: sas.organizations.index.url(), label: 'Organizations' },
            { href: sas.activities.index.url(), label: 'Activities' },
        ];

        // Add student-specific links if authenticated as student
        if (isStudent || hasAdminAccess) {
            links.push({
                href: sas.student.insurance.index.url(),
                label: 'My Insurance',
            });
        }

        // Add admin-specific links if user has admin access
        if (hasAdminAccess) {
            links.push(
                { href: sas.admin.documents.index.url(), label: 'Documents' },
                { href: sas.admin.dashboard.url(), label: 'Admin Dashboard' },
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
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-blue-100/50 bg-white/95 shadow-sm backdrop-blur-lg backdrop-saturate-150 transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-900/95">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top row: Logo, Name, and Auth buttons */}
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href={sas.index.url()}
                        className="group flex items-center gap-3 transition-all duration-300 hover:gap-4"
                    >
                        <div className="relative flex items-center gap-2">
                            <div className="relative">
                                <img
                                    src="/minsu-logo.png"
                                    alt="MinSUBC Logo"
                                    className="h-10 w-10 rounded-full object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 rounded-full bg-blue-400/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="hidden bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-xs leading-tight font-bold text-transparent transition-all lg:block dark:from-blue-100 dark:to-blue-300">
                                Mindoro State University — Bongabong Campus
                            </span>
                            <span className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-xs leading-tight font-bold text-transparent lg:text-sm dark:from-white dark:to-blue-200">
                                Student Affairs and Services
                            </span>
                            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-xs font-bold text-transparent lg:hidden dark:from-white dark:to-blue-300">
                                MinSU Bongabong | SAS
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <AppearanceToggleDropdown />

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="group relative hidden overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 sm:block"
                            >
                                <span className="relative z-10">Dashboard</span>
                                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="hidden px-4 py-2 text-sm font-semibold text-blue-700 transition-all hover:text-blue-900 sm:block dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="group relative hidden overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 sm:block"
                                >
                                    <span className="relative z-10">
                                        Register
                                    </span>
                                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                <div className="hidden border-t border-blue-100/50 py-3 md:block dark:border-gray-800/50">
                    <div className="flex items-center gap-1">
                        {navigationLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`group relative overflow-hidden rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                                        active
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-blue-50/80 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-blue-400'
                                    }`}
                                >
                                    <span className="relative z-10">
                                        {link.label}
                                    </span>
                                    {active && (
                                        <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    )}
                                    {!active && (
                                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300 group-hover:w-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-blue-200 bg-white md:hidden dark:border-gray-800 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6 lg:px-8">
                        {navigationLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all ${
                                        active
                                            ? 'bg-blue-700 text-white shadow-sm'
                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}

                        {/* Mobile auth buttons */}
                        <div className="border-t border-blue-200 pt-4 dark:border-gray-800">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="block rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-800"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        href={login()}
                                        className="block rounded-lg border-2 border-blue-700 px-4 py-2 text-center text-sm font-medium text-blue-900 transition-colors hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="block rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white shadow-md transition-colors hover:bg-blue-800"
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
