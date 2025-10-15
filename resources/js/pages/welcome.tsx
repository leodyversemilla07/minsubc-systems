import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome - USG Information Portal">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            {/* Navigation */}
            <nav className="fixed top-0 right-0 left-0 z-50 border-b border-green-200 bg-white shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-700 shadow-md">
                                <span className="text-sm font-bold text-white">
                                    USG
                                </span>
                            </div>
                            <span className="font-semibold text-green-900 dark:text-white">
                                MinSUBC Portal
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-800"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="px-4 py-2 text-sm font-medium text-green-900 transition-colors hover:text-green-800 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-800"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-white px-4 pt-32 pb-20 sm:px-6 lg:px-8 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl text-center">
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                        USG Information &<br />
                        Transparency Portal
                    </h1>
                    <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 sm:text-xl dark:text-gray-300">
                        Promoting transparency and facilitating information
                        dissemination within the MinSUBC community.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/announcements"
                            className="rounded-lg bg-green-700 px-8 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-green-800 hover:shadow-xl"
                        >
                            View Announcements
                        </Link>
                        <Link
                            href="/events"
                            className="rounded-lg border-2 border-green-700 bg-white px-8 py-3 text-base font-medium text-green-900 shadow-lg transition-colors hover:bg-green-50 dark:border-green-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        >
                            Calendar of Events
                        </Link>
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
                                href="/vmgo"
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
                                href="/officers"
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
                                href="/resolutions"
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
                                href="/announcements"
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
                                href="/events"
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
                                href="/transparency"
                                className="font-medium text-green-700 hover:text-green-800 dark:text-green-400"
                            >
                                View reports →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-green-700 bg-green-800 px-4 py-12 sm:px-6 lg:px-8 dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl text-center">
                    <p className="text-green-50 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} MinSUBC University
                        Student Government. All rights reserved.
                    </p>
                    <p className="mt-2 text-sm text-green-100 dark:text-gray-500">
                        Promoting transparency and serving the student
                        community.
                    </p>
                </div>
            </footer>
        </>
    );
}
