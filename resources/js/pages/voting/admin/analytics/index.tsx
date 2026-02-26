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
    CheckSquare,
    Download,
    FileSpreadsheet,
    PieChart,
    Star,
    TrendingUp,
    Users,
    Vote,
} from 'lucide-react';
import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface Stats {
    total_elections: number;
    active_elections: number;
    completed_elections: number;
    total_voters: number;
    voters_who_voted: number;
    voters_in_period: number;
    voter_turnout: number;
    total_candidates: number;
    total_positions: number;
    total_partylists: number;
    total_votes: number;
    votes_in_period: number;
    feedback_count: number;
    avg_rating: number;
    active_election: {
        id: number;
        title: string;
        start_time: string;
        end_time: string;
    } | null;
}

interface Trends {
    votes_by_election: Array<{ name: string; count: number }>;
    candidates_by_position: Array<{ name: string; count: number }>;
    voter_turnout_trend: Array<{
        name: string;
        total: number;
        voted: number;
        turnout: number;
    }>;
    votes_by_hour: Array<{ hour: string; count: number }>;
    feedback_distribution: Array<{ rating: number; count: number }>;
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
    '#06b6d4',
    '#84cc16',
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
            '/voting/admin/analytics',
            { period: value },
            { preserveState: true },
        );
    };

    return (
        <AppLayout>
            <Head title="Analytics Dashboard - Voting Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Analytics Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Voting system statistics and insights
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
                                    `/voting/admin/analytics/export/pdf?period=${period}`,
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
                                    `/voting/admin/analytics/export/excel?period=${period}`,
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

                {/* Active Election Banner */}
                {stats.active_election && (
                    <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                                        <Vote className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-amber-900 dark:text-amber-100">
                                            Active Election in Progress
                                        </p>
                                        <p className="text-sm text-amber-700 dark:text-amber-300">
                                            {stats.active_election.title}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                                        {stats.voter_turnout}%
                                    </p>
                                    <p className="text-sm text-amber-700 dark:text-amber-300">
                                        Current Turnout
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Elections
                            </CardTitle>
                            <Vote className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_elections}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_elections} active,{' '}
                                {stats.completed_elections} completed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Voter Turnout
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.voter_turnout}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.voters_who_voted} of {stats.total_voters}{' '}
                                voted
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Votes
                            </CardTitle>
                            <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_votes}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.votes_in_period} in selected period
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Avg Feedback
                            </CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.avg_rating > 0
                                    ? stats.avg_rating.toFixed(1)
                                    : 'N/A'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {stats.feedback_count} reviews
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="bg-blue-50 dark:bg-blue-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                Total Candidates
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                                {stats.total_candidates}
                            </div>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                                Across {stats.total_positions} positions
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-50 dark:bg-green-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                                Total Partylists
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                                {stats.total_partylists}
                            </div>
                            <p className="text-xs text-green-600 dark:text-green-400">
                                Political parties
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-50 dark:bg-purple-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                New Voters
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                                {stats.voters_in_period}
                            </div>
                            <p className="text-xs text-purple-600 dark:text-purple-400">
                                In selected period
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Votes by Election */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-blue-500" />
                                Votes by Election
                            </CardTitle>
                            <CardDescription>
                                Total votes per election
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trends.votes_by_election}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="name"
                                            tick={{ fontSize: 11 }}
                                        />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#3b82f6">
                                            {trends.votes_by_election.map(
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

                    {/* Voter Turnout Trend */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-500" />
                                Voter Turnout by Election
                            </CardTitle>
                            <CardDescription>
                                Participation rate per election
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trends.voter_turnout_trend}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="name"
                                            tick={{ fontSize: 11 }}
                                        />
                                        <YAxis unit="%" />
                                        <Tooltip
                                            formatter={(value: number) => [
                                                `${value}%`,
                                                'Turnout',
                                            ]}
                                        />
                                        <Bar
                                            dataKey="turnout"
                                            fill="#10b981"
                                            name="Turnout %"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Candidates by Position */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChart className="h-5 w-5 text-purple-500" />
                                Candidates by Position
                            </CardTitle>
                            <CardDescription>
                                Distribution of candidates across positions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={trends.candidates_by_position}
                                            dataKey="count"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label={({ name, percent }) =>
                                                `${name} (${(percent * 100).toFixed(0)}%)`
                                            }
                                        >
                                            {trends.candidates_by_position.map(
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
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Votes by Hour */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-amber-500" />
                                Voting Activity by Hour
                            </CardTitle>
                            <CardDescription>
                                When voters cast their votes
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trends.votes_by_hour}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="hour" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#f59e0b"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feedback Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-yellow-500" />
                                Feedback Distribution
                            </CardTitle>
                            <CardDescription>
                                Voter satisfaction ratings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={trends.feedback_distribution}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="rating" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar
                                            dataKey="count"
                                            fill="#eab308"
                                            name="Count"
                                        />
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
