import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

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
    school_id: number;
    student?: Student;
}

interface Vote {
    timestamp: string;
    voter: Voter;
}

interface Candidate {
    id: number;
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
    const { can } = usePermissions();
    const voteCount = candidate.votes.length;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Candidates', href: voting.admin.candidates.index.url() },
        {
            title: candidate.fullname,
            href: voting.admin.candidates.show.url({
                candidate: candidate.id,
            }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Candidate: ${candidate.fullname}`} />

            <div className="max-w-4xl space-y-6 p-6 md:space-y-8 md:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <h1 className="text-3xl font-bold text-foreground">
                        Candidate Details
                    </h1>
                    <div className="flex gap-2">
                        {can('candidates.edit') && (
                            <Link
                                href={voting.admin.candidates.edit.url({
                                    candidate: candidate.id,
                                })}
                            >
                                <Button>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                        <Link href={voting.admin.candidates.index.url()}>
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Candidate Info */}
                    <div className="md:col-span-1">
                        <Card>
                            <CardContent className="pt-6">
                                {/* Photo */}
                                {candidate.photo ? (
                                    <img
                                        src={`/storage/${candidate.photo}`}
                                        alt={candidate.fullname}
                                        className="mb-4 aspect-square w-full rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="mb-4 flex aspect-square w-full items-center justify-center rounded-lg bg-muted text-6xl font-bold text-muted-foreground">
                                        {candidate.firstname.charAt(0)}
                                        {candidate.lastname.charAt(0)}
                                    </div>
                                )}

                                <h2 className="mb-2 text-2xl font-bold text-foreground">
                                    {candidate.fullname}
                                </h2>

                                {candidate.partylist ? (
                                    <p className="mb-4 font-medium text-primary">
                                        {candidate.partylist.name}
                                    </p>
                                ) : (
                                    <p className="mb-4 text-muted-foreground italic">
                                        Independent
                                    </p>
                                )}

                                <div className="space-y-3 border-t pt-4">
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase">
                                            Election
                                        </div>
                                        <div className="text-sm font-medium text-foreground">
                                            {candidate.election.name}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase">
                                            Position
                                        </div>
                                        <div className="text-sm font-medium text-foreground">
                                            {candidate.position.description}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase">
                                            Total Votes
                                        </div>
                                        <div className="text-2xl font-bold text-primary">
                                            {voteCount}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Platform & Votes */}
                    <div className="space-y-6 md:col-span-2">
                        {/* Platform */}
                        {candidate.platform && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Platform / Bio</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-line text-muted-foreground">
                                        {candidate.platform}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Votes List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Votes Received ({voteCount})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {voteCount === 0 ? (
                                    <p className="py-8 text-center text-muted-foreground">
                                        No votes yet
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {candidate.votes.map((vote, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between border-b py-2 last:border-0"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-foreground">
                                                            {vote.voter.student
                                                                ?.user
                                                                ?.full_name ||
                                                                `Student ID: ${vote.voter.school_id}`}
                                                        </div>
                                                        {vote.voter.student && (
                                                            <div className="text-xs text-muted-foreground">
                                                                {
                                                                    vote.voter
                                                                        .student
                                                                        .course
                                                                }{' '}
                                                                {
                                                                    vote.voter
                                                                        .student
                                                                        .year_level
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(
                                                        vote.timestamp,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
