import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit, Users } from 'lucide-react';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';

interface Election {
    id: number;
    name: string;
}

interface Partylist {
    partylist_id: number;
    name: string;
}

interface Candidate {
    candidate_id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    photo: string | null;
    partylist: Partylist | null;
}

interface Position {
    position_id: number;
    description: string;
    max_vote: number;
    priority: number;
    election: Election;
    candidates: Candidate[];
}

interface Props {
    position: Position;
}

export default function Show({ position }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Positions', href: voting.admin.positions.index.url() },
        { title: position.description, href: voting.admin.positions.show.url({ position: position.position_id }) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Position: ${position.description}`} />

            <div className="max-w-4xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{position.description}</h1>
                        <p className="text-sm text-gray-600 mt-1">{position.election.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={voting.admin.positions.edit.url({ position: position.position_id })}>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                        <Link href={voting.admin.positions.index.url()}>
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Position Info */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Position Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">Priority</div>
                                    <div className="mt-1">
                                        <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full font-bold text-blue-700 text-lg">
                                            {position.priority}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 uppercase">Maximum Votes</div>
                                    <div className="text-2xl font-bold text-gray-800 mt-1">
                                        {position.max_vote}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Voters can select up to {position.max_vote} candidate
                                        {position.max_vote !== 1 ? 's' : ''}
                                    </p>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 uppercase">Total Candidates</div>
                                    <div className="text-2xl font-bold text-blue-600 mt-1">
                                        {position.candidates.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Candidates List */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    Candidates ({position.candidates.length})
                                </h3>
                                <Link
                                    href={`/voting/admin/candidates/create?election_id=${position.election.id}`}
                                >
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                        Add Candidate
                                    </Button>
                                </Link>
                            </div>

                            {position.candidates.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                    <p className="text-sm">No candidates for this position yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {position.candidates.map((candidate) => (
                                        <Link
                                            key={candidate.candidate_id}
                                            href={`/voting/admin/candidates/${candidate.candidate_id}`}
                                            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition group"
                                        >
                                            {candidate.photo ? (
                                                <img
                                                    src={`/storage/${candidate.photo}`}
                                                    alt={candidate.fullname}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                                    {candidate.firstname.charAt(0)}
                                                    {candidate.lastname.charAt(0)}
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-800 group-hover:text-blue-600">
                                                    {candidate.fullname}
                                                </div>
                                                {candidate.partylist ? (
                                                    <Badge
                                                        variant="secondary"
                                                        className="mt-1 bg-blue-100 text-blue-700"
                                                    >
                                                        {candidate.partylist.name}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-xs text-gray-500 italic">
                                                        Independent
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
