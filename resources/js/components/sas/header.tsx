import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import sas from '@/routes/sas';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Sun, Moon } from 'lucide-react';

/**
 * Theme Toggle Component
 */
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-slate-500 hover:text-green-700 dark:text-slate-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800 transition-colors focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

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
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-green-100/50 bg-white/95 shadow-sm backdrop-blur-lg backdrop-saturate-150 transition-all duration-300 dark:border-slate-800/50 dark:bg-slate-950/95">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Top row: Logo, Name, and Auth buttons */}
                <div className="flex h-16 items-center justify-between">
                    
                    {/* Logo Section */}
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
                                <div className="absolute inset-0 rounded-full bg-green-400/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="hidden bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-xs leading-tight font-bold text-transparent transition-all lg:block dark:from-green-100 dark:to-green-300">
                                Mindoro State University — Bongabong Campus
                            </span>
                            <span className="bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-xs leading-tight font-bold text-transparent lg:text-sm dark:from-white dark:to-green-200">
                                Student Affairs and Services
                            </span>
                            <span className="bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-xs font-bold text-transparent lg:hidden dark:from-white dark:to-green-300">
                                MinSU Bongabong | SAS
                            </span>
                        </div>
                    </Link>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="group relative hidden overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 sm:block"
                            >
                                <span className="relative z-10">Dashboard</span>
                                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="hidden px-4 py-2 text-sm font-semibold text-green-700 transition-all hover:text-green-900 sm:block dark:text-green-400 dark:hover:text-green-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="group relative hidden overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 sm:block"
                                >
                                    <span className="relative z-10">
                                        Register
                                    </span>
                                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                <div className="hidden border-t border-green-100/50 py-3 md:block dark:border-slate-800/50">
                    <div className="flex items-center gap-1">
                        {navigationLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`group relative overflow-hidden rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                                        active
                                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
                                            : 'text-slate-600 hover:bg-green-50/80 hover:text-green-700 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-green-400'
                                    }`}
                                >
                                    <span className="relative z-10">
                                        {link.label}
                                    </span>
                                    {active && (
                                        <div className="absolute inset-0 -z-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    )}
                                    {!active && (
                                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-green-600 to-green-700 transition-all duration-300 group-hover:w-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-green-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-900">
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
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}

                        {/* Mobile auth buttons */}
                        <div className="border-t border-green-200 pt-4 dark:border-slate-800">
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
                                        className="block rounded-lg border-2 border-green-700 px-4 py-2 text-center text-sm font-medium text-green-900 transition-colors hover:bg-green-50 dark:text-slate-300 dark:border-green-600 dark:hover:bg-slate-800"
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
