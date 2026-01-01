import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Activity,
    Award,
    CheckCircle,
    Clock,
    CreditCard,
    FileText,
    Megaphone,
    TrendingUp,
    Users,
    Vote,
} from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface AnalyticsProps {
    period: string;
    registrarStats: {
        total_requests: number;
        requests_in_period: number;
        pending_payment: number;
        processing: number;
        ready_for_claim: number;
        completed: number;
        cancelled: number;
        total_revenue: number;
        revenue_in_period: number;
        by_document_type: Array<{ document_type: string; count: number }>;
        by_status: Array<{ status: string; count: number }>;
        daily_requests: Array<{ date: string; count: number }>;
    };
    sasStats: {
        total_scholarships: number;
        active_recipients: number;
        total_recipients: number;
        total_organizations: number;
        active_organizations: number;
        total_insurance: number;
        recipients_by_scholarship: Array<{ name: string; count: number }>;
        recipients_by_status: Array<{ status: string; count: number }>;
    };
    usgStats: {
        total_announcements: number;
        published_announcements: number;
        total_events: number;
        upcoming_events: number;
        total_resolutions: number;
        total_officers: number;
        event_registrations: number;
        announcements_by_category: Array<{ category: string; count: number }>;
        events_by_month: Array<{ month: number; count: number }>;
    };
    votingStats: {
        total_elections: number;
        active_elections: number;
        total_voters: number;
        voters_who_voted: number;
        total_votes: number;
        total_candidates: number;
        total_positions: number;
        voter_turnout: number;
        feedback_count: number;
        avg_rating: number;
    };
    systemStats: {
        total_users: number;
        verified_users: number;
        users_with_2fa: number;
        new_users_in_period: number;
        total_students: number;
        audit_logs_in_period: number;
    };
    trendData: Array<{
        date: string;
        users: number;
        requests: number;
        votes: number;
    }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Super Admin', href: '/super-admin/dashboard' },
    { title: 'Analytics', href: '/super-admin/analytics' },
];

