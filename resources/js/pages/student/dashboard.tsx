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
    // Detailed Scholarships
    scholarships?: Array<{
        id: number;
        name: string;
        type: string;
        status: string;
        amount: number;
        academic_year: string;
        semester: string;
        requirements_complete: boolean;
        requirements_progress: number;
        total_requirements: number;
        completed_requirements: number;
        expiration_date?: string;
    }>;
    // Organization Memberships
    organizations?: Array<{
        id: number;
        name: string;
        acronym: string;
        type: string;
        membership_date?: string;
        status: string;
    }>;
    // Insurance Record
    insuranceRecord?: {
        id: number;
        status: string;
        academic_year: string;
        semester: string;
        amount: number;
        payment_status: string;
        created_at?: string;
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
    scholarships,
    organizations,
    insuranceRecord,
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
    const safeScholarships = scholarships ?? [];
    const safeOrganizations = organizations ?? [];
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

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Welcome Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-14 w-14 ring-2 ring-primary/50">
                            <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-lg text-primary-foreground">
                                {user.first_name[0]}
                                {user.last_name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Welcome back, {user.first_name}!
                            </h1>
                            <p className="text-muted-foreground">
                                {user.student
                                    ? `${user.student.student_id} • ${user.student.course} • Year ${user.student.year_level}`
                                    : 'Staff Member'}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={usg.index.url()}>
                                <Megaphone className="mr-2 h-4 w-4" />
                                USG Portal
                            </Link>
                        </Button>
                        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
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
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:border-border dark:bg-linear-to-br dark:from-card/80 dark:to-card/60 dark:hover:border-primary/50 dark:hover:shadow-primary/10">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                                    <FileText className="h-5 w-5 text-primary" />
                                </div>
                                <Badge variant="outline" className="dark:border-primary/50 dark:text-primary">
                                    {stats.pending_payment + stats.processing} Active
                                </Badge>
                            </div>
                            <CardTitle className="text-lg">Registrar</CardTitle>
                            <CardDescription>Document requests & records</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="rounded-lg bg-muted p-2 text-center">
                                    <p className="text-2xl font-bold">{stats.total_requests}</p>
                                    <p className="text-xs text-muted-foreground">Total</p>
                                </div>
                                <div className="rounded-lg bg-muted p-2 text-center">
                                    <p className="text-2xl font-bold text-success">{stats.ready_for_claim}</p>
                                    <p className="text-xs text-muted-foreground">Ready</p>
                                </div>
                            </div>
                            <Button asChild variant="ghost" className="w-full justify-between text-primary hover:bg-primary/10">
                                <Link href={index()}>
                                    View All Requests
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* SAS Quick Access */}
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:border-border dark:bg-linear-to-br dark:from-card/80 dark:to-card/60 dark:hover:border-primary/50 dark:hover:shadow-primary/10">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                </div>
                                <Badge variant="outline" className="dark:border-primary/50 dark:text-primary">
                                    {safeSasStats.active_scholarships} Active
                                </Badge>
                            </div>
                            <CardTitle className="text-lg">Student Affairs</CardTitle>
                            <CardDescription>Scholarships & services</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="rounded-lg bg-muted p-2 text-center">
                                    <p className="text-2xl font-bold">{safeSasStats.total_scholarships}</p>
                                    <p className="text-xs text-muted-foreground">Scholarships</p>
                                </div>
                                <div className="rounded-lg bg-muted p-2 text-center">
                                    <p className="text-2xl font-bold text-primary">{safeSasStats.organizations_joined}</p>
                                    <p className="text-xs text-muted-foreground">Orgs</p>
                                </div>
                            </div>
                            <Button asChild variant="ghost" className="w-full justify-between text-primary hover:bg-primary/10">
                                <Link href={sas.student.scholarships.index.url()}>
                                    View Scholarships
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* USG Quick Access */}
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:border-border dark:bg-linear-to-br dark:from-card/80 dark:to-card/60 dark:hover:border-primary/50 dark:hover:shadow-primary/10">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <Badge variant="outline" className="dark:border-primary/50 dark:text-primary">
                                    {safeUsgStats.upcoming_events} Events
                                </Badge>
                            </div>
                            <CardTitle className="text-lg">USG Portal</CardTitle>
                            <CardDescription>News, events & resolutions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="rounded-lg bg-muted p-2 text-center">
                                    <p className="text-2xl font-bold">{safeUsgStats.recent_announcements}</p>
                                    <p className="text-xs text-muted-foreground">News</p>
                                </div>
                                <div className="rounded-lg bg-muted p-2 text-center">
                                    <p className="text-2xl font-bold text-primary">{safeUsgStats.new_resolutions}</p>
                                    <p className="text-xs text-muted-foreground">Resolutions</p>
                                </div>
                            </div>
                            <Button asChild variant="ghost" className="w-full justify-between text-primary hover:bg-primary/10">
                                <Link href={usg.index.url()}>
                                    Visit USG Portal
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Voting System Quick Access */}
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:border-border dark:bg-linear-to-br dark:from-card/80 dark:to-card/60 dark:hover:border-primary/50 dark:hover:shadow-primary/10">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                                    <Vote className="h-5 w-5 text-primary" />
                                </div>
                                {safeVotingStats.active_election ? (
                                    <Badge className="animate-pulse border-0 bg-primary/10 text-primary">
                                        <span className="mr-1.5 h-2 w-2 rounded-full bg-primary" />
                                        Active
                                    </Badge>
                                ) : (
                                    <Badge variant="outline">
                                        No Election
                                    </Badge>
                                )}
                            </div>
                            <CardTitle className="text-lg">Voting System</CardTitle>
                            <CardDescription>Elections & participation</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {safeVotingStats.active_election ? (
                                <div className="rounded-lg bg-primary/5 p-3 text-center dark:bg-primary/10">
                                    <p className="mb-1 text-sm font-medium text-primary">{safeVotingStats.election_name}</p>
                                    {safeVotingStats.has_voted ? (
                                        <Badge className="bg-success/10 text-success">
                                            <CheckCircle className="mr-1 h-3 w-3" />
                                            Vote Submitted
                                        </Badge>
                                    ) : safeVotingStats.can_vote ? (
                                        <Badge className="bg-primary/10 text-primary">
                                            <AlertCircle className="mr-1 h-3 w-3" />
                                            Vote Now
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-muted text-muted-foreground">
                                            Not Eligible
                                        </Badge>
                                    )}
                                </div>
                            ) : (
                                <div className="rounded-lg bg-muted p-3 text-center">
                                    <p className="text-sm text-muted-foreground">No active elections</p>
                                </div>
                            )}
                            <Button asChild variant="ghost" className="w-full justify-between text-primary hover:bg-primary/10">
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
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-lg">
                                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                                    Document Request Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Completed Requests</span>
                                        <span>
                                            {stats.completed} of {totalRequests}
                                        </span>
                                    </div>
                                    <Progress
                                        value={completedPercentage}
                                        className="h-2 w-full"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {completedPercentage.toFixed(1)}% completion rate
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Registrar Stats Cards */}
                        <div className="grid gap-4 md:grid-cols-4">
                            <Card className="transition-shadow hover:shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total</CardTitle>
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-2xl font-bold">{stats.total_requests}</div>
                                </CardContent>
                            </Card>
                            <Card className="transition-shadow hover:shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                                    <CreditCard className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-2xl font-bold text-primary">{stats.pending_payment}</div>
                                </CardContent>
                            </Card>
                            <Card className="transition-shadow hover:shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Processing</CardTitle>
                                    <Clock className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-2xl font-bold text-primary">{stats.processing}</div>
                                </CardContent>
                            </Card>
                            <Card className="transition-shadow hover:shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Ready</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-success" />
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="text-2xl font-bold text-success">{stats.ready_for_claim}</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Requests */}
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Recent Document Requests</CardTitle>
                                    <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
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
                                                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-muted-foreground">
                                                        {getStatusIcon(request.status)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            {request.request_number}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {request.document_type} • ₱{request.amount}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge
                                                    className={
                                                        statusColors[request.status as keyof typeof statusColors] ||
                                                        'bg-muted text-muted-foreground'
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
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center text-lg">
                                        <Megaphone className="mr-2 h-5 w-5 text-primary" />
                                        USG Updates
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
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
                                                className="block rounded-lg border p-3 transition-colors hover:border-primary/50"
                                            >
                                                <p className="line-clamp-2 font-medium">
                                                    {announcement.title}
                                                </p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {announcement.category}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(announcement.publish_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="py-4 text-center text-sm text-muted-foreground">No recent announcements</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Upcoming Events */}
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center text-lg">
                                        <Calendar className="mr-2 h-5 w-5 text-primary" />
                                        Upcoming Events
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
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
                                                className="block rounded-lg border p-3 transition-colors hover:border-primary/50"
                                            >
                                                <p className="font-medium">{event.title}</p>
                                                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
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
                                    <p className="py-4 text-center text-sm text-muted-foreground">No upcoming events</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Services */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Quick Services</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button asChild variant="ghost" className="w-full justify-start">
                                    <Link href={sas.student.scholarships.index.url()}>
                                        <Award className="mr-3 h-4 w-4 text-primary" />
                                        My Scholarships
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start">
                                    <Link href={sas.student.insurance.index.url()}>
                                        <Shield className="mr-3 h-4 w-4 text-primary" />
                                        Insurance Status
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start">
                                    <Link href={usg.officers.index.url()}>
                                        <Users className="mr-3 h-4 w-4 text-primary" />
                                        USG Officers
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" className="w-full justify-start">
                                    <Link href={usg.transparency.index.url()}>
                                        <FileText className="mr-3 h-4 w-4 text-primary" />
                                        Transparency Reports
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* My Student Services Section */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* My Scholarships */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center text-lg">
                                    <Award className="mr-2 h-5 w-5 text-primary" />
                                    My Scholarships
                                </CardTitle>
                                <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
                                    <Link href={sas.student.scholarships.index.url()}>
                                        View All
                                    </Link>
                                </Button>
                            </div>
                            <CardDescription>
                                {safeSasStats.active_scholarships} active of {safeSasStats.total_scholarships} total scholarships
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {safeScholarships.length > 0 ? (
                                <div className="space-y-4">
                                    {safeScholarships.slice(0, 3).map((scholarship) => (
                                        <div
                                            key={scholarship.id}
                                            className="rounded-lg border p-4 transition-colors"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <p className="font-medium">{scholarship.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {scholarship.academic_year} • {scholarship.semester}
                                                    </p>
                                                </div>
                                                <Badge
                                                    className={
                                                        scholarship.status === 'Active'
                                                            ? 'bg-success/10 text-success'
                                                            : scholarship.status === 'Pending'
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'bg-muted text-muted-foreground'
                                                    }
                                                >
                                                    {scholarship.status}
                                                </Badge>
                                            </div>
                                            {scholarship.total_requirements > 0 && (
                                                <div className="mt-3 space-y-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-muted-foreground">Requirements</span>
                                                        <span>
                                                            {scholarship.completed_requirements}/{scholarship.total_requirements}
                                                        </span>
                                                    </div>
                                                    <Progress value={scholarship.requirements_progress} className="h-1.5" />
                                                </div>
                                            )}
                                            {scholarship.amount > 0 && (
                                                <p className="mt-2 text-sm font-medium text-primary">
                                                    ₱{Number(scholarship.amount).toLocaleString()}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-6 text-center">
                                    <Award className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        No scholarships found
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* My Organizations & Insurance */}
                    <div className="space-y-6">
                        {/* Organizations */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center text-lg">
                                    <Users className="mr-2 h-5 w-5 text-primary" />
                                    My Organizations
                                </CardTitle>
                                <CardDescription>
                                    Member of {safeSasStats.organizations_joined} organization{safeSasStats.organizations_joined !== 1 ? 's' : ''}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {safeOrganizations.length > 0 ? (
                                    <div className="space-y-2">
                                        {safeOrganizations.map((org) => (
                                            <div
                                                key={org.id}
                                                className="flex items-center justify-between rounded-lg border p-3"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                        {org.acronym || org.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{org.name}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {org.type} • Since {org.membership_date}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline">
                                                    {org.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-4 text-center">
                                        <Users className="mx-auto h-6 w-6 text-muted-foreground/50" />
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Not a member of any organization
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Insurance Status */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center text-lg">
                                    <Shield className="mr-2 h-5 w-5 text-primary" />
                                    Insurance Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {insuranceRecord ? (
                                    <div className="rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    {insuranceRecord.academic_year} • {insuranceRecord.semester}
                                                </p>
                                                <p className="mt-1 text-lg font-medium">
                                                    Student Insurance
                                                </p>
                                            </div>
                                            <Badge
                                                className={
                                                    insuranceRecord.status === 'Active' || insuranceRecord.status === 'Covered'
                                                        ? 'bg-success/10 text-success'
                                                        : insuranceRecord.status === 'Pending'
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'bg-muted text-muted-foreground'
                                                }
                                            >
                                                <Shield className="mr-1 h-3 w-3" />
                                                {insuranceRecord.status}
                                            </Badge>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 gap-4 border-t pt-3">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Payment</p>
                                                <p className="font-medium">{insuranceRecord.payment_status}</p>
                                            </div>
                                            {insuranceRecord.amount > 0 && (
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Amount</p>
                                                    <p className="font-medium">₱{Number(insuranceRecord.amount).toLocaleString()}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-lg border border-dashed p-4 text-center">
                                        <Shield className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            No insurance record found
                                        </p>
                                        <Button asChild variant="outline" size="sm" className="mt-3">
                                            <Link href={sas.student.insurance.index.url()}>
                                                View Insurance
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
