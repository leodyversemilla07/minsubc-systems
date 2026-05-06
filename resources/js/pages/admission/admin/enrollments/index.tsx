import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    Plus,
    Search,
    Filter,
    ChevronRight,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Download,
    FileText,
} from 'lucide-react';

interface Enrollment {
    id: number;
    application_number: string;
    applicant_name: string;
    student_id: string | null;
    program: string;
    academic_year: string;
    semester: string;
    year_level: string;
    status: string;
    enrolled_at: string | null;
    confirmed_at: string | null;
}

interface Stats {
    total_enrolled: number;
    pending_confirmation: number;
    confirmed: number;
    dropped: number;
    by_year_level: Record<string, number>;
}

interface EnrollmentsPageProps extends PageProps {
    enrollments: { data: Enrollment[]; links: any[] };
    terms: Array<{ id: number; academic_year: string; semester: string; is_active: boolean }>;
    academicYears: string[];
    statuses: string[];
    stats: Stats;
    filters: Record<string, string>;
}

export default function EnrollmentsIndex({
    enrollments,
    terms,
    academicYears,
    statuses,
    stats,
    filters,
}: EnrollmentsPageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [showNewForm, setShowNewForm] = useState(false);

    // New enrollment form state
    const [selectedApplicant, setSelectedApplicant] = useState('');
    const [academicYear, setAcademicYear] = useState(
        filters.academic_year || terms.find((t) => t.is_active)?.academic_year || ''
    );
    const [semester, setSemester] = useState(filters.semester || '1st');
    const [yearLevel, setYearLevel] = useState('1');
    const [submitting, setSubmitting] = useState(false);

    function handleFilter(key: string, value: string) {
        router.get(route('admission.admin.enrollments.index'), {
            ...filters,
            [key]: value || undefined,
        });
    }

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        handleFilter('search', search);
    }

    function handleCreateEnrollment(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedApplicant) return;

        setSubmitting(true);
        router.post(
            route('admission.admin.enrollments.store'),
            {
                applicant_id: selectedApplicant,
                academic_year: academicYear,
                semester,
                year_level: yearLevel,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowNewForm(false);
                    setSelectedApplicant('');
                    setSubmitting(false);
                },
                onError: () => setSubmitting(false),
            }
        );
    }

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400',
            confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400',
            enrolled: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400',
            dropped: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-400',
            cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400',
        };

        return (
            <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || ''}`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <>
            <Head title="Enrollments" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Enrollments
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage student enrollments, subjects, and payments
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('admission.admin.enrollments.reports')}>
                            <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                Reports
                            </Button>
                        </Link>
                        <Button size="sm" onClick={() => setShowNewForm(!showNewForm)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Enrollment
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total_enrolled}</p>
                                <p className="text-xs text-gray-500">Enrolled</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900">
                                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.pending_confirmation}</p>
                                <p className="text-xs text-gray-500">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.confirmed}</p>
                                <p className="text-xs text-gray-500">Confirmed</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900">
                                <XCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.dropped}</p>
                                <p className="text-xs text-gray-500">Dropped</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Enrollment Form */}
                {showNewForm && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Create New Enrollment
                        </h2>
                        <form onSubmit={handleCreateEnrollment} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="lg:col-span-2">
                                <Label htmlFor="applicant">Accepted Applicant</Label>
                                <Input
                                    id="applicant"
                                    placeholder="Search by name or application #..."
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="academic_year">Academic Year</Label>
                                <Select value={academicYear} onValueChange={setAcademicYear}>
                                    <SelectTrigger id="academic_year" className="mt-1">
                                        <SelectValue placeholder="Select AY" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {academicYears.map((ay) => (
                                            <SelectItem key={ay} value={ay}>{ay}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="semester">Semester</Label>
                                <Select value={semester} onValueChange={setSemester}>
                                    <SelectTrigger id="semester" className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">1st Semester</SelectItem>
                                        <SelectItem value="2nd">2nd Semester</SelectItem>
                                        <SelectItem value="Summer">Summer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end gap-2 lg:col-span-4">
                                <Button type="submit" disabled={!selectedApplicant || submitting}>
                                    {submitting ? 'Creating...' : 'Create Enrollment'}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setShowNewForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search by name, student ID, or app #..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Button type="submit" size="sm" variant="secondary">Search</Button>
                    </form>

                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <Select value={filters.term_id || ''} onValueChange={(v) => handleFilter('term_id', v)}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="All Terms" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Terms</SelectItem>
                                {terms.map((term) => (
                                    <SelectItem key={term.id} value={String(term.id)}>
                                        {term.academic_year} ({term.semester})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={filters.status || ''} onValueChange={(v) => handleFilter('status', v)}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Status</SelectItem>
                                {statuses.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {(filters.search || filters.status || filters.term_id) && (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => router.get(route('admission.admin.enrollments.index'))}
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Enrollments Table */}
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Student</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Student ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Program</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Period</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {enrollments.data.map((enrollment) => (
                                <tr key={enrollment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-900 dark:text-white">{enrollment.applicant_name}</p>
                                        <p className="text-xs text-gray-500">{enrollment.application_number}</p>
                                    </td>
                                    <td className="px-4 py-3 font-mono text-sm text-gray-500">
                                        {enrollment.student_id || '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {enrollment.program || '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        <p>{enrollment.academic_year}</p>
                                        <p className="text-xs text-gray-400">{enrollment.semester} Sem • Year {enrollment.year_level}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(enrollment.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={route('admission.admin.enrollments.show', enrollment.id)}
                                            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                        >
                                            View <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {enrollments.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-sm text-gray-500">
                                        No enrollments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {enrollments.links && enrollments.data.length > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {enrollments.data.length} of enrollments
                        </p>
                        <div className="flex gap-1">
                            {enrollments.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`rounded-md px-3 py-1.5 text-sm ${
                                        link.active
                                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400'
                                            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

EnrollmentsIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;