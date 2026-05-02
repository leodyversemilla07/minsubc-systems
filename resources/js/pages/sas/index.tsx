import { Button } from '@/components/ui/button';
import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BarChart,
    Calendar,
    FileText,
    ShieldCheck,
    Sparkles,
    Users,
} from 'lucide-react';

export default function SASHome() {
    const stats = [
        { label: 'Student Organizations', value: '23+' },
        { label: 'Scholarship Programs', value: 'TES / TDP' },
        { label: 'Core Services', value: '6' },
        { label: 'Digital Access', value: '24/7' },
    ];

    const features = [
        {
            title: 'Scholarship Management',
            description:
                'Track scholarship programs, applicant records, and status updates in one organized workflow.',
            icon: Award,
            href: sas.scholarships.index.url(),
            cta: 'View Scholarships',
        },
        {
            title: 'Insurance Management',
            description:
                'Digitize student insurance forms and keep records secure, searchable, and easy to maintain.',
            icon: ShieldCheck,
            cta: 'Available Soon',
        },
        {
            title: 'Organizational Records',
            description:
                'Manage student organization profiles, officer rosters, renewals, and activity histories.',
            icon: Users,
            href: sas.organizations.index.url(),
            cta: 'Browse Organizations',
        },
        {
            title: 'Calendar of Activities',
            description:
                'Coordinate student affairs events, activities, schedules, and conflict checks with clarity.',
            icon: Calendar,
            href: sas.activities.index.url(),
            cta: 'View Activities',
        },
        {
            title: 'Document Digitalization',
            description:
                'Centralize student affairs documents with metadata, tagging, and faster retrieval.',
            icon: FileText,
            cta: 'Available Soon',
        },
        {
            title: 'Reports & Analytics',
            description:
                'Generate insights from scholarship, organization, and activity data for better decisions.',
            icon: BarChart,
            cta: 'Available Soon',
        },
    ];

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

            <section className="relative overflow-hidden border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_34%),linear-gradient(135deg,#f8fafc_0%,#ecfdf5_45%,#f8fafc_100%)] px-4 py-20 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.22),transparent_34%),linear-gradient(135deg,#020617_0%,#03130c_48%,#020617_100%)]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.08]">
                    <svg
                        className="h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="sas-hero-pattern"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <circle
                                    cx="2"
                                    cy="2"
                                    r="1"
                                    fill="currentColor"
                                    className="text-green-600"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#sas-hero-pattern)"
                        />
                    </svg>
                </div>

                <div className="pointer-events-none absolute -top-32 right-10 h-80 w-80 rounded-full bg-green-400/25 blur-3xl dark:bg-green-500/15" />
                <div className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-600/10" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="mx-auto max-w-5xl text-center">
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-200/80 bg-white/80 px-4 py-2 text-sm font-semibold text-green-800 shadow-sm backdrop-blur dark:border-green-800/70 dark:bg-slate-900/70 dark:text-green-300">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_18px_rgba(34,197,94,0.9)]" />
                            <Sparkles className="h-4 w-4" />
                            Empowering student success
                        </div>

                        <h1 className="text-5xl leading-[1.02] font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                            Student Affairs
                            <span className="block bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 bg-clip-text text-transparent">
                                System Portal
                            </span>
                        </h1>

                        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                            A unified space for scholarships, student
                            organizations, insurance records, activities, and
                            student affairs documentation at MinSU Bongabong
                            Campus.
                        </p>

                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link href={sas.scholarships.index.url()}>
                                <Button
                                    size="lg"
                                    className="gap-2 bg-green-600 px-6 text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-green-600/30"
                                >
                                    View Scholarships
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href={sas.organizations.index.url()}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="gap-2 border-slate-300 bg-white/80 px-6 text-slate-800 backdrop-blur hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-800"
                                >
                                    Browse Organizations
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-14 grid grid-cols-2 gap-3 rounded-3xl border border-white/70 bg-white/70 p-3 shadow-xl shadow-slate-900/5 backdrop-blur md:grid-cols-4 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-black/20">
                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-5 text-center dark:border-slate-800 dark:bg-slate-950/50"
                            >
                                <div className="text-2xl font-black text-green-600 dark:text-green-400">
                                    {item.value}
                                </div>
                                <div className="mt-1 text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-900">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="text-sm font-bold tracking-[0.2em] text-green-600 uppercase dark:text-green-400">
                                SAS Services
                            </p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                                Built for everyday student affairs work
                            </h2>
                        </div>
                        <p className="max-w-2xl text-slate-600 dark:text-slate-300">
                            Access the most-used SAS services from one clear
                            dashboard-style portal, designed for students,
                            officers, advisers, and administrators.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            const card = (
                                <div className="group relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-2xl hover:shadow-green-600/10 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-green-700">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-600 via-emerald-400 to-transparent opacity-70" />
                                    <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-green-500/10 blur-3xl transition duration-300 group-hover:scale-125 dark:bg-green-500/15" />

                                    <div className="relative flex h-full flex-col">
                                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20 transition duration-300 group-hover:scale-105 group-hover:rotate-3 dark:bg-green-500 dark:text-slate-950">
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        <h3 className="text-xl font-black text-slate-950 dark:text-white">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">
                                            {feature.description}
                                        </p>

                                        <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-green-700 transition group-hover:gap-3 dark:text-green-400">
                                            {feature.cta}
                                            {feature.href && (
                                                <ArrowRight className="h-4 w-4" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );

                            return feature.href ? (
                                <Link key={feature.title} href={feature.href}>
                                    {card}
                                </Link>
                            ) : (
                                <div key={feature.title}>{card}</div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </SASLayout>
    );
}
