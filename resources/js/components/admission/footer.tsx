import admission, { track as trackRoute } from '@/routes/admission';
import { Link } from '@inertiajs/react';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-blue-200 bg-white dark:border-blue-900/50 dark:bg-gray-950">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <GraduationCap className="h-6 w-6 text-blue-600" />
                            <span className="text-lg font-bold text-blue-900 dark:text-blue-100">
                                Admission
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            Mindanao State University – Main Campus
                            Admission and Enrollment Management System.
                            Your gateway to quality education.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={admission.application.create.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                >
                                    Apply Now
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={trackRoute.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                >
                                    Track Application
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={admission.application.create.url()}
                                    className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                >
                                    Programs Offered
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                                <span>MSU Main Campus, Marawi City</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="h-4 w-4 shrink-0 text-blue-600" />
                                <span>(063) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Mail className="h-4 w-4 shrink-0 text-blue-600" />
                                <span>admissions@msumain.edu.ph</span>
                            </li>
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                            Programs
                        </h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-600 dark:text-gray-400">
                                BS Information Technology
                            </li>
                            <li className="text-sm text-gray-600 dark:text-gray-400">
                                BS Business Administration
                            </li>
                            <li className="text-sm text-gray-600 dark:text-gray-400">
                                BS Criminology
                            </li>
                            <li className="text-xs text-blue-600 dark:text-blue-400">
                                <Link href={admission.application.create.url()}>
                                    View all programs →
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-blue-100 dark:border-blue-900/50">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        &copy; {currentYear} Mindanao State University. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600">
                        Admission &amp; Enrollment Management System
                    </p>
                </div>
            </div>
        </footer>
    );
}