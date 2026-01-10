import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {
    Clock,
    DollarSign,
    Download,
    FileSpreadsheet,
    FileText,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
);

interface Stats {
    total_requests: number;
    requests_by_type: Record<string, number>;
    requests_by_status: Record<string, number>;
    revenue_by_type: Record<string, number>;
    average_processing_time: number;
    request_trends: Record<string, number>;
    revenue_trends: Record<string, number>;
    top_requested_documents: Record<string, number>;
    completion_rate: number;
}

interface RevenueStats {
    total_revenue: number;
    pending_revenue: number;
    paid_requests: number;
    pending_payments: number;
}

interface Props {
    stats: Stats;
    revenueStats: RevenueStats;
    period: string;
}

export default function AnalyticsDashboard({
    stats,
    revenueStats,
    period: initialPeriod,
}: Props) {
    const [period, setPeriod] = useState(initialPeriod);

    const handlePeriodChange = (value: string) => {
        setPeriod(value);
        router.get(
            '/registrar/admin/analytics',
            { period: value },
            { preserveState: true },
        );
    };

    // Request Trends Chart Data
    const requestTrendsData = {
        labels: Object.keys(stats.request_trends),
        datasets: [
            {
                label: 'Document Requests',
                data: Object.values(stats.request_trends),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
            },
        ],
    };

    // Revenue Trends Chart Data
    const revenueTrendsData = {
        labels: Object.keys(stats.revenue_trends),
        datasets: [
            {
                label: 'Revenue (₱)',
                data: Object.values(stats.revenue_trends),
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
            },
        ],
    };

    // Status Distribution Chart Data
    const statusDistributionData = {
        labels: Object.keys(stats.requests_by_status).map((s) =>
            s.replace(/_/g, ' ').toUpperCase(),
        ),
        datasets: [
            {
                data: Object.values(stats.requests_by_status),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                ],
            },
        ],
    };

    // Document Types Chart Data
    const documentTypesData = {
        labels: Object.keys(stats.requests_by_type),
        datasets: [
            {
                label: 'Requests',
                data: Object.values(stats.requests_by_type),
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
            },
        ],
    };

    return (
        <AppLayout>
            <Head title="Analytics Dashboard - Registrar" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Analytics Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Document request statistics and insights
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select
                            value={period}
                            onValueChange={handlePeriodChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7days">
                                    Last 7 Days
                                </SelectItem>
                                <SelectItem value="30days">
                                    Last 30 Days
                                </SelectItem>
                                <SelectItem value="90days">
                                    Last 90 Days
                                </SelectItem>
                                <SelectItem value="year">Last Year</SelectItem>
                                <SelectItem value="all">All Time</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            size="default"
                            onClick={() =>
                                window.open(
                                    `/admin/analytics/export/pdf?period=${period}`,
                                    '_blank',
                                )
                            }
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            PDF
                        </Button>
                        <Button
                            variant="outline"
                            size="default"
                            onClick={() =>
                                window.open(
                                    `/admin/analytics/export/excel?period=${period}`,
                                    '_blank',
                                )
                            }
                            className="gap-2"
                        >
                            <FileSpreadsheet className="h-4 w-4" />
                            Excel
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Requests
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_requests}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Avg Processing Time
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Math.round(stats.average_processing_time)}h
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ₱{revenueStats.total_revenue.toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Completion Rate
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.completion_rate}%
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Request Trends */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Request Trends</CardTitle>
                            <CardDescription>
                                Daily request volume over time
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <Line
                                    data={requestTrendsData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: false },
                                        },
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Status Distribution</CardTitle>
                            <CardDescription>
                                Requests by current status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <Pie
                                    data={statusDistributionData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Document Types */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Document Types</CardTitle>
                            <CardDescription>
                                Requests by document type
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <Bar
                                    data={documentTypesData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: false },
                                        },
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Revenue Trends */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Trends</CardTitle>
                            <CardDescription>
                                Daily revenue over time
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <Line
                                    data={revenueTrendsData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: false },
                                        },
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
