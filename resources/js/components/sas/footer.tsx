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

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-green-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="/minsu-logo.png"
                                alt="MinSUBC Logo"
                                className="h-12 w-12 rounded-full object-contain"
                            />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            Student Affairs and Services
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Managing student services, scholarships, insurance,
                            and organizational records at MinSUBC.
                        </p>
                        {/* Social Media Links */}
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-green-100 p-2 text-green-700 transition-colors hover:bg-green-700 hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-700"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-green-100 p-2 text-green-700 transition-colors hover:bg-green-700 hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-700"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-green-100 p-2 text-green-700 transition-colors hover:bg-green-700 hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-700"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={sas.index.url()}
                                    className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-300 dark:hover:text-green-400"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={sas.organizations.index.url()}
                                    className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-300 dark:hover:text-green-400"
                                >
                                    Organizations
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={sas.activities.index.url()}
                                    className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-300 dark:hover:text-green-400"
                                >
                                    Activities
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sas/about"
                                    className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-300 dark:hover:text-green-400"
                                >
                                    About SAS
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/sas/contact"
                                    className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-300 dark:hover:text-green-400"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sas/faq"
                                    className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-300 dark:hover:text-green-400"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sas/help"
                                    className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-300 dark:hover:text-green-400"
                                >
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-green-700 dark:text-green-400" />
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                    Mindoro State University
                                    <br />
                                    Bongabong Campus
                                    <br />
                                    Bongabong, Oriental Mindoro
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 flex-shrink-0 text-green-700 dark:text-green-400" />
                                <a
                                    href="tel:+639123456789"
                                    className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-300 dark:hover:text-green-400"
                                >
                                    +63 912 345 6789
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 flex-shrink-0 text-green-700 dark:text-green-400" />
                                <a
                                    href="mailto:sas@minsu.edu.ph"
                                    className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-300 dark:hover:text-green-400"
                                >
                                    sas@minsu.edu.ph
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-green-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                            © {currentYear} Student Affairs and Services -
                            Mindoro State University, Bongabong Campus. All
                            rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                href="/privacy-policy"
                                className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-400 dark:hover:text-green-400"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms-of-service"
                                className="text-sm text-slate-600 transition-colors hover:text-green-700 dark:text-slate-400 dark:hover:text-green-400"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
