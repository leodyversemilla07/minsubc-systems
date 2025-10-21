import usg from '@/routes/usg';
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
        <footer className="border-t border-green-200 bg-white dark:border-gray-800 dark:bg-gray-900">
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
                            <img
                                src="/usg-logo.png"
                                alt="USG Logo"
                                className="h-12 w-12 rounded-full object-contain"
                            />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                            University Student Government
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Empowering MinSUBC students through leadership,
                            advocacy, and community building.
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
                        <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={usg.index.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={usg.vmgo.show.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    Vision & Mission
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={usg.officers.index.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    Our Officers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={usg.announcements.index.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    Announcements
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={usg.events.index.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    Events
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={usg.resolutions.index.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    Resolutions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={usg.transparency.index.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    Transparency Reports
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/usg/about"
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    About USG
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/usg/contact"
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/usg/faq"
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-green-700 dark:text-green-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
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
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    +63 912 345 6789
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 flex-shrink-0 text-green-700 dark:text-green-400" />
                                <a
                                    href="mailto:usg@minsu.edu.ph"
                                    className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    usg@minsu.edu.ph
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-green-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            © {currentYear} University Student Government -
                            Mindoro State University, Bongabong Campus. All
                            rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                href="/privacy-policy"
                                className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms-of-service"
                                className="text-sm text-gray-600 transition-colors hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400"
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
