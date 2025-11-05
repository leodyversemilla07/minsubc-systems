import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FilterCard from '@/components/usg/filter-card';
import ResolutionCard from '@/components/usg/resolution-card';
import USGLayout from '@/layouts/usg-layout';
import { Head } from '@inertiajs/react';
import { Calendar, Download, ExternalLink, FileText } from 'lucide-react';
import { useState } from 'react';

// Resolution interface for public pages - simplified to published/archived only
interface Resolution {
    id: number;
    title: string;
    description: string;
    resolution_number: string;
    date_passed: string;
    file_path: string | null;
    status: 'published' | 'archived';
    category?: string;
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
}

export default function ResolutionsIndex({ resolutions }: Props) {
    const [activeFilters, setActiveFilters] = useState<{
        categories?: string[];
        statuses?: string[];
        years?: string[];
    }>({});

    const filteredResolutions = resolutions.data.filter((resolution) => {
        // Category filter
        const matchesCategory =
            !activeFilters.categories?.length ||
            (resolution.category &&
                activeFilters.categories.includes(resolution.category));

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

        return matchesCategory && matchesStatus && matchesYear;
    });

    // Get available years from resolutions
    const availableYears = Array.from(
        new Set(
            resolutions.data.map((resolution) =>
                new Date(resolution.date_passed).getFullYear().toString(),
            ),
        ),
    ).sort((a, b) => parseInt(b) - parseInt(a));

    // Separate by status - only show published resolutions to public
    const publishedResolutions = filteredResolutions
        .filter((resolution) => resolution.status === 'published')
        .sort(
            (a, b) =>
                new Date(b.date_passed).getTime() -
                new Date(a.date_passed).getTime(),
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
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
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

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Filters Section */}
                    <div className="mb-8">
                        <FilterCard
                            title="Filter Resolutions"
                            description="Filter resolutions by year and status"
                            hasActiveFilters={Object.values(activeFilters).some(
                                (f) => f?.length,
                            )}
                            onClearFilters={() => setActiveFilters({})}
                            filters={[
                                ...(availableYears.length > 0
                                    ? [
                                          {
                                              label: 'Year',
                                              icon: (
                                                  <Calendar className="h-4 w-4" />
                                              ),
                                              value: activeFilters.years?.[0],
                                              placeholder: `All Years (${availableYears.length})`,
                                              options: availableYears,
                                              onChange: (
                                                  value: string | undefined,
                                              ) => {
                                                  setActiveFilters({
                                                      ...activeFilters,
                                                      years: value
                                                          ? [value]
                                                          : [],
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
                                        {
                                            value: 'published',
                                            label: 'Published',
                                        },
                                        {
                                            value: 'archived',
                                            label: 'Archived',
                                        },
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

                    {/* Results Summary */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {filteredResolutions.length} Resolution
                                {filteredResolutions.length !== 1 ? 's' : ''}
                            </h2>
                            <Badge
                                variant="default"
                                className="border-[var(--usg-secondary)] bg-[var(--usg-light)] text-[var(--usg-primary)]"
                            >
                                {publishedResolutions.length} Published
                            </Badge>
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
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}

                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            {publishedResolutions.length > 0 && (
                <section className="bg-[var(--usg-primary)] py-20 text-white">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-6 text-4xl font-bold">
                                Stay Informed
                            </h2>
                            <p className="mb-8 text-xl text-[var(--usg-hero-text)]">
                                Keep track of the latest USG resolutions and
                                policy decisions that affect our university
                                community
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-0 bg-white text-[var(--usg-primary)] hover:bg-[var(--usg-light)]"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Archive
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white/10"
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
