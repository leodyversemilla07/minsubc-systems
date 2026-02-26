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
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import {
    create,
    destroy,
    edit,
    index,
    show,
    update,
} from '@/routes/usg/admin/events';
import { calendar, show as publicShow } from '@/routes/usg/events';
import { Head, router } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    Calendar,
    CalendarDays,
    Clock,
    Edit,
    Eye,
    Loader2,
    MoreVertical,
    Plus,
    Trash2,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    end_time?: string;
    location: string;
    category: string;
    status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
}

interface PaginatedEvents {
    data: Event[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links?: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    events?: Event[] | PaginatedEvents;
    filters?: {
        search?: string;
        category?: string;
        status?: string;
        month?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
    };
    categories?: string[];
    canManage?: boolean;
}

// Skeleton Loaders
function EventsGridSkeleton() {
    return (
        <div className="divide-y">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-3 p-4">
                    <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-2/3" />
                        </div>
                        <Skeleton className="ml-2 h-5 w-20 shrink-0" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-5 w-16" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function EventsTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <Skeleton className="h-4 w-4" />
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
                        <Skeleton className="h-4 w-20" />
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
                {[...Array(10)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Skeleton className="h-4 w-4" />
                        </TableCell>
                        <TableCell>
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-24" />
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

export default function EventsManagement({
    events,
    filters,
    categories,
    canManage = true,
}: Props) {
    // Ensure events is always an array
    const safeEvents: Event[] = Array.isArray(events)
        ? events
        : events?.data && Array.isArray(events.data)
          ? events.data
          : []; // Ensure categories and filters are always available
    const safeCategories: string[] = Array.isArray(categories)
        ? categories
        : [];
    const safeFilters = filters || {};

    const [searchQuery, setSearchQuery] = useState(safeFilters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(
        safeFilters.category || 'all',
    );
    const [selectedStatus, setSelectedStatus] = useState(
        safeFilters.status || 'all',
    );
    const [selectedMonth, setSelectedMonth] = useState(
        safeFilters.month || 'all',
    );

    // Sorting state
    const [sortField, setSortField] = useState(safeFilters.sort || 'date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
        safeFilters.direction || 'desc',
    );

    // Bulk actions state
    const [selectedEvents, setSelectedEvents] = useState<Set<number>>(
        new Set(),
    );
    const [isBulkActionLoading, setIsBulkActionLoading] = useState(false);
    const [view, setView] = useState<'grid' | 'table'>('table');

    // Alert dialog state
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [alertDialogConfig, setAlertDialogConfig] = useState<{
        title: string;
        description: string;
        action: () => void;
        actionLabel: string;
        variant?: 'default' | 'destructive';
    } | null>(null);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Close alert dialog with Escape
            if (event.key === 'Escape' && alertDialogOpen) {
                setAlertDialogOpen(false);
                event.preventDefault();
            }

            // Handle pagination with arrow keys when focused on pagination
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                const activeElement = document.activeElement;
                if (activeElement?.closest('[data-pagination]')) {
                    const paginationButtons = document.querySelectorAll(
                        '[data-pagination] button',
                    );
                    const currentIndex = Array.from(paginationButtons).indexOf(
                        activeElement as HTMLButtonElement,
                    );

                    if (event.key === 'ArrowLeft' && currentIndex > 0) {
                        (
                            paginationButtons[
                                currentIndex - 1
                            ] as HTMLButtonElement
                        ).focus();
                        event.preventDefault();
                    } else if (
                        event.key === 'ArrowRight' &&
                        currentIndex < paginationButtons.length - 1
                    ) {
                        (
                            paginationButtons[
                                currentIndex + 1
                            ] as HTMLButtonElement
                        ).focus();
                        event.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [alertDialogOpen]);

    // Focus management for alert dialog
    useEffect(() => {
        if (alertDialogOpen) {
            // Focus the cancel button when dialog opens
            const cancelButton = document.querySelector(
                '[data-alert-dialog-cancel]',
            ) as HTMLButtonElement;
            if (cancelButton) {
                cancelButton.focus();
            }
        }
    }, [alertDialogOpen]);

    // Loading states
    const [isFiltering, setIsFiltering] = useState(false);
    const [updatingEvents, setUpdatingEvents] = useState<Set<number>>(
        new Set(),
    );
    const [deletingEvents, setDeletingEvents] = useState<Set<number>>(
        new Set(),
    );

    // Error states
    const [filterError, setFilterError] = useState<string | null>(null);
    const [actionErrors, setActionErrors] = useState<
        Record<number, string | null>
    >({});

    const applyFilters = useCallback(
        (newFilters: Partial<typeof filters>) => {
            setIsFiltering(true);
            setFilterError(null);
            router.get(
                index({
                    query: {
                        search: searchQuery,
                        category:
                            selectedCategory === 'all' ? '' : selectedCategory,
                        status: selectedStatus === 'all' ? '' : selectedStatus,
                        month: selectedMonth === 'all' ? '' : selectedMonth,
                        sort: sortField,
                        direction: sortDirection,
                        ...newFilters,
                    },
                }),
                {},
                {
                    preserveState: true,
                    onFinish: () => setIsFiltering(false),
                    onError: () => {
                        setFilterError(
                            'Failed to apply filters. Please try again.',
                        );
                        setIsFiltering(false);
                    },
                },
            );
        },
        [
            searchQuery,
            selectedCategory,
            selectedStatus,
            selectedMonth,
            sortField,
            sortDirection,
        ],
    );

    // Search debouncing
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedSearch = useCallback(
        (query: string) => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            searchTimeoutRef.current = setTimeout(() => {
                applyFilters({ search: query });
            }, 300);
        },
        [applyFilters],
    );

    // Handler functions
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory(category);
        applyFilters({ category: category === 'all' ? '' : category });
    };

    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status);
        applyFilters({ status: status === 'all' ? '' : status });
    };

    const handleMonthFilter = (month: string) => {
        setSelectedMonth(month);
        applyFilters({ month: month === 'all' ? '' : month });
    };

    const handleSort = (field: string) => {
        const newDirection =
            sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(newDirection);
        applyFilters({ sort: field, direction: newDirection });
    };

    const handleEventSelect = (eventId: number, checked: boolean) => {
        setSelectedEvents((prev) => {
            const newSet = new Set(prev);
            if (checked) {
                newSet.add(eventId);
            } else {
                newSet.delete(eventId);
            }
            return newSet;
        });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedEvents(new Set(safeEvents.map((event) => event.id)));
        } else {
            setSelectedEvents(new Set());
        }
    };

    const showAlertDialog = (config: {
        title: string;
        description: string;
        action: () => void;
        actionLabel: string;
        variant?: 'default' | 'destructive';
    }) => {
        setAlertDialogConfig(config);
        setAlertDialogOpen(true);
    };

    const handleBulkDelete = async () => {
        if (selectedEvents.size === 0) return;

        showAlertDialog({
            title: 'Delete Selected Events',
            description: `Are you sure you want to delete ${selectedEvents.size} event(s)? This action cannot be undone.`,
            action: async () => {
                setIsBulkActionLoading(true);
                try {
                    const deletePromises = Array.from(selectedEvents).map(
                        (eventId) =>
                            new Promise((resolve, reject) => {
                                router.delete(destroy(eventId), {
                                    onFinish: resolve,
                                    onError: reject,
                                });
                            }),
                    );

                    await Promise.all(deletePromises);
                    setSelectedEvents(new Set());
                } catch {
                    alert(
                        'Some events could not be deleted. Please try again.',
                    );
                } finally {
                    setIsBulkActionLoading(false);
                }
            },
            actionLabel: 'Delete',
            variant: 'destructive',
        });
    };

    const handleDelete = (event: Event) => {
        showAlertDialog({
            title: 'Delete Event',
            description: `Are you sure you want to delete "${event.title}"? This action cannot be undone.`,
            action: () => {
                setDeletingEvents((prev) => new Set(prev).add(event.id));
                setActionErrors((prev) => ({ ...prev, [event.id]: null }));
                router.delete(destroy(event.id), {
                    onFinish: () => {
                        setDeletingEvents((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(event.id);
                            return newSet;
                        });
                    },
                    onError: () => {
                        setDeletingEvents((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(event.id);
                            return newSet;
                        });
                        setActionErrors((prev) => ({
                            ...prev,
                            [event.id]:
                                'Failed to delete event. Please try again.',
                        }));
                    },
                });
            },
            actionLabel: 'Delete',
            variant: 'destructive',
        });
    };

    const handleStatusChange = (event: Event, newStatus: string) => {
        setUpdatingEvents((prev) => new Set(prev).add(event.id));
        setActionErrors((prev) => ({ ...prev, [event.id]: null }));
        router.patch(
            update(event.id),
            {
                status: newStatus,
            },
            {
                onFinish: () => {
                    setUpdatingEvents((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(event.id);
                        return newSet;
                    });
                },
                onError: () => {
                    setUpdatingEvents((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(event.id);
                        return newSet;
                    });
                    setActionErrors((prev) => ({
                        ...prev,
                        [event.id]: `Failed to update event status. Please try again.`,
                    }));
                },
            },
        );
    };

    const formatRelativeDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'N/A';

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';

        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
        );
        const targetDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
        );

        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
        if (diffDays < -1 && diffDays >= -7)
            return `${Math.abs(diffDays)} days ago`;

