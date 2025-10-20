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
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {
    Calendar,
    CalendarDays,
    Clock,
    Edit,
    Eye,
    MapPin,
    MoreVertical,
    Plus,
    Trash2,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    end_time?: string;
    location: string;
    category: string;
    max_attendees?: number;
    registration_required: boolean;
    registration_deadline?: string;
    status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    organizer: string;
    created_at: string;
    updated_at: string;
    attendees_count?: number;
}

interface Props {
    events?: Event[] | { data: Event[] }; // Make it optional and handle different data structures
    filters?: {
        search?: string;
        category?: string;
        status?: string;
        month?: string;
    };
    categories?: string[];
    canManage?: boolean;
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
        safeFilters.category || '',
    );
    const [selectedStatus, setSelectedStatus] = useState(
        safeFilters.status || '',
    );
    const [selectedMonth, setSelectedMonth] = useState(safeFilters.month || '');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyFilters({ search: query });
    };

    const handleCategoryFilter = (category: string) => {
        setSelectedCategory(category);
        applyFilters({ category });
    };

    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status);
        applyFilters({ status });
    };

    const handleMonthFilter = (month: string) => {
        setSelectedMonth(month);
        applyFilters({ month });
    };

    const applyFilters = (newFilters: Partial<typeof filters>) => {
        router.get(
            '/usg/admin/events',
            {
                search: searchQuery,
                category: selectedCategory,
                status: selectedStatus,
                month: selectedMonth,
                ...newFilters,
            },
            { preserveState: true },
        );
    };

    const handleDelete = (event: Event) => {
        if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
            router.delete(`/usg/admin/events/${event.id}`);
        }
    };

    const handleStatusChange = (event: Event, newStatus: string) => {
        router.patch(`/usg/admin/events/${event.id}/status`, {
            status: newStatus,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
            'en-US',
            {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            },
        );
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

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) > new Date();
    };

    const isPast = (dateString: string) => {
        return new Date(dateString) < new Date();
    };

    const getStatsData = () => {
        const upcoming = safeEvents.filter((e) => isUpcoming(e.date));
        const past = safeEvents.filter((e) => isPast(e.date));

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

        const months = [{ value: '', label: 'All Months' }];
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

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header with action buttons */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Events Management
                        </h1>
                        <p className="text-muted-foreground">
                            Create, edit and manage USG events and activities
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => router.visit('/usg/events/calendar')}
                        >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            Calendar View
                        </Button>

                        {canManage && (
                            <Button
                                onClick={() =>
                                    router.visit('/usg/admin/events/create')
                                }
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                New Event
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {stats.total}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Total Events
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
                                        <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {stats.upcoming}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Upcoming
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                                        <Eye className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {stats.past}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Completed
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900">
                                        <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {stats.cancelled}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Cancelled
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
                                        placeholder="Search events by title, description, or location..."
                                        value={searchQuery}
                                        onChange={(query) => {
                                            setSearchQuery(query);
                                            handleSearch(query);
                                        }}
                                    />
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
                                        value={selectedStatus}
                                        onChange={(e) =>
                                            handleStatusFilter(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    >
                                        <option value="">All Status</option>
                                        <option value="scheduled">
                                            Scheduled
                                        </option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) =>
                                            handleMonthFilter(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    >
                                        {getMonthOptions().map((month) => (
                                            <option
                                                key={month.value}
                                                value={month.value}
                                            >
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Events List */}
                    <div className="space-y-4">
                        {safeEvents.length > 0 ? (
                            safeEvents.map((event) => (
                                <Card
                                    key={event.id}
                                    className="transition-shadow hover:shadow-lg"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                                                        {event.title}
                                                    </h3>
                                                    <Badge
                                                        variant="secondary"
                                                        className={getStatusColor(
                                                            event.status,
                                                        )}
                                                    >
                                                        {event.status.toUpperCase()}
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        {event.category}
                                                    </Badge>
                                                    {event.registration_required && (
                                                        <Badge variant="secondary">
                                                            Registration
                                                            Required
                                                        </Badge>
                                                    )}
                                                </div>

                                                <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                                                    {event.description}
                                                </p>

                                                <div className="grid grid-cols-1 gap-4 text-sm text-gray-500 md:grid-cols-2 lg:grid-cols-4 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(event.date)}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {formatTime(event.time)}
                                                        {event.end_time &&
                                                            ` - ${formatTime(event.end_time)}`}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {event.location}
                                                    </div>
                                                    {event.max_attendees && (
                                                        <div className="flex items-center gap-1">
                                                            <Users className="h-4 w-4" />
                                                            {event.attendees_count ||
                                                                0}
                                                            /
                                                            {
                                                                event.max_attendees
                                                            }{' '}
                                                            attendees
                                                        </div>
                                                    )}
                                                </div>

                                                {event.registration_deadline &&
                                                    isUpcoming(
                                                        event.registration_deadline,
                                                    ) && (
                                                        <div className="mt-2 text-sm text-orange-600 dark:text-orange-400">
                                                            Registration
                                                            deadline:{' '}
                                                            {formatDate(
                                                                event.registration_deadline,
                                                            )}
                                                        </div>
                                                    )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/usg/events/${event.id}`,
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
                                                                    `/usg/admin/events/${event.id}/edit`,
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
                                                                        >
                                                                            Mark
                                                                            as
                                                                            Ongoing
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
                                                                    >
                                                                        Mark as
                                                                        Completed
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
                                                                        >
                                                                            Cancel
                                                                            Event
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            `/usg/admin/events/${event.id}/attendees`,
                                                                        )
                                                                    }
                                                                >
                                                                    View
                                                                    Attendees
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            event,
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
                                    <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                        No events found
                                    </h3>
                                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                                        {searchQuery ||
                                        selectedCategory ||
                                        selectedStatus ||
                                        selectedMonth
                                            ? 'Try adjusting your search filters'
                                            : 'Get started by creating your first event'}
                                    </p>
                                    {canManage && (
                                        <Button
                                            onClick={() =>
                                                router.visit(
                                                    '/usg/admin/events/create',
                                                )
                                            }
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Event
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
        </AppLayout>
    );
}
