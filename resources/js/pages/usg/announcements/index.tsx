import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AnnouncementCard from '@/components/usg/announcement-card';
import PriorityBadge from '@/components/usg/priority-badge';
import SearchBar from '@/components/usg/search-bar';
import USGLayout from '@/layouts/usg-layout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, Filter, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Announcement {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    priority: 'low' | 'normal' | 'high';
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
    const [activeFilters, setActiveFilters] = useState<{
        categories?: string[];
        priorities?: string[];
        statuses?: string[];
    }>({});

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
        const priorityOrder = { high: 3, normal: 2, low: 1 };
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
        <USGLayout>
            <Head title="Announcements - USG" />

            {/* Hero Section */}
            <section className="relative bg-[var(--usg-primary)] py-20 text-white">
                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            Latest Announcements
                        </h1>
                        <p className="text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Stay updated with the latest news, events, and
                            important information from USG
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto flex max-w-2xl justify-center gap-12">
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-[var(--usg-primary)]">
                                {announcements.total}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Announcements
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-[var(--usg-primary)]">
                                {publishedAnnouncements.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Published
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Search and Filters */}
                    <div className="mb-8">
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
                            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-[var(--usg-primary)]" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Filter by priority:
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        {['high', 'normal', 'low'].map(
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
                                                            priority as
                                                                | 'low'
                                                                | 'normal'
                                                                | 'high'
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

                    {/* Results Summary */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-[var(--usg-primary)] p-3">
                                    <Bell className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
                                    className="rounded-full bg-[var(--usg-primary)] px-4 py-2 text-sm font-medium text-white dark:bg-[var(--usg-dark)]"
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
                                        className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 dark:bg-yellow-500"
                                    >
                                        {draftAnnouncements.length} Draft
                                    </Badge>
                                )}
                                {archivedAnnouncements.length > 0 && (
                                    <Badge
                                        variant="outline"
                                        className="rounded-full px-4 py-2 text-sm font-medium"
                                    >
                                        {archivedAnnouncements.length} Archived
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredAnnouncements.length === 0 ? (
                        <div className="rounded-lg bg-white p-16 text-center shadow-sm dark:bg-gray-900">
                            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-[var(--usg-light)] p-6">
                                <Bell className="h-12 w-12 text-[var(--usg-primary)]" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                No announcements found
                            </h3>
                            <p className="mx-auto mb-6 max-w-md text-lg text-gray-600 dark:text-gray-300">
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
                        <div className="space-y-8">
                            {/* Published Announcements */}
                            {publishedAnnouncements.length > 0 && (
                                <div>
                                    <div className="mb-6 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                        <div className="rounded-full bg-[var(--usg-primary)] p-2">
                                            <Calendar className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Latest Announcements
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {publishedAnnouncements.map(
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
                </div>
            </section>

            {/* Call to Action */}
            {publishedAnnouncements.length > 0 && (
                <section className="bg-[var(--usg-primary)] py-20 text-white">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-white/20 p-4 backdrop-blur-sm">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="mb-6 text-4xl font-bold">
                                Stay Connected & Informed
                            </h2>
                            <p className="mb-8 text-xl text-[var(--usg-hero-text)]">
                                Don't miss out on important updates from the
                                University Student Government
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-0 bg-white text-[var(--usg-primary)] hover:bg-[var(--usg-light)]"
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
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white/10"
                                >
                                    <Bell className="mr-2 h-4 w-4" />
                                    Subscribe to Newsletter
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </USGLayout>
    );
}
