import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResolutionCard from '@/components/usg/resolution-card';
import SearchBar from '@/components/usg/search-bar';
import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    Download,
    FileText,
    Gavel,
    Search,
    User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Resolution {
    id: number;
    title: string;
    description: string;
    resolution_number: string;
    date_passed: string;
    author: string;
    file_path: string | null;
    status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived';
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
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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
        <PublicLayout>
            <Head title="Resolutions - USG Portal" />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Animated background elements */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-emerald-400/10"></div>
                    <div className="animation-delay-1000 absolute top-1/2 -left-40 h-96 w-96 animate-pulse rounded-full bg-teal-400/10"></div>
                    <div className="animation-delay-2000 absolute right-1/4 bottom-20 h-60 w-60 animate-pulse rounded-full bg-green-400/10"></div>
                </div>

                {/* Animated Header */}
                <div
                    className={`relative border-b bg-gradient-to-r from-white/80 to-emerald-50/80 backdrop-blur-sm dark:from-gray-800/80 dark:to-gray-900/80 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000`}
                >
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6">
                                <div className="mb-4 inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
                                    <Gavel className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="mb-4 flex items-center justify-center gap-3">
                                <h1 className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                                    Official Resolutions
                                </h1>
                            </div>
                            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
                                Browse official USG resolutions, legislative
                                documents, and policy decisions that shape our
                                university community. Transparency in
                                governance.
                            </p>

                            {/* Stats */}
                            <div
                                className={`mt-8 flex transform justify-center gap-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: '200ms' }}
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-emerald-600">
                                        {resolutions.total}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total Resolutions
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-teal-600">
                                        {publishedResolutions.length}
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
                    {/* Enhanced Search and Filters */}
                    <div
                        className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <div className="group relative">
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
                        </div>

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
                                    className="bg-green-100 text-green-700"
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
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Search className="mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    No resolutions found
                                </h3>
                                <p className="max-w-md text-center text-gray-600 dark:text-gray-300">
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
                                        className="mt-4"
                                    >
                                        Clear search and filters
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
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
                        <div className="mt-12">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                        Resolution Statistics
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {publishedResolutions.length}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Published
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">
                                                {availableYears.length}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Years Active
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-600">
                                                {authors.length}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Authors
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-orange-600">
                                                {
                                                    resolutions.data.filter(
                                                        (r) => r.file_path,
                                                    ).length
                                                }
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                With Documents
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Call to Action */}
                    {publishedResolutions.length > 0 && (
                        <div className="mt-12 text-center">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        Stay Informed
                                    </h3>
                                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                                        Keep track of the latest USG resolutions
                                        and policy decisions that affect our
                                        university community.
                                    </p>
                                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                        <Button variant="outline">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Archive
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
