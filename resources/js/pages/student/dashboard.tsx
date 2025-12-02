import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { statusColors } from '@/lib/status-colors';
import { dashboard } from '@/routes';
import { create, index } from '@/routes/registrar/document-requests';
import sas from '@/routes/sas';
import usg from '@/routes/usg';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    Award,
    Calendar,
    CheckCircle,
    Clock,
    CreditCard,
    Eye,
    FileText,
    GraduationCap,
    Megaphone,
    Plus,
    Shield,
    TrendingUp,
    Users,
    Vote,
    XCircle,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Portal',
        href: dashboard().url,
    },
];

interface DashboardProps {
    user: {
        first_name: string;
        last_name: string;
        email: string;
        student?: {
            student_id: string;
            course: string;
            year_level: number;
        };
    };
    stats: {
        total_requests: number;
        pending_payment: number;
        processing: number;
        ready_for_claim: number;
        completed: number;
    };
    recent_requests: Array<{
        id: number;
        request_number: string;
        document_type: string;
        status: string;
        created_at: string;
        amount: number;
    }>;
    // SAS Stats
    sasStats?: {
        active_scholarships: number;
        total_scholarships: number;
        insurance_status: string;
        organizations_joined: number;
    };
    // USG Stats  
    usgStats?: {
        recent_announcements: number;
        upcoming_events: number;
        new_resolutions: number;
    };
    recentAnnouncements?: Array<{
        id: number;
        title: string;
        slug: string;
        category: string;
        publish_date: string;
    }>;
    upcomingEvents?: Array<{
        id: number;
        title: string;
        slug: string;
        start_date: string;
        location?: string;
    }>;
    // Voting Stats
    votingStats?: {
        active_election: boolean;
        election_name?: string;
        has_voted: boolean;
        can_vote: boolean;
    };
}

