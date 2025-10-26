import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import USGLayout from '@/layouts/usg-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Download, Eye, FileText, TrendingUp } from 'lucide-react';
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
        search?: string;
    };
}

export default function TransparencyIndex({
    reports,
    types = [],
    years = [],
    stats,
    filters,
}: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || '');
    const [selectedYear, setSelectedYear] = useState(filters.year || '');

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set('search', searchQuery.trim());
        if (selectedType) params.set('type', selectedType);
        if (selectedYear) params.set('year', selectedYear);

        router.get(`/usg/transparency?${params.toString()}`);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedType('');
        setSelectedYear('');
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
            <section className="relative overflow-hidden bg-[var(--usg-primary)] py-20 text-white">
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
            <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-2 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-[var(--usg-primary)]" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.total_reports}
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
                                {stats.financial_reports}
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
                                {stats.meeting_minutes}
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
                                {stats.total_downloads}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Downloads
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Search and Filters */}
                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="rounded-lg bg-[var(--usg-primary)] p-2">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Search & Filter Reports
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div>
                            <Input
                                placeholder="Search reports..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleFilter();
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                value={selectedType}
                                onChange={(e) =>
                                    setSelectedType(e.target.value)
                                }
                            >
                                <option value="">All Types</option>
                                {types.map((type) => (
                                    <option key={type} value={type}>
                                        {formatTypeLabel(type)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                value={selectedYear}
                                onChange={(e) =>
                                    setSelectedYear(e.target.value)
                                }
                            >
                                <option value="">All Years</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleFilter} size="sm">
                                Filter
                            </Button>
                            <Button
                                variant="outline"
                                onClick={clearFilters}
                                size="sm"
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {reports.data.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-800">
                        <FileText className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                            No reports found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {Object.values(filters).some((f) => f)
                                ? 'Try adjusting your search filters'
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
                                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
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
                                                if (searchQuery.trim())
                                                    params.set(
                                                        'search',
                                                        searchQuery.trim(),
                                                    );
                                                if (selectedType)
                                                    params.set(
                                                        'type',
                                                        selectedType,
                                                    );
                                                if (selectedYear)
                                                    params.set(
                                                        'year',
                                                        selectedYear,
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
        </USGLayout>
    );
}
