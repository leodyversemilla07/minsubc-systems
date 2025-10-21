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
import SearchBar from '@/components/usg/search-bar';
import StatusBadge from '@/components/usg/status-badge';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import {
    create,
    destroy,
    edit,
    index,
    preview,
} from '@/routes/usg/admin/announcements';
import { Head, Link, router } from '@inertiajs/react';
import {
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
    slug: string;
    content: string;
    excerpt?: string;
    priority: 'low' | 'normal' | 'high';
    status: 'draft' | 'pending' | 'published' | 'archived';
    author_name: string;
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
          : [];

    // Ensure filters and categories are always available
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
        const filterValue = status === 'all' ? '' : status;
        setSelectedStatus(filterValue);
        applyFilters({ status: filterValue });
    };

    const handlePriorityFilter = (priority: string) => {
        const filterValue = priority === 'all' ? '' : priority;
        setSelectedPriority(filterValue);
        applyFilters({ priority: filterValue });
    };

    const handleCategoryFilter = (category: string) => {
        const filterValue = category === 'all' ? '' : category;
        setSelectedCategory(filterValue);
        applyFilters({ category: filterValue });
    };

    const applyFilters = (newFilters: Partial<typeof filters>) => {
        router.get(
            index.url(),
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
            router.delete(destroy.url(announcement.id));
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
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Announcements', href: index.url() },
            ]}
        >
            <Head title="Announcements Management - USG Admin" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header with action button */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Announcements Management
                        </h1>
                        <p className="text-muted-foreground">
                            Create, edit and manage USG announcements
                        </p>
                    </div>

                    {canManage && (
                        <Link
                            href={create.url()}
                            className={cn(buttonVariants())}
                        >
                            <Plus className="h-4 w-4" />
                            New Announcement
                        </Link>
                    )}
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <Card>
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
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="draft">
                                            Draft
                                        </SelectItem>
                                        <SelectItem value="archived">
                                            Archived
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Select
                                    value={selectedPriority}
                                    onValueChange={handlePriorityFilter}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Priority
                                        </SelectItem>
                                        <SelectItem value="urgent">
                                            Urgent
                                        </SelectItem>
                                        <SelectItem value="high">
                                            High
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Select
                                    value={selectedCategory}
                                    onValueChange={handleCategoryFilter}
                                >
                                    <SelectTrigger className="w-full">
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
                                                    status={announcement.status}
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
                                                        {announcement.category}
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
                                                    {announcement.author_name}
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
                                            <Link
                                                href={preview.url(
                                                    announcement.slug,
                                                )}
                                                className={cn(
                                                    buttonVariants({
                                                        variant: 'ghost',
                                                        size: 'sm',
                                                    }),
                                                )}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>

                                            {canManage && (
                                                <>
                                                    <Link
                                                        href={edit.url(
                                                            announcement.id,
                                                        )}
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
                                                                    Submit for
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
                                                                        to Draft
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
                            <CardContent className="p-12">
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Megaphone className="h-12 w-12" />
                                        </EmptyMedia>
                                        <EmptyTitle>
                                            No announcements found
                                        </EmptyTitle>
                                        <EmptyDescription>
                                            {searchQuery ||
                                            selectedStatus ||
                                            selectedPriority ||
                                            selectedCategory
                                                ? 'Try adjusting your search filters to see more results.'
                                                : 'Get started by creating your first announcement to keep everyone informed.'}
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    {canManage && (
                                        <EmptyContent>
                                            <Link
                                                href={create.url()}
                                                className={cn(buttonVariants())}
                                            >
                                                <Plus className="h-4 w-4" />
                                                Create Announcement
                                            </Link>
                                        </EmptyContent>
                                    )}
                                </Empty>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
