import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AnnouncementCard from '@/components/usg/announcement-card';
import CountUp from '@/components/usg/count-up';
import FilterCard from '@/components/usg/filter-card';
import USGLayout from '@/layouts/usg-layout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, Sparkles, Tag, X } from 'lucide-react';
import { useState } from 'react';

interface Announcement {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
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

export default function AnnouncementsIndex({ announcements }: Props) {
    const [activeFilters, setActiveFilters] = useState<{
        categories?: string[];
        years?: string[];
    }>({});

    const filteredAnnouncements = announcements.data.filter((announcement) => {
        // Only show published announcements to public
        if (
            announcement.status === 'draft' ||
            announcement.status === 'archived'
        ) {
            return false;
        }

        // Category filter
        const matchesCategory =
            !activeFilters.categories?.length ||
            (announcement.category &&
                activeFilters.categories.includes(announcement.category));

        // Year filter
        const matchesYear =
            !activeFilters.years?.length ||
            activeFilters.years.includes(
                new Date(announcement.publish_date).getFullYear().toString(),
            );

        return matchesCategory && matchesYear;
    });

    // Sort announcements by published date (newest first)
    const publishedAnnouncements = filteredAnnouncements.sort((a, b) => {
        const dateA = new Date(a.publish_date).getTime();
        const dateB = new Date(b.publish_date).getTime();
        return dateB - dateA;
    });

    // Get available years from announcements
    const availableYears = Array.from(
        new Set(
            announcements.data.map((announcement) =>
                new Date(announcement.publish_date).getFullYear().toString(),
            ),
        ),
    ).sort((a, b) => parseInt(b) - parseInt(a));

    // Get available categories
    const availableCategories = Array.from(
        new Set(
            announcements.data
                .map((a) => a.category)
                .filter((c): c is string => !!c),
        ),
    ).sort();

    const draftAnnouncements = announcements.data.filter(
        (announcement) => announcement.status === 'draft',
    );
    const archivedAnnouncements = announcements.data.filter(
        (announcement) => announcement.status === 'archived',
    );

    const clearFilters = () => {
        setActiveFilters({});
    };

    const hasActiveFilters = Object.values(activeFilters).some(
        (filter) => filter && filter.length > 0,
    );

    return (
        <USGLayout>
            <Head title="Announcements - USG" />

            {/* Hero Section */}
            <section className="relative -mt-28 overflow-hidden bg-gradient-to-br from-green-700 via-green-700 to-green-900 pt-32 pb-20 text-white sm:pt-40 dark:from-green-900 dark:via-green-900 dark:to-black">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>

                {/* Grid Pattern Background */}
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight drop-shadow-md sm:text-5xl lg:text-6xl">
                            Latest Announcements
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-green-50 sm:text-xl lg:text-2xl dark:text-gray-200">
                            Stay updated with the latest news, events, and
                            important information from USG
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Filter Section */}
                    <div className="mb-8">
                        <FilterCard
                            title="Filter Announcements"
                            description="Filter announcements by category and year"
                            hasActiveFilters={hasActiveFilters}
                            onClearFilters={clearFilters}
                            filters={[
                                ...(availableCategories.length > 0
                                    ? [
                                          {
                                              label: 'Category',
                                              icon: <Tag className="h-4 w-4" />,
                                              value: activeFilters
                                                  .categories?.[0],
                                              placeholder: 'All Categories',
                                              options: availableCategories,
                                              onChange: (
                                                  value: string | undefined,
                                              ) => {
                                                  setActiveFilters({
                                                      ...activeFilters,
                                                      categories: value
                                                          ? [value]
                                                          : undefined,
                                                  });
                                              },
                                          },
                                      ]
                                    : []),
                                ...(availableYears.length > 0
                                    ? [
                                          {
                                              label: 'Year',
                                              icon: (
                                                  <Calendar className="h-4 w-4" />
                                              ),
                                              value: activeFilters.years?.[0],
                                              placeholder: 'All Years',
                                              options: availableYears,
                                              onChange: (
                                                  value: string | undefined,
                                              ) => {
                                                  setActiveFilters({
                                                      ...activeFilters,
                                                      years: value
                                                          ? [value]
                                                          : undefined,
                                                  });
                                              },
                                          },
                                      ]
                                    : []),
                            ]}
                        />
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
                                        <CountUp
                                            end={publishedAnnouncements.length}
                                            duration={1500}
                                        />{' '}
                                        Announcement
                                        {publishedAnnouncements.length !== 1
                                            ? 's'
                                            : ''}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {hasActiveFilters
                                            ? 'Filtered results'
                                            : 'Stay informed with our latest updates'}
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

                    {publishedAnnouncements.length === 0 ? (
                        <div className="rounded-xl bg-white p-12 text-center shadow-sm dark:bg-gray-900">
                            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-[var(--usg-light)] p-6">
                                <Bell className="h-12 w-12 text-[var(--usg-primary)]" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                No announcements found
                            </h3>
                            <p className="mx-auto mb-6 max-w-md text-lg text-gray-600 dark:text-gray-300">
                                {hasActiveFilters
                                    ? "Try adjusting your filters to find what you're looking for."
                                    : 'Stay tuned! New announcements will appear here soon.'}
                            </p>
                            {hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Clear filters
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
                                        <Bell className="h-5 w-5" />
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
                <section className="relative overflow-hidden bg-green-700 py-20 text-white dark:bg-green-900">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 container mx-auto px-4">
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
