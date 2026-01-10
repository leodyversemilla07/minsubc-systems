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
    BarChart3,
    Calendar,
    Download,
    FileSpreadsheet,
    FileText,
    Megaphone,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface Stats {
    total_announcements: number;
    published_announcements: number;
    draft_announcements: number;
    announcements_in_period: number;
    total_events: number;
    upcoming_events: number;
    past_events: number;
    events_in_period: number;
    total_registrations: number;
    total_officers: number;
    active_officers: number;
    total_resolutions: number;
    published_resolutions: number;
}

interface Trends {
    announcements_by_category: Array<{ category: string; count: number }>;
    events_by_month: Array<{ month: number; year: number; count: number }>;
    announcement_trends: Array<{ date: string; count: number }>;
    event_trends: Array<{ date: string; count: number }>;
}

interface Props {
    stats: Stats;
    trends: Trends;
    period: string;
}

const COLORS = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
];

export default function AnalyticsDashboard({
    stats,
    trends,
    period: initialPeriod,
}: Props) {
    const [period, setPeriod] = useState(initialPeriod);

    const handlePeriodChange = (value: string) => {
        setPeriod(value);
        router.get(
            '/usg/admin/analytics',
            { period: value },
            { preserveState: true },
        );
    };

    const formatMonth = (month: number) => {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        return months[month - 1] || '';
    };

    return (
        <AppLayout>
            <Head title="Analytics Dashboard - USG Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Analytics Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            USG portal statistics and insights
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
                                    `/usg/admin/analytics/export/pdf?period=${period}`,
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
                                    `/usg/admin/analytics/export/excel?period=${period}`,
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
                                Announcements
                            </CardTitle>
                            <Megaphone className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_announcements}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.published_announcements} published,{' '}
                                {stats.draft_announcements} drafts
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Events
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_events}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.upcoming_events} upcoming,{' '}
                                {stats.past_events} past
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Officers
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_officers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_officers} active
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Resolutions
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_resolutions}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.published_resolutions} published
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Summary */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="bg-blue-50 dark:bg-blue-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                New Announcements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                                {stats.announcements_in_period}
                            </div>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                                In selected period
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-50 dark:bg-green-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                                New Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                                {stats.events_in_period}
                            </div>
                            <p className="text-xs text-green-600 dark:text-green-400">
                                In selected period
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-50 dark:bg-purple-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                Event Registrations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                                {stats.total_registrations}
                            </div>
                            <p className="text-xs text-purple-600 dark:text-purple-400">
                                Total registrations
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Announcement Trends */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Megaphone className="h-5 w-5 text-blue-500" />
                                Announcement Trends
                            </CardTitle>
                            <CardDescription>
                                Daily announcements over time
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={trends.announcement_trends}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(value) =>
                                                new Date(
                                                    value,
                                                ).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })
                                            }
                                        />
                                        <YAxis />
                                        <Tooltip
                                            labelFormatter={(value) =>
                                                new Date(
                                                    value,
                                                ).toLocaleDateString()
                                            }
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Event Trends */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-green-500" />
                                Event Trends
                            </CardTitle>
                            <CardDescription>
                                Events created over time
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trends.event_trends}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(value) =>
                                                new Date(
                                                    value,
                                                ).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })
                                            }
                                        />
                                        <YAxis />
                                        <Tooltip
                                            labelFormatter={(value) =>
                                                new Date(
                                                    value,
                                                ).toLocaleDateString()
                                            }
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Announcements by Category */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-purple-500" />
                                Announcements by Category
                            </CardTitle>
                            <CardDescription>
                                Distribution of announcement categories
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={trends.announcements_by_category}
                                        layout="vertical"
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis
                                            dataKey="category"
                                            type="category"
                                            width={100}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#8b5cf6">
                                            {trends.announcements_by_category.map(
                                                (_, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            COLORS[
                                                                index %
                                                                    COLORS.length
                                                            ]
                                                        }
                                                    />
                                                ),
                                            )}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Events by Month */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-amber-500" />
                                Events by Month
                            </CardTitle>
                            <CardDescription>
                                Number of events per month
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trends.events_by_month}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="month"
                                            tickFormatter={formatMonth}
                                        />
                                        <YAxis />
                                        <Tooltip
                                            labelFormatter={(value, props) => {
                                                const payload =
                                                    props?.[0]?.payload;
                                                return payload
                                                    ? `${formatMonth(payload.month)} ${payload.year}`
                                                    : '';
                                            }}
                                        />
                                        <Bar dataKey="count" fill="#f59e0b" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
