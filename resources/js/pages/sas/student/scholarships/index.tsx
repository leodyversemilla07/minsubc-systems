import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { PaginatedData, ScholarshipRecipient } from '@/types/sas';
import { Head, Link, router } from '@inertiajs/react';
import {
    Award,
    Calendar,
    ChevronRight,
    Filter,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    scholarships: PaginatedData<ScholarshipRecipient>;
    filters: {
        academic_year?: string;
        semester?: string;
        status?: string;
    };
}

const statusColors = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Suspended:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Revoked: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export default function Index({ scholarships, filters }: Props) {
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

    const handleFilter = (key: string, value: string) => {
        router.get(
            sas.student.scholarships.index.url(),
            {
                ...filters,
                [key]: value || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const activeCount = scholarships.data.filter(
        (s) => s.status === 'Active',
    ).length;
    const completedCount = scholarships.data.filter(
        (s) => s.status === 'Completed',
    ).length;

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                {
                    title: 'My Scholarships',
                    href: sas.student.scholarships.index.url(),
                },
            ]}
        >
            <Head title="My Scholarships - Student Portal" />

            <div className="flex-1 space-y-6 p-6 md:p-8">
                {/* Page Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                        <Award className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl dark:text-white">
                            My Scholarships
                        </h1>
                        <p className="text-muted-foreground dark:text-slate-400">
                            View and manage your scholarship records
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-500/20">
                                    <TrendingUp className="h-6 w-6 text-green-700 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">
                                        Active Scholarships
                                    </p>
                                    <p className="text-2xl font-bold dark:text-white">
                                        {activeCount}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20">
                                    <Award className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">
                                        Total Scholarships
                                    </p>
                                    <p className="text-2xl font-bold dark:text-white">
                                        {scholarships.data.length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-500/20">
                                    <Calendar className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">
                                        Completed
                                    </p>
                                    <p className="text-2xl font-bold dark:text-white">
                                        {completedCount}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Scholarships List */}
                <div>
                    {/* Filters */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-500" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Filter:
                            </span>
                            <Select
                                value={selectedStatus || 'all'}
                                onValueChange={(value) => {
                                    const filterValue =
                                        value === 'all' ? '' : value;
                                    setSelectedStatus(filterValue);
                                    handleFilter('status', filterValue);
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Status
                                    </SelectItem>
                                    <SelectItem value="Active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="Completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="Suspended">
                                        Suspended
                                    </SelectItem>
                                    <SelectItem value="Revoked">
                                        Revoked
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {scholarships.data.length} scholarship
                            {scholarships.data.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    {/* Scholarships Grid */}
                    {scholarships.data.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {scholarships.data.map((recipient) => (
                                <Card
                                    key={recipient.id}
                                    className="group overflow-hidden transition-all hover:shadow-lg"
                                >
                                    <CardHeader className="pb-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl text-blue-900 dark:text-white">
                                                    {recipient.scholarship
                                                        ?.scholarship_name ||
                                                        'Scholarship'}
                                                </CardTitle>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {recipient.scholarship
                                                            ?.scholarship_type ||
                                                            'N/A'}
                                                    </Badge>
                                                    <Badge
                                                        className={
                                                            statusColors[
                                                                recipient.status
                                                            ]
                                                        }
                                                    >
                                                        {recipient.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    Award Date:{' '}
                                                    {recipient.date_awarded
                                                        ? new Date(
                                                              recipient.date_awarded,
                                                          ).toLocaleDateString()
                                                        : 'N/A'}
                                                </span>
                                            </div>

                                            {recipient.scholarship
                                                ?.description && (
                                                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {
                                                        recipient.scholarship
                                                            .description
                                                    }
                                                </p>
                                            )}

                                            <Link
                                                href={sas.student.scholarships.show.url(
                                                    { id: recipient.id },
                                                )}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900"
                                                >
                                                    View Details
                                                    <ChevronRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Award className="mb-4 h-16 w-16 text-gray-400" />
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    No Scholarships Found
                                </h3>
                                <p className="text-center text-gray-600 dark:text-gray-400">
                                    You don't have any scholarship records yet.
                                    <br />
                                    Contact the Student Affairs Office for more
                                    information.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
