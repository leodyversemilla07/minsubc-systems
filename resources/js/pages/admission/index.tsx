import { Head, Link, usePage } from '@inertiajs/react';
import admission from '@/routes/admission';
import AdmissionLayout from '@/layouts/admission-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ArrowRight,
    BookOpen,
    CheckCircle,
    ChevronRight,
    ClipboardCheck,
    FileText,
    GraduationCap,
    Search,
    Users,
    UserPlus,
} from 'lucide-react';
import { type PageProps } from '@/types';

interface Program {
    id: number;
    name: string;
    course: string;
    course_code: string;
    academic_year: string;
    semester: string;
    slots_available: number;
    slots: number;
    description: string | null;
}

interface Stats {
    total_programs: number;
    open_programs: number;
    total_applicants: number;
    enrolled: number;
}

interface Step {
    number: string;
    title: string;
    description: string;
    icon: string;
}

interface IndexPageProps extends PageProps {
    programs: Program[];
    stats: Stats;
    steps: Step[];
    [key: string]: unknown;
}

export default function AdmissionIndex({ programs, stats, steps }: IndexPageProps) {
    return (
        <>
            <Head title="Admission - Mindanao State University" />
            <IndexContent programs={programs} stats={stats} steps={steps} />
        </>
    );
}

AdmissionIndex.layout = (page: React.ReactNode) => <AdmissionLayout>{page}</AdmissionLayout>;

const iconMap: Record<string, React.ReactNode> = {
    user: <UserPlus className="h-6 w-6" />,
    book: <BookOpen className="h-6 w-6" />,
    file: <FileText className="h-6 w-6" />,
    check: <CheckCircle className="h-6 w-6" />,
};

function IndexContent({ programs, stats, steps }: IndexPageProps) {
    return (
        <>
            {/* ────────────── Hero Section ────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* Text */}
                        <div className="text-center lg:text-left">
                            <Badge variant="secondary" className="mb-4 inline-flex items-center gap-1.5 bg-white/15 text-white hover:bg-white/20">
                                <GraduationCap className="h-3.5 w-3.5" />
                                AY {new Date().getFullYear()} - {new Date().getFullYear() + 1}
                            </Badge>
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Your Journey
                                <span className="block text-blue-200">Starts Here</span>
                            </h1>
                            <p className="mt-4 max-w-xl text-lg leading-relaxed text-blue-100">
                                Apply for admission at Mindanao State University — Main Campus.
                                Explore our programs, submit your requirements, and track your application status online.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                                <Link href={admission.application.create.url()}>
                                    <Button size="lg" className="w-full gap-2 bg-white text-blue-700 shadow-lg hover:bg-blue-50 sm:w-auto">
                                        Apply Now
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={admission.track.url()}>
                                    <Button size="lg" variant="outline" className="w-full gap-2 border-white/30 text-white hover:bg-white/10 sm:w-auto">
                                        <Search className="h-4 w-4" />
                                        Track Status
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Stats Cards Grid */}
                        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
                            {[
                                { label: 'Programs Offered', value: stats.total_programs, icon: <BookOpen className="h-5 w-5" /> },
                                { label: 'Open for Application', value: stats.open_programs, icon: <ClipboardCheck className="h-5 w-5" /> },
                                { label: 'Total Applicants', value: stats.total_applicants, icon: <Users className="h-5 w-5" /> },
                                { label: 'Enrolled Students', value: stats.enrolled, icon: <GraduationCap className="h-5 w-5" /> },
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                                    <div className="mb-2 flex items-center gap-2 text-blue-200">
                                        {stat.icon}
                                        <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                                    </div>
                                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="relative">
                    <svg className="block w-full" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" className="fill-white dark:fill-gray-950" />
                    </svg>
                </div>
            </section>

            {/* ────────────── How It Works ────────────── */}
            <section className="bg-white py-20 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            How to Apply
                        </h2>
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                            Follow these simple steps to complete your admission application
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                {/* Connector line */}
                                {index < steps.length - 1 && (
                                    <div className="absolute left-12 top-12 hidden h-0.5 w-[calc(100%-3rem)] bg-blue-200 lg:block dark:bg-blue-900" />
                                )}

                                <div className="relative flex flex-col items-center text-center">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
                                        <span className="text-blue-600 dark:text-blue-400">
                                            {iconMap[step.icon] ?? <CheckCircle className="h-6 w-6" />}
                                        </span>
                                    </div>
                                    <span className="mt-4 text-sm font-bold text-blue-600 dark:text-blue-400">
                                        Step {step.number}
                                    </span>
                                    <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        {step.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────────────── Open Programs ────────────── */}
            <section className="bg-gray-50 py-20 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Open Programs
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                {programs.length} program{programs.length !== 1 ? 's' : ''} currently accepting applications
                            </p>
                        </div>
                        <Link href={admission.application.create.url()}>
                            <Button variant="outline" className="gap-2">
                                View All Programs
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {programs.length > 0 ? (
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {programs.slice(0, 6).map((program) => (
                                <Card key={program.id} className="group transition-shadow hover:shadow-lg dark:border-gray-800">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-lg">{program.name}</CardTitle>
                                                <CardDescription className="mt-1">
                                                    {program.course} ({program.course_code})
                                                </CardDescription>
                                            </div>
                                            <Badge variant="secondary" className="shrink-0 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                {program.semester}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
                                            {program.description ?? 'No description available.'}
                                        </p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">
                                                AY {program.academic_year}
                                            </span>
                                            <span className="font-medium text-blue-600 dark:text-blue-400">
                                                {program.slots_available} / {program.slots} slots
                                            </span>
                                        </div>
                                        <div className="mt-3 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                                            <div
                                                className="h-2 rounded-full bg-blue-500 transition-all"
                                                style={{
                                                    width: `${program.slots > 0 ? ((program.slots - program.slots_available) / program.slots) * 100 : 0}%`,
                                                }}
                                            />
                                        </div>
                                        <Link
                                            href={admission.application.create.url()}
                                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            Apply Now
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-950">
                            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No Open Programs</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                There are no programs open for application at this time. Please check back later.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ────────────── CTA Section ────────────── */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Ready to Begin Your Journey?
                    </h2>
                    <p className="mt-4 text-lg text-blue-100">
                        Take the first step toward your future at Mindanao State University.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={admission.application.create.url()}>
                            <Button size="lg" className="gap-2 bg-white text-blue-700 shadow-lg hover:bg-blue-50">
                                <UserPlus className="h-4 w-4" />
                                Apply Now
                            </Button>
                        </Link>
                        <Link href={admission.track.url()}>
                            <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10">
                                <Search className="h-4 w-4" />
                                Track Your Application
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}