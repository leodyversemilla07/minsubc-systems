import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle,
    Clock,
    Edit,
    Plus,
    Search,
    Trash2,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Activity {
    id: number;
    activity_title: string;
    slug: string;
    start_date: string;
    end_date: string;
    status: string;
    category?: string;
    location?: string;
}

interface Props {
    activities: {
        data: Activity[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        category?: string;
        status?: string;
        search?: string;
    };
}

export default function ActivitiesIndex({ activities, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [category, setCategory] = useState(filters.category || '');

    function handleFilter() {
        router.get(
            '/sas/admin/activities',
            {
                status: status || undefined,
                category: category || undefined,
                search: search || undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    }

    function handleReset() {
        setSearch('');
        setStatus('');
        setCategory('');
        router.get('/sas/admin/activities', {}, { preserveState: true });
    }

    function handleDelete(id: number, title: string) {
        if (
            confirm(
                `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            )
        ) {
            router.delete(`/sas/admin/activities/${id}`, {
                preserveScroll: true,
            });
        }
    }

    const stats = {
        total: activities.total,
        scheduled:
            activities.data.filter((a) => a.status === 'Scheduled').length,
        completed:
            activities.data.filter((a) => a.status === 'Completed').length,
        cancelled:
            activities.data.filter((a) => a.status === 'Cancelled').length,
    };

    function getStatusBadge(status: string) {
        const variants: Record<
            string,
            'default' | 'secondary' | 'destructive'
        > = {
            Scheduled: 'default',
            Completed: 'secondary',
            Cancelled: 'destructive',
        };

        return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
    }

    return (
        <AppLayout>
            <Head title="Activities Management" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Activities Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Manage SAS activities and events
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/sas/admin/activities/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Activity
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Activities
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Scheduled
                        </CardTitle>
                        <Clock className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.scheduled}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Completed
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.completed}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Cancelled
                        </CardTitle>
                        <XCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.cancelled}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    placeholder="Search activities..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9"
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleFilter()
                                    }
                                />
                            </div>
                        </div>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Statuses</SelectItem>
                                <SelectItem value="Scheduled">
                                    Scheduled
                                </SelectItem>
                                <SelectItem value="Completed">
                                    Completed
                                </SelectItem>
                                <SelectItem value="Cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Categories</SelectItem>
                                <SelectItem value="Seminar">Seminar</SelectItem>
                                <SelectItem value="Workshop">
                                    Workshop
                                </SelectItem>
                                <SelectItem value="Training">
                                    Training
                                </SelectItem>
                                <SelectItem value="Sports">Sports</SelectItem>
                                <SelectItem value="Cultural">
                                    Cultural
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                            <Button onClick={handleFilter}>Filter</Button>
                            <Button variant="outline" onClick={handleReset}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Activities Table */}
            <Card>
                <CardContent className="p-0">
                    {activities.data.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Activity Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activities.data.map((activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell className="font-medium">
                                            {activity.activity_title}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {activity.category || 'N/A'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {activity.location || 'TBA'}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                activity.start_date,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(activity.status)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/sas/admin/activities/${activity.id}/edit`}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            activity.id,
                                                            activity.activity_title,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="py-12 text-center">
                            <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-gray-600 dark:text-gray-400">
                                No activities found
                            </p>
                            <Button className="mt-4" asChild>
                                <Link href="/sas/admin/activities/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create First Activity
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {activities.last_page > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing page {activities.current_page} of{' '}
                        {activities.last_page}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={activities.current_page === 1}
                            onClick={() =>
                                router.get(
                                    `/sas/admin/activities?page=${activities.current_page - 1}`,
                                    {
                                        status: status || undefined,
                                        category: category || undefined,
                                        search: search || undefined,
                                    },
                                    { preserveState: true },
                                )
                            }
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={
                                activities.current_page ===
                                activities.last_page
                            }
                            onClick={() =>
                                router.get(
                                    `/sas/admin/activities?page=${activities.current_page + 1}`,
                                    {
                                        status: status || undefined,
                                        category: category || undefined,
                                        search: search || undefined,
                                    },
                                    { preserveState: true },
                                )
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
