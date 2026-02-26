import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import sas from '@/routes/sas';
import { Head, Link, router } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle,
    Clock,
    Edit,
    Eye,
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
    const [status, setStatus] = useState(filters.status || 'all');
    const [category, setCategory] = useState(filters.category || 'all');
    const [activityToDelete, setActivityToDelete] = useState<Activity | null>(
        null,
    );
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    function handleFilter() {
        router.get(
            sas.admin.activities.index.url(),
            {
                status: status === 'all' ? undefined : status,
                category: category === 'all' ? undefined : category,
                search: search || undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    }

    function handleReset() {
        setSearch('');
        setStatus('all');
        setCategory('all');
        router.get(
            sas.admin.activities.index.url(),
            {},
            { preserveState: true },
        );
    }

    function handleDelete(activity: Activity) {
        setActivityToDelete(activity);
        setIsDeleteDialogOpen(true);
    }

    function confirmDelete() {
        if (activityToDelete) {
            router.delete(
                sas.admin.activities.destroy.url(activityToDelete.id),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsDeleteDialogOpen(false);
                        setActivityToDelete(null);
                    },
                },
            );
        }
    }

    const stats = {
        total: activities.total,
        scheduled: activities.data.filter((a) => a.status === 'Scheduled')
            .length,
        completed: activities.data.filter((a) => a.status === 'Completed')
            .length,
        cancelled: activities.data.filter((a) => a.status === 'Cancelled')
            .length,
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
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: sas.admin.dashboard.url() },
                { title: 'Activities', href: sas.admin.activities.index.url() },
            ]}
        >
            <Head title="Activities Management" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                            Activities Management
                        </h1>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Manage SAS activities and events
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={sas.admin.activities.create.url()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Activity
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Activities
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Scheduled
                            </CardTitle>
                            <Clock className="h-4 w-4 text-blue-500" />
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
                            <CheckCircle className="h-4 w-4 text-green-500" />
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
                            <XCircle className="h-4 w-4 text-destructive" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.cancelled}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search activities..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
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
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
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
                            <Select
                                value={category}
                                onValueChange={setCategory}
                            >
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Categories
                                    </SelectItem>
                                    <SelectItem value="Seminar">
                                        Seminar
                                    </SelectItem>
                                    <SelectItem value="Workshop">
                                        Workshop
                                    </SelectItem>
                                    <SelectItem value="Training">
                                        Training
                                    </SelectItem>
                                    <SelectItem value="Sports">
                                        Sports
                                    </SelectItem>
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
                                                {getStatusBadge(
                                                    activity.status,
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={sas.admin.activities.show.url(
                                                                activity.id,
                                                            )}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={sas.admin.activities.edit.url(
                                                                activity.id,
                                                            )}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                activity,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
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
                                    <Link
                                        href={sas.admin.activities.create.url()}
                                    >
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
                                        sas.admin.activities.index.url(),
                                        {
                                            page: activities.current_page - 1,
                                            status:
                                                status === 'all'
                                                    ? undefined
                                                    : status,
                                            category:
                                                category === 'all'
                                                    ? undefined
                                                    : category,
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
                                        sas.admin.activities.index.url(),
                                        {
                                            page: activities.current_page + 1,
                                            status:
                                                status === 'all'
                                                    ? undefined
                                                    : status,
                                            category:
                                                category === 'all'
                                                    ? undefined
                                                    : category,
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
            </div>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the activity{' '}
                            <span className="font-semibold text-foreground">
                                {activityToDelete?.activity_title}
                            </span>{' '}
                            and remove its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
