import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import CalendarWidget from '@/components/usg/calendar-widget';
import EventCard from '@/components/usg/event-card';
import FilterCard from '@/components/usg/filter-card';
import USGLayout from '@/layouts/usg-layout';
import usg from '@/routes/usg';
import { Head, router } from '@inertiajs/react';
import { Calendar as CalendarIcon, Filter, Grid, List, Tag, X } from 'lucide-react';
import { useState } from 'react';

interface Event {
    id: number;
    title: string;
    description: string;
    slug?: string;
    event_date: string;
    event_time: string;
    location: string;
    organizer: string;
    max_participants: number | null;
    current_participants?: number;
    registration_deadline: string | null;
    image_path: string | null;
    status: 'draft' | 'published' | 'cancelled' | 'archived';
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

export default function EventsCalendar({ events, categories }: Props) {
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
        if (event.slug) {
            router.visit(usg.events.show.url({ event: event.slug }));
        }
    };

    return (
        <USGLayout>
            <Head title="Events Calendar - USG Portal" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[var(--usg-primary)] via-[var(--usg-primary)] to-[var(--usg-dark)] py-20 text-white">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            Events Calendar
                        </h1>
                        <p className="mb-8 text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Discover and participate in USG events, activities, and programs. 
                            Choose between calendar and list views.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            <Button
                                variant={viewMode === 'calendar' ? 'secondary' : 'outline'}
                                size="lg"
                                onClick={() => setViewMode('calendar')}
                                className={
                                    viewMode === 'calendar'
                                        ? 'bg-white text-[var(--usg-primary)] hover:bg-[var(--usg-light)]'
                                        : 'border-white text-white hover:bg-white/10'
                                }
                            >
                                <CalendarIcon className="mr-2 h-5 w-5" />
                                Calendar View
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'secondary' : 'outline'}
                                size="lg"
                                onClick={() => setViewMode('list')}
                                className={
                                    viewMode === 'list'
                                        ? 'bg-white text-[var(--usg-primary)] hover:bg-[var(--usg-light)]'
                                        : 'border-white text-white hover:bg-white/10'
                                }
                            >
                                <List className="mr-2 h-5 w-5" />
                                List View
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Filters Section */}
                    <div className="mb-8">
                        <FilterCard
                            title="Filter Events"
                            description="Filter events by category and status"
                            hasActiveFilters={
                                !!(
                                    activeFilters.categories?.length ||
                                    activeFilters.statuses?.length
                                )
                            }
                            onClearFilters={() => setActiveFilters({})}
                            filters={[
                                ...(categories.length > 0
                                    ? [
                                          {
                                              label: 'Category',
                                              icon: <Tag className="h-4 w-4" />,
                                              value: activeFilters.categories?.[0],
                                              placeholder: `All Categories (${categories.length})`,
                                              options: categories,
                                              onChange: (value: string | undefined) => {
                                                  setActiveFilters({
                                                      ...activeFilters,
                                                      categories: value ? [value] : [],
                                                  });
                                              },
                                          },
                                      ]
                                    : []),
                                {
                                    label: 'Status',
                                    icon: <Filter className="h-4 w-4" />,
                                    value: activeFilters.statuses?.[0],
                                    placeholder: 'All Statuses',
                                    options: [
                                        { value: 'published', label: 'Published' },
                                        { value: 'cancelled', label: 'Cancelled' },
                                        { value: 'archived', label: 'Archived' },
                                    ],
                                    onChange: (value: string | undefined) => {
                                        setActiveFilters({
                                            ...activeFilters,
                                            statuses: value ? [value] : [],
                                        });
                                    },
                                },
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Calendar/List View */}
                        <div className="lg:col-span-2">
                            {viewMode === 'calendar' ? (
                                <Card className="bg-white dark:bg-gray-900">
                                    <CardHeader>
                                        <CardTitle>Calendar View</CardTitle>
                                        <CardDescription>
                                            Select a date to view events
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
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
                                                if (fullEvent) handleEventClick(fullEvent);
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="bg-white dark:bg-gray-900">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>
                                                    All Events ({filteredEvents.length})
                                                </CardTitle>
                                                <CardDescription>
                                                    Browse all events in list format
                                                </CardDescription>
                                            </div>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    router.visit(usg.events.index.url())
                                                }
                                            >
                                                <Grid className="mr-2 h-4 w-4" />
                                                Grid View
                                            </Button>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        {filteredEvents.length === 0 ? (
                                            <div className="py-12 text-center">
                                                <CalendarIcon className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                                    No events found
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Try adjusting your search or filter
                                                    criteria.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {filteredEvents
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
                                                        />
                                                    ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Selected Date Events */}
                            {selectedDate && selectedDateEvents.length > 0 && (
                                <Card className="bg-white dark:bg-gray-900">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Events on{' '}
                                            {selectedDate.toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {selectedDateEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                                                    onClick={() =>
                                                        handleEventClick(event)
                                                    }
                                                >
                                                    <div className="line-clamp-2 font-medium text-gray-900 dark:text-white">
                                                        {event.title}
                                                    </div>
                                                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
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
                            <Card className="bg-white dark:bg-gray-900">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Upcoming Events
                                    </CardTitle>
                                    <CardDescription>
                                        Next {upcomingEvents.length} events
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {upcomingEvents.length === 0 ? (
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            No upcoming events scheduled.
                                        </p>
                                    ) : (
                                        <div className="space-y-3">
                                            {upcomingEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                                                    onClick={() =>
                                                        handleEventClick(event)
                                                    }
                                                >
                                                    <div className="line-clamp-2 font-medium text-gray-900 dark:text-white">
                                                        {event.title}
                                                    </div>
                                                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                        {new Date(
                                                            event.event_date,
                                                        ).toLocaleDateString()}{' '}
                                                        at {event.event_time}
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
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
                                    )}
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="bg-white dark:bg-gray-900">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Quick Actions
                                    </CardTitle>
                                    <CardDescription>
                                        Navigate and manage filters
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start"
                                        onClick={() => router.visit(usg.events.index.url())}
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
                                        <X className="mr-2 h-4 w-4" />
                                        Clear All Filters
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </USGLayout>
    );
}
