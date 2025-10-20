import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PublicLayout from '@/layouts/public-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    BarChart3,
    Calendar,
    Download,
    Eye,
    FileText,
    Search,
    TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
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
        <PublicLayout>
            <Head title="Transparency Reports - USG" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Animated background elements */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-400/10"></div>
                    <div className="animation-delay-1000 absolute top-1/2 -left-40 h-96 w-96 animate-pulse rounded-full bg-indigo-400/10"></div>
                    <div className="animation-delay-2000 absolute right-1/4 bottom-20 h-60 w-60 animate-pulse rounded-full bg-purple-400/10"></div>
                </div>

                {/* Animated Header */}
                <div
                    className={`relative border-b bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm dark:from-gray-800/80 dark:to-gray-900/80 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000`}
                >
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6">
                                <div className="mb-4 inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
                                    <BarChart3 className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="mb-4 flex items-center justify-center gap-3">
                                <h1 className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                                    Transparency Reports
                                </h1>
                            </div>
                            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
                                Access public records, financial reports, and
                                other transparency documents from the USG.
                                Promoting openness and accountability.
                            </p>

                            {/* Stats */}
                            <div
                                className={`mt-8 flex transform justify-center gap-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: '200ms' }}
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">
                                        {stats.total_reports}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total Reports
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-indigo-600">
                                        {stats.total_downloads}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Downloads
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Enhanced Statistics Cards */}
                    <div
                        className={`mb-12 grid transform grid-cols-1 gap-6 transition-all duration-1000 md:grid-cols-2 lg:grid-cols-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        <Card className="group border-2 border-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <FileText className="h-8 w-8 text-blue-600 transition-transform group-hover:scale-110" />
                                    <div className="ml-4">
                                        <p className="text-2xl font-bold">
                                            {stats.total_reports}
                                        </p>
                                        <p className="text-muted-foreground">
                                            Total Reports
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group border-2 border-green-100 transition-all duration-300 hover:border-green-300 hover:shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <TrendingUp className="h-8 w-8 text-green-600 transition-transform group-hover:scale-110" />
                                    <div className="ml-4">
                                        <p className="text-2xl font-bold">
                                            {stats.financial_reports}
                                        </p>
                                        <p className="text-muted-foreground">
                                            Financial Reports
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group border-2 border-purple-100 transition-all duration-300 hover:border-purple-300 hover:shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <Calendar className="h-8 w-8 text-purple-600 transition-transform group-hover:scale-110" />
                                    <div className="ml-4">
                                        <p className="text-2xl font-bold">
                                            {stats.meeting_minutes}
                                        </p>
                                        <p className="text-muted-foreground">
                                            Meeting Minutes
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group border-2 border-orange-100 transition-all duration-300 hover:border-orange-300 hover:shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <Download className="h-8 w-8 text-orange-600 transition-transform group-hover:scale-110" />
                                    <div className="ml-4">
                                        <p className="text-2xl font-bold">
                                            {stats.total_downloads}
                                        </p>
                                        <p className="text-muted-foreground">
                                            Total Downloads
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Enhanced Search and Filters */}
                    <div
                        className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <Card className="border-2 border-blue-200 bg-white/70 shadow-xl backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-2">
                                        <Search className="h-5 w-5 text-white" />
                                    </div>
                                    Search & Filter Reports
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                    <div>
                                        <Input
                                            placeholder="Search reports..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
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
                                        <Button
                                            onClick={handleFilter}
                                            size="sm"
                                        >
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
                            </CardContent>
                        </Card>

                        {/* Results */}
                        {reports.data.length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                    <h3 className="mb-2 text-lg font-semibold">
                                        No reports found
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {Object.values(filters).some((f) => f)
                                            ? 'Try adjusting your search filters'
                                            : 'No transparency reports have been published yet'}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <>
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">
                                        {reports.total} Report
                                        {reports.total !== 1 ? 's' : ''} Found
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {reports.data.map((report) => (
                                        <Card
                                            key={report.id}
                                            className="transition-all hover:shadow-md"
                                        >
                                            <CardHeader>
                                                <div className="mb-2 flex items-start justify-between">
                                                    <Badge
                                                        className={getTypeColor(
                                                            report.type,
                                                        )}
                                                    >
                                                        {formatTypeLabel(
                                                            report.type,
                                                        )}
                                                    </Badge>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4" />
                                                            {report.view_count}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Download className="h-4 w-4" />
                                                            {
                                                                report.download_count
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <CardTitle className="line-clamp-2">
                                                    <Link
                                                        href={`/usg/transparency/${report.slug}`}
                                                        className="hover:text-primary"
                                                    >
                                                        {report.title}
                                                    </Link>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                {report.description && (
                                                    <p className="mb-4 line-clamp-3 text-muted-foreground">
                                                        {report.description}
                                                    </p>
                                                )}

                                                <div className="mb-4 space-y-2 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span>
                                                            Period:{' '}
                                                            {
                                                                report.formatted_period
                                                            }
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Published:{' '}
                                                        </span>
                                                        {formatDate(
                                                            report.published_at,
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            By:{' '}
                                                        </span>
                                                        {
                                                            report.created_by
                                                                .first_name
                                                        }{' '}
                                                        {
                                                            report.created_by
                                                                .last_name
                                                        }
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
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

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
                                                        page ===
                                                        reports.current_page
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
                </div>
            </div>
        </PublicLayout>
    );
}
