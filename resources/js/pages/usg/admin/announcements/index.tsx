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

// Skeleton Loaders
function AnnouncementsGridSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="space-y-4 p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <Skeleton className="h-6 w-20 shrink-0" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <Skeleton className="h-4 w-24" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-8" />
                                    <Skeleton className="h-8 w-8" />
                                    <Skeleton className="h-8 w-8" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function AnnouncementsTableSkeleton() {
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
                        <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-24" />
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
    const [view, setView] = useState<'grid' | 'table'>('grid');

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] =
        useState<Announcement | null>(null);

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
        setAnnouncementToDelete(announcement);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (announcementToDelete) {
            router.delete(destroy.url(announcementToDelete.id), {
                onFinish: () => {
                    setDeleteDialogOpen(false);
                    setAnnouncementToDelete(null);
                },
            });
        }
    };

    const handleStatusChange = (
        announcement: Announcement,
        newStatus: string,
    ) => {
        // Use the correct route based on the status action
        let route = '';
        switch (newStatus) {
            case 'published':
                route = `/usg/admin/announcements/${announcement.id}/publish`;
                break;
            case 'draft':
                route = `/usg/admin/announcements/${announcement.id}/unpublish`;
                break;
            case 'archived':
                route = `/usg/admin/announcements/${announcement.id}/archive`;
                break;
            default:
                return;
        }
        router.patch(route);
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case 'draft':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const formatStatus = (status: string) => {
        switch (status) {
            case 'published':
                return 'Published';
            case 'draft':
                return 'draft';
            case 'pending':
                return 'Pending';
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
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

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header with action button */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
                            Announcements
                        </h1>
                        <p className="text-muted-foreground">
                            Create, edit and manage USG announcements
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <ViewToggle view={view} onViewChange={setView} />
                        {canManage && (
                            <Link
                                href={create.url()}
                                className={cn(buttonVariants())}
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                New Announcement
                            </Link>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
                                    <Megaphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {stats.total}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                    <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {stats.published}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Published
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/20">
                                    <Filter className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {stats.pending}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Pending
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800/50">
                                    <Edit className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {stats.draft}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
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
                {announcements === undefined ? (
                    view === 'grid' ? (
                        <AnnouncementsGridSkeleton />
                    ) : (
                        <Card>
                            <CardContent className="p-0">
                                <AnnouncementsTableSkeleton />
                            </CardContent>
                        </Card>
                    )
                ) : safeAnnouncements.length > 0 ? (
                    view === 'grid' ? (
                        <div className="space-y-4">
                            {safeAnnouncements.map((announcement) => (
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
                                                    <Badge
                                                        className={getStatusColor(
                                                            announcement.status,
                                                        )}
                                                    >
                                                        {formatStatus(
                                                            announcement.status,
                                                        )}
                                                    </Badge>
                                                    {announcement.priority && (
                                                        <Badge
                                                            variant="secondary"
                                                            className={getPriorityColor(
                                                                announcement.priority,
                                                            )}
                                                        >
                                                            {announcement.priority.toUpperCase()}
                                                        </Badge>
                                                    )}
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
                                                        {
                                                            announcement.author_name
                                                        }
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
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Views</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {safeAnnouncements.map((announcement) => (
                                        <TableRow key={announcement.id}>
                                            <TableCell className="font-medium">
                                                {announcement.title}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusColor(
                                                        announcement.status,
                                                    )}
                                                >
                                                    {formatStatus(
                                                        announcement.status,
                                                    )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {announcement.priority ? (
                                                    <Badge
                                                        variant="secondary"
                                                        className={getPriorityColor(
                                                            announcement.priority,
                                                        )}
                                                    >
                                                        {announcement.priority.toUpperCase()}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {announcement.category ? (
                                                    <Badge variant="outline">
                                                        {announcement.category}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {announcement.author_name}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {announcement.published_at
                                                    ? formatDate(
                                                          announcement.published_at,
                                                      )
                                                    : formatDate(
                                                          announcement.created_at,
                                                      )}
                                            </TableCell>
                                            <TableCell>
                                                {announcement.views_count ?? 0}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            router.visit(
                                                                preview.url({
                                                                    announcement:
                                                                        announcement.id,
                                                                }),
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
                                                                        edit.url(
                                                                            {
                                                                                announcement:
                                                                                    announcement.id,
                                                                            },
                                                                        ),
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

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "
                            {announcementToDelete?.title}"? This action cannot
                            be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
