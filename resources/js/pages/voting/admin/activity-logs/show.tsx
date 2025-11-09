import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, User, Calendar, MapPin, Monitor, Database } from 'lucide-react';
import voting from '@/routes/voting';
import { format } from 'date-fns';
import { type BreadcrumbItem } from '@/types';

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

interface Props {
    activityLog: VoterActivityLog;
}

export default function Show({ activityLog }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Activity Logs', href: voting.admin.activityLogs.index.url() },
        { title: `Log #${activityLog.id}`, href: voting.admin.activityLogs.show.url({ activityLog: activityLog.id }) },
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

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Activity Log Details</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            View detailed information about this voter activity
                        </p>
                    </div>
                    <Link href={voting.admin.activityLogs.index.url()}>
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Logs
                        </Button>
                    </Link>
                </div>

                {/* Main Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                Log ID: {activityLog.id}
                            </CardTitle>
                            <Badge variant="default" className={getActionColor(activityLog.action)}>
                                {actionLabels[activityLog.action] || activityLog.action}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Voter Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                                    <User className="w-4 h-4" />
                                    Voter Information
                                </div>
                                <div className="ml-6">
                                    <div className="text-sm text-gray-600">Voter ID</div>
                                    <div className="font-medium text-gray-800">
                                        {activityLog.voter.voters_id}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    Election
                                </div>
                                <div className="ml-6">
                                    <div className="font-medium text-gray-800">{activityLog.election.name}</div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                                        <MapPin className="w-4 h-4" />
                                        IP Address
                                    </div>
                                    <div className="ml-6">
                                        <div className="font-mono text-sm text-gray-800">
                                            {activityLog.ip_address || 'Not recorded'}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                                        <Calendar className="w-4 h-4" />
                                        Timestamp
                                    </div>
                                    <div className="ml-6">
                                        <div className="text-sm text-gray-800">
                                            {format(new Date(activityLog.created_at), 'MMMM dd, yyyy')}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {format(new Date(activityLog.created_at), 'hh:mm:ss a')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Agent */}
                        {activityLog.user_agent && (
                            <div className="border-t pt-6">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                                    <Monitor className="w-4 h-4" />
                                    User Agent
                                </div>
                                <div className="ml-6">
                                    <div className="text-sm text-gray-600 break-all font-mono bg-gray-50 p-3 rounded">
                                        {activityLog.user_agent}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Metadata */}
                        {activityLog.metadata && Object.keys(activityLog.metadata).length > 0 && (
                            <div className="border-t pt-6">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                                    <Database className="w-4 h-4" />
                                    Additional Information
                                </div>
                                <div className="ml-6">
                                    <pre className="text-sm text-gray-600 bg-gray-50 p-3 rounded overflow-x-auto">
                                        {JSON.stringify(activityLog.metadata, null, 2)}
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
