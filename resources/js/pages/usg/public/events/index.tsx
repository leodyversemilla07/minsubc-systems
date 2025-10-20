import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EventCard from '@/components/usg/event-card';
import SearchBar from '@/components/usg/search-bar';
import PublicLayout from '@/layouts/public-layout';
import { Head, router } from '@inertiajs/react';
import {
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    PartyPopper,
    Search,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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
        <PublicLayout>
            <Head title="Events - USG Portal" />

            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Animated background elements */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-purple-400/10"></div>
                    <div className="animation-delay-1000 absolute top-1/2 -left-40 h-96 w-96 animate-pulse rounded-full bg-pink-400/10"></div>
                    <div className="animation-delay-2000 absolute right-1/4 bottom-20 h-60 w-60 animate-pulse rounded-full bg-indigo-400/10"></div>
                </div>

                {/* Animated Header */}
                <div
                    className={`relative border-b bg-gradient-to-r from-white/80 to-purple-50/80 backdrop-blur-sm dark:from-gray-800/80 dark:to-gray-900/80 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000`}
                >
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6">
                                <div className="mb-4 inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                                    <PartyPopper className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="mb-4 flex items-center justify-center gap-3">
                                <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                                    Upcoming Events
                                </h1>
                            </div>
                            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
                                Join us for exciting events, workshops, and
                                activities organized by the University Student
                                Government. Make memories and connect with your
                                community!
                            </p>

                            {/* Stats */}
                            <div
                                className={`mt-8 flex transform justify-center gap-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: '200ms' }}
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">
                                        {events.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total Events
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-pink-600">
                                        {upcomingEvents.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Upcoming
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Enhanced Search and Filters */}
                    <div
                        className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <div className="group relative">
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
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {filteredEvents.length} Event
                                {filteredEvents.length !== 1 ? 's' : ''}
                            </h2>
                            <div className="flex gap-2">
                                <Badge
                                    variant="default"
                                    className="bg-blue-100 text-blue-700"
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
                                        className="border-red-200 text-red-700"
                                    >
                                        {cancelledEvents.length} Cancelled
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredEvents.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Search className="mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    No events found
                                </h3>
                                <p className="max-w-md text-center text-gray-600 dark:text-gray-300">
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
                                        className="mt-4"
                                    >
                                        Clear search and filters
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
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
                        <div className="mt-12 text-center">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        Stay Connected
                                    </h3>
                                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                                        Don't miss out on exciting events.
                                        Subscribe to our newsletter or follow us
                                        on social media for updates.
                                    </p>
                                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                        <Button
                                            onClick={() =>
                                                router.visit(
                                                    '/usg/events/calendar',
                                                )
                                            }
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            View Calendar
                                        </Button>
                                        <Button variant="outline">
                                            Subscribe to Updates
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
