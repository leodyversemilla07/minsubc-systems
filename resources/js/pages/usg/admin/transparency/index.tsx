import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import SearchBar from '@/components/usg/search-bar';
import { ViewToggle } from '@/components/view-toggle';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/react';
import {
    Calendar,
    Download,
    Edit,
    Eye,
    FileText,
    MoreVertical,
    Plus,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface TransparencyReport {
    id: number;
    title: string;
    slug: string;
    description?: string;
    type: string;
    status: 'draft' | 'published';
    report_period_start: string;
    report_period_end: string;
    file_name: string;
    formatted_file_size: string;
    created_by_name?: string;
    published_at?: string;
    created_at: string;
    download_count: number;
    view_count: number;
}

interface Props {
    reports?: TransparencyReport[] | { data: TransparencyReport[] };
    filters?: {
        search?: string;
        type?: string;
        status?: string;
        year?: string;
    };
    types?: string[];
    years?: number[];
    statistics?: {
        total: number;
        published: number;
        draft: number;
        total_downloads: number;
        total_views: number;
    };
    canManage?: boolean;
}

// Skeleton Loaders
function TransparencyGridSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <div className="flex items-center gap-4 pt-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                            <div className="ml-4 flex shrink-0 items-center gap-2">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function TransparencyTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <Skeleton className="h-4 w-32" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-24" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead className="w-[100px]">
                        <Skeleton className="h-4 w-16" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(8)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-64" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-16" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center justify-end gap-2">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default function TransparencyManagement({
    reports,
    filters,
    types,
    years,
    statistics,
    canManage = true,
}: Props) {
    const safeReports: TransparencyReport[] = Array.isArray(reports)
        ? reports
        : reports?.data && Array.isArray(reports.data)
          ? reports.data
          : [];

    const safeFilters = filters || {};
    const safeTypes: string[] = Array.isArray(types) ? types : [];
    const safeYears: number[] = Array.isArray(years) ? years : [];
    const safeStatistics = statistics || {
        total: 0,
        published: 0,
        draft: 0,
        total_downloads: 0,
        total_views: 0,
    };

    const [searchQuery, setSearchQuery] = useState(safeFilters.search || '');
    const [selectedType, setSelectedType] = useState(safeFilters.type || '');
    const [selectedStatus, setSelectedStatus] = useState(
        safeFilters.status || '',
    );
    const [selectedYear, setSelectedYear] = useState(safeFilters.year || '');
    const [view, setView] = useState<'grid' | 'table'>('grid');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyFilters({ search: query });
    };

    const handleTypeFilter = (type: string) => {
        const filterValue = type === 'all' ? '' : type;
        setSelectedType(filterValue);
        applyFilters({ type: filterValue });
    };

    const handleStatusFilter = (status: string) => {
        const filterValue = status === 'all' ? '' : status;
        setSelectedStatus(filterValue);
        applyFilters({ status: filterValue });
    };

    const handleYearFilter = (year: string) => {
        const filterValue = year === 'all' ? '' : year;
        setSelectedYear(filterValue);
        applyFilters({ year: filterValue });
    };

    const applyFilters = (newFilters: Partial<typeof filters>) => {
        router.get(
            '/usg/admin/transparency',
            {
                search: searchQuery,
                type: selectedType,
                status: selectedStatus,
                year: selectedYear,
                ...newFilters,
            },
            { preserveState: true },
        );
    };

    const handleDelete = (report: TransparencyReport) => {
        if (confirm(`Are you sure you want to delete "${report.title}"?`)) {
            router.delete(`/usg/admin/transparency/${report.id}`);
        }
    };

    const handlePublish = (report: TransparencyReport) => {
        router.patch(`/usg/admin/transparency/${report.id}/publish`);
    };

    const handleUnpublish = (report: TransparencyReport) => {
        router.patch(`/usg/admin/transparency/${report.id}/unpublish`);
    };

    const formatPeriod = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return `${start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case 'draft':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                {
                    title: 'Transparency Reports',
                    href: '/usg/admin/transparency',
                },
            ]}
        >
            <Head title="Transparency Reports Management - USG Admin" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header with action button */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Transparency Reports Management
                        </h1>
                        <p className="text-muted-foreground">
                            Upload and manage USG transparency reports
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <ViewToggle view={view} onViewChange={setView} />
                        {canManage && (
                            <Link
                                href="/usg/admin/transparency/create"
                                className={cn(buttonVariants())}
                            >
                                <Plus className="h-4 w-4" />
                                New Report
                            </Link>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {safeStatistics.total}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Total
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
                                    <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {safeStatistics.published}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Published
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                                    <Edit className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {safeStatistics.draft}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Drafts
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
                                    <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {safeStatistics.total_downloads}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Downloads
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-orange-100 p-3 dark:bg-orange-900">
                                    <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {safeStatistics.total_views}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Views
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                            <div className="md:col-span-2">
                                <SearchBar
                                    placeholder="Search transparency reports..."
                                    value={searchQuery}
                                    onChange={(query) => {
                                        setSearchQuery(query);
                                        handleSearch(query);
                                    }}
                                />
                            </div>

                            <div>
                                <Select
                                    value={selectedType}
                                    onValueChange={handleTypeFilter}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Types
                                        </SelectItem>
                                        {safeTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Select
                                    value={selectedStatus}
                                    onValueChange={handleStatusFilter}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="published">
                                            Published
                                        </SelectItem>
                                        <SelectItem value="draft">
                                            Draft
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Select
                                    value={selectedYear}
                                    onValueChange={handleYearFilter}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Years" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Years
                                        </SelectItem>
                                        {safeYears.map((year) => (
                                            <SelectItem
                                                key={year}
                                                value={year.toString()}
                                            >
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reports List */}
                {reports === undefined ? (
                    view === 'grid' ? (
                        <TransparencyGridSkeleton />
                    ) : (
                        <Card>
                            <CardContent className="p-0">
                                <TransparencyTableSkeleton />
                            </CardContent>
                        </Card>
                    )
                ) : safeReports.length > 0 ? (
                    view === 'grid' ? (
                        <div className="space-y-4">
                            {safeReports.map((report) => (
                                <Card
                                    key={report.id}
                                    className="transition-shadow hover:shadow-lg"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                                                        {report.title}
                                                    </h3>
                                                    <Badge
                                                        className={getStatusColor(
                                                            report.status,
                                                        )}
                                                    >
                                                        {report.status.toUpperCase()}
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        {report.type}
                                                    </Badge>
                                                </div>

                                                {report.description && (
                                                    <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                                                        {report.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatPeriod(
                                                            report.report_period_start,
                                                            report.report_period_end,
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FileText className="h-4 w-4" />
                                                        {
                                                            report.formatted_file_size
                                                        }
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Download className="h-4 w-4" />
                                                        {report.download_count}{' '}
                                                        downloads
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {canManage && (
                                                    <>
                                                        <Link
                                                            href={`/usg/admin/transparency/${report.id}/edit`}
                                                            className={cn(
                                                                buttonVariants({
                                                                    variant:
                                                                        'ghost',
                                                                    size: 'sm',
                                                                }),
                                                            )}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>

                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                >
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        router.get(
                                                                            `/usg/admin/transparency/${report.id}/download`,
                                                                        )
                                                                    }
                                                                >
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    Download
                                                                </DropdownMenuItem>
                                                                {report.status ===
                                                                    'draft' && (
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handlePublish(
                                                                                report,
                                                                            )
                                                                        }
                                                                    >
                                                                        Publish
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {report.status ===
                                                                    'published' && (
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleUnpublish(
                                                                                report,
                                                                            )
                                                                        }
                                                                    >
                                                                        Unpublish
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            report,
                                                                        )
                                                                    }
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Period</TableHead>
                                        <TableHead>Downloads</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {safeReports.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell className="font-medium">
                                                <div>
                                                    <div className="font-medium">
                                                        {report.title}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {
                                                            report.formatted_file_size
                                                        }
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {report.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusColor(
                                                        report.status,
                                                    )}
                                                >
                                                    {report.status.toUpperCase()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {formatPeriod(
                                                    report.report_period_start,
                                                    report.report_period_end,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {report.download_count}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {canManage && (
                                                        <>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    router.visit(
                                                                        `/usg/admin/transparency/${report.id}/edit`,
                                                                    )
                                                                }
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                    >
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            router.get(
                                                                                `/usg/admin/transparency/${report.id}/download`,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Download className="mr-2 h-4 w-4" />
                                                                        Download
                                                                    </DropdownMenuItem>
                                                                    {report.status ===
                                                                        'draft' && (
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handlePublish(
                                                                                    report,
                                                                                )
                                                                            }
                                                                        >
                                                                            Publish
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                    {report.status ===
                                                                        'published' && (
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleUnpublish(
                                                                                    report,
                                                                                )
                                                                            }
                                                                        >
                                                                            Unpublish
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                report,
                                                                            )
                                                                        }
                                                                        className="text-red-600 focus:text-red-600"
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    )
                ) : (
                    <Card>
                        <CardContent className="p-12">
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <FileText className="h-12 w-12" />
                                    </EmptyMedia>
                                    <EmptyTitle>
                                        No transparency reports found
                                    </EmptyTitle>
                                    <EmptyDescription>
                                        {searchQuery ||
                                        selectedType ||
                                        selectedStatus ||
                                        selectedYear
                                            ? 'Try adjusting your search filters to see more results.'
                                            : 'Get started by creating your first transparency report.'}
                                    </EmptyDescription>
                                </EmptyHeader>
                                {canManage && (
                                    <EmptyContent>
                                        <Link
                                            href="/usg/admin/transparency/create"
                                            className={cn(buttonVariants())}
                                        >
                                            <Plus className="h-4 w-4" />
                                            Create Report
                                        </Link>
                                    </EmptyContent>
                                )}
                            </Empty>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