export default function Analytics({
    period,
    registrarStats,
    sasStats,
    usgStats,
    votingStats,
    systemStats,
    trendData,
}: AnalyticsProps) {
    const handlePeriodChange = (value: string) => {
        router.get('/super-admin/analytics', { period: value }, { preserveState: true });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Analytics" />

            <div className="flex-1 space-y-6 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            System Analytics
                        </h1>
                        <p className="text-muted-foreground">
                            Comprehensive overview of all modules and system performance
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={period} onValueChange={handlePeriodChange}>
                            <SelectTrigger className="w-45">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">Last 7 days</SelectItem>
                                <SelectItem value="30">Last 30 days</SelectItem>
                                <SelectItem value="90">Last 90 days</SelectItem>
                                <SelectItem value="365">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* System Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{systemStats.total_users}</div>
                            <p className="text-xs text-muted-foreground">
                                +{systemStats.new_users_in_period} in last {period} days
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{systemStats.total_students}</div>
                            <p className="text-xs text-muted-foreground">
                                {systemStats.verified_users} verified accounts
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">2FA Enabled</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{systemStats.users_with_2fa}</div>
                            <p className="text-xs text-muted-foreground">
                                {systemStats.total_users > 0 
                                    ? ((systemStats.users_with_2fa / systemStats.total_users) * 100).toFixed(1)
                                    : 0}% adoption rate
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Audit Logs</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{systemStats.audit_logs_in_period}</div>
                            <p className="text-xs text-muted-foreground">
                                Events in last {period} days
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Trend Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Activity Trends (Last 7 Days)
                        </CardTitle>
                        <CardDescription>
                            Daily new users, document requests, and votes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#3b82f6" name="New Users" />
                                <Line type="monotone" dataKey="requests" stroke="#10b981" name="Doc Requests" />
                                <Line type="monotone" dataKey="votes" stroke="#f59e0b" name="Votes Cast" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Module Stats Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Registrar Module */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-500" />
                                    Registrar Module
                                </CardTitle>
                                <Badge variant="outline" className="text-blue-600">
                                    {registrarStats.requests_in_period} requests
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Total Requests</p>
                                    <p className="text-2xl font-bold">{registrarStats.total_requests}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatCurrency(registrarStats.total_revenue)}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-center text-sm">
                                <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-950">
                                    <CreditCard className="mx-auto h-4 w-4 text-amber-600" />
                                    <p className="mt-1 font-semibold">{registrarStats.pending_payment}</p>
                                    <p className="text-xs text-muted-foreground">Pending</p>
                                </div>
                                <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
                                    <Clock className="mx-auto h-4 w-4 text-blue-600" />
                                    <p className="mt-1 font-semibold">{registrarStats.processing}</p>
                                    <p className="text-xs text-muted-foreground">Processing</p>
                                </div>
                                <div className="rounded-lg bg-green-50 p-2 dark:bg-green-950">
                                    <CheckCircle className="mx-auto h-4 w-4 text-green-600" />
                                    <p className="mt-1 font-semibold">{registrarStats.ready_for_claim}</p>
                                    <p className="text-xs text-muted-foreground">Ready</p>
                                </div>
                                <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                                    <FileText className="mx-auto h-4 w-4 text-slate-600" />
                                    <p className="mt-1 font-semibold">{registrarStats.completed}</p>
                                    <p className="text-xs text-muted-foreground">Completed</p>
                                </div>
                            </div>
                            {registrarStats.by_document_type && registrarStats.by_document_type.length > 0 && (
                                <div>
                                    <p className="mb-2 text-sm font-medium">By Document Type</p>
                                    <ResponsiveContainer width="100%" height={150}>
                                        <BarChart data={registrarStats.by_document_type.slice(0, 5)} layout="vertical">
                                            <XAxis type="number" />
                                            <YAxis dataKey="document_type" type="category" width={100} tick={{ fontSize: 11 }} />
                                            <Tooltip />
                                            <Bar dataKey="count" fill="#3b82f6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* SAS Module */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-purple-500" />
                                    Student Affairs (SAS)
                                </CardTitle>
                                <Badge variant="outline" className="text-purple-600">
                                    {sasStats.active_recipients} active scholars
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{sasStats.total_scholarships}</p>
                                    <p className="text-xs text-muted-foreground">Scholarships</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{sasStats.total_recipients}</p>
                                    <p className="text-xs text-muted-foreground">Recipients</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{sasStats.total_organizations}</p>
                                    <p className="text-xs text-muted-foreground">Organizations</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg border p-3">
                                    <p className="text-sm text-muted-foreground">Active Organizations</p>
                                    <p className="text-xl font-bold text-purple-600">{sasStats.active_organizations}</p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <p className="text-sm text-muted-foreground">Insurance Records</p>
                                    <p className="text-xl font-bold">{sasStats.total_insurance}</p>
                                </div>
                            </div>
                            {sasStats.recipients_by_scholarship && sasStats.recipients_by_scholarship.length > 0 && (
                                <div>
                                    <p className="mb-2 text-sm font-medium">Recipients by Scholarship</p>
                                    <ResponsiveContainer width="100%" height={150}>
                                        <PieChart>
                                            <Pie
                                                data={sasStats.recipients_by_scholarship.slice(0, 5)}
                                                dataKey="count"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={50}
                                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                            >
                                                {sasStats.recipients_by_scholarship.slice(0, 5).map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* USG Module */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Megaphone className="h-5 w-5 text-green-500" />
                                    USG Portal
                                </CardTitle>
                                <Badge variant="outline" className="text-green-600">
                                    {usgStats.upcoming_events} upcoming events
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{usgStats.total_announcements}</p>
                                    <p className="text-xs text-muted-foreground">Announcements</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{usgStats.total_events}</p>
                                    <p className="text-xs text-muted-foreground">Events</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{usgStats.total_resolutions}</p>
                                    <p className="text-xs text-muted-foreground">Resolutions</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg border p-3">
                                    <p className="text-sm text-muted-foreground">Published Posts</p>
                                    <p className="text-xl font-bold text-green-600">{usgStats.published_announcements}</p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <p className="text-sm text-muted-foreground">Event Registrations</p>
                                    <p className="text-xl font-bold">{usgStats.event_registrations}</p>
                                </div>
                            </div>
                            <div className="rounded-lg border p-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">USG Officers</p>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-xl font-bold">{usgStats.total_officers}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Voting System Module */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Vote className="h-5 w-5 text-amber-500" />
                                    Voting System
                                </CardTitle>
                                {votingStats.active_elections > 0 ? (
                                    <Badge className="animate-pulse bg-amber-100 text-amber-700">
                                        {votingStats.active_elections} Active
                                    </Badge>
                                ) : (
                                    <Badge variant="outline">No Active Elections</Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{votingStats.total_elections}</p>
                                    <p className="text-xs text-muted-foreground">Elections</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{votingStats.total_voters}</p>
                                    <p className="text-xs text-muted-foreground">Voters</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{votingStats.total_candidates}</p>
                                    <p className="text-xs text-muted-foreground">Candidates</p>
                                </div>
                            </div>
                            <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Voter Turnout</p>
                                        <p className="text-3xl font-bold text-amber-600">{votingStats.voter_turnout}%</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Votes Cast</p>
                                        <p className="text-xl font-bold">{votingStats.voters_who_voted}/{votingStats.total_voters}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg border p-3">
                                    <p className="text-sm text-muted-foreground">Feedback Received</p>
                                    <p className="text-xl font-bold">{votingStats.feedback_count}</p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                                    <p className="text-xl font-bold">
                                        {votingStats.avg_rating > 0 ? votingStats.avg_rating.toFixed(1) : 'N/A'}
                                        {votingStats.avg_rating > 0 && <span className="text-sm text-muted-foreground">/5</span>}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
