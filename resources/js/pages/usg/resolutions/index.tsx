import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ResolutionCard from '@/components/usg/resolution-card';
import SearchBar from '@/components/usg/search-bar';
import USGLayout from '@/layouts/usg-layout';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    Download,
    ExternalLink,
    FileText,
    Search,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface Resolution {
    id: number;
    title: string;
    description: string;
    resolution_number: string;
    date_passed: string;
    author: string;
    file_path: string | null;
    status:
        | 'draft'
        | 'pending'
        | 'review'
        | 'published'
        | 'rejected'
        | 'archived';
    category?: string;
    tags?: string[];
    created_at: string;
}

interface Props {
    resolutions: {
        data: Resolution[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories?: string[];
    authors?: string[];
}

export default function ResolutionsIndex({
    resolutions,
    categories = [],
    authors = [],
}: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<{
        categories?: string[];
        authors?: string[];
        statuses?: string[];
        years?: string[];
    }>({});

    const filteredResolutions = resolutions.data.filter((resolution) => {
        // Search filter
        const matchesSearch =
            searchQuery === '' ||
            resolution.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            resolution.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            resolution.resolution_number
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            resolution.author.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
            !activeFilters.categories?.length ||
            (resolution.category &&
                activeFilters.categories.includes(resolution.category));

        // Author filter
        const matchesAuthor =
            !activeFilters.authors?.length ||
            activeFilters.authors.includes(resolution.author);

        // Status filter
        const matchesStatus =
            !activeFilters.statuses?.length ||
            activeFilters.statuses.includes(resolution.status);

        // Year filter
        const matchesYear =
            !activeFilters.years?.length ||
            activeFilters.years.includes(
                new Date(resolution.date_passed).getFullYear().toString(),
            );

        return (
            matchesSearch &&
            matchesCategory &&
            matchesAuthor &&
            matchesStatus &&
            matchesYear
        );
    });

    // Get available years from resolutions
    const availableYears = Array.from(
        new Set(
            resolutions.data.map((resolution) =>
                new Date(resolution.date_passed).getFullYear().toString(),
            ),
        ),
    ).sort((a, b) => parseInt(b) - parseInt(a));

    // Separate by status
    const publishedResolutions = filteredResolutions
        .filter((resolution) => resolution.status === 'published')
        .sort(
            (a, b) =>
                new Date(b.date_passed).getTime() -
                new Date(a.date_passed).getTime(),
        );

    const draftResolutions = filteredResolutions.filter(
        (resolution) => resolution.status === 'draft',
    );
    const pendingResolutions = filteredResolutions.filter(
        (resolution) => resolution.status === 'pending',
    );

    const currentYear = new Date().getFullYear();

    // Group published resolutions by year
    const resolutionsByYear = publishedResolutions.reduce(
        (acc, resolution) => {
            const year = new Date(resolution.date_passed)
                .getFullYear()
                .toString();
            if (!acc[year]) acc[year] = [];
            acc[year].push(resolution);
            return acc;
        },
        {} as { [year: string]: Resolution[] },
    );

    return (
        <USGLayout>
            <Head title="Resolutions - USG Portal" />

            {/* Hero Section */}
            <section className="relative bg-[var(--usg-primary)] py-20 text-white">
                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            Official Resolutions
                        </h1>
                        <p className="text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Browse official USG resolutions, legislative
                            documents, and policy decisions that shape our
                            university community
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                        <div>
                            <div className="mb-2 text-3xl font-bold text-[var(--usg-primary)] md:text-4xl">
                                {resolutions.total}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Resolutions
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-3xl font-bold text-[var(--usg-secondary)] md:text-4xl">
                                {publishedResolutions.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Published
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-3xl font-bold text-[var(--usg-accent)] md:text-4xl">
                                {availableYears.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Years Active
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 inline-block rounded bg-[var(--usg-text)] px-2 py-1 text-3xl font-bold text-[var(--usg-neutral)] md:text-4xl">
                                {authors.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Authors
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Enhanced Search and Filters */}
                    <div className="mb-12">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search resolutions by title, number, author, or content..."
                            showFilters
                            filters={{
                                categories: categories,
                                statuses: [
                                    'published',
                                    'draft',
                                    'pending',
                                    'archived',
                                ],
                            }}
                            activeFilters={{
                                categories: activeFilters.categories,
                                statuses: activeFilters.statuses,
                            }}
                            onFiltersChange={(filters) => {
                                setActiveFilters({
                                    ...activeFilters,
                                    categories: filters.categories,
                                    statuses: filters.statuses,
                                });
                            }}
                        />

                        {/* Additional Filters */}
                        <div className="mt-4 flex flex-wrap gap-4">
                            {/* Author Filter */}
                            {authors.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        Author:
                                    </span>
                                    <select
                                        value={activeFilters.authors?.[0] || ''}
                                        onChange={(e) => {
                                            setActiveFilters({
                                                ...activeFilters,
                                                authors: e.target.value
                                                    ? [e.target.value]
                                                    : [],
                                            });
                                        }}
                                        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:bg-gray-800"
                                    >
                                        <option value="">All Authors</option>
                                        {authors.map((author) => (
                                            <option key={author} value={author}>
                                                {author}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Year Filter */}
                            {availableYears.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        Year:
                                    </span>
                                    <select
                                        value={activeFilters.years?.[0] || ''}
                                        onChange={(e) => {
                                            setActiveFilters({
                                                ...activeFilters,
                                                years: e.target.value
                                                    ? [e.target.value]
                                                    : [],
                                            });
                                        }}
                                        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:bg-gray-800"
                                    >
                                        <option value="">All Years</option>
                                        {availableYears.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {filteredResolutions.length} Resolution
                                {filteredResolutions.length !== 1 ? 's' : ''}
                            </h2>
                            <div className="flex gap-2">
                                <Badge
                                    variant="default"
                                    className="border-[var(--usg-secondary)] bg-[var(--usg-light)] text-[var(--usg-primary)]"
                                >
                                    {publishedResolutions.length} Published
                                </Badge>
                                {pendingResolutions.length > 0 && (
                                    <Badge variant="secondary">
                                        {pendingResolutions.length} Pending
                                    </Badge>
                                )}
                                {draftResolutions.length > 0 && (
                                    <Badge variant="outline">
                                        {draftResolutions.length} Draft
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredResolutions.length === 0 ? (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm dark:bg-gray-900">
                            <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No resolutions found
                            </h3>
                            <p className="mx-auto mb-6 max-w-md text-gray-600 dark:text-gray-400">
                                {searchQuery ||
                                Object.values(activeFilters).some(
                                    (f) => f?.length,
                                )
                                    ? "Try adjusting your search terms or filters to find what you're looking for."
                                    : 'No resolutions are currently available.'}
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
                            {/* Current Year Resolutions */}
                            {resolutionsByYear[currentYear] &&
                                resolutionsByYear[currentYear].length > 0 && (
                                    <div>
                                        <div className="mb-6 flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-blue-600" />
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {currentYear} Resolutions
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                            {resolutionsByYear[currentYear].map(
                                                (resolution) => (
                                                    <ResolutionCard
                                                        key={resolution.id}
                                                        resolution={resolution}
                                                        variant="full"
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Previous Years Resolutions */}
                            {Object.entries(resolutionsByYear)
                                .filter(
                                    ([year]) => year !== currentYear.toString(),
                                )
                                .map(([year, yearResolutions]) => (
                                    <div key={year}>
                                        <div className="mb-6 flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-gray-600" />
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {year} Resolutions
                                            </h3>
                                            <Badge variant="outline">
                                                {yearResolutions.length}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                            {yearResolutions.map(
                                                (resolution) => (
                                                    <ResolutionCard
                                                        key={resolution.id}
                                                        resolution={resolution}
                                                        variant="compact"
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}

                            {/* Draft Resolutions (if user has access) */}
                            {draftResolutions.length > 0 && (
                                <div>
                                    <div className="mb-6 flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-yellow-600" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Draft Resolutions
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {draftResolutions.map((resolution) => (
                                            <ResolutionCard
                                                key={resolution.id}
                                                resolution={resolution}
                                                variant="full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pending Resolutions */}
                            {pendingResolutions.length > 0 && (
                                <div>
                                    <div className="mb-6 flex items-center gap-2">
                                        <User className="h-5 w-5 text-orange-600" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Pending Resolutions
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {pendingResolutions.map(
                                            (resolution) => (
                                                <ResolutionCard
                                                    key={resolution.id}
                                                    resolution={resolution}
                                                    variant="full"
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Statistics Card */}
                    {publishedResolutions.length > 0 && (
                        <div className="mt-12 rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                                Resolution Statistics
                            </h3>
                            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                                <div className="text-center">
                                    <div className="mb-2 text-3xl font-bold text-[var(--usg-primary)]">
                                        {publishedResolutions.length}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Published
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-3xl font-bold text-[var(--usg-secondary)]">
                                        {availableYears.length}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Years Active
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-3xl font-bold text-[var(--usg-accent)]">
                                        {authors.length}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Authors
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 inline-block rounded bg-[var(--usg-text)] px-2 py-1 text-3xl font-bold text-[var(--usg-neutral)]">
                                        {
                                            resolutions.data.filter(
                                                (r) => r.file_path,
                                            ).length
                                        }
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        With Documents
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    {publishedResolutions.length > 0 && (
                        <div className="mt-12 rounded-lg bg-[var(--usg-primary)] p-12 text-center text-white shadow-lg">
                            <h3 className="mb-2 text-3xl font-bold">
                                Stay Informed
                            </h3>
                            <p className="mb-6 text-lg text-white/90">
                                Keep track of the latest USG resolutions and
                                policy decisions that affect our university
                                community
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="bg-white text-[var(--usg-primary)] hover:bg-gray-100"
                                >
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Archive
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
