import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit, FileText, Users, Vote, UserCheck } from 'lucide-react';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';

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
        { title: election.name, href: voting.admin.elections.show.url({ election: election.id }) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Election: ${election.name}`} />

            <div>
                {/* Header with Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{election.name}</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Election Code:{' '}
                            <code className="bg-gray-100 px-2 py-1 rounded">{election.election_code}</code>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={voting.admin.elections.edit.url({ election: election.id })}>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                        <Link href={voting.admin.elections.index.url()}>
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Election Info Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Election Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">Status</div>
                                    {election.status === 'active' ? (
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="mt-1">
                                            Ended
                                        </Badge>
                                    )}
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 uppercase">End Time</div>
                                    <div className="text-sm font-medium text-gray-800 mt-1">
                                        {election.end_time
                                            ? new Date(election.end_time).toLocaleDateString('en-US', {
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
                                    <div className="text-xs text-gray-500 uppercase">Created</div>
                                    <div className="text-sm font-medium text-gray-800 mt-1">
                                        {new Date(election.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Positions</span>
                                    <span className="font-bold">{election.positions_count || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Candidates</span>
                                    <span className="font-bold">{election.candidates_count || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Voters</span>
                                    <span className="font-bold">{election.voters_count || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Votes Cast</span>
                                    <span className="font-bold text-green-600">{election.votes_count || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Management Links */}
                    <div className="md:col-span-2">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Positions Card */}
                            <Link
                                href={`/voting/admin/positions?election_id=${election.id}`}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group block"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
                                            Positions
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">Manage election positions</p>
                                        <p className="text-2xl font-bold text-gray-800 mt-4">
                                            {election.positions_count || 0}
                                        </p>
                                    </div>
                                    <FileText className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition" />
                                </div>
                            </Link>

                            {/* Candidates Card */}
                            <Link
                                href={`/voting/admin/candidates?election_id=${election.id}`}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group block"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
                                            Candidates
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">Manage candidates</p>
                                        <p className="text-2xl font-bold text-gray-800 mt-4">
                                            {election.candidates_count || 0}
                                        </p>
                                    </div>
                                    <Users className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition" />
                                </div>
                            </Link>

                            {/* Partylists Card */}
                            <Link
                                href={`/voting/admin/partylists?election_id=${election.id}`}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group block"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
                                            Partylists
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">Manage partylists</p>
                                        <p className="text-2xl font-bold text-gray-800 mt-4">0</p>
                                    </div>
                                    <Vote className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition" />
                                </div>
                            </Link>

                            {/* Voters Card */}
                            <Link
                                href={`/voting/admin/voters?election_id=${election.id}`}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group block"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
                                            Voters
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">Manage voters</p>
                                        <p className="text-2xl font-bold text-gray-800 mt-4">
                                            {election.voters_count || 0}
                                        </p>
                                    </div>
                                    <UserCheck className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
