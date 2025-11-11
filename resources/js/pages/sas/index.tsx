import { Button } from '@/components/ui/button';
import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import { Head, Link } from '@inertiajs/react';
import {
    Award,
    BarChart,
    Calendar,
    FileText,
    ShieldCheck,
    Users,
} from 'lucide-react';

const SASHome = () => {
    return (
        <SASLayout>
            <Head>
                <title>
                    Student Affairs and Services - MinSU Bongabong Campus
                </title>
                <meta
                    name="description"
                    content="Student Affairs and Services (SAS) - Managing student services, scholarships, insurance, and organizational records"
                />
            </Head>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-white px-4 py-24 sm:px-6 lg:px-8 dark:from-gray-900 dark:via-blue-950/30 dark:to-gray-900">
                {/* Background Pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.15] dark:opacity-[0.07]">
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
                                    r="1.5"
                                    fill="currentColor"
                                    className="text-blue-600"
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

                {/* Animated Decorative Blobs */}
                <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-400/30 to-blue-600/20 blur-3xl dark:from-blue-600/20 dark:to-blue-800/10" />
                <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-blue-300/20 to-blue-500/30 blur-3xl [animation-delay:2s] dark:from-blue-700/10 dark:to-blue-900/20" />
                <div className="pointer-events-none absolute right-1/3 top-1/2 h-72 w-72 animate-pulse rounded-full bg-gradient-to-bl from-blue-200/20 to-transparent blur-2xl [animation-delay:4s] dark:from-blue-800/10" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="group mb-8 inline-flex animate-[fade-in_1s_ease-out] items-center gap-2 rounded-full border border-blue-200/50 bg-white/80 px-5 py-2.5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl dark:border-blue-800/50 dark:bg-gray-800/80">
                            <span className="flex h-2 w-2">
                                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-blue-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                            </span>
                            <span className="text-sm font-bold text-blue-900 transition-colors group-hover:text-blue-700 dark:text-blue-300 dark:group-hover:text-blue-200">
                                ✨ Empowering Student Success
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-8 animate-[fade-in_1.2s_ease-out] bg-gradient-to-br from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-5xl font-black leading-tight text-transparent sm:text-6xl lg:text-8xl dark:from-white dark:via-blue-200 dark:to-blue-400">
                            Student Affairs
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text dark:from-blue-300 dark:to-blue-500">
                                System Portal
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="mx-auto mb-10 max-w-3xl animate-[fade-in_1.4s_ease-out] text-lg leading-relaxed text-gray-700 sm:text-xl lg:text-2xl dark:text-gray-200">
                            Streamlining student services, managing{' '}
                            <span className="font-bold text-blue-700 dark:text-blue-400">
                                scholarships
                            </span>
                            , and fostering{' '}
                            <span className="font-bold text-blue-700 dark:text-blue-400">
                                organizational excellence
                            </span>{' '}
                            at MinSU Bongabong Campus
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex animate-[fade-in_1.6s_ease-out] flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href={sas.scholarships.index.url()}>
                                <Button
                                    size="lg"
                                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1"
                                >
                                    <span className="relative z-10">
                                        View Scholarships
                                    </span>
                                    <svg
                                        className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </Button>
                            </Link>

                            <Link href={sas.organizations.index.url()}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="group inline-flex items-center gap-2 overflow-hidden rounded-xl border-2 border-blue-600 bg-white px-8 py-4 text-base font-bold text-blue-700 shadow-xl transition-all duration-300 hover:border-blue-700 hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-1 dark:border-blue-500 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                                >
                                    <Users className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                                    <span>Browse Organizations</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <div className="relative bg-gradient-to-b from-white via-blue-50/30 to-white px-4 pb-12 pt-8 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
                <div className="mx-auto -mt-20 grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
                <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-white/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-gray-700/50 dark:bg-gray-800/90">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-4xl font-black text-transparent dark:from-blue-400 dark:to-blue-500">
                            100%
                        </div>
                        <div className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                            Digital Records
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-white/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-gray-700/50 dark:bg-gray-800/90">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-4xl font-black text-transparent dark:from-blue-400 dark:to-blue-500">
                            24/7
                        </div>
                        <div className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                            Access
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-white/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-gray-700/50 dark:bg-gray-800/90">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-4xl font-black text-transparent dark:from-blue-400 dark:to-blue-500">
                            23+
                        </div>
                        <div className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                            Organizations
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-white/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-gray-700/50 dark:bg-gray-800/90">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-4xl font-black text-transparent dark:from-blue-400 dark:to-blue-500">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <div className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                            Real-time Updates
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Features Grid */}
            <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-20 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {/* Scholarship Management */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-gray-700/50 dark:bg-gray-800/90 dark:hover:border-blue-600">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-blue-900 dark:to-blue-800">
                                    <Award className="h-7 w-7 text-blue-700 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-blue-900 dark:text-white">
                                    Scholarship Management
                                </h3>
                                <p className="mb-5 text-gray-600 dark:text-gray-300">
                                    Track and manage various scholarship
                                    programs including TES, TDP, and more.
                                </p>
                                <Link
                                    href={sas.scholarships.index.url()}
                                    className="inline-flex items-center gap-2 font-bold text-blue-700 transition-all hover:gap-3 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    View Scholarships
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Organizational Records */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-gray-700/50 dark:bg-gray-800/90 dark:hover:border-blue-600">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-blue-900 dark:to-blue-800">
                                    <Users className="h-7 w-7 text-blue-700 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-blue-900 dark:text-white">
                                    Organizational Records
                                </h3>
                                <p className="mb-5 text-gray-600 dark:text-gray-300">
                                    Manage records for all student organizations
                                    and their activities.
                                </p>
                                <Link
                                    href={sas.organizations.index.url()}
                                    className="inline-flex items-center gap-2 font-bold text-blue-700 transition-all hover:gap-3 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    View Organizations
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Calendar of Activities */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-gray-700/50 dark:bg-gray-800/90 dark:hover:border-blue-600">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-blue-900 dark:to-blue-800">
                                    <Calendar className="h-7 w-7 text-blue-700 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-blue-900 dark:text-white">
                                    Calendar of Activities
                                </h3>
                                <p className="mb-5 text-gray-600 dark:text-gray-300">
                                    Schedule and track student affairs events
                                    and activities.
                                </p>
                                <Link
                                    href={sas.activities.calendar.url()}
                                    className="inline-flex items-center gap-2 font-bold text-blue-700 transition-all hover:gap-3 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    View Calendar
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Insurance Management */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-gray-700/50 dark:bg-gray-800/90 dark:hover:border-blue-600">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-blue-900 dark:to-blue-800">
                                    <ShieldCheck className="h-7 w-7 text-blue-700 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-blue-900 dark:text-white">
                                    Insurance Management
                                </h3>
                                <p className="mb-5 text-gray-600 dark:text-gray-300">
                                    Digital management of student insurance forms
                                    and records.
                                </p>
                                <Link
                                    href={sas.activities.index.url()}
                                    className="inline-flex items-center gap-2 font-bold text-blue-700 transition-all hover:gap-3 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    View Activities
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Document Digitalization - Only for authenticated users */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-gray-700/50 dark:bg-gray-800/90 dark:hover:border-blue-600">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-blue-900 dark:to-blue-800">
                                    <FileText className="h-7 w-7 text-blue-700 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-blue-900 dark:text-white">
                                    Document Digitalization
                                </h3>
                                <p className="mb-5 text-gray-600 dark:text-gray-300">
                                    Centralized digital storage for all student
                                    affairs records.
                                </p>
                                <span className="inline-flex items-center gap-2 font-bold text-gray-500 dark:text-gray-400">
                                    Requires Authentication
                                </span>
                            </div>
                        </div>

                        {/* Reports & Analytics */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-gray-700/50 dark:bg-gray-800/90 dark:hover:border-blue-600">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-blue-900 dark:to-blue-800">
                                    <BarChart className="h-7 w-7 text-blue-700 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-blue-900 dark:text-white">
                                    Reports & Analytics
                                </h3>
                                <p className="mb-5 text-gray-600 dark:text-gray-300">
                                    Generate insights from scholarship,
                                    organization, and activity data.
                                </p>
                                <span className="inline-flex items-center gap-2 font-bold text-gray-500 dark:text-gray-400">
                                    Admin Access Only
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SASLayout>
    );
};

export default SASHome;
