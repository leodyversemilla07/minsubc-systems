import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Users } from 'lucide-react';

interface Election {
    id: number;
    name: string;
}

interface Partylist {
    partylist_id: number;
    name: string;
}

interface Candidate {
    id: number;
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
    const { can } = usePermissions();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Positions', href: voting.admin.positions.index.url() },
        {
            title: position.description,
            href: voting.admin.positions.show.url({
                position: position.position_id,
            }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Position: ${position.description}`} />

            <div className="max-w-4xl space-y-6 p-6 md:space-y-8 md:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            {position.description}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {position.election.name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {can('positions.edit') && (
                            <Link
                                href={voting.admin.positions.edit.url({
                                    position: position.position_id,
                                })}
                            >
                                <Button>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                        <Link href={voting.admin.positions.index.url()}>
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Position Info */}
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Position Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-xs text-muted-foreground uppercase">
                                        Priority
                                    </div>
                                    <div className="mt-1">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                                            {position.priority}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-muted-foreground uppercase">
                                        Maximum Votes
                                    </div>
                                    <div className="mt-1 text-2xl font-bold text-foreground">
                                        {position.max_vote}
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Voters can select up to{' '}
                                        {position.max_vote} candidate
                                        {position.max_vote !== 1 ? 's' : ''}
                                    </p>
                                </div>

                                <div>
                                    <div className="text-xs text-muted-foreground uppercase">
                                        Total Candidates
                                    </div>
                                    <div className="mt-1 text-2xl font-bold text-primary">
                                        {position.candidates.length}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Candidates List */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    <CardTitle>
                                        Candidates ({position.candidates.length}
                                        )
                                    </CardTitle>
                                </div>
                                <Link
                                    href={`/voting/admin/candidates/create?election_id=${position.election.id}`}
                                >
                                    <Button size="sm">Add Candidate</Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                {position.candidates.length === 0 ? (
                                    <div className="py-12 text-center text-muted-foreground">
                                        <Users className="mx-auto mb-3 h-12 w-12 opacity-50" />
                                        <p className="text-sm">
                                            No candidates for this position yet
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {position.candidates.map(
                                            (candidate) => (
                                                <Link
                                                    key={candidate.id}
                                                    href={`/voting/admin/candidates/${candidate.id}`}
                                                    className="group flex items-center gap-4 rounded-lg border p-4 transition hover:border-primary hover:bg-muted/50"
                                                >
                                                    {candidate.photo ? (
                                                        <img
                                                            src={`/storage/${candidate.photo}`}
                                                            alt={
                                                                candidate.fullname
                                                            }
                                                            className="h-12 w-12 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground">
                                                            {candidate.firstname.charAt(
                                                                0,
                                                            )}
                                                            {candidate.lastname.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                    )}
                                                    <div className="flex-1">
                                                        <div className="font-medium text-foreground group-hover:text-primary">
                                                            {candidate.fullname}
                                                        </div>
                                                        {candidate.partylist ? (
                                                            <Badge
                                                                variant="secondary"
                                                                className="mt-1"
                                                            >
                                                                {
                                                                    candidate
                                                                        .partylist
                                                                        .name
                                                                }
                                                            </Badge>
                                                        ) : (
                                                            <span className="text-xs text-muted-foreground italic">
                                                                Independent
                                                            </span>
                                                        )}
                                                    </div>
                                                </Link>
                                            ),
                                        )}
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
