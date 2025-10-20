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
import SearchBar from '@/components/usg/search-bar';
import StatusBadge from '@/components/usg/status-badge';
import { Head, router } from '@inertiajs/react';
import {
    Archive,
    ArrowLeft,
    Calendar,
    Download,
    Edit,
    Eye,
    FileText,
    Filter,
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
    status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived';
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
        safeFilters.status || '',
    );
    const [selectedCategory, setSelectedCategory] = useState(
        safeFilters.category || '',
    );
    const [selectedYear, setSelectedYear] = useState(safeFilters.year || '');

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
        router.get(
            '/usg/admin/resolutions',
            {
                search: searchQuery,
                status: selectedStatus,
                category: selectedCategory,
                year: selectedYear,
                ...newFilters,
            },
            { preserveState: true },
        );
    };

    const handleDelete = (resolution: Resolution) => {
        if (confirm(`Are you sure you want to delete "${resolution.title}"?`)) {
            router.delete(`/usg/admin/resolutions/${resolution.id}`);
        }
    };

    const handleStatusChange = (resolution: Resolution, newStatus: string) => {
        router.patch(`/usg/admin/resolutions/${resolution.id}/status`, {
            status: newStatus,
        });
    };

    const handleDownload = (resolution: Resolution) => {
        if (resolution.file_path) {
            window.open(resolution.file_path, '_blank');
        }
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

    const getStatsData = () => {
        return {
            total: safeResolutions.length,
            published: safeResolutions.filter((r) => r.status === 'published')
                .length,
            pending: safeResolutions.filter((r) => r.status === 'pending')
                .length,
            draft: safeResolutions.filter((r) => r.status === 'draft').length,
            withVotes: safeResolutions.filter(
                (r) => r.vote_results && getTotalVotes(r.vote_results) > 0,
            ).length,
        };
    };

    const stats = getStatsData();

    return (
        <>
            <Head title="Resolutions Management - USG Admin" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.visit('/usg/admin')}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Dashboard
                                </Button>
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Resolutions Management
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Create, edit and manage USG resolutions
                                        and legislative documents
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.visit('/usg/resolutions')
                                    }
                                >
                                    <Archive className="mr-2 h-4 w-4" />
                                    View Archive
                                </Button>

                                {canManage && (
                                    <Button
                                        onClick={() =>
                                            router.visit(
                                                '/usg/admin/resolutions/create',
                                            )
                                        }
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        New Resolution
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Stats */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-5">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {stats.total}
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
                                            {stats.published}
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
                                    <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900">
                                        <Filter className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {stats.pending}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Pending
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
                                            {stats.draft}
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
                                        <Vote className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {stats.withVotes}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            With Votes
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                <div className="md:col-span-2">
                                    <SearchBar
                                        placeholder="Search resolutions by title, number, or content..."
                                        value={searchQuery}
                                        onChange={(query) => {
                                            setSearchQuery(query);
                                            handleSearch(query);
                                        }}
                                    />
                                </div>

                                <div>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) =>
                                            handleStatusFilter(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    >
                                        <option value="">All Status</option>
                                        <option value="published">
                                            Published
                                        </option>
                                        <option value="pending">Pending</option>
                                        <option value="draft">Draft</option>
                                        <option value="rejected">
                                            Rejected
                                        </option>
                                        <option value="archived">
                                            Archived
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) =>
                                            handleCategoryFilter(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    >
                                        <option value="">All Categories</option>
                                        {safeCategories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) =>
                                            handleYearFilter(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    >
                                        <option value="">All Years</option>
                                        {safeYears.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resolutions List */}
                    <div className="space-y-4">
                        {safeResolutions.length > 0 ? (
                            safeResolutions.map((resolution) => (
                                <Card
                                    key={resolution.id}
                                    className="transition-shadow hover:shadow-lg"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <Badge
                                                        variant="outline"
                                                        className="font-mono"
                                                    >
                                                        {
                                                            resolution.resolution_number
                                                        }
                                                    </Badge>
                                                    <StatusBadge
                                                        status={
                                                            resolution.status
                                                        }
                                                        showIcon
                                                    />
                                                    {resolution.category && (
                                                        <Badge variant="secondary">
                                                            {
                                                                resolution.category
                                                            }
                                                        </Badge>
                                                    )}
                                                    {resolution.file_path && (
                                                        <Badge variant="outline">
                                                            <FileText className="mr-1 h-3 w-3" />
                                                            Document
                                                        </Badge>
                                                    )}
                                                </div>

                                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                                    {resolution.title}
                                                </h3>

                                                <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                                                    {resolution.description}
                                                </p>

                                                <div className="mb-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <User className="h-4 w-4" />
                                                        {resolution.author}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(
                                                            resolution.date_passed,
                                                        )}
                                                    </div>
                                                    {resolution.vote_results &&
                                                        getTotalVotes(
                                                            resolution.vote_results,
                                                        ) > 0 && (
                                                            <div className="flex items-center gap-1">
                                                                <Vote className="h-4 w-4" />
                                                                {getTotalVotes(
                                                                    resolution.vote_results,
                                                                )}{' '}
                                                                votes
                                                            </div>
                                                        )}
                                                </div>

                                                {/* Vote Results */}
                                                {resolution.vote_results &&
                                                    getTotalVotes(
                                                        resolution.vote_results,
                                                    ) > 0 && (
                                                        <div className="grid grid-cols-3 gap-3 text-xs">
                                                            <div className="rounded bg-green-50 p-2 text-center dark:bg-green-950">
                                                                <div className="font-bold text-green-700 dark:text-green-300">
                                                                    {
                                                                        resolution
                                                                            .vote_results
                                                                            .for
                                                                    }
                                                                </div>
                                                                <div className="text-green-600 dark:text-green-400">
                                                                    For (
                                                                    {getVotePercentage(
                                                                        resolution
                                                                            .vote_results
                                                                            .for,
                                                                        getTotalVotes(
                                                                            resolution.vote_results,
                                                                        ),
                                                                    )}
                                                                    %)
                                                                </div>
                                                            </div>
                                                            <div className="rounded bg-red-50 p-2 text-center dark:bg-red-950">
                                                                <div className="font-bold text-red-700 dark:text-red-300">
                                                                    {
                                                                        resolution
                                                                            .vote_results
                                                                            .against
                                                                    }
                                                                </div>
                                                                <div className="text-red-600 dark:text-red-400">
                                                                    Against (
                                                                    {getVotePercentage(
                                                                        resolution
                                                                            .vote_results
                                                                            .against,
                                                                        getTotalVotes(
                                                                            resolution.vote_results,
                                                                        ),
                                                                    )}
                                                                    %)
                                                                </div>
                                                            </div>
                                                            <div className="rounded bg-gray-50 p-2 text-center dark:bg-gray-800">
                                                                <div className="font-bold text-gray-700 dark:text-gray-300">
                                                                    {
                                                                        resolution
                                                                            .vote_results
                                                                            .abstain
                                                                    }
                                                                </div>
                                                                <div className="text-gray-600 dark:text-gray-400">
                                                                    Abstain (
                                                                    {getVotePercentage(
                                                                        resolution
                                                                            .vote_results
                                                                            .abstain,
                                                                        getTotalVotes(
                                                                            resolution.vote_results,
                                                                        ),
                                                                    )}
                                                                    %)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>

                                            <div className="flex items-center gap-2">
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
                                                                    'draft' && (
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleStatusChange(
                                                                                resolution,
                                                                                'pending',
                                                                            )
                                                                        }
                                                                    >
                                                                        Submit
                                                                        for
                                                                        Review
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {resolution.status ===
                                                                    'pending' && (
                                                                    <>
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    resolution,
                                                                                    'published',
                                                                                )
                                                                            }
                                                                        >
                                                                            Publish
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    resolution,
                                                                                    'rejected',
                                                                                )
                                                                            }
                                                                        >
                                                                            Reject
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    resolution,
                                                                                    'draft',
                                                                                )
                                                                            }
                                                                        >
                                                                            Return
                                                                            to
                                                                            Draft
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
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
                                                                        Archive
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            `/usg/admin/resolutions/${resolution.id}/votes`,
                                                                        )
                                                                    }
                                                                >
                                                                    Manage Votes
                                                                </DropdownMenuItem>
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
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                        No resolutions found
                                    </h3>
                                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                                        {searchQuery ||
                                        selectedStatus ||
                                        selectedCategory ||
                                        selectedYear
                                            ? 'Try adjusting your search filters'
                                            : 'Get started by creating your first resolution'}
                                    </p>
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
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
