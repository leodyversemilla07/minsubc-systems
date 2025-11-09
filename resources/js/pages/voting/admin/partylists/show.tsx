import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit, Users } from 'lucide-react';
import voting from '@/routes/voting';

interface Election {
    id: number;
    name: string;
}

interface Position {
    position_id: number;
    description: string;
}

interface Candidate {
    candidate_id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    photo: string | null;
    position: Position;
}

interface Partylist {
    partylist_id: number;
    name: string;
    election: Election;
    candidates: Candidate[];
}

interface Props {
    partylist: Partylist;
}

export default function Show({ partylist }: Props) {
    return (
        <AppLayout>
            <Head title={`Partylist: ${partylist.name}`} />

            <div className="max-w-4xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{partylist.name}</h1>
                        <p className="text-sm text-gray-600 mt-1">{partylist.election.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={voting.admin.partylists.edit.url({ partylist: partylist.partylist_id })}>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                        <Link href={voting.admin.partylists.index.url()}>
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Partylist Info */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Partylist Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">Total Candidates</div>
                                    <div className="text-2xl font-bold text-blue-600 mt-1">
                                        {partylist.candidates.length}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 uppercase mb-2">Election</div>
                                    <Link href={`/voting/admin/elections/${partylist.election.id}`}>
                                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                                            {partylist.election.name}
                                        </Badge>
                                    </Link>
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
                                    Candidates ({partylist.candidates.length})
                                </h3>
                                <Link
                                    href={`/voting/admin/candidates/create?election_id=${partylist.election.id}`}
                                >
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                        Add Candidate
                                    </Button>
                                </Link>
                            </div>

                            {partylist.candidates.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                    <p className="text-sm">No candidates for this partylist yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {partylist.candidates.map((candidate) => (
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
                                                <Badge
                                                    variant="secondary"
                                                    className="mt-1 bg-purple-100 text-purple-700"
                                                >
                                                    {candidate.position.description}
                                                </Badge>
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