export default function Dashboard({
    user,
    stats,
    recent_requests,
    sasStats,
    usgStats,
    recentAnnouncements,
    upcomingEvents,
    votingStats,
}: DashboardProps) {
    // Default values for optional props
    const safeSasStats = sasStats ?? {
        active_scholarships: 0,
        total_scholarships: 0,
        insurance_status: 'None',
        organizations_joined: 0,
    };
    const safeUsgStats = usgStats ?? {
        recent_announcements: 0,
        upcoming_events: 0,
        new_resolutions: 0,
    };
    const safeRecentAnnouncements = recentAnnouncements ?? [];
    const safeUpcomingEvents = upcomingEvents ?? [];
    const safeVotingStats = votingStats ?? {
        active_election: false,
        election_name: undefined,
        has_voted: false,
        can_vote: false,
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending_payment':
                return <CreditCard className="h-4 w-4" />;
            case 'payment_expired':
                return <XCircle className="h-4 w-4" />;
            case 'paid':
                return <CheckCircle className="h-4 w-4" />;
            case 'processing':
                return <Clock className="h-4 w-4" />;
            case 'ready_for_claim':
                return <CheckCircle className="h-4 w-4" />;
            case 'claimed':
                return <CheckCircle className="h-4 w-4" />;
            case 'released':
                return <CheckCircle className="h-4 w-4" />;
            case 'cancelled':
                return <XCircle className="h-4 w-4" />;
            case 'rejected':
                return <XCircle className="h-4 w-4" />;
            default:
                return <AlertCircle className="h-4 w-4" />;
        }
    };

    const totalRequests = stats.total_requests;
    const completedPercentage =
        totalRequests > 0 ? (stats.completed / totalRequests) * 100 : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Portal" />

            <div className="flex-1 space-y-8 p-6 md:p-8 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                {/* Welcome Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-14 w-14 ring-2 ring-green-500/50 dark:ring-green-400/50">
                            <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-lg text-white">
                                {user.first_name[0]}
                                {user.last_name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl dark:text-white">
                                Welcome back, {user.first_name}!
                            </h1>
                            <p className="text-muted-foreground dark:text-slate-400">
                                {user.student
                                    ? `${user.student.student_id} • ${user.student.course} • Year ${user.student.year_level}`
                                    : 'Staff Member'}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline" className="dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:hover:bg-slate-700">
                            <Link href={usg.index.url()}>
                                <Megaphone className="mr-2 h-4 w-4" />
                                USG Portal
                            </Link>
                        </Button>
                        <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                            <Link href={create()}>
                                <Plus className="mr-2 h-4 w-4" />
                                New Request
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Quick Access Grid - 4 Systems */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Registrar Quick Access */}
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-900/80 dark:hover:border-blue-500/50 dark:hover:shadow-blue-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20">
                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <Badge variant="outline" className="dark:border-blue-500/50 dark:text-blue-400">
                                    {stats.pending_payment + stats.processing} Active
                                </Badge>
                            </div>
                            <CardTitle className="text-lg dark:text-white">Registrar</CardTitle>
                            <CardDescription className="dark:text-slate-400">Document requests & records</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="rounded-lg bg-slate-100 p-2 text-center dark:bg-slate-800/50">
                                    <p className="text-2xl font-bold dark:text-white">{stats.total_requests}</p>
                                    <p className="text-xs text-muted-foreground dark:text-slate-400">Total</p>
                                </div>
                                <div className="rounded-lg bg-slate-100 p-2 text-center dark:bg-slate-800/50">
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.ready_for_claim}</p>
                                    <p className="text-xs text-muted-foreground dark:text-slate-400">Ready</p>
                                </div>
                            </div>
                            <Button asChild variant="ghost" className="w-full justify-between text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-300">
                                <Link href={index()}>
                                    View All Requests
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* SAS Quick Access */}
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-900/80 dark:hover:border-purple-500/50 dark:hover:shadow-purple-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-500/20">
                                    <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <Badge variant="outline" className="dark:border-purple-500/50 dark:text-purple-400">
                                    {safeSasStats.active_scholarships} Active
                                </Badge>
                            </div>
                            <CardTitle className="text-lg dark:text-white">Student Affairs</CardTitle>
                            <CardDescription className="dark:text-slate-400">Scholarships & services</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="rounded-lg bg-slate-100 p-2 text-center dark:bg-slate-800/50">
                                    <p className="text-2xl font-bold dark:text-white">{safeSasStats.total_scholarships}</p>
                                    <p className="text-xs text-muted-foreground dark:text-slate-400">Scholarships</p>
                                </div>
                                <div className="rounded-lg bg-slate-100 p-2 text-center dark:bg-slate-800/50">
                                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{safeSasStats.organizations_joined}</p>
                                    <p className="text-xs text-muted-foreground dark:text-slate-400">Orgs</p>
                                </div>
                            </div>
                            <Button asChild variant="ghost" className="w-full justify-between text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-500/10 dark:hover:text-purple-300">
                                <Link href={sas.student.scholarships.index.url()}>
                                    View Scholarships
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* USG Quick Access */}
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-900/80 dark:hover:border-green-500/50 dark:hover:shadow-green-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-500/20">
                                    <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <Badge variant="outline" className="dark:border-green-500/50 dark:text-green-400">
                                    {safeUsgStats.upcoming_events} Events
                                </Badge>
                            </div>
                            <CardTitle className="text-lg dark:text-white">USG Portal</CardTitle>
                            <CardDescription className="dark:text-slate-400">News, events & resolutions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="rounded-lg bg-slate-100 p-2 text-center dark:bg-slate-800/50">
                                    <p className="text-2xl font-bold dark:text-white">{safeUsgStats.recent_announcements}</p>
                                    <p className="text-xs text-muted-foreground dark:text-slate-400">News</p>
                                </div>
                                <div className="rounded-lg bg-slate-100 p-2 text-center dark:bg-slate-800/50">
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{safeUsgStats.new_resolutions}</p>
                                    <p className="text-xs text-muted-foreground dark:text-slate-400">Resolutions</p>
                                </div>
                            </div>
                            <Button asChild variant="ghost" className="w-full justify-between text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-500/10 dark:hover:text-green-300">
                                <Link href={usg.index.url()}>
                                    Visit USG Portal
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Voting System Quick Access */}
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-900/80 dark:hover:border-amber-500/50 dark:hover:shadow-amber-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/20">
                                    <Vote className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                {safeVotingStats.active_election ? (
                                    <Badge className="animate-pulse border-0 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                                        <span className="mr-1.5 h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400" />
                                        Active
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-400">
                                        No Election
                                    </Badge>
                                )}
                            </div>
                            <CardTitle className="text-lg dark:text-white">Voting System</CardTitle>
                            <CardDescription className="dark:text-slate-400">Elections & participation</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {safeVotingStats.active_election ? (
                                <div className="rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-500/10">
                                    <p className="mb-1 text-sm font-medium text-amber-700 dark:text-amber-400">{safeVotingStats.election_name}</p>
                                    {safeVotingStats.has_voted ? (
                                        <Badge className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                                            <CheckCircle className="mr-1 h-3 w-3" />
                                            Vote Submitted
                                        </Badge>
                                    ) : safeVotingStats.can_vote ? (
                                        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            Vote Now
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400">
                                            Not Eligible
                                        </Badge>
                                    )}
                                </div>
                            ) : (
                                <div className="rounded-lg bg-slate-100 p-3 text-center dark:bg-slate-800/50">
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">No active elections</p>
                                </div>
                            )}
                            <Button asChild variant="ghost" className="w-full justify-between text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10 dark:hover:text-amber-300">
                                <Link href={voting.index.url()}>
                                    Go to Voting
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Document Requests */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Progress Card */}
                        <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-lg dark:text-white">
                                    <TrendingUp className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
                                    Document Request Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="dark:text-slate-400">Completed Requests</span>
                                        <span className="dark:text-white">
                                            {stats.completed} of {totalRequests}
                                        </span>
                                    </div>
                                    <Progress
                                        value={completedPercentage}
                                        className="h-2 w-full dark:bg-slate-700"
                                    />
                                    <p className="text-xs text-muted-foreground dark:text-slate-500">
                                        {completedPercentage.toFixed(1)}% completion rate
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Registrar Stats Cards */}
                        <div className="grid gap-4 md:grid-cols-4">
                            <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium dark:text-slate-300">Total</CardTitle>
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-2xl font-bold dark:text-white">{stats.total_requests}</div>
                                </CardContent>
                            </Card>
                            <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium dark:text-slate-300">Pending</CardTitle>
                                    <CreditCard className="h-4 w-4 text-amber-500" />
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.pending_payment}</div>
                                </CardContent>
                            </Card>
                            <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium dark:text-slate-300">Processing</CardTitle>
                                    <Clock className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.processing}</div>
                                </CardContent>
                            </Card>
                            <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium dark:text-slate-300">Ready</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.ready_for_claim}</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Requests */}
                        <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg dark:text-white">Recent Document Requests</CardTitle>
                                    <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                        <Link href={index()}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View All
                                        </Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                {recent_requests.length > 0 ? (
                                    <div className="space-y-3">
                                        {recent_requests.slice(0, 4).map((request) => (
                                            <div
                                                key={request.id}
                                                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-slate-600"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-muted-foreground dark:text-slate-400">
                                                        {getStatusIcon(request.status)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium dark:text-white">
                                                            {request.request_number}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                                                            {request.document_type} • ₱{request.amount}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge
                                                    className={
                                                        statusColors[request.status as keyof typeof statusColors] ||
                                                        'bg-muted text-muted-foreground dark:bg-slate-700 dark:text-slate-300'
                                                    }
                                                >
                                                    {request.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon">
                                                <FileText className="h-8 w-8" />
                                            </EmptyMedia>
                                            <EmptyTitle>No requests yet</EmptyTitle>
                                            <EmptyDescription>
                                                Create your first document request to get started.
                                            </EmptyDescription>
                                        </EmptyHeader>
                                        <EmptyContent>
                                            <Button asChild>
                                                <Link href={create()}>
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Create Request
                                                </Link>
                                            </Button>
                                        </EmptyContent>
                                    </Empty>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - USG Updates & Quick Services */}
                    <div className="space-y-6">
                        {/* USG Announcements */}
                        <Card className="dark:border-slate-800 dark:bg-slate-800/50">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center text-lg dark:text-white">
                                        <Megaphone className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
                                        USG Updates
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" asChild className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                                        <Link href={usg.announcements.index.url()}>
                                            View All
                                        </Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {safeRecentAnnouncements.length > 0 ? (
                                    <div className="space-y-3">
                                        {safeRecentAnnouncements.slice(0, 3).map((announcement) => (
                                            <Link
                                                key={announcement.id}
                                                href={usg.announcements.show.url({ slug: announcement.slug })}
                                                className="block rounded-lg border p-3 transition-colors hover:border-green-500/50 dark:border-slate-700 dark:bg-slate-900/50"
                                            >
                                                <p className="line-clamp-2 font-medium dark:text-white">
                                                    {announcement.title}
                                                </p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs dark:border-slate-600 dark:text-slate-400">
                                                        {announcement.category}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground dark:text-slate-500">
                                                        {new Date(announcement.publish_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="py-4 text-center text-sm text-muted-foreground dark:text-slate-400">No recent announcements</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Upcoming Events */}
                        <Card className="dark:border-slate-800 dark:bg-slate-800/50">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center text-lg dark:text-white">
                                        <Calendar className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-400" />
                                        Upcoming Events
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" asChild className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                                        <Link href={usg.events.index.url()}>
                                            View All
                                        </Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {safeUpcomingEvents.length > 0 ? (
                                    <div className="space-y-3">
                                        {safeUpcomingEvents.slice(0, 3).map((event) => (
                                            <Link
                                                key={event.id}
                                                href={usg.events.show.url({ slug: event.slug })}
                                                className="block rounded-lg border p-3 transition-colors hover:border-purple-500/50 dark:border-slate-700 dark:bg-slate-900/50"
                                            >
                                                <p className="font-medium dark:text-white">{event.title}</p>
                                                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground dark:text-slate-400">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(event.start_date).toLocaleDateString()}
                                                    {event.location && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{event.location}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="py-4 text-center text-sm text-muted-foreground dark:text-slate-400">No upcoming events</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Services */}
                        <Card className="dark:border-slate-800 dark:bg-slate-800/50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg dark:text-white">Quick Services</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button asChild variant="ghost" className="w-full justify-start dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                                    <Link href={sas.student.scholarships.index.url()}>
                                        <Award className="mr-3 h-4 w-4 text-purple-500 dark:text-purple-400" />
                                        My Scholarships
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                                    <Link href={sas.student.insurance.index.url()}>
                                        <Shield className="mr-3 h-4 w-4 text-blue-500 dark:text-blue-400" />
                                        Insurance Status
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                                    <Link href={usg.officers.index.url()}>
                                        <Users className="mr-3 h-4 w-4 text-green-500 dark:text-green-400" />
                                        USG Officers
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white">
                                    <Link href={usg.transparency.index.url()}>
                                        <FileText className="mr-3 h-4 w-4 text-amber-500 dark:text-amber-400" />
                                        Transparency Reports
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
