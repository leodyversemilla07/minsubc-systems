import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { ApplicationStatusBadge } from '@/components/admission/status-badge';

interface Applicant {
    id: number;
    application_number: string;
    name: string;
    email: string;
    program: string;
    program_name: string;
    status: string;
    status_label: string;
    documents_count: number;
    submitted_at: string | null;
    created_at: string;
}

interface StatusOption {
    value: string;
    label: string;
}

interface ApplicantsPageProps extends PageProps {
    applicants: { data: Applicant[]; links: any[] };
    statuses: StatusOption[];
    filters: Record<string, string>;
}

export default function ApplicantsIndex({ applicants, statuses, filters }: ApplicantsPageProps) {
    const [search, setSearch] = useState(filters.search || '');

    function handleFilter(key: string, value: string) {
        router.get(route('admission.admin.applicants.index'), { ...filters, [key]: value || undefined });
    }

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        handleFilter('search', search);
    }

    return (
        <>
            <Head title="Applicants" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Applicants</h1>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <Input
                            placeholder="Search name, email, or app #..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-64"
                        />
                        <Button type="submit" size="sm" variant="secondary">Search</Button>
                    </form>
                    <Select value={filters.status || ''} onValueChange={(v) => handleFilter('status', v)}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Statuses</SelectItem>
                            {statuses.map((s) => (
                                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {(filters.search || filters.status) && (
                        <Button size="sm" variant="ghost" onClick={() => router.get(route('admission.admin.applicants.index'))}>
                            Clear Filters
                        </Button>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">App #</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Program</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Docs</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {applicants.data.map((a) => (
                                <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-gray-500">{a.application_number}</td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-900 dark:text-white">{a.name}</p>
                                        <p className="text-xs text-gray-500">{a.email}</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{a.program}</td>
                                    <td className="px-4 py-3">
                                        <ApplicationStatusBadge status={a.status} />
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{a.documents_count}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{a.submitted_at || a.created_at}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={route('admission.admin.applicants.show', a.id)}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {applicants.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-sm text-gray-500">No applicants found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

ApplicantsIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;