import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    ArrowUpRight,
    Calendar,
    CheckCircle,
    Flag,
    MessageSquare,
    Users,
    Vote,
} from 'lucide-react';

interface Election {
    id: number;
    name: string;
    election_code: string;
    status: boolean;
    computed_status: 'active' | 'ended';
    end_time: string | null;
    positions_count: number;
    candidates_count: number;
    voters_count: number;
    votes_count: number;
}

interface Statistics {
    elections: {
        total: number;
        active: number;
        ended: number;
    };
    candidates: {
        total: number;
    };
    voters: {
        total: number;
        voted: number;
        pending: number;
    };
    positions: {
        total: number;
    };
    partylists: {
        total: number;
    };
    feedback: {
        total: number;
        recent: number;
    };
}

interface DashboardProps {
    statistics: Statistics;
    activeElection: Election | null;
    recentElections: Election[];
}

export default function Dashboard({
    statistics,
    activeElection,
    recentElections,
}: DashboardProps) {
    const { can } = usePermissions();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: '/voting/admin/dashboard' },
        { title: 'Dashboard', href: '/voting/admin/dashboard' },
    ];

    const stats = [
        {
            title: 'Total Elections',
            value: statistics.elections.total,
            description: `${statistics.elections.active} active`,
            icon: Calendar,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20',
            link: '/voting/admin/elections',
        },
        {
            title: 'Total Candidates',
            value: statistics.candidates.total,
            description: 'Across all elections',
            icon: Users,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/20',
            link: '/voting/admin/candidates',
        },
        {
            title: 'Total Voters',
            value: statistics.voters.total,
            description: `${statistics.voters.voted} have voted`,
            icon: Vote,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20',
            link: '/voting/admin/voters',
        },
        {
            title: 'Positions',
            value: statistics.positions.total,
            description: 'Available positions',
            icon: Flag,
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-100 dark:bg-orange-900/20',
            link: '/voting/admin/positions',
        },
        {
            title: 'Feedback',
            value: statistics.feedback.total,
            description: `${statistics.feedback.recent} recent`,
            icon: MessageSquare,
            color: 'text-indigo-600 dark:text-indigo-400',
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
            link: '/voting/admin/feedback',
        },
    ];

    const voterTurnout = statistics.voters.total > 0
        ? Math.round((statistics.voters.voted / statistics.voters.total) * 100)
        : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Voting System Dashboard" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Voting System Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Manage elections, candidates, and monitor voting activity
                        </p>
                    </div>
                    {can('elections.create') && (
                        <Link href="/voting/admin/elections/create">
                            <Button>
                                <Calendar className="mr-2 h-4 w-4" />
                                Create Election
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {stats.map((stat) => (
                        <Link key={stat.title} href={stat.link}>
                            <Card className="transition-shadow hover:shadow-lg">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`rounded-full p-2 ${stat.bgColor}`}>
                                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Active Election Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Active Election
                            </CardTitle>
                            <CardDescription>
                                Currently running election details
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {activeElection ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-lg">
                                            {activeElection.name}
                                        </span>
                                        <Badge variant="default">
                                            Active
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Code</p>
                                            <code className="rounded bg-muted px-2 py-1">
                                                {activeElection.election_code}
                                            </code>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Ends</p>
                                            <p>
                                                {activeElection.end_time
                                                    ? new Date(activeElection.end_time).toLocaleDateString()
                                                    : 'No end date'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Positions</p>
                                            <p className="font-medium">{activeElection.positions_count}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Candidates</p>
                                            <p className="font-medium">{activeElection.candidates_count}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Voters</p>
                                            <p className="font-medium">{activeElection.voters_count}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Votes Cast</p>
                                            <p className="font-medium">{activeElection.votes_count}</p>
                                        </div>
                                    </div>
                                    <Link href={`/voting/admin/elections/${activeElection.id}`}>
                                        <Button variant="outline" className="w-full" size="sm">
                                            View Details
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <CheckCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                                    <p className="text-lg font-medium">No Active Election</p>
                                    <p className="text-sm text-muted-foreground">
                                        There is no election currently running.
                                    </p>
                                    {can('elections.create') && (
                                        <Link href="/voting/admin/elections/create" className="mt-4">
                                            <Button size="sm">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                Create Election
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Voter Turnout Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Vote className="h-5 w-5" />
                                Voter Turnout
                            </CardTitle>
                            <CardDescription>
                                Overall voting participation
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center">
                                    <div className="relative h-32 w-32">
                                        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                                            <circle
                                                className="text-muted stroke-current"
                                                strokeWidth="12"
                                                fill="none"
                                                r="50"
                                                cx="60"
                                                cy="60"
                                            />
                                            <circle
                                                className="text-primary stroke-current"
                                                strokeWidth="12"
                                                strokeLinecap="round"
                                                fill="none"
                                                r="50"
                                                cx="60"
                                                cy="60"
                                                strokeDasharray={`${voterTurnout * 3.14} 314`}
                                            />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                                            {voterTurnout}%
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Total</p>
                                        <p className="font-bold text-lg">{statistics.voters.total}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Voted</p>
                                        <p className="font-bold text-lg text-green-600 dark:text-green-400">
                                            {statistics.voters.voted}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Pending</p>
                                        <p className="font-bold text-lg text-yellow-600 dark:text-yellow-400">
                                            {statistics.voters.pending}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Elections */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Elections</CardTitle>
                        <CardDescription>
                            Latest election activity
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentElections.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                                <p className="text-lg font-medium">No Elections Yet</p>
                                <p className="text-sm text-muted-foreground">
                                    Create your first election to get started.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentElections.map((election) => (
                                    <div
                                        key={election.id}
                                        className="flex items-center justify-between border-b pb-4 last:border-0"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium">{election.name}</h4>
                                                <Badge
                                                    variant={
                                                        election.computed_status === 'active'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {election.computed_status === 'active'
                                                        ? 'Active'
                                                        : 'Ended'}
                                                </Badge>
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {election.positions_count} positions •{' '}
                                                {election.candidates_count} candidates •{' '}
                                                {election.voters_count} voters
                                            </p>
                                        </div>
                                        <Link href={`/voting/admin/elections/${election.id}`}>
                                            <Button variant="ghost" size="sm">
                                                View
                                                <ArrowUpRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
