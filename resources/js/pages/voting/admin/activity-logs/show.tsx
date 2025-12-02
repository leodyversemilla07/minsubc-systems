import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    ArrowLeft,
    Calendar,
    Database,
    MapPin,
    Monitor,
    User,
} from 'lucide-react';

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

interface Props {
    activityLog: VoterActivityLog;
}

export default function Show({ activityLog }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Activity Logs', href: voting.admin.activityLogs.index.url() },
        {
            title: `Log #${activityLog.id}`,
            href: voting.admin.activityLogs.show.url({
                activityLog: activityLog.id,
            }),
        },
    ];

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

    const actionLabels: Record<string, string> = {
        login: 'Login',
        vote_cast: 'Vote Cast',
        results_viewed: 'Results Viewed',
        ballot_accessed: 'Ballot Accessed',
        logout: 'Logout',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Activity Log #${activityLog.id}`} />

            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            Activity Log Details
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            View detailed information about this voter activity
                        </p>
                    </div>
                    <Link href={voting.admin.activityLogs.index.url()}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Logs
                        </Button>
                    </Link>
                </div>

                {/* Main Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5" />
                                Log ID: {activityLog.id}
                            </CardTitle>
                            <Badge
                                variant="default"
                                className={getActionColor(activityLog.action)}
                            >
                                {actionLabels[activityLog.action] ||
                                    activityLog.action}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Voter Information */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    Voter Information
                                </div>
                                <div className="ml-6">
                                    <div className="text-sm text-muted-foreground">
                                        School ID
                                    </div>
                                    <div className="font-medium text-foreground">
                                        {activityLog.voter.school_id}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    Election
                                </div>
                                <div className="ml-6">
                                    <div className="font-medium text-foreground">
                                        {activityLog.election.name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        IP Address
                                    </div>
                                    <div className="ml-6">
                                        <div className="font-mono text-sm text-foreground">
                                            {activityLog.ip_address ||
                                                'Not recorded'}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        Timestamp
                                    </div>
                                    <div className="ml-6">
                                        <div className="text-sm text-foreground">
                                            {format(
                                                new Date(
                                                    activityLog.created_at,
                                                ),
                                                'MMMM dd, yyyy',
                                            )}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {format(
                                                new Date(
                                                    activityLog.created_at,
                                                ),
                                                'hh:mm:ss a',
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Agent */}
                        {activityLog.user_agent && (
                            <div className="border-t pt-6">
                                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Monitor className="h-4 w-4" />
                                    User Agent
                                </div>
                                <div className="ml-6">
                                    <div className="rounded bg-muted p-3 font-mono text-sm break-all text-muted-foreground">
                                        {activityLog.user_agent}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Metadata */}
                        {activityLog.metadata &&
                            Object.keys(activityLog.metadata).length > 0 && (
                                <div className="border-t pt-6">
                                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                        <Database className="h-4 w-4" />
                                        Additional Information
                                    </div>
                                    <div className="ml-6">
                                        <pre className="overflow-x-auto rounded bg-muted p-3 text-sm text-muted-foreground">
                                            {JSON.stringify(
                                                activityLog.metadata,
                                                null,
                                                2,
                                            )}
                                        </pre>
                                    </div>
                                </div>
                            )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
