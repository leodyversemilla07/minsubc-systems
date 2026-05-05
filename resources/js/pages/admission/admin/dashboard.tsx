import { Head, Link } from '@inertiajs/react';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Stats {
    total_applicants: number;
    pending_review: number;
    under_review: number;
    accepted: number;
    rejected: number;
    enrolled: number;
}

interface EnrollmentStats {
    total_enrolled: number;
    pending_confirmation: number;
}

interface Program {
    id: number;
    name: string;
    course: string;
    slots: number;
    slots_filled: number;
    slots_available: number;
    status: string;
    applicants_count: number;
}

interface RecentApplicant {
    id: number;
    application_number: string;
    name: string;
    program: string;
    status: string;
    status_label: string;
    created_at: string;
}

interface DashboardPageProps extends PageProps {
    stats: Stats;
    enrollmentStats: EnrollmentStats;
    programs: Program[];
    recentApplicants: RecentApplicant[];
}

export default function Dashboard({ stats, enrollmentStats, programs, recentApplicants }: DashboardPageProps) {
    const cards = [
        { label: 'Total Applicants', value: stats.total_applicants, color: 'bg-blue-500' },
        { label: 'Pending Review', value: stats.pending_review, color: 'bg-yellow-500' },
        { label: 'Accepted', value: stats.accepted, color: 'bg-teal-500' },
        { label: 'Enrolled', value: stats.enrolled, color: 'bg-green-500' },
        { label: 'Rejected', value: stats.rejected, color: 'bg-red-500' },
    ];

    return (
        <>
            <Head title="Admission Dashboard" />

            <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Admission Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Overview of admission applications, evaluations, and enrollments.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {cards.map((card) => (
                    <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className={`mb-3 h-1.5 w-12 rounded-full ${card.color}`} />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{card.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Programs */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Programs</h2>
                        <Link href={route('admission.admin.programs.index')} className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                            Manage
                        </Link>
                    </div>
                    <div className="mt-4 space-y-3">
                        {programs.map((program) => (
                            <div key={program.id} className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm dark:border-gray-700">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{program.course} — {program.name}</p>
                                    <p className="text-xs text-gray-500">{program.applicants_count} applicants</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{program.slots_filled}/{program.slots}</p>
                                    <p className="text-xs text-gray-500">{program.slots_available} left</p>
                                </div>
                            </div>
                        ))}
                        {programs.length === 0 && (
                            <p className="py-4 text-center text-sm text-gray-500">No programs yet.</p>
                        )}
                    </div>
                </div>

                {/* Recent Applicants */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Applicants</h2>
                        <Link href={route('admission.admin.applicants.index')} className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                            View All
                        </Link>
                    </div>
                    <div className="mt-4 space-y-2">
                        {recentApplicants.map((a) => (
                            <Link key={a.id} href={route('admission.admin.applicants.show', a.id)}
                                className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{a.name}</p>
                                    <p className="text-xs text-gray-500">{a.application_number} • {a.program}</p>
                                </div>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                    a.status === 'accepted' ? 'bg-teal-100 text-teal-700' :
                                    a.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    a.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                                    a.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {a.status_label}
                                </span>
                            </Link>
                        ))}
                        {recentApplicants.length === 0 && (
                            <p className="py-4 text-center text-sm text-gray-500">No applicants yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;