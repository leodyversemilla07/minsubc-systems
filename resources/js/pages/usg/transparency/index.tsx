import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import FilterCard from '@/components/usg/filter-card';
import USGLayout from '@/layouts/usg-layout';
import usg from '@/routes/usg';
import { Head, Link, router } from '@inertiajs/react';
import {
    Calendar,
    Download,
    Eye,
    FileText,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface TransparencyReport {
    id: number;
    title: string;
    slug: string;
    description: string;
    type: string;
    report_period_start: string;
    report_period_end: string;
    formatted_period: string;
    formatted_file_size: string;
    file_path: string | null;
    download_count: number;
    view_count: number;
    published_at: string;
    created_by: {
        first_name: string;
        last_name: string;
    };
}

interface Props {
    reports: {
        data: TransparencyReport[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    types?: string[];
    years?: number[];
    filters: {
        type?: string;
        year?: string;
    };
}

export default function TransparencyIndex({
    reports,
    types = [],
    years = [],
    filters,
}: Props) {
    const [activeFilters, setActiveFilters] = useState<{
        type?: string;
        year?: string;
    }>({
        type: filters.type,
        year: filters.year,
    });

    const clearFilters = () => {
        setActiveFilters({});
        router.get(usg.transparency.index.url());
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'financial':
                return 'bg-[var(--usg-light)] text-[var(--usg-primary)] dark:bg-[var(--usg-dark)] dark:text-[var(--usg-light)]';
            case 'meeting_minutes':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'budget':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'expenditure':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
            case 'quarterly':
                return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
            case 'annual':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const formatTypeLabel = (type: string) => {
        return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <USGLayout>
            <Head title="Transparency Reports - USG" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[var(--usg-primary)] via-[var(--usg-primary)] to-[var(--usg-dark)] py-20 text-white">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            Transparency Reports
                        </h1>
                        <p className="text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Access public records, financial reports, and other
                            transparency documents from the USG. Promoting
                            openness and accountability.
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
                        title="Filter Reports"
                        description="Filter transparency reports by type and year"
                        hasActiveFilters={
                            !!(activeFilters.type || activeFilters.year)
                        }
                        onClearFilters={clearFilters}
                        filters={[
                            ...(types.length > 0
                                ? [
                                      {
                                          label: 'Report Type',
                                          icon: <FileText className="h-4 w-4" />,
                                          value: activeFilters.type,
                                          placeholder: `All Types (${types.length})`,
                                          options: types,
                                          formatLabel: formatTypeLabel,
                                          onChange: (value: string | undefined) => {
                                              const params = new URLSearchParams();
                                              if (value) params.set('type', value);
                                              if (activeFilters.year)
                                                  params.set('year', activeFilters.year);

                                              const queryString = params.toString();
                                              router.get(
                                                  `${usg.transparency.index.url()}${queryString ? `?${queryString}` : ''}`,
                                              );
                                          },
                                      },
                                  ]
                                : []),
                            ...(years.length > 0
                                ? [
                                      {
                                          label: 'Year',
                                          icon: <Calendar className="h-4 w-4" />,
                                          value: activeFilters.year,
                                          placeholder: `All Years (${years.length})`,
                                          options: years.map((year) => year.toString()),
                                          onChange: (value: string | undefined) => {
                                              const params = new URLSearchParams();
                                              if (activeFilters.type)
                                                  params.set('type', activeFilters.type);
                                              if (value) params.set('year', value);

                                              const queryString = params.toString();
                                              router.get(
                                                  `${usg.transparency.index.url()}${queryString ? `?${queryString}` : ''}`,
                                              );
                                          },
                                      },
                                  ]
                                : []),
                        ]}
                    />
                </div>

                {/* Results */}
                {reports.data.length === 0 ? (
                    <div className="rounded-xl bg-white p-12 text-center shadow-sm dark:bg-gray-900">
                        <FileText className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                            No reports found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {Object.values(filters).some((f) => f)
                                ? 'Try adjusting your filters'
                                : 'No transparency reports have been published yet'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {reports.total} Report
                                {reports.total !== 1 ? 's' : ''} Found
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {reports.data.map((report) => (
                                <Card
                                    key={report.id}
                                    className="bg-white dark:bg-gray-900"
                                >
                                    <CardHeader className="bg-white dark:bg-gray-900">
                                        <div className="mb-3 flex items-start justify-between">
                                            <Badge
                                                className={getTypeColor(
                                                    report.type,
                                                )}
                                            >
                                                {formatTypeLabel(report.type)}
                                            </Badge>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-4 w-4" />
                                                    {report.view_count}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Download className="h-4 w-4" />
                                                    {report.download_count}
                                                </span>
                                            </div>
                                        </div>
                                        <CardTitle className="line-clamp-2">
                                            <Link
                                                href={usg.transparency.show.url({ slug: report.slug })}
                                                className="hover:text-[var(--usg-primary)] dark:hover:text-[var(--usg-accent)]"
                                            >
                                                {report.title}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription className="space-y-1.5">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    Period: {report.formatted_period}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    Published: {formatDate(report.published_at)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                <span>
                                                    {report.created_by.first_name}{' '}
                                                    {report.created_by.last_name}
                                                </span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>

                                    {report.description && (
                                        <CardContent className="bg-white dark:bg-gray-900">
                                            <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                                                {report.description}
                                            </p>
                                        </CardContent>
                                    )}

                                    <CardFooter className="flex gap-2 bg-white dark:bg-gray-900">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                        >
                                            <Link
                                                href={usg.transparency.show.url({ slug: report.slug })}
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </Link>
                                        </Button>
                                        {report.file_path && (
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="default"
                                                className="flex-1"
                                            >
                                                <Link
                                                    href={usg.transparency.download.url({ slug: report.slug })}
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    {report.formatted_file_size
                                                        ? `Download (${report.formatted_file_size})`
                                                        : 'Download'}
                                                </Link>
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>{' '}
                        {/* Pagination */}
                        {reports.last_page > 1 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex gap-2">
                                    {Array.from(
                                        { length: reports.last_page },
                                        (_, i) => i + 1,
                                    ).map((page) => (
                                        <Button
                                            key={page}
                                            variant={
                                                page === reports.current_page
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            onClick={() => {
                                                const params =
                                                    new URLSearchParams();
                                                if (activeFilters.type)
                                                    params.set(
                                                        'type',
                                                        activeFilters.type,
                                                    );
                                                if (activeFilters.year)
                                                    params.set(
                                                        'year',
                                                        activeFilters.year,
                                                    );
                                                params.set(
                                                    'page',
                                                    page.toString(),
                                                );

                                                router.get(
                                                    `${usg.transparency.index.url()}?${params.toString()}`,
                                                );
                                            }}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
                </div>
            </section>

            {/* Call to Action */}
            {reports.data.length > 0 && (
                <section className="bg-[var(--usg-primary)] py-20 text-white">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-6 text-4xl font-bold">
                                Promoting Transparency & Accountability
                            </h2>
                            <p className="mb-8 text-xl text-[var(--usg-hero-text)]">
                                We believe in open governance. All financial reports and meeting minutes are publicly accessible to ensure accountability to the student body.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-0 bg-white text-[var(--usg-primary)] hover:bg-[var(--usg-light)]"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download All Reports
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white/10"
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Request Information
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </USGLayout>
    );
}
