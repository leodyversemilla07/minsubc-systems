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

export default function SASHome() {
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
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/50 to-white pt-8 pb-24 sm:px-6 sm:pt-48 lg:px-8 dark:from-slate-950 dark:via-green-950/20 dark:to-slate-950">
                {/* 1. Background Pattern (SVG Dots) */}
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
                                    className="text-green-600"
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

                {/* 2. Animated Decorative Blobs */}
                <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-green-400/30 to-emerald-600/20 blur-3xl dark:from-green-600/20 dark:to-emerald-800/10" />
                <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-green-300/20 to-emerald-500/30 blur-3xl [animation-delay:2s] dark:from-green-700/10 dark:to-emerald-900/20" />
                <div className="pointer-events-none absolute top-1/2 right-1/3 h-72 w-72 animate-pulse rounded-full bg-gradient-to-bl from-green-200/20 to-transparent blur-2xl [animation-delay:4s] dark:from-green-800/10" />

                <div className="relative mx-auto max-w-7xl px-4 text-center">
                    {/* 3. Hero Badge */}
                    <div className="group mb-8 inline-flex animate-[fade-in_1s_ease-out] items-center gap-2 rounded-full border border-green-200/50 bg-white/80 px-5 py-2.5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-green-300 hover:shadow-xl dark:border-green-800/50 dark:bg-slate-800/80">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
                        </span>
                        <span className="text-sm font-bold text-green-900 transition-colors group-hover:text-green-700 dark:text-green-300 dark:group-hover:text-green-200">
                            ✨ Empowering Student Success
                        </span>
                    </div>

                    {/* 4. Main Heading with Gradient */}
                    <h1 className="mb-8 animate-[fade-in_1.2s_ease-out] bg-gradient-to-br from-slate-900 via-green-800 to-green-600 bg-clip-text text-5xl leading-tight font-black tracking-tight text-transparent sm:text-6xl lg:text-8xl dark:from-white dark:via-green-200 dark:to-green-400">
                        Student Affairs
                        <br />
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text dark:from-green-300 dark:to-emerald-500">
                            System Portal
                        </span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-3xl animate-[fade-in_1.4s_ease-out] text-lg leading-relaxed text-slate-600 sm:text-xl lg:text-2xl dark:text-slate-300">
                        Streamlining student services, managing{' '}
                        <span className="font-bold text-green-700 dark:text-green-400">
                            scholarships
                        </span>
                        , and fostering{' '}
                        <span className="font-bold text-green-700 dark:text-green-400">
                            organizational excellence
                        </span>{' '}
                        at MinSU Bongabong Campus
                    </p>

                    {/* 5. CTA Buttons */}
                    <div className="flex animate-[fade-in_1.6s_ease-out] flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={sas.scholarships.index.url()}>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/30"
                            >
                                View Scholarships
                            </Button>
                        </Link>
                        <Link href={sas.organizations.index.url()}>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="dark:hover:bg-slate-750 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                            >
                                Browse Organizations
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:from-slate-900 dark:to-slate-800">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {/* Scholarship Management */}
                        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/10 dark:border-slate-700/50 dark:bg-slate-800/90 dark:hover:border-green-600">
                            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-green-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative flex h-full flex-col">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-green-900 dark:to-green-800">
                                    <Award className="h-7 w-7 text-green-700 dark:text-green-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                                    Scholarship Management
                                </h3>
                                <p className="mb-5 flex-grow leading-relaxed text-slate-600 dark:text-slate-300">
                                    Track and manage various scholarship
                                    programs including TES, TDP, and more with
                                    real-time status updates.
                                </p>

                                <Link
                                    href={sas.scholarships.index.url()}
                                    className="mt-auto inline-flex cursor-pointer items-center gap-2 font-bold text-green-700 transition-all hover:gap-3 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                >
                                    View Details
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
                        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/10 dark:border-slate-700/50 dark:bg-slate-800/90 dark:hover:border-green-600">
                            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-green-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative flex h-full flex-col">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-green-900 dark:to-green-800">
                                    <ShieldCheck className="h-7 w-7 text-green-700 dark:text-green-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                                    Insurance Management
                                </h3>
                                <p className="mb-5 flex-grow leading-relaxed text-slate-600 dark:text-slate-300">
                                    Digital management of student insurance
                                    forms and records, replacing manual
                                    paperwork with secure digital filings.
                                </p>

                                <div className="mt-auto inline-flex cursor-pointer items-center gap-2 font-bold text-green-700 transition-all hover:gap-3 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                                    View Details
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
                                </div>
                            </div>
                        </div>

                        {/* Organizational Records */}
                        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/10 dark:border-slate-700/50 dark:bg-slate-800/90 dark:hover:border-green-600">
                            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-green-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative flex h-full flex-col">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-green-900 dark:to-green-800">
                                    <Users className="h-7 w-7 text-green-700 dark:text-green-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                                    Organizational Records
                                </h3>
                                <p className="mb-5 flex-grow leading-relaxed text-slate-600 dark:text-slate-300">
                                    Manage records for all 23 student
                                    organizations, including officer rosters and
                                    activity history.
                                </p>

                                <Link
                                    href={sas.organizations.index.url()}
                                    className="mt-auto inline-flex cursor-pointer items-center gap-2 font-bold text-green-700 transition-all hover:gap-3 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                >
                                    View Details
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
                        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/10 dark:border-slate-700/50 dark:bg-slate-800/90 dark:hover:border-green-600">
                            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-green-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative flex h-full flex-col">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-green-900 dark:to-green-800">
                                    <Calendar className="h-7 w-7 text-green-700 dark:text-green-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                                    Calendar of Activities
                                </h3>
                                <p className="mb-5 flex-grow leading-relaxed text-slate-600 dark:text-slate-300">
                                    Schedule and track student affairs events
                                    and activities with automated conflict
                                    detection.
                                </p>

                                <Link
                                    href={sas.activities.index.url()}
                                    className="mt-auto inline-flex cursor-pointer items-center gap-2 font-bold text-green-700 transition-all hover:gap-3 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                >
                                    View Details
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

                        {/* Document Digitalization */}
                        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/10 dark:border-slate-700/50 dark:bg-slate-800/90 dark:hover:border-green-600">
                            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-green-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative flex h-full flex-col">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-green-900 dark:to-green-800">
                                    <FileText className="h-7 w-7 text-green-700 dark:text-green-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                                    Document Digitalization
                                </h3>
                                <p className="mb-5 flex-grow leading-relaxed text-slate-600 dark:text-slate-300">
                                    Centralized digital storage for all student
                                    affairs records with metadata tagging and
                                    search.
                                </p>

                                <div className="mt-auto inline-flex cursor-pointer items-center gap-2 font-bold text-green-700 transition-all hover:gap-3 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                                    View Details
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
                                </div>
                            </div>
                        </div>

                        {/* Reports & Analytics */}
                        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/10 dark:border-slate-700/50 dark:bg-slate-800/90 dark:hover:border-green-600">
                            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-green-500/20 to-transparent blur-2xl transition-all duration-300 group-hover:scale-150" />
                            <div className="relative flex h-full flex-col">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 dark:from-green-900 dark:to-green-800">
                                    <BarChart className="h-7 w-7 text-green-700 dark:text-green-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                                    Reports & Analytics
                                </h3>
                                <p className="mb-5 flex-grow leading-relaxed text-slate-600 dark:text-slate-300">
                                    Generate insights from scholarship,
                                    organization, and activity data for
                                    administrative oversight.
                                </p>

                                <div className="mt-auto inline-flex cursor-pointer items-center gap-2 font-bold text-green-700 transition-all hover:gap-3 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                                    View Details
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SASLayout>
    );
}
