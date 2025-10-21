import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import USGLayout from '@/layouts/usg-layout';
import usg from '@/routes/usg';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    BarChart3,
    Calendar,
    Download,
    Eye,
    FileText,
    User,
} from 'lucide-react';

interface TransparencyReport {
    id: number;
    title: string;
    slug: string;
    description: string;
    type: string;
    data: Record<string, unknown>;
    report_period_start: string;
    report_period_end: string;
    formatted_period: string;
    formatted_file_size: string;
    file_path: string | null;
    file_name: string | null;
    download_count: number;
    view_count: number;
    published_at: string;
    created_by: {
        first_name: string;
        last_name: string;
    };
}

interface Props {
    report: TransparencyReport;
    relatedReports: Array<{
        id: number;
        title: string;
        slug: string;
        type: string;
        published_at: string;
    }>;
}

export default function TransparencyShow({ report, relatedReports }: Props) {
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

    const renderReportData = () => {
        if (!report.data) return null;

        const renderValue = (value: unknown) => {
            // Handle arrays
            if (Array.isArray(value)) {
                return (
                    <ul className="mt-2 list-inside list-disc space-y-1">
                        {value.map((item, index) => (
                            <li key={index} className="text-gray-900 dark:text-white">
                                {typeof item === 'object' ? JSON.stringify(item) : String(item)}
                            </li>
                        ))}
                    </ul>
                );
            }
            
            // Handle objects (but not arrays) - render as key-value pairs
            if (typeof value === 'object' && value !== null) {
                const entries = Object.entries(value as Record<string, unknown>);
                return (
                    <div className="mt-2 space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                        {entries.map(([key, val]) => (
                            <div key={key} className="flex items-start justify-between gap-4 border-b border-gray-200 pb-2 last:border-0 last:pb-0 dark:border-gray-700">
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    {key}
                                </span>
                                <span className="text-right text-gray-900 dark:text-white">
                                    {String(val)}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            }
            
            // Handle primitives
            return <span className="text-gray-900 dark:text-white">{String(value)}</span>;
        };

        return (
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Report Details
                </h2>
                <div className="space-y-4">
                    {Object.entries(report.data).map(([key, value]) => (
                        <div
                            key={key}
                            className="border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700"
                        >
                            <dt className="text-sm font-medium uppercase text-gray-600 dark:text-gray-400">
                                {key.replace(/_/g, ' ')}
                            </dt>
                            <dd className="mt-2">
                                {renderValue(value)}
                            </dd>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <USGLayout>
            <Head title={`${report.title} - Transparency Reports`} />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-teal-600 to-blue-700 py-16 text-white">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Button
                        asChild
                        variant="ghost"
                        className="mb-6 text-white hover:bg-white/10"
                    >
                        <Link href={usg.transparency.index.url()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Reports
                        </Link>
                    </Button>

                    <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                            <BarChart3 className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <Badge
                                    className={`${getTypeColor(report.type)} border-white/30 backdrop-blur-sm`}
                                >
                                    {formatTypeLabel(report.type)}
                                </Badge>
                                <div className="flex items-center gap-4 text-sm text-cyan-100">
                                    <span className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        {report.view_count} views
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Download className="h-4 w-4" />
                                        {report.download_count} downloads
                                    </span>
                                </div>
                            </div>

                            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                                {report.title}
                            </h1>

                            <div className="mb-6 flex flex-wrap gap-4 text-sm text-cyan-100">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Period: {report.formatted_period}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>
                                        Published by {report.created_by.first_name}{' '}
                                        {report.created_by.last_name}
                                    </span>
                                </div>
                                <div>
                                    Published on {formatDate(report.published_at)}
                                </div>
                            </div>

                            {/* Download Button */}
                            {report.file_path && (
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-white text-cyan-600 hover:bg-cyan-50"
                                >
                                    <Link
                                        href={`/usg/transparency/${report.slug}/download`}
                                    >
                                        <Download className="mr-2 h-5 w-5" />
                                        Download Report
                                        {report.formatted_file_size &&
                                            ` (${report.formatted_file_size})`}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
                {/* Report Description */}
                {report.description && (
                    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            Report Summary
                        </h2>
                        <div
                            className="prose max-w-none dark:prose-invert"
                            dangerouslySetInnerHTML={{
                                __html: report.description.replace(
                                    /\n/g,
                                    '<br />',
                                ),
                            }}
                        />
                    </div>
                )}

                {/* Report Data */}
                {renderReportData()}

                {/* Related Reports */}
                {relatedReports.length > 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            Related Reports
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {relatedReports.map((relatedReport) => (
                                <Link
                                    key={relatedReport.id}
                                    href={`/usg/transparency/${relatedReport.slug}`}
                                    className="group block rounded-xl border border-gray-200 bg-gray-50 p-6 transition-all hover:border-cyan-300 hover:bg-gray-100 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-cyan-700 dark:hover:bg-gray-800"
                                >
                                    <div className="mb-3 flex items-start justify-between gap-4">
                                        <Badge
                                            className={`${getTypeColor(relatedReport.type)} shrink-0`}
                                        >
                                            {formatTypeLabel(relatedReport.type)}
                                        </Badge>
                                        <div className="text-right text-xs text-gray-600 dark:text-gray-400">
                                            {formatDate(relatedReport.published_at)}
                                        </div>
                                    </div>

                                    <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                                        {relatedReport.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <FileText className="h-4 w-4 text-cyan-500" />
                                        <span>View Report</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </USGLayout>
    );
}
