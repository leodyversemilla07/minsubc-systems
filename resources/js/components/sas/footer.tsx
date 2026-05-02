import sas from '@/routes/sas';
import { Link } from '@inertiajs/react';
import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from 'lucide-react';

const quickLinks = [
    { href: sas.index.url(), label: 'Home' },
    { href: sas.scholarships.index.url(), label: 'Scholarships' },
    { href: sas.organizations.index.url(), label: 'Organizations' },
    { href: sas.activities.index.url(), label: 'Activities' },
];

const resources = [
    { href: '/sas/contact', label: 'Contact Us' },
    { href: '/sas/faq', label: 'FAQ' },
    { href: '/sas/help', label: 'Help Center' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-slate-300">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <img
                                src="/minsu-logo.png"
                                alt="MinSUBC Logo"
                                className="h-12 w-12 rounded-full bg-white object-contain p-0.5 ring-1 ring-green-400/30"
                            />
                            <div>
                                <p className="text-xs font-bold tracking-wide text-green-300 uppercase">
                                    MinSU Bongabong Campus
                                </p>
                                <h3 className="text-lg font-black text-white">
                                    Student Affairs and Services
                                </h3>
                            </div>
                        </div>

                        <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
                            A unified portal for scholarships, student
                            organizations, activities, insurance, and student
                            affairs records.
                        </p>

                        <div className="mt-6 flex gap-3">
                            {[
                                {
                                    href: 'https://facebook.com',
                                    icon: Facebook,
                                    label: 'Facebook',
                                },
                                {
                                    href: 'https://twitter.com',
                                    icon: Twitter,
                                    label: 'Twitter',
                                },
                                {
                                    href: 'https://instagram.com',
                                    icon: Instagram,
                                    label: 'Instagram',
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-green-300 transition hover:-translate-y-0.5 hover:border-green-400/40 hover:bg-green-400/10 hover:text-green-200"
                                        aria-label={item.label}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-black tracking-[0.2em] text-white uppercase">
                            Quick Links
                        </h3>
                        <ul className="mt-5 space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition hover:text-green-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-black tracking-[0.2em] text-white uppercase">
                            Resources
                        </h3>
                        <ul className="mt-5 space-y-3">
                            {resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition hover:text-green-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-black tracking-[0.2em] text-white uppercase">
                            Contact
                        </h3>
                        <ul className="mt-5 space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-300" />
                                <span>
                                    Mindoro State University
                                    <br />
                                    Bongabong Campus
                                    <br />
                                    Bongabong, Oriental Mindoro
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 shrink-0 text-green-300" />
                                <a
                                    href="tel:+639123456789"
                                    className="transition hover:text-green-300"
                                >
                                    +63 912 345 6789
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 shrink-0 text-green-300" />
                                <a
                                    href="mailto:sas@minsu.edu.ph"
                                    className="transition hover:text-green-300"
                                >
                                    sas@minsu.edu.ph
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relative border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-500 sm:px-6 md:flex-row lg:px-8">
                    <p className="text-center md:text-left">
                        © {currentYear} Student Affairs and Services — Mindoro
                        State University, Bongabong Campus.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="/privacy-policy"
                            className="transition hover:text-green-300"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms-of-service"
                            className="transition hover:text-green-300"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
