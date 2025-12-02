import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, FileText, UserCheck, Users, Vote } from 'lucide-react';

interface Election {
    id: number;
    name: string;
    election_code: string;
    status: boolean;
    computed_status: 'active' | 'ended';
    end_time: string | null;
    created_at: string;
    positions_count?: number;
    candidates_count?: number;
    voters_count?: number;
    votes_count?: number;
}

interface Props {
    election: Election;
}

export default function Show({ election }: Props) {
    const { can } = usePermissions();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Elections', href: voting.admin.elections.index.url() },
        {
            title: election.name,
            href: voting.admin.elections.show.url({ election: election.id }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Election: ${election.name}`} />

            <div className="space-y-6 p-6 md:space-y-8 md:p-8">
                {/* Header with Actions */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            {election.name}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Election Code:{' '}
                            <code className="rounded bg-muted px-2 py-1">
                                {election.election_code}
                            </code>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {can('elections.edit') && (
                            <Link
                                href={voting.admin.elections.edit.url({
                                    election: election.id,
                                })}
                            >
                                <Button>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                        <Link href={voting.admin.elections.index.url()}>
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Election Info Card */}
                    <div className="space-y-6 md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Election Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-xs uppercase text-muted-foreground">
                                        Status
                                    </div>
                                    {election.computed_status === 'active' ? (
                                        <Badge variant="default" className="mt-1">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="mt-1">
                                            Ended
                                        </Badge>
                                    )}
                                </div>

                                <div>
                                    <div className="text-xs uppercase text-muted-foreground">
                                        End Time
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-foreground">
                                        {election.end_time
                                            ? new Date(
                                                  election.end_time,
                                              ).toLocaleDateString('en-US', {
                                                  month: 'short',
                                                  day: 'numeric',
                                                  year: 'numeric',
                                                  hour: 'numeric',
                                                  minute: '2-digit',
                                              })
                                            : 'No end time'}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs uppercase text-muted-foreground">
                                        Created
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-foreground">
                                        {new Date(
                                            election.created_at,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Positions
                                    </span>
                                    <span className="font-bold text-foreground">
                                        {election.positions_count || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Candidates
                                    </span>
                                    <span className="font-bold text-foreground">
                                        {election.candidates_count || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Voters
                                    </span>
                                    <span className="font-bold text-foreground">
                                        {election.voters_count || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Votes Cast
                                    </span>
                                    <span className="font-bold text-primary">
                                        {election.votes_count || 0}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Management Links */}
                    <div className="md:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Positions Card */}
                            <Link
                                href={`/voting/admin/positions?election_id=${election.id}`}
                                className="group block"
                            >
                                <Card className="h-full transition hover:shadow-lg">
                                    <CardContent className="flex items-start justify-between p-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground transition group-hover:text-primary">
                                                Positions
                                            </h3>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Manage election positions
                                            </p>
                                            <p className="mt-4 text-2xl font-bold text-foreground">
                                                {election.positions_count || 0}
                                            </p>
                                        </div>
                                        <FileText className="h-8 w-8 text-muted-foreground transition group-hover:text-primary" />
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* Candidates Card */}
                            <Link
                                href={`/voting/admin/candidates?election_id=${election.id}`}
                                className="group block"
                            >
                                <Card className="h-full transition hover:shadow-lg">
                                    <CardContent className="flex items-start justify-between p-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground transition group-hover:text-primary">
                                                Candidates
                                            </h3>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Manage candidates
                                            </p>
                                            <p className="mt-4 text-2xl font-bold text-foreground">
                                                {election.candidates_count || 0}
                                            </p>
                                        </div>
                                        <Users className="h-8 w-8 text-muted-foreground transition group-hover:text-primary" />
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* Partylists Card */}
                            <Link
                                href={`/voting/admin/partylists?election_id=${election.id}`}
                                className="group block"
                            >
                                <Card className="h-full transition hover:shadow-lg">
                                    <CardContent className="flex items-start justify-between p-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground transition group-hover:text-primary">
                                                Partylists
                                            </h3>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Manage partylists
                                            </p>
                                            <p className="mt-4 text-2xl font-bold text-foreground">
                                                0
                                            </p>
                                        </div>
                                        <Vote className="h-8 w-8 text-muted-foreground transition group-hover:text-primary" />
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* Voters Card */}
                            <Link
                                href={`/voting/admin/voters?election_id=${election.id}`}
                                className="group block"
                            >
                                <Card className="h-full transition hover:shadow-lg">
                                    <CardContent className="flex items-start justify-between p-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground transition group-hover:text-primary">
                                                Voters
                                            </h3>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Manage voters
                                            </p>
                                            <p className="mt-4 text-2xl font-bold text-foreground">
                                                {election.voters_count || 0}
                                            </p>
                                        </div>
                                        <UserCheck className="h-8 w-8 text-muted-foreground transition group-hover:text-primary" />
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
