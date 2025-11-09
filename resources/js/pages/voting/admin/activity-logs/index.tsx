import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Database } from 'lucide-react';
import voting from '@/routes/voting';
import { format } from 'date-fns';

interface Election {
    id: number;
    name: string;
}

interface Voter {
    id: number;
    voters_id: string;
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

export default function Index({ activityLogs, elections, actions, filters }: Props) {
    const handleFilterChange = (key: string, value: string) => {
        router.get(
            voting.admin.activityLogs.index.url(),
            {
                ...filters,
                [key]: value || undefined,
            },
            { preserveState: true }
        );
    };

    const getActionBadgeVariant = (action: string): "default" | "destructive" | "outline" | "secondary" | null | undefined => {
        switch (action) {
            case 'login':
                return 'default';
            case 'vote_cast':
                return 'default';
            case 'results_viewed':
                return 'default';
            case 'ballot_accessed':
                return 'default';
            case 'logout':
                return 'default';
            default:
                return 'default';
        }
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case 'login':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'vote_cast':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'results_viewed':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'ballot_accessed':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'logout':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <AppLayout>
            <Head title="Voter Activity Logs" />

            <div className="bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="border-b p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Voter Activity Logs</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Track and monitor all voter activities across elections
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Select
                            value={filters.election_id?.toString() || ''}
                            onValueChange={(value) => handleFilterChange('election_id', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Elections" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Elections</SelectItem>
                                {elections.map((election) => (
                                    <SelectItem key={election.id} value={election.id.toString()}>
                                        {election.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filters.action || ''}
                            onValueChange={(value) => handleFilterChange('action', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Actions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Actions</SelectItem>
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
                                    router.get(voting.admin.activityLogs.index.url(), {}, { preserveState: true })
                                }
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b bg-gray-50">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{activityLogs.total}</div>
                        <div className="text-sm text-gray-600">Total Activities</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {activityLogs.data.filter((log) => log.action === 'login').length}
                        </div>
                        <div className="text-sm text-gray-600">Logins</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {activityLogs.data.filter((log) => log.action === 'vote_cast').length}
                        </div>
                        <div className="text-sm text-gray-600">Votes Cast</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                            {activityLogs.data.filter((log) => log.action === 'results_viewed').length}
                        </div>
                        <div className="text-sm text-gray-600">Results Viewed</div>
                    </div>
                </div>

                {/* Table */}
                <div className="p-6">
                    {activityLogs.data.length === 0 ? (
                        <Empty>
                            <EmptyMedia>
                                <Database className="w-12 h-12" />
                            </EmptyMedia>
                            <EmptyHeader>
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
                                    <TableRow>
                                        <TableHead>Voter ID</TableHead>
                                        <TableHead>Election</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>IP Address</TableHead>
                                        <TableHead>Timestamp</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activityLogs.data.map((log) => (
                                        <TableRow key={log.id}>
                                            <TableCell className="font-medium text-gray-800">
                                                {log.voter.voters_id}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {log.election.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={getActionBadgeVariant(log.action)}
                                                    className={getActionColor(log.action)}
                                                >
                                                    {actions[log.action] || log.action}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600 font-mono">
                                                {log.ip_address || 'N/A'}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {format(new Date(log.created_at), 'MMM dd, yyyy HH:mm:ss')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link
                                                    href={voting.admin.activityLogs.show.url({
                                                        activity_log: log.id,
                                                    })}
                                                >
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {activityLogs.last_page > 1 && (
                                <div className="flex justify-center gap-1 mt-6">
                                    {activityLogs.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'ghost'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
