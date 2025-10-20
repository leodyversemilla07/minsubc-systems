import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnnouncementCard from '@/components/usg/announcement-card';
import PriorityBadge from '@/components/usg/priority-badge';
import SearchBar from '@/components/usg/search-bar';
import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, Filter, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Announcement {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    priority: 'low' | 'medium' | 'high';
    publish_date: string;
    views_count?: number;
    featured_image?: string;
    category?: string;
    status?: 'draft' | 'published' | 'archived';
}

interface Props {
    announcements: {
        data: Announcement[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories?: string[];
}

export default function AnnouncementsIndex({
    announcements,
    categories = [],
}: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [activeFilters, setActiveFilters] = useState<{
        categories?: string[];
        priorities?: string[];
        statuses?: string[];
    }>({});

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const filteredAnnouncements = announcements.data.filter((announcement) => {
        // Search filter
        const matchesSearch =
            searchQuery === '' ||
            announcement.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            announcement.excerpt
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
            !activeFilters.categories?.length ||
            (announcement.category &&
                activeFilters.categories.includes(announcement.category));

        // Priority filter
        const matchesPriority =
            !activeFilters.priorities?.length ||
            activeFilters.priorities.includes(announcement.priority);

        // Status filter
        const matchesStatus =
            !activeFilters.statuses?.length ||
            (announcement.status &&
                activeFilters.statuses.includes(announcement.status));

        return (
            matchesSearch && matchesCategory && matchesPriority && matchesStatus
        );
    });

    // Separate by status - show all as published for public view
    const publishedAnnouncements = filteredAnnouncements.sort((a, b) => {
        // Sort by priority first (high > medium > low)
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff =
            priorityOrder[b.priority] - priorityOrder[a.priority];

        if (priorityDiff !== 0) return priorityDiff;

        // Then by published date (newest first)
        const dateA = new Date(a.publish_date).getTime();
        const dateB = new Date(b.publish_date).getTime();
        return dateB - dateA;
    });

    const draftAnnouncements = filteredAnnouncements.filter(
        (announcement) => announcement.status === 'draft',
    );
    const archivedAnnouncements = filteredAnnouncements.filter(
        (announcement) => announcement.status === 'archived',
    );

    return (
        <PublicLayout>
            <Head title="Announcements - USG Portal" />

            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Animated background elements */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-orange-400/10"></div>
                    <div className="animation-delay-1000 absolute top-1/2 -left-40 h-96 w-96 animate-pulse rounded-full bg-red-400/10"></div>
                    <div className="animation-delay-2000 absolute right-1/4 bottom-20 h-60 w-60 animate-pulse rounded-full bg-yellow-400/10"></div>
                </div>

                {/* Animated Header */}
                <div
                    className={`relative border-b bg-gradient-to-r from-white/80 to-orange-50/80 backdrop-blur-sm dark:from-gray-800/80 dark:to-gray-900/80 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000`}
                >
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6">
                                <div className="mb-4 inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-4">
                                    <Bell className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="mb-4 flex items-center justify-center gap-3">
                                <h1 className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                                    Latest Announcements
                                </h1>
                            </div>
                            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
                                Stay updated with the latest news, events, and
                                important information from the University
                                Student Government. Never miss an important
                                update!
                            </p>

                            {/* Stats */}
                            <div
                                className={`mt-8 flex transform justify-center gap-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: '200ms' }}
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-orange-600">
                                        {announcements.total}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total Announcements
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-red-600">
                                        {publishedAnnouncements.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Published
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Animated Search and Filters */}
                    <div
                        className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <div className="group relative">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search announcements by title, content, or tags..."
                                showFilters
                                filters={{
                                    categories: categories,
                                    statuses: [
                                        'published',
                                        'draft',
                                        'archived',
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
                                        priorities: activeFilters.priorities,
                                    });
                                }}
                            />

                            {/* Enhanced Priority Filters */}
                            <div className="mt-6 rounded-xl border border-orange-200/50 bg-white/50 p-4 backdrop-blur-sm dark:bg-gray-800/50">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-orange-500" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Filter by priority:
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        {['high', 'medium', 'low'].map(
                                            (priority) => (
                                                <Badge
                                                    key={priority}
                                                    variant={
                                                        activeFilters.priorities?.includes(
                                                            priority,
                                                        )
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                                    onClick={() => {
                                                        const currentPriorities =
                                                            activeFilters.priorities ||
                                                            [];
                                                        const newPriorities =
                                                            currentPriorities.includes(
                                                                priority,
                                                            )
                                                                ? currentPriorities.filter(
                                                                      (p) =>
                                                                          p !==
                                                                          priority,
                                                                  )
                                                                : [
                                                                      ...currentPriorities,
                                                                      priority,
                                                                  ];
                                                        setActiveFilters({
                                                            ...activeFilters,
                                                            priorities:
                                                                newPriorities,
                                                        });
                                                    }}
                                                >
                                                    <PriorityBadge
                                                        priority={
                                                            priority as any
                                                        }
                                                        className="mr-1"
                                                    />
                                                    {priority}
                                                </Badge>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Results Summary */}
                    <div
                        className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <div className="flex items-center justify-between rounded-2xl border border-orange-200/50 bg-gradient-to-r from-white/70 to-orange-50/70 p-6 shadow-lg backdrop-blur-sm dark:from-gray-800/70 dark:to-gray-900/70">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-3">
                                    <Bell className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-2xl font-bold text-transparent">
                                        {filteredAnnouncements.length}{' '}
                                        Announcement
                                        {filteredAnnouncements.length !== 1
                                            ? 's'
                                            : ''}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Stay informed with our latest updates
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Badge
                                    variant="default"
                                    className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                >
                                    <div className="flex items-center gap-1">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
                                        {publishedAnnouncements.length}{' '}
                                        Published
                                    </div>
                                </Badge>
                                {draftAnnouncements.length > 0 && (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 text-sm font-medium text-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl"
                                    >
                                        {draftAnnouncements.length} Draft
                                    </Badge>
                                )}
                                {archivedAnnouncements.length > 0 && (
                                    <Badge
                                        variant="outline"
                                        className="rounded-full border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 shadow-lg transition-all duration-300 hover:shadow-xl"
                                    >
                                        {archivedAnnouncements.length} Archived
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredAnnouncements.length === 0 ? (
                        <div
                            className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '800ms' }}
                        >
                            <Card className="border-0 bg-gradient-to-br from-white/80 to-orange-50/80 shadow-xl backdrop-blur-sm dark:from-gray-800/80 dark:to-gray-900/80">
                                <CardContent className="flex flex-col items-center justify-center py-16">
                                    <div className="mb-6">
                                        <div className="mb-4 inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-red-400 p-6">
                                            <Bell className="h-12 w-12 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-2xl font-bold text-transparent">
                                        No announcements found
                                    </h3>
                                    <p className="max-w-md text-center text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                        {searchQuery ||
                                        Object.values(activeFilters).some(
                                            (f) => f?.length,
                                        )
                                            ? "Try adjusting your search terms or filters to find what you're looking for."
                                            : 'Stay tuned! New announcements will appear here soon.'}
                                    </p>
                                    {(searchQuery ||
                                        Object.values(activeFilters).some(
                                            (f) => f?.length,
                                        )) && (
                                        <Button
                                            variant="outline"
                                            className="mt-6 border-2 border-orange-200 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-orange-400 hover:bg-orange-50"
                                            onClick={() => {
                                                setSearchQuery('');
                                                setActiveFilters({});
                                            }}
                                        >
                                            Clear search and filters
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Published Announcements */}
                            {publishedAnnouncements.length > 0 && (
                                <div
                                    className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    style={{ transitionDelay: '1000ms' }}
                                >
                                    <div className="mb-6 flex items-center gap-4 rounded-xl border border-orange-200/50 bg-gradient-to-r from-white/70 to-orange-50/70 p-4 backdrop-blur-sm dark:from-gray-800/70 dark:to-gray-900/70">
                                        <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-2">
                                            <Calendar className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-xl font-bold text-transparent">
                                            Latest Announcements
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {publishedAnnouncements.map(
                                            (announcement, index) => (
                                                <div
                                                    key={announcement.id}
                                                    className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                                    style={{
                                                        transitionDelay: `${1200 + index * 150}ms`,
                                                    }}
                                                >
                                                    <AnnouncementCard
                                                        announcement={
                                                            announcement
                                                        }
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Draft Announcements (if user has access) */}
                            {draftAnnouncements.length > 0 && (
                                <div>
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        <Filter className="h-5 w-5" />
                                        Draft Announcements
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {draftAnnouncements.map(
                                            (announcement) => (
                                                <AnnouncementCard
                                                    key={announcement.id}
                                                    announcement={announcement}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Archived Announcements */}
                            {archivedAnnouncements.length > 0 && (
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                        Archived Announcements
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {archivedAnnouncements.map(
                                            (announcement) => (
                                                <AnnouncementCard
                                                    key={announcement.id}
                                                    announcement={announcement}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Enhanced Call to Action */}
                    {publishedAnnouncements.length > 0 && (
                        <div
                            className={`mt-16 transform text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: '1400ms' }}
                        >
                            <Card className="overflow-hidden border-0 bg-gradient-to-br from-white/80 to-orange-50/80 shadow-2xl backdrop-blur-sm dark:from-gray-800/80 dark:to-gray-900/80">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
                                <CardContent className="relative p-12">
                                    <div className="mb-6">
                                        <div className="mb-4 inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-4">
                                            <Sparkles className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-3xl font-bold text-transparent">
                                        Stay Connected & Informed
                                    </h3>
                                    <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                        Don't miss out on important updates from
                                        the University Student Government.
                                        Follow our social media accounts or
                                        subscribe to our newsletter for the
                                        latest announcements, events, and
                                        important information.
                                    </p>
                                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                        <Button
                                            variant="outline"
                                            className="border-2 border-orange-200 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-orange-400 hover:bg-orange-50 hover:shadow-lg"
                                        >
                                            <svg
                                                className="mr-2 h-4 w-4"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                            Follow on Facebook
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-2 border-orange-200 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-orange-400 hover:bg-orange-50 hover:shadow-lg"
                                        >
                                            <Bell className="mr-2 h-4 w-4" />
                                            Subscribe to Newsletter
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