        // For dates beyond a week, show the actual date
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string | null | undefined) => {
        if (!timeString) return 'N/A';

        // Handle different time formats
        let timeValue = timeString;

        // If it's already in HH:MM format, use it directly
        if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(timeString)) {
            timeValue = timeString;
        } else {
            // Try to parse as a full datetime string
            const date = new Date(timeString);
            if (!isNaN(date.getTime())) {
                timeValue = date.toTimeString().split(' ')[0];
            } else {
                return 'Invalid Time';
            }
        }

        const timeDate = new Date(`2000-01-01T${timeValue}`);
        if (isNaN(timeDate.getTime())) return 'Invalid Time';

        return timeDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'ongoing':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'completed':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const isUpcoming = (dateString: string | null | undefined) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        return !isNaN(date.getTime()) && date > new Date();
    };

    const isPast = (dateString: string | null | undefined) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        return !isNaN(date.getTime()) && date < new Date();
    };

    const getStatsData = () => {
        const upcoming = safeEvents.filter((e) => e.date && isUpcoming(e.date));
        const past = safeEvents.filter((e) => e.date && isPast(e.date));

        return {
            total: safeEvents.length,
            upcoming: upcoming.length,
            past: past.length,
            cancelled: safeEvents.filter((e) => e.status === 'cancelled')
                .length,
        };
    };

    const getMonthOptions = () => {
        // Get all event dates as Date objects
        const eventDates = safeEvents
            .map((e) => new Date(e.date))
            .filter((d) => !isNaN(d.getTime()));

        // If no events, default to current year
        const now = new Date();
        const currentYear = now.getFullYear();
        let minYear = currentYear;
        let maxYear = currentYear;
        if (eventDates.length > 0) {
            minYear = Math.min(...eventDates.map((d) => d.getFullYear()));
            maxYear = Math.max(...eventDates.map((d) => d.getFullYear()));
        }

        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const months = [{ value: 'all', label: 'All Months' }];
        for (let year = minYear; year <= maxYear; year++) {
            for (let month = 0; month < 12; month++) {
                months.push({
                    value: `${year}-${String(month + 1).padStart(2, '0')}`,
                    label: `${monthNames[month]} ${year}`,
                });
            }
        }
        return months;
    };

    const stats = getStatsData();

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Events', href: '/usg/admin/events' },
            ]}
        >
            <Head title="Events Management - USG Admin" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header with action buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-white">
                            Events
                        </h1>
                        <p className="text-muted-foreground">
                            Create, edit and manage USG events and activities
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        {selectedEvents.size > 0 && (
                            <>
                                <span className="text-sm text-muted-foreground">
                                    {selectedEvents.size} selected
                                </span>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleBulkDelete}
                                    disabled={isBulkActionLoading}
                                    className="w-full sm:w-auto"
                                >
                                    {isBulkActionLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="mr-1 h-4 w-4" />
                                    )}
                                    Delete Selected
                                </Button>
                            </>
                        )}
                        <Button
                            variant="outline"
                            onClick={() => router.visit(calendar())}
                            size="sm"
                        >
                            <CalendarDays className="mr-1 h-4 w-4" />
                            Calendar
                        </Button>

                        <ViewToggle view={view} onViewChange={setView} />

                        {canManage && (
                            <Button
                                onClick={() => router.visit(create())}
                                size="sm"
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                New Event
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
                                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {stats.total}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total Events
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {stats.upcoming}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Upcoming
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800/50">
                                    <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {stats.past}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Completed
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                                    <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {stats.cancelled}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Cancelled
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="relative mb-6">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                            <div className="md:col-span-2">
                                <SearchBar
                                    placeholder="Search events by title, description, or location..."
                                    value={searchQuery}
                                    onChange={(query) => {
                                        setSearchQuery(query);
                                        handleSearch(query);
                                    }}
                                />
                            </div>

                            <div>
                                <Select
                                    value={selectedCategory}
                                    onValueChange={handleCategoryFilter}
                                    disabled={isFiltering}
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

                            <div>
                                <Select
                                    value={selectedStatus}
                                    onValueChange={handleStatusFilter}
                                    disabled={isFiltering}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="scheduled">
                                            Scheduled
                                        </SelectItem>
                                        <SelectItem value="ongoing">
                                            Ongoing
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="cancelled">
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Select
                                    value={selectedMonth}
                                    onValueChange={handleMonthFilter}
                                    disabled={isFiltering}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Months" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getMonthOptions().map((month) => (
                                            <SelectItem
                                                key={month.value}
                                                value={month.value}
                                            >
                                                {month.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Loading overlay for filters */}
                        {isFiltering && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/50 dark:bg-gray-900/50">
                                <Loader2 className="h-6 w-6 animate-spin text-gray-600 dark:text-gray-400" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Events List */}
                <Card>
                    <CardContent className="p-0">
                        {view === 'grid' ? (
                            /* Card View */
                            <div>
                                {events === undefined ? (
                                    <EventsGridSkeleton />
                                ) : safeEvents.length > 0 ? (
                                    <div className="divide-y">
                                        {safeEvents.map((event) => (
                                            <div
                                                key={event.id}
                                                className="space-y-3 p-4"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="truncate text-sm font-medium">
                                                            {event.title}
                                                        </h3>
                                                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                                            {event.description}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant="secondary"
                                                        className={`ml-2 shrink-0 ${getStatusColor(event.status)}`}
                                                    >
                                                        {event.status.toUpperCase()}
                                                    </Badge>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-xs">
                                                    <div>
                                                        <div className="flex items-center gap-1 text-muted-foreground">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>
                                                                {formatRelativeDate(
                                                                    event.date,
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                                                            <Clock className="h-3 w-3" />
                                                            <span>
                                                                {formatTime(
                                                                    event.time,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-muted-foreground">
                                                            <strong>
                                                                Location:
                                                            </strong>{' '}
                                                            {event.location}
                                                        </div>
                                                        <div className="mt-1 text-muted-foreground">
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {event.category}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Error Display */}
                                                {actionErrors[event.id] && (
                                                    <div className="mt-2 rounded bg-red-50 p-2 text-xs text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                                        {actionErrors[event.id]}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            router.visit(
                                                                publicShow.url(
                                                                    event.id,
                                                                ),
                                                            )
                                                        }
                                                        className="h-8 px-2"
                                                    >
                                                        <Eye className="mr-1 h-3 w-3" />
                                                        View
                                                    </Button>

                                                    {canManage && (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 px-2"
                                                                    disabled={
                                                                        updatingEvents.has(
                                                                            event.id,
                                                                        ) ||
                                                                        deletingEvents.has(
                                                                            event.id,
                                                                        )
                                                                    }
                                                                >
                                                                    {updatingEvents.has(
                                                                        event.id,
                                                                    ) ||
                                                                    deletingEvents.has(
                                                                        event.id,
                                                                    ) ? (
                                                                        <Loader2 className="h-3 w-3 animate-spin" />
                                                                    ) : (
                                                                        <MoreVertical className="h-3 w-3" />
                                                                    )}
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            edit(
                                                                                event.id,
                                                                            ),
                                                                        )
                                                                    }
                                                                >
                                                                    <Edit className="mr-2 h-3 w-3" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                {event.status ===
                                                                    'scheduled' &&
                                                                    isUpcoming(
                                                                        event.date,
                                                                    ) && (
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    event,
                                                                                    'ongoing',
                                                                                )
                                                                            }
                                                                            disabled={updatingEvents.has(
                                                                                event.id,
                                                                            )}
                                                                        >
                                                                            {updatingEvents.has(
                                                                                event.id,
                                                                            ) ? (
                                                                                <>
                                                                                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                                                                    Updating...
                                                                                </>
                                                                            ) : (
                                                                                'Mark as Ongoing'
                                                                            )}
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                {(event.status ===
                                                                    'ongoing' ||
                                                                    isPast(
                                                                        event.date,
                                                                    )) && (
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleStatusChange(
                                                                                event,
                                                                                'completed',
                                                                            )
                                                                        }
                                                                        disabled={updatingEvents.has(
                                                                            event.id,
                                                                        )}
                                                                    >
                                                                        {updatingEvents.has(
                                                                            event.id,
                                                                        ) ? (
                                                                            <>
                                                                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                                                                Updating...
                                                                            </>
                                                                        ) : (
                                                                            'Mark as Completed'
                                                                        )}
                                                                    </DropdownMenuItem>
                                                                )}
                                                                {event.status !==
                                                                    'cancelled' &&
                                                                    event.status !==
                                                                        'completed' && (
                                                                        <DropdownMenuItem
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    event,
                                                                                    'cancelled',
                                                                                )
                                                                            }
                                                                            disabled={updatingEvents.has(
                                                                                event.id,
                                                                            )}
                                                                        >
                                                                            {updatingEvents.has(
                                                                                event.id,
                                                                            ) ? (
                                                                                <>
                                                                                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                                                                    Updating...
                                                                                </>
                                                                            ) : (
                                                                                'Cancel Event'
                                                                            )}
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            show(
                                                                                event.id,
                                                                            ),
                                                                        )
                                                                    }
                                                                >
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            event,
                                                                        )
                                                                    }
                                                                    className="text-red-600 focus:text-red-600"
                                                                    disabled={deletingEvents.has(
                                                                        event.id,
                                                                    )}
                                                                >
                                                                    {deletingEvents.has(
                                                                        event.id,
                                                                    ) ? (
                                                                        <>
                                                                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                                                            Deleting...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Trash2 className="mr-2 h-3 w-3" />
                                                                            Delete
                                                                        </>
                                                                    )}
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon">
                                                <Calendar className="h-6 w-6" />
                                            </EmptyMedia>
                                            <EmptyTitle>
                                                {searchQuery ||
                                                selectedCategory !== 'all' ||
                                                selectedStatus !== 'all' ||
                                                selectedMonth !== 'all'
                                                    ? 'No events found'
                                                    : 'No events yet'}
                                            </EmptyTitle>
                                            <EmptyDescription>
                                                {searchQuery ||
                                                selectedCategory !== 'all' ||
                                                selectedStatus !== 'all' ||
                                                selectedMonth !== 'all'
                                                    ? 'Try adjusting your search filters to see more results.'
                                                    : 'Get started by creating your first event to keep everyone informed about upcoming activities.'}
                                            </EmptyDescription>
                                        </EmptyHeader>
                                        {canManage && (
                                            <EmptyContent>
                                                <Button
                                                    onClick={() =>
                                                        router.visit(create())
                                                    }
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Create Event
                                                </Button>
                                            </EmptyContent>
                                        )}
                                    </Empty>
                                )}
                            </div>
                        ) : (
                            /* Table View */
                            <div className="overflow-x-auto">
                                {events === undefined ? (
                                    <EventsTableSkeleton />
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px]">
                                                    <Checkbox
                                                        checked={
                                                            selectedEvents.size ===
                                                                safeEvents.length &&
                                                            safeEvents.length >
                                                                0
                                                        }
                                                        onCheckedChange={
                                                            handleSelectAll
                                                        }
                                                        aria-label="Select all events"
                                                    />
                                                </TableHead>
                                                <TableHead>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() =>
                                                            handleSort('title')
                                                        }
                                                        className="h-auto p-0 font-medium hover:bg-transparent"
                                                    >
                                                        Title
                                                        {sortField ===
                                                        'title' ? (
                                                            sortDirection ===
                                                            'asc' ? (
                                                                <ArrowUp className="ml-2 h-4 w-4" />
                                                            ) : (
                                                                <ArrowDown className="ml-2 h-4 w-4" />
                                                            )
                                                        ) : (
                                                            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                                                        )}
                                                    </Button>
                                                </TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() =>
                                                            handleSort('date')
                                                        }
                                                        className="h-auto p-0 font-medium hover:bg-transparent"
                                                    >
                                                        Date
                                                        {sortField ===
                                                        'date' ? (
                                                            sortDirection ===
                                                            'asc' ? (
                                                                <ArrowUp className="ml-2 h-4 w-4" />
                                                            ) : (
                                                                <ArrowDown className="ml-2 h-4 w-4" />
                                                            )
                                                        ) : (
                                                            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                                                        )}
                                                    </Button>
                                                </TableHead>
                                                <TableHead>Time</TableHead>
                                                <TableHead>Location</TableHead>
                                                <TableHead>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() =>
                                                            handleSort('status')
                                                        }
                                                        className="h-auto p-0 font-medium hover:bg-transparent"
                                                    >
                                                        Status
                                                        {sortField ===
                                                        'status' ? (
                                                            sortDirection ===
                                                            'asc' ? (
                                                                <ArrowUp className="ml-2 h-4 w-4" />
                                                            ) : (
                                                                <ArrowDown className="ml-2 h-4 w-4" />
                                                            )
                                                        ) : (
                                                            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                                                        )}
                                                    </Button>
                                                </TableHead>
                                                <TableHead className="w-[100px]">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {safeEvents.length > 0 ? (
                                                safeEvents.map((event) => (
                                                    <TableRow key={event.id}>
                                                        <TableCell>
                                                            <Checkbox
                                                                checked={selectedEvents.has(
                                                                    event.id,
                                                                )}
                                                                onCheckedChange={(
                                                                    checked,
                                                                ) =>
                                                                    handleEventSelect(
                                                                        event.id,
                                                                        checked as boolean,
                                                                    )
                                                                }
                                                                aria-label={`Select event ${event.title}`}
                                                            />
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            {event.title}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline">
                                                                {event.category}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {formatRelativeDate(
                                                                event.date,
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {formatTime(
                                                                event.time,
                                                            )}
                                                            {event.end_time &&
                                                                ` - ${formatTime(event.end_time)}`}
                                                        </TableCell>
                                                        <TableCell>
                                                            {event.location}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="secondary"
                                                                className={getStatusColor(
                                                                    event.status,
                                                                )}
                                                            >
                                                                {event.status.toUpperCase()}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            publicShow.url(
                                                                                event.id,
                                                                            ),
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
                                                                                    edit(
                                                                                        event.id,
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
                                                                                    disabled={
                                                                                        updatingEvents.has(
                                                                                            event.id,
                                                                                        ) ||
                                                                                        deletingEvents.has(
                                                                                            event.id,
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {updatingEvents.has(
                                                                                        event.id,
                                                                                    ) ||
                                                                                    deletingEvents.has(
                                                                                        event.id,
                                                                                    ) ? (
                                                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                                                    ) : (
                                                                                        <MoreVertical className="h-4 w-4" />
                                                                                    )}
                                                                                </Button>
                                                                            </DropdownMenuTrigger>
                                                                            <DropdownMenuContent align="end">
                                                                                {event.status ===
                                                                                    'scheduled' &&
                                                                                    isUpcoming(
                                                                                        event.date,
                                                                                    ) && (
                                                                                        <DropdownMenuItem
                                                                                            onClick={() =>
                                                                                                handleStatusChange(
                                                                                                    event,
                                                                                                    'ongoing',
                                                                                                )
                                                                                            }
                                                                                            disabled={updatingEvents.has(
                                                                                                event.id,
                                                                                            )}
                                                                                        >
                                                                                            {updatingEvents.has(
                                                                                                event.id,
                                                                                            ) ? (
                                                                                                <>
                                                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                                    Updating...
                                                                                                </>
                                                                                            ) : (
                                                                                                'Mark as Ongoing'
                                                                                            )}
                                                                                        </DropdownMenuItem>
                                                                                    )}
                                                                                {(event.status ===
                                                                                    'ongoing' ||
                                                                                    isPast(
                                                                                        event.date,
                                                                                    )) && (
                                                                                    <DropdownMenuItem
                                                                                        onClick={() =>
                                                                                            handleStatusChange(
                                                                                                event,
                                                                                                'completed',
                                                                                            )
                                                                                        }
                                                                                        disabled={updatingEvents.has(
                                                                                            event.id,
                                                                                        )}
                                                                                    >
                                                                                        {updatingEvents.has(
                                                                                            event.id,
                                                                                        ) ? (
                                                                                            <>
                                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                                Updating...
                                                                                            </>
                                                                                        ) : (
                                                                                            'Mark as Completed'
                                                                                        )}
                                                                                    </DropdownMenuItem>
                                                                                )}
                                                                                {event.status !==
                                                                                    'cancelled' &&
                                                                                    event.status !==
                                                                                        'completed' && (
                                                                                        <DropdownMenuItem
                                                                                            onClick={() =>
                                                                                                handleStatusChange(
                                                                                                    event,
                                                                                                    'cancelled',
                                                                                                )
                                                                                            }
                                                                                            disabled={updatingEvents.has(
                                                                                                event.id,
                                                                                            )}
                                                                                        >
                                                                                            {updatingEvents.has(
                                                                                                event.id,
                                                                                            ) ? (
                                                                                                <>
                                                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                                    Updating...
                                                                                                </>
                                                                                            ) : (
                                                                                                'Cancel Event'
                                                                                            )}
                                                                                        </DropdownMenuItem>
                                                                                    )}
                                                                                <DropdownMenuSeparator />
                                                                                <DropdownMenuItem
                                                                                    onClick={() =>
                                                                                        router.visit(
                                                                                            show(
                                                                                                event.id,
                                                                                            ),
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    View
                                                                                    Details
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuSeparator />
                                                                                <DropdownMenuItem
                                                                                    onClick={() =>
                                                                                        handleDelete(
                                                                                            event,
                                                                                        )
                                                                                    }
                                                                                    className="text-red-600 focus:text-red-600"
                                                                                    disabled={deletingEvents.has(
                                                                                        event.id,
                                                                                    )}
                                                                                >
                                                                                    {deletingEvents.has(
                                                                                        event.id,
                                                                                    ) ? (
                                                                                        <>
                                                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                            Deleting...
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                                            Delete
                                                                                        </>
                                                                                    )}
                                                                                </DropdownMenuItem>
                                                                            </DropdownMenuContent>
                                                                        </DropdownMenu>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={8}
                                                        className="h-96"
                                                    >
                                                        <Empty>
                                                            <EmptyHeader>
                                                                <EmptyMedia variant="icon">
                                                                    <Calendar className="h-6 w-6" />
                                                                </EmptyMedia>
                                                                <EmptyTitle>
                                                                    {searchQuery ||
                                                                    selectedCategory !==
                                                                        'all' ||
                                                                    selectedStatus !==
                                                                        'all' ||
                                                                    selectedMonth !==
                                                                        'all'
                                                                        ? 'No events found'
                                                                        : 'No events yet'}
                                                                </EmptyTitle>
                                                                <EmptyDescription>
                                                                    {searchQuery ||
                                                                    selectedCategory !==
                                                                        'all' ||
                                                                    selectedStatus !==
                                                                        'all' ||
                                                                    selectedMonth !==
                                                                        'all'
                                                                        ? 'Try adjusting your search filters to see more results.'
                                                                        : 'Get started by creating your first event to keep everyone informed about upcoming activities.'}
                                                                </EmptyDescription>
                                                            </EmptyHeader>
                                                            {canManage && (
                                                                <EmptyContent>
                                                                    <Button
                                                                        onClick={() =>
                                                                            router.visit(
                                                                                create(),
                                                                            )
                                                                        }
                                                                    >
                                                                        <Plus className="mr-2 h-4 w-4" />
                                                                        Create
                                                                        Event
                                                                    </Button>
                                                                </EmptyContent>
                                                            )}
                                                        </Empty>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {events &&
                    typeof events === 'object' &&
                    'current_page' in events &&
                    events.last_page > 1 && (
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-center text-sm text-muted-foreground sm:text-left">
                                        Showing{' '}
                                        {(events.current_page - 1) *
                                            events.per_page +
                                            1}{' '}
                                        to{' '}
                                        {Math.min(
                                            events.current_page *
                                                events.per_page,
                                            events.total,
                                        )}{' '}
                                        of {events.total} events
                                    </div>
                                    <div
                                        className="flex items-center justify-center gap-2"
                                        data-pagination
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    index({
                                                        query: {
                                                            ...safeFilters,
                                                            page:
                                                                events.current_page -
                                                                1,
                                                        },
                                                    }),
                                                )
                                            }
                                            disabled={events.current_page <= 1}
                                            className="flex-shrink-0"
                                        >
                                            <span className="hidden sm:inline">
                                                Previous
                                            </span>
                                            <span className="sm:hidden">
                                                Prev
                                            </span>
                                        </Button>

                                        <div className="flex items-center gap-1 overflow-x-auto">
                                            {Array.from(
                                                {
                                                    length: Math.min(
                                                        5,
                                                        events.last_page,
                                                    ),
                                                },
                                                (_, i) => {
                                                    const pageNum =
                                                        Math.max(
                                                            1,
                                                            Math.min(
                                                                events.last_page -
                                                                    4,
                                                                events.current_page -
                                                                    2,
                                                            ),
                                                        ) + i;
                                                    if (
                                                        pageNum >
                                                        events.last_page
                                                    )
                                                        return null;
                                                    return (
                                                        <Button
                                                            key={pageNum}
                                                            variant={
                                                                pageNum ===
                                                                events.current_page
                                                                    ? 'default'
                                                                    : 'outline'
                                                            }
                                                            size="sm"
                                                            onClick={() =>
                                                                router.get(
                                                                    index({
                                                                        query: {
                                                                            ...safeFilters,
                                                                            page: pageNum,
                                                                        },
                                                                    }),
                                                                )
                                                            }
                                                            className="min-w-[40px] flex-shrink-0"
                                                        >
                                                            {pageNum}
                                                        </Button>
                                                    );
                                                },
                                            )}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    index({
                                                        query: {
                                                            ...safeFilters,
                                                            page:
                                                                events.current_page +
                                                                1,
                                                        },
                                                    }),
                                                )
                                            }
                                            disabled={
                                                events.current_page >=
                                                events.last_page
                                            }
                                            className="flex-shrink-0"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                {/* Filter Error Display */}
                {filterError && (
                    <div className="px-6 pb-4">
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            {filterError}
                        </div>
                    </div>
                )}
            </div>

            {/* Alert Dialog */}
            <AlertDialog
                open={alertDialogOpen}
                onOpenChange={setAlertDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {alertDialogConfig?.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertDialogConfig?.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel data-alert-dialog-cancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                alertDialogConfig?.action();
                                setAlertDialogOpen(false);
                            }}
                            className={
                                alertDialogConfig?.variant === 'destructive'
                                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                    : ''
                            }
                        >
                            {alertDialogConfig?.actionLabel}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
