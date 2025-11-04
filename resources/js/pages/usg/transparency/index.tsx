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
import USGLayout from '@/layouts/usg-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Calendar,
    Download,
    Eye,
    FileText,
    Filter,
    TrendingUp,
    X,
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
    stats: {
        total_reports: number;
        financial_reports: number;
        meeting_minutes: number;
        total_downloads: number;
    };
    filters: {
        type?: string;
        year?: string;
    };
}

export default function TransparencyIndex({
    reports,
    types = [],
    years = [],
    stats,
    filters,
}: Props) {
    const [activeFilters, setActiveFilters] = useState<{
        type?: string;
        year?: string;
    }>({
        type: filters.type,
        year: filters.year,
    });

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (activeFilters.type) params.set('type', activeFilters.type);
        if (activeFilters.year) params.set('year', activeFilters.year);

        const queryString = params.toString();
        router.get(`/usg/transparency${queryString ? `?${queryString}` : ''}`);
    };

    const clearFilters = () => {
        setActiveFilters({});
        router.get('/usg/transparency');
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
                
                <div className="relative container mx-auto px-4">
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

            {/* Stats Bar */}
            <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-2 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-[var(--usg-primary)]" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                <CountUp end={stats.total_reports} duration={2000} />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Reports
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-[var(--usg-secondary)]" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                <CountUp end={stats.financial_reports} duration={2000} />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Financial Reports
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-[var(--usg-accent)]" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                <CountUp end={stats.meeting_minutes} duration={2000} />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Meeting Minutes
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 flex items-center justify-center">
                                <Download className="h-5 w-5 rounded-sm bg-[var(--usg-text)] p-0.5 text-[var(--usg-neutral)]" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                <CountUp end={stats.total_downloads} duration={2000} />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Downloads
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-50 py-12 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Filters Section */}
                <div className="mb-8">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-[var(--usg-primary)]" />
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    Filter Reports
                                </h3>
                            </div>
                            {(activeFilters.type || activeFilters.year) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    <X className="mr-1 h-4 w-4" />
                                    Clear All
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Type Filter */}
                            {types.length > 0 && (
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                        Report Type
                                    </label>
                                    <Select
                                        value={activeFilters.type}
                                        onValueChange={(value) => {
                                            const newFilters = {
                                                ...activeFilters,
                                                type: value || undefined,
                                            };
                                            setActiveFilters(newFilters);
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={`All Types (${types.length})`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {types.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {formatTypeLabel(type)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {/* Year Filter */}
                            {years.length > 0 && (
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        Year
                                    </label>
                                    <Select
                                        value={activeFilters.year}
                                        onValueChange={(value) => {
                                            const newFilters = {
                                                ...activeFilters,
                                                year: value || undefined,
                                            };
                                            setActiveFilters(newFilters);
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={`All Years (${years.length})`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map((year) => (
                                                <SelectItem key={year} value={year.toString()}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {/* Apply Button */}
                        {(activeFilters.type !== filters.type || activeFilters.year !== filters.year) && (
                            <div className="mt-4 flex justify-end border-t border-gray-200 pt-4 dark:border-gray-700">
                                <Button onClick={applyFilters} size="sm">
                                    Apply Filters
                                </Button>
                            </div>
                        )}

                        {/* Active Filters Display */}
                        {(activeFilters.type || activeFilters.year) && (
                            <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Active filters:
                                </span>
                                {activeFilters.type && (
                                    <Badge
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        <FileText className="h-3 w-3" />
                                        {formatTypeLabel(activeFilters.type)}
                                        <button
                                            onClick={() => {
                                                setActiveFilters({
                                                    ...activeFilters,
                                                    type: undefined,
                                                });
                                            }}
                                            className="ml-1 hover:text-gray-900 dark:hover:text-white"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                                {activeFilters.year && (
                                    <Badge
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        <Calendar className="h-3 w-3" />
                                        {activeFilters.year}
                                        <button
                                            onClick={() => {
                                                setActiveFilters({
                                                    ...activeFilters,
                                                    year: undefined,
                                                });
                                            }}
                                            className="ml-1 hover:text-gray-900 dark:hover:text-white"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Results */}
                {reports.data.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
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
                                <div
                                    key={report.id}
                                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                                >
                                    <div className="mb-4">
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
                                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">
                                            <Link
                                                href={`/usg/transparency/${report.slug}`}
                                                className="hover:text-[var(--usg-primary)] dark:hover:text-[var(--usg-accent)]"
                                            >
                                                {report.title}
                                            </Link>
                                        </h3>
                                    </div>

                                    {report.description && (
                                        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                                            {report.description}
                                        </p>
                                    )}

                                    <div className="mb-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                Period:{' '}
                                                {report.formatted_period}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-500">
                                                Published:{' '}
                                            </span>
                                            {formatDate(report.published_at)}
                                        </div>
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-500">
                                                By:{' '}
                                            </span>
                                            {report.created_by.first_name}{' '}
                                            {report.created_by.last_name}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Link
                                                href={`/usg/transparency/${report.slug}`}
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
                                            >
                                                <Link
                                                    href={`/usg/transparency/${report.slug}/download`}
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download{' '}
                                                    {report.formatted_file_size &&
                                                        `(${report.formatted_file_size})`}
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
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
                                                    `/usg/transparency?${params.toString()}`,
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
            </div>
        </USGLayout>
    );
}
