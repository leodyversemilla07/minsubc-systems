import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import CountUp from '@/components/usg/count-up';
import ResolutionCard from '@/components/usg/resolution-card';
import USGLayout from '@/layouts/usg-layout';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    Download,
    ExternalLink,
    FileText,
    Filter,
    User,
    X,
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
    status: 'draft' | 'review' | 'published' | 'rejected' | 'archived';
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
    authors = [],
}: Props) {
    const [activeFilters, setActiveFilters] = useState<{
        categories?: string[];
        authors?: string[];
        statuses?: string[];
        years?: string[];
    }>({});

    const filteredResolutions = resolutions.data.filter((resolution) => {
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
    const reviewResolutions = filteredResolutions.filter(
        (resolution) => resolution.status === 'review',
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
            <section className="relative bg-gradient-to-br from-[var(--usg-primary)] via-[var(--usg-primary)] to-[var(--usg-dark)] py-20 text-white">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>
                
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
                                <CountUp end={resolutions.total} duration={2000} />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Resolutions
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-3xl font-bold text-[var(--usg-secondary)] md:text-4xl">
                                <CountUp end={publishedResolutions.length} duration={2000} />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Published
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-3xl font-bold text-[var(--usg-accent)] md:text-4xl">
                                <CountUp end={availableYears.length} duration={2000} />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Years Active
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 inline-block rounded bg-[var(--usg-text)] px-2 py-1 text-3xl font-bold text-[var(--usg-neutral)] md:text-4xl">
                                <CountUp end={authors.length} duration={2000} />
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
                    {/* Filters Section */}
                    <div className="mb-8">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-[var(--usg-primary)]" />
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        Filter Resolutions
                                    </h3>
                                </div>
                                {Object.values(activeFilters).some((f) => f?.length) && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setActiveFilters({});
                                        }}
                                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        <X className="mr-1 h-4 w-4" />
                                        Clear All
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {/* Author Filter */}
                                {authors.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            <User className="h-4 w-4 text-gray-400" />
                                            Author
                                        </label>
                                        <Select
                                            value={activeFilters.authors?.[0]}
                                            onValueChange={(value) => {
                                                setActiveFilters({
                                                    ...activeFilters,
                                                    authors: value ? [value] : [],
                                                });
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={`All Authors (${authors.length})`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {authors.map((author) => (
                                                    <SelectItem key={author} value={author}>
                                                        {author}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Year Filter */}
                                {availableYears.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            Year
                                        </label>
                                        <Select
                                            value={activeFilters.years?.[0]}
                                            onValueChange={(value) => {
                                                setActiveFilters({
                                                    ...activeFilters,
                                                    years: value ? [value] : [],
                                                });
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={`All Years (${availableYears.length})`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableYears.map((year) => (
                                                    <SelectItem key={year} value={year}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Status Filter */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                        Status
                                    </label>
                                    <Select
                                        value={activeFilters.statuses?.[0]}
                                        onValueChange={(value) => {
                                            setActiveFilters({
                                                ...activeFilters,
                                                statuses: value ? [value] : [],
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="All Statuses" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="published">Published</SelectItem>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="review">Under Review</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Active Filters Display */}
                            {Object.values(activeFilters).some((f) => f?.length) && (
                                <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Active filters:
                                    </span>
                                    {activeFilters.authors?.map((author) => (
                                        <Badge
                                            key={author}
                                            variant="secondary"
                                            className="flex items-center gap-1"
                                        >
                                            <User className="h-3 w-3" />
                                            {author}
                                            <button
                                                onClick={() => {
                                                    setActiveFilters({
                                                        ...activeFilters,
                                                        authors: [],
                                                    });
                                                }}
                                                className="ml-1 hover:text-gray-900 dark:hover:text-white"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                    {activeFilters.years?.map((year) => (
                                        <Badge
                                            key={year}
                                            variant="secondary"
                                            className="flex items-center gap-1"
                                        >
                                            <Calendar className="h-3 w-3" />
                                            {year}
                                            <button
                                                onClick={() => {
                                                    setActiveFilters({
                                                        ...activeFilters,
                                                        years: [],
                                                    });
                                                }}
                                                className="ml-1 hover:text-gray-900 dark:hover:text-white"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                    {activeFilters.statuses?.map((status) => (
                                        <Badge
                                            key={status}
                                            variant="secondary"
                                            className="flex items-center gap-1"
                                        >
                                            <FileText className="h-3 w-3" />
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                            <button
                                                onClick={() => {
                                                    setActiveFilters({
                                                        ...activeFilters,
                                                        statuses: [],
                                                    });
                                                }}
                                                className="ml-1 hover:text-gray-900 dark:hover:text-white"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
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
                                {reviewResolutions.length > 0 && (
                                    <Badge variant="secondary">
                                        {reviewResolutions.length} Under Review
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
                        <div className="rounded-xl bg-white p-12 text-center shadow-sm dark:bg-gray-900">
                            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No resolutions found
                            </h3>
                            <p className="mx-auto mb-6 max-w-md text-gray-600 dark:text-gray-400">
                                {Object.values(activeFilters).some(
                                    (f) => f?.length,
                                )
                                    ? "Try adjusting your filters to find what you're looking for."
                                    : 'No resolutions are currently available.'}
                            </p>
                            {Object.values(activeFilters).some(
                                (f) => f?.length,
                            ) && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setActiveFilters({});
                                    }}
                                >
                                    Clear filters
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
                            {reviewResolutions.length > 0 && (
                                <div>
                                    <div className="mb-6 flex items-center gap-2">
                                        <User className="h-5 w-5 text-orange-600" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Under Review
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        {reviewResolutions.map(
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
                        <div className="mt-12 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-900">
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
                        <div className="mt-12 rounded-xl bg-[var(--usg-primary)] p-12 text-center text-white shadow-lg">
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
