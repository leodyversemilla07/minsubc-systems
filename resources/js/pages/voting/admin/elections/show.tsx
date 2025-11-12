import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, FileText, UserCheck, Users, Vote } from 'lucide-react';

interface Election {
    id: number;
    name: string;
    election_code: string;
    status: 'active' | 'ended';
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

            <div>
                {/* Header with Actions */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {election.name}
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Election Code:{' '}
                            <code className="rounded bg-gray-100 px-2 py-1">
                                {election.election_code}
                            </code>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={voting.admin.elections.edit.url({
                                election: election.id,
                            })}
                        >
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Link href={voting.admin.elections.index.url()}>
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Election Info Card */}
                    <div className="md:col-span-1">
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-lg font-bold text-gray-800">
                                Election Details
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">
                                        Status
                                    </div>
                                    {election.status === 'active' ? (
                                        <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-100">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="secondary"
                                            className="mt-1"
                                        >
                                            Ended
                                        </Badge>
                                    )}
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 uppercase">
                                        End Time
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-gray-800">
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
                                    <div className="text-xs text-gray-500 uppercase">
                                        Created
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-gray-800">
                                        {new Date(
                                            election.created_at,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-lg font-bold text-gray-800">
                                Quick Stats
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Positions
                                    </span>
                                    <span className="font-bold">
                                        {election.positions_count || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Candidates
                                    </span>
                                    <span className="font-bold">
                                        {election.candidates_count || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Voters
                                    </span>
                                    <span className="font-bold">
                                        {election.voters_count || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Votes Cast
                                    </span>
                                    <span className="font-bold text-green-600">
                                        {election.votes_count || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Management Links */}
                    <div className="md:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Positions Card */}
                            <Link
                                href={`/voting/admin/positions?election_id=${election.id}`}
                                className="group block rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 transition group-hover:text-blue-600">
                                            Positions
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Manage election positions
                                        </p>
                                        <p className="mt-4 text-2xl font-bold text-gray-800">
                                            {election.positions_count || 0}
                                        </p>
                                    </div>
                                    <FileText className="h-8 w-8 text-gray-400 transition group-hover:text-blue-600" />
                                </div>
                            </Link>

                            {/* Candidates Card */}
                            <Link
                                href={`/voting/admin/candidates?election_id=${election.id}`}
                                className="group block rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 transition group-hover:text-blue-600">
                                            Candidates
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Manage candidates
                                        </p>
                                        <p className="mt-4 text-2xl font-bold text-gray-800">
                                            {election.candidates_count || 0}
                                        </p>
                                    </div>
                                    <Users className="h-8 w-8 text-gray-400 transition group-hover:text-blue-600" />
                                </div>
                            </Link>

                            {/* Partylists Card */}
                            <Link
                                href={`/voting/admin/partylists?election_id=${election.id}`}
                                className="group block rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 transition group-hover:text-blue-600">
                                            Partylists
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Manage partylists
                                        </p>
                                        <p className="mt-4 text-2xl font-bold text-gray-800">
                                            0
                                        </p>
                                    </div>
                                    <Vote className="h-8 w-8 text-gray-400 transition group-hover:text-blue-600" />
                                </div>
                            </Link>

                            {/* Voters Card */}
                            <Link
                                href={`/voting/admin/voters?election_id=${election.id}`}
                                className="group block rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 transition group-hover:text-blue-600">
                                            Voters
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Manage voters
                                        </p>
                                        <p className="mt-4 text-2xl font-bold text-gray-800">
                                            {election.voters_count || 0}
                                        </p>
                                    </div>
                                    <UserCheck className="h-8 w-8 text-gray-400 transition group-hover:text-blue-600" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
