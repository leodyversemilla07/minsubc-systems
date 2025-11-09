import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';

interface Election {
    id: number;
    name: string;
}

interface Position {
    position_id: number;
    description: string;
}

interface Partylist {
    partylist_id: number;
    name: string;
}

interface Student {
    user?: {
        full_name: string;
    };
    course?: string;
    year_level?: string;
}

interface Voter {
    voters_id: number;
    student?: Student;
}

interface Vote {
    timestamp: string;
    voter: Voter;
}

interface Candidate {
    candidate_id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    photo: string | null;
    platform: string | null;
    election: Election;
    position: Position;
    partylist: Partylist | null;
    votes: Vote[];
}

interface Props {
    candidate: Candidate;
}

export default function Show({ candidate }: Props) {
    const voteCount = candidate.votes.length;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Candidates', href: voting.admin.candidates.index.url() },
        { title: candidate.fullname, href: voting.admin.candidates.show.url({ candidate: candidate.candidate_id }) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Candidate: ${candidate.fullname}`} />

            <div className="max-w-4xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Candidate Details</h1>
                    <div className="flex gap-2">
                        <Link href={voting.admin.candidates.edit.url({ candidate: candidate.candidate_id })}>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                        <Link href={voting.admin.candidates.index.url()}>
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Candidate Info */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {/* Photo */}
                            {candidate.photo ? (
                                <img
                                    src={`/storage/${candidate.photo}`}
                                    alt={candidate.fullname}
                                    className="w-full rounded-lg mb-4 object-cover aspect-square"
                                />
                            ) : (
                                <div className="w-full rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-6xl font-bold mb-4 aspect-square">
                                    {candidate.firstname.charAt(0)}
                                    {candidate.lastname.charAt(0)}
                                </div>
                            )}

                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{candidate.fullname}</h2>

                            {candidate.partylist ? (
                                <p className="text-blue-600 font-medium mb-4">{candidate.partylist.name}</p>
                            ) : (
                                <p className="text-gray-500 italic mb-4">Independent</p>
                            )}

                            <div className="space-y-3 pt-4 border-t">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">Election</div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {candidate.election.name}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 uppercase">Position</div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {candidate.position.description}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 uppercase">Total Votes</div>
                                    <div className="text-2xl font-bold text-blue-600">{voteCount}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Platform & Votes */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Platform */}
                        {candidate.platform && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">Platform / Bio</h3>
                                <p className="text-gray-700 whitespace-pre-line">{candidate.platform}</p>
                            </div>
                        )}

                        {/* Votes List */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">
                                Votes Received ({voteCount})
                            </h3>

                            {voteCount === 0 ? (
                                <p className="text-center text-gray-500 py-8">No votes yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {candidate.votes.map((vote, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between py-2 border-b last:border-0"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-800">
                                                        {vote.voter.student?.user?.full_name ||
                                                            `Voter #${vote.voter.voters_id}`}
                                                    </div>
                                                    {vote.voter.student && (
                                                        <div className="text-xs text-gray-500">
                                                            {vote.voter.student.course}{' '}
                                                            {vote.voter.student.year_level}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(vote.timestamp).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </div>
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
