import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import CalendarWidget from '@/components/usg/calendar-widget';
import EventCard from '@/components/usg/event-card';
import FilterCard from '@/components/usg/filter-card';
import USGLayout from '@/layouts/usg-layout';
import usg from '@/routes/usg';
import { Head, router } from '@inertiajs/react';
import {
    Calendar as CalendarIcon,
    Clock,
    ExternalLink,
    FileText,
    MapPin,
    Tag,
} from 'lucide-react';
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
    created_at: string;
}

interface Props {
    events: Event[];
    categories?: string[];
    featured_events?: Event[];
}

export default function EventsIndex({
    events,
    categories = [],
    featured_events = [],
}: Props) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [activeFilters, setActiveFilters] = useState<{
        categories?: string[];
        statuses?: string[];
        dateRange?: string;
    }>({});

    const filteredEvents = events.filter((event) => {
        // Category filter
        const matchesCategory =
            !activeFilters.categories?.length ||
            (event.category &&
                activeFilters.categories.includes(event.category));

        // Status filter
        const matchesStatus =
            !activeFilters.statuses?.length ||
            activeFilters.statuses.includes(event.status);

        // Date range filter
        const matchesDateRange =
            !activeFilters.dateRange ||
            filterByDateRange(event, activeFilters.dateRange);

        return (
            matchesCategory &&
            matchesStatus &&
            matchesDateRange
        );
    });

    const filterByDateRange = (event: Event, range: string) => {
        const eventDate = new Date(event.event_date);
        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
        );
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const nextMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate(),
        );

        switch (range) {
            case 'Today':
                return eventDate.toDateString() === today.toDateString();
            case 'Tomorrow':
                return eventDate.toDateString() === tomorrow.toDateString();
            case 'This Week':
                return eventDate >= today && eventDate <= nextWeek;
            case 'This Month':
                return eventDate >= today && eventDate <= nextMonth;
            case 'Upcoming':
                return eventDate >= today;
            case 'Past':
                return eventDate < today;
            default:
                return true;
        }
    };

    // Separate events by status and timing
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
        );

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
            <Head title="Events - USG Portal" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[var(--usg-primary)] via-[var(--usg-primary)] to-[var(--usg-dark)] py-12 sm:py-16 md:py-20 text-white">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full bg-white blur-3xl"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                            USG Events
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--usg-hero-text)] px-4">
                            Join us for exciting events, workshops, and
                            activities organized by the University Student
                            Government
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-8 sm:py-12 md:py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* Filters Section */}
                    <div className="mb-6 sm:mb-8">
                        <FilterCard
                            title="Filter Events"
                            description="Filter events by category, status, and date range"
                            hasActiveFilters={Object.values(activeFilters).some((f) => f?.length || f)}
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
                                    icon: <FileText className="h-4 w-4" />,
                                    value: activeFilters.statuses?.[0],
                                    placeholder: 'All Statuses',
                                    options: [
                                        { value: 'published', label: 'Published' },
                                        { value: 'draft', label: 'Draft' },
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
                                {
                                    label: 'Date Range',
                                    icon: <CalendarIcon className="h-4 w-4" />,
                                    value: activeFilters.dateRange,
                                    placeholder: 'All Dates',
                                    options: [
                                        'Today',
                                        'Tomorrow',
                                        'This Week',
                                        'This Month',
                                        'Upcoming',
                                        'Past',
                                    ],
                                    onChange: (value: string | undefined) => {
                                        setActiveFilters({
                                            ...activeFilters,
                                            dateRange: value || undefined,
                                        });
                                    },
                                },
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
                        {/* Calendar - Main Content */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <CalendarWidget
                                events={filteredEvents.map((event) => ({
                                    id: event.id,
                                    title: event.title,
                                    event_date: event.event_date,
                                    event_time: event.event_time,
                                    status: event.status,
                                    category: event.category,
                                }))}
                                onDateSelect={handleDateSelect}
                                onEventClick={(calendarEvent) => {
                                    const fullEvent = filteredEvents.find(
                                        (e) => e.id === calendarEvent.id,
                                    );
                                    if (fullEvent) handleEventClick(fullEvent);
                                }}
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                            {/* Featured Events */}
                            {featured_events.length > 0 &&
                                Object.keys(activeFilters).length === 0 && (
                                    <div>
                                        <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                                            Featured Events
                                        </h3>
                                        <div className="space-y-3 sm:space-y-4">
                                            {featured_events.slice(0, 3).map((event) => (
                                                <EventCard key={event.id} event={event} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                            {/* Upcoming Events */}
                            <div>
                                <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                                    Upcoming Events
                                </h3>
                                {upcomingEvents.length === 0 ? (
                                    <Card className="bg-white dark:bg-gray-900">
                                        <CardContent className="py-6 sm:py-8 text-center">
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                No upcoming events scheduled.
                                            </p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="space-y-3 sm:space-y-4">
                                        {upcomingEvents.slice(0, 5).map((event) => (
                                            <EventCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Selected Date Events */}
                            {selectedDate && selectedDateEvents.length > 0 && (
                                <Card className="bg-white dark:bg-gray-900">
                                    <CardHeader className="pb-3 sm:pb-4">
                                        <CardTitle className="text-sm sm:text-base md:text-lg">
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
                                        <div className="space-y-3 sm:space-y-4">
                                            {selectedDateEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="cursor-pointer rounded-xl border border-[var(--usg-primary)] bg-gradient-to-br from-[var(--usg-light)] to-white p-3 sm:p-4 transition-all hover:shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                                                    onClick={() => handleEventClick(event)}
                                                >
                                                    {event.image_path && (
                                                        <img
                                                            src={event.image_path}
                                                            alt={event.title}
                                                            className="mb-2 sm:mb-3 h-20 sm:h-24 w-full rounded-lg object-cover"
                                                        />
                                                    )}
                                                    <div className="line-clamp-2 text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                                                        {event.title}
                                                    </div>
                                                    <div className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3 flex-shrink-0" />
                                                            <span className="truncate">{event.event_time}</span>
                                                        </div>
                                                        <div className="mt-1 flex items-center gap-1">
                                                            <MapPin className="h-3 w-3 flex-shrink-0" />
                                                            <span className="truncate">{event.location}</span>
                                                        </div>
                                                    </div>
                                                    {event.category && (
                                                        <Badge
                                                            variant="default"
                                                            className="mt-2 bg-[var(--usg-primary)] text-xs"
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
                        </div>
                    </div>

                </div>
            </section>

            {/* Call to Action */}
            {upcomingEvents.length > 0 && (
                <section className="bg-[var(--usg-primary)] py-12 sm:py-16 md:py-20 text-white">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold">
                                Stay Connected
                            </h2>
                            <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-[var(--usg-hero-text)] px-4">
                                Don't miss out on exciting events. Subscribe to our newsletter or follow us on social media for updates.
                            </p>
                            <div className="flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row px-4">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full sm:w-auto border-0 bg-white text-[var(--usg-primary)] hover:bg-[var(--usg-light)]"
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Subscribe to Updates
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </USGLayout>
    );
}
