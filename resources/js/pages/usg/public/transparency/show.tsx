import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Download, Eye, FileText, User } from 'lucide-react';

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

        return (
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Report Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Object.entries(report.data).map(([key, value]) => (
                            <div key={key} className="border-b pb-2">
                                <dt className="text-sm font-medium text-muted-foreground uppercase">
                                    {key.replace(/_/g, ' ')}
                                </dt>
                                <dd className="mt-1">
                                    {typeof value === 'object'
                                        ? JSON.stringify(value, null, 2)
                                        : String(value)}
                                </dd>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <PublicLayout>
            <Head title={`${report.title} - Transparency Reports`} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="mx-auto max-w-4xl px-4 pb-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-4">
                            <Badge className={getTypeColor(report.type)}>
                                {formatTypeLabel(report.type)}
                            </Badge>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

                        <h1 className="mb-4 text-3xl font-bold">
                            {report.title}
                        </h1>

                        <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                            <div className="mb-8">
                                <Button asChild size="lg">
                                    <Link
                                        href={`/usg/transparency/${report.slug}/download`}
                                    >
                                        <Download className="mr-2 h-5 w-5" />
                                        Download Report
                                        {report.formatted_file_size &&
                                            ` (${report.formatted_file_size})`}
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {report.description && (
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Report Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="prose dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: report.description.replace(
                                            /\n/g,
                                            '<br>',
                                        ),
                                    }}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Report Data */}
                    {renderReportData()}

                    {/* Related Reports */}
                    {relatedReports.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Related Reports</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {relatedReports.map((relatedReport) => (
                                        <div
                                            key={relatedReport.id}
                                            className="flex items-center justify-between rounded-lg border p-4"
                                        >
                                            <div>
                                                <h4 className="font-medium">
                                                    <Link
                                                        href={`/usg/transparency/${relatedReport.slug}`}
                                                        className="hover:text-primary"
                                                    >
                                                        {relatedReport.title}
                                                    </Link>
                                                </h4>
                                                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Badge
                                                        className={getTypeColor(
                                                            relatedReport.type,
                                                        )}
                                                    >
                                                        {formatTypeLabel(
                                                            relatedReport.type,
                                                        )}
                                                    </Badge>
                                                    <span>
                                                        {formatDate(
                                                            relatedReport.published_at,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Link
                                                    href={`/usg/transparency/${relatedReport.slug}`}
                                                >
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
