import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <PublicLayout>
            <Head title="Welcome - USG Information Portal">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-white to-green-50 px-4 py-24 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-800">
                {/* Background Pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-5">
                    <svg
                        className="h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="hero-pattern"
                                x="0"
                                y="0"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="1"
                                    fill="currentColor"
                                    className="text-green-700"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#hero-pattern)"
                        />
                    </svg>
                </div>

                {/* Decorative Blobs */}
                <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-green-200/30 blur-3xl dark:bg-green-900/20" />
                <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-green-300/20 blur-3xl dark:bg-green-800/10" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 shadow-sm dark:border-green-800 dark:bg-gray-800">
                            <span className="flex h-2 w-2">
                                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
                            </span>
                            <span className="text-sm font-medium text-green-900 dark:text-green-400">
                                Serving the MinSUBC Community
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-7xl dark:from-white dark:via-gray-100 dark:to-gray-300">
                            USG Information &<br />
                            Transparency Portal
                        </h1>

                        {/* Subheading */}
                        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:text-2xl dark:text-gray-300">
                            Empowering students through{' '}
                            <span className="font-semibold text-green-700 dark:text-green-400">
                                transparency
                            </span>
                            , fostering{' '}
                            <span className="font-semibold text-green-700 dark:text-green-400">
                                engagement
                            </span>
                            , and building a stronger MinSUBC community
                            together.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/usg/announcements"
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-green-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-green-800 hover:shadow-xl hover:shadow-green-700/20"
                            >
                                <span className="relative z-10">
                                    View Announcements
                                </span>
                                <svg
                                    className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-green-600 to-green-800 opacity-0 transition-opacity group-hover:opacity-100" />
                            </Link>

                            <Link
                                href="/usg/events"
                                className="group inline-flex items-center gap-2 rounded-lg border-2 border-green-700 bg-white px-8 py-4 text-base font-semibold text-green-900 shadow-lg transition-all hover:border-green-800 hover:bg-green-50 hover:shadow-xl dark:border-green-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                            >
                                <svg
                                    className="h-5 w-5 transition-transform group-hover:rotate-12"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>Calendar of Events</span>
                            </Link>
                        </div>

                        {/* Stats Section */}
                        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
                            <div className="rounded-xl border border-green-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
                                <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                                    100%
                                </div>
                                <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Transparency
                                </div>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
                                <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                                    24/7
                                </div>
                                <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Access
                                </div>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
                                <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                                    Real-time
                                </div>
                                <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Updates
                                </div>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
                                <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                                    Open
                                </div>
                                <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Communication
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                <svg
                                    className="h-6 w-6 text-green-700 dark:text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                                Vision & Mission
                            </h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                Learn about our goals, objectives, and
                                commitment to student governance.
                            </p>
                            <Link
                                href="/usg/vmgo"
                                className="font-medium text-green-700 hover:text-green-800 dark:text-green-400"
                            >
                                Learn more →
                            </Link>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                <svg
                                    className="h-6 w-6 text-green-700 dark:text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                                USG Officers
                            </h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                Meet the current officers and view the
                                organizational structure.
                            </p>
                            <Link
                                href="/usg/officers"
                                className="font-medium text-green-700 hover:text-green-800 dark:text-green-400"
                            >
                                View officers →
                            </Link>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                <svg
                                    className="h-6 w-6 text-green-700 dark:text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                                Resolutions
                            </h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                Access official resolutions and legislative
                                documents.
                            </p>
                            <Link
                                href="/usg/resolutions"
                                className="font-medium text-green-700 hover:text-green-800 dark:text-green-400"
                            >
                                Browse resolutions →
                            </Link>
                        </div>

                        {/* Feature 4 */}
                        <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                <svg
                                    className="h-6 w-6 text-green-700 dark:text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                                Announcements
                            </h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                Stay updated with the latest news and
                                announcements.
                            </p>
                            <Link
                                href="/usg/announcements"
                                className="font-medium text-green-700 hover:text-green-800 dark:text-green-400"
                            >
                                Read announcements →
                            </Link>
                        </div>

                        {/* Feature 5 */}
                        <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                <svg
                                    className="h-6 w-6 text-green-700 dark:text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                                Events Calendar
                            </h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                View upcoming events, meetings, and important
                                dates.
                            </p>
                            <Link
                                href="/usg/events"
                                className="font-medium text-green-700 hover:text-green-800 dark:text-green-400"
                            >
                                View calendar →
                            </Link>
                        </div>

                        {/* Feature 6 */}
                        <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-green-600">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                <svg
                                    className="h-6 w-6 text-green-700 dark:text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-green-900 dark:text-white">
                                Transparency Reports
                            </h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                View statistics and public records ensuring
                                accountability.
                            </p>
                            <Link
                                href="/usg/transparency"
                                className="font-medium text-green-700 hover:text-green-800 dark:text-green-400"
                            >
                                View reports →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
