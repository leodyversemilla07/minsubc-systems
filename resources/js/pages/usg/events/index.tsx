import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/usg/event-card';
import SearchBar from '@/components/usg/search-bar';
import USGLayout from '@/layouts/usg-layout';
import { Head, router } from '@inertiajs/react';
import {
    Calendar as CalendarIcon,
    Clock,
    ExternalLink,
    MapPin,
    Search,
    Users,
} from 'lucide-react';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<{
        categories?: string[];
        statuses?: string[];
        dateRange?: string;
    }>({});

    const filteredEvents = events.filter((event) => {
        // Search filter
        const matchesSearch =
            searchQuery === '' ||
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchQuery.toLowerCase());

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
            matchesSearch &&
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

    const pastEvents = filteredEvents
        .filter((event) => {
            const eventDate = new Date(event.event_date);
            const now = new Date();
            return eventDate < now || event.status === 'completed';
        })
        .sort(
            (a, b) =>
                new Date(b.event_date).getTime() -
                new Date(a.event_date).getTime(),
        );

    const draftEvents = filteredEvents.filter(
        (event) => event.status === 'draft',
    );
    const cancelledEvents = filteredEvents.filter(
        (event) => event.status === 'cancelled',
    );

    return (
        <USGLayout>
            <Head title="Events - USG Portal" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[var(--usg-primary)] py-20 text-white">
                <div className="relative container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            USG Events
                        </h1>
                        <p className="text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Join us for exciting events, workshops, and
                            activities organized by the University Student
                            Government
                        </p>
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={() => router.visit('/usg/events/calendar')}
                            className="bg-white text-[var(--usg-primary)] hover:bg-gray-100"
                        >
                            <CalendarIcon className="mr-2 h-5 w-5" />
                            View Calendar
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                        <div>
                            <div className="mb-2 text-3xl font-bold text-[var(--usg-primary)] md:text-4xl">
                                {events.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Events
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-3xl font-bold text-[var(--usg-secondary)] md:text-4xl">
                                {upcomingEvents.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Upcoming
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-3xl font-bold text-[var(--usg-accent)] md:text-4xl">
                                {pastEvents.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Past Events
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 inline-block rounded bg-[var(--usg-text)] px-2 py-1 text-3xl font-bold text-[var(--usg-neutral)] md:text-4xl">
                                {categories.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Categories
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Search and Filters */}
                    <div className="mb-12">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search events by title, description, location, or organizer..."
                            showFilters
                            filters={{
                                categories: categories,
                                statuses: [
                                    'published',
                                    'draft',
                                    'cancelled',
                                    'completed',
                                ],
                                dateRanges: [
                                    'Today',
                                    'Tomorrow',
                                    'This Week',
                                    'This Month',
                                    'Upcoming',
                                    'Past',
                                ],
                            }}
                            activeFilters={{
                                categories: activeFilters.categories,
                                statuses: activeFilters.statuses,
                                dateRange: activeFilters.dateRange,
                            }}
                            onFiltersChange={(filters) => {
                                setActiveFilters({
                                    categories: filters.categories,
                                    statuses: filters.statuses,
                                    dateRange: filters.dateRange,
                                });
                            }}
                        />
                    </div>

                    {/* Featured Events */}
                    {featured_events.length > 0 &&
                        !searchQuery &&
                        Object.keys(activeFilters).length === 0 && (
                            <div className="mb-12">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                                    Featured Events
                                </h2>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {featured_events
                                        .slice(0, 2)
                                        .map((event) => (
                                            <EventCard
                                                key={event.id}
                                                event={event}
                                                variant="full"
                                            />
                                        ))}
                                </div>
                            </div>
                        )}

                    {/* Results Summary */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {filteredEvents.length} Event
                            {filteredEvents.length !== 1 ? 's' : ''}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant="default"
                                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            >
                                {upcomingEvents.length} Upcoming
                            </Badge>
                            {pastEvents.length > 0 && (
                                <Badge variant="secondary">
                                    {pastEvents.length} Past
                                </Badge>
                            )}
                            {cancelledEvents.length > 0 && (
                                <Badge
                                    variant="outline"
                                    className="border-red-200 text-red-700 dark:border-red-800 dark:text-red-400"
                                >
                                    {cancelledEvents.length} Cancelled
                                </Badge>
                            )}
                        </div>
                    </div>

                    {filteredEvents.length === 0 ? (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm dark:bg-gray-900">
                            <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No events found
                            </h3>
                            <p className="mx-auto mb-6 max-w-md text-gray-600 dark:text-gray-400">
                                {searchQuery ||
                                Object.values(activeFilters).some(
                                    (f) => f?.length || f,
                                )
                                    ? "Try adjusting your search terms or filters to find what you're looking for."
                                    : 'No events are currently scheduled.'}
                            </p>
                            {(searchQuery ||
                                Object.values(activeFilters).some(
                                    (f) => f?.length || f,
                                )) && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setActiveFilters({});
                                    }}
                                >
                                    Clear search and filters
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Upcoming Events */}
                            {upcomingEvents.length > 0 && (
                                <div>
                                    <div className="mb-6 flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Upcoming Events
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {upcomingEvents.map((event) => (
                                            <EventCard
                                                key={event.id}
                                                event={event}
                                                variant="full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Past Events */}
                            {pastEvents.length > 0 && (
                                <div>
                                    <div className="mb-6 flex items-center gap-2">
                                        <CalendarIcon className="h-5 w-5 text-gray-600" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Past Events
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {pastEvents.slice(0, 6).map((event) => (
                                            <EventCard
                                                key={event.id}
                                                event={event}
                                                variant="compact"
                                                showActions={false}
                                            />
                                        ))}
                                    </div>
                                    {pastEvents.length > 6 && (
                                        <div className="mt-6 text-center">
                                            <Button variant="outline">
                                                Load More Past Events
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Draft Events (if user has access) */}
                            {draftEvents.length > 0 && (
                                <div>
                                    <div className="mb-6 flex items-center gap-2">
                                        <Users className="h-5 w-5 text-yellow-600" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Draft Events
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {draftEvents.map((event) => (
                                            <EventCard
                                                key={event.id}
                                                event={event}
                                                variant="full"
                                                showActions={false}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Cancelled Events */}
                            {cancelledEvents.length > 0 && (
                                <div>
                                    <div className="mb-6 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-red-600" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Cancelled Events
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {cancelledEvents.map((event) => (
                                            <EventCard
                                                key={event.id}
                                                event={event}
                                                variant="compact"
                                                showActions={false}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Quick Actions */}
                    {upcomingEvents.length > 0 && (
                        <div className="mt-12 rounded-lg bg-[var(--usg-primary)] p-12 text-center text-white shadow-lg">
                            <h3 className="mb-2 text-2xl font-bold">
                                Stay Connected
                            </h3>
                            <p className="mb-6 text-lg text-white/90">
                                Don't miss out on exciting events. Subscribe to
                                our newsletter or follow us on social media for
                                updates.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={() =>
                                        router.visit('/usg/events/calendar')
                                    }
                                    className="bg-white text-[var(--usg-primary)] hover:bg-gray-100"
                                >
                                    <CalendarIcon className="mr-2 h-5 w-5" />
                                    View Calendar
                                </Button>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                                >
                                    <ExternalLink className="mr-2 h-5 w-5" />
                                    Subscribe to Updates
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </USGLayout>
    );
}
