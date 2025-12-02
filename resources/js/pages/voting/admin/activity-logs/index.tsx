import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Database, Eye } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Voting Admin', href: voting.admin.elections.index.url() },
    { title: 'Activity Logs', href: voting.admin.activityLogs.index.url() },
];

interface Election {
    id: number;
    name: string;
}

interface Voter {
    id: number;
    school_id: string;
}

interface VoterActivityLog {
    id: number;
    voter_id: number;
    election_id: number;
    action: string;
    ip_address: string | null;
    user_agent: string | null;
    metadata: Record<string, unknown> | null;
    created_at: string;
    voter: Voter;
    election: Election;
}

interface PaginatedLogs {
    data: VoterActivityLog[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    activityLogs: PaginatedLogs;
    elections: Election[];
    actions: Record<string, string>;
    filters: {
        election_id?: number;
        action?: string;
        from?: string;
        to?: string;
        voter_id?: number;
    };
}

export default function Index({
    activityLogs,
    elections,
    actions,
    filters,
}: Props) {
    const handleFilterChange = (key: string, value: string) => {
        router.get(
            voting.admin.activityLogs.index.url(),
            {
                ...filters,
                [key]: value !== 'all' ? value : undefined,
            },
            { preserveState: true },
        );
    };

    const getActionBadgeVariant = (
        action: string,
    ):
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | null
        | undefined => {
        switch (action) {
            case 'login':
                return 'secondary';
            case 'vote_cast':
                return 'default';
            case 'results_viewed':
                return 'outline';
            case 'ballot_accessed':
                return 'secondary';
            case 'logout':
                return 'outline';
            default:
                return 'secondary';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Voter Activity Logs" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                            Voter Activity Logs
                        </h1>
                        <p className="text-muted-foreground">
                            Track and monitor all voter activities across
                            elections
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <Select
                        value={filters.election_id?.toString() || 'all'}
                        onValueChange={(value) =>
                            handleFilterChange('election_id', value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All Elections" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Elections</SelectItem>
                            {elections.map((election) => (
                                <SelectItem
                                    key={election.id}
                                    value={election.id.toString()}
                                >
                                    {election.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={filters.action || 'all'}
                        onValueChange={(value) =>
                            handleFilterChange('action', value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All Actions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Actions</SelectItem>
                            {Object.entries(actions).map(([key, label]) => (
                                <SelectItem key={key} value={key}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {(filters.election_id || filters.action) && (
                        <Button
                            variant="ghost"
                            onClick={() =>
                                router.get(
                                    voting.admin.activityLogs.index.url(),
                                    {},
                                    { preserveState: true },
                                )
                            }
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Activities
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">
                                {activityLogs.total}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Logins
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">
                                {
                                    activityLogs.data.filter(
                                        (log) => log.action === 'login',
                                    ).length
                                }
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Votes Cast
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">
                                {
                                    activityLogs.data.filter(
                                        (log) => log.action === 'vote_cast',
                                    ).length
                                }
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Results Viewed
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">
                                {
                                    activityLogs.data.filter(
                                        (log) => log.action === 'results_viewed',
                                    ).length
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Table */}
                <Card>
                    {activityLogs.data.length > 0 && (
                        <CardHeader>
                            <CardTitle className="text-foreground">
                                Activity Logs
                            </CardTitle>
                            <CardDescription>
                                Showing {activityLogs.data.length} of{' '}
                                {activityLogs.total} activity logs
                            </CardDescription>
                        </CardHeader>
                    )}
                    <CardContent className="p-6">
                        {activityLogs.data.length === 0 ? (
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Database />
                                    </EmptyMedia>
                                    <EmptyTitle>No Activity Logs</EmptyTitle>
                                    <EmptyDescription>
                                        {filters.election_id || filters.action
                                            ? 'No activity logs found matching your filters.'
                                            : 'No voter activity has been recorded yet.'}
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted">
                                            <TableHead className="text-foreground">
                                                School ID
                                            </TableHead>
                                            <TableHead className="text-foreground">
                                                Election
                                            </TableHead>
                                            <TableHead className="text-foreground">
                                                Action
                                            </TableHead>
                                            <TableHead className="text-foreground">
                                                IP Address
                                            </TableHead>
                                            <TableHead className="text-foreground">
                                                Timestamp
                                            </TableHead>
                                            <TableHead className="text-right text-foreground">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {activityLogs.data.map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell className="font-medium text-foreground">
                                                    {log.voter.school_id}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {log.election.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={getActionBadgeVariant(
                                                            log.action,
                                                        )}
                                                    >
                                                        {actions[log.action] ||
                                                            log.action}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-mono text-sm text-muted-foreground">
                                                    {log.ip_address || 'N/A'}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {format(
                                                        new Date(log.created_at),
                                                        'MMM dd, yyyy HH:mm:ss',
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Link
                                                        href={voting.admin.activityLogs.show.url(
                                                            {
                                                                activityLog: log.id,
                                                            },
                                                        )}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {/* Pagination */}
                                {activityLogs.last_page > 1 && (
                                    <div className="mt-6 flex justify-center gap-1">
                                        {activityLogs.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={
                                                    link.active
                                                        ? 'default'
                                                        : 'ghost'
                                                }
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() =>
                                                    link.url &&
                                                    router.visit(link.url)
                                                }
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
