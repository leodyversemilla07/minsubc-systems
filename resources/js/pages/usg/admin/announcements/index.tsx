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
    ArrowLeft,
    Calendar,
    Edit,
    Eye,
    Filter,
    Megaphone,
    MoreVertical,
    Plus,
    Trash2,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface Announcement {
    id: number;
    title: string;
    content: string;
    excerpt?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'draft' | 'pending' | 'published' | 'archived';
    author: string;
    published_at?: string;
    created_at: string;
    updated_at: string;
    views_count?: number;
    category?: string;
}

interface Props {
    announcements?: Announcement[] | { data: Announcement[] }; // Make it optional and handle different data structures
    filters?: {
        search?: string;
        status?: string;
        priority?: string;
        category?: string;
    };
    categories?: string[];
    canManage?: boolean;
}

export default function AnnouncementsManagement({
    announcements,
    filters,
    categories,
    canManage = true,
}: Props) {
    // Ensure announcements is always an array
    const safeAnnouncements: Announcement[] = Array.isArray(announcements)
        ? announcements
        : announcements?.data && Array.isArray(announcements.data)
          ? announcements.data
          : []; // Ensure filters and categories are always available
    const safeFilters = filters || {};
    const safeCategories: string[] = Array.isArray(categories)
        ? categories
        : [];

    const [searchQuery, setSearchQuery] = useState(safeFilters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(
        safeFilters.status || '',
    );
    const [selectedPriority, setSelectedPriority] = useState(
        safeFilters.priority || '',
    );
    const [selectedCategory, setSelectedCategory] = useState(
        safeFilters.category || '',
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyFilters({ search: query });
    };

    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status);
        applyFilters({ status });
    };

    const handlePriorityFilter = (priority: string) => {
        setSelectedPriority(priority);
        applyFilters({ priority });
    };

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory(category);
        applyFilters({ category });
    };

    const applyFilters = (newFilters: Partial<typeof filters>) => {
        router.get(
            '/usg/admin/announcements',
            {
                search: searchQuery,
                status: selectedStatus,
                priority: selectedPriority,
                category: selectedCategory,
                ...newFilters,
            },
            { preserveState: true },
        );
    };

    const handleDelete = (announcement: Announcement) => {
        if (
            confirm(`Are you sure you want to delete "${announcement.title}"?`)
        ) {
            router.delete(`/usg/admin/announcements/${announcement.id}`);
        }
    };

    const handleStatusChange = (
        announcement: Announcement,
        newStatus: string,
    ) => {
        router.patch(`/usg/admin/announcements/${announcement.id}/status`, {
            status: newStatus,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'high':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'low':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getStatsData = () => {
        return {
            total: safeAnnouncements.length,
            published: safeAnnouncements.filter((a) => a.status === 'published')
                .length,
            pending: safeAnnouncements.filter((a) => a.status === 'pending')
                .length,
            draft: safeAnnouncements.filter((a) => a.status === 'draft').length,
        };
    };

    const stats = getStatsData();

    return (
        <>
            <Head title="Announcements Management - USG Admin" />

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
                                        Announcements Management
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Create, edit and manage USG
                                        announcements
                                    </p>
                                </div>
                            </div>

                            {canManage && (
                                <Button
                                    onClick={() =>
                                        router.visit(
                                            '/usg/admin/announcements/create',
                                        )
                                    }
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Announcement
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Stats */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                                        <Megaphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                    </div>

                    {/* Filters */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                <div className="md:col-span-2">
                                    <SearchBar
                                        placeholder="Search announcements by title or content..."
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
                                        <option value="archived">
                                            Archived
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <select
                                        value={selectedPriority}
                                        onChange={(e) =>
                                            handlePriorityFilter(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    >
                                        <option value="">All Priority</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
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
                            </div>
                        </CardContent>
                    </Card>

                    {/* Announcements List */}
                    <div className="space-y-4">
                        {safeAnnouncements.length > 0 ? (
                            safeAnnouncements.map((announcement) => (
                                <Card
                                    key={announcement.id}
                                    className="transition-shadow hover:shadow-lg"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                                                        {announcement.title}
                                                    </h3>
                                                    <StatusBadge
                                                        status={
                                                            announcement.status
                                                        }
                                                        showIcon
                                                    />
                                                    <Badge
                                                        variant="secondary"
                                                        className={getPriorityColor(
                                                            announcement.priority,
                                                        )}
                                                    >
                                                        {announcement.priority.toUpperCase()}
                                                    </Badge>
                                                    {announcement.category && (
                                                        <Badge variant="outline">
                                                            {
                                                                announcement.category
                                                            }
                                                        </Badge>
                                                    )}
                                                </div>

                                                <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                                                    {announcement.excerpt ||
                                                        announcement.content}
                                                </p>

                                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <User className="h-4 w-4" />
                                                        {announcement.author}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {announcement.published_at
                                                            ? `Published ${formatDate(announcement.published_at)}`
                                                            : `Created ${formatDate(announcement.created_at)}`}
                                                    </div>
                                                    {announcement.views_count !==
                                                        undefined && (
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4" />
                                                            {
                                                                announcement.views_count
                                                            }{' '}
                                                            views
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/usg/announcements/${announcement.id}`,
                                                        )
                                                    }
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>

                                                {canManage && (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                router.visit(
                                                                    `/usg/admin/announcements/${announcement.id}/edit`,
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
                                                                {announcement.status ===
                                                                    'draft' && (
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleStatusChange(
                                                                                announcement,
                                                                                'pending',
                                                                            )
                                                                        }
                                                                    >
                                                                        Submit
                                                                        for
                                                                        Review
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {announcement.status ===
                                                                    'pending' && (
                                                                    <>
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    announcement,
                                                                                    'published',
                                                                                )
                                                                            }
                                                                        >
                                                                            Publish
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    announcement,
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
                                                                {announcement.status ===
                                                                    'published' && (
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleStatusChange(
                                                                                announcement,
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
                                                                        handleDelete(
                                                                            announcement,
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
                                    <Megaphone className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                        No announcements found
                                    </h3>
                                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                                        {searchQuery ||
                                        selectedStatus ||
                                        selectedPriority ||
                                        selectedCategory
                                            ? 'Try adjusting your search filters'
                                            : 'Get started by creating your first announcement'}
                                    </p>
                                    {canManage && (
                                        <Button
                                            onClick={() =>
                                                router.visit(
                                                    '/usg/admin/announcements/create',
                                                )
                                            }
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Announcement
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
