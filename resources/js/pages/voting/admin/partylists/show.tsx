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
import { Edit, Users } from 'lucide-react';

interface Election {
    id: number;
    name: string;
}

interface Position {
    position_id: number;
    description: string;
}

interface Candidate {
    id: number;
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
    const { can } = usePermissions();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Partylists', href: voting.admin.partylists.index.url() },
        {
            title: partylist.name,
            href: voting.admin.partylists.show.url({
                partylist: partylist.partylist_id,
            }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Partylist: ${partylist.name}`} />

            <div className="max-w-4xl space-y-6 p-6 md:space-y-8 md:p-8">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            {partylist.name}
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {partylist.election.name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {can('partylists.edit') && (
                            <Link
                                href={voting.admin.partylists.edit.url({
                                    partylist: partylist.partylist_id,
                                })}
                            >
                                <Button>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                        <Link href={voting.admin.partylists.index.url()}>
                            <Button variant="outline">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Partylist Info */}
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Partylist Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-xs uppercase text-muted-foreground">
                                        Total Candidates
                                    </div>
                                    <div className="mt-1 text-2xl font-bold text-primary">
                                        {partylist.candidates.length}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 text-xs uppercase text-muted-foreground">
                                        Election
                                    </div>
                                    <Link
                                        href={`/voting/admin/elections/${partylist.election.id}`}
                                    >
                                        <Badge
                                            variant="secondary"
                                            className="cursor-pointer hover:bg-muted"
                                        >
                                            {partylist.election.name}
                                        </Badge>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Candidates List */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Candidates ({partylist.candidates.length})
                                </CardTitle>
                                {can('candidates.create') && (
                                    <Link
                                        href={`/voting/admin/candidates/create?election_id=${partylist.election.id}`}
                                    >
                                        <Button size="sm">Add Candidate</Button>
                                    </Link>
                                )}
                            </CardHeader>
                            <CardContent>
                                {partylist.candidates.length === 0 ? (
                                    <div className="py-12 text-center text-muted-foreground">
                                        <Users className="mx-auto mb-3 h-12 w-12 opacity-50" />
                                        <p className="text-sm">
                                            No candidates for this partylist yet
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {partylist.candidates.map(
                                            (candidate) => (
                                                <Link
                                                    key={
                                                        candidate.id
                                                    }
                                                    href={`/voting/admin/candidates/${candidate.id}`}
                                                    className="group flex items-center gap-4 rounded-lg border p-4 transition hover:border-primary hover:bg-primary/5"
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
                                                        <Badge
                                                            variant="secondary"
                                                            className="mt-1"
                                                        >
                                                            {
                                                                candidate
                                                                    .position
                                                                    .description
                                                            }
                                                        </Badge>
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
