import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CalendarWidget from '@/components/usg/calendar-widget';
import EventCard from '@/components/usg/event-card';
import SearchBar from '@/components/usg/search-bar';
import { Head, router } from '@inertiajs/react';
import { Calendar as CalendarIcon, Filter, Grid, List } from 'lucide-react';
import { useState } from 'react';

interface Event {
    id: number;
    title: string;
    description: string;
    event_date: string;
    event_time: string;
    location: string;
    organizer: string;
    max_participants: number | null;
    current_participants?: number;
    registration_deadline: string | null;
    image_path: string | null;
    status: 'draft' | 'published' | 'cancelled' | 'completed';
    category?: string;
    color?: string;
    created_at: string;
}

interface Props {
    events: Event[];
    categories: string[];
    currentMonth?: string;
    currentYear?: number;
}

export default function EventsCalendar({
    events,
    categories,
    currentMonth,
    currentYear,
}: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [activeFilters, setActiveFilters] = useState<{
        categories?: string[];
        statuses?: string[];
    }>({});

    const filteredEvents = events.filter((event) => {
        // Search filter
        const matchesSearch =
            searchQuery === '' ||
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
            !activeFilters.categories?.length ||
            (event.category &&
                activeFilters.categories.includes(event.category));

        // Status filter
        const matchesStatus =
            !activeFilters.statuses?.length ||
            activeFilters.statuses.includes(event.status);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const upcomingEvents = filteredEvents
        .filter((event) => {
            const eventDate = new Date(event.event_date);
            const now = new Date();
            return eventDate >= now && event.status === 'published';
        })
        .sort(
            (a, b) =>
                new Date(a.event_date).getTime() -
                new Date(b.event_date).getTime(),
        )
        .slice(0, 5);

    const selectedDateEvents = selectedDate
        ? filteredEvents.filter((event) => {
              const eventDate = new Date(event.event_date);
              return eventDate.toDateString() === selectedDate.toDateString();
          })
        : [];

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleEventClick = (event: Event) => {
        router.visit(`/usg/events/${event.id}`);
    };

    const getEventsByMonth = () => {
        const eventsByMonth: { [key: string]: Event[] } = {};

        filteredEvents.forEach((event) => {
            const date = new Date(event.event_date);
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

            if (!eventsByMonth[monthKey]) {
                eventsByMonth[monthKey] = [];
            }

            eventsByMonth[monthKey].push(event);
        });

        return eventsByMonth;
    };

    return (
        <>
            <Head title="Events Calendar - USG Portal" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="border-b bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="mb-4 flex items-center gap-3">
                                    <CalendarIcon className="h-8 w-8 text-blue-600" />
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        Events Calendar
                                    </h1>
                                </div>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Discover and participate in USG events,
                                    activities, and programs.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant={
                                        viewMode === 'calendar'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    onClick={() => setViewMode('calendar')}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    Calendar
                                </Button>
                                <Button
                                    variant={
                                        viewMode === 'list'
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="mr-2 h-4 w-4" />
                                    List
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Search and Filters */}
                    <div className="mb-8">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search events by title, description, or location..."
                            showFilters
                            filters={{
                                categories: categories,
                                statuses: [
                                    'published',
                                    'cancelled',
                                    'completed',
                                ],
                            }}
                            activeFilters={{
                                categories: activeFilters.categories,
                                statuses: activeFilters.statuses,
                            }}
                            onFiltersChange={(filters) => {
                                setActiveFilters({
                                    categories: filters.categories,
                                    statuses: filters.statuses,
                                });
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Calendar/List View */}
                        <div className="lg:col-span-2">
                            {viewMode === 'calendar' ? (
                                <CalendarWidget
                                    events={filteredEvents.map((event) => ({
                                        id: event.id,
                                        title: event.title,
                                        event_date: event.event_date,
                                        event_time: event.event_time,
                                        status: event.status,
                                        category: event.category,
                                        color: event.color,
                                    }))}
                                    onDateSelect={handleDateSelect}
                                    onEventClick={(calendarEvent) => {
                                        const fullEvent = filteredEvents.find(
                                            (e) => e.id === calendarEvent.id,
                                        );
                                        if (fullEvent)
                                            handleEventClick(fullEvent);
                                    }}
                                />
                            ) : (
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="mb-6 flex items-center justify-between">
                                            <h2 className="text-xl font-semibold">
                                                All Events (
                                                {filteredEvents.length})
                                            </h2>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    router.visit('/usg/events')
                                                }
                                            >
                                                <Grid className="mr-2 h-4 w-4" />
                                                Grid View
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {filteredEvents.length === 0 ? (
                                                <div className="py-8 text-center">
                                                    <CalendarIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                                        No events found
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        Try adjusting your
                                                        search or filter
                                                        criteria.
                                                    </p>
                                                </div>
                                            ) : (
                                                filteredEvents
                                                    .sort(
                                                        (a, b) =>
                                                            new Date(
                                                                a.event_date,
                                                            ).getTime() -
                                                            new Date(
                                                                b.event_date,
                                                            ).getTime(),
                                                    )
                                                    .map((event) => (
                                                        <EventCard
                                                            key={event.id}
                                                            event={event}
                                                            variant="compact"
                                                        />
                                                    ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Selected Date Events */}
                            {selectedDate && selectedDateEvents.length > 0 && (
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-semibold">
                                            Events on{' '}
                                            {selectedDate.toLocaleDateString(
                                                'en-US',
                                                {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                },
                                            )}
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedDateEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                                                    onClick={() =>
                                                        handleEventClick(event)
                                                    }
                                                >
                                                    <div className="line-clamp-2 text-sm font-medium">
                                                        {event.title}
                                                    </div>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        {event.event_time} •{' '}
                                                        {event.location}
                                                    </div>
                                                    {event.category && (
                                                        <Badge
                                                            variant="outline"
                                                            className="mt-2 text-xs"
                                                        >
                                                            {event.category}
                                                        </Badge>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Upcoming Events */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 font-semibold">
                                        Upcoming Events
                                    </h3>
                                    <div className="space-y-3">
                                        {upcomingEvents.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">
                                                No upcoming events scheduled.
                                            </p>
                                        ) : (
                                            upcomingEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                                                    onClick={() =>
                                                        handleEventClick(event)
                                                    }
                                                >
                                                    <div className="line-clamp-2 text-sm font-medium">
                                                        {event.title}
                                                    </div>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        {new Date(
                                                            event.event_date,
                                                        ).toLocaleDateString()}{' '}
                                                        at {event.event_time}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {event.location}
                                                    </div>
                                                    {event.category && (
                                                        <Badge
                                                            variant="outline"
                                                            className="mt-2 text-xs"
                                                        >
                                                            {event.category}
                                                        </Badge>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Event Categories */}
                            {categories.length > 0 && (
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-semibold">
                                            Categories
                                        </h3>
                                        <div className="space-y-2">
                                            {categories.map((category) => {
                                                const categoryCount =
                                                    filteredEvents.filter(
                                                        (event) =>
                                                            event.category ===
                                                            category,
                                                    ).length;

                                                return (
                                                    <div
                                                        key={category}
                                                        className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                        onClick={() => {
                                                            const currentCategories =
                                                                activeFilters.categories ||
                                                                [];
                                                            const newCategories =
                                                                currentCategories.includes(
                                                                    category,
                                                                )
                                                                    ? currentCategories.filter(
                                                                          (c) =>
                                                                              c !==
                                                                              category,
                                                                      )
                                                                    : [
                                                                          ...currentCategories,
                                                                          category,
                                                                      ];
                                                            setActiveFilters({
                                                                ...activeFilters,
                                                                categories:
                                                                    newCategories,
                                                            });
                                                        }}
                                                    >
                                                        <span className="text-sm">
                                                            {category}
                                                        </span>
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {categoryCount}
                                                        </Badge>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Quick Actions */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 font-semibold">
                                        Quick Actions
                                    </h3>
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start"
                                            onClick={() =>
                                                router.visit('/usg/events')
                                            }
                                        >
                                            <Grid className="mr-2 h-4 w-4" />
                                            Browse All Events
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start"
                                            onClick={() => {
                                                setSearchQuery('');
                                                setActiveFilters({});
                                                setSelectedDate(null);
                                            }}
                                        >
                                            <Filter className="mr-2 h-4 w-4" />
                                            Clear All Filters
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
