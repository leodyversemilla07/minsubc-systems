import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
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
import SearchBar from '@/components/usg/search-bar';
import { ViewToggle } from '@/components/view-toggle';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {
    Archive,
    Calendar,
    Download,
    Edit,
    Eye,
    FileText,
    MoreVertical,
    Plus,
    Trash2,
    User,
    Vote,
} from 'lucide-react';
import { useState } from 'react';

interface Resolution {
    id: number;
    title: string;
    description: string;
    resolution_number: string;
    date_passed: string;
    author: string;
    file_path?: string;
    status: 'published' | 'archived';
    category?: string;
    vote_results?: {
        for: number;
        against: number;
        abstain: number;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    resolutions?: Resolution[] | { data: Resolution[] };
    filters?: {
        search?: string;
        status?: string;
        category?: string;
        year?: string;
    };
    categories?: string[];
    years?: string[];
    canManage?: boolean;
}

// Skeleton Loaders
function ResolutionsGridSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <Skeleton className="h-6 w-20" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function ResolutionsTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead><Skeleton className="h-4 w-32" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-24" /></TableHead>
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
                                <Skeleton className="h-4 w-56" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
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

export default function ResolutionsManagement({
    resolutions,
    filters,
    categories,
    years,
    canManage = true,
}: Props) {
    // Ensure resolutions is always an array
    const safeResolutions: Resolution[] = Array.isArray(resolutions)
        ? resolutions
        : resolutions?.data && Array.isArray(resolutions.data)
          ? resolutions.data
          : []; // Ensure categories, years, and filters are always available
    const safeCategories: string[] = Array.isArray(categories)
        ? categories
        : [];
    const safeYears: string[] = Array.isArray(years) ? years : [];
    const safeFilters = filters || {};

    const [searchQuery, setSearchQuery] = useState(safeFilters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(
        safeFilters.status || 'all',
    );
    const [selectedCategory, setSelectedCategory] = useState(
        safeFilters.category || 'all',
    );
    const [selectedYear, setSelectedYear] = useState(safeFilters.year || 'all');
    const [isLoading, setIsLoading] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
    const [view, setView] = useState<'grid' | 'table'>('grid');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyFilters({ search: query });
    };

    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status);
        applyFilters({ status });
    };

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory(category);
        applyFilters({ category });
    };

    const handleYearFilter = (year: string) => {
        setSelectedYear(year);
        applyFilters({ year });
    };

    const applyFilters = (newFilters: Partial<typeof filters>) => {
        setIsLoading(true);
        router.get(
            '/usg/admin/resolutions',
            {
                search: searchQuery,
                status: selectedStatus === 'all' ? '' : selectedStatus,
                category: selectedCategory === 'all' ? '' : selectedCategory,
                year: selectedYear === 'all' ? '' : selectedYear,
                ...newFilters,
            },
            {
                preserveState: true,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const handleDelete = (resolution: Resolution) => {
        if (confirm(`Are you sure you want to delete "${resolution.title}"?`)) {
            router.delete(`/usg/admin/resolutions/${resolution.id}`);
        }
    };

    const handleStatusChange = (resolution: Resolution, newStatus: string) => {
        setUpdatingStatus(resolution.id.toString());
        router.patch(
            `/usg/admin/resolutions/${resolution.id}/status`,
            {
                status: newStatus,
            },
            {
                onFinish: () => setUpdatingStatus(null),
            },
        );
    };

    const handleDownload = (resolution: Resolution) => {
        if (!resolution.file_path) {
            return;
        }

        // If file_path is already an absolute URL or starts with a slash, use it as-is.
        // Otherwise, assume it's a storage path and prefix with /storage/ to match how
        // the edit page builds download links (see EditResolution.handleDownload).
        const path = resolution.file_path;
        const url = path.startsWith('http') || path.startsWith('/') ? path : `/storage/${path}`;

        window.open(url, '_blank');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getTotalVotes = (voteResults?: {
        for: number;
        against: number;
        abstain: number;
    }) => {
        if (!voteResults) return 0;
        return voteResults.for + voteResults.against + voteResults.abstain;
    };

    const getVotePercentage = (votes: number, total: number) => {
        return total > 0 ? Math.round((votes / total) * 100) : 0;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case 'archived':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const formatStatus = (status: string) => {
        switch (status) {
            case 'published':
                return 'Published';
            case 'archived':
                return 'Archived';
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
        }
    };

    const getStatsData = () => {
        return {
            total: safeResolutions.length,
            published: safeResolutions.filter((r) => r.status === 'published')
                .length,
            archived: safeResolutions.filter((r) => r.status === 'archived')
                .length,
            withVotes: safeResolutions.filter(
                (r) => r.vote_results && getTotalVotes(r.vote_results) > 0,
            ).length,
        };
    };

    const stats = getStatsData();

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Resolutions', href: '/usg/admin/resolutions' },
            ]}
        >
            <Head title="Resolutions Management - USG Admin" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header with action buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                            Resolutions Management
                        </h1>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Create, edit and manage USG resolutions and
                            legislative documents
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                        <Button
                            variant="outline"
                            onClick={() => router.visit('/usg/resolutions')}
                            size="sm"
                            className="w-full justify-center sm:w-auto sm:justify-start"
                        >
                            <Archive className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">
                                View Archive
                            </span>
                            <span className="sm:hidden">Archive</span>
                        </Button>

                        <ViewToggle view={view} onViewChange={setView} />

                        {canManage && (
                            <Button
                                onClick={() =>
                                    router.visit(
                                        '/usg/admin/resolutions/create',
                                    )
                                }
                                size="sm"
                                className="w-full justify-center sm:w-auto sm:justify-start"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">
                                    New Resolution
                                </span>
                                <span className="sm:hidden">New</span>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <Card
                        className="cursor-pointer border-2 transition-all hover:scale-[1.02] hover:border-ring hover:shadow-md"
                        onClick={() => handleStatusFilter('all')}
                    >
                        <CardContent className="p-4 md:p-6">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="rounded-lg bg-chart-1 p-2 transition-colors md:p-3">
                                    <FileText className="h-5 w-5 text-foreground md:h-6 md:w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-xl font-bold md:text-2xl">
                                        {stats.total}
                                    </div>
                                    <div className="text-xs text-muted-foreground md:text-sm">
                                        Total
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        className="cursor-pointer border-2 transition-all hover:scale-[1.02] hover:border-ring hover:shadow-md"
                        onClick={() => handleStatusFilter('published')}
                    >
                        <CardContent className="p-4 md:p-6">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="rounded-lg bg-chart-2 p-2 transition-colors md:p-3">
                                    <Eye className="h-5 w-5 text-success md:h-6 md:w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-xl font-bold md:text-2xl">
                                        {stats.published}
                                    </div>
                                    <div className="text-xs text-muted-foreground md:text-sm">
                                        Published
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        className="cursor-pointer border-2 transition-all hover:scale-[1.02] hover:border-ring hover:shadow-md"
                        onClick={() => handleStatusFilter('archived')}
                    >
                        <CardContent className="p-4 md:p-6">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="rounded-lg bg-chart-3 p-2 transition-colors md:p-3">
                                    <Archive className="h-5 w-5 text-muted-foreground md:h-6 md:w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-xl font-bold md:text-2xl">
                                        {stats.archived}
                                    </div>
                                    <div className="text-xs text-muted-foreground md:text-sm">
                                        Archived
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        className="cursor-pointer border-2 transition-all hover:scale-[1.02] hover:border-ring hover:shadow-md sm:col-span-2 md:col-span-3 lg:col-span-1"
                        onClick={() => handleStatusFilter('all')}
                    >
                        <CardContent className="p-4 md:p-6">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="rounded-lg bg-chart-5 p-2 transition-colors md:p-3">
                                    <Vote className="h-5 w-5 text-foreground md:h-6 md:w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-xl font-bold md:text-2xl">
                                        {stats.withVotes}
                                    </div>
                                    <div className="text-xs text-muted-foreground md:text-sm">
                                        With Votes
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4 md:p-6">
                        {isLoading && (
                            <div className="mb-4 flex items-center justify-center">
                                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-foreground"></div>
                                <span className="ml-2 text-sm text-muted-foreground">
                                    Loading...
                                </span>
                            </div>
                        )}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                            <div className="sm:col-span-2 lg:col-span-2">
                                <SearchBar
                                    placeholder="Search resolutions..."
                                    value={searchQuery}
                                    onChange={(query) => {
                                        setSearchQuery(query);
                                        handleSearch(query);
                                    }}
                                />
                            </div>

                            <div>
                                <Select
                                    value={selectedStatus}
                                    onValueChange={handleStatusFilter}
                                >
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="published">
                                            Published
                                        </SelectItem>
                                        <SelectItem value="archived">
                                            Archived
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Select
                                    value={selectedCategory}
                                    onValueChange={handleCategoryFilter}
                                >
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Categories
                                        </SelectItem>
                                        {safeCategories.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Select
                                    value={selectedYear}
                                    onValueChange={handleYearFilter}
                                >
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="All Years" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Years
                                        </SelectItem>
                                        {safeYears.map((year) => (
                                            <SelectItem key={year} value={year}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Resolutions List */}
                {resolutions === undefined ? (
                    view === 'grid' ? (
                        <ResolutionsGridSkeleton />
                    ) : (
                        <Card>
                            <CardContent className="p-0">
                                <ResolutionsTableSkeleton />
                            </CardContent>
                        </Card>
                    )
                ) : safeResolutions.length > 0 ? (
                    view === 'grid' ? (
                        <div className="space-y-4">
                            {safeResolutions.map((resolution) => (
                            <Card
                                key={resolution.id}
                                className="transition-shadow hover:shadow-lg"
                            >
                                <CardContent className="p-4 md:p-6">
                                    {/* Compact Header */}
                                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className="shrink-0 font-mono text-xs"
                                                >
                                                    {
                                                        resolution.resolution_number
                                                    }
                                                </Badge>
                                                <Badge
                                                    className={getStatusColor(
                                                        resolution.status,
                                                    )}
                                                >
                                                    {formatStatus(
                                                        resolution.status,
                                                    )}
                                                </Badge>
                                                {resolution.category && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {resolution.category}
                                                    </Badge>
                                                )}
                                                {resolution.file_path && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        <FileText className="mr-1 h-3 w-3" />
                                                        Document
                                                    </Badge>
                                                )}
                                            </div>
                                            <h3 className="text-base leading-tight font-semibold text-foreground md:text-lg">
                                                {resolution.title}
                                            </h3>
                                        </div>

                                        {/* Primary Actions */}
                                        <div className="flex shrink-0 items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    router.visit(
                                                        `/usg/resolutions/${resolution.id}`,
                                                    )
                                                }
                                                className="h-8 w-8 touch-manipulation p-0"
                                                title="View Resolution"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            {resolution.file_path && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDownload(
                                                            resolution,
                                                        )
                                                    }
                                                    className="h-8 w-8 touch-manipulation p-0"
                                                    title="Download Document"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            )}

                                            {canManage && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/usg/admin/resolutions/${resolution.id}/edit`,
                                                            )
                                                        }
                                                        className="h-8 w-8 touch-manipulation p-0"
                                                        title="Edit Resolution"
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
                                                                className="h-8 w-8 touch-manipulation p-0"
                                                                title="More Actions"
                                                            >
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {resolution.status ===
                                                                'published' && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            resolution,
                                                                            'archived',
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        updatingStatus ===
                                                                        resolution.id.toString()
                                                                    }
                                                                >
                                                                    {updatingStatus ===
                                                                    resolution.id.toString() ? (
                                                                        <>
                                                                            <div className="mr-2 h-3 w-3 animate-spin rounded-full border-b border-current"></div>
                                                                            Updating...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Archive className="mr-2 h-4 w-4" />
                                                                            Archive
                                                                        </>
                                                                    )}
                                                                </DropdownMenuItem>
                                                            )}
                                                            {resolution.status ===
                                                                'archived' && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            resolution,
                                                                            'published',
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        updatingStatus ===
                                                                        resolution.id.toString()
                                                                    }
                                                                >
                                                                    {updatingStatus ===
                                                                    resolution.id.toString() ? (
                                                                        <>
                                                                            <div className="mr-2 h-3 w-3 animate-spin rounded-full border-b border-current"></div>
                                                                            Updating...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            Restore & Publish
                                                                        </>
                                                                    )}
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        resolution,
                                                                    )
                                                                }
                                                                className="text-destructive focus:text-destructive"
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

                                    {/* Description */}
                                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground md:mb-4 md:text-base">
                                        {resolution.description}
                                    </p>

                                    {/* Metadata */}
                                    <div className="mb-3 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mb-4 md:text-sm">
                                        <div className="flex min-w-0 items-center gap-1">
                                            <User className="h-3 w-3 shrink-0 md:h-4 md:w-4" />
                                            <span className="truncate">
                                                {resolution.author}
                                            </span>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-1">
                                            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                                            {formatDate(resolution.date_passed)}
                                        </div>
                                        {resolution.vote_results &&
                                            getTotalVotes(
                                                resolution.vote_results,
                                            ) > 0 && (
                                                <div className="flex shrink-0 items-center gap-1">
                                                    <Vote className="h-3 w-3 md:h-4 md:w-4" />
                                                    {getTotalVotes(
                                                        resolution.vote_results,
                                                    )}{' '}
                                                    votes
                                                </div>
                                            )}
                                    </div>

                                    {/* Vote Results */}
                                    {resolution.vote_results &&
                                        getTotalVotes(resolution.vote_results) >
                                            0 && (
                                            <div className="space-y-3 border-t border-border pt-3 md:pt-4">
                                                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                    <Vote className="h-4 w-4" />
                                                    Vote Results (
                                                    {getTotalVotes(
                                                        resolution.vote_results,
                                                    )}{' '}
                                                    total)
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between text-xs md:text-sm">
                                                            <span className="font-medium text-success">
                                                                For
                                                            </span>
                                                            <span className="font-medium text-muted-foreground">
                                                                {
                                                                    resolution
                                                                        .vote_results
                                                                        .for
                                                                }{' '}
                                                                (
                                                                {getVotePercentage(
                                                                    resolution
                                                                        .vote_results
                                                                        .for,
                                                                    getTotalVotes(
                                                                        resolution.vote_results,
                                                                    ),
                                                                )}
                                                                %)
                                                            </span>
                                                        </div>
                                                        <Progress
                                                            value={getVotePercentage(
                                                                resolution
                                                                    .vote_results
                                                                    .for,
                                                                getTotalVotes(
                                                                    resolution.vote_results,
                                                                ),
                                                            )}
                                                            className="h-2"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between text-xs md:text-sm">
                                                            <span className="font-medium text-destructive">
                                                                Against
                                                            </span>
                                                            <span className="font-medium text-muted-foreground">
                                                                {
                                                                    resolution
                                                                        .vote_results
                                                                        .against
                                                                }{' '}
                                                                (
                                                                {getVotePercentage(
                                                                    resolution
                                                                        .vote_results
                                                                        .against,
                                                                    getTotalVotes(
                                                                        resolution.vote_results,
                                                                    ),
                                                                )}
                                                                %)
                                                            </span>
                                                        </div>
                                                        <Progress
                                                            value={getVotePercentage(
                                                                resolution
                                                                    .vote_results
                                                                    .against,
                                                                getTotalVotes(
                                                                    resolution.vote_results,
                                                                ),
                                                            )}
                                                            className="h-2"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between text-xs md:text-sm">
                                                            <span className="font-medium text-muted-foreground">
                                                                Abstain
                                                            </span>
                                                            <span className="font-medium text-muted-foreground">
                                                                {
                                                                    resolution
                                                                        .vote_results
                                                                        .abstain
                                                                }{' '}
                                                                (
                                                                {getVotePercentage(
                                                                    resolution
                                                                        .vote_results
                                                                        .abstain,
                                                                    getTotalVotes(
                                                                        resolution.vote_results,
                                                                    ),
                                                                )}
                                                                %)
                                                            </span>
                                                        </div>
                                                        <Progress
                                                            value={getVotePercentage(
                                                                resolution
                                                                    .vote_results
                                                                    .abstain,
                                                                getTotalVotes(
                                                                    resolution.vote_results,
                                                                ),
                                                            )}
                                                            className="h-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </CardContent>
                            </Card>
                        ))}
                        </div>
                    ) : (
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Number</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Date Passed</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {safeResolutions.map((resolution) => (
                                        <TableRow key={resolution.id}>
                                            <TableCell className="font-mono text-xs">
                                                {resolution.resolution_number}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {resolution.title}
                                                    {resolution.file_path && (
                                                        <FileText className="h-3 w-3 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusColor(
                                                        resolution.status,
                                                    )}
                                                >
                                                    {formatStatus(
                                                        resolution.status,
                                                    )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {resolution.category ? (
                                                    <Badge variant="secondary">
                                                        {resolution.category}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {resolution.author}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {formatDate(resolution.date_passed)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/usg/resolutions/${resolution.id}`,
                                                            )
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>

                                                    {resolution.file_path && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDownload(
                                                                    resolution,
                                                                )
                                                            }
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    )}

                                                    {canManage && (
                                                        <>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    router.visit(
                                                                        `/usg/admin/resolutions/${resolution.id}/edit`,
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
                                                                    {resolution.status ===
                                                                        'published' && (
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    resolution,
                                                                                    'archived',
                                                                                )
                                                                            }
                                                                        >
                                                                            <Archive className="mr-2 h-4 w-4" />
                                                                            Archive
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                    {resolution.status ===
                                                                        'archived' && (
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    resolution,
                                                                                    'published',
                                                                                )
                                                                            }
                                                                        >
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            Restore & Publish
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                resolution,
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
                                        <FileText className="h-6 w-6" />
                                    </EmptyMedia>
                                    <EmptyTitle>
                                        {searchQuery ||
                                        selectedStatus !== 'all' ||
                                        selectedCategory !== 'all' ||
                                        selectedYear !== 'all'
                                            ? 'No resolutions match your filters'
                                            : 'No resolutions yet'}
                                    </EmptyTitle>
                                    <EmptyDescription>
                                        {searchQuery ||
                                        selectedStatus !== 'all' ||
                                        selectedCategory !== 'all' ||
                                        selectedYear !== 'all'
                                            ? 'Try adjusting your search criteria or clearing some filters to see more results.'
                                            : 'Get started by creating your first resolution. Legislative documents and proposals can be managed here.'}
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>
                                    {(searchQuery ||
                                        selectedStatus !== 'all' ||
                                        selectedCategory !== 'all' ||
                                        selectedYear !== 'all') && (
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedStatus('all');
                                                setSelectedCategory('all');
                                                setSelectedYear('all');
                                                applyFilters({
                                                    search: '',
                                                    status: 'all',
                                                    category: 'all',
                                                    year: 'all',
                                                });
                                            }}
                                        >
                                            Clear Filters
                                        </Button>
                                    )}
                                    {canManage && (
                                        <Button
                                            onClick={() =>
                                                router.visit(
                                                    '/usg/admin/resolutions/create',
                                                )
                                            }
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Resolution
                                        </Button>
                                    )}
                                </EmptyContent>
                            </Empty>
                            </CardContent>
                        </Card>
                )}
            </div>
        </AppLayout>
    );
}
